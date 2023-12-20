import {NodeUniqueKey, PropertyPath} from '@rainbow-d9/n1';
import {Alternative, Association, Reference, Resource} from 'mdast';
import {
	PreparsedBlockquote,
	PreparsedBreak,
	PreparsedCode,
	PreparsedDefinition,
	PreparsedDelete,
	PreparsedEmphasis,
	PreparsedFootnote,
	PreparsedFootnoteDefinition,
	PreparsedFootnoteReference,
	PreparsedHeading,
	PreparsedHtml,
	PreparsedImage,
	PreparsedImageReference,
	PreparsedInlineCode,
	PreparsedLink,
	PreparsedLinkReference,
	PreparsedList,
	PreparsedListItem,
	PreparsedNodes,
	PreparsedParagraph,
	PreparsedStrong,
	PreparsedSubordinateOfHeadingNodes,
	PreparsedSubordinateOfListItemNodes,
	PreparsedTable,
	PreparsedTableCell,
	PreparsedTableRow,
	PreparsedText,
	PreparsedThematicBreak,
	PreparsedYaml
} from '../ast';
import {ParsedNodeType} from '../node-types';

export type WidgetType = string;
export type WidgetId = string;

export enum IgnoredOnTransitToWidgetDefType {
	DECLARE_AS_IGNORED, DETECT_AS_RESERVED,

	INCORRECT_INDEX_ATTR_AFTER_WIDGET,
	INCORRECT_INDEX_ATTR_IN_NON_FIRST_LIST,

	UNKNOWN
}

export interface IgnoredOnTransitToWidget {
	type: IgnoredOnTransitToWidgetDefType;
	reason?: string;
}

/**
 * content holder, with exactly the original Markdown lines, and start/end line number
 */
export interface ParsedNode<P extends PreparsedNodes> {
	type: ParsedNodeType;
	preparsed: P;
	ignoredOnTransitToWidget?: IgnoredOnTransitToWidget;
}

export interface ParsedWidgetNode<P extends PreparsedHeading | PreparsedListItem> extends ParsedNode<P> {
	$flag: WidgetFlag;
}

export enum WidgetFlag {
	STANDARD, EXPORT, IGNORE
}

export enum ParsedHeadingKind {
	IDENTIFIED, RESERVED
}

/**
 * parsed heading
 */
export interface ParsedHeading extends ParsedNode<PreparsedHeading> {
	type: ParsedNodeType.HEADING;
	kind: ParsedHeadingKind;
}

/**
 * identified parsed heading, but still might be declared as ignored
 */
export interface ParsedHeadingIdentified extends ParsedHeading, ParsedWidgetNode<PreparsedHeading> {
	type: ParsedNodeType.HEADING;
	kind: ParsedHeadingKind.IDENTIFIED;
	$wt: WidgetType;
	$pp?: PropertyPath;
	$id: WidgetId;
	$key: NodeUniqueKey;
	headline?: string;
	children: Array<ParsedNode<PreparsedSubordinateOfHeadingNodes>>;
}

/**
 * parsed heading which not identified. reserved for future uses.
 */
export interface ParsedHeadingReserved extends ParsedHeading {
	kind: ParsedHeadingKind.RESERVED;
}

export enum ParsedListItemKind {
	WIDGET,
	REF_WIDGET,
	ATTRIBUTES,
	ATTRIBUTE_PAIR,
	RESERVED
}

/**
 * parsed list element.
 */
export interface ParsedListItem extends ParsedNode<PreparsedListItem> {
	type: ParsedNodeType.LIST_ITEM;
	kind: ParsedListItemKind;
}

/**
 * parsed list element, which is a widget
 */
export interface ParsedListItemWidget extends ParsedListItem, ParsedWidgetNode<PreparsedListItem> {
	type: ParsedNodeType.LIST_ITEM;
	kind: ParsedListItemKind.WIDGET;
	$wt: WidgetType;
	$pp?: PropertyPath;
	label?: string;
	children: Array<ParsedNode<PreparsedSubordinateOfListItemNodes>>;
}

/**
 * parsed list element, which is referred to a widget
 */
