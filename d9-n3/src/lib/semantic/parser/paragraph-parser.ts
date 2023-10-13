import {Paragraph} from 'mdast';
import {PreparsedParagraph} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedParagraph} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class ParagraphParser extends AbstractSemanticNodeParser<'paragraph'> {
	public static readonly TYPE: Paragraph['type'] = 'paragraph';

	public getSupportedType(): 'paragraph' {
		return ParagraphParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedParagraph): ParsedParagraph {
		return {
			type: ParsedNodeType.PARAGRAPH, preparsed,
			children: this.parseManyNative(preparsed.content.children ?? [])
		};
	}
}
