import {Code, Content} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedCode} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class CodePreparser extends AbstractAstNodePreparser<'code'> {
	public static readonly TYPE: Code['type'] = 'code';

	public getSupportedType(): 'code' {
		return CodePreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Code): PreparsedCode {
		return {type: ParsedNodeType.CODE, content: node};
	}
}
