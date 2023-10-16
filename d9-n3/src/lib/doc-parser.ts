import {VUtils} from '@rainbow-d9/n1';
import {AstHelper, createOrGetAskHelperSingleton} from './ast';
import {createOrGetSemanticHelperSingleton, ParsedHeading, SemanticHelper} from './semantic';
import {MarkdownContent, ParsedNodeDef} from './types';
import {Undefinable} from './utility-types';
import {createOrGetTranslateHelperSingleton, WidgetHelper} from './widget';

export class DocParser {
	constructor(
		private readonly _ast: AstHelper,
		private readonly _semantic: SemanticHelper,
		private readonly _widget: WidgetHelper
	) {
		this._ast = _ast;
		this._semantic = _semantic;
		this._widget = _widget;
	}

	protected get ast(): AstHelper {
		return this._ast;
	}

	protected get semantic(): SemanticHelper {
		return this._semantic;
	}

	protected get widget(): WidgetHelper {
		return this._widget;
	}

	public parseDoc(def: MarkdownContent): ParsedNodeDef {
		if (VUtils.isBlank(def)) {
			throw new Error('No content determined in given markdown content.');
		}

		// parse ast
		const {headings: preparsedHeadings} = this._ast.askAsTree(def);
		if (preparsedHeadings.length === 0) {
			throw new Error('No available content determined, at least one heading in content. All content ignored.');
		}
		// parse ast nodes, find the exported and independent nodes
		const headings = preparsedHeadings.map(heading => this._semantic.parsePreparsed(heading)) as Array<ParsedHeading>;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {exported, independent} = this._semantic.classifyParsedHeadings(headings);
		if (exported.length === 0) {
			throw new Error(`Heading not found, must follow format[Type[[::Headline]::Id]]. All content ignored.`);
		} else if (exported.length > 1) {
			throw new Error(`Multiple roots does not support yet. All content ignored.`);
		}
		const root = exported[0];
		// TODO PARSE INDEPENDENT BLOCKS
		// const independentParses = independent.map<{
		// 	heading: ParsedHeadingIdentified,
		// 	parse: ParseWidgetOnHeading
		// }>(heading => {
		// 	const {$wt} = heading;
		// 	const parse = findHeadingBlockParser($wt);
		// 	if (parse == null) {
		// 		throw new Error(`Parser of independent node[type=${$wt}] is not found. All content ignored.`);
		// 	}
		// 	return {heading, parse};
		// });
		// parse root
		// noinspection UnnecessaryLocalVariableJS
		const parsedRoot = this.widget.translate(root);

		// TODO PARSE INDEPENDENT BLOCKS
		// const parsedIndependent = independentParses.reduce((map, {heading, parse}) => {
		// 	const parsed = parse(heading);
		// 	map[parsed.exportKey] = parsed.node;
		// 	return map;
		// }, {} as Record<NodeDefExportKey, NodeDef>);

		// TODO REFILL THE LACK PARTS OF PARSED INDEPENDENT NODES
		// TODO REFILL THE LACK PARTS OF PARSED ROOT NODE

		return parsedRoot;
	}
}

const SINGLETON: { parser: Undefinable<DocParser> } = {parser: (void 0)};

// export default instance and entrypoint
export const parseDoc: DocParser['parseDoc'] = new Proxy(() => (void 0), {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	apply(target: () => any, _thisArg: any, argArray: any[]): any {
		if (SINGLETON.parser == null) {
			SINGLETON.parser = new DocParser(
				createOrGetAskHelperSingleton(),
				createOrGetSemanticHelperSingleton(),
				createOrGetTranslateHelperSingleton());
		}
		return SINGLETON.parser.parseDoc(argArray[0] ?? '');
	}
});
