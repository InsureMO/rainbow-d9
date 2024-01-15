import {NodeDef, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import {OmitHTMLProps, OmitNodeDef} from '@rainbow-d9/n2';
import {ReactNode} from 'react';

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
	/** display order, default 0 */
	displayOrder?: number;
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
	value: string;
	label: string;
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
	/** default 0 */
	fractionDigits?: number;
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

// noinspection JSUnusedGlobalSymbols
export interface PlanCoverageDef extends PlanMutableElementDef {
	type: PlanElementType.COVERAGE;
}

// noinspection JSUnusedGlobalSymbols
export interface PlanBenefitDef extends PlanMutableElementDef {
	type: PlanElementType.BENEFIT;
}

// noinspection JSUnusedGlobalSymbols
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

/** configuration definition */
export type PlanSelectionDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	/**
	 * max plans count in one page, default is 3
	 */
	columns?: number;
	/**
	 * plan column width,
	 * default 20%, which means lineHeaderWidth is 40% when columns is 3
	 */
	columnWidth?: number | string;
	/** first column width, default use columns to compute */
	lineHeaderWidth?: number | string;
	/** max body height, plan header and footer are not included */
	maxHeight?: number | string;
	/** plan candidate definitions */
	defs: PlanDefs | (() => Promise<PlanDefs>);
	currencySymbol?: string | ReactNode;
	premiumDescription?: string | ReactNode;
	/** plan header title */
	planTitle?: (def: PlanDef) => Array<NodeDef>;
	/** plan header subtitle */
	planSubTitle?: (def: PlanDef, currencySymbol?: string | ReactNode, premiumDescription?: string | ReactNode) => Array<NodeDef>;
	/** plan element title, level starts from 0 */
	elementTitle?: (def: PlanElementDef, level: number) => Array<NodeDef>;
	elementFixedValue?: (options: {
		elementDef: PlanMutableElementDef; valueDef: PlanElementValueDef;
		plan: SelectedPlan; element: SelectedPlanElement; values: SelectedPlanElement['values'];
		/** path to root is values model to plan model */
		elementCodes: Array<PlanElementCode>;
	}) => Array<NodeDef>;
};
/** widget definition, with html attributes */
export type PlanSelectionProps = OmitNodeDef<PlanSelectionDef> & WidgetProps;
