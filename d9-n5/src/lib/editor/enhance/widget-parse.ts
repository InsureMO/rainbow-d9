import {Tree} from '@lezer/common';
import {
	BlockContext,
	BlockParser,
	Element,
	InlineContext,
	InlineParser,
	LeafBlock,
	LeafBlockParser,
	Line,
	MarkdownParser
} from '@lezer/markdown';
import {VUtils} from '@rainbow-d9/n1';
import {Semantic} from '@rainbow-d9/n3';
import {
	ATTRIBUTE_DECLARATION_JOINT,
	ATTRIBUTE_DECLARATION_SPLITTER,
	ATTRIBUTE_VALUE_EXT_SYMBOL,
	ATTRIBUTE_VALUE_ICON_SYMBOL,
	WIDGET_DECLARATION_SPLITTER
} from '../../widget-constants';

export interface ParsedWidgetDeclaration {
	$wt?: string;
	headlineOffset?: number;
	headline?: string;
	$ppOffset?: number;
	$pp?: string;
	$idOffset?: number;
	$id?: string;
	$flagOffset?: number;
	$flag?: string;
}

export const parseWidgetFlag = (text?: string): { title: string; $flag?: string; $flagOffset?: number } => {
	const str = (text ?? '').trim();
	const matches = Semantic.HeadingParser.WIDGET_TITLE_FLAG_MATCHERS.find(matcher => str.endsWith(matcher));
	if (matches == null) {
		return {title: text};
	} else {
		const index = text.indexOf(matches);
		return {title: text.substring(0, index), $flag: text.substring(index + 2), $flagOffset: index};
	}
};

export const parseWidgetDeclaration = (text?: string): ParsedWidgetDeclaration => {
	const {title, ...$flags} = parseWidgetFlag(text);
	text = title;
	const segments = text.split(WIDGET_DECLARATION_SPLITTER);
	switch (true) {
		case segments.length === 2: {
			const $wt = segments[0];
			const headline = segments[1];
			return {
				$wt,
				headlineOffset: $wt.length, headline,
				...$flags
			};
		}
		case segments.length === 3: {
			const $pp = segments[segments.length - 1];
			const $wt = segments[0];
			const headline = segments.slice(1, segments.length - 1).join(WIDGET_DECLARATION_SPLITTER).trim();
			return {
				$wt,
				headlineOffset: $wt.length, headline,
				$ppOffset: $wt.length + 2 + headline.length, $pp,
				...$flags
			};
		}
		case segments.length > 3: {
			const $id = segments[segments.length - 1];
			const $pp = segments[segments.length - 2];
			const $wt = segments[0];
			const headline = segments.slice(1, segments.length - 2).join(WIDGET_DECLARATION_SPLITTER).trim();
			return {
				$wt,
				headlineOffset: $wt.length, headline,
				$ppOffset: $wt.length + 2 + headline.length, $pp,
				$idOffset: $wt.length + 2 + headline.length + 2 + $pp.length, $id,
				...$flags
			};
		}
		default:
			return $flags;
	}
};

export const parseWidget = (ctx: InlineContext, text: string, offset: number): number => {
	if (!text.includes(WIDGET_DECLARATION_SPLITTER)) {
		return -1;
	}

	const parsed = parseWidgetDeclaration(text);
	if (Object.keys(parsed).length === 0) {
		return -1;
	}
	const children = [
		parsed.$wt != null ? ctx.elt('WidgetDeclarationType', offset, offset + parsed.$wt.length) : (void 0),
		parsed.headline != null ? ctx.elt('WidgetDeclarationSplitter', offset + parsed.headlineOffset, offset + parsed.headlineOffset + 2) : (void 0),
		parsed.headline != null ? ctx.elt('WidgetDeclarationHeadline', offset + parsed.headlineOffset + 2, offset + parsed.headlineOffset + 2 + parsed.headline.length) : (void 0),
		parsed.$pp != null ? ctx.elt('WidgetDeclarationSplitter', offset + parsed.$ppOffset, offset + parsed.$ppOffset + 2) : (void 0),
		parsed.$pp != null ? ctx.elt('WidgetDeclarationProperty', offset + parsed.$ppOffset + 2, offset + parsed.$ppOffset + 2 + parsed.$pp.length) : (void 0),
		parsed.$id != null ? ctx.elt('WidgetDeclarationSplitter', offset + parsed.$idOffset, offset + parsed.$idOffset + 2) : (void 0),
		parsed.$id != null ? ctx.elt('WidgetDeclarationId', offset + parsed.$idOffset + 2, offset + parsed.$idOffset + 2 + parsed.$id.length) : (void 0),
		parsed.$flag != null ? ctx.elt('WidgetDeclarationSplitter', offset + parsed.$flagOffset, offset + parsed.$flagOffset + 2) : (void 0),
		parsed.$flag != null ? ctx.elt('WidgetDeclarationFlag', offset + parsed.$flagOffset + 2, offset + parsed.$flagOffset + 2 + parsed.$flag.length) : (void 0)
	].filter(x => x != null);
	return ctx.addElement(ctx.elt('WidgetDeclaration', offset, offset + text.length, children));
};

