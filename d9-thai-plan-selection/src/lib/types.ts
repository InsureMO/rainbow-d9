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

export interface PlanElementValue {
	code: PlanElementValueCode;
	/** element value might be not required, which means default value is not required either */
	defaultValue?: string | number;
	label?: string;
	unit?: string;
	/** reserved for future use */
	description?: string;
	editType: PlanElementValueEditType;
}

export interface PlanElementFixedValue extends PlanElementValue {
	editType: PlanElementValueEditType.FIXED;
}

export interface PlanElementValueOption {
	value: string;
	label: string;
}

export type PlanElementValueOptions = Array<PlanElementValueOption>;

export interface PlanElementOptionsValue extends PlanElementValue {
	editType: PlanElementValueEditType.OPTIONS;
	options: PlanElementValueOptions;
}

export interface PlanElementNumberValue extends PlanElementValue {
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
	values?: Array<PlanElementValue>;
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

export interface SelectedPlanElementValue {
	code: PlanElementValueCode;
	value?: string | number;
}

export interface SelectedPlanElement {
	code: PlanElementCode;
	/** for unpinned element */
	selected: boolean;
	/** values are only for mutable plan element */
	values?: Array<SelectedPlanElementValue>;
	/** if there is premium details for plan element */
	premium?: Premium;
}

export interface SelectedPlan {
	code: PlanCode;
	/** hierarchy exactly same as definition */
	elements: Array<SelectedPlanElement>;
	premium?: Premium;
	/** default false */
	selected?: boolean;
}

export type SelectedPlans = Array<SelectedPlan>;

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
	/** plan header title */
	planTitle?: Array<NodeDef>;
	/** plan header subtitle */
	planSubTitle?: Array<NodeDef>;
};
/** widget definition, with html attributes */
export type PlanSelectionProps = OmitNodeDef<PlanSelectionDef> & WidgetProps;
