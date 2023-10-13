import {Content, Text} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedText} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class TextPreparser extends AbstractAstNodePreparser<'text'> {
	public static readonly TYPE: Text['type'] = 'text';

	public getSupportedType(): 'text' {
		return TextPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Text): PreparsedText {
		return {type: ParsedNodeType.TEXT, content: node};
	}
}
