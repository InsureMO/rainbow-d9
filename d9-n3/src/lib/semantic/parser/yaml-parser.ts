import {YAML} from 'mdast';
import {PreparsedYaml} from '../../ast';
import {ParsedNodeType} from '../../node-types';
import {ParsedYaml} from '../types';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export class YamlParser extends AbstractSemanticNodeParser<'yaml'> {
	public static readonly TYPE: YAML['type'] = 'yaml';

	public getSupportedType(): 'yaml' {
		return YamlParser.TYPE;
	}

	public parsePreparsed(preparsed: PreparsedYaml): ParsedYaml {
		return {type: ParsedNodeType.YAML, preparsed, text: preparsed.content.value ?? ''};
	}
}
