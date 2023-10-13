import {ThematicBreak} from 'mdast';
import {PreparsedThematicBreak} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedThematicBreak} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class ThematicBreakParser extends AbstractSemanticNodeParser<'thematicBreak'> {
	public static readonly TYPE: ThematicBreak['type'] = 'thematicBreak';

	public getSupportedType(): 'thematicBreak' {
		return ThematicBreakParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedThematicBreak): ParsedThematicBreak {
		return {type: ParsedNodeType.THEMATIC_BREAK, preparsed};
	}
}
