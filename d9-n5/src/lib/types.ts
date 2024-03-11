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
	$wt: string;
	label?: string;
	description?: string;
	properties?: Array<PlaygroundWidgetProperty>;
	group: PlaygroundWidgetGroupKey | string;
	/** some widgets are used internally, therefore no need to display in toolbar */
	notInToolbar?: boolean;
	/** use empty string if widget is not in toolbar */
	icon: string;
	tooltip?: string;
}

export interface PlaygroundIcon {
	$key: string;
	label?: string;
	description?: string;
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
	icons?: Array<PlaygroundIcon>;
	constants?: Array<PlaygroundConstant>;
	extensions?: Array<PlaygroundReference>;
}

/** configuration definition */
export type PlaygroundDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	mockData?: BaseModel | (() => Promise<BaseModel>);
	externalDefs?: ExternalDefs | (() => Promise<ExternalDefs>);
	/** in case of external defs has proxy property */
	externalDefsTypes?: ExternalDefsTypes | (() => Promise<ExternalDefsTypes>);
	widgets?: PlaygroundWidgets;
	useN2?: boolean;
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
}

/** Section configuration definition */
export type UnwrappedPlaygroundProps =
	Omit<PlaygroundProps, 'valueChanged' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange?: (value?: string) => void;
	visible?: boolean;
	disabled?: boolean;
};
