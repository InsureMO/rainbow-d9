import {Undefinable} from '@rainbow-d9/n1';
import {PreparsedNodeMap} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';
import {BlockquotePreparser} from './blockquote-preparser';
import {BreakPreparser} from './break-preparser';
import {CodePreparser} from './code-preparser';
import {DefinitionPreparser} from './definition-preparser';
import {DeletePreparser} from './delete-preparser';
import {EmphasisPreparser} from './emphasis-preparser';
import {FootnoteDefinitionPreparser} from './footnote-definition-preparser';
import {FootnotePreparser} from './footnote-preparser';
import {FootnoteReferencePreparser} from './footnote-reference-preparser';
import {HeadingPreparser} from './heading-preparser';
import {HtmlPreparser} from './html-preparser';
import {ImagePreparser} from './image-preparser';
import {ImageReferencePreparser} from './image-reference-preparser';
import {InlineCodePreparser} from './inline-code-preparser';
import {LinkPreparser} from './link-preparser';
import {LinkReferencePreparser} from './link-reference-preparser';
import {ListPreparser} from './list-preparser';
import {ParagraphPreparser} from './paragraph-preparser';
import {StrongPreparser} from './strong-preparser';
import {TablePreparser} from './table-preparser';
import {TextPreparser} from './text-preparser';
import {ThematicBreakPreparser} from './thematic-break-preparser';
import {YamlPreparser} from './yaml-preparser';

export class AstNodePreparserRepository {
	private readonly preparsers: Partial<Record<keyof PreparsedNodeMap, AbstractAstNodePreparser<keyof PreparsedNodeMap>>> = {};

	public register<T extends keyof PreparsedNodeMap>(preparser: AbstractAstNodePreparser<T>): Undefinable<AbstractAstNodePreparser<T>> {
		const type = preparser.getSupportedType();
		const existing = this.preparsers[type];
		this.preparsers[type] = preparser;
		return existing as Undefinable<AbstractAstNodePreparser<T>>;
	}

	public unregister<T extends keyof PreparsedNodeMap>(type: string): Undefinable<AbstractAstNodePreparser<T>> {
		const existing = this.preparsers[type];
		delete this.preparsers[type];
		return existing;
	}

	public askPreparser<T extends keyof PreparsedNodeMap>(type: T): Undefinable<AbstractAstNodePreparser<T>> {
		return this.preparsers[type] as Undefinable<AbstractAstNodePreparser<T>>;
	}

	public askPreparsers<T extends keyof PreparsedNodeMap>(...types: Array<T>): Array<AbstractAstNodePreparser<T>> {
		return (types ?? [])
			.map(type => this.askPreparser(type))
			.filter(preparser => preparser != null);
	}
}

const SINGLETON: { repo: Undefinable<AstNodePreparserRepository> } = {repo: (void 0)};

export const createOrGetPreparserRepositorySingleton = (): AstNodePreparserRepository => {
	if (SINGLETON.repo == null) {
		const repo = new AstNodePreparserRepository();

		repo.register(new HeadingPreparser(repo));
		repo.register(new ListPreparser(repo));

		repo.register(new ParagraphPreparser(repo));
		repo.register(new CodePreparser(repo));
		repo.register(new TextPreparser(repo));
		repo.register(new EmphasisPreparser(repo));
		repo.register(new StrongPreparser(repo));
		repo.register(new DeletePreparser(repo));
		repo.register(new InlineCodePreparser(repo));
		repo.register(new LinkPreparser(repo));
		repo.register(new LinkReferencePreparser(repo));
		repo.register(new ImagePreparser(repo));
		repo.register(new ImageReferencePreparser(repo));
		repo.register(new FootnotePreparser(repo));
		repo.register(new FootnoteDefinitionPreparser(repo));
		repo.register(new FootnoteReferencePreparser(repo));
		repo.register(new BreakPreparser(repo));
		repo.register(new ThematicBreakPreparser(repo));
		repo.register(new BlockquotePreparser(repo));
		repo.register(new HtmlPreparser(repo));
		repo.register(new DefinitionPreparser(repo));
		repo.register(new YamlPreparser(repo));

		repo.register(new TablePreparser(repo));

		SINGLETON.repo = repo;
	}

	return SINGLETON.repo;
};