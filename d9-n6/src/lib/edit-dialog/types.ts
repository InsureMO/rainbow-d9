import {ReactNode} from 'react';
import {MarkdownContent} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfigurableModel = any;
export type ConfigurableElementAnchor = string;

export interface ConfigurableElementEditorProps<M extends ConfigurableModel = ConfigurableModel> {
	model: M,
	onValueChanged: () => void
}

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
	changeBy?: Array<ConfigurableElementAnchor>;
	group?: true;
	editor?: (props: ConfigurableElementEditorProps) => JSX.Element;
	helpDoc?: MarkdownContent;
}
