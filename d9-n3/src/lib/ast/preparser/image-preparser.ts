import {Content, Image} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedImage} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class ImagePreparser extends AbstractAstNodePreparser<'image'> {
	public static readonly TYPE: Image['type'] = 'image';

	public getSupportedType(): 'image' {
		return ImagePreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Image): PreparsedImage {
		return {type: ParsedNodeType.IMAGE, content: node};
	}
}
