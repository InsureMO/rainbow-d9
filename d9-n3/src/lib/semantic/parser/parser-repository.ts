import {AstNodePreparserRepository, createOrGetPreparserRepositorySingleton} from '../../ast';
import {Undefinable} from '../../utility-types';
import {ParsedNodeMap} from '../types';
import {BlockquoteParser} from './blockquote-parser';
import {BreakParser} from './break-parser';
import {CodeParser} from './code-parser';
import {DefinitionParser} from './definition-parser';
import {DeleteParser} from './delete-parser';
import {EmphasisParser} from './emphasis-parser';
import {FootnoteDefinitionParser} from './footnote-definition-parser';
import {FootnoteParser} from './footnote-parser';
import {FootnoteReferenceParser} from './footnote-reference-parser';
import {HeadingParser} from './heading-parser';
import {HtmlParser} from './html-parser';
import {ImageParser} from './image-parser';
import {ImageReferenceParser} from './image-reference-parser';
import {InlineCodeParser} from './inline-code-parser';
import {LinkParser} from './link-parser';
import {LinkReferenceParser} from './link-reference-parser';
import {ListParser} from './list-parser';
import {ParagraphParser} from './paragraph-parser';
import {AbstractSemanticNodeParser} from './semantic-node-parser';
import {StrongParser} from './strong-parser';
import {TableParser} from './table-parser';
import {TextParser} from './text-parser';
import {ThematicBreakParser} from './thematic-break-parser';
import {YamlParser} from './yaml-parser';

export class SemanticNodeParserRepository {
	private readonly parsers: Partial<Record<keyof ParsedNodeMap, AbstractSemanticNodeParser<keyof ParsedNodeMap>>> = {};

	public constructor(readonly preparserRepository: AstNodePreparserRepository) {
		this.preparserRepository = preparserRepository;
	}

	public getPreparserRepository(): AstNodePreparserRepository {
		return this.preparserRepository;
	}

	public register<T extends keyof ParsedNodeMap>(parser: AbstractSemanticNodeParser<T>): Undefinable<AbstractSemanticNodeParser<T>> {
		const type = parser.getSupportedType();
		const existing = this.parsers[type];
		this.parsers[type] = parser;
		return existing as Undefinable<AbstractSemanticNodeParser<T>>;
	}

	public unregister<T extends keyof ParsedNodeMap>(type: string): Undefinable<AbstractSemanticNodeParser<T>> {
		const existing = this.parsers[type];
		delete this.parsers[type];
		return existing;
	}

	public askParser<T extends keyof ParsedNodeMap>(type: T): Undefinable<AbstractSemanticNodeParser<T>> {
		return this.parsers[type] as Undefinable<AbstractSemanticNodeParser<T>>;
	}

	public askParsers<T extends keyof ParsedNodeMap>(...types: Array<T>): Array<AbstractSemanticNodeParser<T>> {
		return (types ?? [])
			.map(type => this.askParser(type))
			.filter(parser => parser != null);
	}
}

const SINGLETON: { repo: Undefinable<SemanticNodeParserRepository> } = {repo: (void 0)};

export const createOrGetParserRepositorySingleton = (): SemanticNodeParserRepository => {
	if (SINGLETON.repo == null) {
		const repo = new SemanticNodeParserRepository(createOrGetPreparserRepositorySingleton());

		repo.register(new HeadingParser(repo));
		repo.register(new ListParser(repo));

		repo.register(new ParagraphParser(repo));
		repo.register(new CodeParser(repo));
		repo.register(new TextParser(repo));
		repo.register(new EmphasisParser(repo));
		repo.register(new StrongParser(repo));
		repo.register(new DeleteParser(repo));
		repo.register(new InlineCodeParser(repo));
		repo.register(new LinkParser(repo));
		repo.register(new LinkReferenceParser(repo));
		repo.register(new ImageParser(repo));
		repo.register(new ImageReferenceParser(repo));
		repo.register(new FootnoteParser(repo));
		repo.register(new FootnoteDefinitionParser(repo));
		repo.register(new FootnoteReferenceParser(repo));
		repo.register(new BreakParser(repo));
		repo.register(new ThematicBreakParser(repo));
		repo.register(new BlockquoteParser(repo));
		repo.register(new HtmlParser(repo));
		repo.register(new DefinitionParser(repo));
		repo.register(new YamlParser(repo));

		repo.register(new TableParser(repo));

		SINGLETON.repo = repo;
	}

	return SINGLETON.repo;
};