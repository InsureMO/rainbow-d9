import {InlineContext, InlineParser} from '@lezer/markdown';
import {Semantic} from '@rainbow-d9/n3';

export const WIDGET_DECLARATION_SPLITTER = Semantic.AbstractSemanticNodeWidgetParser.WIDGET_TITLE_SPLITTER;
export const ATTRIBUTE_DECLARATION_SPLITTER = ':';

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
	return ctx.addElement(ctx.elt('WidgetDeclaration', offset, ctx.end, children));
};

export const parseAttribute = (ctx: InlineContext, text: string, offset: number): number => {
	const segments = text.split(ATTRIBUTE_DECLARATION_SPLITTER, 2);
	if (segments.length === 1) {
		return -1;
	}
	const [attributeName, attributeValue] = segments;
	const children = [
		attributeName != null ? ctx.elt('WidgetDeclarationAttrName', offset, offset + attributeName.length) : (void 0),
		attributeValue != null ? ctx.elt('WidgetDeclarationAttrSplitter', offset + attributeName.length, offset + attributeName.length + 2) : (void 0),
		attributeValue != null ? ctx.elt('WidgetDeclarationAttrValue', offset + attributeName.length + 2, offset + attributeName.length + 2 + attributeValue.length) : (void 0)
	].filter(x => x != null);
	return ctx.addElement(ctx.elt('WidgetDeclaration', offset, ctx.end, children));
};

export const WidgetParse: InlineParser = {
	name: 'WidgetDeclaration',
	parse: (ctx, next, pos) => {
		// console.log(ctx.text, next, start, ctx.offset, ctx.parts);
		if (ctx.offset !== pos) {
			return -1;
		}
		let {text = ''} = ctx;
		if (text.length === 0) {
			return -1;
		}
		const linkBreakIndex = text.indexOf('\n');
		if (linkBreakIndex !== -1) {
			text = text.substring(0, linkBreakIndex);
		}

		return [parseWidget, parseAttribute].reduce((result, parse) => {
			if (result !== -1) {
				return result;
			}
			return parse(ctx, text, pos);
		}, -1);
	}
};

