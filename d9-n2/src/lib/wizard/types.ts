import {BaseModel, NodeDef, PropertyPath, PropValue, WidgetProps} from '@rainbow-d9/n1';
import {ReactNode} from 'react';
import {GlobalEventHandlers, ModelCarriedHandler, OmitHTMLProps, OmitNodeDef} from '../types';

export interface WizardStepTitleDef extends NodeDef {
	/** step title */
	title: ReactNode | NodeDef;
	/**
	 * step marker for trigger step switch from outside.
	 * if marker is not provided, then use title as marker, in this case, title must be a string.
	 * otherwise, an auto generated marker is used inside.
	 */
	marker?: string;
}

export interface WizardDefDataRetrieverOptions<R extends BaseModel, M extends PropValue>
	extends ModelCarriedHandler<R, M>, GlobalEventHandlers {
	marker: string;
	absolutePath: PropertyPath;
	propertyPath: PropertyPath;
	firstActive: boolean;
}

export interface WizardStepDef extends WizardStepTitleDef {
	data?: <R extends BaseModel, M extends PropValue>(options: WizardDefDataRetrieverOptions<R, M>) => Promise<void>;
	body: NodeDef | ((marker?: string) => Promise<NodeDef>);
}

export interface WizardSharedDef extends NodeDef {
	lead?: boolean;
	body: NodeDef | (() => Promise<NodeDef>);
}

/** Wizard configuration definition */
export type WizardDef = NodeDef & OmitHTMLProps<HTMLDivElement> & {
	balloon?: boolean;
	emphasisActive?: boolean;
	freeWalk?: boolean;
	/** omit default walker operators to switching steps */
	omitWalker?: boolean;
	/** match step marker first, if not matched, try to match step index */
	reached?: string | number | (() => Promise<string | number>);
	contents: Array<WizardStepDef>;
	shared?: WizardSharedDef;
};
/** Wizard widget definition, with html attributes */
export type WizardProps = OmitNodeDef<WizardDef> & WidgetProps;
