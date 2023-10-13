import {Content, List, ListItem} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedList, PreparsedListItem, PreparsedSubordinateOfListItemNodes} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';
import {BlockquotePreparser} from './blockquote-preparser';
import {CodePreparser} from './code-preparser';
import {DefinitionPreparser} from './definition-preparser';
import {FootnoteDefinitionPreparser} from './footnote-definition-preparser';
import {HtmlPreparser} from './html-preparser';
import {ParagraphPreparser} from './paragraph-preparser';
import {TablePreparser} from './table-preparser';
import {ThematicBreakPreparser} from './thematic-break-preparser';

export class ListPreparser extends AbstractAstNodePreparser<'list'> {
	public static readonly TYPE: List['type'] = 'list';

	public getSupportedType(): 'list' {
		return ListPreparser.TYPE;
	}

	protected isChildConcerned(child: Content): boolean {
		return [
			// heading is allowed in markdown, but ignored in preparse
			ListPreparser.TYPE,

			ParagraphPreparser.TYPE,
			CodePreparser.TYPE,
			FootnoteDefinitionPreparser.TYPE,
			ThematicBreakPreparser.TYPE,
			BlockquotePreparser.TYPE,
			HtmlPreparser.TYPE,
			DefinitionPreparser.TYPE,

			TablePreparser.TYPE
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		].includes(child.type as any);
	}

	protected parseListItem(listItem: ListItem): PreparsedListItem {
		return {
			type: ParsedNodeType.LIST_ITEM, content: listItem,
			children: this.parseChildren(listItem) as Array<PreparsedSubordinateOfListItemNodes>
		};
	}

	public parse(node: List): PreparsedList {
		return {
			type: ParsedNodeType.LIST, content: node,
			children: (node.children ?? []).map(child => this.parseListItem(child))
		};
	}
}
