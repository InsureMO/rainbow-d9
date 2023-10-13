import {FootnoteReference} from 'mdast';
import {PreparsedFootnoteReference} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedFootnoteReference} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class FootnoteReferenceParser extends AbstractSemanticNodeParser<'footnoteReference'> {
	public static readonly TYPE: FootnoteReference['type'] = 'footnoteReference';

	public getSupportedType(): 'footnoteReference' {
		return FootnoteReferenceParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedFootnoteReference): ParsedFootnoteReference {
		return {
			type: ParsedNodeType.FOOTNOTE_REFERENCE, preparsed,
			identifier: preparsed.content.identifier ?? '',
			label: preparsed.content.label ?? ''
		};
	}
}
