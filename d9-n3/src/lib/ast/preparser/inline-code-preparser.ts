import {Content, InlineCode} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedInlineCode} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class InlineCodePreparser extends AbstractAstNodePreparser<'inlineCode'> {
	public static readonly TYPE: InlineCode['type'] = 'inlineCode';

	public getSupportedType(): 'inlineCode' {
		return InlineCodePreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: InlineCode): PreparsedInlineCode {
		return {type: ParsedNodeType.INLINE_CODE, content: node};
	}
}
