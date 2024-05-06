import {BaseModel, PPUtils, PropertyPath, PropValue, useForceUpdate, VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import {LabelLike} from '@rainbow-d9/n2';
import React, {useEffect, useState} from 'react';
import {usePlanSelectionEventBus} from './event/plan-selection-event-bus';
import {
	PlansChangedEventOptions,
	PlanSelectionEventTypes,
	PremiumCalculatedEventOptions
} from './event/plan-selection-event-bus-types';
import {PlanDef, PlanSelectionProps, SelectedPlans} from './types';
import {createPlanModelProxy, findSelectedPlan, guardPlanSubTitle, guardPlanTitle} from './utils';
import {APlanHeader, PlanHeaderSubTitle, PlanHeaderTitle} from './widgets';

export interface PlanHeaderProps {
	$root: BaseModel;
	/** $root + $p2r => plans */
	$p2r: PropertyPath;
	displayIndex: number;
	planDef: PlanDef;
	plans: SelectedPlans;
	planTitle?: PlanSelectionProps['planTitle'];
	planSubTitle?: PlanSelectionProps['planSubTitle'];
	currencySymbol?: PlanSelectionProps['currencySymbol'];
	premiumDescription?: PlanSelectionProps['premiumDescription'];
}

export const PlanHeader = (props: PlanHeaderProps) => {
	const {
		$root, $p2r, plans,
		displayIndex, planDef,
		planTitle, planSubTitle, currencySymbol, premiumDescription
	} = props;

	const {on, off} = usePlanSelectionEventBus();
	const [elementValueChanged, setElementValueChanged] = useState(false);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onElementValueChanged = (options: PlansChangedEventOptions) => {
			if (planDef !== options.planDef) {
				return;
			}
			setElementValueChanged(true);
		};
		const onPremiumCalculated = (options: PremiumCalculatedEventOptions) => {
			if (planDef !== options.planDef) {
				return;
			}
			if (elementValueChanged) {
				setElementValueChanged(false);
			} else {
				forceUpdate();
			}
		};
		on(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		on(PlanSelectionEventTypes.PREMIUM_CALCULATED, onPremiumCalculated);
		return () => {
			off(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
			off(PlanSelectionEventTypes.PREMIUM_CALCULATED, onPremiumCalculated);
		};
	}, [on, off, forceUpdate, planDef, elementValueChanged]);

	const planData = findSelectedPlan(plans, planDef.code);
	// merge instance data and definition data
	const model = createPlanModelProxy(planData, planDef) as unknown as PropValue;
	const $myWrapped: WrappedAttributes = {
		$root, $model: model, $p2r: PPUtils.concat($p2r, planDef.code),
		$onValueChange: VUtils.noop, $avs: {}
	};
	// index starts from 0
	const odd = displayIndex % 2 === 0;

	return <APlanHeader data-odd={odd}>
		<PlanHeaderTitle>
			{guardPlanTitle({def: planTitle, planDef, elementValueChanged}).map((label, index) => {
				return <LabelLike key={index} label={label} $wrapped={$myWrapped}/>;
			})}
		</PlanHeaderTitle>
		<PlanHeaderSubTitle>
			{guardPlanSubTitle({
				def: planSubTitle, currencySymbol, premiumDescription, planDef, elementValueChanged
			}).map((label, index) => {
				return <LabelLike key={index} label={label} $wrapped={$myWrapped}/>;
			})}
		</PlanHeaderSubTitle>
	</APlanHeader>;
};