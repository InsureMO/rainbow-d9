import {Content, YAML} from 'mdast';
import {ParsedNodeType} from '../../node-types';
import {PreparsedYaml} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';

export class YamlPreparser extends AbstractAstNodePreparser<'yaml'> {
	public static readonly TYPE: YAML['type'] = 'yaml';

	public getSupportedType(): 'yaml' {
		return YamlPreparser.TYPE;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isChildConcerned(_child: Content): boolean {
		return false;
	}

	public parse(node: YAML): PreparsedYaml {
		return {type: ParsedNodeType.YAML, content: node};
	}
}