export interface ParsedListItemRefWidget extends ParsedListItem, ParsedWidgetNode<PreparsedListItem> {
	type: ParsedNodeType.LIST_ITEM;
	kind: ParsedListItemKind.REF_WIDGET;
	$ref: WidgetId;
	children: Array<ParsedNode<PreparsedSubordinateOfListItemNodes>>;
}

/**
 * parsed list element, with attributes.
 * typically used for boolean attributes, existing means true, otherwise use default value.
 */
export interface ParsedListItemAttributes extends ParsedListItem {
	kind: ParsedListItemKind.ATTRIBUTES;
	attributes: Array<string>;
}

/**
 * parsed list element, with attribute name/value pair
 */
export interface ParsedListItemAttributePair extends ParsedListItem {
	kind: ParsedListItemKind.ATTRIBUTE_PAIR;
	attributeName: string;
	attributeValue?: string;
	children: Array<ParsedNode<PreparsedSubordinateOfListItemNodes>>;
}

/**
 * parse list which not identified. reserved for future uses.
 */
export interface ParsedListItemReserved extends ParsedListItem {
	kind: ParsedListItemKind.RESERVED;
}

export interface ParsedList extends ParsedNode<PreparsedList> {
	type: ParsedNodeType.LIST;
	children: Array<ParsedListItem>;
}

export interface ParsedParagraph extends ParsedNode<PreparsedParagraph> {
	type: ParsedNodeType.PARAGRAPH;
	children: Array<ParsedPhrasingNodes>;
}

export interface ParsedCode extends ParsedNode<PreparsedCode> {
	type: ParsedNodeType.CODE;
	text: string;
	lang?: string;
	meta?: string;
}

export interface ParsedTableCell extends ParsedNode<PreparsedTableCell> {
	type: ParsedNodeType.TABLE_CELL;
	children: Array<ParsedPhrasingNodes>;
}

export interface ParsedTableRow extends ParsedNode<PreparsedTableRow> {
	type: ParsedNodeType.TABLE_ROW;
	cells: Array<ParsedTableCell>;
}

export interface ParsedTable extends ParsedNode<PreparsedTable> {
	type: ParsedNodeType.TABLE;
	rows: Array<ParsedTableRow>;
}

export interface ParsedText extends ParsedNode<PreparsedText> {
	type: ParsedNodeType.TEXT;
	text: string;
	// in list item, text might be broken since contains carriage return
	// if so, the carriage return character index should be record here
	// and original parsed text will be split to two parsed texts
	// first one is added as title, second one is added as content
	brokenAt?: number;
}

export interface ParsedEmphasis extends ParsedNode<PreparsedEmphasis> {
	type: ParsedNodeType.EMPHASIS;
	children: Array<ParsedPhrasingNodes>;
}

export interface ParsedStrong extends ParsedNode<PreparsedStrong> {
	type: ParsedNodeType.STRONG;
	children: Array<ParsedPhrasingNodes>;
}

export interface ParsedDelete extends ParsedNode<PreparsedDelete> {
	type: ParsedNodeType.DELETE;
	children: Array<ParsedPhrasingNodes>;
}

export interface ParsedInlineCode extends ParsedNode<PreparsedInlineCode> {
	type: ParsedNodeType.INLINE_CODE;
	text: string;
}

export interface ParsedLink extends ParsedNode<PreparsedLink>, Resource {
	type: ParsedNodeType.LINK;
	children: Array<ParsedStaticPhrasingNodes>;
}

export interface ParsedLinkReference extends ParsedNode<PreparsedLinkReference>, Reference {
	type: ParsedNodeType.LINK_REFERENCE;
	children: Array<ParsedStaticPhrasingNodes>;
}

export interface ParsedImage extends ParsedNode<PreparsedImage>, Resource, Alternative {
	type: ParsedNodeType.IMAGE;
}

export interface ParsedImageReference extends ParsedNode<PreparsedImageReference>, Reference, Alternative {
	type: ParsedNodeType.IMAGE_REFERENCE;
}

export interface ParsedFootnote extends ParsedNode<PreparsedFootnote> {
	type: ParsedNodeType.FOOTNOTE;
	children: Array<ParsedPhrasingNodes>;
}

