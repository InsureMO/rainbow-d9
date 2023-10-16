import {VUtils} from '@rainbow-d9/n1';
import {List} from 'mdast';
import {PreparsedList, PreparsedListItem, PreparsedParagraph, PreparsedSubordinateOfListItemNodes} from '../../ast';
import {N3Logger} from '../../logger';
import {ParsedNodeType} from '../../node-types';
import {
	ParsedList,
	ParsedListItem,
	ParsedListItemAttributePair,
	ParsedListItemAttributes,
	ParsedListItemKind,
	ParsedListItemRefWidget,
	ParsedListItemReserved,
	ParsedListItemWidget,
	ParsedNode,
	ParsedParagraph,
	ParsedPhrasingNodes,
	ParsedText,
	WidgetFlag
} from '../types';
import {AbstractSemanticNodeWidgetParser} from './semantic-node-parser';

export interface ParsedListItemFirstNode {
	paragraph: ParsedParagraph;
	title: Array<ParsedPhrasingNodes>;
	content: Array<ParsedPhrasingNodes>;
}

export interface ParsedListItemTitle {
	title: string;
	$flag: WidgetFlag;
}

export class ListParser extends AbstractSemanticNodeWidgetParser<'list'> {
	public static readonly WIDGET_TITLE_FLAG_MATCHER = /^(.*?)(::IGNORE)?$/;
	public static readonly REF_WIDGET_MATCHER = /^(REF|Ref|ref)\.(.*)$/;
	public static readonly ATTRIBUTE_MATCHER = /^([^:]+):(.*)$/;
	public static readonly TYPE: List['type'] = 'list';

	public getSupportedType(): 'list' {
		return ListParser.TYPE;
	}

	protected asReserved(listItem: ParsedListItem): ParsedListItemReserved {
		listItem.kind = ParsedListItemKind.RESERVED;
		return listItem as ParsedListItemReserved;
	}

	protected findListItemTitle(first: PreparsedParagraph): ParsedListItemFirstNode {
		const paragraph = this.findParser(first.content.type).parsePreparsed(first);
		let broken = false;
		return (paragraph.children ?? []).reduce((parsed, phrasing) => {
			switch (true) {
				case phrasing.type === ParsedNodeType.TEXT:
					if (broken) {
						parsed.content.push(phrasing);
					} else {
						const text = (phrasing as ParsedText).text ?? '';
						const carriageEnterIndex = text.indexOf('\n');
						if (carriageEnterIndex !== -1) {
							// contains carriage enter, broken
							broken = true;
							// first one added as title
							parsed.title.push({
								type: ParsedNodeType.TEXT, preparsed: phrasing.preparsed,
								text: text.substring(0, carriageEnterIndex)
							} as ParsedText);
							// rest part added as content
							parsed.content.push({
								type: ParsedNodeType.TEXT, preparsed: phrasing.preparsed,
								text: text.substring(carriageEnterIndex + 1)
							} as ParsedText);
						} else {
							// no carriage return, all as title
							parsed.title.push(phrasing);
						}
					}
					break;
				case [
					ParsedNodeType.EMPHASIS, ParsedNodeType.STRONG, ParsedNodeType.DELETE,
					ParsedNodeType.HTML, ParsedNodeType.INLINE_CODE,
					ParsedNodeType.IMAGE, ParsedNodeType.IMAGE_REFERENCE,
					ParsedNodeType.FOOTNOTE, ParsedNodeType.FOOTNOTE_REFERENCE,
					ParsedNodeType.LINK, ParsedNodeType.LINK_REFERENCE
				].includes(phrasing.type):
					// phrasing has no carriage enter inside
					(broken ? parsed.content : parsed.title).push(phrasing);
					break;
				case phrasing.type === ParsedNodeType.BREAK:
					if (!broken) {
						// first broken, this node will be ignored
						broken = true;
					} else {
						parsed.content.push(phrasing);
					}
					break;
				default:
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore never occurs, all types are handled
					N3Logger.error(`Child node[type=${phrasing.type}] of root not supported yet, ignored.`);
			}
			return parsed;
		}, {title: [], content: [], paragraph} as ParsedListItemFirstNode);
	}

	protected getTitleFlagMatcher(): RegExp {
		return ListParser.WIDGET_TITLE_FLAG_MATCHER;
	}

	protected parseTitle(title: string): ParsedListItemTitle {
		const match = title.match(this.getTitleFlagMatcher());
		if (match == null) {
			return {title, $flag: WidgetFlag.STANDARD};
		} else {
			return {title: match[1], $flag: this.asWidgetFlag(match[2])};
		}
	}

	protected matchRefWidget(title: string): false | Pick<ParsedListItemRefWidget, '$ref' | '$flag'> {
		const matches = title.match(ListParser.REF_WIDGET_MATCHER);
		if (matches == null) {
			return false;
		}
		const $ref = matches[2];
		const $flag = (matches[3] || WidgetFlag.STANDARD) as WidgetFlag;
		if (VUtils.isBlank($ref)) {
			return false;
		} else {
			return {$ref, $flag};
		}
	}

