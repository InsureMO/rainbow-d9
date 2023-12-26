import {
	buildDefaultAttributeValues,
	ModelHolder,
	MUtils,
	NodeAttributeValues,
	PPUtils,
	useAttributesWatch,
	VUtils
} from '@rainbow-d9/n1';
import React, {MouseEvent, useState} from 'react';
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

export const WizardStepTitle = (props: WizardStepTitleProps) => {
	const {
		$pp, title,
		$root, $model, $p2r,
		balloon = true, emphasisActive = true,
		done, active, freeWalk, reachedIndex, stepIndex, marker,
		...rest
	} = props;

	const {fire} = useWizardEventBus();
	// monitor myself, mostly for $disabled and $visible
	const [attributeValues, setAttributeValues] = useState<NodeAttributeValues>(buildDefaultAttributeValues(props));
	useAttributesWatch({props, attributeValues, setAttributeValues});

	const $wrapped = {
		$root, $model: MUtils.getValue($model, $pp), $p2r: PPUtils.concat($p2r, $pp),
		$avs: attributeValues, $onValueChange: VUtils.noop
	};
	const {$disabled, $visible} = attributeValues;

	const onTitleClicked = (event: MouseEvent<HTMLDivElement>) => {
		if ($disabled || active || (!done && !freeWalk)) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();

		fire(WizardEventTypes.ACTIVE_STEP, stepIndex, marker);
	};

	return <AWizardStepTitle data-disabled={$disabled} data-visible={$visible}
	                         data-done={done} data-active={active}
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
