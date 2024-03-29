var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { c as createLogger, N as NUtils, V as VUtils, k as MonitorNodeAttributes, l as Reaction, E as ExternalDefIndicator, P as PPUtils } from "./rainbow-d9-n1-xWXGuIcv.js";
import { O as OptionItemSort, R as REACTION_REFRESH_OPTIONS, c as GlobalEventPrefix } from "./rainbow-d9-n2-_5MPPHi3.js";
import { f as fromMarkdown, g as gfmTableFromMarkdown, a as gfmStrikethroughFromMarkdown, b as gfmFootnoteFromMarkdown, c as gfmTaskListItemFromMarkdown, d as frontmatterFromMarkdown } from "./mdast-7kXOs7D6.js";
import { g as gfmTable, h as gfmStrikethrough, i as gfmFootnote, j as gfmTaskListItem, k as frontmatter } from "./micromark-TtjNvBs0.js";
const AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
var ParsedNodeType;
(function(ParsedNodeType2) {
  ParsedNodeType2[ParsedNodeType2["HEADING"] = 0] = "HEADING";
  ParsedNodeType2[ParsedNodeType2["LIST"] = 1] = "LIST";
  ParsedNodeType2[ParsedNodeType2["LIST_ITEM"] = 2] = "LIST_ITEM";
  ParsedNodeType2[ParsedNodeType2["PARAGRAPH"] = 3] = "PARAGRAPH";
  ParsedNodeType2[ParsedNodeType2["CODE"] = 4] = "CODE";
  ParsedNodeType2[ParsedNodeType2["TEXT"] = 5] = "TEXT";
  ParsedNodeType2[ParsedNodeType2["EMPHASIS"] = 6] = "EMPHASIS";
  ParsedNodeType2[ParsedNodeType2["STRONG"] = 7] = "STRONG";
  ParsedNodeType2[ParsedNodeType2["DELETE"] = 8] = "DELETE";
  ParsedNodeType2[ParsedNodeType2["INLINE_CODE"] = 9] = "INLINE_CODE";
  ParsedNodeType2[ParsedNodeType2["TABLE"] = 10] = "TABLE";
  ParsedNodeType2[ParsedNodeType2["TABLE_ROW"] = 11] = "TABLE_ROW";
  ParsedNodeType2[ParsedNodeType2["TABLE_CELL"] = 12] = "TABLE_CELL";
  ParsedNodeType2[ParsedNodeType2["LINK"] = 13] = "LINK";
  ParsedNodeType2[ParsedNodeType2["LINK_REFERENCE"] = 14] = "LINK_REFERENCE";
  ParsedNodeType2[ParsedNodeType2["IMAGE"] = 15] = "IMAGE";
  ParsedNodeType2[ParsedNodeType2["IMAGE_REFERENCE"] = 16] = "IMAGE_REFERENCE";
  ParsedNodeType2[ParsedNodeType2["FOOTNOTE"] = 17] = "FOOTNOTE";
  ParsedNodeType2[ParsedNodeType2["FOOTNOTE_DEFINITION"] = 18] = "FOOTNOTE_DEFINITION";
  ParsedNodeType2[ParsedNodeType2["FOOTNOTE_REFERENCE"] = 19] = "FOOTNOTE_REFERENCE";
  ParsedNodeType2[ParsedNodeType2["BREAK"] = 20] = "BREAK";
  ParsedNodeType2[ParsedNodeType2["THEMATIC_BREAK"] = 21] = "THEMATIC_BREAK";
  ParsedNodeType2[ParsedNodeType2["BLOCKQUOTE"] = 22] = "BLOCKQUOTE";
  ParsedNodeType2[ParsedNodeType2["HTML"] = 23] = "HTML";
  ParsedNodeType2[ParsedNodeType2["DEFINITION"] = 24] = "DEFINITION";
  ParsedNodeType2[ParsedNodeType2["YAML"] = 25] = "YAML";
})(ParsedNodeType || (ParsedNodeType = {}));
const N3Logger = createLogger();
class AbstractPreparser {
  constructor(preparserRepository) {
    __publicField(this, "preparserRepository");
    this.preparserRepository = preparserRepository;
    this.preparserRepository = preparserRepository;
  }
  findPreparser(type) {
    return this.preparserRepository.askPreparser(type);
  }
}
class AbstractParentPreparser extends AbstractPreparser {
  parseChildren(parent) {
    return (parent.children ?? []).filter((child) => {
      const concerned = this.isChildConcerned(child);
      if (concerned) {
        return true;
      } else {
        N3Logger.info(`Child node[type=${child.type}] not concerned, ignored.`, AbstractParentPreparser.name);
        return false;
      }
    }).map((child) => {
      const preparser = this.findPreparser(child.type);
      if (preparser != null) {
        return preparser.parse(child);
      } else {
        N3Logger.error(`Child node[type=${child.type}] not supported yet, ignored.`, AbstractParentPreparser.name);
        return void 0;
      }
    }).filter((preparsed) => preparsed != null);
  }
}
class AbstractAstNodePreparser extends AbstractParentPreparser {
  accept(type) {
    return type === this.getSupportedType();
  }
}
const _CodePreparser = class _CodePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _CodePreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.CODE, content: node };
  }
};
__publicField(_CodePreparser, "TYPE", "code");
let CodePreparser = _CodePreparser;
const _DefinitionPreparser = class _DefinitionPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _DefinitionPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.DEFINITION, content: node };
  }
};
__publicField(_DefinitionPreparser, "TYPE", "definition");
let DefinitionPreparser = _DefinitionPreparser;
const _HtmlPreparser = class _HtmlPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _HtmlPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.HTML, content: node };
  }
};
__publicField(_HtmlPreparser, "TYPE", "html");
let HtmlPreparser = _HtmlPreparser;
const _ParagraphPreparser = class _ParagraphPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _ParagraphPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.PARAGRAPH, content: node };
  }
};
__publicField(_ParagraphPreparser, "TYPE", "paragraph");
let ParagraphPreparser = _ParagraphPreparser;
const _TablePreparser = class _TablePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _TablePreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parseCell(node) {
    return { type: ParsedNodeType.TABLE_CELL, content: node };
  }
  parseRow(node) {
    return {
      type: ParsedNodeType.TABLE_ROW,
      content: node,
      children: (node.children ?? []).map((cell) => this.parseCell(cell))
    };
  }
  parse(node) {
    return {
      type: ParsedNodeType.TABLE,
      content: node,
      children: (node.children ?? []).map((row) => this.parseRow(row))
    };
  }
};
__publicField(_TablePreparser, "TYPE", "table");
let TablePreparser = _TablePreparser;
const _ThematicBreakPreparser = class _ThematicBreakPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _ThematicBreakPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.THEMATIC_BREAK, content: node };
  }
};
__publicField(_ThematicBreakPreparser, "TYPE", "thematicBreak");
let ThematicBreakPreparser = _ThematicBreakPreparser;
const _ListPreparser = class _ListPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _ListPreparser.TYPE;
  }
  isChildConcerned(child) {
    return [
      _ListPreparser.TYPE,
      ParagraphPreparser.TYPE,
      CodePreparser.TYPE,
      FootnoteDefinitionPreparser.TYPE,
      ThematicBreakPreparser.TYPE,
      BlockquotePreparser.TYPE,
      HtmlPreparser.TYPE,
      DefinitionPreparser.TYPE,
      TablePreparser.TYPE
    ].includes(child.type);
  }
  parseListItem(listItem) {
    return {
      type: ParsedNodeType.LIST_ITEM,
      content: listItem,
      children: this.parseChildren(listItem)
    };
  }
  parse(node) {
    return {
      type: ParsedNodeType.LIST,
      content: node,
      children: (node.children ?? []).map((child) => this.parseListItem(child))
    };
  }
};
__publicField(_ListPreparser, "TYPE", "list");
let ListPreparser = _ListPreparser;
const _FootnoteDefinitionPreparser = class _FootnoteDefinitionPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _FootnoteDefinitionPreparser.TYPE;
  }
  isChildConcerned(child) {
    return [
      ListPreparser.TYPE,
      ParagraphPreparser.TYPE,
      CodePreparser.TYPE,
      _FootnoteDefinitionPreparser.TYPE,
      ThematicBreakPreparser.TYPE,
      BlockquotePreparser.TYPE,
      HtmlPreparser.TYPE,
      DefinitionPreparser.TYPE,
      TablePreparser.TYPE
    ].includes(child.type);
  }
  parse(node) {
    return {
      type: ParsedNodeType.FOOTNOTE_DEFINITION,
      content: node,
      children: this.parseChildren(node)
    };
  }
};
__publicField(_FootnoteDefinitionPreparser, "TYPE", "footnoteDefinition");
let FootnoteDefinitionPreparser = _FootnoteDefinitionPreparser;
const _BlockquotePreparser = class _BlockquotePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _BlockquotePreparser.TYPE;
  }
  isChildConcerned(child) {
    return [
      ListPreparser.TYPE,
      ParagraphPreparser.TYPE,
      CodePreparser.TYPE,
      FootnoteDefinitionPreparser.TYPE,
      ThematicBreakPreparser.TYPE,
      _BlockquotePreparser.TYPE,
      HtmlPreparser.TYPE,
      DefinitionPreparser.TYPE,
      TablePreparser.TYPE
    ].includes(child.type);
  }
  parse(node) {
    return {
      type: ParsedNodeType.BLOCKQUOTE,
      content: node,
      children: this.parseChildren(node)
    };
  }
};
__publicField(_BlockquotePreparser, "TYPE", "blockquote");
let BlockquotePreparser = _BlockquotePreparser;
const _BreakPreparser = class _BreakPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _BreakPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.BREAK, content: node };
  }
};
__publicField(_BreakPreparser, "TYPE", "break");
let BreakPreparser = _BreakPreparser;
const _DeletePreparser = class _DeletePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _DeletePreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.DELETE, content: node };
  }
};
__publicField(_DeletePreparser, "TYPE", "delete");
let DeletePreparser = _DeletePreparser;
const _EmphasisPreparser = class _EmphasisPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _EmphasisPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.EMPHASIS, content: node };
  }
};
__publicField(_EmphasisPreparser, "TYPE", "emphasis");
let EmphasisPreparser = _EmphasisPreparser;
const _FootnotePreparser = class _FootnotePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _FootnotePreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.FOOTNOTE, content: node };
  }
};
__publicField(_FootnotePreparser, "TYPE", "footnote");
let FootnotePreparser = _FootnotePreparser;
const _FootnoteReferencePreparser = class _FootnoteReferencePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _FootnoteReferencePreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.FOOTNOTE_REFERENCE, content: node };
  }
};
__publicField(_FootnoteReferencePreparser, "TYPE", "footnoteReference");
let FootnoteReferencePreparser = _FootnoteReferencePreparser;
const _HeadingPreparser = class _HeadingPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _HeadingPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.HEADING, content: node, children: [] };
  }
};
__publicField(_HeadingPreparser, "TYPE", "heading");
let HeadingPreparser = _HeadingPreparser;
const _ImagePreparser = class _ImagePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _ImagePreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.IMAGE, content: node };
  }
};
__publicField(_ImagePreparser, "TYPE", "image");
let ImagePreparser = _ImagePreparser;
const _ImageReferencePreparser = class _ImageReferencePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _ImageReferencePreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.IMAGE_REFERENCE, content: node };
  }
};
__publicField(_ImageReferencePreparser, "TYPE", "imageReference");
let ImageReferencePreparser = _ImageReferencePreparser;
const _InlineCodePreparser = class _InlineCodePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _InlineCodePreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.INLINE_CODE, content: node };
  }
};
__publicField(_InlineCodePreparser, "TYPE", "inlineCode");
let InlineCodePreparser = _InlineCodePreparser;
const _LinkPreparser = class _LinkPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _LinkPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.LINK, content: node };
  }
};
__publicField(_LinkPreparser, "TYPE", "link");
let LinkPreparser = _LinkPreparser;
const _LinkReferencePreparser = class _LinkReferencePreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _LinkReferencePreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.LINK_REFERENCE, content: node };
  }
};
__publicField(_LinkReferencePreparser, "TYPE", "linkReference");
let LinkReferencePreparser = _LinkReferencePreparser;
const _StrongPreparser = class _StrongPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _StrongPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.STRONG, content: node };
  }
};
__publicField(_StrongPreparser, "TYPE", "strong");
let StrongPreparser = _StrongPreparser;
const _TextPreparser = class _TextPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _TextPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.TEXT, content: node };
  }
};
__publicField(_TextPreparser, "TYPE", "text");
let TextPreparser = _TextPreparser;
const _YamlPreparser = class _YamlPreparser extends AbstractAstNodePreparser {
  getSupportedType() {
    return _YamlPreparser.TYPE;
  }
  isChildConcerned(_child) {
    return false;
  }
  parse(node) {
    return { type: ParsedNodeType.YAML, content: node };
  }
};
__publicField(_YamlPreparser, "TYPE", "yaml");
let YamlPreparser = _YamlPreparser;
class AstNodePreparserRepository {
  constructor() {
    __publicField(this, "preparsers", {});
  }
  register(preparser) {
    const type = preparser.getSupportedType();
    const existing = this.preparsers[type];
    this.preparsers[type] = preparser;
    return existing;
  }
  unregister(type) {
    const existing = this.preparsers[type];
    delete this.preparsers[type];
    return existing;
  }
  askPreparser(type) {
    return this.preparsers[type];
  }
  askPreparsers(...types) {
    return (types ?? []).map((type) => this.askPreparser(type)).filter((preparser) => preparser != null);
  }
}
const SINGLETON$6 = { repo: void 0 };
const createOrGetPreparserRepositorySingleton = () => {
  if (SINGLETON$6.repo == null) {
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
    SINGLETON$6.repo = repo;
  }
  return SINGLETON$6.repo;
};
class DepthFirstVisitor {
  constructor(tree) {
    __publicField(this, "tree");
    __publicField(this, "headings");
    this.tree = tree;
    this.tree = tree;
    this.headings = [];
  }
  visit(node) {
    if (this.tree.headings.length === 0) {
      if (node.type === ParsedNodeType.HEADING) {
        const heading = node;
        this.tree.headings.push(heading);
        this.headings.push(heading);
      } else {
        this.tree.ignored.push(node);
      }
    } else if (node.type === ParsedNodeType.HEADING) {
      const heading = node;
      let found = false;
      for (let index2 = this.headings.length - 1; index2 >= 0; index2--) {
        const mightBeParent = this.headings[index2];
        if (mightBeParent.content.depth < heading.content.depth) {
          mightBeParent.children.push(heading);
          this.headings.length = index2 + 1;
          this.headings.push(heading);
          found = true;
          break;
        }
      }
      if (!found) {
        this.tree.headings.push(heading);
        this.headings.length = 0;
        this.headings.push(heading);
      }
    } else {
      this.headings[this.headings.length - 1].children.push(node);
    }
  }
}
class AstHelper extends AbstractParentPreparser {
  askRoot(content) {
    return fromMarkdown(content ?? "", {
      extensions: [
        gfmTable,
        gfmStrikethrough(),
        gfmFootnote(),
        gfmTaskListItem,
        frontmatter(["yaml", "toml"])
      ],
      mdastExtensions: [
        gfmTableFromMarkdown,
        gfmStrikethroughFromMarkdown,
        gfmFootnoteFromMarkdown(),
        gfmTaskListItemFromMarkdown,
        frontmatterFromMarkdown(["yaml", "toml"])
      ]
    });
  }
  preparePreparsedTree() {
    return { ignored: [], headings: [] };
  }
  isChildConcerned(child) {
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
    ].includes(child.type);
  }
  askAsTree(content) {
    const tree = this.preparePreparsedTree();
    const visitor = new DepthFirstVisitor(tree);
    this.parseChildren(this.askRoot(content)).forEach((preparsed) => visitor.visit(preparsed));
    return tree;
  }
}
const SINGLETON$5 = { helper: void 0 };
const createOrGetAskHelperSingleton = () => {
  if (SINGLETON$5.helper == null) {
    SINGLETON$5.helper = new AstHelper(createOrGetPreparserRepositorySingleton());
  }
  return SINGLETON$5.helper;
};
var IgnoredOnTransitToWidgetDefType;
(function(IgnoredOnTransitToWidgetDefType2) {
  IgnoredOnTransitToWidgetDefType2[IgnoredOnTransitToWidgetDefType2["DECLARE_AS_IGNORED"] = 0] = "DECLARE_AS_IGNORED";
  IgnoredOnTransitToWidgetDefType2[IgnoredOnTransitToWidgetDefType2["DETECT_AS_RESERVED"] = 1] = "DETECT_AS_RESERVED";
  IgnoredOnTransitToWidgetDefType2[IgnoredOnTransitToWidgetDefType2["INCORRECT_INDEX_ATTR_AFTER_WIDGET"] = 2] = "INCORRECT_INDEX_ATTR_AFTER_WIDGET";
  IgnoredOnTransitToWidgetDefType2[IgnoredOnTransitToWidgetDefType2["INCORRECT_INDEX_ATTR_IN_NON_FIRST_LIST"] = 3] = "INCORRECT_INDEX_ATTR_IN_NON_FIRST_LIST";
  IgnoredOnTransitToWidgetDefType2[IgnoredOnTransitToWidgetDefType2["UNKNOWN"] = 4] = "UNKNOWN";
})(IgnoredOnTransitToWidgetDefType || (IgnoredOnTransitToWidgetDefType = {}));
var WidgetFlag;
(function(WidgetFlag2) {
  WidgetFlag2[WidgetFlag2["STANDARD"] = 0] = "STANDARD";
  WidgetFlag2[WidgetFlag2["EXPORT"] = 1] = "EXPORT";
  WidgetFlag2[WidgetFlag2["IGNORE"] = 2] = "IGNORE";
})(WidgetFlag || (WidgetFlag = {}));
var ParsedHeadingKind;
(function(ParsedHeadingKind2) {
  ParsedHeadingKind2[ParsedHeadingKind2["IDENTIFIED"] = 0] = "IDENTIFIED";
  ParsedHeadingKind2[ParsedHeadingKind2["RESERVED"] = 1] = "RESERVED";
})(ParsedHeadingKind || (ParsedHeadingKind = {}));
var ParsedListItemKind;
(function(ParsedListItemKind2) {
  ParsedListItemKind2[ParsedListItemKind2["WIDGET"] = 0] = "WIDGET";
  ParsedListItemKind2[ParsedListItemKind2["REF_WIDGET"] = 1] = "REF_WIDGET";
  ParsedListItemKind2[ParsedListItemKind2["ATTRIBUTES"] = 2] = "ATTRIBUTES";
  ParsedListItemKind2[ParsedListItemKind2["ATTRIBUTE_PAIR"] = 3] = "ATTRIBUTE_PAIR";
  ParsedListItemKind2[ParsedListItemKind2["RESERVED"] = 4] = "RESERVED";
})(ParsedListItemKind || (ParsedListItemKind = {}));
var IdentifiedBlockType;
(function(IdentifiedBlockType2) {
  IdentifiedBlockType2[IdentifiedBlockType2["PAGE"] = 0] = "PAGE";
  IdentifiedBlockType2[IdentifiedBlockType2["WIDGET"] = 1] = "WIDGET";
})(IdentifiedBlockType || (IdentifiedBlockType = {}));
class SemanticUtils {
  static isIdentifiedHeading(heading) {
    return heading.kind === ParsedHeadingKind.IDENTIFIED;
  }
  static isReservedHeading(heading) {
    return heading.kind === ParsedHeadingKind.RESERVED;
  }
  static isWidgetListItem(listItem) {
    return listItem.kind === ParsedListItemKind.WIDGET;
  }
  static isRefWidgetListItem(listItem) {
    return listItem.kind === ParsedListItemKind.REF_WIDGET;
  }
  static isAnyWidgetListItem(listItem) {
    return SemanticUtils.isWidgetListItem(listItem) || SemanticUtils.isRefWidgetListItem(listItem);
  }
  static isAttributePairListItem(listItem) {
    return listItem.kind === ParsedListItemKind.ATTRIBUTE_PAIR;
  }
  static isAttributesListItem(listItem) {
    return listItem.kind === ParsedListItemKind.ATTRIBUTES;
  }
  static isAnyAttributeListItem(listItem) {
    return SemanticUtils.isAttributePairListItem(listItem) || SemanticUtils.isAttributesListItem(listItem);
  }
  static isReservedListItem(listItem) {
    return listItem.kind === ParsedListItemKind.RESERVED;
  }
}
class AbstractParser extends AbstractPreparser {
  constructor(parserRepository) {
    super(parserRepository.getPreparserRepository());
    __publicField(this, "parserRepository");
    this.parserRepository = parserRepository;
    this.parserRepository = parserRepository;
  }
  findParser(type) {
    return this.parserRepository.askParser(type);
  }
  parseOnePreparsed(node) {
    const parser = this.findParser(node.content.type);
    if (parser != null) {
      return parser.parsePreparsed(node);
    } else {
      N3Logger.error(`Preparsed[type=${node.content.type}] not supported yet.`, AbstractParser.name);
      return void 0;
    }
  }
  parseManyPreparsed(nodes) {
    return (nodes ?? []).map((node) => this.parseOnePreparsed(node)).filter((x) => x != null);
  }
  parseOneNative(node) {
    const parser = this.findParser(node.type);
    if (parser != null) {
      return parser.parseNative(node);
    } else {
      N3Logger.error(`Markdown content[type=${node.type}] not supported yet.`, AbstractParser.name);
      return void 0;
    }
  }
  parseManyNative(nodes) {
    return (nodes ?? []).map((node) => this.parseOneNative(node)).filter((x) => x != null);
  }
}
class AbstractSemanticNodeParser extends AbstractParser {
  accept(type) {
    return type === this.getSupportedType();
  }
  parseNative(node) {
    const preparser = this.findPreparser(node.type);
    if (preparser != null) {
      return this.parsePreparsed(preparser.parse(node));
    } else {
      N3Logger.error(`Node[type=${node.type}] not supported yet.`, AbstractSemanticNodeParser.name);
      return void 0;
    }
  }
}
const _AbstractSemanticNodeWidgetParser = class _AbstractSemanticNodeWidgetParser extends AbstractSemanticNodeParser {
  getWidgetTitleSplitter() {
    return _AbstractSemanticNodeWidgetParser.WIDGET_TITLE_SPLITTER;
  }
  getCommentLineMatcher() {
    return _AbstractSemanticNodeWidgetParser.COMMENT_LINE_MATCHER;
  }
  getIgnoreFlagLine() {
    return _AbstractSemanticNodeWidgetParser.IGNORE_FLAG_LINE;
  }
  getTailingIgnoreFlag() {
    return _AbstractSemanticNodeWidgetParser.TAILING_IGNORE_FLAG;
  }
  getExportFlagLine() {
    return _AbstractSemanticNodeWidgetParser.EXPORT_FLAG_LINE;
  }
  getTailingExportFlag() {
    return _AbstractSemanticNodeWidgetParser.TAILING_EXPORT_FLAG;
  }
  isValidPhrasingForTitle(phrasing) {
    switch (phrasing.type) {
      case ParsedNodeType.TEXT:
      case ParsedNodeType.INLINE_CODE:
        return true;
      case ParsedNodeType.EMPHASIS:
      case ParsedNodeType.STRONG:
        return phrasing.children.every(this.isValidPhrasingForTitle);
      default:
        N3Logger.info(`Parsed phrasing[${phrasing.preparsed.content.type}]`, _AbstractSemanticNodeWidgetParser.name);
        return false;
    }
  }
  toPlainText(phrasing) {
    switch (phrasing.type) {
      case ParsedNodeType.TEXT:
        return phrasing.text;
      case ParsedNodeType.INLINE_CODE:
        return phrasing.text;
      case ParsedNodeType.EMPHASIS:
      case ParsedNodeType.STRONG:
        return phrasing.children.map((child) => this.toPlainText(child));
      default:
        return "";
    }
  }
  askTitle(phrasings) {
    const accepted = phrasings.filter(this.isValidPhrasingForTitle);
    if (accepted.length !== phrasings.length) {
      return false;
    }
    return accepted.map((phrasing) => this.toPlainText(phrasing)).join("").trim();
  }
  asWidgetFlag(text) {
    text = (text ?? "").trim();
    const toCompare = text.startsWith(this.getWidgetTitleSplitter()) ? text : `${this.getWidgetTitleSplitter()}${text}`;
    switch (toCompare) {
      case this.getTailingIgnoreFlag():
        return WidgetFlag.IGNORE;
      case this.getTailingExportFlag():
        return WidgetFlag.EXPORT;
      default:
        return WidgetFlag.STANDARD;
    }
  }
};
__publicField(_AbstractSemanticNodeWidgetParser, "WIDGET_TITLE_SPLITTER", "::");
__publicField(_AbstractSemanticNodeWidgetParser, "COMMENT_LINE_MATCHER", /^\[\/\/]\s+#\s+\((.*)\)\s*$/);
__publicField(_AbstractSemanticNodeWidgetParser, "IGNORE_FLAG_LINE", "[//] # (IGNORE)");
__publicField(_AbstractSemanticNodeWidgetParser, "EXPORT_FLAG_LINE", "[//] # (EXPORT)");
__publicField(_AbstractSemanticNodeWidgetParser, "TAILING_IGNORE_FLAG", "::IGNORE");
__publicField(_AbstractSemanticNodeWidgetParser, "TAILING_EXPORT_FLAG", "::EXPORT");
let AbstractSemanticNodeWidgetParser = _AbstractSemanticNodeWidgetParser;
const _BlockquoteParser = class _BlockquoteParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _BlockquoteParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.BLOCKQUOTE,
      preparsed,
      children: this.parseManyNative(preparsed.content.children ?? [])
    };
  }
};
__publicField(_BlockquoteParser, "TYPE", "blockquote");
let BlockquoteParser = _BlockquoteParser;
const _BreakParser = class _BreakParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _BreakParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return { type: ParsedNodeType.BREAK, preparsed };
  }
};
__publicField(_BreakParser, "TYPE", "break");
let BreakParser = _BreakParser;
const _CodeParser = class _CodeParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _CodeParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.CODE,
      preparsed,
      lang: preparsed.content.lang ?? "",
      meta: preparsed.content.meta ?? "",
      text: preparsed.content.value ?? ""
    };
  }
};
__publicField(_CodeParser, "TYPE", "code");
let CodeParser = _CodeParser;
const _DefinitionParser = class _DefinitionParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _DefinitionParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.DEFINITION,
      preparsed,
      identifier: preparsed.content.identifier ?? "",
      label: preparsed.content.label ?? "",
      url: preparsed.content.url ?? "",
      title: preparsed.content.title
    };
  }
};
__publicField(_DefinitionParser, "TYPE", "definition");
let DefinitionParser = _DefinitionParser;
const _DeleteParser = class _DeleteParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _DeleteParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.DELETE,
      preparsed,
      children: this.parseManyNative(preparsed.content.children ?? [])
    };
  }
};
__publicField(_DeleteParser, "TYPE", "delete");
let DeleteParser = _DeleteParser;
const _EmphasisParser = class _EmphasisParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _EmphasisParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.EMPHASIS,
      preparsed,
      children: this.parseManyNative(preparsed.content.children ?? [])
    };
  }
};
__publicField(_EmphasisParser, "TYPE", "emphasis");
let EmphasisParser = _EmphasisParser;
const _FootnoteDefinitionParser = class _FootnoteDefinitionParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _FootnoteDefinitionParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.FOOTNOTE_DEFINITION,
      preparsed,
      identifier: preparsed.content.identifier ?? "",
      label: preparsed.content.label ?? "",
      children: this.parseManyNative(preparsed.content.children ?? [])
    };
  }
};
__publicField(_FootnoteDefinitionParser, "TYPE", "footnoteDefinition");
let FootnoteDefinitionParser = _FootnoteDefinitionParser;
const _FootnoteParser = class _FootnoteParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _FootnoteParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.FOOTNOTE,
      preparsed,
      children: this.parseManyNative(preparsed.content.children ?? [])
    };
  }
};
__publicField(_FootnoteParser, "TYPE", "footnote");
let FootnoteParser = _FootnoteParser;
const _FootnoteReferenceParser = class _FootnoteReferenceParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _FootnoteReferenceParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.FOOTNOTE_REFERENCE,
      preparsed,
      identifier: preparsed.content.identifier ?? "",
      label: preparsed.content.label ?? ""
    };
  }
};
__publicField(_FootnoteReferenceParser, "TYPE", "footnoteReference");
let FootnoteReferenceParser = _FootnoteReferenceParser;
const _HeadingParser = class _HeadingParser extends AbstractSemanticNodeWidgetParser {
  getSupportedType() {
    return _HeadingParser.TYPE;
  }
  asReserved(heading) {
    heading.kind = ParsedHeadingKind.RESERVED;
    return heading;
  }
  getTitleFlagMatchers() {
    return _HeadingParser.WIDGET_TITLE_FLAG_MATCHERS;
  }
  findIgnoreFlag(node) {
    const paragraph = (node.children ?? []).find((child) => child.type === ParsedNodeType.PARAGRAPH);
    if (paragraph == null) {
      return false;
    } else if (paragraph.children.length !== 1) {
      return false;
    } else if (paragraph.children[0].type !== ParsedNodeType.TEXT) {
      return false;
    } else {
      return paragraph.children[0].text.trim() === this.getIgnoreFlagLine();
    }
  }
  findExportFlag(node) {
    const paragraph = (node.children ?? []).find((child) => child.type === ParsedNodeType.PARAGRAPH);
    if (paragraph == null) {
      return false;
    } else if (paragraph.children.length !== 1) {
      return false;
    } else if (paragraph.children[0].type !== ParsedNodeType.TEXT) {
      return false;
    } else {
      return paragraph.children[0].text.trim() === this.getExportFlagLine();
    }
  }
  parseTitle(title) {
    const str = (title ?? "").trim();
    const matches = this.getTitleFlagMatchers().find((matcher) => str.endsWith(matcher));
    if (matches == null) {
      return { title, $flag: WidgetFlag.STANDARD };
    } else {
      const index2 = title.indexOf(matches);
      return { title: title.substring(0, index2), $flag: this.asWidgetFlag(matches) };
    }
  }
  matchWidget(title) {
    const segments = title.split(this.getWidgetTitleSplitter());
    const $key = NUtils.generateReactKey();
    if (segments.length === 1) {
      const $wt = segments[0].trim();
      return { $wt, headline: "", $id: $key, $key };
    } else if (segments.length === 3) {
      const $pp = segments[segments.length - 1].trim();
      const $wt = segments[0].trim();
      const headline = segments.slice(1, segments.length - 1).join(this.getWidgetTitleSplitter()).trim();
      return { $wt, headline: headline.trim(), $pp, $id: $key, $key };
    } else if (segments.length > 3) {
      const $id = segments[segments.length - 1].trim();
      const $pp = segments[segments.length - 2].trim();
      const $wt = segments[0].trim();
      const headline = segments.slice(1, segments.length - 2).join(this.getWidgetTitleSplitter()).trim();
      return { $wt, headline: headline.trim(), $pp, $id, $key };
    } else {
      const $wt = segments[0].trim();
      const headline = segments[1].trim();
      return { $wt, headline: VUtils.isBlank(headline) ? void 0 : headline.trim(), $id: $key, $key };
    }
  }
  parsePreparsed(preparsed) {
    const parsed = { type: ParsedNodeType.HEADING, kind: ParsedHeadingKind.IDENTIFIED, preparsed };
    const title = this.askTitle(this.parseManyNative(preparsed.content.children ?? []));
    if (title === false) {
      return this.asReserved(parsed);
    } else if (VUtils.isBlank(title)) {
      return this.asReserved(parsed);
    }
    const { title: titleStr, $flag } = this.parseTitle(title);
    const widget = this.matchWidget(titleStr);
    if (VUtils.isBlank(widget.$wt)) {
      return this.asReserved(parsed);
    }
    return {
      ...parsed,
      ...widget,
      $flag,
      children: this.parseManyPreparsed(preparsed.children ?? [])
    };
  }
};
__publicField(_HeadingParser, "WIDGET_TITLE_FLAG_MATCHERS", [_HeadingParser.TAILING_IGNORE_FLAG, _HeadingParser.TAILING_EXPORT_FLAG]);
__publicField(_HeadingParser, "TYPE", "heading");
let HeadingParser = _HeadingParser;
const _HtmlParser = class _HtmlParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _HtmlParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return { type: ParsedNodeType.HTML, preparsed, text: preparsed.content.value ?? "" };
  }
};
__publicField(_HtmlParser, "TYPE", "html");
let HtmlParser = _HtmlParser;
const _ImageParser = class _ImageParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _ImageParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.IMAGE,
      preparsed,
      url: preparsed.content.url ?? "",
      title: preparsed.content.title,
      alt: preparsed.content.alt
    };
  }
};
__publicField(_ImageParser, "TYPE", "image");
let ImageParser = _ImageParser;
const _ImageReferenceParser = class _ImageReferenceParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _ImageReferenceParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.IMAGE_REFERENCE,
      preparsed,
      identifier: preparsed.content.identifier ?? "",
      label: preparsed.content.label ?? "",
      referenceType: preparsed.content.referenceType,
      alt: preparsed.content.alt
    };
  }
};
__publicField(_ImageReferenceParser, "TYPE", "imageReference");
let ImageReferenceParser = _ImageReferenceParser;
const _InlineCodeParser = class _InlineCodeParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _InlineCodeParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return { type: ParsedNodeType.INLINE_CODE, preparsed, text: preparsed.content.value ?? "" };
  }
};
__publicField(_InlineCodeParser, "TYPE", "inlineCode");
let InlineCodeParser = _InlineCodeParser;
const _LinkParser = class _LinkParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _LinkParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.LINK,
      preparsed,
      url: preparsed.content.url ?? "",
      title: preparsed.content.title,
      children: this.parseManyNative(preparsed.content.children ?? [])
    };
  }
};
__publicField(_LinkParser, "TYPE", "link");
let LinkParser = _LinkParser;
const _LinkReferenceParser = class _LinkReferenceParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _LinkReferenceParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.LINK_REFERENCE,
      preparsed,
      identifier: preparsed.content.identifier ?? "",
      label: preparsed.content.label ?? "",
      referenceType: preparsed.content.referenceType,
      children: this.parseManyNative(preparsed.content.children ?? [])
    };
  }
};
__publicField(_LinkReferenceParser, "TYPE", "linkReference");
let LinkReferenceParser = _LinkReferenceParser;
const _ListParser = class _ListParser extends AbstractSemanticNodeWidgetParser {
  getSupportedType() {
    return _ListParser.TYPE;
  }
  asReserved(listItem) {
    listItem.kind = ParsedListItemKind.RESERVED;
    return listItem;
  }
  findListItemTitle(first) {
    const paragraph = this.findParser(first.content.type).parsePreparsed(first);
    let broken = false;
    return (paragraph.children ?? []).reduce((parsed, phrasing) => {
      switch (true) {
        case phrasing.type === ParsedNodeType.TEXT:
          if (broken) {
            parsed.content.push(phrasing);
          } else {
            const text = phrasing.text ?? "";
            const carriageEnterIndex = text.indexOf("\n");
            if (carriageEnterIndex !== -1) {
              broken = true;
              parsed.title.push({
                type: ParsedNodeType.TEXT,
                preparsed: phrasing.preparsed,
                text: text.substring(0, carriageEnterIndex)
              });
              parsed.content.push({
                type: ParsedNodeType.TEXT,
                preparsed: phrasing.preparsed,
                text: text.substring(carriageEnterIndex + 1)
              });
            } else {
              parsed.title.push(phrasing);
            }
          }
          break;
        case [
          ParsedNodeType.EMPHASIS,
          ParsedNodeType.STRONG,
          ParsedNodeType.DELETE,
          ParsedNodeType.HTML,
          ParsedNodeType.INLINE_CODE,
          ParsedNodeType.IMAGE,
          ParsedNodeType.IMAGE_REFERENCE,
          ParsedNodeType.FOOTNOTE,
          ParsedNodeType.FOOTNOTE_REFERENCE,
          ParsedNodeType.LINK,
          ParsedNodeType.LINK_REFERENCE
        ].includes(phrasing.type):
          (broken ? parsed.content : parsed.title).push(phrasing);
          break;
        case phrasing.type === ParsedNodeType.BREAK:
          if (!broken) {
            broken = true;
          } else {
            parsed.content.push(phrasing);
          }
          break;
        default:
          N3Logger.error(`Child node[type=${phrasing.type}] of root not supported yet, ignored.`, _ListParser.name);
      }
      return parsed;
    }, { title: [], content: [], paragraph });
  }
  getTitleFlagMatchers() {
    return _ListParser.WIDGET_TITLE_FLAG_MATCHERS;
  }
  parseTitle(title) {
    const str = (title ?? "").trim();
    const matches = this.getTitleFlagMatchers().find((matcher) => str.endsWith(matcher));
    if (matches == null) {
      return { title, $flag: WidgetFlag.STANDARD };
    } else {
      const index2 = title.indexOf(matches);
      return { title: title.substring(0, index2), $flag: this.asWidgetFlag(matches) };
    }
  }
  matchRefWidget(title) {
    const matches = title.match(_ListParser.REF_WIDGET_MATCHER);
    if (matches == null) {
      return false;
    }
    const $ref = matches[2];
    if (VUtils.isBlank($ref)) {
      return false;
    } else {
      return { $ref, $flag: WidgetFlag.IGNORE };
    }
  }
  matchWidget(title) {
    const segments = title.split(this.getWidgetTitleSplitter());
    if (segments.length === 1) {
      return false;
    } else if (segments.length >= 3) {
      const $pp = segments[segments.length - 1].trim();
      const $wt = segments[0].trim();
      const label = segments.slice(1, segments.length - 1).join(this.getWidgetTitleSplitter()).trim();
      if (VUtils.isBlank($wt)) {
        return false;
      }
      return { $wt, label: VUtils.isBlank(label) ? void 0 : label.trim(), $pp };
    } else {
      const $wt = segments[0].trim();
      const label = segments[1].trim();
      if (VUtils.isBlank($wt)) {
        return false;
      }
      return { $wt, label: VUtils.isBlank(label) ? void 0 : label.trim() };
    }
  }
  matchAttributePair(headline) {
    const matches = headline.match(_ListParser.ATTRIBUTE_MATCHER);
    if (matches == null) {
      return false;
    }
    return { attributeName: matches[1].trim(), attributeValue: matches[2].trim() };
  }
  regroupToParagraph(paragraph, phrasings) {
    if (phrasings.length == 0) {
      return null;
    } else {
      return { ...paragraph, children: phrasings };
    }
  }
  rebuildListItemChildren(paragraph, phrasings, rest) {
    paragraph = this.regroupToParagraph(paragraph, phrasings);
    if (paragraph == null) {
      return this.parseManyPreparsed(rest);
    } else {
      return [
        paragraph,
        ...this.parseManyPreparsed(rest)
      ];
    }
  }
  parseListItem(listItem) {
    const parsed = {
      type: ParsedNodeType.LIST_ITEM,
      kind: ParsedListItemKind.WIDGET,
      preparsed: listItem
    };
    const hasChild = (listItem.children ?? []).length > 0;
    if (!hasChild) {
      return this.asReserved(parsed);
    }
    const [first, ...rest] = listItem.children ?? [];
    if (first.type !== ParsedNodeType.PARAGRAPH) {
      return this.asReserved(parsed);
    }
    const { position: { start: { line: listItemStartLineNumber } } } = listItem.content;
    const { position: { start: { line: paragraphStartLineNumber } } } = first.content;
    if (listItemStartLineNumber !== paragraphStartLineNumber) {
      return this.asReserved(parsed);
    }
    const { title: titlePhrasings, content: contentPhrasings, paragraph } = this.findListItemTitle(first);
    if (titlePhrasings.length === 0) {
      return this.asReserved(parsed);
    }
    const title = this.askTitle(titlePhrasings);
    if (title === false) {
      return this.asReserved(parsed);
    } else if (VUtils.isBlank(title)) {
      return this.asReserved(parsed);
    }
    const { title: titleStr, $flag } = this.parseTitle(title);
    const refWidget = this.matchRefWidget(titleStr);
    if (refWidget !== false) {
      return {
        ...parsed,
        kind: ParsedListItemKind.REF_WIDGET,
        $ref: refWidget.$ref,
        $flag,
        children: this.rebuildListItemChildren(paragraph, contentPhrasings, rest)
      };
    }
    const widget = this.matchWidget(titleStr);
    if (widget !== false) {
      return {
        ...parsed,
        kind: ParsedListItemKind.WIDGET,
        ...widget,
        $flag,
        children: this.rebuildListItemChildren(paragraph, contentPhrasings, rest)
      };
    }
    const attributePair = this.matchAttributePair(titleStr);
    if (attributePair !== false) {
      return {
        ...parsed,
        kind: ParsedListItemKind.ATTRIBUTE_PAIR,
        ...attributePair,
        children: this.rebuildListItemChildren(paragraph, contentPhrasings, rest)
      };
    }
    const attributes = titleStr.split(",").map((segment) => segment.trim());
    return { ...parsed, kind: ParsedListItemKind.ATTRIBUTES, attributes };
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.LIST,
      preparsed,
      children: (preparsed.children ?? []).map((child) => this.parseListItem(child))
    };
  }
};
__publicField(_ListParser, "WIDGET_TITLE_FLAG_MATCHERS", [_ListParser.TAILING_IGNORE_FLAG]);
__publicField(_ListParser, "REF_WIDGET_MATCHER", /^(REF|Ref|ref)\.(.*)$/);
__publicField(_ListParser, "ATTRIBUTE_MATCHER", /^([^:]+):(.*)$/);
__publicField(_ListParser, "TYPE", "list");
let ListParser = _ListParser;
const _ParagraphParser = class _ParagraphParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _ParagraphParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.PARAGRAPH,
      preparsed,
      children: this.parseManyNative(preparsed.content.children ?? [])
    };
  }
};
__publicField(_ParagraphParser, "TYPE", "paragraph");
let ParagraphParser = _ParagraphParser;
const _StrongParser = class _StrongParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _StrongParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.STRONG,
      preparsed,
      children: this.parseManyNative(preparsed.content.children ?? [])
    };
  }
};
__publicField(_StrongParser, "TYPE", "strong");
let StrongParser = _StrongParser;
const _TableParser = class _TableParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _TableParser.TYPE;
  }
  parseCell(cell) {
    return {
      type: ParsedNodeType.TABLE_CELL,
      preparsed: cell,
      children: this.parseManyNative(cell.content.children ?? [])
    };
  }
  parseRow(row) {
    return {
      type: ParsedNodeType.TABLE_ROW,
      preparsed: row,
      cells: (row.children ?? []).map((cell) => this.parseCell(cell))
    };
  }
  parsePreparsed(preparsed) {
    return {
      type: ParsedNodeType.TABLE,
      preparsed,
      rows: (preparsed.children ?? []).map((row) => this.parseRow(row))
    };
  }
};
__publicField(_TableParser, "TYPE", "table");
let TableParser = _TableParser;
const _TextParser = class _TextParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _TextParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return { type: ParsedNodeType.TEXT, preparsed, text: preparsed.content.value ?? "" };
  }
};
__publicField(_TextParser, "TYPE", "text");
let TextParser = _TextParser;
const _ThematicBreakParser = class _ThematicBreakParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _ThematicBreakParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return { type: ParsedNodeType.THEMATIC_BREAK, preparsed };
  }
};
__publicField(_ThematicBreakParser, "TYPE", "thematicBreak");
let ThematicBreakParser = _ThematicBreakParser;
const _YamlParser = class _YamlParser extends AbstractSemanticNodeParser {
  getSupportedType() {
    return _YamlParser.TYPE;
  }
  parsePreparsed(preparsed) {
    return { type: ParsedNodeType.YAML, preparsed, text: preparsed.content.value ?? "" };
  }
};
__publicField(_YamlParser, "TYPE", "yaml");
let YamlParser = _YamlParser;
class SemanticNodeParserRepository {
  constructor(preparserRepository) {
    __publicField(this, "preparserRepository");
    __publicField(this, "parsers", {});
    this.preparserRepository = preparserRepository;
    this.preparserRepository = preparserRepository;
  }
  getPreparserRepository() {
    return this.preparserRepository;
  }
  register(parser) {
    const type = parser.getSupportedType();
    const existing = this.parsers[type];
    this.parsers[type] = parser;
    return existing;
  }
  unregister(type) {
    const existing = this.parsers[type];
    delete this.parsers[type];
    return existing;
  }
  askParser(type) {
    return this.parsers[type];
  }
  askParsers(...types) {
    return (types ?? []).map((type) => this.askParser(type)).filter((parser) => parser != null);
  }
}
const SINGLETON$4 = { repo: void 0 };
const createOrGetParserRepositorySingleton = () => {
  if (SINGLETON$4.repo == null) {
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
    SINGLETON$4.repo = repo;
  }
  return SINGLETON$4.repo;
};
const _SemanticHelper = class _SemanticHelper extends HeadingParser {
  classifyParsedHeadings(headings) {
    const ignored = [];
    const used = [];
    headings.forEach((heading) => {
      if (SemanticUtils.isIdentifiedHeading(heading)) {
        if (heading.$flag === WidgetFlag.IGNORE || this.findIgnoreFlag(heading)) {
          heading.$flag = WidgetFlag.IGNORE;
          ignored.push(heading);
        } else {
          used.push(heading);
        }
      } else if (SemanticUtils.isReservedHeading(heading)) {
        ignored.push(heading);
      }
    });
    if (used.length === 1) {
      const one = used[0];
      const type = one.$wt === _SemanticHelper.PAGE ? IdentifiedBlockType.PAGE : IdentifiedBlockType.WIDGET;
      return { exported: [one], type, independent: [], ignored };
    }
    const roots = [];
    const independent = [];
    if (used.some((heading) => heading.$wt === _SemanticHelper.PAGE)) {
      used.forEach((heading) => {
        if (heading.$wt === _SemanticHelper.PAGE) {
          roots.push(heading);
        } else {
          independent.push(heading);
        }
      });
      return { exported: roots, type: IdentifiedBlockType.PAGE, independent, ignored };
    } else {
      used.forEach((heading) => {
        if (heading.$flag === WidgetFlag.EXPORT) {
          roots.push(heading);
        } else if (this.findExportFlag(heading)) {
          heading.$flag = WidgetFlag.EXPORT;
          roots.push(heading);
        } else {
          independent.push(heading);
        }
      });
      return { exported: roots, type: IdentifiedBlockType.WIDGET, independent, ignored };
    }
  }
};
__publicField(_SemanticHelper, "PAGE", "Page");
let SemanticHelper = _SemanticHelper;
const SINGLETON$3 = { helper: void 0 };
const createOrGetSemanticHelperSingleton = () => {
  if (SINGLETON$3.helper == null) {
    SINGLETON$3.helper = new SemanticHelper(createOrGetParserRepositorySingleton());
  }
  return SINGLETON$3.helper;
};
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AbstractParser,
  AbstractSemanticNodeParser,
  AbstractSemanticNodeWidgetParser,
  BlockquoteParser,
  BreakParser,
  CodeParser,
  DefinitionParser,
  DeleteParser,
  EmphasisParser,
  FootnoteDefinitionParser,
  FootnoteParser,
  FootnoteReferenceParser,
  HeadingParser,
  HtmlParser,
  get IdentifiedBlockType() {
    return IdentifiedBlockType;
  },
  get IgnoredOnTransitToWidgetDefType() {
    return IgnoredOnTransitToWidgetDefType;
  },
  ImageParser,
  ImageReferenceParser,
  InlineCodeParser,
  LinkParser,
  LinkReferenceParser,
  ListParser,
  ParagraphParser,
  get ParsedHeadingKind() {
    return ParsedHeadingKind;
  },
  get ParsedListItemKind() {
    return ParsedListItemKind;
  },
  SemanticHelper,
  SemanticNodeParserRepository,
  SemanticUtils,
  StrongParser,
  TableParser,
  TextParser,
  ThematicBreakParser,
  get WidgetFlag() {
    return WidgetFlag;
  },
  YamlParser,
  createOrGetParserRepositorySingleton,
  createOrGetSemanticHelperSingleton
});
const TRUE_VALUES = ["True", "true", "T", "t", "Yes", "yes", "Y", "y"];
const FALSE_VALUES = ["False", "false", "F", "f", "No", "no", "N", "n"];
var D9PropertyNames;
(function(D9PropertyNames2) {
  D9PropertyNames2["PROPERTY"] = "$pp";
  D9PropertyNames2["POSITION"] = "$pos";
  D9PropertyNames2["MOBILE_POSITION"] = "$mpos";
  D9PropertyNames2["VALIDATION_SCOPES"] = "$validationScopes";
  D9PropertyNames2["RENDER_ON"] = "$renderOn";
})(D9PropertyNames || (D9PropertyNames = {}));
var AttributeNames;
(function(AttributeNames2) {
  AttributeNames2["DISABLED"] = "disabled";
  AttributeNames2["VISIBLE"] = "visible";
  AttributeNames2["VALID"] = "validate";
  AttributeNames2["REACTION_WATCH"] = "watch";
  AttributeNames2["REACTION_REPAINT"] = "repaint";
  AttributeNames2["REACTION_CLEAR_ME"] = "clearMe";
  AttributeNames2["PROPERTY"] = "property";
  AttributeNames2["RENDER_ON"] = "renderOn";
  AttributeNames2["PLACE"] = "place";
  AttributeNames2["POSITION"] = "position";
  AttributeNames2["POS"] = "pos";
  AttributeNames2["MPOS"] = "mpos";
  AttributeNames2["VALIDATION_SCOPES"] = "validateScopes";
})(AttributeNames || (AttributeNames = {}));
const _AttributeNameUtils = class _AttributeNameUtils {
  constructor() {
  }
  static register(mapping) {
    if (mapping == null) {
      return;
    }
    Object.keys(mapping).forEach((key) => _AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[key] = mapping[key]);
  }
  static unregister(keys) {
    if (keys == null || keys.length === 0) {
      Object.keys(_AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING).forEach((key) => delete _AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[key]);
    } else {
      keys.forEach((key) => delete _AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[key]);
    }
  }
  static mapAttributeName($wt, key) {
    const lowerCaseKey = key.substring(0, 1).toLowerCase() + key.substring(1);
    return _AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[`${$wt}.${lowerCaseKey}`] ?? _AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[lowerCaseKey] ?? _AttributeNameUtils.MAPPED_ATTRIBUTE_NAMES[lowerCaseKey] ?? lowerCaseKey;
  }
};
__publicField(_AttributeNameUtils, "CUSTOMIZED_NAMES_MAPPING", {});
__publicField(_AttributeNameUtils, "MAPPED_ATTRIBUTE_NAMES", {
  [AttributeNames.DISABLED]: MonitorNodeAttributes.DISABLED,
  [AttributeNames.VISIBLE]: MonitorNodeAttributes.VISIBLE,
  [AttributeNames.VALID]: MonitorNodeAttributes.VALID,
  [AttributeNames.PROPERTY]: D9PropertyNames.PROPERTY,
  [AttributeNames.RENDER_ON]: D9PropertyNames.RENDER_ON,
  [AttributeNames.PLACE]: D9PropertyNames.POSITION,
  [AttributeNames.POSITION]: D9PropertyNames.POSITION,
  [AttributeNames.POS]: D9PropertyNames.POSITION,
  [AttributeNames.MPOS]: D9PropertyNames.MOBILE_POSITION,
  [AttributeNames.VALIDATION_SCOPES]: D9PropertyNames.VALIDATION_SCOPES
});
let AttributeNameUtils = _AttributeNameUtils;
class AbstractPositionAttributeBuild {
  accept(key) {
    return false;
  }
  buildPosition(value) {
    value = (value ?? "").trim();
    if (value.includes(":")) {
      const keyMap = {
        "c": "$col",
        "$c": "$col",
        "col": "$col",
        "$col": "$col",
        "column": "$col",
        "$column": "$col",
        "cols": "$cols",
        "$cols": "$cols",
        "columns": "$cols",
        "$columns": "$cols",
        "r": "$row",
        "$r": "$row",
        "row": "$row",
        "$row": "$row",
        "rows": "$rows",
        "$rows": "$rows"
      };
      return value.split(",").map((segment) => segment.trim()).filter((segment) => VUtils.isNotBlank(segment) && segment.includes(":")).map((segment) => segment.split(":")).filter(([key, value2]) => VUtils.isNotBlank(key) && VUtils.isNotBlank(value2)).map(([key, value2]) => {
        key = keyMap[key.trim()];
        if (key == null) {
          return null;
        }
        let v;
        if (value2 === "all") {
          v = -1;
        } else {
          const tested = VUtils.isPositive(value2);
          if (tested.test) {
            v = tested.value;
          } else {
            return null;
          }
        }
        return [key, v];
      }).filter((x) => x != null).reduce((pos, [key, value2]) => {
        pos[key] = value2;
        return pos;
      }, {});
    }
    const values = value.split(",").map((segment) => segment.trim()).filter((segment) => VUtils.isNotBlank(segment)).map((value2) => VUtils.isPositive(value2)).filter((tested) => tested.test).map((transformed) => transformed.value);
    switch (values.length) {
      case 0:
        return void 0;
      case 1:
        return { $cols: values[0] };
      case 2:
        return { $row: values[0], $col: values[1], $cols: 3 };
      case 3:
        return { $row: values[0], $col: values[1], $cols: values[2] };
      default:
        return { $row: values[0], $col: values[1], $cols: values[2], $rows: values[3] };
    }
  }
  build(value) {
    if (VUtils.isBlank(value)) {
      return void 0;
    } else {
      return this.buildPosition(value);
    }
  }
}
class PositionAttributeBuild extends AbstractPositionAttributeBuild {
  accept(key) {
    return D9PropertyNames.POSITION === key;
  }
}
class MobilePositionAttributeBuild extends AbstractPositionAttributeBuild {
  accept(key) {
    return D9PropertyNames.MOBILE_POSITION === key;
  }
}
const DecorateItemsByStrBuild = (value) => {
  return value.split(";").map((item) => item.trim()).filter((item) => VUtils.isNotBlank(item));
};
const DecorateWrapperBuild = (value, list) => {
  if (VUtils.isNotBlank(value)) {
    return DecorateItemsByStrBuild(value);
  }
  if ((list.children ?? []).length == 0) {
    return [];
  }
  if (list.children[0].type === ParsedNodeType.LIST) {
    return (list.children[0].children ?? []).filter(SemanticUtils.isAttributesListItem).filter(({ attributes }) => attributes != null && attributes.length !== 0).map(({ attributes }) => attributes[0]);
  } else {
    return [];
  }
};
const DecorateLeadsBuild = {
  accept: (key) => key === "leads",
  build: DecorateWrapperBuild
};
const DecorateTailsBuild = {
  accept: (key) => key === "tails",
  build: DecorateWrapperBuild
};
class ValidationScopesAttributeBuild {
  accept(key) {
    return D9PropertyNames.VALIDATION_SCOPES === key;
  }
  build(value, _list) {
    value = (value || "").trim();
    if (VUtils.isBlank(value)) {
      return void 0;
    } else {
      const scopes = value.split(/[,;\s]/).map((scope) => scope.trim()).filter((scope) => VUtils.isNotBlank(scope));
      if (scopes.length === 0) {
        return void 0;
      } else {
        return scopes;
      }
    }
  }
}
const _AbstractTranslator = class _AbstractTranslator {
  constructor(repository) {
    __publicField(this, "repository");
    this.repository = repository;
    this.repository = repository;
  }
  findSpecificTranslator($wt) {
    return this.repository.askSpecificTranslator($wt);
  }
  postTranslationCorrectionWork(def) {
    const { node } = def;
    if (node == null) {
      return def;
    }
    [
      "$key",
      D9PropertyNames.PROPERTY,
      D9PropertyNames.POSITION,
      D9PropertyNames.MOBILE_POSITION,
      D9PropertyNames.VALIDATION_SCOPES,
      MonitorNodeAttributes.VALID,
      MonitorNodeAttributes.REACTION
    ].forEach((key) => {
      if (typeof node[key] === "boolean") {
        delete node[key];
      }
    });
    if (typeof node.$pp === "boolean") {
      delete node.$pp;
    }
    return def;
  }
  translate(node, parseOptions) {
    const def = this.doTranslate(node, parseOptions);
    if (def == null) {
      return def;
    } else {
      if (def.node != null) {
        if ((parseOptions == null ? void 0 : parseOptions.keepMd) === true) {
          def.node.preparsed = node.preparsed;
        }
        if (VUtils.isNotBlank(parseOptions == null ? void 0 : parseOptions.forPlayground)) {
          def.node.$wt = `${def.node.$wt ?? ""}.${parseOptions.forPlayground}`;
          def.node["data-for-playground"] = parseOptions.forPlayground.trim();
          def.node["data-for-playground-key"] = NUtils.generateReactKey();
        }
      }
      return this.postTranslationCorrectionWork(def);
    }
  }
  classifyAttributesAndSubWidgetsByList(parent) {
    const children = parent.children ?? [];
    const [first, ...rest] = children.filter((child) => child.type === ParsedNodeType.LIST);
    if (first == null) {
      return { attributes: [], widgets: [], ignored: [] };
    }
    return [first, ...rest].reduce((classified, child, index2) => {
      child.children.forEach((item) => {
        if (SemanticUtils.isAnyWidgetListItem(item) && item.$flag === WidgetFlag.IGNORE) {
          item.ignoredOnTransitToWidget = { type: IgnoredOnTransitToWidgetDefType.DECLARE_AS_IGNORED };
          classified.ignored.push(item);
        } else if (SemanticUtils.isReservedListItem(item)) {
          item.ignoredOnTransitToWidget = { type: IgnoredOnTransitToWidgetDefType.DETECT_AS_RESERVED };
          classified.ignored.push(item);
        } else if (SemanticUtils.isAnyAttributeListItem(item)) {
          if (index2 === 0 && classified.widgets.length === 0) {
            classified.attributes.push(item);
          } else {
            item.ignoredOnTransitToWidget = { type: IgnoredOnTransitToWidgetDefType.INCORRECT_INDEX_ATTR_AFTER_WIDGET };
            classified.ignored.push(item);
          }
        } else if (SemanticUtils.isAnyWidgetListItem(item)) {
          classified.widgets.push(item);
        } else {
          item.ignoredOnTransitToWidget = { type: IgnoredOnTransitToWidgetDefType.UNKNOWN };
          classified.ignored.push(item);
        }
      });
      return classified;
    }, { attributes: [], widgets: [], ignored: [] });
  }
  parseAttributes($wt, list) {
    return (list.attributes || []).reduce((options, attribute) => {
      if (VUtils.isBlank(attribute)) {
        return options;
      }
      const attr = attribute.trim();
      if (attr.startsWith("!")) {
        options[AttributeNameUtils.mapAttributeName($wt, attr.substring(1))] = false;
      } else {
        options[AttributeNameUtils.mapAttributeName($wt, attr)] = true;
      }
      return options;
    }, {});
  }
  buildAttributeValue($wt, key, value, list) {
    if (value == null) {
      return value;
    }
    if (VUtils.isNotBlank(value) && value.trim().toLowerCase().startsWith(_AbstractTranslator.EXTERNAL_DEF_PREFIX)) {
      return new ExternalDefIndicator(value.trim().substring(_AbstractTranslator.EXTERNAL_DEF_PREFIX.length));
    }
    const builder = AttributeUtils.findAttributeBuilders($wt).find((builder2) => builder2.accept(key));
    if (builder != null) {
      return builder.build(value, list);
    } else {
      return value;
    }
  }
  parseAttributePair($wt, list) {
    const { attributeName: name, attributeValue } = list;
    const key = AttributeNameUtils.mapAttributeName($wt, name);
    const value = this.buildAttributeValue($wt, key, attributeValue ?? void 0, list);
    if (VUtils.isBlank(value)) {
      return {};
    } else if (typeof value === "object" && !Array.isArray(value) && value[key] != null) {
      return value;
    } else {
      return { [key]: value };
    }
  }
  combineMonitors(options) {
    return [
      this.repository.validatorBuild,
      this.repository.reactorBuild,
      this.repository.disablementBuild,
      this.repository.visibilityBuild
    ].reduce((attrs, build) => build.combine({ ...options, attributes: attrs }), options.attributes);
  }
  parseAndCombineAttributes(options) {
    const { $wt, items, $pp } = options;
    const attributes = (items || []).map((item) => {
      if (SemanticUtils.isAttributesListItem(item)) {
        return this.parseAttributes($wt, item);
      } else {
        return this.parseAttributePair($wt, item);
      }
    }).reduce((options2, each) => {
      Object.keys(each).forEach((key) => {
        key.split(".").reduce((parent, part, index2, parts) => {
          if (index2 === parts.length - 1) {
            const givenValue = each[key];
            if (givenValue != null && VUtils.isNotBlank(givenValue)) {
              const originalValue = parent[part];
              if (originalValue == null || VUtils.isBlank(originalValue) || !VUtils.isPrimitive(givenValue)) {
                parent[part] = givenValue;
              }
            }
          } else if (parent[part] == null) {
            parent[part] = {};
          }
          return parent[part];
        }, options2);
      });
      return options2;
    }, {});
    return this.combineMonitors({ $wt, $pp: attributes[D9PropertyNames.PROPERTY] || $pp, attributes });
  }
  ignoreFailureParsing(parsed) {
    if (parsed.success !== false) {
      return parsed;
    } else {
      return null;
    }
  }
  buildChildrenOnSubHeadings(options, parseOptions) {
    const { widgets } = options;
    const headings = widgets.filter((widget) => widget.type === ParsedNodeType.HEADING);
    const identifiedHeadings = headings.filter(SemanticUtils.isIdentifiedHeading);
    return identifiedHeadings.map((item) => {
      const translator = this.repository.askTranslator(item.$wt);
      if (translator == null) {
        N3Logger.error(`Translator of heading node[type=${item.$wt}] is not found. All content ignored.`, _AbstractTranslator.name);
        return null;
      }
      return this.ignoreFailureParsing(translator.translate(item, parseOptions));
    }).filter((x) => x != null);
  }
  buildChildrenOnList(options, parseOptions) {
    const { widgets } = options;
    return widgets.map((item) => {
      if (SemanticUtils.isWidgetListItem(item)) {
        const translator = this.repository.askTranslator(item.$wt);
        if (translator == null) {
          N3Logger.error(`Parser of node[type=${item.$wt}, line=${item.preparsed.content.position.start.line}] is not found. All content ignored.`, _AbstractTranslator.name);
          return null;
        } else {
          return this.ignoreFailureParsing(translator.translate(item, parseOptions));
        }
      } else if (SemanticUtils.isRefWidgetListItem(item)) {
        return null;
      }
    }).filter((x) => x != null);
  }
};
__publicField(_AbstractTranslator, "EXTERNAL_DEF_PREFIX", "@ext.");
let AbstractTranslator = _AbstractTranslator;
const parseCodeBlock = (code) => {
  return code.text;
};
const parseParagraph = (textCarrier) => {
  return (textCarrier.children ?? []).filter((child) => {
    return [
      ParsedNodeType.INLINE_CODE,
      ParsedNodeType.TEXT,
      ParsedNodeType.EMPHASIS,
      ParsedNodeType.STRONG
    ].includes(child.type);
  }).map((child) => {
    if (child.type === ParsedNodeType.INLINE_CODE) {
      return child.text;
    } else if (child.type === ParsedNodeType.TEXT) {
      return child.text;
    } else if (child.type === ParsedNodeType.EMPHASIS) {
      return parseParagraph(child);
    } else if (child.type === ParsedNodeType.STRONG) {
      return parseParagraph(child);
    } else {
      return "";
    }
  }).join("");
};
const parseSnippet = (attributeValue, item) => {
  const { children } = item;
  const concerned = (children ?? []).filter((child) => child.type === ParsedNodeType.CODE || ParsedNodeType.PARAGRAPH);
  if (concerned.length === 0) {
    if (VUtils.isNotBlank(attributeValue)) {
      if (attributeValue.trim().toLowerCase().startsWith(AbstractTranslator.EXTERNAL_DEF_PREFIX)) {
        return new ExternalDefIndicator(attributeValue.trim().substring(AbstractTranslator.EXTERNAL_DEF_PREFIX.length));
      } else {
        return attributeValue;
      }
    } else {
      return "";
    }
  }
  const snippet = concerned.map((node) => {
    if (node.type === ParsedNodeType.CODE) {
      return parseCodeBlock(node);
    } else if (node.type === ParsedNodeType.PARAGRAPH) {
      return parseParagraph(node);
    } else {
      return "";
    }
  }).join("\n");
  if (VUtils.isNotBlank(attributeValue)) {
    return `${attributeValue}
${snippet}`;
  } else {
    return snippet;
  }
};
const createSnippetBuild = (attrName, createFunc) => {
  return {
    accept: (key) => key === attrName,
    build: (value, list) => {
      const parsed = parseSnippet(value, list);
      if (parsed instanceof ExternalDefIndicator) {
        return parsed;
      } else if (VUtils.isBlank(parsed)) {
        return void 0;
      } else {
        return createFunc(parsed);
      }
    }
  };
};
const createSyncSnippetBuild = (attrName, argNames, avoidFuncWhenSingleLine = false) => {
  return createSnippetBuild(attrName, (parsed) => {
    if (parsed.indexOf("\n") === -1 && avoidFuncWhenSingleLine) {
      return parsed;
    }
    if (argNames == null || argNames.length === 0) {
      return new Function(parsed);
    } else {
      return new Function(...argNames, parsed);
    }
  });
};
const createAsyncSnippetBuild = (attrName, argNames, avoidFuncWhenSingleLine = false) => {
  return createSnippetBuild(attrName, (parsed) => {
    if (parsed.indexOf("\n") === -1 && avoidFuncWhenSingleLine) {
      return parsed;
    }
    if (argNames == null || argNames.length === 0) {
      return new AsyncFunction(parsed);
    } else {
      return new AsyncFunction(...argNames, parsed);
    }
  });
};
class MonitorableAttributeBuild {
  createComplexAttributeValue() {
    return { on: [], snippet: "" };
  }
  parseOn(value, _list) {
    if (VUtils.isNotBlank(value)) {
      return value.split(",").map((item) => item.trim()).filter((item) => item.length !== 0);
    } else {
      return [];
    }
  }
  parseAttribute(_attributeName, _attributeValue, _item) {
    return { parsed: false };
  }
  build(value, list) {
    if (VUtils.isNotBlank(value)) {
      value = (value || "").trim();
      if (this.detectBooleanValues()) {
        if (TRUE_VALUES.includes(value)) {
          return true;
        } else if (FALSE_VALUES.includes(value)) {
          return false;
        }
      }
    }
    if (list == null || list.children == null || list.children.length === 0) {
      return void 0;
    }
    if (list.children[0].type !== ParsedNodeType.LIST) {
      return void 0;
    }
    const complex = this.createComplexAttributeValue();
    (list.children[0].children ?? []).filter(SemanticUtils.isAttributePairListItem).map((item) => {
      const { attributeName, attributeValue } = item;
      if (attributeName === "on") {
        complex.on = this.parseOn(attributeValue, item);
      } else if (attributeName === "handle") {
        complex.snippet = parseSnippet(attributeValue, item);
      } else {
        const { parsed, name, value: value2 } = this.parseAttribute(attributeName, attributeValue, item);
        if (parsed) {
          complex[name] = value2;
        }
      }
    });
    return complex;
  }
}
class DisablementAttributeBuild extends MonitorableAttributeBuild {
  accept(key) {
    return MonitorNodeAttributes.DISABLED === key;
  }
  detectBooleanValues() {
    return true;
  }
  build(value, list) {
    const built = super.build(value, list);
    if (built == null || typeof built === "boolean") {
      return built;
    }
    if (built.on.length === 0 || VUtils.isBlank(built.snippet)) {
      return void 0;
    }
    return built;
  }
}
class AbstractReactionAttributeBuild extends MonitorableAttributeBuild {
  accept(key) {
    return key === this.getReactionType();
  }
  detectBooleanValues() {
    return false;
  }
  couldSnippetIgnored() {
    return true;
  }
  redressSnippet(snippet) {
    if (snippet == null || typeof snippet === "string" && VUtils.isBlank(snippet)) {
      return `return '${this.getReturnReaction()}';`;
    } else {
      return snippet;
    }
  }
  build(value, list) {
    const built = super.build(value, list);
    if (built == null) {
      return built;
    }
    if (built.on.length === 0 || !this.couldSnippetIgnored() && VUtils.isBlank(built.snippet)) {
      return void 0;
    }
    return {
      on: built.on,
      snippet: this.redressSnippet(built.snippet),
      type: this.getReactionType()
    };
  }
}
class ReactionRepaintAttributeBuild extends AbstractReactionAttributeBuild {
  getReactionType() {
    return AttributeNames.REACTION_REPAINT;
  }
  getReturnReaction() {
    return Reaction.REPAINT;
  }
}
class ReactionClearMeAttributeBuild extends AbstractReactionAttributeBuild {
  getReactionType() {
    return AttributeNames.REACTION_CLEAR_ME;
  }
  getReturnReaction() {
    return Reaction.CLEAR_VALUE;
  }
}
class ReactionWatchAttributeBuild extends AbstractReactionAttributeBuild {
  getReactionType() {
    return AttributeNames.REACTION_WATCH;
  }
  couldSnippetIgnored() {
    return false;
  }
  getReturnReaction() {
    return Reaction.REPAINT;
  }
}
class ValidationAttributeBuild extends MonitorableAttributeBuild {
  accept(key) {
    return MonitorNodeAttributes.VALID === key;
  }
  detectBooleanValues() {
    return false;
  }
  build(value, list) {
    const built = super.build(value, list);
    if (built == null) {
      return built;
    }
    if (built.on.length === 0 && VUtils.isBlank(built.snippet)) {
      return void 0;
    }
    return built;
  }
}
class VisibilityAttributeBuild extends MonitorableAttributeBuild {
  accept(key) {
    return MonitorNodeAttributes.VISIBLE === key;
  }
  detectBooleanValues() {
    return true;
  }
  build(value, list) {
    const built = super.build(value, list);
    if (built == null || typeof built === "boolean") {
      return built;
    }
    if (built.on.length === 0 || VUtils.isBlank(built.snippet)) {
      return void 0;
    }
    return built;
  }
}
const tryBoolOnAttrValue = (value) => {
  value = (value || "").trim();
  if (VUtils.isBlank(value)) {
    return value;
  } else if (TRUE_VALUES.includes(value)) {
    return true;
  } else if (FALSE_VALUES.includes(value)) {
    return false;
  } else {
    return value;
  }
};
const tryNumOnAttrValue = (value) => {
  value = (value || "").trim();
  if (VUtils.isBlank(value)) {
    return value;
  } else {
    try {
      const v = Number(value);
      if (isNaN(v)) {
        return value;
      } else {
        return v;
      }
    } catch {
      return value;
    }
  }
};
const tryBoolAndNumOnAttrValue = (value) => {
  const bool = tryBoolOnAttrValue(value);
  if (bool !== value) {
    return bool;
  } else {
    return tryNumOnAttrValue(value);
  }
};
class AnyAttributeBuild {
  accept(_key) {
    return true;
  }
  build(value, _list) {
    return tryBoolAndNumOnAttrValue(value);
  }
}
const _AttributeUtils = class _AttributeUtils {
  constructor() {
  }
  static register($wt, builders) {
    const existing = _AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt];
    _AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt] = builders.filter((b) => b != null);
    return existing;
  }
  static unregister($wt) {
    const existing = _AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt];
    delete _AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt];
    return existing;
  }
  static findAttributeBuilders($wt) {
    return [
      ..._AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt] ?? [],
      _AttributeUtils.POSITION_ATTRIBUTE_BUILDER,
      _AttributeUtils.MOBILE_POSITION_ATTRIBUTE_BUILDER,
      _AttributeUtils.RENDER_ON_ATTRIBUTE_BUILDER,
      _AttributeUtils.ENABLEMENT_ATTRIBUTE_BUILDER,
      _AttributeUtils.VISIBILITY_ATTRIBUTE_BUILDER,
      _AttributeUtils.VALIDATION_ATTRIBUTE_BUILDER,
      _AttributeUtils.VALIDATION_SCOPES_ATTRIBUTE_BUILDER,
      _AttributeUtils.REACTION_REPAINT_ATTRIBUTE_BUILDER,
      _AttributeUtils.REACTION_CLEAR_ME_ATTRIBUTE_BUILDER,
      _AttributeUtils.REACTION_WATCH_ATTRIBUTE_BUILDER,
      _AttributeUtils.ANY_ATTRIBUTE_BUILDER
    ];
  }
};
__publicField(_AttributeUtils, "POSITION_ATTRIBUTE_BUILDER", new PositionAttributeBuild());
__publicField(_AttributeUtils, "MOBILE_POSITION_ATTRIBUTE_BUILDER", new MobilePositionAttributeBuild());
__publicField(_AttributeUtils, "RENDER_ON_ATTRIBUTE_BUILDER", createSyncSnippetBuild("$renderOn", [], true));
__publicField(_AttributeUtils, "ENABLEMENT_ATTRIBUTE_BUILDER", new DisablementAttributeBuild());
__publicField(_AttributeUtils, "VISIBILITY_ATTRIBUTE_BUILDER", new VisibilityAttributeBuild());
__publicField(_AttributeUtils, "VALIDATION_ATTRIBUTE_BUILDER", new ValidationAttributeBuild());
__publicField(_AttributeUtils, "VALIDATION_SCOPES_ATTRIBUTE_BUILDER", new ValidationScopesAttributeBuild());
__publicField(_AttributeUtils, "REACTION_REPAINT_ATTRIBUTE_BUILDER", new ReactionRepaintAttributeBuild());
__publicField(_AttributeUtils, "REACTION_CLEAR_ME_ATTRIBUTE_BUILDER", new ReactionClearMeAttributeBuild());
__publicField(_AttributeUtils, "REACTION_WATCH_ATTRIBUTE_BUILDER", new ReactionWatchAttributeBuild());
__publicField(_AttributeUtils, "ANY_ATTRIBUTE_BUILDER", new AnyAttributeBuild());
__publicField(_AttributeUtils, "CUSTOMIZED_ATTRIBUTE_BUILDERS", {});
let AttributeUtils = _AttributeUtils;
const wrapMonitorHandlerDetective = (detective, more) => {
  return (options) => {
    const ret = detective(options);
    if (ret == null) {
      return void 0;
    } else {
      more(options.attributes);
      return ret;
    }
  };
};
class AbstractMonitorBuild {
  buildHandlersDetective(find) {
    return (options) => {
      return find(options.$wt).reduce((monitorHandlers, detect) => {
        const { attributes, handlers } = monitorHandlers;
        const handle = detect({ ...options, attributes });
        if (handle != null) {
          handlers.push(handle);
        }
        return { attributes, handlers };
      }, { attributes: options.attributes, handlers: [] });
    };
  }
  findMonitors(handlers) {
    return handlers.map((handler) => {
      if (typeof handler === "function") {
        return { $handle: handler };
      } else {
        return handler;
      }
    });
  }
  findWatches(monitors) {
    return monitors.map(({ $watch }) => $watch).filter(($watch) => $watch != null).flat();
  }
  allowNoWatch() {
    return false;
  }
  combine(options) {
    const { attributes: attrs, handlers } = this.buildHandlersDetective(this.getAllDetectives())(options);
    if (handlers == null || handlers.length === 0) {
      return attrs;
    }
    const monitors = this.findMonitors(handlers);
    if (monitors.length === 0) {
      return attrs;
    }
    const watches = this.findWatches(monitors);
    if (watches.length == 0 && !this.allowNoWatch()) {
      return attrs;
    }
    return this.doCombine(monitors, watches, attrs);
  }
}
const createDefaultMonitorHandlerDetective = (options) => {
  const { attributeName, redressResult, ignoreDefault = false, deleteAttribute = false } = options;
  return (options2) => {
    const { attributes } = options2;
    const value = attributes[attributeName];
    if (value == null || typeof value === "boolean") {
      return void 0;
    }
    const { on, snippet } = value;
    if (deleteAttribute) {
      delete attributes[attributeName];
    }
    if (on == null || on.length === 0 || VUtils.isBlank(snippet)) {
      return void 0;
    }
    if (snippet instanceof ExternalDefIndicator) {
      return { $watch: on, $handle: snippet, $default: snippet };
    }
    let redressedSnippet;
    if (!snippet.includes("\n")) {
      if (!snippet.startsWith("return ")) {
        redressedSnippet = `return ${snippet}`;
      } else {
        redressedSnippet = snippet;
      }
    } else {
      redressedSnippet = snippet;
    }
    const handle = new AsyncFunction("root", "model", "value", "pathToRoot", "propertyPath", "absolutePath", "changedOn", "from", "to", redressedSnippet);
    handle.$snippet = redressedSnippet;
    return {
      $watch: on,
      $handle: async (options3) => {
        const ret = await handle(options3.root, options3.model, options3.value, options3.pathToRoot, options3.propertyPath, options3.absolutePath, options3.changedOn, options3.from, options3.to);
        return redressResult(ret);
      },
      $default: ignoreDefault ? void 0 : async (options3) => {
        const ret = await handle(options3.root, options3.model, options3.value);
        return redressResult(ret);
      }
    };
  };
};
const detectSimpleCheck = (options) => {
  const { attrName, defaultInvalidMessage, validate } = options;
  return (options2) => {
    const { attributes } = options2;
    if (attributes[attrName] !== true && typeof attributes[attrName] !== "string") {
      return void 0;
    }
    const message = attributes[attrName] === true ? defaultInvalidMessage : attributes[attrName];
    delete attributes[attrName];
    return (options3) => {
      const { value } = options3;
      if (!validate(value)) {
        return { valid: false, failReason: message };
      }
    };
  };
};
const detectRequired = wrapMonitorHandlerDetective(detectSimpleCheck({
  attrName: "required",
  defaultInvalidMessage: "Field is required.",
  validate: (value) => VUtils.isNotBlank(value)
}), (attributes) => {
  attributes["data-required"] = true;
});
const detectNumeric = detectSimpleCheck({
  attrName: "numeric",
  defaultInvalidMessage: "Field value should be numeric.",
  validate: (value) => `${value ?? ""}`.length === 0 || VUtils.isNumber(value).test
});
const detectPositive = detectSimpleCheck({
  attrName: "positive",
  defaultInvalidMessage: "Field value should be positive.",
  validate: (value) => `${value ?? ""}`.length === 0 || VUtils.isPositive(value).test
});
const detectNotNegative = detectSimpleCheck({
  attrName: "notNegative",
  defaultInvalidMessage: "Field value should be non-negative.",
  validate: (value) => `${value ?? ""}`.length === 0 || VUtils.isNotNegative(value).test
});
const detectInteger = detectSimpleCheck({
  attrName: "integer",
  defaultInvalidMessage: "Field value should be an integer.",
  validate: (value) => `${value ?? ""}`.length === 0 || VUtils.isInteger(value).test
});
const detectRegex = (options) => {
  const { attributes } = options;
  const regex = attributes.regex || attributes.regexp;
  if (VUtils.isBlank(regex)) {
    return void 0;
  }
  delete attributes.regex;
  delete attributes.regexp;
  const match = `${regex}`.match(/^([^;]+);?(.*)$/);
  if (match != null) {
    const patterns = match[1].split(",").map((pattern) => pattern.trim()).filter((pattern) => pattern.length !== 0).map((pattern) => {
      const regex2 = ValidatorUtils.findRegex(pattern);
      if (regex2 != null) {
        return regex2;
      }
      if (pattern.endsWith("/i")) {
        return new RegExp(pattern.substring(0, pattern.length - 2), "i");
      } else {
        return new RegExp(pattern);
      }
    });
    const message = VUtils.isBlank(match[2]) ? `Field pattern should match regexp[${match[1]}].` : match[2].trim();
    return (options2) => {
      const { value } = options2;
      if (VUtils.isEmpty(value) || patterns.some((pattern) => pattern.test(`${value}`))) {
        return { valid: true };
      } else {
        return { valid: false, failReason: message };
      }
    };
  }
};
const detectLength = (options) => {
  const { attributes } = options;
  if (attributes.length == null) {
    return void 0;
  }
  const mightBePositive = VUtils.isPositive(attributes.length);
  if (mightBePositive.test) {
    delete attributes.length;
    return (options2) => {
      const { value } = options2;
      const length = `${value ?? ""}`.length;
      if (length === 0) {
        return { valid: true };
      } else if (length !== mightBePositive.value) {
        return {
          valid: false,
          failReason: `Field length should be ${mightBePositive.value}.`
        };
      }
    };
  }
  const match = `${attributes.length}`.match(/^([^;]+);?(.*)$/);
  if (match != null) {
    const message = VUtils.isBlank(match[2]) ? `Field length should be ${match[1]}.` : match[2].trim();
    const lengthMatch = match[1].match(/([^,])+/g);
    if (lengthMatch != null) {
      const rules = lengthMatch.map((part) => {
        const mightBePositive2 = VUtils.isPositive(part);
        if (mightBePositive2.test) {
          return (length) => length === mightBePositive2.value;
        }
        const rangeMatch = part.match(/^(\d*)\.\.(\d*)$/);
        if (rangeMatch != null) {
          const min = Number(rangeMatch[1]);
          const max = VUtils.isBlank(rangeMatch[2]) ? Infinity : Number(rangeMatch[2]);
          return (length) => length >= min && length <= max;
        }
        return null;
      }).filter((x) => x != null);
      if (rules.length !== 0) {
        delete attributes.length;
        return (options2) => {
          const { value } = options2;
          const length = `${value ?? ""}`.length;
          if (length === 0) {
            return { valid: true };
          } else if (rules.some((rule) => rule(length))) {
            return { valid: true };
          } else {
            return { valid: false, failReason: message };
          }
        };
      }
    }
  }
};
const detectNumberRange = (options) => {
  const { attributes } = options;
  if (attributes.numberRange == null) {
    return void 0;
  }
  const match = `${attributes.numberRange}`.match(/^([^;]+);?(.*)$/);
  if (match != null) {
    const message = VUtils.isBlank(match[2]) ? `Value should be in range ${match[1]}.` : match[2].trim();
    const rangeMatch = match[1].match(/([^,])+/g);
    if (rangeMatch != null) {
      const rules = rangeMatch.map((part) => {
        const rangeMatch2 = part.match(/^([(\[]?)(-?\d+(\.\d+)?)?\.\.(-?\d+(\.\d+)?)?([)\]]?)$/);
        if (rangeMatch2 != null) {
          const minIncluded = rangeMatch2[1] !== "(";
          const min = VUtils.isBlank(rangeMatch2[2]) ? -Infinity : Number(rangeMatch2[2]);
          const max = VUtils.isBlank(rangeMatch2[4]) ? Infinity : Number(rangeMatch2[4]);
          const maxIncluded = rangeMatch2[6] !== ")";
          return (value) => {
            return (minIncluded ? value >= min : value > min) && (maxIncluded ? value <= max : value < max);
          };
        }
        return null;
      }).filter((x) => x != null);
      if (rules.length !== 0) {
        delete attributes.numberRange;
        return (options2) => {
          const { value } = options2;
          const testedValue = VUtils.isNumber(value);
          if (!testedValue.test) {
            return { valid: true };
          } else if (rules.some((rule) => rule(testedValue.value))) {
            return { valid: true };
          } else {
            return { valid: false, failReason: message };
          }
        };
      }
    }
  }
};
const _ValidatorUtils = class _ValidatorUtils {
  constructor() {
  }
  static registerRegexps(regexps) {
    Object.keys(regexps ?? {}).forEach((key) => {
      _ValidatorUtils._PREDEFINED_REGEXPS[key] = regexps[key];
    });
  }
  static findRegex(key) {
    return _ValidatorUtils._PREDEFINED_REGEXPS[key];
  }
  static register($wt, detectives) {
    const existing = _ValidatorUtils.DETECTIVES[$wt];
    _ValidatorUtils.DETECTIVES[$wt] = detectives.filter((b) => b != null);
    return existing;
  }
  static unregister($wt) {
    const existing = _ValidatorUtils.DETECTIVES[$wt];
    delete _ValidatorUtils.DETECTIVES[$wt];
    return existing;
  }
  static getAllDetectives($wt) {
    return _ValidatorUtils.DETECTIVES[$wt] ?? [];
  }
};
__publicField(_ValidatorUtils, "DETECTIVES", {});
__publicField(_ValidatorUtils, "DETECT_VALIDATION", createDefaultMonitorHandlerDetective({
  attributeName: MonitorNodeAttributes.VALID,
  redressResult: (ret) => {
    if (ret == null) {
      return { valid: true };
    } else {
      return ret;
    }
  }
}));
__publicField(_ValidatorUtils, "DETECT_SIMPLE_CHECK", detectSimpleCheck);
__publicField(_ValidatorUtils, "DETECT_REQUIRED", detectRequired);
__publicField(_ValidatorUtils, "DETECT_NUMERIC", detectNumeric);
__publicField(_ValidatorUtils, "DETECT_POSITIVE", detectPositive);
__publicField(_ValidatorUtils, "DETECT_NOT_NEGATIVE", detectNotNegative);
__publicField(_ValidatorUtils, "DETECT_INTEGER", detectInteger);
__publicField(_ValidatorUtils, "DETECT_REGEX", detectRegex);
__publicField(_ValidatorUtils, "DETECT_LENGTH", detectLength);
__publicField(_ValidatorUtils, "DETECT_NUMBER_RANGE", detectNumberRange);
__publicField(_ValidatorUtils, "_PREDEFINED_REGEXPS", {});
let ValidatorUtils = _ValidatorUtils;
class ValidatorBuild extends AbstractMonitorBuild {
  getAllDetectives() {
    return ValidatorUtils.getAllDetectives;
  }
  allowNoWatch() {
    return true;
  }
  doCombine(monitors, watches, attributes) {
    attributes[MonitorNodeAttributes.VALID] = {
      $watch: watches.length === 0 ? void 0 : watches,
      $handle: async (options) => {
        return await monitors.reduce(async (result, { $handle }) => {
          const ret = await result;
          if (!ret.valid) {
            return ret;
          }
          if ($handle != null) {
            return await $handle(options) ?? result;
          } else {
            return result;
          }
        }, Promise.resolve({ valid: true }));
      }
    };
    return attributes;
  }
}
const _ReactionUtils = class _ReactionUtils {
  constructor() {
  }
  static register($wt, detectives) {
    const existing = _ReactionUtils.DETECTIVES[$wt];
    _ReactionUtils.DETECTIVES[$wt] = detectives.filter((b) => b != null);
    return existing;
  }
  static unregister($wt) {
    const existing = _ReactionUtils.DETECTIVES[$wt];
    delete _ReactionUtils.DETECTIVES[$wt];
    return existing;
  }
  static getAllDetectives($wt) {
    return _ReactionUtils.DETECTIVES[$wt] ?? [];
  }
};
__publicField(_ReactionUtils, "DETECTIVES", {});
__publicField(_ReactionUtils, "DETECT_REACTION_REPAINT", createDefaultMonitorHandlerDetective({
  attributeName: AttributeNames.REACTION_REPAINT,
  redressResult: (ret) => ret == null || VUtils.isBlank(ret) ? Reaction.REPAINT : ret,
  ignoreDefault: true,
  deleteAttribute: true
}));
__publicField(_ReactionUtils, "DETECT_REACTION_CLEAR_ME", createDefaultMonitorHandlerDetective({
  attributeName: AttributeNames.REACTION_CLEAR_ME,
  redressResult: (ret) => ret == null || VUtils.isBlank(ret) ? Reaction.CLEAR_VALUE : ret,
  ignoreDefault: true,
  deleteAttribute: true
}));
__publicField(_ReactionUtils, "DETECT_REACTION_WATCH", createDefaultMonitorHandlerDetective({
  attributeName: AttributeNames.REACTION_WATCH,
  redressResult: (ret) => ret == null || VUtils.isBlank(ret) ? Reaction.REPAINT : ret,
  ignoreDefault: true,
  deleteAttribute: true
}));
let ReactionUtils = _ReactionUtils;
class ReactionBuild extends AbstractMonitorBuild {
  getAllDetectives() {
    return ReactionUtils.getAllDetectives;
  }
  doCombine(monitors, watches, attributes) {
    attributes[MonitorNodeAttributes.REACTION] = {
      $watch: watches,
      $handle: async (options) => {
        const { changedOn } = options;
        const results = await Promise.all(monitors.filter(({ $watch }) => {
          const should = $watch.some((watch) => {
            const watchPath = PPUtils.absolute(options.pathToRoot, watch);
            const match = PPUtils.matches(watchPath, changedOn);
            return match;
          });
          return should;
        }).map(async ({ $handle }) => {
          const ret = await $handle(options);
          return ret;
        }).filter(async (result) => VUtils.isNotBlank(await result)));
        if (results.length === 0) {
          return void 0;
        } else {
          return results.flat(1);
        }
      }
    };
    return attributes;
  }
}
const _DisablementUtils = class _DisablementUtils {
  constructor() {
  }
  static register($wt, detectives) {
    const existing = _DisablementUtils.DETECTIVES[$wt];
    _DisablementUtils.DETECTIVES[$wt] = detectives.filter((b) => b != null);
    return existing;
  }
  static unregister($wt) {
    const existing = _DisablementUtils.DETECTIVES[$wt];
    delete _DisablementUtils.DETECTIVES[$wt];
    return existing;
  }
  static getAllDetectives($wt) {
    return _DisablementUtils.DETECTIVES[$wt] ?? [];
  }
};
__publicField(_DisablementUtils, "DETECTIVES", {});
__publicField(_DisablementUtils, "DETECT_DISABLED", createDefaultMonitorHandlerDetective({
  attributeName: MonitorNodeAttributes.DISABLED,
  redressResult: (ret) => ret === true
}));
let DisablementUtils = _DisablementUtils;
class DisablementBuild extends AbstractMonitorBuild {
  getAllDetectives() {
    return DisablementUtils.getAllDetectives;
  }
  doCombine(monitors, watches, attributes) {
    attributes[MonitorNodeAttributes.DISABLED] = {
      $watch: watches,
      $handle: async (options) => {
        return await monitors.reduce(async (result, { $handle }) => {
          const ret = await result;
          if (ret) {
            return ret;
          }
          return await $handle(options) ?? result;
        }, Promise.resolve(false));
      },
      $default: async (options) => {
        return await monitors.reduce(async (result, { $handle }) => {
          try {
            const ret = await result;
            if (ret) {
              return ret;
            }
            return await $handle(options) ?? false;
          } catch (e) {
            N3Logger.error(e, "DisabledMonitorDefaultValueCompute");
            return true;
          }
        }, Promise.resolve(false));
      }
    };
    return attributes;
  }
}
const _VisibilityUtils = class _VisibilityUtils {
  constructor() {
  }
  static register($wt, detectives) {
    const existing = _VisibilityUtils.DETECTIVES[$wt];
    _VisibilityUtils.DETECTIVES[$wt] = detectives.filter((b) => b != null);
    return existing;
  }
  static unregister($wt) {
    const existing = _VisibilityUtils.DETECTIVES[$wt];
    delete _VisibilityUtils.DETECTIVES[$wt];
    return existing;
  }
  static getAllDetectives($wt) {
    return _VisibilityUtils.DETECTIVES[$wt] ?? [];
  }
};
__publicField(_VisibilityUtils, "DETECTIVES", {});
__publicField(_VisibilityUtils, "DETECT_VISIBILITY", createDefaultMonitorHandlerDetective({
  attributeName: MonitorNodeAttributes.VISIBLE,
  redressResult: (ret) => ret !== false
}));
let VisibilityUtils = _VisibilityUtils;
class VisibilityBuild extends AbstractMonitorBuild {
  getAllDetectives() {
    return VisibilityUtils.getAllDetectives;
  }
  doCombine(monitors, watches, attributes) {
    attributes[MonitorNodeAttributes.VISIBLE] = {
      $watch: watches,
      $handle: async (options) => {
        return await monitors.reduce(async (result, { $handle }) => {
          const ret = await result;
          if (!ret) {
            return ret;
          }
          return await $handle(options) ?? true;
        }, Promise.resolve(true));
      },
      $default: async (options) => {
        return await monitors.reduce(async (result, { $handle }) => {
          try {
            const ret = await result;
            if (!ret) {
              return ret;
            }
            return await $handle(options) ?? true;
          } catch (e) {
            N3Logger.error(e, "VisibleMonitorDefaultValueCompute");
            return true;
          }
        }, Promise.resolve(true));
      }
    };
    return attributes;
  }
}
class PageTranslator extends AbstractTranslator {
  isTypeSupported($wt) {
    return $wt === SemanticHelper.PAGE;
  }
  doTranslate(node, parseOptions) {
    const $wt = SemanticHelper.PAGE;
    const classified = this.classifyAttributesAndSubWidgetsByList(node);
    const attributes = this.parseAndCombineAttributes({ $wt, items: classified.attributes });
    const def = {
      $wt,
      ...attributes,
      $nodes: [
        ...this.buildChildrenOnList({ widgets: classified.widgets }, parseOptions),
        ...this.buildChildrenOnSubHeadings({ widgets: node.children }, parseOptions)
      ].map((parsed) => parsed.node)
    };
    return { node: def, exportKey: node.headline, success: true };
  }
}
const _WidgetTranslator = class _WidgetTranslator extends AbstractTranslator {
  isTypeSupported(_$wt) {
    return true;
  }
  isForceWrappedByFormCell(attributes) {
    return attributes[_WidgetTranslator.FORCE_WRAPPED_INTO_FORM_CELL] === true;
  }
  tryToWrapByFormCell($wt, label) {
    if (label == null) {
      return { $wt };
    } else if (typeof label === "string") {
      return { $wt: `${$wt}${_WidgetTranslator.FORM_CELL_SUFFIX}`, label: label.trim() };
    } else {
      return { $wt: `${$wt}${_WidgetTranslator.FORM_CELL_SUFFIX}`, label };
    }
  }
  attemptToFormCell(options) {
    const { $wt, attributes, translator } = options;
    const { label } = attributes;
    if (this.isForceWrappedByFormCell(attributes)) {
      return this.tryToWrapByFormCell($wt, label ?? "");
    } else if (translator.shouldWrapByFormCell()) {
      return this.tryToWrapByFormCell($wt, label);
    } else if (label == null || typeof label === "string" && VUtils.isBlank(label)) {
      return { $wt };
    } else {
      return { $wt, [translator.transformLabelAttributeName()]: label };
    }
  }
  tryToTranslateAttributeToWidget(options, parseOptions) {
    const { $wt, classified, attributeName, given } = options;
    let transformed;
    const { attributes } = classified;
    const found = (attributes ?? []).filter(SemanticUtils.isAttributePairListItem).find((attr) => AttributeNameUtils.mapAttributeName($wt, attr.attributeName) === attributeName);
    if (found == null) {
      transformed = given;
    } else if (found.children == null || found.children.length === 0) {
      transformed = (found.attributeValue ?? "").trim() || given;
    } else {
      const def = found;
      classified.attributes = classified.attributes.filter((attr) => attr !== found);
      const { node, success } = this.translate({
        type: ParsedNodeType.LIST_ITEM,
        kind: ParsedListItemKind.WIDGET,
        $wt: (def.attributeValue ?? "").trim() || "Caption",
        children: def.children,
        $flag: WidgetFlag.STANDARD,
        preparsed: {
          type: ParsedNodeType.LIST_ITEM,
          content: { type: "listItem", children: (def.children ?? []).map((child) => child.preparsed.content) },
          children: (def.children ?? []).map((child) => child.preparsed)
        }
      }, parseOptions);
      if (success) {
        transformed = node;
      } else {
        N3Logger.error(`Given node type[${node.type}] for label is not supported.`, _WidgetTranslator.name);
        transformed = given;
      }
    }
    return transformed;
  }
  doTranslateNode(node, $pp, label, findChildren, parseOptions) {
    const { $wt } = node;
    const classified = this.classifyAttributesAndSubWidgetsByList(node);
    const translator = this.findSpecificTranslator($wt);
    let transformedLabel;
    if ((translator == null ? void 0 : translator.shouldTranslateLabelAttribute()) ?? true) {
      transformedLabel = this.tryToTranslateAttributeToWidget({
        $wt,
        classified,
        given: label,
        $ppOfParent: $pp,
        attributeName: "label"
      }, parseOptions);
    } else {
      transformedLabel = label;
    }
    const transformedWidgets = ((translator == null ? void 0 : translator.getToWidgetAttributeNames()) ?? []).reduce((map, name) => {
      map[name] = this.tryToTranslateAttributeToWidget({
        $wt,
        classified,
        $ppOfParent: $pp,
        attributeName: name
      }, parseOptions);
      return map;
    }, {});
    const attributes = this.parseAndCombineAttributes({
      $wt,
      items: classified.attributes,
      $pp
    });
    Object.keys(transformedWidgets).forEach((name) => attributes[name] = transformedWidgets[name]);
    let def;
    if (translator != null) {
      def = translator.redressProperties({ ...attributes, label: transformedLabel });
      def = translator.beautifyProperties({
        $pp,
        ...def,
        ...this.attemptToFormCell({ $wt, attributes: def, translator })
      });
    } else {
      def = { $pp, ...attributes, $wt };
    }
    const children = [
      ...this.buildChildrenOnList({ widgets: classified.widgets }, parseOptions),
      ...findChildren()
    ].map((parsed) => parsed.node);
    if (children != null && children.length !== 0) {
      def.$nodes = children;
    }
    def = translator == null ? void 0 : translator.postWork(def);
    return { node: def, success: true };
  }
  doTranslate(node, parseOptions) {
    if (node.type === ParsedNodeType.HEADING) {
      return this.doTranslateNode(node, node.$pp, node.headline, () => {
        return this.buildChildrenOnSubHeadings({ widgets: node.children }, parseOptions);
      }, parseOptions);
    } else if (node.type === ParsedNodeType.LIST_ITEM) {
      return this.doTranslateNode(node, node.$pp, node.label, () => [], parseOptions);
    } else {
      N3Logger.error(`Given node type[${node.type}] is not supported.`, _WidgetTranslator.name);
      return { node: { $wt: "" }, success: false };
    }
  }
};
__publicField(_WidgetTranslator, "FORM_CELL_SUFFIX", ".FC");
__publicField(_WidgetTranslator, "FORCE_WRAPPED_INTO_FORM_CELL", "$fc");
let WidgetTranslator = _WidgetTranslator;
class SpecificWidgetTranslator {
  constructor(repository) {
    __publicField(this, "repository");
    this.repository = repository;
    this.repository = repository;
  }
  redressProperties(def) {
    return def;
  }
  beautifyProperties(def) {
    return def;
  }
  shouldWrapByFormCell() {
    return true;
  }
  shouldTranslateLabelAttribute() {
    return true;
  }
  getToWidgetAttributeNames() {
    return [];
  }
  transformLabelAttributeName() {
    return "label";
  }
  beautifyColumnSpan(def, cols) {
    var _a;
    if (((_a = def.$pos) == null ? void 0 : _a.$cols) == null) {
      if (def.$pos == null) {
        def.$pos = { $cols: cols };
      } else {
        def.$pos.$cols = cols;
      }
    }
    return def;
  }
  getAttributeNamesMapping() {
    return void 0;
  }
  getAttributeValueBuilders() {
    return [];
  }
  getValidationHandlerDetectives() {
    return [ValidatorUtils.DETECT_VALIDATION];
  }
  getReactionHandlerDetectives() {
    return [
      ReactionUtils.DETECT_REACTION_REPAINT,
      ReactionUtils.DETECT_REACTION_CLEAR_ME,
      ReactionUtils.DETECT_REACTION_WATCH
    ];
  }
  getEnablementHandlerDetectives() {
    return [DisablementUtils.DETECT_DISABLED];
  }
  getVisibilityHandlerDetectives() {
    return [VisibilityUtils.DETECT_VISIBILITY];
  }
  postWork(def) {
    return def;
  }
}
const ArrayElementAddedBuild = createAsyncSnippetBuild("$array.elementAdded", ["options"]);
const ArrayCreateElementBuild = createAsyncSnippetBuild("$array.createElement", ["options"]);
const ArrayCouldAddElementBuild = createAsyncSnippetBuild("$array.couldAddElement", ["options"]);
const ArrayElementRemovedBuild = createAsyncSnippetBuild("$array.elementRemoved", ["options"]);
const ArrayCouldRemoveElementBuild = createAsyncSnippetBuild("$array.couldRemoveElement", ["options"]);
class SpecificArrayWidgetTranslator extends SpecificWidgetTranslator {
  buildDefaultAttributeNamesMapping(additional) {
    const keys = [
      "noElementReminder",
      "addable",
      "addLabel",
      "elementAdded",
      "createElement",
      "couldAddElement",
      "disableOnCannotAdd",
      "removable",
      "removeLabel",
      "elementRemoved",
      "couldRemoveElement",
      "getElementKey"
    ];
    return keys.reduce((mapping, key) => {
      mapping[`${this.getSupportedType()}.${key}`] = `$array.${key}`;
      return mapping;
    }, additional ?? {});
  }
  getAttributeValueBuilders() {
    return [
      ArrayElementAddedBuild,
      ArrayCreateElementBuild,
      ArrayCouldAddElementBuild,
      ArrayElementRemovedBuild,
      ArrayCouldRemoveElementBuild,
      ...super.getAttributeValueBuilders()
    ];
  }
}
class WidgetTranslatorRepository {
  constructor() {
    __publicField(this, "_validatorBuild");
    __publicField(this, "_reactorBuild");
    __publicField(this, "_disablementBuild");
    __publicField(this, "_visibilityBuild");
    __publicField(this, "translators");
    __publicField(this, "specificTranslators", {});
    this._validatorBuild = this.createValidatorBuild();
    this._reactorBuild = this.createReactorBuild();
    this._disablementBuild = this.createDisablementBuild();
    this._visibilityBuild = this.createVisibilityBuild();
    this.translators = this.createDefaultTranslators();
  }
  createValidatorBuild() {
    return new ValidatorBuild();
  }
  createReactorBuild() {
    return new ReactionBuild();
  }
  createDisablementBuild() {
    return new DisablementBuild();
  }
  createVisibilityBuild() {
    return new VisibilityBuild();
  }
  createDefaultTranslators() {
    return [new PageTranslator(this), new WidgetTranslator(this)];
  }
  get validatorBuild() {
    return this._validatorBuild;
  }
  get reactorBuild() {
    return this._reactorBuild;
  }
  get disablementBuild() {
    return this._disablementBuild;
  }
  get visibilityBuild() {
    return this._visibilityBuild;
  }
  askTranslator($wt) {
    return this.translators.find((translator) => translator.isTypeSupported($wt));
  }
  register(translator) {
    const existing = this.specificTranslators[translator.getSupportedType()];
    const $wt = translator.getSupportedType();
    this.specificTranslators[$wt] = translator;
    const namesMapping = translator.getAttributeNamesMapping();
    if (namesMapping != null) {
      AttributeNameUtils.register(namesMapping);
    }
    AttributeUtils.register($wt, translator.getAttributeValueBuilders());
    ValidatorUtils.register($wt, translator.getValidationHandlerDetectives());
    ReactionUtils.register($wt, translator.getReactionHandlerDetectives());
    DisablementUtils.register($wt, translator.getEnablementHandlerDetectives());
    VisibilityUtils.register($wt, translator.getVisibilityHandlerDetectives());
    return existing;
  }
  unregister(translator) {
    const $wt = translator.getSupportedType();
    const existing = this.specificTranslators[$wt];
    const namesMapping = translator.getAttributeNamesMapping();
    if (namesMapping != null) {
      AttributeNameUtils.unregister(Object.keys(namesMapping));
    }
    ReactionUtils.unregister($wt);
    ValidatorUtils.unregister($wt);
    AttributeUtils.unregister($wt);
    DisablementUtils.unregister($wt);
    VisibilityUtils.unregister($wt);
    delete this.specificTranslators[$wt];
    return existing;
  }
  askSpecificTranslator($wt) {
    return this.specificTranslators[$wt];
  }
}
const SINGLETON$2 = { repo: void 0 };
const createOrGetTranslatorRepositorySingleton = () => {
  if (SINGLETON$2.repo == null) {
    SINGLETON$2.repo = new WidgetTranslatorRepository();
  }
  return SINGLETON$2.repo;
};
class WidgetHelper {
  constructor(_repository) {
    __publicField(this, "_repository");
    this._repository = _repository;
    this._repository = _repository;
  }
  get repository() {
    return this._repository;
  }
  translate(heading, parseOptions) {
    const translator = this._repository.askTranslator(heading.$wt);
    if (translator == null) {
      N3Logger.error(`Translator of root node[type=${heading.$wt}] is not found. All content ignored.`, WidgetHelper.name);
      return { node: { $wt: "" }, success: false };
    }
    return translator.translate(heading, parseOptions);
  }
}
const SINGLETON$1 = { helper: void 0 };
const createOrGetTranslateHelperSingleton = () => {
  if (SINGLETON$1.helper == null) {
    SINGLETON$1.helper = new WidgetHelper(createOrGetTranslatorRepositorySingleton());
  }
  return SINGLETON$1.helper;
};
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AbstractMonitorBuild,
  AbstractPositionAttributeBuild,
  AbstractReactionAttributeBuild,
  AbstractTranslator,
  AnyAttributeBuild,
  ArrayCouldAddElementBuild,
  ArrayCouldRemoveElementBuild,
  ArrayCreateElementBuild,
  ArrayElementAddedBuild,
  ArrayElementRemovedBuild,
  AttributeNameUtils,
  get AttributeNames() {
    return AttributeNames;
  },
  AttributeUtils,
  get D9PropertyNames() {
    return D9PropertyNames;
  },
  DecorateItemsByStrBuild,
  DecorateLeadsBuild,
  DecorateTailsBuild,
  DecorateWrapperBuild,
  DisablementAttributeBuild,
  DisablementBuild,
  DisablementUtils,
  FALSE_VALUES,
  MobilePositionAttributeBuild,
  MonitorableAttributeBuild,
  PageTranslator,
  PositionAttributeBuild,
  ReactionBuild,
  ReactionClearMeAttributeBuild,
  ReactionRepaintAttributeBuild,
  ReactionUtils,
  ReactionWatchAttributeBuild,
  SpecificArrayWidgetTranslator,
  SpecificWidgetTranslator,
  TRUE_VALUES,
  ValidationAttributeBuild,
  ValidationScopesAttributeBuild,
  ValidatorBuild,
  ValidatorUtils,
  VisibilityAttributeBuild,
  VisibilityBuild,
  VisibilityUtils,
  WidgetHelper,
  WidgetTranslator,
  WidgetTranslatorRepository,
  createAsyncSnippetBuild,
  createDefaultMonitorHandlerDetective,
  createOrGetTranslateHelperSingleton,
  createOrGetTranslatorRepositorySingleton,
  createSnippetBuild,
  createSyncSnippetBuild,
  parseSnippet,
  tryBoolAndNumOnAttrValue,
  tryBoolOnAttrValue,
  tryNumOnAttrValue,
  wrapMonitorHandlerDetective
});
var N2WidgetType;
(function(N2WidgetType2) {
  N2WidgetType2["PAGE"] = "Page";
  N2WidgetType2["INPUT"] = "Input";
  N2WidgetType2["NUMBER"] = "Number";
  N2WidgetType2["PASSWORD"] = "Pwd";
  N2WidgetType2["DECORATE_INPUT"] = "DecoInput";
  N2WidgetType2["DECORATE_NUMBER"] = "DecoNumber";
  N2WidgetType2["DECORATE_PASSWORD"] = "DecoPwd";
  N2WidgetType2["TEXTAREA"] = "Textarea";
  N2WidgetType2["CHECKBOX"] = "Checkbox";
  N2WidgetType2["CHECKBOXES"] = "Checkboxes";
  N2WidgetType2["CHECKS"] = "Checks";
  N2WidgetType2["RADIO"] = "Radio";
  N2WidgetType2["RADIOS"] = "Radios";
  N2WidgetType2["BUTTON"] = "Button";
  N2WidgetType2["LINK"] = "Link";
  N2WidgetType2["BUTTON_BAR"] = "ButtonBar";
  N2WidgetType2["CAPTION"] = "Caption";
  N2WidgetType2["LABEL"] = "Label";
  N2WidgetType2["BADGE"] = "Badge";
  N2WidgetType2["DROPDOWN"] = "Dropdown";
  N2WidgetType2["MULTI_DROPDOWN"] = "MultiDropdown";
  N2WidgetType2["CALENDAR"] = "Calendar";
  N2WidgetType2["DATE"] = "Date";
  N2WidgetType2["DATETIME"] = "DateTime";
  N2WidgetType2["RIBS"] = "Ribs";
  N2WidgetType2["READONLY_RIBS"] = "RibsView";
  N2WidgetType2["TABLE_ROW_OPERATORS"] = "RowOperators";
  N2WidgetType2["TABLE"] = "Table";
  N2WidgetType2["SECTION"] = "Section";
  N2WidgetType2["BOX"] = "Box";
  N2WidgetType2["TAB"] = "Tab";
  N2WidgetType2["TABS"] = "Tabs";
  N2WidgetType2["WIZARD_SHARED"] = "WShared";
  N2WidgetType2["WIZARD_STEP"] = "WStep";
  N2WidgetType2["WIZARD"] = "Wizard";
  N2WidgetType2["TREE"] = "Tree";
  N2WidgetType2["PAGINATION"] = "Pagination";
})(N2WidgetType || (N2WidgetType = {}));
const StandardInputValidators = [
  ValidatorUtils.DETECT_LENGTH,
  ValidatorUtils.DETECT_NUMERIC,
  ValidatorUtils.DETECT_POSITIVE,
  ValidatorUtils.DETECT_NOT_NEGATIVE,
  ValidatorUtils.DETECT_INTEGER,
  ValidatorUtils.DETECT_NUMBER_RANGE,
  ValidatorUtils.DETECT_REGEX
];
const PasswordInputValidators = [
  ValidatorUtils.DETECT_LENGTH,
  ValidatorUtils.DETECT_REGEX
];
const DecorateInputRequiredDetective = wrapMonitorHandlerDetective(ValidatorUtils.DETECT_REQUIRED, (attributes) => attributes["data-di-required"] = true);
const InputMaskBuild = createSyncSnippetBuild("mask", [], true);
class N2InputTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.INPUT;
  }
  getAttributeValueBuilders() {
    return [InputMaskBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...StandardInputValidators,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2NumberTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.NUMBER;
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...StandardInputValidators,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2PasswordTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.PASSWORD;
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...PasswordInputValidators,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2DecorateInputTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.DECORATE_INPUT;
  }
  getAttributeValueBuilders() {
    return [InputMaskBuild, DecorateLeadsBuild, DecorateTailsBuild];
  }
  getValidationHandlerDetectives() {
    return [
      DecorateInputRequiredDetective,
      ...StandardInputValidators,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2DecorateNumberTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.DECORATE_NUMBER;
  }
  getAttributeValueBuilders() {
    return [DecorateLeadsBuild, DecorateTailsBuild];
  }
  getValidationHandlerDetectives() {
    return [
      DecorateInputRequiredDetective,
      ...StandardInputValidators,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2DecoratePasswordTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.DECORATE_PASSWORD;
  }
  getAttributeValueBuilders() {
    return [DecorateLeadsBuild, DecorateTailsBuild];
  }
  getValidationHandlerDetectives() {
    return [
      DecorateInputRequiredDetective,
      ...PasswordInputValidators,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2TextareaTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.TEXTAREA;
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ValidatorUtils.DETECT_LENGTH,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
const N2CheckboxValuesBuild = {
  accept: (key) => key === "values",
  build: (value, _list) => {
    if (VUtils.isBlank(value)) {
      return void 0;
    }
    const values = value.split(",").map((v) => v.trim()).filter((_, index2) => index2 <= 1).map((v) => VUtils.isBlank(v) ? null : v);
    if (values.length === 0) {
      return void 0;
    } else if (values.length === 1) {
      return [tryBoolOnAttrValue(values[0]), null];
    } else {
      return [tryBoolOnAttrValue(values[0]), tryBoolOnAttrValue(values[1])];
    }
  }
};
class N2CheckboxTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.CHECKBOX;
  }
  getAttributeValueBuilders() {
    return [N2CheckboxValuesBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
const N2DropdownOptionsByStrBuild = (value) => {
  return value.split(";").map((option) => option.trim()).filter((option) => VUtils.isNotBlank(option)).map((option) => option.split(":")).map(([value2, label]) => [value2.trim(), (label ?? "").trim()]).filter(([value2, label]) => VUtils.isNotBlank(value2) && VUtils.isNotBlank(label)).map(([value2, label]) => ({ value: value2, label }));
};
const N2DropdownOptionsBuild = {
  accept: (key) => key === "options",
  build: (value, list) => {
    if (VUtils.isNotBlank(value)) {
      return N2DropdownOptionsByStrBuild(value);
    }
    if ((list.children ?? []).length == 0) {
      return [];
    }
    if (list.children[0].type === ParsedNodeType.LIST) {
      return (list.children[0].children ?? []).filter(SemanticUtils.isAttributePairListItem).map(({ attributeName, attributeValue }) => ({ value: attributeName, label: attributeValue }));
    } else {
      return [];
    }
  }
};
const N2DropdownSortBuild = {
  accept: (key) => key === "optionSort",
  build: (value) => {
    if (VUtils.isBlank(value)) {
      return void 0;
    }
    value = value.trim().toLowerCase();
    if (value == "asc") {
      return OptionItemSort.ASC;
    } else if (value == "desc") {
      return OptionItemSort.DESC;
    } else {
      return void 0;
    }
  }
};
class N2DropdownReactionRefreshOptionsAttributeBuild extends AbstractReactionAttributeBuild {
  getReactionType() {
    return "refreshOptions";
  }
  getReturnReaction() {
    return REACTION_REFRESH_OPTIONS;
  }
}
const N2DropdownReactionRefreshOptionsBuild = new N2DropdownReactionRefreshOptionsAttributeBuild();
const N2DropdownReactionRefreshOptionsHandlerDetective = createDefaultMonitorHandlerDetective({
  attributeName: "refreshOptions",
  redressResult: (ret) => ret == null || VUtils.isBlank(ret) ? REACTION_REFRESH_OPTIONS : ret,
  ignoreDefault: true,
  deleteAttribute: true
});
class N2DropdownTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.DROPDOWN;
  }
  getAttributeNamesMapping() {
    return { "Dropdown.sort": "optionSort" };
  }
  getAttributeValueBuilders() {
    return [N2DropdownOptionsBuild, N2DropdownSortBuild, N2DropdownReactionRefreshOptionsBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
  getReactionHandlerDetectives() {
    return [
      ...super.getReactionHandlerDetectives(),
      N2DropdownReactionRefreshOptionsHandlerDetective
    ];
  }
}
class N2CheckboxesTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.CHECKBOXES;
  }
  getAttributeNamesMapping() {
    return { "Checkboxes.sort": "optionSort" };
  }
  getAttributeValueBuilders() {
    return [N2DropdownOptionsBuild, N2DropdownSortBuild, N2DropdownReactionRefreshOptionsBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2ChecksTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.CHECKS;
  }
  getAttributeNamesMapping() {
    return { "Checks.sort": "optionSort" };
  }
  getAttributeValueBuilders() {
    return [N2DropdownOptionsBuild, N2DropdownSortBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
  getReactionHandlerDetectives() {
    return [
      ...super.getReactionHandlerDetectives(),
      N2DropdownReactionRefreshOptionsHandlerDetective
    ];
  }
}
const N2RadioValuesBuild = {
  accept: (key) => key === "values",
  build: (value, _list) => {
    if (VUtils.isBlank(value)) {
      return void 0;
    }
    const values = value.split(",").map((v) => v.trim()).filter((_, index2) => index2 <= 1).map((v) => VUtils.isBlank(v) ? null : v);
    if (values.length === 0) {
      return void 0;
    } else if (values.length === 1) {
      return [tryBoolOnAttrValue(values[0]), null];
    } else {
      return [tryBoolOnAttrValue(values[0]), tryBoolOnAttrValue(values[1])];
    }
  }
};
class N2RadioTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.RADIO;
  }
  getAttributeValueBuilders() {
    return [N2RadioValuesBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2RadiosTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.RADIOS;
  }
  getAttributeNamesMapping() {
    return { "Radios.sort": "optionSort" };
  }
  getAttributeValueBuilders() {
    return [N2DropdownOptionsBuild, N2DropdownSortBuild, N2DropdownReactionRefreshOptionsBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
  getReactionHandlerDetectives() {
    return [
      ...super.getReactionHandlerDetectives(),
      N2DropdownReactionRefreshOptionsHandlerDetective
    ];
  }
}
class N2MultiDropdownTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.MULTI_DROPDOWN;
  }
  getAttributeNamesMapping() {
    return { "MultiDropdown.sort": "optionSort" };
  }
  getAttributeValueBuilders() {
    return [N2DropdownOptionsBuild, N2DropdownSortBuild, N2DropdownReactionRefreshOptionsBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
  getReactionHandlerDetectives() {
    return [
      ...super.getReactionHandlerDetectives(),
      N2DropdownReactionRefreshOptionsHandlerDetective
    ];
  }
}
const N2CalendarBuildFixedTimeAt = (value) => {
  if (VUtils.isBlank(value)) {
    return void 0;
  }
  value = value.trim().toLowerCase();
  if (value === "start" || value === "0") {
    return { hour: 0, minute: 0, second: 0, millisecond: 0 };
  } else if (value === "end") {
    return { hour: 23, minute: 59, second: 59, millisecond: 999 };
  }
  const parts = value.split(".").map((part) => part.split(":")).flat();
  if (parts.length !== 3 && parts.length !== 4) {
    return void 0;
  }
  const numbers = parts.map((part) => VUtils.isNotNegative(part));
  if (numbers.some((number) => !number.test)) {
    return void 0;
  }
  const [h, m, s, ms] = numbers.map((number) => number.value);
  if (ms == null) {
    if (h > 23 || m > 59 || s > 59) {
      return void 0;
    } else if (h === 23 && m === 59 && s === 59) {
      return { hour: 23, minute: 59, second: 59, millisecond: 999 };
    } else {
      return { hour: h, minute: m, second: s, millisecond: 0 };
    }
  } else if (ms > 999) {
    return void 0;
  } else {
    return { hour: h, minute: m, second: s, millisecond: ms };
  }
};
const N2CalendarFixedTimeAtBuild = {
  accept: (key) => key === "fixedTimeAt",
  build: N2CalendarBuildFixedTimeAt
};
const N2CalendarInitTimeAtBuild = {
  accept: (key) => key === "initTimeAt",
  build: N2CalendarBuildFixedTimeAt
};
class N2DateTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.DATE;
  }
  getAttributeValueBuilders() {
    return [N2CalendarFixedTimeAtBuild, N2CalendarInitTimeAtBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2DateTimeTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.DATETIME;
  }
  getAttributeValueBuilders() {
    return [N2CalendarFixedTimeAtBuild, N2CalendarInitTimeAtBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
class N2CalendarTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.CALENDAR;
  }
  getAttributeValueBuilders() {
    return [N2CalendarFixedTimeAtBuild, N2CalendarInitTimeAtBuild];
  }
  getValidationHandlerDetectives() {
    return [
      ValidatorUtils.DETECT_REQUIRED,
      ...super.getValidationHandlerDetectives()
    ];
  }
}
const decoratedByPrefix = (declaration, prefix) => {
  if (VUtils.isBlank(declaration)) {
    return { test: false, origin: declaration };
  }
  const lowerCaseDeclaration = declaration.trim().toLowerCase();
  if (lowerCaseDeclaration.startsWith(`${prefix}:`) || lowerCaseDeclaration.startsWith(`${prefix} `)) {
    return { test: true, origin: declaration, clipped: declaration.substring(prefix.length + 1).trim() };
  } else {
    return { test: false, origin: declaration };
  }
};
const buildShowAlert = (declaration) => {
  const { test, clipped } = decoratedByPrefix(declaration, GlobalEventPrefix.ALERT);
  if (test) {
    return async (options) => {
      const { global: { alert: { show } } } = options;
      return await show((clipped ?? "").trim());
    };
  } else {
    return void 0;
  }
};
const buildShowDialog = (declaration) => {
  const { test, origin, clipped } = decoratedByPrefix(declaration, GlobalEventPrefix.DIALOG);
  if (test) {
    return async (options) => {
      const { global: { custom }, root, model } = options;
      return await custom(origin, GlobalEventPrefix.DIALOG, clipped, { root, model });
    };
  } else {
    return void 0;
  }
};
const buildSwitchWizardStep = (declaration) => {
  const { test, origin, clipped } = decoratedByPrefix(declaration, GlobalEventPrefix.WIZARD_STEP);
  if (test) {
    return async (options) => {
      const { global: { custom }, root, model } = options;
      return await custom(origin, GlobalEventPrefix.WIZARD_STEP, clipped, { root, model });
    };
  } else {
    return void 0;
  }
};
const buildCustomEvent = (declaration) => {
  const { test, origin, clipped } = decoratedByPrefix(declaration, GlobalEventPrefix.CUSTOM);
  if (test) {
    return async (options) => {
      const { global: { custom }, root, model } = options;
      return await custom(origin, GlobalEventPrefix.CUSTOM, clipped, { root, model });
    };
  } else {
    return void 0;
  }
};
const buildClickHandler = (declaration) => {
  const builds = [
    buildShowAlert,
    buildShowDialog,
    buildSwitchWizardStep,
    buildCustomEvent
  ];
  for (const build of builds) {
    const handler = build(declaration);
    if (handler != null) {
      return handler;
    }
  }
  return void 0;
};
const N2ButtonValidateMinimum = async (options) => {
  const { validators: { $mine } } = options;
  await $mine();
};
const N2ButtonValidateBlock = async (options) => {
  const { validators: { $arrayElement, $closestContainer, $all } } = options;
  if (!$arrayElement != null) {
    await $arrayElement();
  } else if ($closestContainer != null) {
    await $closestContainer();
  } else {
    await $all();
  }
};
const N2ButtonValidateAll = async (options) => {
  const { validators: { $all } } = options;
  await $all();
};
const N2ButtonCreateScopesValidate = (scopes) => {
  return async (options) => {
    const { validators: { $given } } = options;
    await $given(scopes);
  };
};
const N2ButtonClickBuild = {
  accept: (key) => key === "click",
  build: (value, list) => {
    if (VUtils.isNotBlank(value)) {
      const originalValue = value;
      value = value.trim().toLowerCase();
      if (value === "validate") {
        return N2ButtonValidateMinimum;
      } else if (value.startsWith("validate ") || value.startsWith("validate:")) {
        value = value.substring("validate ".length).trim();
        if (value === "me") {
          return N2ButtonValidateMinimum;
        } else if (value === "block") {
          return N2ButtonValidateBlock;
        } else if (value === "all") {
          return N2ButtonValidateAll;
        } else {
          const scopes = value.split(/[,;\s]/).map((scope) => scope.trim()).filter((scope) => VUtils.isNotBlank(scope));
          if (scopes.length !== 0) {
            return N2ButtonCreateScopesValidate(scopes);
          }
        }
      }
      return buildClickHandler(originalValue);
    } else {
      return createAsyncSnippetBuild("click", ["options", "event"]).build(value, list);
    }
  }
};
class N2ButtonTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.BUTTON;
  }
  getAttributeValueBuilders() {
    return [N2ButtonClickBuild, DecorateLeadsBuild, DecorateTailsBuild];
  }
}
class N2LinkTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.LINK;
  }
  getAttributeValueBuilders() {
    return [N2ButtonClickBuild, DecorateLeadsBuild, DecorateTailsBuild];
  }
}
class N2ButtonBarTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.BUTTON_BAR;
  }
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
}
const N2CaptionValueToLabelBuild = {
  accept: (key) => key === "valueToLabel",
  build: (value) => {
    if (VUtils.isBlank(value)) {
      return void 0;
    }
    try {
      const func = new Function("value", "formats", `try {
				const $ = formats;
				return ${value}
			} catch (e) {
				console.error(e);
				return value == null ? '' : value;
			}`);
      return { labelOnValue: true, valueToLabel: func };
    } catch (e) {
      N3Logger.error(e, "N2CaptionValueToLabelBuild");
      return void 0;
    }
  }
};
const N2CaptionClickBuild = {
  accept: (key) => key === "click",
  build: (value, list) => {
    if (VUtils.isNotBlank(value)) {
      return buildClickHandler(value);
    } else {
      return createAsyncSnippetBuild("click", ["options", "event"]).build(value, list);
    }
  }
};
const N2CaptionReactionDetective = (options) => {
  const { $pp, attributes } = options;
  if (attributes.labelOnValue !== true) {
    return void 0;
  }
  const watches = [$pp].filter((path) => VUtils.isNotBlank(path));
  return { $watch: watches, $handle: NUtils.reactWithRepaint };
};
const N2CaptionRedressLabelAndText = (def) => {
  const defs = def;
  if (defs.labelOnValue === true || defs[WidgetTranslator.FORCE_WRAPPED_INTO_FORM_CELL] === true) {
    return defs;
  }
  if (defs.text != null || VUtils.isPrimitive(defs.text) && VUtils.isNotBlank(defs.text)) {
    return defs;
  }
  defs.text = defs.label;
  delete defs.label;
  return defs;
};
class N2CaptionTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.CAPTION;
  }
  shouldTranslateLabelAttribute() {
    return true;
  }
  getToWidgetAttributeNames() {
    return [...super.getToWidgetAttributeNames(), "text"];
  }
  redressProperties(def) {
    return super.redressProperties(N2CaptionRedressLabelAndText(def));
  }
  getAttributeValueBuilders() {
    return [N2CaptionValueToLabelBuild, N2CaptionClickBuild, DecorateLeadsBuild, DecorateTailsBuild];
  }
  getReactionHandlerDetectives() {
    return [
      N2CaptionReactionDetective,
      ...super.getReactionHandlerDetectives()
    ];
  }
}
class N2LabelTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.LABEL;
  }
  getToWidgetAttributeNames() {
    return [...super.getToWidgetAttributeNames(), "text"];
  }
  redressProperties(def) {
    return super.redressProperties(N2CaptionRedressLabelAndText({ ...def, labelOnValue: true }));
  }
  getAttributeValueBuilders() {
    return [N2CaptionValueToLabelBuild, N2CaptionClickBuild, DecorateLeadsBuild, DecorateTailsBuild];
  }
  getReactionHandlerDetectives() {
    return [
      N2CaptionReactionDetective,
      ...super.getReactionHandlerDetectives()
    ];
  }
}
class N2BadgeTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.BADGE;
  }
  getToWidgetAttributeNames() {
    return [...super.getToWidgetAttributeNames(), "text"];
  }
  redressProperties(def) {
    return super.redressProperties(N2CaptionRedressLabelAndText(def));
  }
  getAttributeValueBuilders() {
    return [N2CaptionValueToLabelBuild, N2CaptionClickBuild, DecorateLeadsBuild, DecorateTailsBuild];
  }
  getReactionHandlerDetectives() {
    return [
      N2CaptionReactionDetective,
      ...super.getReactionHandlerDetectives()
    ];
  }
}
class AbstractRibsTranslator extends SpecificArrayWidgetTranslator {
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  getToWidgetAttributeNames() {
    return [...super.getToWidgetAttributeNames(), "caption"];
  }
  getAttributeNamesMapping() {
    return this.buildDefaultAttributeNamesMapping({ [`${this.getSupportedType()}.elementTitle`]: "caption" });
  }
}
class N2RibsTranslator extends AbstractRibsTranslator {
  getSupportedType() {
    return N2WidgetType.RIBS;
  }
}
class N2RibsViewTranslator extends AbstractRibsTranslator {
  getSupportedType() {
    return N2WidgetType.READONLY_RIBS;
  }
}
const N2TableHeadersBuild = {
  accept: (key) => key === "headers",
  build: (_value, list) => {
    if (list.children == null || list.children.length === 0 || list.children[0].type !== ParsedNodeType.LIST) {
      return void 0;
    }
    const headers = (list.children[0].children ?? []).filter(SemanticUtils.isAttributePairListItem).map((pair, index2) => {
      const { attributeName, attributeValue } = pair;
      if (VUtils.isBlank(attributeName)) {
        return null;
      } else if (attributeName.toLowerCase() === "column" || VUtils.isBlank(attributeValue)) {
        if (pair.children == null || pair.children.length === 0 || pair.children[0].type !== ParsedNodeType.LIST) {
          return null;
        }
        const parsed = (pair.children[0].children ?? []).filter(SemanticUtils.isAttributePairListItem).reduce((attrs, { attributeName: attributeName2, attributeValue: attributeValue2 }) => {
          const name = attributeName2.toLowerCase().trim();
          if (name === "label") {
            attrs.label = attributeValue2.trim();
          } else if (name === "width") {
            const value = attributeValue2.trim();
            const positive = VUtils.isPositive(value);
            if (positive.test) {
              attrs.width = positive.value;
            } else {
              attrs.width = value;
            }
          }
          return attrs;
        }, {});
        if (VUtils.isNotBlank(parsed.label) && VUtils.isNotBlank(parsed.width)) {
          return { ...parsed, index: index2 };
        } else {
          return null;
        }
      } else {
        const value = attributeValue.trim();
        const positive = VUtils.isPositive(value);
        if (positive.test) {
          return { label: attributeName.trim(), width: positive.value, index: index2 };
        } else {
          return { label: attributeName.trim(), width: value, index: index2 };
        }
      }
    }).filter((x) => x != null).map((x, index2) => ({ ...x, index: index2 }));
    return headers.length === 0 ? void 0 : headers;
  }
};
class N2TableRowOperatorsTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.TABLE_ROW_OPERATORS;
  }
  shouldWrapByFormCell() {
    return false;
  }
}
class N2TableTranslator extends SpecificArrayWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.TABLE;
  }
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeNamesMapping() {
    return this.buildDefaultAttributeNamesMapping();
  }
  getAttributeValueBuilders() {
    return [
      ...super.getAttributeValueBuilders(),
      N2TableHeadersBuild
    ];
  }
  postWork(def) {
    var _a;
    const defs = def;
    const { $nodes } = defs;
    defs.rowOperators = (_a = ($nodes ?? []).find((node) => node.$wt === N2WidgetType.TABLE_ROW_OPERATORS)) == null ? void 0 : _a.$nodes;
    defs.pageable = ($nodes ?? []).find((node) => node.$wt === N2WidgetType.PAGINATION);
    defs.$nodes = ($nodes ?? []).filter((node) => {
      return node.$wt !== N2WidgetType.TABLE_ROW_OPERATORS && node.$wt !== N2WidgetType.PAGINATION;
    });
    return defs;
  }
}
class N2SectionTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.SECTION;
  }
  transformLabelAttributeName() {
    return "title";
  }
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  getToWidgetAttributeNames() {
    return [...super.getToWidgetAttributeNames(), "title"];
  }
}
class N2BoxTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.BOX;
  }
}
class N2TabTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.TAB;
  }
  transformLabelAttributeName() {
    return "title";
  }
  shouldWrapByFormCell() {
    return false;
  }
  getToWidgetAttributeNames() {
    return [...super.getToWidgetAttributeNames(), "title", "badge"];
  }
  postWork(def) {
    const defs = def;
    const tabDef = defs;
    if (tabDef.body == null || !(tabDef.body instanceof ExternalDefIndicator)) {
      tabDef.body = {
        $wt: N2WidgetType.SECTION,
        $nodes: defs.$nodes
      };
      delete defs.$nodes;
    }
    return defs;
  }
}
class N2TabsTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.TABS;
  }
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  postWork(def) {
    const defs = def;
    defs.contents = defs.$nodes;
    delete defs.$nodes;
    return defs;
  }
}
class N2WizardSharedTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.WIZARD_SHARED;
  }
  shouldWrapByFormCell() {
    return false;
  }
  postWork(def) {
    const defs = def;
    const shareDef = defs;
    if (shareDef.body == null || !(shareDef.body instanceof ExternalDefIndicator)) {
      shareDef.body = {
        $wt: N2WidgetType.SECTION,
        $pos: { $cols: 3 },
        $nodes: defs.$nodes
      };
      delete defs.$nodes;
    }
    return defs;
  }
}
class N2WizardStepTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.WIZARD_STEP;
  }
  transformLabelAttributeName() {
    return "title";
  }
  shouldWrapByFormCell() {
    return false;
  }
  getToWidgetAttributeNames() {
    return [...super.getToWidgetAttributeNames(), "title"];
  }
  postWork(def) {
    const defs = def;
    const stepDef = defs;
    if (stepDef.body == null || !(stepDef.body instanceof ExternalDefIndicator)) {
      stepDef.body = {
        $wt: N2WidgetType.SECTION,
        $pos: { $cols: 12 },
        $nodes: defs.$nodes
      };
      delete defs.$nodes;
    }
    return defs;
  }
}
class N2WizardTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.WIZARD;
  }
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  postWork(def) {
    const defs = def;
    const { $nodes } = defs;
    defs.shared = ($nodes ?? []).find((node) => node.$wt === N2WidgetType.WIZARD_SHARED);
    defs.contents = ($nodes ?? []).filter((node) => node.$wt === N2WidgetType.WIZARD_STEP);
    delete defs.$nodes;
    return defs;
  }
}
const N2TreeChildNodesBuild = createSyncSnippetBuild("detective", ["parentNode", "options"]);
class N2TreeTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.TREE;
  }
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeValueBuilders() {
    return [N2TreeChildNodesBuild];
  }
}
const N2PaginationPossibleSizesBuild = {
  accept: (key) => key === "possibleSizes",
  build: (value, _list) => {
    if (VUtils.isNotBlank(value)) {
      return value.split(";").map((item) => item.trim()).filter((item) => VUtils.isNotBlank(item)).map((item) => {
        const check = VUtils.isNumber(item);
        if (check.test) {
          return check.value;
        } else {
          return null;
        }
      }).filter((item) => item !== null).filter((item) => item > 0);
    }
    return void 0;
  }
};
class N2PaginationTranslator extends SpecificWidgetTranslator {
  getSupportedType() {
    return N2WidgetType.PAGINATION;
  }
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeNamesMapping() {
    return { "Pagination.sizes": "possibleSizes" };
  }
  getAttributeValueBuilders() {
    return [N2PaginationPossibleSizesBuild];
  }
}
const registerN2Widgets$1 = (widgetHelper) => {
  const { repository: repo } = widgetHelper ?? createOrGetTranslateHelperSingleton();
  repo.register(new N2InputTranslator(repo));
  repo.register(new N2NumberTranslator(repo));
  repo.register(new N2PasswordTranslator(repo));
  repo.register(new N2DecorateInputTranslator(repo));
  repo.register(new N2DecorateNumberTranslator(repo));
  repo.register(new N2DecoratePasswordTranslator(repo));
  repo.register(new N2TextareaTranslator(repo));
  repo.register(new N2CheckboxTranslator(repo));
  repo.register(new N2CheckboxesTranslator(repo));
  repo.register(new N2ChecksTranslator(repo));
  repo.register(new N2RadioTranslator(repo));
  repo.register(new N2RadiosTranslator(repo));
  repo.register(new N2DropdownTranslator(repo));
  repo.register(new N2MultiDropdownTranslator(repo));
  repo.register(new N2DateTranslator(repo));
  repo.register(new N2DateTimeTranslator(repo));
  repo.register(new N2CalendarTranslator(repo));
  repo.register(new N2ButtonTranslator(repo));
  repo.register(new N2LinkTranslator(repo));
  repo.register(new N2ButtonBarTranslator(repo));
  repo.register(new N2CaptionTranslator(repo));
  repo.register(new N2LabelTranslator(repo));
  repo.register(new N2BadgeTranslator(repo));
  repo.register(new N2RibsTranslator(repo));
  repo.register(new N2RibsViewTranslator(repo));
  repo.register(new N2TableRowOperatorsTranslator(repo));
  repo.register(new N2TableTranslator(repo));
  repo.register(new N2SectionTranslator(repo));
  repo.register(new N2BoxTranslator(repo));
  repo.register(new N2TabTranslator(repo));
  repo.register(new N2TabsTranslator(repo));
  repo.register(new N2WizardSharedTranslator(repo));
  repo.register(new N2WizardStepTranslator(repo));
  repo.register(new N2WizardTranslator(repo));
  repo.register(new N2TreeTranslator(repo));
  repo.register(new N2PaginationTranslator(repo));
};
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  InputMaskBuild,
  N2BadgeTranslator,
  N2BoxTranslator,
  N2ButtonBarTranslator,
  N2ButtonClickBuild,
  N2ButtonCreateScopesValidate,
  N2ButtonTranslator,
  N2ButtonValidateAll,
  N2ButtonValidateBlock,
  N2ButtonValidateMinimum,
  N2CalendarBuildFixedTimeAt,
  N2CalendarFixedTimeAtBuild,
  N2CalendarInitTimeAtBuild,
  N2CalendarTranslator,
  N2CaptionClickBuild,
  N2CaptionReactionDetective,
  N2CaptionRedressLabelAndText,
  N2CaptionTranslator,
  N2CaptionValueToLabelBuild,
  N2CheckboxTranslator,
  N2CheckboxValuesBuild,
  N2CheckboxesTranslator,
  N2ChecksTranslator,
  N2DateTimeTranslator,
  N2DateTranslator,
  N2DecorateInputTranslator,
  N2DecorateNumberTranslator,
  N2DecoratePasswordTranslator,
  N2DropdownOptionsBuild,
  N2DropdownOptionsByStrBuild,
  N2DropdownReactionRefreshOptionsAttributeBuild,
  N2DropdownReactionRefreshOptionsBuild,
  N2DropdownReactionRefreshOptionsHandlerDetective,
  N2DropdownSortBuild,
  N2DropdownTranslator,
  N2InputTranslator,
  N2LabelTranslator,
  N2LinkTranslator,
  N2MultiDropdownTranslator,
  N2NumberTranslator,
  N2PaginationPossibleSizesBuild,
  N2PaginationTranslator,
  N2PasswordTranslator,
  N2RadioTranslator,
  N2RadioValuesBuild,
  N2RadiosTranslator,
  N2RibsTranslator,
  N2RibsViewTranslator,
  N2SectionTranslator,
  N2TabTranslator,
  N2TableHeadersBuild,
  N2TableRowOperatorsTranslator,
  N2TableTranslator,
  N2TabsTranslator,
  N2TextareaTranslator,
  N2TreeChildNodesBuild,
  N2TreeTranslator,
  get N2WidgetType() {
    return N2WidgetType;
  },
  N2WizardSharedTranslator,
  N2WizardStepTranslator,
  N2WizardTranslator,
  registerN2Widgets: registerN2Widgets$1
});
class DocParser {
  constructor(_ast, _semantic, _widget) {
    __publicField(this, "_ast");
    __publicField(this, "_semantic");
    __publicField(this, "_widget");
    this._ast = _ast;
    this._semantic = _semantic;
    this._widget = _widget;
    this._ast = _ast;
    this._semantic = _semantic;
    this._widget = _widget;
  }
  get ast() {
    return this._ast;
  }
  get semantic() {
    return this._semantic;
  }
  get widget() {
    return this._widget;
  }
  parseDoc(def, options) {
    if (VUtils.isBlank(def)) {
      N3Logger.error("No content determined in given markdown content.", DocParser.name);
      return {
        node: { $wt: "Page" },
        success: false,
        error: "No content determined in given markdown content."
      };
    }
    const { headings: preparsedHeadings } = this._ast.askAsTree(def);
    if (preparsedHeadings.length === 0) {
      N3Logger.error("No available content determined, at least one heading in content. All content ignored.", DocParser.name);
      return {
        node: { $wt: "Page" },
        success: false,
        error: "No available content determined, at least one heading in content. All content ignored."
      };
    }
    const headings = preparsedHeadings.map((heading) => this._semantic.parsePreparsed(heading));
    const { exported, independent } = this._semantic.classifyParsedHeadings(headings);
    if (exported.length === 0) {
      N3Logger.error("Heading not found, must follow format[Type[[::Headline]::Id]]. All content ignored.", DocParser.name);
      return {
        node: { $wt: "Page" },
        success: false,
        error: "Heading not found, must follow format[Type[[::Headline]::Id]]. All content ignored."
      };
    } else if (exported.length > 1) {
      N3Logger.error("Multiple roots does not support yet. All content ignored.", DocParser.name);
      return {
        node: { $wt: "Page" },
        success: false,
        error: "Multiple roots does not support yet. All content ignored."
      };
    }
    try {
      const root = exported[0];
      const parsedRoot = this.widget.translate(root, options);
      return parsedRoot;
    } catch (error) {
      N3Logger.error(error, DocParser.name);
      return { node: { $wt: "Page" }, success: false, error };
    }
  }
}
const SINGLETON = { parser: void 0 };
const parseDoc = new Proxy(() => void 0, {
  apply(target, _thisArg, argArray) {
    if (SINGLETON.parser == null) {
      SINGLETON.parser = new DocParser(createOrGetAskHelperSingleton(), createOrGetSemanticHelperSingleton(), createOrGetTranslateHelperSingleton());
    }
    return SINGLETON.parser.parseDoc(argArray[0] ?? "", argArray[1]);
  }
});
const registerN2Widgets = registerN2Widgets$1;
export {
  index$2 as a,
  index as b,
  index$1 as i,
  parseDoc as p,
  registerN2Widgets as r
};
