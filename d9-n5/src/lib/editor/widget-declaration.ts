import {defaultHighlightStyle, HighlightStyle, syntaxHighlighting} from '@codemirror/language';
import {Tag, tags, tags as t} from '@lezer/highlight';
import {InlineParser, MarkdownExtension} from '@lezer/markdown';
import {Semantic} from '@rainbow-d9/n3';

export const WIDGET_DECLARATION_SPLITTER = Semantic.AbstractSemanticNodeWidgetParser.WIDGET_TITLE_SPLITTER;

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

const WidgetDeclarationTag = Tag.define(t.content);
const WidgetDeclarationSplitterTag = Tag.define();
const WidgetDeclarationTypeTag = Tag.define();
const WidgetDeclarationHeadlineTag = Tag.define();
const WidgetDeclarationPropertyTag = Tag.define();
const WidgetDeclarationIdTag = Tag.define();
const WidgetDeclarationFlagTag = Tag.define();
export const WidgetDeclarationNodes = [
	{name: 'WidgetDeclaration', style: WidgetDeclarationTag},
	{name: 'WidgetDeclarationSplitter', style: WidgetDeclarationSplitterTag},
	{name: 'WidgetDeclarationType', style: WidgetDeclarationTypeTag},
	{name: 'WidgetDeclarationHeadline', style: WidgetDeclarationHeadlineTag},
	{name: 'WidgetDeclarationProperty', style: WidgetDeclarationPropertyTag},
	{name: 'WidgetDeclarationId', style: WidgetDeclarationIdTag},
	{name: 'WidgetDeclarationFlag', style: WidgetDeclarationFlagTag}
];

export const WidgetDeclaration: InlineParser = {
	name: 'WidgetDeclaration',
	parse: (ctx, next, pos) => {
		// console.log(ctx.text, next, start, ctx.offset, ctx.parts);
		const {text = '', offset} = ctx;
		if (offset !== pos) {
			return -1;
		}
		if (!text.includes(WIDGET_DECLARATION_SPLITTER)) {
			return -1;
		}

		const parsed = parseWidgetDeclaration(text);
		if (Object.keys(parsed).length === 0) {
			return -1;
		}
		const children = [
			parsed.$wt != null ? ctx.elt('WidgetDeclarationType', pos, pos + parsed.$wt.length) : (void 0),
			parsed.headline != null ? ctx.elt('WidgetDeclarationSplitter', pos + parsed.headlineOffset, pos + parsed.headlineOffset + 2) : (void 0),
			parsed.headline != null ? ctx.elt('WidgetDeclarationHeadline', pos + parsed.headlineOffset + 2, pos + parsed.headlineOffset + 2 + parsed.headline.length) : (void 0),
			parsed.$pp != null ? ctx.elt('WidgetDeclarationSplitter', pos + parsed.$ppOffset, pos + parsed.$ppOffset + 2) : (void 0),
			parsed.$pp != null ? ctx.elt('WidgetDeclarationProperty', pos + parsed.$ppOffset + 2, pos + parsed.$ppOffset + 2 + parsed.$pp.length) : (void 0),
			parsed.$id != null ? ctx.elt('WidgetDeclarationSplitter', pos + parsed.$idOffset, pos + parsed.$idOffset + 2) : (void 0),
			parsed.$id != null ? ctx.elt('WidgetDeclarationId', pos + parsed.$idOffset + 2, pos + parsed.$idOffset + 2 + parsed.$id.length) : (void 0),
			parsed.$flag != null ? ctx.elt('WidgetDeclarationSplitter', pos + parsed.$flagOffset, pos + parsed.$flagOffset + 2) : (void 0),
			parsed.$flag != null ? ctx.elt('WidgetDeclarationFlag', pos + parsed.$flagOffset + 2, pos + parsed.$flagOffset + 2 + parsed.$flag.length) : (void 0)
		].filter(x => x != null);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// console.log(parsed, children.length, ctx.parts);
		return ctx.addElement(ctx.elt('WidgetDeclaration', pos, ctx.end, children));
	}
};

const extendHighlightStyle = HighlightStyle.define([
	...defaultHighlightStyle.specs,
	{tag: tags.heading, class: 'd9-playground-editor-heading'},
	{tag: tags.list, class: 'd9-playground-editor-list'},
	{tag: WidgetDeclarationTag, class: 'd9-playground-editor-widget-declaration'},
	{tag: WidgetDeclarationSplitterTag, class: 'd9-playground-editor-heading'},
	{tag: WidgetDeclarationTypeTag, class: 'd9-playground-editor-widget-declaration-type'},
	{tag: WidgetDeclarationHeadlineTag, class: 'd9-playground-editor-widget-declaration-headline'},
	{tag: WidgetDeclarationPropertyTag, class: 'd9-playground-editor-widget-declaration-property'},
	{tag: WidgetDeclarationIdTag, class: 'd9-playground-editor-widget-declaration-id'},
	{tag: WidgetDeclarationFlagTag, class: 'd9-playground-editor-widget-declaration-flag'},
	{tag: WidgetDeclarationSplitterTag, class: 'd9-playground-editor-widget-declaration-splitter'}
]);
export const d9mlHighlightStyle = syntaxHighlighting(extendHighlightStyle);

export const d9mlExtensions: MarkdownExtension = {
	defineNodes: [...WidgetDeclarationNodes],
	parseInline: [WidgetDeclaration]
};