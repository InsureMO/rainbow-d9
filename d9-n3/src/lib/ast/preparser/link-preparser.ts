import {Content, Link} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedLink} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class LinkPreparser extends AbstractAstNodePreparser<'link'> {
	public static readonly TYPE: Link['type'] = 'link';

	public getSupportedType(): 'link' {
		return LinkPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Link): PreparsedLink {
		return {type: ParsedNodeType.LINK, content: node};
	}
}
