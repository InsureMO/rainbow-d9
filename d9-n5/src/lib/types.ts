import {
	BaseModel,
	ExternalDefKey,
	ExternalDefs,
	MonitorNodeDef,
	ValueChangeableNodeDef,
	WidgetProps,
	WidgetType
} from '@rainbow-d9/n1';
import {OmitHTMLProps, OmitNodeDef} from '@rainbow-d9/n2';

export type OnContentChanged = (content?: string) => Promise<void>;

export interface ExternalDefType {
	$wt: WidgetType;
	properties: Array<string>;
	label?: string;
	description?: string;
}

export interface ExternalDefsTypes {
	/**
	 * to define the external def can be used for which widgets/properties.
	 * or it has sub keys
	 */
	[key: ExternalDefKey]: ExternalDefType | Array<ExternalDefType> | ExternalDefsTypes | Array<ExternalDefsTypes>;
}

export interface PlaygroundWidgetProperty {
	name: string;
	label?: string;
	description?: string;
}

export enum PlaygroundWidgetGroupKey {
	CONTAINERS = 'container-group',
	INPUTS = 'input-group',
	OPTIONS = 'options-group',
	DISPLAY = 'display-group',
	NOT_CARE = 'not-care'
}

export interface PlaygroundWidgetGroup {
	key: string;
	icon: string;
	tooltip: string;
}

export interface PlaygroundWidget {
	$wt: WidgetType;
	/** sometimes same widget could be display in various ways, use to identity it */
	$key?: string;
	/** code completion short description */
	label?: string;
	/** code completion description */
	description?: string;
	/** available properties for this widget */
	properties?: Array<PlaygroundWidgetProperty>;
	/** if declared, this widget allows under these parents only */
	$parent?: WidgetType | Array<WidgetType>;
	/** toolbar bar button group */
	group: PlaygroundWidgetGroupKey | string;
	/** some widgets are used internally, therefore no need to display in toolbar */
	notInToolbar?: boolean;
	/** use empty string if widget is not in toolbar */
	icon: string;
	/** toolbar button tooltip */
	tooltip?: string;
	/** widget markdown template, required when notInToolbar is not true */
	template?: string;
}

export interface PlaygroundIcon {
	$key: string;
	label?: string;
	description?: string;
}

export interface PlaygroundIconApplicableTo {
	$wt: WidgetType;
	properties: Array<string>;
}

export interface PlaygroundIconsUsage {
	icons: Array<PlaygroundIcon>;
	applicableTo: Array<PlaygroundIconApplicableTo>;
}

export interface PlaygroundConstant {
	$prefix: string;
	label?: string;
	description?: string;
}

export interface PlaygroundReference {
	$prefix: string;
	label?: string;
	description?: string;
}

export interface PlaygroundWidgets {
	groups?: Array<PlaygroundWidgetGroup>;
	widgets?: Array<PlaygroundWidget>;
	icons?: PlaygroundIconsUsage;
	constants?: Array<PlaygroundConstant>;
	extensions?: Array<PlaygroundReference>;
}

export interface PlaygroundWidgetUsage {
	useN2?: boolean;
	useCharts?: boolean;
}

/** configuration definition */
export type PlaygroundDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	mockData?: BaseModel | (() => Promise<BaseModel>);
	externalDefs?: ExternalDefs | (() => Promise<ExternalDefs>);
	/** in case of external defs has proxy property */
	externalDefsTypes?: ExternalDefsTypes | (() => Promise<ExternalDefsTypes>);
	widgets?: PlaygroundWidgets;
	usage?: PlaygroundWidgetUsage;
	minViewerWidth?: number;
	maxMode?: boolean;
	zenMode?: boolean;
};

/** widget definition, with html attributes */
export type PlaygroundProps = OmitNodeDef<PlaygroundDef> & WidgetProps;

export interface EditorProps {
	content?: string;
	externalDefsTypes?: ExternalDefsTypes;
	widgets: Required<PlaygroundWidgets>;
}

export interface ViewerProps {
	mockData: BaseModel;
	externalDefs?: ExternalDefs;
	minViewerWidth?: number;
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
