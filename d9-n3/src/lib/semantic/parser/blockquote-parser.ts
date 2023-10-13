import {Blockquote} from 'mdast';
import {PreparsedBlockquote} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedBlockquote} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class BlockquoteParser extends AbstractSemanticNodeParser<'blockquote'> {
	public static readonly TYPE: Blockquote['type'] = 'blockquote';

	public getSupportedType(): 'blockquote' {
		return BlockquoteParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedBlockquote): ParsedBlockquote {
		return {
			type: ParsedNodeType.BLOCKQUOTE, preparsed,
			children: this.parseManyNative(preparsed.content.children ?? [])
		};
	}
}
