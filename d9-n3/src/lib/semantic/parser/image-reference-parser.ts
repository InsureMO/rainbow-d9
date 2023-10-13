import {ImageReference} from 'mdast';
import {PreparsedImageReference} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedImageReference} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class ImageReferenceParser extends AbstractSemanticNodeParser<'imageReference'> {
	public static readonly TYPE: ImageReference['type'] = 'imageReference';

	public getSupportedType(): 'imageReference' {
		return ImageReferenceParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedImageReference): ParsedImageReference {
		return {
			type: ParsedNodeType.IMAGE_REFERENCE, preparsed,
			identifier: preparsed.content.identifier ?? '',
			label: preparsed.content.label ?? '',
			referenceType: preparsed.content.referenceType,
			alt: preparsed.content.alt
		};
	}
}
