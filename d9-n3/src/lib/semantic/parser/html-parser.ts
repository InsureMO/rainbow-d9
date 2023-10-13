import {HTML} from 'mdast';
import {PreparsedHtml} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedHtml} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class HtmlParser extends AbstractSemanticNodeParser<'html'> {
	public static readonly TYPE: HTML['type'] = 'html';

	public getSupportedType(): 'html' {
		return HtmlParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedHtml): ParsedHtml {
		return {type: ParsedNodeType.HTML, preparsed, text: preparsed.content.value ?? ''};
	}
}
