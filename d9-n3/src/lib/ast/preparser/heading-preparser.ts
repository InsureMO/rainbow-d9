import {Content, Heading} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedHeading} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class HeadingPreparser extends AbstractAstNodePreparser<'heading'> {
	public static readonly TYPE: Heading['type'] = 'heading';

	public getSupportedType(): 'heading' {
		return HeadingPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Heading): PreparsedHeading {
		return {type: ParsedNodeType.HEADING, content: node, children: []};
	}
}
