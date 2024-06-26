import {
	BaseModel,
	NodeDef,
	PropertyPath,
	PropValue,
	ValidationMonitor,
	ValueChangeableNodeDef,
	WidgetProps
} from '@rainbow-d9/n1';
import {
	ButtonClick,
	Global,
	GlobalEventHandlers,
	ModelCarriedHandler,
	OmitHTMLProps,
	OmitNodeDef
} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import {PlansChangedEventOptions} from './event/plan-selection-event-bus-types';

// plan definition part
export type PlanElementCode = string;

export enum PlanElementType {
	CATEGORY = 'PolicyElementCategory',
	COVERAGE = 'PolicyCoverage',
	BENEFIT = 'PolicyBenefit',
	LIMIT_DEDUCTIBLE = 'PolicyLimitDeductible',
}

export interface PlanElementDef {
	code: PlanElementCode;
	name: string;
	/** reserved for future use */
	description?: string;
	type: PlanElementType;
	children?: Array<PlanElementDef>;
	/** only works when it has children, default undefined means not collapsible */
	collapsed?: boolean;
	/** display order, default 0 */
	displayOrder?: number;
	tip?: Omit<Global.TipOptions, 'ref' | 'prefix'>;
}

export interface PlanCategoryDef extends PlanElementDef {
	type: PlanElementType.CATEGORY;
	/** category must have children */
	children: Array<PlanElementDef>;
}

export type PlanElementValueCode = string;

export enum PlanElementValueEditType {
	FIXED = 'fixed',
	/** use options when value is string */
	OPTIONS = 'options',
	/** available when value is number */
	NUMBER = 'number',
}

// noinspection DuplicatedCode
export interface PlanElementValueDef {
	code: PlanElementValueCode;
	/** element value might be not required, which means default value is not required either */
	defaultValue?: string | number;
	label?: string;
	unit?: string;
	/** reserved for future use */
	description?: string;
	editType: PlanElementValueEditType;
}

export interface PlanElementFixedValueDef extends PlanElementValueDef {
	editType: PlanElementValueEditType.FIXED;
}

export interface PlanElementValueOption {
	value: number | string;
	label?: number | string | ReactNode;
	/** if label is not a number or string, provide the stringify function to enable dropdown filter */
	stringify?: (label: string | ReactNode) => string;
}

export type PlanElementValueOptions = Array<PlanElementValueOption>;

export interface PlanElementOptionsValueDef extends PlanElementValueDef {
	editType: PlanElementValueEditType.OPTIONS;
	options: PlanElementValueOptions;
}

export interface PlanElementNumberValueDef extends PlanElementValueDef {
	defaultValue?: number;
	editType: PlanElementValueEditType.NUMBER;
	min?: number;
	max?: number;
	/**
	 * if step is defined, min and max must be defined.
	 * and max must be n times of min.
	 * the render type should be an options list (dropdown).
	 */
	step?: number;
}

export type PlanMutableElementType = Exclude<PlanElementType, PlanElementType.CATEGORY>;

export interface PlanMutableElementDef extends PlanElementDef {
	type: PlanMutableElementType;
	/** element value might be not required */
	values?: Array<PlanElementValueDef>;
	/**
	 * usually customized plan, which means element can be unpinned.
	 * default true
	 */
	pinned?: boolean;
}

export interface PlanCoverageDef extends PlanMutableElementDef {
	type: PlanElementType.COVERAGE;
}

export interface PlanBenefitDef extends PlanMutableElementDef {
	type: PlanElementType.BENEFIT;
}

export interface PlanLimitDeductibleDef extends PlanMutableElementDef {
	type: PlanElementType.LIMIT_DEDUCTIBLE;
}

export type PlanCode = string;

export interface PlanDef {
	code: PlanCode;
	name: string;
	elements: Array<PlanElementDef>;
	/**
	 * usually used in customized plan, which means element can be unpinned.
	 * and it is a default value for all elements, if pinned property is against this value, use pinned property instead.
	 * default is true
	 */
	pinned?: boolean;
}

export type PlanDefs = Array<PlanDef>;

// plan instance data part
export type TaxCode = string;

export interface Tax {
	code: TaxCode;
	name: string;
	rate?: number;
	/** default 0 */
	amount: number;
}

export type DiscountCode = string;

export interface Discount {
	code: DiscountCode;
	name: string;
	rate?: number;
	/** default 0 */
	amount: number;
}

export type LoadingCode = string;

export interface Loading {
	code: LoadingCode;
	name: string;
	rate?: number;
	/** default 0 */
	amount: number;
}

export interface Premium {
	/** net premium */
	net: number;
	/** total premium before discount */
	gross: number;
	/** final premium to pay */
	due: number;
	taxes?: Array<Tax>;
	discounts?: Array<Discount>;
	loadings?: Array<Loading>;
}

export type SelectedPlanElementValue = string | number;

export interface SelectedPlanElement {
	code: PlanElementCode;
	/** for unpinned element */
	selected: boolean;
	/** values are only for mutable plan element */
	values?: Record<PlanElementValueCode, SelectedPlanElementValue>;
	/** if there is premium details for plan element */
	premium?: Premium;
	children?: Record<PlanElementCode, SelectedPlanElement>;
}

export interface SelectedPlan {
	code: PlanCode;
	elements: Record<PlanElementCode, SelectedPlanElement>;
	premium?: Premium;
	/** default false */
	selected?: boolean;
}

