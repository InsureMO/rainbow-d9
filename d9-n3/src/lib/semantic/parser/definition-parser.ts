import {Definition} from 'mdast';
import {PreparsedDefinition} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedDefinition} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class DefinitionParser extends AbstractSemanticNodeParser<'definition'> {
	public static readonly TYPE: Definition['type'] = 'definition';

	public getSupportedType(): 'definition' {
		return DefinitionParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedDefinition): ParsedDefinition {
		return {
			type: ParsedNodeType.DEFINITION, preparsed,
			identifier: preparsed.content.identifier ?? '',
			label: preparsed.content.label ?? '',
			url: preparsed.content.url ?? '',
			title: preparsed.content.title
		};
	}
}
