import {Content, Footnote} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedFootnote} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class FootnotePreparser extends AbstractAstNodePreparser<'footnote'> {
	public static readonly TYPE: Footnote['type'] = 'footnote';

	public getSupportedType(): 'footnote' {
		return FootnotePreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Footnote): PreparsedFootnote {
		return {type: ParsedNodeType.FOOTNOTE, content: node};
	}
}
