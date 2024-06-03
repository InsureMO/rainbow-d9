import {ReactNode} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConfigurableModel = any;

export interface ConfigurableElement {
	name: string;
	label: string;
	anchor: string;
	badge?: (model: ConfigurableModel) => ReactNode;
	visible?: (model: ConfigurableModel) => boolean;
	/** typically 2 levels max */
	children?: ConfigurableElement;
}
