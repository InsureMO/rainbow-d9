import {
	WidgetDeclarationAttrNameTag,
	WidgetDeclarationAttrSplitterTag,
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
	{name: 'WidgetDeclarationAttrValue', style: WidgetDeclarationAttrValueTag}
];
