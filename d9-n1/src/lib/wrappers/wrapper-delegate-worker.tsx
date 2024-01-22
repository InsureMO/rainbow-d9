import React, {useEffect} from 'react';
import {ContainerEventBusProvider, useWrapperEventBus, WrapperEventTypes} from '../events';
import {ContainerValidationEventHolder, useDeviceTags, useForceUpdate} from '../hooks';
import {ArrayContainerDef, ContainerDef, ModelHolder, NodeDef, WidgetProps} from '../types';
import {N1Logger, VUtils} from '../utils';
import {findWidget, RegisteredWidget} from '../widgets-registration';
import {ArrayWrapper} from './array-wrapper';
import {ContainerWrapper} from './container-wrapper';
import {LeafWrapper} from './leaf-wrapper';
import {DefaultNodeAttributesState} from './types';
import {useAttributesWatch} from './use-attributes-watch';
import {useValidate, useValidationFunctions, useValidationRegistration} from './use-validate';

export const WrapperDelegateWorker = (workerProps: NodeDef & ModelHolder & DefaultNodeAttributesState) => {
	const {
		$wt, $defaultAttributes: attributeValues, $defaultAttributesSet: setAttributeValues,
		...rest
	} = workerProps;
	const props: NodeDef & ModelHolder = {$wt, ...rest};

	const {on, off} = useWrapperEventBus();
	const deviceTags = useDeviceTags();
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
		N1Logger.error(`Type must be declared, current is [${$wt}].`, 'WrapperDelegate');
		return null;
	}

	if ($wt.includes('.')) {
		// declared with cover widget, format is "InternalWidgetType.CoverWidgetType"
		const coverType = $wt.substring($wt.indexOf('.') + 1);
		if (VUtils.isBlank(coverType)) {
			N1Logger.error(`Cover type must be declared, current is [${$wt}].`, 'WrapperDelegate');
			return null;
		}
		const internalType = $wt.substring(0, $wt.indexOf('.'));
		if (VUtils.isBlank(internalType)) {
			N1Logger.error(`Internal type must be declared, current is [${$wt}].`, 'WrapperDelegate');
			return null;
		}

		const internalWidget: RegisteredWidget<WidgetProps> = findWidget(internalType);
		if (internalWidget == null) {
			N1Logger.error(`Widget definition of [${internalType}] not found.`, 'WrapperDelegate');
			return null;
		}
		const coverWidget: RegisteredWidget<WidgetProps> = findWidget(coverType);
		if (coverWidget == null) {
			N1Logger.error(`Widget definition of [${coverType}] not found.`, 'WrapperDelegate');
			return null;
		}

		const child = (() => {
			if (internalWidget.container && internalWidget.array) {
				return <ContainerEventBusProvider>
					<ContainerValidationEventHolder/>
					<ArrayWrapper {...deviceTags}
					              {...(props as unknown as (ArrayContainerDef & ModelHolder))}
					              $wt={internalType}
					              $avs={attributeValues} $vfs={validators}/>
				</ContainerEventBusProvider>;
			} else if (internalWidget.container) {
				return <ContainerEventBusProvider>
					<ContainerValidationEventHolder/>
					<ContainerWrapper {...deviceTags}
					                  {...(props as unknown as (ContainerDef & ModelHolder))}
					                  $wt={internalType}
					                  $avs={attributeValues} $vfs={validators}/>
				</ContainerEventBusProvider>;
			} else {
				// ignore compute style when it is declared with a wrapper
				return <LeafWrapper {...deviceTags} {...props}
				                    $wt={internalType} $avs={attributeValues} $vfs={validators}
				                    useComputedStyle={false}/>;
			}
		})();

		// internal widget is the only child of cover widget, therefore, use leaf wrapper here, which means
		// cover widget CANNOT be container widget, and attribute "nodes" is ignored even through it has been declared.
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return <LeafWrapper {...deviceTags} {...props}
		                    $wt={coverType} $avs={attributeValues} $vfs={validators}
		                    useComputedStyle={true}>
			{child}
		</LeafWrapper>;
	} else {
		// no cover widget
		const widget: RegisteredWidget<WidgetProps> = findWidget($wt);
		if (widget == null) {
			N1Logger.error(`Widget definition of [${$wt}] not found.`, 'WrapperDelegate');
			return null;
		}

		if (widget.container && widget.array) {
			return <ContainerEventBusProvider>
				<ContainerValidationEventHolder/>
				<ArrayWrapper {...deviceTags}
				              {...(props as unknown as (ArrayContainerDef & ModelHolder))}
				              $avs={attributeValues} $vfs={validators}/>
			</ContainerEventBusProvider>;
		} else if (widget.container) {
			return <ContainerEventBusProvider>
				<ContainerValidationEventHolder/>
				<ContainerWrapper {...deviceTags}
				                  {...(props as unknown as (ContainerDef & ModelHolder))}
				                  $avs={attributeValues} $vfs={validators}/>
			</ContainerEventBusProvider>;
		} else {
			return <LeafWrapper {...deviceTags} {...props}
			                    $avs={attributeValues} $vfs={validators} useComputedStyle={true}/>;
		}
	}
};
