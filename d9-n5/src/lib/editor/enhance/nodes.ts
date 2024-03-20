import {
	MightBeWidgetDeclarationTag,
	WidgetDeclarationAttrNameButBlankTag,
	WidgetDeclarationAttrNameJointTag,
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
	{name: 'MightBeWidgetDeclaration', style: MightBeWidgetDeclarationTag},
	{name: 'WidgetDeclaration', style: WidgetDeclarationTag},
	{name: 'WidgetDeclarationSplitter', style: WidgetDeclarationSplitterTag},
	{name: 'WidgetDeclarationType', style: WidgetDeclarationTypeTag},
	{name: 'WidgetDeclarationHeadline', style: WidgetDeclarationHeadlineTag},
	{name: 'WidgetDeclarationProperty', style: WidgetDeclarationPropertyTag},
	{name: 'WidgetDeclarationId', style: WidgetDeclarationIdTag},
	{name: 'WidgetDeclarationFlag', style: WidgetDeclarationFlagTag},
	{name: 'WidgetDeclarationAttrName', style: WidgetDeclarationAttrNameTag},
	{name: 'WidgetDeclarationAttrNameButBlank', style: WidgetDeclarationAttrNameButBlankTag},
	{name: 'WidgetDeclarationAttrNameJoint', style: WidgetDeclarationAttrNameJointTag},
	{name: 'WidgetDeclarationAttrSplitter', style: WidgetDeclarationAttrSplitterTag},
	{name: 'WidgetDeclarationAttrValue', style: WidgetDeclarationAttrValueTag},
	{name: 'WidgetDeclarationAttrValueSplitter', style: WidgetDeclarationAttrValueSplitterTag},
	{name: 'WidgetDeclarationAttrValueIcon', style: WidgetDeclarationAttrValueIconTag},
	{name: 'WidgetDeclarationAttrValueStr', style: WidgetDeclarationAttrValueStrTag},
	{name: 'WidgetDeclarationAttrValueExt', style: WidgetDeclarationAttrValueExtTag}
];
