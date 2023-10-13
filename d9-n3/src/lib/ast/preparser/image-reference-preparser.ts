import {Content, ImageReference} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedImageReference} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class ImageReferencePreparser extends AbstractAstNodePreparser<'imageReference'> {
	public static readonly TYPE: ImageReference['type'] = 'imageReference';

	public getSupportedType(): 'imageReference' {
		return ImageReferencePreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: ImageReference): PreparsedImageReference {
		return {type: ParsedNodeType.IMAGE_REFERENCE, content: node};
	}
}