export const parseAttribute = (ctx: InlineContext, text: string, offset: number): number => {
	const segments = text.split(ATTRIBUTE_DECLARATION_SPLITTER);
	if (segments.length === 1) {
		return -1;
	}

	const [attributeName, ...attributeValues] = segments;
	const attributeValue = attributeValues.join(ATTRIBUTE_DECLARATION_SPLITTER);
	let valueElements: Array<Element>;
	if ((attributeValue ?? '').indexOf(ATTRIBUTE_VALUE_ICON_SYMBOL) != -1) {
		const icons = attributeValue.split(';');
		const computed = icons.reduce((computed, icon, index) => {
			if (index !== 0) {
				computed.children.push(ctx.elt('WidgetDeclarationAttrValueSplitter', offset + computed.used, offset + computed.used + 1));
				computed.used = computed.used + 1;
			}
			if (icon.indexOf(ATTRIBUTE_VALUE_ICON_SYMBOL) != -1) {
				computed.children.push(ctx.elt('WidgetDeclarationAttrValueIcon', offset + computed.used, offset + computed.used + icon.length));
			} else {
				computed.children.push(ctx.elt('WidgetDeclarationAttrValueStr', offset + computed.used, offset + computed.used + icon.length));
			}
			computed.used = computed.used + icon.length;
			return computed;
		}, {used: attributeName.length + 1, children: []} as { used: number; children: Array<Element> });
		valueElements = computed.children;
	} else if ((attributeValue ?? '').trim().startsWith(ATTRIBUTE_VALUE_EXT_SYMBOL)) {
		valueElements = [ctx.elt('WidgetDeclarationAttrValueExt', offset + attributeName.length + 1, offset + attributeName.length + 1 + attributeValue.length)];
	} else {
		valueElements = attributeValue != null
			? [ctx.elt('WidgetDeclarationAttrValue', offset + attributeName.length + 1, offset + attributeName.length + 1 + attributeValue.length)]
			: [];
	}
	const children = [
		attributeName != null ? ctx.elt('WidgetDeclarationAttrName', offset, offset + attributeName.length) : (void 0),
		attributeValue != null ? ctx.elt('WidgetDeclarationAttrSplitter', offset + attributeName.length, offset + attributeName.length + 1) : (void 0),
		...valueElements
	].filter(x => x != null);
	return ctx.addElement(ctx.elt('WidgetDeclaration', offset, offset + text.length, children));
};

export const parseAttributes = (ctx: InlineContext, text: string, offset: number): number => {
	const segments = text.split(ATTRIBUTE_DECLARATION_JOINT).map(x => {
		return {checked: VUtils.isNotBlank(x), text: x};
	});
	if (segments.length === 0 || segments.every(x => !x.checked)) {
		return -1;
	}
	const lastIndex = segments.length - 1;
	const children = segments.reduce((parsed, {checked, text}, index) => {
		if (checked) {
			parsed.elements.push(ctx.elt('WidgetDeclarationAttrName', parsed.offset, parsed.offset + text.length));
		} else if (text.length !== 0) {
			parsed.elements.push(ctx.elt('WidgetDeclarationAttrNameButBlank', parsed.offset, parsed.offset + text.length));
		}
		if (index !== lastIndex) {
			parsed.elements.push(ctx.elt('WidgetDeclarationAttrNameJoint', parsed.offset + text.length, parsed.offset + text.length + 1));
		}
		parsed.offset = parsed.offset + 1 + text.length;
		return parsed;
	}, {offset, elements: []});
	return ctx.addElement(ctx.elt('WidgetDeclaration', offset, offset + text.length, children.elements));
};

export const WidgetParse: InlineParser = {
	name: 'WidgetDeclaration',
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	parse: (ctx: InlineContext, _next: number, pos: number, leader: string) => {
		// console.log(ctx.text, next, start, ctx.offset, ctx.parts);
		if (leader == null) {
			return -1;
		}
		if (ctx.offset !== pos) {
			return -1;
		}
		let {text = ''} = ctx;
		if (text.length === 0) {
			return -1;
		}
		// only first line needed
		const linkBreakIndex = text.indexOf('\n');
		if (linkBreakIndex !== -1) {
			text = text.substring(0, linkBreakIndex);
		}
		const parsers = [
			parseWidget,
			...(leader === 'ListItem' ? [parseAttribute, parseAttributes] : [])
		].filter(x => x != null);

		return parsers.reduce((result, parse) => {
			if (result !== -1) {
				return result;
			}
			return parse(ctx, text, pos);
		}, -1);
	}
};

