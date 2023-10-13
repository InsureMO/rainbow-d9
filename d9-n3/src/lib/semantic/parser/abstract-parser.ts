import {Content} from 'mdast';
import {AbstractPreparser, PreparsedNodes} from '../../ast';
import {N3Logger} from '../../logger';
import {Undefinable} from '../../utility-types';
import {ParsedNode, ParsedNodeMap} from '../types';
import {SemanticNodeParserRepository} from './parser-repository';
import {AbstractSemanticNodeParser} from './semantic-node-parser';

export abstract class AbstractParser extends AbstractPreparser {
	constructor(private readonly parserRepository: SemanticNodeParserRepository) {
		super(parserRepository.getPreparserRepository());
		this.parserRepository = parserRepository;
	}

	protected findParser<T extends keyof ParsedNodeMap>(type: T): Undefinable<AbstractSemanticNodeParser<T>> {
		return this.parserRepository.askParser(type);
	}

	protected parseOnePreparsed<PN extends ParsedNode<PreparsedNodes>>(node: PreparsedNodes): Undefinable<PN> {
		const parser = this.findParser(node.content.type);
		if (parser != null) {
			return parser.parsePreparsed(node) as PN;
		} else {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore never occurs, all types are handled
			N3Logger.error(`Preparsed[type=${node.content.type}] not supported yet.`, AbstractParser.name);
			return (void 0);
		}
	}

	protected parseManyPreparsed<PN extends ParsedNode<PreparsedNodes>>(nodes: Array<PreparsedNodes>): Array<PN> {
		return (nodes ?? [])
			.map(node => this.parseOnePreparsed(node))
			.filter(x => x != null) as Array<PN>;
	}

	protected parseOneNative<PN extends ParsedNode<PreparsedNodes>>(node: Content): Undefinable<PN> {
		const parser = this.findParser(node.type);
		if (parser != null) {
			return parser.parseNative(node) as PN;
		} else {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore never occurs, all types are handled
			N3Logger.error(`Markdown content[type=${node.type}] not supported yet.`, AbstractParser.name);
			return (void 0);
		}
	}

	protected parseManyNative<PN extends ParsedNode<PreparsedNodes>>(nodes: Array<Content>): Array<PN> {
		return (nodes ?? [])
			.map(node => this.parseOneNative(node))
			.filter(x => x != null) as Array<PN>;
	}
}
