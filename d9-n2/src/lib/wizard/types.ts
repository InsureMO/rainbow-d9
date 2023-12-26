import {NodeDef, WidgetProps} from '@rainbow-d9/n1';
import {ReactNode} from 'react';
import {OmitHTMLProps, OmitNodeDef} from '../types';

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

export interface WizardStepDef extends WizardStepTitleDef {
	body: NodeDef | (() => Promise<NodeDef>);
}

/** Wizard configuration definition */
export type WizardDef = NodeDef & OmitHTMLProps<HTMLDivElement> & {
	balloon?: boolean;
	emphasisActive?: boolean;
	contents: Array<WizardStepDef>;
};
/** Wizard widget definition, with html attributes */
export type WizardProps = OmitNodeDef<WizardDef> & WidgetProps;
