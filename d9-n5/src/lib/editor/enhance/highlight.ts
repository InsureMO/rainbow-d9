import {defaultHighlightStyle, HighlightStyle, syntaxHighlighting} from '@codemirror/language';
import {tags} from '@lezer/highlight';
import {
	HeadingMarkTag,
	ListMarkTag,
	WidgetDeclarationAttrNameTag,
	WidgetDeclarationAttrSplitterTag,
	WidgetDeclarationAttrValueExtTag,
	WidgetDeclarationAttrValueIconTag,
	WidgetDeclarationAttrValueSplitterTag,
	WidgetDeclarationAttrValueStrTag,
	WidgetDeclarationAttrValueTag,
	WidgetDeclarationFlagTag,
	WidgetDeclarationHeadlineTag,
	WidgetDeclarationIdTag,
	WidgetDeclarationPropertyTag,
	WidgetDeclarationSplitterTag,
	WidgetDeclarationTag,
	WidgetDeclarationTypeTag
} from './tags';

const extendHighlightStyle = HighlightStyle.define([
	...defaultHighlightStyle.specs,
	// ...Object.keys(tags).reduce((added, key) => {
	// 	added.push({tag: tags[key], class: `d9-playground-editor-${key}`});
	// 	return added;
	// }, []),
	{tag: HeadingMarkTag, class: 'd9-playground-editor-heading-mark'},
	{tag: ListMarkTag, class: 'd9-playground-editor-list-mark'},
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
	{tag: WidgetDeclarationSplitterTag, class: 'd9-playground-editor-widget-declaration-splitter'},
	{tag: WidgetDeclarationTypeTag, class: 'd9-playground-editor-widget-declaration-type'},
	{tag: WidgetDeclarationHeadlineTag, class: 'd9-playground-editor-widget-declaration-headline'},
	{tag: WidgetDeclarationPropertyTag, class: 'd9-playground-editor-widget-declaration-property'},
	{tag: WidgetDeclarationIdTag, class: 'd9-playground-editor-widget-declaration-id'},
	{tag: WidgetDeclarationFlagTag, class: 'd9-playground-editor-widget-declaration-flag'},
	{tag: WidgetDeclarationAttrNameTag, class: 'd9-playground-editor-widget-declaration-attr-name'},
	{tag: WidgetDeclarationAttrSplitterTag, class: 'd9-playground-editor-widget-declaration-attr-splitter'},
	{tag: WidgetDeclarationAttrValueTag, class: 'd9-playground-editor-widget-declaration-attr-value'},
	{tag: WidgetDeclarationAttrValueSplitterTag, class: 'd9-playground-editor-widget-declaration-attr-value-splitter'},
	{tag: WidgetDeclarationAttrValueIconTag, class: 'd9-playground-editor-widget-declaration-attr-value-icon'},
	{tag: WidgetDeclarationAttrValueStrTag, class: 'd9-playground-editor-widget-declaration-attr-value-str'},
	{tag: WidgetDeclarationAttrValueExtTag, class: 'd9-playground-editor-widget-declaration-attr-value-ext'}
]);

export const d9mlHighlightStyle = syntaxHighlighting(extendHighlightStyle);
