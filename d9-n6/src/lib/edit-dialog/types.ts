import {ReactNode} from 'react';
import {MarkdownContent} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfigurableModel = any;
export type ConfigurableElementAnchor = string;

export interface ConfigurableElement {
	// both for navigator and specific
	code: string;
	label: string;
	anchor: ConfigurableElementAnchor;
	visibleOn?: Array<ConfigurableElementAnchor>;
	visible?: (model: ConfigurableModel) => boolean;
	/** typically 2 levels max */
	children?: Array<ConfigurableElement>;
	// for navigator only
	badge?: (model: ConfigurableModel) => ReactNode;
	// for specific only
	group?: true;
	editor?: (model: ConfigurableModel, onValueChanged: () => void) => ReactNode;
	helpDoc?: MarkdownContent;
}
