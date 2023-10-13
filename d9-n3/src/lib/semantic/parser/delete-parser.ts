import {Delete} from 'mdast';
import {PreparsedDelete} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedDelete} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class DeleteParser extends AbstractSemanticNodeParser<'delete'> {
	public static readonly TYPE: Delete['type'] = 'delete';

	public getSupportedType(): 'delete' {
		return DeleteParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedDelete): ParsedDelete {
		return {
			type: ParsedNodeType.DELETE, preparsed,
			children: this.parseManyNative(preparsed.content.children ?? [])
		};
	}
}