	protected matchWidget(title: string): false | Pick<ParsedListItemWidget, '$wt' | 'label' | '$pp'> {
		const segments = title.split(this.getWidgetTitleSplitter());
		if (segments.length === 1) {
			return false;
		} else if (segments.length >= 3) {
			const $pp = segments[segments.length - 1].trim();
			const $wt = segments[0].trim();
			const label = segments.slice(1, segments.length - 1).join(this.getWidgetTitleSplitter()).trim();
			return {$wt, label: VUtils.isBlank(label) ? (void 0) : label, $pp};
		} else {
			const $wt = segments[0].trim();
			const label = segments[1].trim();
			return {$wt, label: VUtils.isBlank(label) ? (void 0) : label.trim()};
		}
	}

	protected matchAttributePair(headline: string): false | Pick<ParsedListItemAttributePair, 'attributeName' | 'attributeValue'> {
		const matches = headline.match(ListParser.ATTRIBUTE_MATCHER);
		if (matches == null) {
			return false;
		}
		return {attributeName: matches[1].trim(), attributeValue: matches[2].trim()};
	}

	protected regroupToParagraph(paragraph: ParsedParagraph, phrasings: Array<ParsedPhrasingNodes>): ParsedParagraph | null {
		if (phrasings.length == 0) {
			return null;
		} else {
			return {...paragraph, children: phrasings};
		}
	}

	protected rebuildListItemChildren(
		paragraph: ParsedParagraph, phrasings: Array<ParsedPhrasingNodes>,
		rest: Array<PreparsedSubordinateOfListItemNodes>
	): Array<ParsedNode<PreparsedSubordinateOfListItemNodes>> {
		paragraph = this.regroupToParagraph(paragraph, phrasings);
		if (paragraph == null) {
			return this.parseManyPreparsed(rest);
		} else {
			return [
				paragraph,
				...this.parseManyPreparsed<ParsedNode<PreparsedSubordinateOfListItemNodes>>(rest)
			];
		}
	}

	/**
	 * 1. item has at least one child,
	 * 2. first child of item must be a paragraph,
	 * 3. first child must start with same line number with item itself,
	 * 4. title must be parsed from first child
	 */
	protected parseListItem(listItem: PreparsedListItem): ParsedListItem {
		const parsed: ParsedListItem = {
			type: ParsedNodeType.LIST_ITEM, kind: ParsedListItemKind.WIDGET, preparsed: listItem
		};

		const hasChild = (listItem.children ?? []).length > 0;
		if (!hasChild) {
			// no child with this list
			return this.asReserved(parsed);
		}

		const [first, ...rest] = listItem.children ?? [];
		if (first.type !== ParsedNodeType.PARAGRAPH) {
			// no title with this list
			return this.asReserved(parsed);
		}

		const {position: {start: {line: listItemStartLineNumber}}} = listItem.content;
		const {position: {start: {line: paragraphStartLineNumber}}} = first.content;
		if (listItemStartLineNumber !== paragraphStartLineNumber) {
			// paragraph not at same line with list item
			return this.asReserved(parsed);
		}
		const {title: titlePhrasings, content: contentPhrasings, paragraph} = this.findListItemTitle(first);
		if (titlePhrasings.length === 0) {
			// no title found
			return this.asReserved(parsed);
		}
		const title = this.askTitle(titlePhrasings);
		if (title === false) {
			// can not detect title
			return this.asReserved(parsed);
		} else if (VUtils.isBlank(title)) {
			// no title existing
			return this.asReserved(parsed);
		}
		const {title: titleStr, $flag} = this.parseTitle(title);
		const refWidget = this.matchRefWidget(titleStr);
		if (refWidget !== false) {
			return {
				...parsed, kind: ParsedListItemKind.REF_WIDGET, $ref: refWidget.$ref, $flag,
				children: this.rebuildListItemChildren(paragraph, contentPhrasings, rest)
			} as ParsedListItemRefWidget;
		}
		const widget = this.matchWidget(titleStr);
		if (widget !== false) {
			return {
				...parsed, kind: ParsedListItemKind.WIDGET, ...widget, $flag,
				children: this.rebuildListItemChildren(paragraph, contentPhrasings, rest)
			} as ParsedListItemWidget;
		}
		const attributePair = this.matchAttributePair(titleStr);
		if (attributePair !== false) {
			return {
				...parsed, kind: ParsedListItemKind.ATTRIBUTE_PAIR, ...attributePair,
				children: this.rebuildListItemChildren(paragraph, contentPhrasings, rest)
			} as ParsedListItemAttributePair;
		}
		// treated as attribute line
		const attributes = titleStr.split(',').map(segment => segment.trim());
		return {...parsed, kind: ParsedListItemKind.ATTRIBUTES, attributes} as ParsedListItemAttributes;
	}

	public parsePreparsed(preparsed: PreparsedList): ParsedList {
		return {
			type: ParsedNodeType.LIST, preparsed,
			children: (preparsed.children ?? []).map(child => this.parseListItem(child))
		};
	}
}
