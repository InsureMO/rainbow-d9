import {Content, LinkReference} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedLinkReference} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class LinkReferencePreparser extends AbstractAstNodePreparser<'linkReference'> {
	public static readonly TYPE: LinkReference['type'] = 'linkReference';

	public getSupportedType(): 'linkReference' {
		return LinkReferencePreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: LinkReference): PreparsedLinkReference {
		return {type: ParsedNodeType.LINK_REFERENCE, content: node};
	}
}
