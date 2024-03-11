import {
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
	{name: 'WidgetDeclarationAttrValue', style: WidgetDeclarationAttrValueTag},
	{name: 'WidgetDeclarationAttrValueSplitter', style: WidgetDeclarationAttrValueSplitterTag},
	{name: 'WidgetDeclarationAttrValueIcon', style: WidgetDeclarationAttrValueIconTag},
	{name: 'WidgetDeclarationAttrValueStr', style: WidgetDeclarationAttrValueStrTag},
	{name: 'WidgetDeclarationAttrValueExt', style: WidgetDeclarationAttrValueExtTag}
];
