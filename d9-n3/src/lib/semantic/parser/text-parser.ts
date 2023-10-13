import {Text} from 'mdast';
import {PreparsedText} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedText} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class TextParser extends AbstractSemanticNodeParser<'text'> {
	public static readonly TYPE: Text['type'] = 'text';

	public getSupportedType(): 'text' {
		return TextParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedText): ParsedText {
		return {type: ParsedNodeType.TEXT, preparsed, text: preparsed.content.value ?? ''};
	}
}
