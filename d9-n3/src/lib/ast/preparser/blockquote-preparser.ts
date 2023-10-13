import {Blockquote, Content} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedBlockquote, PreparsedSubordinateOfBlockquoteNodes} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';
import {CodePreparser} from './code-preparser';
import {DefinitionPreparser} from './definition-preparser';
import {FootnoteDefinitionPreparser} from './footnote-definition-preparser';
import {HtmlPreparser} from './html-preparser';
import {ListPreparser} from './list-preparser';
import {ParagraphPreparser} from './paragraph-preparser';
import {TablePreparser} from './table-preparser';
import {ThematicBreakPreparser} from './thematic-break-preparser';

export class BlockquotePreparser extends AbstractAstNodePreparser<'blockquote'> {
	public static readonly TYPE: Blockquote['type'] = 'blockquote';

	public getSupportedType(): 'blockquote' {
		return BlockquotePreparser.TYPE;
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

	public parse(node: Blockquote): PreparsedBlockquote {
		return {
			type: ParsedNodeType.BLOCKQUOTE, content: node,
			children: this.parseChildren(node) as Array<PreparsedSubordinateOfBlockquoteNodes>
		};
	}
}
