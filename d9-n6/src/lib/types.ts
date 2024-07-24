import {MonitorNodeDef, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import {OmitHTMLProps, OmitNodeDef} from '@rainbow-d9/n2';
import {FileDefDeserializer, FileDefSerializer, PipelineStepDef} from './definition';

export type MarkdownContent = string;

export type OnContentChanged = (content?: string) => Promise<void>;

export interface PlaygroundModuleUsage {
	useN3?: boolean;
	useN5?: boolean;
	useN6?: boolean;
	useN7?: boolean;
	useN8?: boolean;
}

export interface PlaygroundModuleAssistant {
	/**
	 * create default step placeholder.
	 * for example. when
	 * 1. new step,
	 * 2. first sub step of new step sets
	 */
	createDefaultStep?: () => PipelineStepDef;
	isValidRefPipeline?: (code: string) => boolean;
	isValidRefStep?: (code: string) => boolean;
}

export interface PlaygroundBehavior {
	allowUploadFile?: boolean;
	allowDownloadFile?: boolean;
	allowDownloadImage?: boolean;
}

/** configuration definition */
export type PlaygroundDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	usage?: PlaygroundModuleUsage;
	assistant?: PlaygroundModuleAssistant;
	/** def file serializer, use yaml by default */
	serializer?: FileDefSerializer;
	/** def file deserializer, use yaml by default */
	deserializer?: FileDefDeserializer;
} & PlaygroundBehavior;

/** widget definition, with html attributes */
export type PlaygroundProps = OmitNodeDef<PlaygroundDef> & WidgetProps;

export interface EditorProps extends Required<PlaygroundBehavior> {
	content?: string;
	usage?: PlaygroundModuleUsage;
	assistant?: PlaygroundModuleAssistant;
	serializer: FileDefSerializer;
	deserializer: FileDefDeserializer;
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
