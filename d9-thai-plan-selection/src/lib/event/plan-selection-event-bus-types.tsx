import {BaseModel, PropertyPath, PropValue} from '@rainbow-d9/n1';
import {ModelCarriedHandler} from '@rainbow-d9/n2';
import {PlanDef, PlanElementDef, PlanElementValueDef, SelectedPlan, SelectedPlanElement} from '../types';

export enum PlanSelectionEventTypes {
	ELEMENT_VALUE_CHANGED = 'element-value-changed',
	PREMIUM_CALCULATED = 'premium-calculated'
}

export interface PlanChangedEventOptions {
	planDef: PlanDef;
	elementDef: PlanElementDef;
	/** ignored when selected changed only */
	valueDef?: PlanElementValueDef;
	plan: SelectedPlan;
	element: SelectedPlanElement;
	/** boolean when selected changed only */
	value?: string | number | boolean;
	/** $p2r is the property path of value to root */
	$p2r: PropertyPath;
}

/** model is the plans model */
export interface PlansChangedEventOptions extends ModelCarriedHandler<BaseModel, PropValue>, PlanChangedEventOptions {
}

export interface PremiumCalculatedEventOptions {
	planDef: PlanDef;
}

export interface PlanSelectionEventBus {
	fire(type: PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, options: PlansChangedEventOptions): this;

	on(type: PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, listener: (options: PlansChangedEventOptions) => void): this;

	off(type: PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, listener: (options: PlansChangedEventOptions) => void): this;

	fire(type: PlanSelectionEventTypes.PREMIUM_CALCULATED, options: PremiumCalculatedEventOptions): this;

	on(type: PlanSelectionEventTypes.PREMIUM_CALCULATED, listener: (options: PremiumCalculatedEventOptions) => void): this;

	off(type: PlanSelectionEventTypes.PREMIUM_CALCULATED, listener: (options: PremiumCalculatedEventOptions) => void): this;
}
