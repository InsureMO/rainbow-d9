import {styleTags} from '@lezer/highlight';
import {MarkdownExtension} from '@lezer/markdown';
import {WidgetDeclarationNodes} from './nodes';
import {HeadingMarkTag, ListMarkTag} from './tags';
import {HeadingParser, ListItemParser} from './widget-parse';

export const d9mlExtensions: MarkdownExtension = [{
	defineNodes: WidgetDeclarationNodes,
	parseBlock: [HeadingParser, ListItemParser],
	props: [styleTags({ListMark: ListMarkTag, HeaderMark: HeadingMarkTag})]
}];

export * from './tags';
export * from './nodes';

export * from './declaration-icon';
export * from './highlight';
export * from './completion';

export * from './widget-parse';

export * from './linter';