export interface ParsedFootnoteReference extends ParsedNode<PreparsedFootnoteReference>, Association {
	type: ParsedNodeType.FOOTNOTE_REFERENCE;
}

export interface ParsedFootnoteDefinition extends ParsedNode<PreparsedFootnoteDefinition>, Association {
	type: ParsedNodeType.FOOTNOTE_DEFINITION;
	children: Array<ParsedDefinitionNodes | ParsedBlockNodes>;
}

export interface ParsedBreak extends ParsedNode<PreparsedBreak> {
	type: ParsedNodeType.BREAK;
}

export interface ParsedThematicBreak extends ParsedNode<PreparsedThematicBreak> {
	type: ParsedNodeType.THEMATIC_BREAK;
}

export interface ParsedDefinition extends ParsedNode<PreparsedDefinition>, Association, Resource {
	type: ParsedNodeType.DEFINITION;
}

export interface ParsedBlockquote extends ParsedNode<PreparsedBlockquote> {
	type: ParsedNodeType.BLOCKQUOTE;
	children: Array<ParsedDefinitionNodes | ParsedBlockNodes>;
}

export interface ParsedYaml extends ParsedNode<PreparsedYaml> {
	type: ParsedNodeType.YAML;
	text: string;
}

export interface ParsedHtml extends ParsedNode<PreparsedHtml> {
	type: ParsedNodeType.HTML;
	text: string;
}

export interface ParsedNodeMap {
	heading: ParsedHeading;
	list: ParsedList;
	listItem: ParsedListItem;

	paragraph: ParsedParagraph;
	code: ParsedCode;
	text: ParsedText;
	emphasis: ParsedEmphasis;
	strong: ParsedStrong;
	delete: ParsedDelete;
	inlineCode: ParsedInlineCode;
	link: ParsedLink;
	linkReference: ParsedLinkReference;
	image: ParsedImage;
	imageReference: ParsedImageReference;
	footnote: ParsedFootnote;
	footnoteDefinition: ParsedFootnoteDefinition;
	footnoteReference: ParsedFootnoteReference;
	break: ParsedBreak;
	thematicBreak: ParsedThematicBreak;
	blockquote: ParsedBlockquote;
	html: ParsedHtml;
	definition: ParsedDefinition;
	yaml: ParsedYaml;

	table: ParsedTable;
	tableRow: ParsedTableRow;
	tableCell: ParsedTableCell;
}

export type ParsedNodes = ParsedNodeMap[keyof ParsedNodeMap];
export type ParsedStaticPhrasingNodeMap = Pick<ParsedNodeMap,
	'text' | 'emphasis' | 'strong' | 'delete' | 'html' | 'inlineCode' | 'break'
	| 'image' | 'imageReference' | 'footnote' | 'footnoteReference'>;
export type ParsedStaticPhrasingNodes = ParsedStaticPhrasingNodeMap[keyof ParsedStaticPhrasingNodeMap];
export type ParsedPhrasingNodeMap = ParsedStaticPhrasingNodeMap & Pick<ParsedNodeMap, 'link' | 'linkReference'>;
export type ParsedPhrasingNodes = ParsedPhrasingNodeMap[keyof ParsedPhrasingNodeMap];
export type ParsedDefinitionNodeMap = Pick<ParsedNodeMap, 'definition' | 'footnoteDefinition'>;
export type ParsedDefinitionNodes = ParsedDefinitionNodeMap[keyof ParsedDefinitionNodeMap];
export type ParsedBlockNodeMap = Pick<ParsedNodeMap, 'paragraph' | 'thematicBreak' | 'blockquote' | 'list' | 'table' | 'html' | 'code'>;
export type ParsedBlockNodes = ParsedBlockNodeMap[keyof ParsedBlockNodeMap];

export enum IdentifiedBlockType {
	PAGE, WIDGET
}

export interface IdentifiedBlock {
	type: IdentifiedBlockType;
	exported: Array<ParsedHeadingIdentified>;
	independent: Array<ParsedHeadingIdentified>;
	ignored: Array<ParsedHeading>;
}
