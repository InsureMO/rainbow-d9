import {LinkReference} from 'mdast';
import {PreparsedLinkReference} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedLinkReference} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class LinkReferenceParser extends AbstractSemanticNodeParser<'linkReference'> {
	public static readonly TYPE: LinkReference['type'] = 'linkReference';

	public getSupportedType(): 'linkReference' {
		return LinkReferenceParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedLinkReference): ParsedLinkReference {
		return {
			type: ParsedNodeType.LINK_REFERENCE, preparsed,
			identifier: preparsed.content.identifier ?? '',
			label: preparsed.content.label ?? '',
			referenceType: preparsed.content.referenceType,
			children: this.parseManyNative(preparsed.content.children ?? [])
		};
	}
}
