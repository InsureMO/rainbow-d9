import {Content, Paragraph} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedParagraph} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class ParagraphPreparser extends AbstractAstNodePreparser<'paragraph'> {
	public static readonly TYPE: Paragraph['type'] = 'paragraph';

	public getSupportedType(): 'paragraph' {
		return ParagraphPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Paragraph): PreparsedParagraph {
		return {type: ParsedNodeType.PARAGRAPH, content: node};
	}
}
