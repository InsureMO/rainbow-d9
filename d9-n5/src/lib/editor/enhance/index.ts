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
export * from './utils';
export * from './declaration-icon';
export * from './highlight';
export * from './completion';
export * from './widget-parse';
export * from './linter';

// 1. completion:
// 1.1 [x] attribute name, complete the declaration
// 1.2 [x] attributes list names,
// 1.3 [x] $icons,
// 1.4 [x] @ext
// 2. syntax highlight:
// 2.1 [x] $icons,
// 2.2 [x] @ext
// 3. Linting
// 3.1 [x] Widget Type,
// 3.1.1 [x] Widget Type with Parent,
// 3.2 [x] attribute name,
// 3.3 [x] $icons,
// 3.3.1 [x] $icons with Widget Type and Property
// 3.4 [x] @ext
// 3.4.1 [x] @ext with Widget Type and Property
// 5. [x] javascript code block
