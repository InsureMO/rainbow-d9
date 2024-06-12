import {ReactNode} from 'react';
import {MarkdownContent} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfigurableModel = any;

export interface ConfigurableElement {
	// both for navigator and specific
	code: string;
	label: string;
	anchor: string;
	visible?: (model: ConfigurableModel) => boolean;
	/** typically 2 levels max */
	children?: Array<ConfigurableElement>;
	// for navigator only
	badge?: (model: ConfigurableModel) => ReactNode;
	// for specific only
	group?: true;
	editor?: (model: ConfigurableModel) => ReactNode;
	helpDoc?: MarkdownContent;
}
