import {BaseModel, ExternalDefKey, ExternalDefs, WidgetType} from '@rainbow-d9/n1';

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

export interface D9PlaygroundProps {
	content?: string;
	/** in case of markdown need to be handled externally */
	onContentChanged?: OnContentChanged;
	/** mock data */
	model?: BaseModel;
	externalDefs?: ExternalDefs;
	/** in case of external defs has proxy property */
	externalDefsTypes?: ExternalDefsTypes;
}

export interface D9EditorProps extends Pick<D9PlaygroundProps, 'content' | 'externalDefsTypes'> {
}

export interface D9ViewerProps extends Pick<D9PlaygroundProps, 'externalDefs'> {
	/** mock data */
	model: BaseModel;
}
