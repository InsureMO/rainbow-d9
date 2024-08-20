import {MonitorNodeDef, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import {OmitHTMLProps, OmitNodeDef} from '@rainbow-d9/n2';
import {FileDefDeserializer, FileDefSerializer, PipelineStepDef} from './definition';

export type MarkdownContent = string;

export type OnContentChanged = (content?: string) => Promise<void>;

export interface PlaygroundSystemEndpointForHttp {
	code: string;
	name: string;
	url?: string;
}

export interface PlaygroundSystemForHttp {
	code: string;
	name: string;
	endpoints: Array<PlaygroundSystemEndpointForHttp>;
}

export interface PlaygroundTypeOrmDatasource {
	code: string;
	name: string;
}

export interface PlaygroundRefPipeline {
	code: string;
	name: string;
}

export interface PlaygroundRefStep {
	code: string;
	name: string;
}

export interface PlaygroundModuleAssistant {
	/**
	 * create default step placeholder.
	 * for example. when
	 * 1. new step,
	 * 2. first sub step of new step sets
	 */
	createDefaultStep?: () => PipelineStepDef;
	askSystemsForHttp?: () => Array<PlaygroundSystemForHttp>;
	askTypeOrmDatasources?: () => Array<PlaygroundTypeOrmDatasource>;
	askRefPipelines?: () => Array<PlaygroundRefPipeline>;
	askRefSteps?: () => Array<PlaygroundRefStep>;
}

export interface PlaygroundBehavior {
	allowUploadFile?: boolean;
	allowDownloadFile?: boolean;
	allowDownloadImage?: boolean;
}

/** configuration definition */
export type PlaygroundDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
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
