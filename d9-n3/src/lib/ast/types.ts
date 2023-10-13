import {
	Blockquote,
	Break,
	Code,
	Content,
	Definition,
	Delete,
	Emphasis,
	Footnote,
	FootnoteDefinition,
	FootnoteReference,
	Heading,
	HTML,
	Image,
	ImageReference,
	InlineCode,
	Link,
	LinkReference,
	List,
	ListItem,
	Paragraph,
	Strong,
	Table,
	TableCell,
	TableRow,
	Text,
	ThematicBreak,
	YAML
} from 'mdast';
import {ParsedNodeType} from '../node-types';

export interface PreparsedNode<C extends Content> {
	type: ParsedNodeType;
	content: C;
}

export interface PreparsedHeading extends PreparsedNode<Heading> {
	type: ParsedNodeType.HEADING;
	children: Array<PreparsedSubordinateOfHeadingNodes>;
}

export interface PreparsedListItem extends PreparsedNode<ListItem> {
	type: ParsedNodeType.LIST_ITEM;
	children: Array<PreparsedSubordinateOfListItemNodes>;
}

export interface PreparsedList extends PreparsedNode<List> {
	type: ParsedNodeType.LIST;
	children: Array<PreparsedListItem>;
}

export interface PreparsedParagraph extends PreparsedNode<Paragraph> {
	type: ParsedNodeType.PARAGRAPH;
}

export interface PreparsedCode extends PreparsedNode<Code> {
	type: ParsedNodeType.CODE;
}

export interface PreparsedText extends PreparsedNode<Text> {
	type: ParsedNodeType.TEXT;
}

export interface PreparsedEmphasis extends PreparsedNode<Emphasis> {
	type: ParsedNodeType.EMPHASIS;
}

export interface PreparsedStrong extends PreparsedNode<Strong> {
	type: ParsedNodeType.STRONG;
}

export interface PreparsedDelete extends PreparsedNode<Delete> {
	type: ParsedNodeType.DELETE;
}

export interface PreparsedInlineCode extends PreparsedNode<InlineCode> {
	type: ParsedNodeType.INLINE_CODE;
}

export interface PreparsedLink extends PreparsedNode<Link> {
	type: ParsedNodeType.LINK;
}

export interface PreparsedLinkReference extends PreparsedNode<LinkReference> {
	type: ParsedNodeType.LINK_REFERENCE;
}

export interface PreparsedImage extends PreparsedNode<Image> {
	type: ParsedNodeType.IMAGE;
}

export interface PreparsedImageReference extends PreparsedNode<ImageReference> {
	type: ParsedNodeType.IMAGE_REFERENCE;
}

export interface PreparsedFootnote extends PreparsedNode<Footnote> {
	type: ParsedNodeType.FOOTNOTE;
}

export interface PreparsedFootnoteDefinition extends PreparsedNode<FootnoteDefinition> {
	type: ParsedNodeType.FOOTNOTE_DEFINITION;
	children: Array<PreparsedSubordinateOfFootnoteDefinitionNodes>;
}

export interface PreparsedFootnoteReference extends PreparsedNode<FootnoteReference> {
	type: ParsedNodeType.FOOTNOTE_REFERENCE;
}

export interface PreparsedBreak extends PreparsedNode<Break> {
	type: ParsedNodeType.BREAK;
}

export interface PreparsedThematicBreak extends PreparsedNode<ThematicBreak> {
	type: ParsedNodeType.THEMATIC_BREAK;
}

export interface PreparsedBlockquote extends PreparsedNode<Blockquote> {
	type: ParsedNodeType.BLOCKQUOTE;
	children: Array<PreparsedSubordinateOfBlockquoteNodes>;
}

export interface PreparsedHtml extends PreparsedNode<HTML> {
	type: ParsedNodeType.HTML;
}

export interface PreparsedDefinition extends PreparsedNode<Definition> {
	type: ParsedNodeType.DEFINITION;
}

