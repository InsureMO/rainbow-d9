import {Content, Strong} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedStrong} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class StrongPreparser extends AbstractAstNodePreparser<'strong'> {
	public static readonly TYPE: Strong['type'] = 'strong';

	public getSupportedType(): 'strong' {
		return StrongPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Strong): PreparsedStrong {
		return {type: ParsedNodeType.STRONG, content: node};
	}
}
