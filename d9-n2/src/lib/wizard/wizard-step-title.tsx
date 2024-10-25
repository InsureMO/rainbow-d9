import {
	DefaultNodeAttributesState,
	ModelHolder,
	MUtils,
	PPUtils,
	useAttributesWatch,
	useDefaultAttributeValues,
	VUtils
} from '@rainbow-d9/n1';
import React, {MouseEvent} from 'react';
import {LabelLike} from '../label-like';
import {useWizardEventBus} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';
import {WizardStepTitleDef} from './types';
import {useWizardStepActive} from './use-wizard-step-active';
import {useWizardStepContentRefresh} from './use-wizard-step-content-refresh';
import {AWizardStepBalloon, AWizardStepTitle} from './widgets';

export interface WizardStepTitleProps extends WizardStepTitleDef, ModelHolder {
	balloon?: boolean;
	emphasisActive?: boolean;
	freeWalk: boolean;
	stepIndex: number;
	marker: string;
}

interface WizardStepTitleWorkerProps extends WizardStepTitleProps, DefaultNodeAttributesState {
	active: boolean;
	done: boolean;
	reachedIndex: number;
}

export const WizardStepTitleWorker = (props: WizardStepTitleWorkerProps) => {
	const {
		$pp, title,
		$root, $model, $p2r,
		balloon = true, emphasisActive = true,
		done, active, freeWalk, reachedIndex, stepIndex, marker,
		$defaultAttributes: attributeValues, $defaultAttributesSet: setAttributeValues,
		...rest
	} = props;

	const {fire} = useWizardEventBus();
	// monitor myself, mostly for $disabled and $visible
	useAttributesWatch({props, attributeValues, setAttributeValues});

	const $wrapped = {
		$root, $model: MUtils.getValue($model, $pp), $p2r: PPUtils.concat($p2r, $pp),
		$avs: attributeValues, $onValueChange: VUtils.noop
	};
	const {$disabled, $visible} = attributeValues;

	const onTitleClicked = (event: MouseEvent<HTMLDivElement>) => {
		if ($disabled || active) {
			return;
		}
		if (!freeWalk && !done) {
			if (reachedIndex < stepIndex) {
				return;
			}
		}

		event.preventDefault();
		event.stopPropagation();

		fire(WizardEventTypes.TRY_ACTIVE_STEP, stepIndex, marker);
	};

	return <AWizardStepTitle data-disabled={$disabled} data-visible={$visible}
	                         data-done={done || (!active && reachedIndex >= stepIndex)} data-active={active}
	                         data-free-walk={freeWalk || reachedIndex >= stepIndex}
	                         data-balloon={balloon} data-emphasis={emphasisActive && active}
	                         onClick={balloon ? (void 0) : onTitleClicked} {...rest}>
		{balloon
			? <AWizardStepBalloon>
				<span onClick={onTitleClicked}>{stepIndex + 1}</span>
			</AWizardStepBalloon>
			: null}
		<LabelLike $wrapped={$wrapped} label={title} wrapByCaption={true}/>
	</AWizardStepTitle>;
};

export const WizardStepTitle = (props: WizardStepTitleProps) => {
	// active hook must put here, since tab title is rendered before wizard controller
	// and since the attribute initializer is async, the step title worker is not ensured to be rendered before wizard controller
	// which leads to miss the active step event from inside
	const {active, done, reachedIndex} = useWizardStepActive(props.stepIndex, props.marker, 'title');
	useWizardStepContentRefresh(props.stepIndex, props.marker, 'title');
	const {initialized, $defaultAttributes, $defaultAttributesSet} = useDefaultAttributeValues(props);
	if (!initialized) {
		return null;
	}

	return <WizardStepTitleWorker {...props} active={active} done={done} reachedIndex={reachedIndex}
	                              $defaultAttributes={$defaultAttributes}
	                              $defaultAttributesSet={$defaultAttributesSet}/>;
};