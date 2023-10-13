import {Content, HTML} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedHtml} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class HtmlPreparser extends AbstractAstNodePreparser<'html'> {
	public static readonly TYPE: HTML['type'] = 'html';

	public getSupportedType(): 'html' {
		return HtmlPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: HTML): PreparsedHtml {
		return {type: ParsedNodeType.HTML, content: node};
	}
}
