import {InlineCode} from 'mdast';
import {PreparsedInlineCode} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedInlineCode} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class InlineCodeParser extends AbstractSemanticNodeParser<'inlineCode'> {
	public static readonly TYPE: InlineCode['type'] = 'inlineCode';

	public getSupportedType(): 'inlineCode' {
		return InlineCodeParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedInlineCode): ParsedInlineCode {
		return {type: ParsedNodeType.INLINE_CODE, preparsed, text: preparsed.content.value ?? ''};
	}
}
