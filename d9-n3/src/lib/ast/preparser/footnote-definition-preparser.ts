import {Content, FootnoteDefinition} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedFootnoteDefinition, PreparsedSubordinateOfFootnoteDefinitionNodes} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';
import {BlockquotePreparser} from './blockquote-preparser';
import {CodePreparser} from './code-preparser';
import {DefinitionPreparser} from './definition-preparser';
import {HtmlPreparser} from './html-preparser';
import {ListPreparser} from './list-preparser';
import {ParagraphPreparser} from './paragraph-preparser';
import {TablePreparser} from './table-preparser';
import {ThematicBreakPreparser} from './thematic-break-preparser';

export class FootnoteDefinitionPreparser extends AbstractAstNodePreparser<'footnoteDefinition'> {
	public static readonly TYPE: FootnoteDefinition['type'] = 'footnoteDefinition';

	public getSupportedType(): 'footnoteDefinition' {
		return FootnoteDefinitionPreparser.TYPE;
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

	public parse(node: FootnoteDefinition): PreparsedFootnoteDefinition {
		return {
			type: ParsedNodeType.FOOTNOTE_DEFINITION, content: node,
			children: this.parseChildren(node) as Array<PreparsedSubordinateOfFootnoteDefinitionNodes>
		};
	}
}
