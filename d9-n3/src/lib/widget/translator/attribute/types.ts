import {Nullable, Undefinable} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../../../semantic';

export type AnyAttributeName = string;
export type WidgetPropertyName = string;

export interface AttributeValueBuild<Built> {
	accept(key: WidgetPropertyName): boolean;

	build(value: Undefinable<string>, list: ParsedListItemAttributePair): Nullable<Built>;
}

export type ScriptSnippet = string;