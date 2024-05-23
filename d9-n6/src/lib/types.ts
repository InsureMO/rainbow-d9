import {MonitorNodeDef, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import {OmitHTMLProps, OmitNodeDef} from '@rainbow-d9/n2';
import {FileDefLoader} from './definition';

export type OnContentChanged = (content?: string) => Promise<void>;

export interface PlaygroundModuleUsage {
	useN3?: boolean;
	useN5?: boolean;
	useN6?: boolean;
	useN7?: boolean;
	useN8?: boolean;
}

/** configuration definition */
export type PlaygroundDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	usage?: PlaygroundModuleUsage;
	/** def file loader, use yaml by default */
	parser?: FileDefLoader;
};

/** widget definition, with html attributes */
export type PlaygroundProps = OmitNodeDef<PlaygroundDef> & WidgetProps;

export interface EditorProps extends Pick<PlaygroundProps, 'usage'> {
	content?: string;
	parser: FileDefLoader;
}

/** Section configuration definition */
export type UnwrappedPlaygroundProps =
	Omit<PlaygroundProps, 'valueChanged' | 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange?: (value?: string) => void;
	value?: string;
	visible?: boolean;
	disabled?: boolean;
};
