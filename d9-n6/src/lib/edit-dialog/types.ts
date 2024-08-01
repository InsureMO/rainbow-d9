import {ReactNode} from 'react';
import {MarkdownContent, PlaygroundModuleAssistant} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfigurableModel = any;
export type ConfigurableElementAnchor = string;

export interface ConfigurableElementEditorProps<M extends ConfigurableModel = ConfigurableModel> {
	model: M;
	/* default repaint is true */
	onValueChanged: (repaint?: boolean) => void;
	assistant: Required<PlaygroundModuleAssistant>;
}

export interface ConfigurableElement {
	// both for navigator and specific
	code: string;
	label: ReactNode;
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
	/** available only when it is a group */
	collapsible?: true;
	/** available only when it is collapsible, and only impact the initial status */
	collapsed?: true;
	editor?: (props: ConfigurableElementEditorProps) => JSX.Element;
	helpDoc?: MarkdownContent;
}
