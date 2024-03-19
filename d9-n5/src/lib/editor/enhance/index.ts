import {MarkdownExtension} from '@lezer/markdown';
import {WidgetDeclarationNodes} from './nodes';
import {HeadingParser, ListItemParser} from './widget-parse';

export const d9mlExtensions: MarkdownExtension = [{
	defineNodes: WidgetDeclarationNodes,
	parseBlock: [HeadingParser, ListItemParser]
}];

export * from './tags';
export * from './nodes';

export * from './declaration-icon';
export * from './highlight';
export * from './completion';

export * from './widget-parse';
