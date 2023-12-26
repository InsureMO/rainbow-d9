import {MUtils, PPUtils, registerWidget, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {useWizardEventBus, WizardEventBusProvider} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';
import {WizardProps, WizardStepDef} from './types';
import {AWizard, WizardBody, WizardHeader} from './widgets';
import {WizardStepBody} from './wizard-step-body';
import {WizardStepTitle} from './wizard-step-title';

const redressStepMarker = (content: WizardStepDef) => {
	if (VUtils.isNotBlank(content.marker)) {
		return content.marker;
	}
	if (typeof content.title === 'string') {
		content.marker = content.title;
		return content.marker;
	}
	content.marker = VUtils.generateUniqueId();
	return content.marker;
};

interface WizardState {
	initialized: boolean;
	activeIndex: number;
	reachedIndex: number;
}

const InternalWizard = (props: WizardProps) => {
	const {
		$pp, $wrapped,
		reached = 0, freeWalk = false,
		balloon = true, emphasisActive = true, contents,
		...rest
	} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {on, off} = useWizardEventBus();
	const [state, setState] = useState<WizardState>({initialized: false, activeIndex: 0, reachedIndex: 0});
	useEffect(() => {
		const onStepActive = (index: number) => {
			if (index === state.activeIndex) {
				return;
			} else {
				setState(state => ({...state, activeIndex: index}));
			}
		};
		on(WizardEventTypes.ACTIVE_STEP, onStepActive);
		return () => {
			off(WizardEventTypes.ACTIVE_STEP, onStepActive);
		};
	}, [on, off, state.activeIndex]);
	useEffect(() => {
		if (state.initialized) {
			return;
		}
		if (reached == null || VUtils.isBlank(reached)) {
			setState({initialized: true, activeIndex: 0, reachedIndex: 0});
			return;
		}
		const find = (reached: string | number): number => {
			let foundIndex = (contents ?? []).findIndex(content => content.marker === reached);
			if (foundIndex === -1) {
				foundIndex = (contents ?? []).findIndex((_, index) => index == reached);
			}
			return foundIndex === -1 ? 0 : foundIndex;
		};
		if (typeof reached === 'function') {
			(async () => {
				const reachedMarkerOrIndex = await reached();
				const index = find(reachedMarkerOrIndex);
				setState({initialized: true, activeIndex: index, reachedIndex: index});
			})();
		} else {
			const index = find(reached);
			setState({initialized: true, activeIndex: index, reachedIndex: index});
		}
	}, [state.initialized, contents, reached]);

	if (!state.initialized) {
		return null;
	}

	return <AWizard {...rest} data-disabled={$disabled} data-visible={$visible}
	                id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
		<WizardHeader data-balloon={balloon}>
			{(contents ?? []).map((content, index) => {
				redressStepMarker(content);
				const $model = MUtils.getValue($wrapped.$model, $pp);
				return <WizardStepTitle key={content.marker}
				                        $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                        balloon={balloon} emphasisActive={emphasisActive}
				                        {...content}
				                        done={index < state.activeIndex} active={index === state.activeIndex}
				                        freeWalk={freeWalk} reachedIndex={state.reachedIndex} stepIndex={index}
				                        marker={content.marker}/>;
			})}
		</WizardHeader>
		<WizardBody>
			{(contents ?? []).map((content, index) => {
				const $model = MUtils.getValue($wrapped.$model, $pp);
				// marker already redressed in headers rendering
				return <WizardStepBody key={content.marker} def={content.body} $pp={content.$pp}
				                       $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                       active={index === state.activeIndex}/>;
			})}
		</WizardBody>
	</AWizard>;
};

export const Wizard = (props: WizardProps) => {
	return <WizardEventBusProvider>
		<InternalWizard {...props}/>
	</WizardEventBusProvider>;
};

registerWidget({key: 'Wizard', JSX: Wizard, container: false, array: false});

export * from './types';
