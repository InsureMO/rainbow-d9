import {Link} from 'mdast';
import {PreparsedLink} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedLink} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class LinkParser extends AbstractSemanticNodeParser<'link'> {
	public static readonly TYPE: Link['type'] = 'link';

	public getSupportedType(): 'link' {
		return LinkParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedLink): ParsedLink {
		return {
			type: ParsedNodeType.LINK, preparsed,
			url: preparsed.content.url ?? '',
			title: preparsed.content.title,
			children: this.parseManyNative(preparsed.content.children ?? [])
		};
	}
}
