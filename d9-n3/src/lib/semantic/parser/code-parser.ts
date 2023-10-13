import {Code} from 'mdast';
import {PreparsedCode} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedCode} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class CodeParser extends AbstractSemanticNodeParser<'code'> {
	public static readonly TYPE: Code['type'] = 'code';

	public getSupportedType(): 'code' {
		return CodeParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedCode): ParsedCode {
		return {
			type: ParsedNodeType.CODE, preparsed,
			lang: preparsed.content.lang ?? '',
			meta: preparsed.content.meta ?? '',
			text: preparsed.content.value ?? ''
		};
	}
}
