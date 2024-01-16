import {BaseModel, MUtils, PPUtils, PropertyPath} from '@rainbow-d9/n1';
import React from 'react';
import {PlanElementFixedValue} from './plan-element-fixed-value';
import {PlanElementNumberValue} from './plan-element-number-value';
import {PlanElementOptionsValue} from './plan-element-options-value';
import {PlanElementPin} from './plan-element-pin';
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
import {isElementNumberValueDef, isElementOptionsValueDef} from './utils';

export interface PlanElementValuesProps {
	elementDef: PlanMutableElementDef;
	/** my element code is included */
	elementCodes: Array<PlanElementCode>;
	planDef: PlanDef;
	plan: SelectedPlan;
	plans: SelectedPlans;
	$root: BaseModel;
	/** $root + $p2r => plan */
	$p2r: PropertyPath;
	elementFixedValue?: PlanSelectionDef['elementFixedValue'];
	elementOptionsValue?: PlanSelectionDef['elementOptionsValue'];
	elementNumberValue?: PlanSelectionDef['elementNumberValue'];
	elementNumberValueValidator?: PlanSelectionDef['elementNumberValueValidator'];
}

const getElementModel = (plan: SelectedPlan, $elementToPlans: PropertyPath, elementDef: PlanMutableElementDef): SelectedPlanElement => {
	const {code, pinned = true} = elementDef;
	// get element data model
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	let elementModel = MUtils.getValue(plan, $elementToPlans) as unknown as SelectedPlanElement;
	if (elementModel == null) {
		elementModel = {code, selected: pinned};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		MUtils.setValue(plan, $elementToPlans, elementModel);
	} else {
		// always set code
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		MUtils.setValue(elementModel, `code`, elementDef.code);
		if (pinned === true) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			MUtils.setValue(elementModel, `selected`, true);
		}
	}
	return elementModel;
};

const getValuesModel = (element: SelectedPlanElement): SelectedPlanElement['values'] => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	let valuesModel = MUtils.getValue(element, 'values') as unknown as SelectedPlanElement['values'];
	if (valuesModel == null) {
		// always set values
		valuesModel = {};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		MUtils.setValue(element, 'values', valuesModel);
	}
	return valuesModel;
};

export const PlanElementValues = (props: PlanElementValuesProps) => {
	const {
		elementDef: elementDef, elementCodes,
		planDef, plan: planModel, plans, $root,
		elementFixedValue, elementOptionsValue, elementNumberValue, elementNumberValueValidator
	} = props;

	const {values = []} = elementDef;
	// property path of element model to plan
	const $elementToPlans = elementCodes.map((code, index) => {
		if (index === 0) {
			return `elements.${code}`;
		} else {
			return `children.${code}`;
		}
	}).join('.');
	//  property path of element model to root
	const element$p2r = PPUtils.concat(props.$p2r, $elementToPlans);
	const elementModel = getElementModel(planModel, $elementToPlans, elementDef);

	// no values available, render a checkbox to show the element is selected or not
	// and if element is not pinned, use can tick it or not
	if (values.length === 0) {
		// no values, not pinned
		return <PlanElementPin $root={$root} $p2r={element$p2r} plans={plans}
		                       plan={planModel} planDef={planDef}
		                       element={elementModel} elementDef={elementDef}/>;
	}

	const value$p2r = PPUtils.concat(element$p2r, 'values');
	const valuesModel = getValuesModel(elementModel);

	return <>
		{values.map(valueDef => {
			const {code} = valueDef;
			if (isElementNumberValueDef(valueDef)) {
				return <PlanElementNumberValue planDef={planDef} elementDef={elementDef} valueDef={valueDef}
				                               elementCodes={elementCodes} $root={$root} $p2r={value$p2r}
				                               plans={plans} plan={planModel} element={elementModel}
				                               values={valuesModel as SelectedPlanElement['values']}
				                               elementNumberValue={elementNumberValue}
				                               elementNumberValueValidator={elementNumberValueValidator}
				                               key={code}/>;
			} else if (isElementOptionsValueDef(valueDef)) {
				return <PlanElementOptionsValue planDef={planDef} elementDef={elementDef} valueDef={valueDef}
				                                elementCodes={elementCodes} $root={$root} $p2r={value$p2r}
				                                plans={plans} plan={planModel} element={elementModel}
				                                values={valuesModel as SelectedPlanElement['values']}
				                                elementOptionsValue={elementOptionsValue}
				                                key={code}/>;
			} else {
				return <PlanElementFixedValue planDef={planDef} elementDef={elementDef}
				                              valueDef={valueDef as PlanElementFixedValueDef}
				                              elementCodes={elementCodes} $root={$root} $p2r={value$p2r}
				                              plans={plans} plan={planModel} element={elementModel}
				                              values={valuesModel as SelectedPlanElement['values']}
				                              elementFixedValue={elementFixedValue}
				                              key={code}/>;
			}
		})}
	</>;
};
