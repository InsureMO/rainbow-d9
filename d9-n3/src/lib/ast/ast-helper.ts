import {Undefinable} from '@rainbow-d9/n1';
import {Content, Root} from 'mdast';
import {fromMarkdown} from 'mdast-util-from-markdown';
import {frontmatterFromMarkdown} from 'mdast-util-frontmatter';
import {gfmFootnoteFromMarkdown} from 'mdast-util-gfm-footnote';
import {gfmStrikethroughFromMarkdown} from 'mdast-util-gfm-strikethrough';
import {gfmTableFromMarkdown} from 'mdast-util-gfm-table';
import {gfmTaskListItemFromMarkdown} from 'mdast-util-gfm-task-list-item';
import {frontmatter} from 'micromark-extension-frontmatter';
import {gfmFootnote} from 'micromark-extension-gfm-footnote';
import {gfmStrikethrough} from 'micromark-extension-gfm-strikethrough';
import {gfmTable} from 'micromark-extension-gfm-table';
import {gfmTaskListItem} from 'micromark-extension-gfm-task-list-item';
import {ParsedNodeType} from '../node-types';
import {MarkdownContent} from '../types';
import {
	AbstractParentPreparser,
	BlockquotePreparser,
	BreakPreparser,
	CodePreparser,
	createOrGetPreparserRepositorySingleton,
	DefinitionPreparser,
	DeletePreparser,
	EmphasisPreparser,
	FootnoteDefinitionPreparser,
	FootnotePreparser,
	FootnoteReferencePreparser,
	HeadingPreparser,
	HtmlPreparser,
	ImagePreparser,
	ImageReferencePreparser,
	InlineCodePreparser,
	LinkPreparser,
	LinkReferencePreparser,
	ListPreparser,
	ParagraphPreparser,
	StrongPreparser,
	TablePreparser,
	TextPreparser,
	ThematicBreakPreparser,
	YamlPreparser
} from './preparser';
import {
	PreparsedHeading,
	PreparsedIgnorableNodes,
	PreparsedNode,
	PreparsedSubordinateOfHeadingNodes,
	PreparsedTree
} from './types';

class DepthFirstVisitor {
	private readonly headings: Array<PreparsedHeading>;

	constructor(private readonly tree: PreparsedTree) {
		this.tree = tree;
		this.headings = [];
	}

	public visit(node: PreparsedNode<Content>) {
		if (this.tree.headings.length === 0) {
			// no heading detected, any element but first heading should be ignored
			if (node.type === ParsedNodeType.HEADING) {
				const heading = node as PreparsedHeading;
				this.tree.headings.push(heading);
				this.headings.push(heading);
			} else {
				this.tree.ignored.push(node as PreparsedIgnorableNodes);
			}
		} else if (node.type === ParsedNodeType.HEADING) {
			// at least one heading detected
			// compare with current heading by depth
			const heading = node as PreparsedHeading;
			// try to find parent heading in current chain
			let found = false;
			for (let index = this.headings.length - 1; index >= 0; index--) {
				const mightBeParent = this.headings[index];
				if (mightBeParent.content.depth < heading.content.depth) {
					// parent found in current chain,
					// append to parent, and reset the headings
					mightBeParent.children.push(heading);
					// keep chain till parent
					this.headings.length = index + 1;
					// append me to tail
					this.headings.push(heading);
					found = true;
					break;
				}
			}
			if (!found) {
				// parent not found in current chain,
				// let this to be top level, and reset the headings
				this.tree.headings.push(heading);
				// remove all headings from chain
				this.headings.length = 0;
				// let me be top level
				this.headings.push(heading);
			}
		} else {
			// do nothing, leave it as is
			this.headings[this.headings.length - 1].children.push(node as PreparsedSubordinateOfHeadingNodes);
		}
	}
}

export class AstHelper extends AbstractParentPreparser {
	protected askRoot(content: MarkdownContent): Root {
		return fromMarkdown(content ?? '', {
			extensions: [
				gfmTable, gfmStrikethrough(), gfmFootnote(), gfmTaskListItem, frontmatter(['yaml', 'toml'])],
			mdastExtensions: [
				gfmTableFromMarkdown, gfmStrikethroughFromMarkdown, gfmFootnoteFromMarkdown(),
				gfmTaskListItemFromMarkdown, frontmatterFromMarkdown(['yaml', 'toml'])]
		});
	}

	protected preparePreparsedTree(): PreparsedTree {
		return {ignored: [], headings: []};
	}

	protected isChildConcerned(child: Content): boolean {
		return [
			HeadingPreparser.TYPE,
			ListPreparser.TYPE,
			ParagraphPreparser.TYPE,
			CodePreparser.TYPE,

			TextPreparser.TYPE,
			EmphasisPreparser.TYPE,
			StrongPreparser.TYPE,
			DeletePreparser.TYPE,
			InlineCodePreparser.TYPE,
			LinkPreparser.TYPE,
			LinkReferencePreparser.TYPE,
			ImagePreparser.TYPE,
			ImageReferencePreparser.TYPE,
			FootnotePreparser.TYPE,
			FootnoteDefinitionPreparser.TYPE,
			FootnoteReferencePreparser.TYPE,
			BreakPreparser.TYPE,
			ThematicBreakPreparser.TYPE,
			BlockquotePreparser.TYPE,
			HtmlPreparser.TYPE,
			DefinitionPreparser.TYPE,
			YamlPreparser.TYPE,

			TablePreparser.TYPE
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		].includes(child.type as any);
	}

	/**
	 * Markdown has loose structure, which causes
	 * 1. heading might be not on top level,
	 * 2. non-heading element is on top level,
	 * 3. heading depth is not continuous.
	 *
	 * To preparse the markdown content, follows rules as below,
	 * 1. headings with minimum depth are treated as top level,
	 * 2. headings with not-minimum depth are treated as children of its parent heading,
	 * 3. non-heading elements on top level (which before first heading) treated as ignored,
	 * 4. non-heading elements on top level (which after one certain heading) treated as children of backward closest heading,
	 * 5. non-heading elements not on top level treated as children of its parent,
	 * 6. ignore the heading not on top level (in preparsers).
	 *
	 * @param content
	 */
	public askAsTree(content: MarkdownContent): PreparsedTree {
		const tree = this.preparePreparsedTree();
		const visitor = new DepthFirstVisitor(tree);
		this.parseChildren(this.askRoot(content)).forEach(preparsed => visitor.visit(preparsed));
		return tree;
	}
}

const SINGLETON: { helper: Undefinable<AstHelper> } = {helper: (void 0)};

export const createOrGetAskHelperSingleton = (): AstHelper => {
	if (SINGLETON.helper == null) {
		SINGLETON.helper = new AstHelper(createOrGetPreparserRepositorySingleton());
	}
	return SINGLETON.helper;
};
