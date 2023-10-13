import {Break, Content} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedBreak} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class BreakPreparser extends AbstractAstNodePreparser<'break'> {
	public static readonly TYPE: Break['type'] = 'break';

	public getSupportedType(): 'break' {
		return BreakPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Break): PreparsedBreak {
		return {type: ParsedNodeType.BREAK, content: node};
	}
}
