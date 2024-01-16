import {BaseModel, ModelHolder, PropertyPath, Wrapper} from '@rainbow-d9/n1';
import {BoxDef, CaptionDef, CaptionValueToLabelFormats, LabelDef} from '@rainbow-d9/n2';
import React from 'react';
import {PlanElementUnit} from './plan-element-unit';
import {
	PlanDef,
	PlanElementCode,
	PlanElementFixedValueDef,
	PlanMutableElementDef,
	PlanSelectionDef,
	SelectedPlan,
	SelectedPlanElement,
	SelectedPlans
} from './types';
import {useElementDefaultValue} from './use-element-default-value';

export interface PlanElementFixedValueProps {
	planDef: PlanDef;
	elementDef: PlanMutableElementDef;
	valueDef: PlanElementFixedValueDef;
	plan: SelectedPlan;
	plans: SelectedPlans;
	$root: BaseModel;
	/** $root + $p2r => values */
	$p2r: PropertyPath;
	elementCodes: Array<PlanElementCode>;
	element: SelectedPlanElement;
	values: SelectedPlanElement['values'];
	elementFixedValue?: PlanSelectionDef['elementFixedValue'];
}

export const PlanElementFixedValue = (props: PlanElementFixedValueProps) => {
	const {
		elementDef: elementDef, valueDef: valueDef,
		plan: planModel, elementCodes, $root, $p2r,
		element: elementModel, values: valuesModel,
		elementFixedValue
	} = props;
	const {code: $pp, label, defaultValue} = valueDef;

	useElementDefaultValue({model: valuesModel, $pp, defaultValues: [defaultValue]});

	const root = planModel as unknown as BaseModel;
	if (elementFixedValue == null) {
		const def = {
			$wt: 'Box.FC', $root, $model: valuesModel, $p2r, $pp: '.', label,
			$nodes: [
				{
					$wt: 'Label', $pp,
					'data-plan-element-fix-value': true,
					valueToLabel: (value, formats: CaptionValueToLabelFormats) => {
						try {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							return value == null ? '' : formats.nf0(value);
						} catch (e) {
							console.error(e);
							return value == null ? '' : `${value}`;
						}
					}
				} as LabelDef,
				{
					$wt: 'Caption',
					text: <PlanElementUnit valueDef={valueDef} $root={$root} $p2r={$p2r} values={valuesModel}/>
				} as CaptionDef
			]
		} as BoxDef & ModelHolder;

		return <Wrapper {...def} />;
	} else {
		return <>
			{elementFixedValue({
				elementDef, valueDef, plan: planModel, elementCodes, $p2r, element: elementModel, values: valuesModel
			}).map(def => {
				return <Wrapper {...def} $root={root} $model={valuesModel} $p2r={$p2r}/>;
			})}
		</>;
	}
};
