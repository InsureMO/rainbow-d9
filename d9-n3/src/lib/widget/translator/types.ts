import {Nullable} from '@rainbow-d9/n1';
import {
	ParsedListItem,
	ParsedListItemAttributePair,
	ParsedListItemAttributes,
	ParsedListItemRefWidget,
	ParsedListItemWidget
} from '../../semantic';

/**
 * classified list item, note might from different lists
 */
export interface ClassifiedAttributesAndWidgets {
	attributes: Array<ParsedListItemAttributes | ParsedListItemAttributePair>;
	widgets: Array<ParsedListItemWidget | ParsedListItemRefWidget>;
	ignored: Array<ParsedListItem>;
}

export interface AttributeMap {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: Nullable<any>;
}
