import React, {useEffect} from 'react';
import {ContainerEventBusProvider, useWrapperEventBus, WrapperEventTypes} from '../events';
import {ContainerValidationEventHolder, useForceUpdate} from '../hooks';
import {ArrayContainerDef, ContainerDef, DeviceTags, ModelHolder, NodeDef, WidgetProps} from '../types';
import {N1Logger, VUtils} from '../utils';
import {findWidget, RegisteredWidget} from '../widgets-registration';
import {ArrayWrapper} from './array-wrapper';
import {ContainerWrapper} from './container-wrapper';
import {LeafWrapper} from './leaf-wrapper';
import {DefaultNodeAttributesState} from './types';
import {useAttributesWatch} from './use-attributes-watch';
import {useValidate, useValidationFunctions, useValidationRegistration} from './use-validate';

export interface WrapperDelegateWorkerProps extends NodeDef, ModelHolder, DefaultNodeAttributesState, Partial<DeviceTags> {
}

export const WrapperDelegateWorker = (workerProps: WrapperDelegateWorkerProps) => {
	const {
		$wt, $defaultAttributes: attributeValues, $defaultAttributesSet: setAttributeValues,
		...rest
	} = workerProps;
	const props: NodeDef & ModelHolder = {$wt, ...rest};

	const {on, off} = useWrapperEventBus();
	const validators = useValidationFunctions(props);
	useAttributesWatch({props, attributeValues, setAttributeValues});
	useValidate({props, attributeValues, setAttributeValues});
	useValidationRegistration({props, attributeValues, setAttributeValues});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(WrapperEventTypes.REPAINT, forceUpdate);
		return () => {
			off(WrapperEventTypes.REPAINT, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	if (VUtils.isBlank($wt)) {
		N1Logger.error(`Widget type must be declared, current is [${$wt}].`, 'WrapperDelegate');
		return null;
	}

	const widgetTypes = $wt.split('.').map($wt => $wt.trim());
	if (widgetTypes.some($wt => $wt.length === 0)) {
		N1Logger.error(`Incorrect widget type[${$wt}].`, 'WrapperDelegate');
		return null;
	}
	const [widgetType, ...coverTypes] = widgetTypes;
	const coverWidgets: Array<[string, RegisteredWidget<WidgetProps> | null]> = coverTypes.map(coverType => {
		const cover: RegisteredWidget<WidgetProps> = findWidget(coverType);
		if (cover == null) {
			N1Logger.error(`Widget definition of [${coverType}] in [${$wt}] not found.`, 'WrapperDelegate');
			return [coverType, null];
		}
		return [coverType, cover];
	});
	if (coverWidgets.some(([, cover]) => cover == null)) {
		return null;
	}

	const hasCover = coverTypes.length > 0;
	// at least one cover width consume the position
	const coverConsumePosition = hasCover && coverWidgets.some(([, cover]) => cover.consumePosition !== false);
	const kernel = (() => {
		const widget: RegisteredWidget<WidgetProps> = findWidget(widgetType);
		if (widget == null) {
			N1Logger.error(`Widget definition of [${widgetType}] in [${$wt}] not found.`, 'WrapperDelegate');
			return null;
		}
		if (widget.container && widget.array) {
			return <ContainerEventBusProvider>
				<ContainerValidationEventHolder/>
				<ArrayWrapper {...(props as unknown as (ArrayContainerDef & ModelHolder))}
				              $wt={widgetType} $avs={attributeValues} $vfs={validators}
				              useComputedStyle={widget.consumePosition !== false}/>
			</ContainerEventBusProvider>;
		} else if (widget.container) {
			return <ContainerEventBusProvider>
				<ContainerValidationEventHolder/>
				<ContainerWrapper {...(props as unknown as (ContainerDef & ModelHolder))}
				                  $wt={widgetType} $avs={attributeValues} $vfs={validators}
				                  useComputedStyle={widget.consumePosition !== false}/>
			</ContainerEventBusProvider>;
		} else {
			// ignore compute style when it is with covers
			return <LeafWrapper {...props}
			                    $wt={widgetType} $avs={attributeValues} $vfs={validators}
			                    useComputedStyle={!coverConsumePosition && widget.consumePosition !== false}/>;
		}
	})();

	return coverWidgets.reduce((child, [$wt, cover]) => {
		// ignore building when previous building failed
		if (child == null) {
			return null;
		}

		// previous widget is the only child of cover widget, therefore, use leaf wrapper here, which means
		// cover widget CANNOT be container widget, and attribute "nodes" is ignored even through it has been declared.
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return <LeafWrapper {...props}
		                    $wt={$wt} $avs={attributeValues} $vfs={validators}
		                    useComputedStyle={cover.consumePosition !== false}>
			{child}
		</LeafWrapper>;
	}, kernel);
};
