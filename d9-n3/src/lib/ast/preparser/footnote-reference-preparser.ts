import {Content, FootnoteReference} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedFootnoteReference} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class FootnoteReferencePreparser extends AbstractAstNodePreparser<'footnoteReference'> {
	public static readonly TYPE: FootnoteReference['type'] = 'footnoteReference';

	public getSupportedType(): 'footnoteReference' {
		return FootnoteReferencePreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: FootnoteReference): PreparsedFootnoteReference {
		return {type: ParsedNodeType.FOOTNOTE_REFERENCE, content: node};
	}
}
