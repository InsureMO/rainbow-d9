import {
	BaseModel,
	ModelHolder,
	MUtils,
	PPUtils,
	PropertyPath,
	PropValue,
	ValidationMonitor,
	ValidationResult,
	VUtils,
	Wrapper
} from '@rainbow-d9/n1';
import {BoxDef, CaptionDef, DropdownDef, NumberInputDef, Utils} from '@rainbow-d9/n2';
import React from 'react';
import {usePlanSelectionEventBus} from './event/plan-selection-event-bus';
import {PlanSelectionEventTypes} from './event/plan-selection-event-bus-types';
import {PlanElementUnit} from './plan-element-unit';
import {
	PlanDef,
	PlanElementCode,
	PlanElementNumberValueDef,
	PlanMutableElementDef,
	PlanSelectionDef,
	SelectedPlan,
	SelectedPlanElement,
	SelectedPlans
} from './types';
import {useElementDefaultValue} from './use-element-default-value';

export interface PlanElementNumberValueProps {
	planDef: PlanDef;
	elementDef: PlanMutableElementDef;
	valueDef: PlanElementNumberValueDef;
	plan: SelectedPlan;
	plans: SelectedPlans;
	$root: BaseModel;
	/** $root + $p2r => values */
	$p2r: PropertyPath;
	elementCodes: Array<PlanElementCode>;
	element: SelectedPlanElement;
	values: SelectedPlanElement['values'];
	elementNumberValue?: PlanSelectionDef['elementNumberValue'];
	elementNumberValueValidator?: PlanSelectionDef['elementNumberValueValidator'];
}

export const checkMinMaxStep = (valueDef: PlanElementNumberValueDef) => {
	let {min, max, step} = valueDef;
	[min, max, step] = [min, max, step].map(value => {
		const tested = VUtils.isPositive(value);
		return tested.test ? tested.value : (void 0);
	});
	if (min != null && max != null && min > max) {
		[min, max] = [max, min];
	}
	return {min, max, step};
};

export const PlanElementNumberValueDefaultValidator = (options: {
	elementDef: PlanMutableElementDef; valueDef: PlanElementNumberValueDef; min?: number; max?: number; step?: number;
}): ValidationMonitor['$handle'] => {
	const {valueDef: {code: $pp}, min = 0, max, step} = options;
	return (options): ValidationResult => {
		// validator is on box, value of box is values
		const {value: model} = options;
		const value = MUtils.getValue(model, $pp);
		if (VUtils.isBlank(value)) {
			return {valid: false, failReason: 'Value should be a number.'};
		}
		const tested = VUtils.isNumber(value);
		if (!tested.test) {
			return {valid: false, failReason: 'Value should be a number.'};
		}
		const testedValue = tested.value;
		if (max != null && testedValue > max) {
			return {
				valid: false,
				failReason: `Value should be less than or equals ${max}.`
			};
		}
		if (testedValue < min) {
			return {
				valid: false,
				failReason: `Value should be greater than or equals ${min}.`
			};
		}
		// max + step, use options
		// so here is step and min or step only (starts from 0)
		if (step != null && (testedValue - min) % step !== 0) {
			return {
				valid: false,
				failReason: min === 0
					? `Value should be a multiple of ${step}.`
					: `Value should start from ${min} and plus a multiple of ${step}.`
			};
		}

		return {valid: true};
	};
};

export const PlanElementNumberValue = (props: PlanElementNumberValueProps) => {
	const {
		planDef, elementDef, valueDef,
		plan: planModel, plans, $root, $p2r,
		elementCodes,
		element: elementModel, values: valuesModel,
		elementNumberValue, elementNumberValueValidator
	} = props;
	const {code: $pp, label, defaultValue, min} = valueDef;

	const {fire} = usePlanSelectionEventBus();
	useElementDefaultValue({model: valuesModel, $pp, defaultValues: [defaultValue, min ?? 0]});

	const onValueChanged = async (value: string | number) => {
		fire(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, {
			root: $root, model: plans as unknown as PropValue, $p2r: PPUtils.concat($p2r, $pp),
			planDef, plan: planModel, elementDef, element: elementModel, value
		});
	};

	const root = planModel as unknown as BaseModel;
	if (elementNumberValue == null) {
		const {min, max, step} = checkMinMaxStep(valueDef);
		const useOptions = max != null && step != null;
		let editorDef: DropdownDef | NumberInputDef;
		if (useOptions) {
			const language = Utils.locale();
			const format = Utils.nfXWithLocale(language, 0);
			const values = (() => {
				const values = [max];
				let value = max;
				while (value > (min ?? 0)) {
					value = value - step;
					values.push(value);
				}
				return values;
			})();
			editorDef = {
				$wt: 'Dropdown', $pp,
				'data-plan-element-number-value': true, clearable: false,
				options: values.map(value => {
					return {label: format(value), value};
				}),
				valueChanged: ({newValue}) => onValueChanged(newValue as number | string)
			} as DropdownDef;
		} else {
			editorDef = {
				$wt: 'Number', $pp, 'data-plan-element-number-value': true,
				valueChanged: ({newValue}) => onValueChanged(newValue as number | string)
			} as NumberInputDef;
		}
		const def = {
			$wt: 'Box.FC', $root, $model: valuesModel, $p2r, $pp: '.', label,
			$valid: useOptions ? (void 0) : {
				$watch: [$pp],
				$handle: elementNumberValueValidator != null
					? elementNumberValueValidator({elementDef, valueDef})
					: PlanElementNumberValueDefaultValidator({elementDef, valueDef, min, max, step})
			},
			$nodes: [
				editorDef,
				{
					$wt: 'Caption',
					text: <PlanElementUnit valueDef={valueDef} $root={$root} $p2r={$p2r} values={valuesModel}/>
				} as CaptionDef
			]
		} as BoxDef & ModelHolder;

		return <Wrapper {...def} />;
	} else {
		return <>
			{elementNumberValue({
				elementDef, valueDef, plan: planModel, elementCodes, $p2r,
				element: elementModel, values: valuesModel,
				onValueChanged
			}).map(def => {
				return <Wrapper {...def} $root={root} $model={valuesModel} $p2r={$p2r}/>;
			})}
		</>;
	}
};
