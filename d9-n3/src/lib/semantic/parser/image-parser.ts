import {Image} from 'mdast';
import {PreparsedImage} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedImage} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class ImageParser extends AbstractSemanticNodeParser<'image'> {
	public static readonly TYPE: Image['type'] = 'image';

	public getSupportedType(): 'image' {
		return ImageParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedImage): ParsedImage {
		return {
			type: ParsedNodeType.IMAGE, preparsed,
			url: preparsed.content.url ?? '',
			title: preparsed.content.title,
			alt: preparsed.content.alt
		};
	}
}
