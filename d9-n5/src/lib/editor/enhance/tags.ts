import {Tag, tags as t} from '@lezer/highlight';

export const HeadingMarkTag = Tag.define();
export const ListMarkTag = Tag.define();

export const MightBeWidgetDeclarationTag = Tag.define(t.content);
export const WidgetDeclarationTag = Tag.define(t.content);
export const WidgetDeclarationSplitterTag = Tag.define();
export const WidgetDeclarationTypeTag = Tag.define();
export const WidgetDeclarationHeadlineTag = Tag.define();
export const WidgetDeclarationPropertyTag = Tag.define();
export const WidgetDeclarationIdTag = Tag.define();
export const WidgetDeclarationFlagTag = Tag.define();
export const WidgetDeclarationAttrNameTag = Tag.define();
export const WidgetDeclarationAttrNameButBlankTag = Tag.define();
export const WidgetDeclarationAttrNameJointTag = Tag.define();
export const WidgetDeclarationAttrSplitterTag = Tag.define();
export const WidgetDeclarationAttrValueTag = Tag.define();
export const WidgetDeclarationAttrValueSplitterTag = Tag.define();
export const WidgetDeclarationAttrValueIconTag = Tag.define();
export const WidgetDeclarationAttrValueStrTag = Tag.define();
export const WidgetDeclarationAttrValueExtTag = Tag.define();
