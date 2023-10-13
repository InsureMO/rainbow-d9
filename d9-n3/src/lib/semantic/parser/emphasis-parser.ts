import {Emphasis} from 'mdast';
import {PreparsedEmphasis} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedEmphasis} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class EmphasisParser extends AbstractSemanticNodeParser<'emphasis'> {
	public static readonly TYPE: Emphasis['type'] = 'emphasis';

	public getSupportedType(): 'emphasis' {
		return EmphasisParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedEmphasis): ParsedEmphasis {
		return {
			type: ParsedNodeType.EMPHASIS, preparsed,
			children: this.parseManyNative(preparsed.content.children ?? [])
		};
	}
}
