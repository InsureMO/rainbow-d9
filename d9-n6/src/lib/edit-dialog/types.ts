import {ReactNode} from 'react';

export interface ConfigurableElement {
	name: string;
	label: string;
	anchor: string;
	badge?: ReactNode;
	/** typically 2 levels max */
	children?: ConfigurableElement;
}