export type SelectedPlans = Record<PlanCode, SelectedPlan>;
export type PlanChange = Omit<PlansChangedEventOptions, 'root' | 'model'>;
export type PlanChanges = Array<PlanChange>;

export interface CalculationEvent extends ModelCarriedHandler<BaseModel, PropValue> {
	changes: PlanChanges;
}

export interface PlanSelectionDefsOptions
	extends ModelCarriedHandler<BaseModel, PropValue>, GlobalEventHandlers {
}

export type PlanDefsFunc = (options: PlanSelectionDefsOptions) => Promise<PlanDefs>;

export interface PlanValuesInitOptions
	extends ModelCarriedHandler<BaseModel, PropValue>, GlobalEventHandlers {
	defs: PlanDefs;
}

export type PlanValuesInitFunc = (options: PlanValuesInitOptions) => Promise<void>;

export interface PlanValuesClearOptions
	extends ModelCarriedHandler<BaseModel, PropValue>, GlobalEventHandlers {
	defs: PlanDefs;
}

export type PlanValuesClearFunc = (options: PlanValuesClearOptions) => Promise<void>;
export type PlanTitleFunc = (def: PlanDef, elementValueChanged: boolean) => Array<NodeDef | ReactNode>;
export type PlanSubTitleFunc = (def: PlanDef, elementValueChanged: boolean, currencySymbol?: string | ReactNode, premiumDescription?: string | ReactNode) => Array<NodeDef | ReactNode>;
export type PlanElementTitleFunc = (def: PlanElementDef, level: number, forceUpdate: () => void) => Array<NodeDef | ReactNode>;

export interface PlanElementFixedValueOptions {
	elementDef: PlanMutableElementDef;
	valueDef: PlanElementFixedValueDef;
	plan: SelectedPlan;
	$p2r: PropertyPath;
	element: SelectedPlanElement;
	values: SelectedPlanElement['values'];
	/** path to root is values model to plan model */
	elementCodes: Array<PlanElementCode>;
}

export type PlanElementFixedValueFunc = (options: PlanElementFixedValueOptions) => Array<NodeDef>;

export interface PlanElementOptionsValueOptions {
	elementDef: PlanMutableElementDef;
	valueDef: PlanElementOptionsValueDef;
	plan: SelectedPlan;
	$p2r: PropertyPath;
	element: SelectedPlanElement;
	values: SelectedPlanElement['values'];
	/** path to root is values model to plan model */
	elementCodes: Array<PlanElementCode>;
	onValueChanged: (value: string | number) => Promise<void>;
}

export type PlanElementOptionsValueFunc = (options: PlanElementOptionsValueOptions) => Array<NodeDef>

export interface PlanElementNumberValueOptions {
	elementDef: PlanMutableElementDef;
	valueDef: PlanElementNumberValueDef;
	plan: SelectedPlan;
	$p2r: PropertyPath;
	element: SelectedPlanElement;
	values: SelectedPlanElement['values'];
	/** path to root is values model to plan model */
	elementCodes: Array<PlanElementCode>;
	onValueChanged: (value: string | number) => Promise<void>;
}

export type PlanElementNumberValueFunc = (options: PlanElementNumberValueOptions) => Array<NodeDef>;

export interface PlanElementNumberValueValidatorOptions {
	elementDef: PlanMutableElementDef;
	valueDef: PlanElementNumberValueDef;
}

export type PlanElementNumberValueValidatorFunc = (options: PlanElementNumberValueValidatorOptions) => ValidationMonitor['$handle'];
export type PlanOperatorsFunc = (def: PlanDef, plan: SelectedPlan) => Array<NodeDef | ReactNode>;
export type PlanCalculateFunc = (event: CalculationEvent) => Promise<void>;

/** configuration definition */
export type PlanSelectionDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	/** use on identify itself when event fired */
	marker?: string;
	/**
	 * max plans count in one page, default is 3.
	 * set tp <=0 value to represent no limit, which means show horizontal scrollbar and column width and line header width are in pixels (number).
	 */
	columns?: number;
	/**
	 * plan column width
	 */
	columnWidth?: number | string;
	/** first column width, default use columns to compute */
	lineHeaderWidth?: number | string;
	/** max body height, plan header and footer are not included */
	maxHeight?: number | string;
	/** plan candidate definitions */
	defs: PlanDefs | PlanDefsFunc;
	valuesInit?: PlanValuesInitFunc;
	valuesClear?: PlanValuesClearFunc;
	currencySymbol?: string | ReactNode;
	premiumDescription?: string | ReactNode;
	buyText?: string | ReactNode;
	buy?: ButtonClick
	/** plan header title */
	planTitle?: PlanTitleFunc;
	/** plan header subtitle */
	planSubTitle?: PlanSubTitleFunc;
	/** plan element title, level starts from 0 */
	elementTitle?: PlanElementTitleFunc;
	elementFixedValue?: PlanElementFixedValueFunc;
	elementOptionsValue?: PlanElementOptionsValueFunc;
	elementNumberValue?: PlanElementNumberValueFunc;
	elementNumberValueValidator?: PlanElementNumberValueValidatorFunc;
	planOperators?: PlanOperatorsFunc;
	/** default 1s */
	calculationDelay?: number;
	/** do calculation */
	calculate?: PlanCalculateFunc;
};
/** widget definition, with html attributes */
export type PlanSelectionProps = OmitNodeDef<PlanSelectionDef> & WidgetProps;

export enum PlanSelectionGlobalEventPrefix {
	RELOAD_DEFS = 'plan-selection-reload-defs',
}
