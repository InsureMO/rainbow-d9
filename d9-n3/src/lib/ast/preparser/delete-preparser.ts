import {Content, Delete} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedDelete} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class DeletePreparser extends AbstractAstNodePreparser<'delete'> {
	public static readonly TYPE: Delete['type'] = 'delete';

	public getSupportedType(): 'delete' {
		return DeletePreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Delete): PreparsedDelete {
		return {type: ParsedNodeType.DELETE, content: node};
	}
}
