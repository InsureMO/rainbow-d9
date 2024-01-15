import {BaseModel, ModelHolder, MUtils, Wrapper} from '@rainbow-d9/n1';
import {CheckboxDef} from '@rainbow-d9/n2';
import React from 'react';
import {PlanElementFixedValue} from './plan-element-fixed-value';
import {
	PlanElementCode,
	PlanElementValueEditType,
	PlanMutableElementDef,
	PlanSelectionDef,
	SelectedPlan,
	SelectedPlanElement
} from './types';

export interface PlanElementValuesProps {
	element: PlanMutableElementDef;
	/** my element code is included */
	elementCodes: Array<PlanElementCode>;
	plan: SelectedPlan;
	elementFixedValue?: PlanSelectionDef['elementFixedValue'];
}

export const PlanElementValues = (props: PlanElementValuesProps) => {
	const {
		element: elementDef, elementCodes,
		plan: planModel,
		elementFixedValue
	} = props;

	const {pinned = true, values = []} = elementDef;
	const $p2r = elementCodes.map((code, index) => {
		if (index === 0) {
			return `elements.${code}`;
		} else {
			return `children.${code}`;
		}
	}).join('.');

	const root = planModel as unknown as BaseModel;
	// always set code
	MUtils.setValue(root, `${$p2r}.code`, elementDef.code);
	if (pinned) {
		MUtils.setValue(root, `${$p2r}.selected`, true);
	}
	// get element data model
	const model = MUtils.getValue(root, $p2r) as unknown as BaseModel;
	const elementModel = model as unknown as SelectedPlanElement;
	if (values.length === 0) {
		// no values, not pinned
		const def = {
			$wt: 'Checkbox', $pp: 'selected', $root: root, $model: model, $p2r,
			'data-element-pinned': pinned, emptyWhenFalse: false,
			$disabled: pinned,
			valueChanged: () => {
				// TODO INVOKE VALUE CHANGE
				console.log(root, model);
			}
		} as CheckboxDef & ModelHolder;
		return <Wrapper {...def} />;
	}

	let valuesModel = MUtils.getValue(model, 'values') as unknown as BaseModel;
	if (valuesModel == null) {
		// always set values
		valuesModel = {};
		MUtils.setValue(model, 'values', valuesModel);
	}
	const value$p2r = `${$p2r}.values`;

	return <>
		{values.map(valueDef => {
			const {code, editType} = valueDef;
			switch (editType) {
				case PlanElementValueEditType.NUMBER:
					return <></>;
				case PlanElementValueEditType.OPTIONS:
					return <></>;
				case PlanElementValueEditType.FIXED:
				default:
					return <PlanElementFixedValue elementDef={elementDef} valueDef={valueDef}
					                              elementCodes={elementCodes} $p2r={value$p2r}
					                              plan={planModel} element={elementModel}
					                              values={valuesModel as SelectedPlanElement['values']}
					                              elementFixedValue={elementFixedValue}
					                              key={code}/>;
			}
		})}
	</>;
};
