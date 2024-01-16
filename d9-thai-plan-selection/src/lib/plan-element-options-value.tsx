import {BaseModel, ModelHolder, PPUtils, PropertyPath, PropValue, VUtils, Wrapper} from '@rainbow-d9/n1';
import {BoxDef, CaptionDef, DropdownDef, Utils} from '@rainbow-d9/n2';
import React from 'react';
import {usePlanSelectionEventBus} from './event/plan-selection-event-bus';
import {PlanSelectionEventTypes} from './event/plan-selection-event-bus-types';
import {PlanElementUnit} from './plan-element-unit';
import {
	PlanDef,
	PlanElementCode,
	PlanElementOptionsValueDef,
	PlanMutableElementDef,
	PlanSelectionDef,
	SelectedPlan,
	SelectedPlanElement,
	SelectedPlans
} from './types';
import {useElementDefaultValue} from './use-element-default-value';

export interface PlanElementOptionsValueProps {
	planDef: PlanDef;
	elementDef: PlanMutableElementDef;
	valueDef: PlanElementOptionsValueDef;
	plan: SelectedPlan;
	plans: SelectedPlans;
	$root: BaseModel;
	/** $root + $p2r => values */
	$p2r: PropertyPath;
	elementCodes: Array<PlanElementCode>;
	element: SelectedPlanElement;
	values: SelectedPlanElement['values'];
	elementOptionsValue?: PlanSelectionDef['elementOptionsValue'];
}

export const PlanElementOptionsValue = (props: PlanElementOptionsValueProps) => {
	const {
		planDef, elementDef, valueDef,
		plan: planModel, plans, $root, $p2r,
		elementCodes,
		element: elementModel, values: valuesModel,
		elementOptionsValue
	} = props;
	const {code: $pp, label, defaultValue, options} = valueDef;

	const {fire} = usePlanSelectionEventBus();
	useElementDefaultValue({model: valuesModel, $pp, defaultValues: [defaultValue, options?.[0]?.value]});

	const onValueChanged = async (value: string | number) => {
		fire(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, {
			root: $root, model: plans as unknown as PropValue, $p2r: PPUtils.concat($p2r, $pp),
			planDef, plan: planModel, elementDef, element: elementModel, value
		});
	};

	const root = planModel as unknown as BaseModel;
	if (elementOptionsValue == null) {
		const language = Utils.locale();
		const format = Utils.nfXWithLocale(language, 0);
		const def = {
			$wt: 'Box.FC', $root, $model: valuesModel, $p2r, $pp: '.', label,
			$nodes: [
				{
					$wt: 'Dropdown', $pp,
					'data-plan-element-options-value': true, clearable: false,
					options: (options ?? []).map(option => {
						const {label, value, stringify} = option;
						let displayLabel = VUtils.isBlank(label) ? value : label;
						if (typeof displayLabel === 'number') {
							displayLabel = format(displayLabel);
						} else if (typeof displayLabel === 'string' && VUtils.isNotBlank(displayLabel)) {
							const value = Number(displayLabel);
							if (!isNaN(value)) {
								displayLabel = format(value);
							}
						}
						return {
							label: displayLabel, value,
							stringify: stringify != null ? (() => stringify(displayLabel) ?? '') : (void 0)
						};
					}),
					valueChanged: ({newValue}) => onValueChanged(newValue as number | string)
				} as DropdownDef,
				{
					$wt: 'Caption',
					text: <PlanElementUnit valueDef={valueDef} $root={$root} $p2r={$p2r} values={valuesModel}/>
				} as CaptionDef
			]
		} as BoxDef & ModelHolder;

		return <Wrapper {...def} />;
	} else {
		return <>
			{elementOptionsValue({
				elementDef, valueDef, plan: planModel, $p2r, elementCodes,
				element: elementModel, values: valuesModel,
				onValueChanged
			}).map(def => {
				return <Wrapper {...def} $root={root} $model={valuesModel} $p2r={$p2r}/>;
			})}
		</>;
	}
};
