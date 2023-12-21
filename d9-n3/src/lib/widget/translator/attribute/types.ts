import {ParsedListItemAttributePair} from '../../../semantic';
import {Nullable, Undefinable} from '../../../utility-types';

export type AnyAttributeName = string;
export type WidgetPropertyName = string;

export interface AttributeValueBuild<Built> {
	accept(key: WidgetPropertyName): boolean;

	build(value: Undefinable<string>, list: ParsedListItemAttributePair): Nullable<Built>;
}
