import {
	ParsedHeading,
	ParsedHeadingIdentified,
	ParsedHeadingKind,
	ParsedHeadingReserved,
	ParsedListItem,
	ParsedListItemAttributePair,
	ParsedListItemAttributes,
	ParsedListItemKind,
	ParsedListItemRefWidget,
	ParsedListItemReserved,
	ParsedListItemWidget
} from './types';

export class SemanticUtils {
	public static isIdentifiedHeading(heading: ParsedHeading): heading is ParsedHeadingIdentified {
		return heading.kind === ParsedHeadingKind.IDENTIFIED;
	}

	public static isReservedHeading(heading: ParsedHeading): heading is ParsedHeadingReserved {
		return heading.kind === ParsedHeadingKind.RESERVED;
	}

	public static isWidgetListItem(listItem: ParsedListItem): listItem is ParsedListItemWidget {
		return listItem.kind === ParsedListItemKind.WIDGET;
	}

	public static isRefWidgetListItem(listItem: ParsedListItem): listItem is ParsedListItemWidget {
		return listItem.kind === ParsedListItemKind.REF_WIDGET;
	}

	public static isAnyWidgetListItem(listItem: ParsedListItem): listItem is ParsedListItemWidget | ParsedListItemRefWidget {
		return SemanticUtils.isWidgetListItem(listItem) || SemanticUtils.isRefWidgetListItem(listItem);
	}

	public static isAttributePairListItem(listItem: ParsedListItem): listItem is ParsedListItemAttributePair {
		return listItem.kind === ParsedListItemKind.ATTRIBUTE_PAIR;
	}

	public static isAttributesListItem(listItem: ParsedListItem): listItem is ParsedListItemAttributes {
		return listItem.kind === ParsedListItemKind.ATTRIBUTES;
	}

	public static isAnyAttributeListItem(listItem: ParsedListItem): listItem is ParsedListItemAttributePair | ParsedListItemAttributes {
		return SemanticUtils.isAttributePairListItem(listItem) || SemanticUtils.isAttributesListItem(listItem);
	}

	public static isReservedListItem(listItem: ParsedListItem): listItem is ParsedListItemReserved {
		return listItem.kind === ParsedListItemKind.RESERVED;
	}
}
