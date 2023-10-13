import {FootnoteDefinition} from 'mdast';
import {PreparsedFootnoteDefinition} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedFootnoteDefinition} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class FootnoteDefinitionParser extends AbstractSemanticNodeParser<'footnoteDefinition'> {
	public static readonly TYPE: FootnoteDefinition['type'] = 'footnoteDefinition';

	public getSupportedType(): 'footnoteDefinition' {
		return FootnoteDefinitionParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedFootnoteDefinition): ParsedFootnoteDefinition {
		return {
			type: ParsedNodeType.FOOTNOTE_DEFINITION, preparsed,
			identifier: preparsed.content.identifier ?? '',
			label: preparsed.content.label ?? '',
			children: this.parseManyNative(preparsed.content.children ?? [])
		};
	}
}
