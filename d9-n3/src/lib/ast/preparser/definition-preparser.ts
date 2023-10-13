import {Content, Definition} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedDefinition} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class DefinitionPreparser extends AbstractAstNodePreparser<'definition'> {
	public static readonly TYPE: Definition['type'] = 'definition';

	public getSupportedType(): 'definition' {
		return DefinitionPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: Definition): PreparsedDefinition {
		return {type: ParsedNodeType.DEFINITION, content: node};
	}
}
