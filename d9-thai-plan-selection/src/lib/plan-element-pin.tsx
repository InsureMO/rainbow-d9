import {BaseModel, ModelHolder, PPUtils, PropertyPath, PropValue, Wrapper} from '@rainbow-d9/n1';
import {CheckboxDef} from '@rainbow-d9/n2';
import React from 'react';
import {usePlanSelectionEventBus} from './event/plan-selection-event-bus';
import {PlanSelectionEventTypes} from './event/plan-selection-event-bus-types';
import {PlanDef, PlanMutableElementDef, SelectedPlan, SelectedPlanElement, SelectedPlans} from './types';

export interface PlanElementPinProps {
	$root: BaseModel;
	/** $root + $p2r => element */
	$p2r: PropertyPath;
	plans: SelectedPlans;
	plan: SelectedPlan;
	planDef: PlanDef;
	element: SelectedPlanElement;
	elementDef: PlanMutableElementDef;
}

export const PlanElementPin = (props: PlanElementPinProps) => {
	const {
		$root, $p2r, plans,
		plan, planDef,
		element, elementDef
	} = props;
	const {pinned} = elementDef;

	const {fire} = usePlanSelectionEventBus();

	const onSelectedChanged = (value: boolean) => {
		fire(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, {
			root: $root, model: plans as unknown as PropValue, $p2r: PPUtils.concat($p2r, 'selected'),
			planDef, plan, elementDef, element, value
		});
	};

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const def = {
		$wt: 'Checkbox', $pp: 'selected', $root, $model: element, $p2r,
		'data-element-pinned': pinned, emptyWhenFalse: false, $disabled: pinned,
		valueChanged: ({newValue}) => onSelectedChanged(newValue as boolean)
	} as CheckboxDef & ModelHolder;
	return <Wrapper {...def} />;
};