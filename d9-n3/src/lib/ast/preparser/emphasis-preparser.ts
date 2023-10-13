import {Content, Emphasis} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedEmphasis} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class EmphasisPreparser extends AbstractAstNodePreparser<'emphasis'> {
	public static readonly TYPE: Emphasis['type'] = 'emphasis';

	public getSupportedType(): 'emphasis' {
		return EmphasisPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Emphasis): PreparsedEmphasis {
		return {type: ParsedNodeType.EMPHASIS, content: node};
	}
}
