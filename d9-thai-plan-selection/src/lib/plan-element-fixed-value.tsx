import {BaseModel, ModelHolder, MUtils, PropertyPath, VUtils, Wrapper} from '@rainbow-d9/n1';
import {CaptionValueToLabelFormats, LabelDef, LabelLike} from '@rainbow-d9/n2';
import React from 'react';
import {
	PlanElementCode,
	PlanElementFixedValueDef,
	PlanElementValueDef,
	PlanMutableElementDef,
	PlanSelectionDef,
	SelectedPlan,
	SelectedPlanElement
} from './types';

export interface PlanElementFixedValueProps {
	elementDef: PlanMutableElementDef;
	valueDef: PlanElementValueDef;
	plan: SelectedPlan;
	elementCodes: Array<PlanElementCode>;
	$p2r: PropertyPath;
	element: SelectedPlanElement;
	values: SelectedPlanElement['values'];
	elementFixedValue?: PlanSelectionDef['elementFixedValue'];
}

export const PlanElementFixedValue = (props: PlanElementFixedValueProps) => {
	const {
		elementDef: elementDef, valueDef: valueDef,
		plan: planModel, elementCodes, $p2r, element: elementModel, values: valuesModel,
		elementFixedValue
	} = props;
	const {code: $pp, label, defaultValue, unit} = valueDef as PlanElementFixedValueDef;

	const root = planModel as unknown as BaseModel;
	if (defaultValue != null) {
		MUtils.setValue(valuesModel, $pp, defaultValue);
	}

	if (elementFixedValue == null) {
		const def = {
			$wt: 'Label.FC', $pp, $root: root, $model: valuesModel, $p2r, label,
			'data-plan-element-fix-value': true,
			valueToLabel: (value, formats: CaptionValueToLabelFormats) => {
				const displayLabel = ((): string => {
					try {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						return value == null ? '' : formats.nf0(value);
					} catch (e) {
						console.error(e);
						return value == null ? '' : `${value}`;
					}
				})();
				const unit$wrapped = {
					$root: root, $model: valuesModel, $p2r, $onValueChange: VUtils.noop, $avs: {}
				};
				return <>
					<span data-plan-element-fix-value={true}>{displayLabel}</span>
					<span data-plan-element-fix-value-unit={true}><LabelLike label={unit}
					                                                         $wrapped={unit$wrapped}/></span>
				</>;
			}
		} as LabelDef & ModelHolder;

		return <Wrapper {...def} />;
	} else {
		return <>
			{elementFixedValue({
				elementDef, valueDef, plan: planModel, elementCodes, element: elementModel, values: valuesModel
			}).map(def => {
				return <Wrapper {...def} $root={root} $model={valuesModel} $p2r={$p2r}/>;
			})}
		</>;
	}
};
