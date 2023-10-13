import {Footnote} from 'mdast';
import {PreparsedFootnote} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedFootnote} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class FootnoteParser extends AbstractSemanticNodeParser<'footnote'> {
	public static readonly TYPE: Footnote['type'] = 'footnote';

	public getSupportedType(): 'footnote' {
		return FootnoteParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedFootnote): ParsedFootnote {
		return {
			type: ParsedNodeType.FOOTNOTE, preparsed,
			children: this.parseManyNative(preparsed.content.children ?? [])
		};
	}
}
