import {Strong} from 'mdast';
import {PreparsedStrong} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedStrong} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class StrongParser extends AbstractSemanticNodeParser<'strong'> {
	public static readonly TYPE: Strong['type'] = 'strong';

	public getSupportedType(): 'strong' {
		return StrongParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedStrong): ParsedStrong {
		return {
			type: ParsedNodeType.STRONG, preparsed,
			children: this.parseManyNative(preparsed.content.children ?? [])
		};
	}
}
