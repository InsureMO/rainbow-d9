import {BaseModel, NodeDef, PropertyPath, PropValue, WidgetProps} from '@rainbow-d9/n1';
import {ReactNode} from 'react';
import {BadgeDef} from '../caption';
import {GlobalEventHandlers, ModelCarriedHandler, OmitHTMLProps, OmitNodeDef} from '../types';

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

export interface TabDefDataRetrieverOptions<R extends BaseModel, M extends PropValue>
	extends ModelCarriedHandler<R, M>, GlobalEventHandlers {
	marker: string;
	absolutePath: PropertyPath;
	propertyPath: PropertyPath;
	firstActive: boolean;
}

/**
 * single tab for tabs.
 */
export interface TabDef extends TabTitleDef {
	data?: <R extends BaseModel, M extends PropValue>(options: TabDefDataRetrieverOptions<R, M>) => Promise<void>;
	body: NodeDef | ((marker?: string) => Promise<NodeDef>);
}

/** Tabs configuration definition */
export type TabsDef = NodeDef & OmitHTMLProps<HTMLDivElement> & {
	contents: Array<TabDef>;
	// marker or index of initial active tab
	initActive?: string | number;
};
/** Tabs widget definition, with html attributes */
export type TabsProps = OmitNodeDef<TabsDef> & WidgetProps;
