import {Content, ThematicBreak} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedThematicBreak} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class ThematicBreakPreparser extends AbstractAstNodePreparser<'thematicBreak'> {
	public static readonly TYPE: ThematicBreak['type'] = 'thematicBreak';

	public getSupportedType(): 'thematicBreak' {
		return ThematicBreakPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: ThematicBreak): PreparsedThematicBreak {
		return {type: ParsedNodeType.THEMATIC_BREAK, content: node};
	}
}
