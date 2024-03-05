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
}

export interface ExternalDefsTypes {
	/**
	 * to define the external def can be used for which widgets/properties.
	 * or it has sub keys
	 */
	[key: ExternalDefKey]: ExternalDefType | Array<ExternalDefType> | ExternalDefsTypes;
}

/** configuration definition */
export type D9PlaygroundDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	mockData?: BaseModel | (() => Promise<BaseModel>);
	externalDefs?: ExternalDefs | (() => Promise<ExternalDefs>);
	/** in case of external defs has proxy property */
	externalDefsTypes?: ExternalDefsTypes | (() => Promise<ExternalDefsTypes>);
};

/** widget definition, with html attributes */
export type D9PlaygroundProps = OmitNodeDef<D9PlaygroundDef> & WidgetProps;

export interface D9EditorProps {
	content?: string;
	externalDefsTypes?: ExternalDefsTypes;
}

export interface D9ViewerProps {
	mockData: BaseModel;
	externalDefs?: ExternalDefs;
}

/** Section configuration definition */
export type UnwrappedPlaygroundProps =
	Omit<D9PlaygroundProps, 'valueChanged' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange?: (value?: string) => void;
	visible?: boolean;
	disabled?: boolean;
};
