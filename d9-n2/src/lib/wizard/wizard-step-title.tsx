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
import {AWizardStepBalloon, AWizardStepTitle} from './widgets';

export interface WizardStepTitleProps extends WizardStepTitleDef, ModelHolder {
	balloon?: boolean;
	emphasisActive?: boolean;
	done: boolean;
	active: boolean;
	freeWalk: boolean;
	reachedIndex: number;
	stepIndex: number;
	marker: string;
}

export const WizardStepTitleWorker = (props: WizardStepTitleProps & DefaultNodeAttributesState) => {
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

		fire(WizardEventTypes.ACTIVE_STEP, stepIndex, marker);
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
	const {initialized, $defaultAttributes, $defaultAttributesSet} = useDefaultAttributeValues(props);
	if (!initialized) {
		return null;
	}

	return <WizardStepTitleWorker {...props}
	                              $defaultAttributes={$defaultAttributes}
	                              $defaultAttributesSet={$defaultAttributesSet}/>;
};