import {defaultHighlightStyle, HighlightStyle, syntaxHighlighting, syntaxTree} from '@codemirror/language';
import {Range} from '@codemirror/state';
import {Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate, WidgetType} from '@codemirror/view';
import {Tag, tags, tags as t} from '@lezer/highlight';
import {InlineContext, InlineParser, MarkdownExtension} from '@lezer/markdown';
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

const WidgetDeclarationTag = Tag.define(t.content);
const WidgetDeclarationSplitterTag = Tag.define();
const WidgetDeclarationTypeTag = Tag.define();
const WidgetDeclarationHeadlineTag = Tag.define();
const WidgetDeclarationPropertyTag = Tag.define();
const WidgetDeclarationIdTag = Tag.define();
const WidgetDeclarationFlagTag = Tag.define();
const WidgetDeclarationAttrNameTag = Tag.define();
const WidgetDeclarationAttrSplitterTag = Tag.define();
const WidgetDeclarationAttrValueTag = Tag.define();
export const WidgetDeclarationNodes = [
	{name: 'WidgetDeclaration', style: WidgetDeclarationTag},
	{name: 'WidgetDeclarationSplitter', style: WidgetDeclarationSplitterTag},
	{name: 'WidgetDeclarationType', style: WidgetDeclarationTypeTag},
	{name: 'WidgetDeclarationHeadline', style: WidgetDeclarationHeadlineTag},
	{name: 'WidgetDeclarationProperty', style: WidgetDeclarationPropertyTag},
	{name: 'WidgetDeclarationId', style: WidgetDeclarationIdTag},
	{name: 'WidgetDeclarationFlag', style: WidgetDeclarationFlagTag},
	{name: 'WidgetDeclarationAttrName', style: WidgetDeclarationAttrNameTag},
	{name: 'WidgetDeclarationAttrSplitter', style: WidgetDeclarationAttrSplitterTag},
	{name: 'WidgetDeclarationAttrValue', style: WidgetDeclarationAttrValueTag}
];

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

export const WidgetDeclaration: InlineParser = {
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

export class WidgetDeclarationIcon extends WidgetType {
	constructor(readonly ch: string, readonly classSuffix: string) {
		super();
	}

	public eq(other: WidgetDeclarationIcon) {
		return other.ch == this.ch;
	}

	public toDOM() {
		const icon = document.createElement('span');
		icon.setAttribute('aria-hidden', 'true');
		icon.className = `d9-playground-editor-widget-declaration-icon d9-playground-editor-widget-declaration-${this.classSuffix}-icon`;
		icon.innerText = this.ch;
		return icon;
	}

	public ignoreEvent() {
		return true;
	}
}

// TODO CANNOT PRESENT SELECTION BACKGROUND CORRECTLY WHEN ICON ADDED, DO NOT KNOW WHY
export const decorateWidgetDeclarationIcon = (view: EditorView) => {
	const widgets = [];
	const createDecorator = (ch: string, classSuffix: string, rangeDecoration: (decoration: Decoration) => Range<Decoration>) => {
		widgets.push(rangeDecoration(Decoration.widget({widget: new WidgetDeclarationIcon(ch, classSuffix), side: 0})));
	};
	for (const {from, to} of view.visibleRanges) {
		syntaxTree(view.state).iterate({
			from, to,
			enter: (node) => {
				switch (node.name) {
					// case 'WidgetDeclarationSplitter':
					case 'WidgetDeclarationType':
						createDecorator('w', 'type', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationHeadline':
						createDecorator('l', 'headline', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationProperty':
						createDecorator('p', 'property', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationId':
						createDecorator('id', 'id', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationFlag':
						createDecorator('f', 'flag', (decoration: Decoration) => decoration.range(node.to));
						break;
					case 'WidgetDeclarationAttrName':
						createDecorator('a', 'attr-name', (decoration: Decoration) => decoration.range(node.to));
						break;
					// case 'WidgetDeclarationAttrSplitter':
					// case 'WidgetDeclarationAttrValue':
					default:
					// do nothing
				}
			}
		});
	}
	return Decoration.set(widgets);
};

export const WidgetDeclarationIconPlugin = ViewPlugin.fromClass(class {
	public decorations: DecorationSet;

	constructor(view: EditorView) {
		this.decorations = decorateWidgetDeclarationIcon(view);
	}

	public update(update: ViewUpdate) {
		if (update.docChanged || update.viewportChanged ||
			syntaxTree(update.startState) != syntaxTree(update.state))
			this.decorations = decorateWidgetDeclarationIcon(update.view);
	}
}, {decorations: v => v.decorations});

const extendHighlightStyle = HighlightStyle.define([
	...defaultHighlightStyle.specs,
	// ...Object.keys(tags).reduce((added, key) => {
	// 	added.push({tag: tags[key], class: `d9-playground-editor-${key}`});
	// 	return added;
	// }, []),
	{tag: tags.processingInstruction, class: 'd9-playground-editor-processing-instruction'},
	{tag: tags.heading, class: 'd9-playground-editor-heading'},
	{tag: tags.heading1, class: 'd9-playground-editor-heading1'},
	{tag: tags.heading2, class: 'd9-playground-editor-heading2'},
	{tag: tags.heading3, class: 'd9-playground-editor-heading3'},
	{tag: tags.heading4, class: 'd9-playground-editor-heading4'},
	{tag: tags.heading5, class: 'd9-playground-editor-heading5'},
	{tag: tags.heading6, class: 'd9-playground-editor-heading6'},
	{tag: tags.list, class: 'd9-playground-editor-list'},
	{tag: WidgetDeclarationTag, class: 'd9-playground-editor-widget-declaration'},
	{tag: WidgetDeclarationSplitterTag, class: 'd9-playground-editor-heading'},
	{tag: WidgetDeclarationTypeTag, class: 'd9-playground-editor-widget-declaration-type'},
	{tag: WidgetDeclarationHeadlineTag, class: 'd9-playground-editor-widget-declaration-headline'},
	{tag: WidgetDeclarationPropertyTag, class: 'd9-playground-editor-widget-declaration-property'},
	{tag: WidgetDeclarationIdTag, class: 'd9-playground-editor-widget-declaration-id'},
	{tag: WidgetDeclarationFlagTag, class: 'd9-playground-editor-widget-declaration-flag'},
	{tag: WidgetDeclarationSplitterTag, class: 'd9-playground-editor-widget-declaration-splitter'},
	{tag: WidgetDeclarationAttrNameTag, class: 'd9-playground-editor-widget-declaration-attr-name'},
	{tag: WidgetDeclarationAttrSplitterTag, class: 'd9-playground-editor-widget-declaration-attr-splitter'},
	{tag: WidgetDeclarationAttrValueTag, class: 'd9-playground-editor-widget-declaration-attr-value'}
]);
export const d9mlHighlightStyle = syntaxHighlighting(extendHighlightStyle);

export const d9mlExtensions: MarkdownExtension = {
	defineNodes: [...WidgetDeclarationNodes],
	parseInline: [WidgetDeclaration]
};