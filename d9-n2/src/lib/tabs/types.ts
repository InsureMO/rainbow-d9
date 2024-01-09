import {NodeDef, WidgetProps} from '@rainbow-d9/n1';
import {ReactNode} from 'react';
import {BadgeDef} from '../caption';
import {OmitHTMLProps, OmitNodeDef} from '../types';

export interface TabTitleDef extends NodeDef {
	/** tab title */
	title: ReactNode | NodeDef;
	/**
	 * tab marker for trigger tab switch from outside.
	 * if marker is not provided, then use title as marker, in this case, title must be a string.
	 * otherwise, an auto generated marker is used inside.
	 */
	marker?: string;
	badge?: ReactNode | BadgeDef;
}

/**
 * single tab for tabs.
 */
export interface TabDef extends TabTitleDef {
	body: NodeDef | ((marker?: string) => Promise<NodeDef>);
}

/** Tabs configuration definition */
export type TabsDef = NodeDef & OmitHTMLProps<HTMLDivElement> & {
	contents: Array<TabDef>;
};
/** Tabs widget definition, with html attributes */
export type TabsProps = OmitNodeDef<TabsDef> & WidgetProps;