// block parser to make sure the inline parser only applies to headings and list items
const parseInline = (type: 'Heading' | 'ListItem') => {
	return (parser: MarkdownParser, text: string, offset: number) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const ctx = new InlineContext(parser, text, offset);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const asWidget = WidgetParse.parse(ctx, ctx.char(offset), offset, type);
		offset = asWidget !== -1 ? asWidget : offset;
		outer: for (let pos = offset; pos < ctx.end;) {
			const next = ctx.char(pos);
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			for (const token of parser.inlineParsers) {
				if (token != null) {
					const result = token(ctx, next, pos, type);
					if (result >= 0) {
						pos = result;
						continue outer;
					}
				}
			}
			pos++;
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return ctx.resolveMarkers(0);
	};
};
export const ListItemParser: BlockParser = (() => {
	const parseInlineOnListItem = parseInline('ListItem');
	return {
		name: 'WidgetOnListItem',
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		leaf(ctx: BlockContext, _leaf: LeafBlock): LeafBlockParser | null {
			if (ctx.parentType().name !== 'ListItem') {
				return null;
			} else {

				return {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					nextLine(_ctx: BlockContext, _line: Line, _leaf: LeafBlock): boolean {
						return true;
					},
					finish(ctx: BlockContext, leaf: LeafBlock): boolean {
						ctx.addLeafElement(leaf, ctx.elt('MightBeWidgetDeclaration', leaf.start, leaf.start + leaf.content.length, [
							...parseInlineOnListItem(ctx.parser, leaf.content, leaf.start)
						]));
						return true;
					}
				};
			}
		},
		after: 'SetextHeading'
	};
})();

/**
 * copy from @lezer/markdown, to make sure that inline parsers can get the leader.
 */
export const HeadingParser: BlockParser = (() => {
	const isAtxHeading = (line: Line) => {
		if (line.next != 35 /* '#' */) {
			return -1;
		}
		let pos = line.pos + 1;
		while (pos < line.text.length && line.text.charCodeAt(pos) == 35) {
			pos++;
		}
		if (pos < line.text.length && line.text.charCodeAt(pos) != 32) {
			return -1;
		}
		const size = pos - line.pos;
		return size > 6 ? -1 : size;
	};

	const skipSpaceBack = (line: string, i: number, to: number) => {
		while (i > to && space(line.charCodeAt(i - 1))) {
			i--;
		}
		return i;
	};

	const space = (ch: number) => {
		return ch == 32 || ch == 9 || ch == 10 || ch == 13;
	};

	enum Type {
		HeaderMark = 34, ATXHeading1 = 9
	}

	interface BlockContextBuffer {
		write(type: Type, from: number, to: number, children ?: number): this;

		writeElements(elements: readonly (Element)[], offset?: number): this;

		finish(type: Type, length: number): Tree;
	}

	interface BlockContextWithBuffer extends BlockContext {
		buffer: BlockContextBuffer;
	}

	interface BlockContextCouldAddNode extends BlockContext {
		addNode(block: Type | Tree, from: number, to?: number): void;
	}

	const parseInlineOnHeading = parseInline('Heading');

	return {
		name: 'ATXHeading',
		parse(ctx: BlockContext, line: Line) {
			const size = isAtxHeading(line);
			if (size < 0) {
				return false;
			}
			const offset = line.pos;
			const from = ctx.lineStart + offset;
			const endOfSpace = skipSpaceBack(line.text, line.text.length, offset);
			let after = endOfSpace;
			while (after > offset && line.text.charCodeAt(after - 1) == line.next) {
				after--;
			}
			if (after == endOfSpace || after == offset || !space(line.text.charCodeAt(after - 1))) {
				after = line.text.length;
			}
			const buf = (ctx as BlockContextWithBuffer).buffer
				.write(Type.HeaderMark, 0, size)
				.writeElements(parseInlineOnHeading(ctx.parser, line.text.slice(offset + size + 1, after), from + size + 1), -from);
			if (after < line.text.length) {
				buf.write(Type.HeaderMark, after - offset, endOfSpace - offset);
			}
			const node = buf.finish(Type.ATXHeading1 - 1 + size, line.text.length - offset);
			ctx.nextLine();
			(ctx as BlockContextCouldAddNode).addNode(node, from);
			return true;
		}
	};
})();