export interface PreparsedYaml extends PreparsedNode<YAML> {
	type: ParsedNodeType.YAML;
}

export interface PreparsedTableCell extends PreparsedNode<TableCell> {
	type: ParsedNodeType.TABLE_CELL;
}

export interface PreparsedTableRow extends PreparsedNode<TableRow> {
	type: ParsedNodeType.TABLE_ROW;
	children: Array<PreparsedTableCell>;
}

export interface PreparsedTable extends PreparsedNode<Table> {
	type: ParsedNodeType.TABLE;
	children: Array<PreparsedTableRow>;
}

export interface PreparsedNodeMap {
	heading: PreparsedHeading;
	list: PreparsedList;
	listItem: PreparsedListItem;

	paragraph: PreparsedParagraph;
	code: PreparsedCode;
	text: PreparsedText;
	emphasis: PreparsedEmphasis;
	strong: PreparsedStrong;
	delete: PreparsedDelete;
	inlineCode: PreparsedInlineCode;
	link: PreparsedLink;
	linkReference: PreparsedLinkReference;
	image: PreparsedImage;
	imageReference: PreparsedImageReference;
	footnote: PreparsedFootnote;
	footnoteDefinition: PreparsedFootnoteDefinition;
	footnoteReference: PreparsedFootnoteReference;
	break: PreparsedBreak;
	thematicBreak: PreparsedThematicBreak;
	blockquote: PreparsedBlockquote;
	html: PreparsedHtml;
	definition: PreparsedDefinition;
	yaml: PreparsedYaml;

	table: PreparsedTable;
	tableRow: PreparsedTableRow;
	tableCell: PreparsedTableCell;
}

export type PreparsedNodes = PreparsedNodeMap[keyof PreparsedNodeMap];

export type PreparsedSubordinateOfHeadingNodeMap = Omit<PreparsedNodeMap, 'listItem' | 'tableRow' | 'tableCell' | 'yaml'>;
export type PreparsedSubordinateOfHeadingNodes = PreparsedSubordinateOfHeadingNodeMap[keyof PreparsedSubordinateOfHeadingNodeMap];

export type PreparsedSubordinateOfListItemNodeMap = Pick<PreparsedNodeMap,
	'list' |
	'paragraph' | 'code' | 'footnoteDefinition' | 'thematicBreak' | 'blockquote' | 'html' | 'definition' |
	'table'>;
export type PreparsedSubordinateOfListItemNodes = PreparsedSubordinateOfListItemNodeMap[keyof PreparsedSubordinateOfListItemNodeMap];

export type PreparsedSubordinateOfBlockquoteNodeMap = Pick<PreparsedNodeMap,
	'list' |
	'paragraph' | 'code' | 'footnoteDefinition' | 'thematicBreak' | 'blockquote' | 'html' | 'definition' |
	'table'>;
export type PreparsedSubordinateOfBlockquoteNodes = PreparsedSubordinateOfBlockquoteNodeMap[keyof PreparsedSubordinateOfBlockquoteNodeMap];

export type PreparsedSubordinateOfFootnoteDefinitionNodeMap = Pick<PreparsedNodeMap,
	'list' |
	'paragraph' | 'code' | 'footnoteDefinition' | 'thematicBreak' | 'blockquote' | 'html' | 'definition' |
	'table'>;
export type PreparsedSubordinateOfFootnoteDefinitionNodes = PreparsedSubordinateOfFootnoteDefinitionNodeMap[keyof PreparsedSubordinateOfFootnoteDefinitionNodeMap];

/** nodes which can be ignored */
export type PreparsedIgnorableNodeMap = Omit<PreparsedNodeMap, 'heading' | 'listItem' | 'tableRow' | 'tableCell'>;
export type PreparsedIgnorableNodes = PreparsedIgnorableNodeMap[keyof PreparsedIgnorableNodeMap];

export interface PreparsedTree {
	readonly ignored: Array<PreparsedIgnorableNodes>;
	readonly headings: Array<PreparsedHeading>;
}
