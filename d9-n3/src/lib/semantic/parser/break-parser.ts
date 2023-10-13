import {Break} from 'mdast';
import {PreparsedBreak} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedBreak} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class BreakParser extends AbstractSemanticNodeParser<'break'> {
	public static readonly TYPE: Break['type'] = 'break';

	public getSupportedType(): 'break' {
		return BreakParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedBreak): ParsedBreak {
		return {type: ParsedNodeType.BREAK, preparsed};
	}
}
