var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { R as React, r as reactExports, j as jsxRuntimeExports, c as client } from "./react-lVPkXQtG.js";
import { r as registerCharts } from "./rainbow-d9-echarts-ub4ZLqs_.js";
import { V as VUtils, r as registerWidget, f as useCreateEventBus, M as MUtils, P as PPUtils, u as useThrottler, S as StandaloneRoot, m as ExternalDefMismatchIndicator, n as N1Logger, B as BridgeEventBusProvider, o as useBridgeEventBus, p as BridgeToRootEventTypes, h as MBUtils, D as DeviceDetective } from "./rainbow-d9-n1-O85VQ--g.js";
import { i as index$2$1, D as DOM_KEY_WIDGET, C as CssVars, d as utils$1, b as useGlobalHandlers, U as UnwrappedButton, B as ButtonInk, e as ButtonFill, n as utils$2, m as GlobalRoot, $ as $d9n2, u as useGlobalEventBus, o as UnwrappedButtonBar, p as ButtonBarAlignment, G as GlobalEventTypes, q as UnwrappedSection } from "./rainbow-d9-n2-mgysu2Eb.js";
import { a as index$2, b as index, i as index$1, p as parseDoc, r as registerN2Widgets } from "./rainbow-d9-n3-qhI7dE1K.js";
import { T as Tag, j as tags, k as ViewPlugin, l as syntaxTree, H as HighlightStyle, o as defaultHighlightStyle, q as syntaxHighlighting, D as Decoration, W as WidgetType, r as EditorView, v as EditorState, x as basicSetup, y as keymap, z as indentWithTab, A as markdown$c, B as markdownLanguage, n as nanoid } from "./vendor-imQJQEqk.js";
import { q as qe, $ as $e } from "./styled-components-ziGokluW.js";
import { r as registerPlanSelect, u as useDemoMarkdown, C as CustomEventHandler, N as N2DemoDialogHandler, T as ThaiPlanSelection, a as ThaiPlanSelectionData, b as ThaiPlanSelectionMarkdown, P as PlanSelectionCssVars } from "./rainbow-d9-thai-plan-selection-gJ1RGbfn.js";
import { d as dayjs, W as WeekOfYear, Q as QuarterOfYear, D as Duration, I as IsToday, R as RelativeTime, A as ArraySupport, O as ObjectSupport, C as CustomParseFormat, U as UTC, B as BuddhistEra } from "./dayjs-9Z7dW0Q-.js";
import { u as use, a as install, b as install$1, c as install$2, d as install$3, e as install$4, f as install$5, h as installLabelLayout, j as installUniversalTransition, k as install$6, l as install$7 } from "./echarts-v5L9gyiQ.js";
import { b as remarkGfm } from "./remark-VVMnve84.js";
import { R as ReactMarkdown } from "./react-markdown-PdZzfUwi.js";
import { S as SyntaxHighlighter, m as materialDark, _ as __vitePreload } from "./react-syntax-highlighter-rkzDPnrG.js";
import "./babel-AnpZxJH-.js";
import "./mdast-bIX7UtAU.js";
import "./micromark-9C3b9oUH.js";
import "./unist-5yxlKLF4.js";
import "./emotion--D3psyId.js";
import "./zrender-DEzoFf2M.js";
import "./property-information-S5BACSac.js";
import "./refractor-lsMujGm5.js";
import "./hastscript-ZAcbJKYu.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var PlaygroundWidgetGroupKey;
(function(PlaygroundWidgetGroupKey2) {
  PlaygroundWidgetGroupKey2["CONTAINERS"] = "container-group";
  PlaygroundWidgetGroupKey2["INPUTS"] = "input-group";
  PlaygroundWidgetGroupKey2["OPTIONS"] = "options-group";
  PlaygroundWidgetGroupKey2["DISPLAY"] = "display-group";
  PlaygroundWidgetGroupKey2["NOT_CARE"] = "not-care";
})(PlaygroundWidgetGroupKey || (PlaygroundWidgetGroupKey = {}));
const WidgetDeclarationTag = Tag.define(tags.content);
const WidgetDeclarationSplitterTag = Tag.define();
const WidgetDeclarationTypeTag = Tag.define();
const WidgetDeclarationHeadlineTag = Tag.define();
const WidgetDeclarationPropertyTag = Tag.define();
const WidgetDeclarationIdTag = Tag.define();
const WidgetDeclarationFlagTag = Tag.define();
const WidgetDeclarationAttrNameTag = Tag.define();
const WidgetDeclarationAttrSplitterTag = Tag.define();
const WidgetDeclarationAttrValueTag = Tag.define();
const WidgetDeclarationAttrValueSplitterTag = Tag.define();
const WidgetDeclarationAttrValueIconTag = Tag.define();
const WidgetDeclarationAttrValueStrTag = Tag.define();
const WidgetDeclarationAttrValueExtTag = Tag.define();
const WidgetDeclarationNodes = [
  { name: "WidgetDeclaration", style: WidgetDeclarationTag },
  { name: "WidgetDeclarationSplitter", style: WidgetDeclarationSplitterTag },
  { name: "WidgetDeclarationType", style: WidgetDeclarationTypeTag },
  { name: "WidgetDeclarationHeadline", style: WidgetDeclarationHeadlineTag },
  { name: "WidgetDeclarationProperty", style: WidgetDeclarationPropertyTag },
  { name: "WidgetDeclarationId", style: WidgetDeclarationIdTag },
  { name: "WidgetDeclarationFlag", style: WidgetDeclarationFlagTag },
  { name: "WidgetDeclarationAttrName", style: WidgetDeclarationAttrNameTag },
  { name: "WidgetDeclarationAttrSplitter", style: WidgetDeclarationAttrSplitterTag },
  { name: "WidgetDeclarationAttrValue", style: WidgetDeclarationAttrValueTag },
  { name: "WidgetDeclarationAttrValueSplitter", style: WidgetDeclarationAttrValueSplitterTag },
  { name: "WidgetDeclarationAttrValueIcon", style: WidgetDeclarationAttrValueIconTag },
  { name: "WidgetDeclarationAttrValueStr", style: WidgetDeclarationAttrValueStrTag },
  { name: "WidgetDeclarationAttrValueExt", style: WidgetDeclarationAttrValueExtTag }
];
const WIDGET_DECLARATION_SPLITTER = index$2.AbstractSemanticNodeWidgetParser.WIDGET_TITLE_SPLITTER;
const ATTRIBUTE_DECLARATION_SPLITTER = ":";
const ATTRIBUTE_VALUE_CONST_START = "$";
const ATTRIBUTE_VALUE_ICON_SYMBOL = "$icons";
const ATTRIBUTE_VALUE_ICON_PREFIX = `${ATTRIBUTE_VALUE_ICON_SYMBOL}.`;
const ATTRIBUTE_VALUE_REF_START = "@";
const ATTRIBUTE_VALUE_EXT_SYMBOL = "@ext";
const ATTRIBUTE_VALUE_EXT_PREFIX = `${ATTRIBUTE_VALUE_EXT_SYMBOL}.`;
const parseWidgetFlag = (text) => {
  const str = (text ?? "").trim();
  const matches = index$2.HeadingParser.WIDGET_TITLE_FLAG_MATCHERS.find((matcher) => str.endsWith(matcher));
  if (matches == null) {
    return { title: text };
  } else {
    const index2 = text.indexOf(matches);
    return { title: text.substring(0, index2), $flag: text.substring(index2 + 2), $flagOffset: index2 };
  }
};
const parseWidgetDeclaration = (text) => {
  const { title: title2, ...$flags } = parseWidgetFlag(text);
  text = title2;
  const segments = text.split(WIDGET_DECLARATION_SPLITTER);
  switch (true) {
    case segments.length === 2: {
      const $wt = segments[0];
      const headline = segments[1];
      return {
        $wt,
        headlineOffset: $wt.length,
        headline,
        ...$flags
      };
    }
    case segments.length === 3: {
      const $pp = segments[segments.length - 1];
      const $wt = segments[0];
      const headline = segments.slice(1, segments.length - 1).join(WIDGET_DECLARATION_SPLITTER).trim();
      return {
        $wt,
        headlineOffset: $wt.length,
        headline,
        $ppOffset: $wt.length + 2 + headline.length,
        $pp,
        ...$flags
      };
    }
    case segments.length > 3: {
      const $id = segments[segments.length - 1];
      const $pp = segments[segments.length - 2];
      const $wt = segments[0];
      const headline = segments.slice(1, segments.length - 2).join(WIDGET_DECLARATION_SPLITTER).trim();
      return {
        $wt,
        headlineOffset: $wt.length,
        headline,
        $ppOffset: $wt.length + 2 + headline.length,
        $pp,
        $idOffset: $wt.length + 2 + headline.length + 2 + $pp.length,
        $id,
        ...$flags
      };
    }
    default:
      return $flags;
  }
};
const parseWidget = (ctx, text, offset) => {
  if (!text.includes(WIDGET_DECLARATION_SPLITTER)) {
    return -1;
  }
  const parsed = parseWidgetDeclaration(text);
  if (Object.keys(parsed).length === 0) {
    return -1;
  }
  const children = [
    parsed.$wt != null ? ctx.elt("WidgetDeclarationType", offset, offset + parsed.$wt.length) : void 0,
    parsed.headline != null ? ctx.elt("WidgetDeclarationSplitter", offset + parsed.headlineOffset, offset + parsed.headlineOffset + 2) : void 0,
    parsed.headline != null ? ctx.elt("WidgetDeclarationHeadline", offset + parsed.headlineOffset + 2, offset + parsed.headlineOffset + 2 + parsed.headline.length) : void 0,
    parsed.$pp != null ? ctx.elt("WidgetDeclarationSplitter", offset + parsed.$ppOffset, offset + parsed.$ppOffset + 2) : void 0,
    parsed.$pp != null ? ctx.elt("WidgetDeclarationProperty", offset + parsed.$ppOffset + 2, offset + parsed.$ppOffset + 2 + parsed.$pp.length) : void 0,
    parsed.$id != null ? ctx.elt("WidgetDeclarationSplitter", offset + parsed.$idOffset, offset + parsed.$idOffset + 2) : void 0,
    parsed.$id != null ? ctx.elt("WidgetDeclarationId", offset + parsed.$idOffset + 2, offset + parsed.$idOffset + 2 + parsed.$id.length) : void 0,
    parsed.$flag != null ? ctx.elt("WidgetDeclarationSplitter", offset + parsed.$flagOffset, offset + parsed.$flagOffset + 2) : void 0,
    parsed.$flag != null ? ctx.elt("WidgetDeclarationFlag", offset + parsed.$flagOffset + 2, offset + parsed.$flagOffset + 2 + parsed.$flag.length) : void 0
  ].filter((x) => x != null);
  return ctx.addElement(ctx.elt("WidgetDeclaration", offset, ctx.end, children));
};
const parseAttribute = (ctx, text, offset) => {
  const segments = text.split(ATTRIBUTE_DECLARATION_SPLITTER, 2);
  if (segments.length === 1) {
    return -1;
  }
  const [attributeName, attributeValue] = segments;
  let valueElements;
  if ((attributeValue ?? "").indexOf(ATTRIBUTE_VALUE_ICON_SYMBOL) != -1) {
    const icons = attributeValue.split(";");
    const computed = icons.reduce((computed2, icon, index2) => {
      if (index2 !== 0) {
        computed2.children.push(ctx.elt("WidgetDeclarationAttrValueSplitter", offset + computed2.used, offset + computed2.used + 1));
        computed2.used = computed2.used + 1;
      }
      if (icon.indexOf(ATTRIBUTE_VALUE_ICON_SYMBOL) != -1) {
        computed2.children.push(ctx.elt("WidgetDeclarationAttrValueIcon", offset + computed2.used, offset + computed2.used + icon.length));
      } else {
        computed2.children.push(ctx.elt("WidgetDeclarationAttrValueStr", offset + computed2.used, offset + computed2.used + icon.length));
      }
      computed2.used = computed2.used + icon.length;
      return computed2;
    }, { used: attributeName.length + 1, children: [] });
    valueElements = computed.children;
  } else if ((attributeValue ?? "").trim().startsWith(ATTRIBUTE_VALUE_EXT_SYMBOL)) {
    valueElements = [ctx.elt("WidgetDeclarationAttrValueExt", offset + attributeName.length + 1, offset + attributeName.length + 1 + attributeValue.length)];
  } else {
    valueElements = attributeValue != null ? [ctx.elt("WidgetDeclarationAttrValue", offset + attributeName.length + 1, offset + attributeName.length + 1 + attributeValue.length)] : [];
  }
  const children = [
    attributeName != null ? ctx.elt("WidgetDeclarationAttrName", offset, offset + attributeName.length) : void 0,
    attributeValue != null ? ctx.elt("WidgetDeclarationAttrSplitter", offset + attributeName.length, offset + attributeName.length + 1) : void 0,
    ...valueElements
  ].filter((x) => x != null);
  return ctx.addElement(ctx.elt("WidgetDeclaration", offset, ctx.end, children));
};
const WidgetParse = {
  name: "WidgetDeclaration",
  parse: (ctx, next, pos) => {
    if (ctx.offset !== pos) {
      return -1;
    }
    let { text = "" } = ctx;
    if (text.length === 0) {
      return -1;
    }
    const linkBreakIndex = text.indexOf("\n");
    if (linkBreakIndex !== -1) {
      text = text.substring(0, linkBreakIndex);
    }
    return [parseWidget, parseAttribute].reduce((result, parse) => {
      if (result !== -1) {
        return result;
      }
      return parse(ctx, text, pos);
    }, -1);
  }
};
class WidgetDeclarationIcon extends WidgetType {
  constructor(ch, classSuffix) {
    super();
    __publicField(this, "ch");
    __publicField(this, "classSuffix");
    this.ch = ch;
    this.classSuffix = classSuffix;
  }
  eq(other) {
    return other.ch == this.ch;
  }
  toDOM() {
    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.className = `d9-playground-editor-widget-declaration-icon d9-playground-editor-widget-declaration-${this.classSuffix}-icon`;
    icon.innerText = this.ch;
    return icon;
  }
  ignoreEvent() {
    return true;
  }
}
const decorateWidgetDeclarationIcon = (view) => {
  const widgets = [];
  const createDecorator = (ch, classSuffix, rangeDecoration) => {
    widgets.push(rangeDecoration(Decoration.widget({ widget: new WidgetDeclarationIcon(ch, classSuffix), side: 0 })));
  };
  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (node) => {
        switch (node.name) {
          case "WidgetDeclarationType":
            createDecorator("w", "type", (decoration) => decoration.range(node.to));
            break;
          case "WidgetDeclarationHeadline":
            createDecorator("l", "headline", (decoration) => decoration.range(node.to));
            break;
          case "WidgetDeclarationProperty":
            createDecorator("p", "property", (decoration) => decoration.range(node.to));
            break;
          case "WidgetDeclarationId":
            createDecorator("id", "id", (decoration) => decoration.range(node.to));
            break;
          case "WidgetDeclarationFlag":
            createDecorator("f", "flag", (decoration) => decoration.range(node.to));
            break;
          case "WidgetDeclarationAttrName":
            createDecorator("a", "attr-name", (decoration) => decoration.range(node.to));
            break;
        }
      }
    });
  }
  return Decoration.set(widgets);
};
const WidgetDeclarationIconPlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    __publicField(this, "decorations");
    this.decorations = decorateWidgetDeclarationIcon(view);
  }
  update(update) {
    if (update.docChanged || update.viewportChanged || syntaxTree(update.startState) != syntaxTree(update.state))
      this.decorations = decorateWidgetDeclarationIcon(update.view);
  }
}, { decorations: (v) => v.decorations });
const extendHighlightStyle = HighlightStyle.define([
  ...defaultHighlightStyle.specs,
  { tag: tags.processingInstruction, class: "d9-playground-editor-processing-instruction" },
  { tag: tags.heading, class: "d9-playground-editor-heading" },
  { tag: tags.heading1, class: "d9-playground-editor-heading1" },
  { tag: tags.heading2, class: "d9-playground-editor-heading2" },
  { tag: tags.heading3, class: "d9-playground-editor-heading3" },
  { tag: tags.heading4, class: "d9-playground-editor-heading4" },
  { tag: tags.heading5, class: "d9-playground-editor-heading5" },
  { tag: tags.heading6, class: "d9-playground-editor-heading6" },
  { tag: tags.list, class: "d9-playground-editor-list" },
  { tag: WidgetDeclarationTag, class: "d9-playground-editor-widget-declaration" },
  { tag: WidgetDeclarationSplitterTag, class: "d9-playground-editor-widget-declaration-splitter" },
  { tag: WidgetDeclarationTypeTag, class: "d9-playground-editor-widget-declaration-type" },
  { tag: WidgetDeclarationHeadlineTag, class: "d9-playground-editor-widget-declaration-headline" },
  { tag: WidgetDeclarationPropertyTag, class: "d9-playground-editor-widget-declaration-property" },
  { tag: WidgetDeclarationIdTag, class: "d9-playground-editor-widget-declaration-id" },
  { tag: WidgetDeclarationFlagTag, class: "d9-playground-editor-widget-declaration-flag" },
  { tag: WidgetDeclarationAttrNameTag, class: "d9-playground-editor-widget-declaration-attr-name" },
  { tag: WidgetDeclarationAttrSplitterTag, class: "d9-playground-editor-widget-declaration-attr-splitter" },
  { tag: WidgetDeclarationAttrValueTag, class: "d9-playground-editor-widget-declaration-attr-value" },
  { tag: WidgetDeclarationAttrValueSplitterTag, class: "d9-playground-editor-widget-declaration-attr-value-splitter" },
  { tag: WidgetDeclarationAttrValueIconTag, class: "d9-playground-editor-widget-declaration-attr-value-icon" },
  { tag: WidgetDeclarationAttrValueStrTag, class: "d9-playground-editor-widget-declaration-attr-value-str" },
  { tag: WidgetDeclarationAttrValueExtTag, class: "d9-playground-editor-widget-declaration-attr-value-ext" }
]);
const d9mlHighlightStyle = syntaxHighlighting(extendHighlightStyle);
const buildExternalDefTypeAsExtOption = (key, externalDefType, parentKey) => {
  return {
    label: parentKey == null ? key : `${parentKey}.${key}`,
    detail: externalDefType.label,
    info: externalDefType.description,
    $wt: externalDefType.$wt,
    properties: externalDefType.properties
  };
};
const buildExtOptions = (externalDefsTypes, parentKey) => {
  return Object.keys(externalDefsTypes).reduce((options, key) => {
    const value = externalDefsTypes[key];
    if (value == null) {
      return options;
    } else if (Array.isArray(value)) {
      options.push(...value.map((item) => {
        if (item == null) {
          return null;
        }
        if (VUtils.isNotBlank(item.$wt)) {
          return buildExternalDefTypeAsExtOption(key, item, parentKey);
        } else {
          return buildExtOptions(item, parentKey == null ? key : `${parentKey}.${key}`);
        }
      }).filter((x) => x != null).flat());
    } else if (VUtils.isNotBlank(value.$wt)) {
      options.push(buildExternalDefTypeAsExtOption(key, value, parentKey));
    } else {
      options.push(...buildExtOptions(value, parentKey == null ? key : `${parentKey}.${key}`));
    }
    return options;
  }, []).filter((x) => x != null);
};
const findWidgetType = (node, context) => {
  var _a, _b, _c;
  const bulletList = node.parent;
  if (bulletList == null || bulletList.name !== "BulletList") {
    return void 0;
  }
  const parent = bulletList.parent;
  if (parent == null) {
    return void 0;
  }
  if (parent.name === "Document") {
    let previous = parent.childBefore(node.from);
    while (previous != null && !previous.name.startsWith("ATXHeading")) {
      previous = parent.childBefore(previous.from);
    }
    if (previous == null) {
      return void 0;
    }
    const declaration2 = (_a = previous.firstChild) == null ? void 0 : _a.nextSibling;
    if (declaration2 == null || declaration2.name !== "WidgetDeclaration") {
      return void 0;
    }
    const declarationType2 = declaration2.firstChild;
    if (declarationType2 == null || declarationType2.name !== "WidgetDeclarationType") {
      return void 0;
    }
    return context.state.sliceDoc(declarationType2.from, declarationType2.to);
  } else if (parent.name !== "ListItem") {
    return void 0;
  }
  const declaration = (_c = (_b = parent.firstChild) == null ? void 0 : _b.nextSibling) == null ? void 0 : _c.firstChild;
  if (declaration == null || declaration.name !== "WidgetDeclaration") {
    return void 0;
  }
  const declarationType = declaration.firstChild;
  if (declarationType == null || declarationType.name !== "WidgetDeclarationType") {
    return void 0;
  }
  return context.state.sliceDoc(declarationType.from, declarationType.to);
};
const createCompleteD9ml = (options) => {
  const { widgets, externalDefsTypes } = options;
  const WidgetTypeOptions = widgets.widgets.filter(({ $wt }) => $wt != index.N2WidgetType.PAGE).map(({ $wt, label, description, $parent }) => {
    return { label: $wt, detail: label, info: description, type: "class", $parent };
  });
  const WidgetAttrNameOptions = [
    ...getCommonWidgetAttributes().map(({ name, label, description }) => {
      return { label: name, detail: label, info: description, $wt: "$all", name };
    }),
    ...widgets.widgets.filter(({ $wt }) => $wt != index.N2WidgetType.PAGE).map(({ $wt, properties }) => {
      return (properties ?? []).map(({ name, label, description }) => {
        return { label: name, detail: label, info: description, $wt, name };
      });
    }).flat()
  ];
  const WidgetConstPrefixOptions = widgets.constants.map(({ $prefix, label, description }) => ({ label: $prefix, detail: label, info: description, type: "variable" }));
  const WidgetIconOptions = widgets.icons.map(({ $key, label, description }) => ({ label: $key, detail: label, info: description, type: "variable" }));
  const WidgetRefPrefixOptions = widgets.extensions.map(({ $prefix, label, description }) => ({ label: $prefix, detail: label, info: description, type: "variable" }));
  const WidgetExtOptions = buildExtOptions(externalDefsTypes);
  const completeHeading = (context, nodeBefore) => {
    const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? "";
    const tagBefore = /(#{1,6})(\s+)\w*$/.exec(textBefore);
    if (tagBefore == null) {
      return null;
    }
    if (tagBefore[1].length === 1) {
      return {
        from: nodeBefore.from + tagBefore[1].length + tagBefore[2].length,
        options: [{ label: index.N2WidgetType.PAGE }]
      };
    } else {
      return {
        from: nodeBefore.from + tagBefore[1].length + tagBefore[2].length,
        options: WidgetTypeOptions
      };
    }
  };
  const completeListItem = (context, nodeBefore) => {
    const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? "";
    const tagBefore = /([-|*]\s+)\w*$/.exec(textBefore);
    if (tagBefore == null) {
      return null;
    }
    const widgetType = findWidgetType(nodeBefore, context);
    let typeOptions = WidgetTypeOptions;
    if (widgetType != null) {
      typeOptions = typeOptions.filter((option) => {
        return option.$parent == null || option.$parent === widgetType || Array.isArray(option.$parent) && option.$parent.includes(widgetType);
      });
    }
    const attrOptions = WidgetAttrNameOptions.filter((option) => {
      return option.$wt === "$all" || option.$wt === widgetType;
    });
    return {
      from: nodeBefore.from + tagBefore[1].length,
      options: [...typeOptions, ...attrOptions]
    };
  };
  const completeParagraph = (context, nodeBefore, tree3) => {
    const nodeBefore2 = tree3.resolveInner(nodeBefore.from, -1);
    if (nodeBefore2 == null) {
      return null;
    } else if (nodeBefore2.name === "ListItem") {
      return completeListItem(context, nodeBefore2);
    } else {
      return null;
    }
  };
  const completeIcon = (context, nodeBefore) => {
    const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? "";
    if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_ICON_PREFIX)) {
      return {
        from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_ICON_PREFIX) + ATTRIBUTE_VALUE_ICON_PREFIX.length,
        options: WidgetIconOptions
      };
    } else {
      return null;
    }
  };
  const completeExt = (context, nodeBefore) => {
    const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? "";
    if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_EXT_PREFIX)) {
      return {
        from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_EXT_PREFIX) + ATTRIBUTE_VALUE_EXT_PREFIX.length,
        options: WidgetExtOptions
      };
    } else {
      return null;
    }
  };
  const completePrefix = (context, nodeBefore) => {
    const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? "";
    if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_CONST_START)) {
      return {
        from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_CONST_START),
        options: WidgetConstPrefixOptions
      };
    } else if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_REF_START)) {
      return {
        from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_REF_START),
        options: WidgetRefPrefixOptions
      };
    } else {
      return null;
    }
  };
  return (context) => {
    const tree3 = syntaxTree(context.state);
    const nodeBefore = tree3.resolveInner(context.pos, -1);
    if (nodeBefore == null) {
      return null;
    }
    switch (true) {
      case nodeBefore.name.startsWith("ATXHeading"):
        return completeHeading(context, nodeBefore);
      case nodeBefore.name === "ListItem":
        return completeListItem(context, nodeBefore);
      case nodeBefore.name === "Paragraph":
        return completeParagraph(context, nodeBefore, tree3);
      case nodeBefore.name === "WidgetDeclarationAttrValueIcon":
        return completeIcon(context, nodeBefore);
      case nodeBefore.name === "WidgetDeclarationAttrValueExt":
        return completeExt(context, nodeBefore);
      case nodeBefore.name === "WidgetDeclarationAttrValue":
        return completePrefix(context, nodeBefore);
      default:
        return null;
    }
  };
};
const createD9mlCompletions = (options) => {
  return markdownLanguage.data.of({ autocomplete: createCompleteD9ml(options) });
};
const d9mlExtensions = {
  defineNodes: [...WidgetDeclarationNodes],
  parseInline: [WidgetParse]
};
const BoxIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-box", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M22 10.9V4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V10.9C13.5 12.4 14.14 13 15.73 13H19.77C21.36 13 22 12.4 22 10.9Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M22 19.9V18.1C22 16.6 21.36 16 19.77 16H15.73C14.14 16 13.5 16.6 13.5 18.1V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M10.5 13.1V19.9C10.5 21.4 9.86 22 8.27 22H4.23C2.64 22 2 21.4 2 19.9V13.1C2 11.6 2.64 11 4.23 11H8.27C9.86 11 10.5 11.6 10.5 13.1Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M10.5 4.1V5.9C10.5 7.4 9.86 8 8.27 8H4.23C2.64 8 2 7.4 2 5.9V4.1C2 2.6 2.64 2 4.23 2H8.27C9.86 2 10.5 2.6 10.5 4.1Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const ButtonIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-button", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M5.5 10V8.5M5.5 8.5V3.5C5.5 2.94772 5.94772 2.5 6.5 2.5C7.05228 2.5 7.5 2.94772 7.5 3.5V7.5H10.8529C11.7626 7.5 12.5 8.23741 12.5 9.14706V10C12.5 12.4853 10.4853 14.5 8 14.5H7.5C5.29086 14.5 3.5 12.7091 3.5 10.5C3.5 9.39543 4.39543 8.5 5.5 8.5ZM9 5.5H11C12.3807 5.5 13.5 4.38071 13.5 3C13.5 1.61929 12.3807 0.5 11 0.5H4C2.61929 0.5 1.5 1.61929 1.5 3C1.5 4.38071 2.61929 5.5 4 5.5", stroke: "currentColor" })
  );
};
const ButtonBarIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-button-bar", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z", stroke: "currentColor", opacity: "0.4", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M17.5004 17.0801H15.6504", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M12.97 17.0801H6.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M17.5007 13.3198H11.9707", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", display: "none" }),
    React.createElement("path", { d: "M9.27 13.3198H6.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", display: "none" })
  );
};
const CaptionIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-caption", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 24 24" },
    React.createElement("path", { d: "M1.6 18.3L5.8 5.9h2.5l4.2 12.4h-2.4L9.2 15H4.9l-1.1 3.4H1.6zM7 8.1l-1.6 5.2h3.3L7 8.1zM15.7 16.9l-.1 1.5h-2.1V5.2h2.2V10h.1c.4-.8 1.2-1.5 2.8-1.5 2.3 0 3.7 1.7 3.7 4.4v1c0 2.9-1.4 4.5-3.7 4.5-1.6.1-2.5-.6-2.9-1.5zm4.3-3v-.8c0-1.8-.8-2.8-2.1-2.8s-2.2 1.1-2.2 2.8v.9c0 1.5.7 2.7 2.2 2.7 1.3 0 2.1-.9 2.1-2.8z" })
  );
};
const ChartAutonomousIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-chart-autonomous", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M4.02 5.97C2.75 7.65 2 9.74 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2", stroke: "#292D32", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.34", d: "M5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5", stroke: "#292D32", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.34", d: "M12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8", stroke: "#292D32", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const ChartBarIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-chart-bar", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M21 3L14 9L10 5L3 11M4.5 21C3.67157 21 3 20.3284 3 19.5V17.5C3 16.6716 3.67157 16 4.5 16C5.32843 16 6 16.6716 6 17.5V19.5C6 20.3284 5.32843 21 4.5 21ZM11.5 21C10.6716 21 10 20.3284 10 19.5V14.5C10 13.6716 10.6716 13 11.5 13C12.3284 13 13 13.6716 13 14.5V19.5C13 20.3284 12.3284 21 11.5 21ZM18.5 21C17.6716 21 17 20.3284 17 19.5V16.5C17 15.6716 17.6716 15 18.5 15C19.3284 15 20 15.6716 20 16.5V19.5C20 20.3284 19.3284 21 18.5 21Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const ChartLineIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-chart-line", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 15L12 9L16 13L21 7", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const ChartPieIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-chart-pie", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M19.9497 17.9497L15 13H22C22 14.933 21.2165 16.683 19.9497 17.9497Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M20 10C20 6.13401 16.866 3 13 3V10H20Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M2 12C2 16.4183 5.58172 20 10 20C12.2091 20 14.2091 19.1046 15.6569 17.6569L10 12V4C5.58172 4 2 7.58172 2 12Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const ChartReliantIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-chart-reliant", viewBox: "0 0 32 32", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("polygon", { points: "4 20 4 22 8.586 22 2 28.586 3.414 30 10 23.414 10 28 12 28 12 20 4 20" }),
    React.createElement("path", { d: "M15,28V26a9.0133,9.0133,0,0,0,8.9448-8H16a2.0021,2.0021,0,0,1-2-2V8.0552A9.0133,9.0133,0,0,0,6,17H4A11.0125,11.0125,0,0,1,15,6a1,1,0,0,1,1,1v9h9a1,1,0,0,1,1,1A11.0125,11.0125,0,0,1,15,28Z" }),
    React.createElement("path", { d: "M29.0057,14H19.995A1.9957,1.9957,0,0,1,18,12V3a1.0083,1.0083,0,0,1,1.02-1A11.0125,11.0125,0,0,1,30,12.98,1.0035,1.0035,0,0,1,29.0057,14ZM20,12h7.9448A9.018,9.018,0,0,0,20,4.0552Z" }),
    React.createElement("rect", { fill: "none", width: "32", height: "32" })
  );
};
const CheckboxIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-checkbox", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3 3H12V12H3L3 3ZM2 3C2 2.44771 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V12C13 12.5523 12.5523 13 12 13H3C2.44771 13 2 12.5523 2 12V3ZM10.3498 5.51105C10.506 5.28337 10.4481 4.97212 10.2204 4.81587C9.99275 4.65961 9.6815 4.71751 9.52525 4.94519L6.64048 9.14857L5.19733 7.40889C5.02102 7.19635 4.7058 7.16699 4.49327 7.34329C4.28073 7.5196 4.25137 7.83482 4.42767 8.04735L6.2934 10.2964C6.39348 10.4171 6.54437 10.4838 6.70097 10.4767C6.85757 10.4695 7.00177 10.3894 7.09047 10.2601L10.3498 5.51105Z", fill: "currentColor" })
  );
};
const ChecksIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-checks", viewBox: "-3 -3 20 20", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" },
    React.createElement("path", { d: "M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" })
  );
};
const ContainerGroupIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-container-group", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement(
      "g",
      { opacity: "0.4" },
      React.createElement("path", { d: "M2 8.50488H22", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M6 16.5049H8", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M10.5 16.5049H14.5", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" })
    ),
    React.createElement("path", { d: "M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const DateIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-date", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M8 2V5", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M16 2V5", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M3.5 9.08984H20.5", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M11.9955 13.7002H12.0045", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M8.29431 13.7002H8.30329", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M8.29492 16.7002H8.3039", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const DateTimeIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-datetime", viewBox: "2 2 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.6 13C15.6 15.2091 13.8539 17 11.7 17C9.54608 17 7.79999 15.2091 7.79999 13C7.79999 10.7909 9.54608 9 11.7 9C12.7343 9 13.7263 9.42143 14.4577 10.1716C15.1891 10.9217 15.6 11.9391 15.6 13Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M8.775 6.75C9.18921 6.75 9.525 6.41421 9.525 6C9.525 5.58579 9.18921 5.25 8.775 5.25V6.75ZM14.625 5.25C14.2108 5.25 13.875 5.58579 13.875 6C13.875 6.41421 14.2108 6.75 14.625 6.75V5.25ZM8.775 5.25C8.36079 5.25 8.025 5.58579 8.025 6C8.025 6.41421 8.36079 6.75 8.775 6.75V5.25ZM14.625 6.75C15.0392 6.75 15.375 6.41421 15.375 6C15.375 5.58579 15.0392 5.25 14.625 5.25V6.75ZM9.525 6C9.525 5.58579 9.18921 5.25 8.775 5.25C8.36079 5.25 8.025 5.58579 8.025 6H9.525ZM8.025 7C8.025 7.41421 8.36079 7.75 8.775 7.75C9.18921 7.75 9.525 7.41421 9.525 7H8.025ZM8.025 6C8.025 6.41421 8.36079 6.75 8.775 6.75C9.18921 6.75 9.525 6.41421 9.525 6H8.025ZM9.525 4C9.525 3.58579 9.18921 3.25 8.775 3.25C8.36079 3.25 8.025 3.58579 8.025 4H9.525ZM15.375 6C15.375 5.58579 15.0392 5.25 14.625 5.25C14.2108 5.25 13.875 5.58579 13.875 6H15.375ZM13.875 7C13.875 7.41421 14.2108 7.75 14.625 7.75C15.0392 7.75 15.375 7.41421 15.375 7H13.875ZM13.875 6C13.875 6.41421 14.2108 6.75 14.625 6.75C15.0392 6.75 15.375 6.41421 15.375 6H13.875ZM15.375 4C15.375 3.58579 15.0392 3.25 14.625 3.25C14.2108 3.25 13.875 3.58579 13.875 4H15.375ZM11.8933 11.857C11.8933 11.4428 11.5575 11.107 11.1433 11.107C10.7291 11.107 10.3933 11.4428 10.3933 11.857H11.8933ZM11.1433 13.571H10.3933C10.3933 13.9852 10.7291 14.321 11.1433 14.321V13.571ZM12.8144 14.321C13.2286 14.321 13.5644 13.9852 13.5644 13.571C13.5644 13.1568 13.2286 12.821 12.8144 12.821V14.321ZM8.775 5.25C6.18909 5.25 4.125 7.39466 4.125 10H5.625C5.625 8.18706 7.05309 6.75 8.775 6.75V5.25ZM4.125 10V16H5.625V10H4.125ZM4.125 16C4.125 18.6053 6.18909 20.75 8.775 20.75V19.25C7.05309 19.25 5.625 17.8129 5.625 16H4.125ZM8.775 20.75H14.625V19.25H8.775V20.75ZM14.625 20.75C17.2109 20.75 19.275 18.6053 19.275 16H17.775C17.775 17.8129 16.3469 19.25 14.625 19.25V20.75ZM19.275 16V10H17.775V16H19.275ZM19.275 10C19.275 7.39466 17.2109 5.25 14.625 5.25V6.75C16.3469 6.75 17.775 8.18706 17.775 10H19.275ZM8.775 6.75H14.625V5.25H8.775V6.75ZM8.025 6V7H9.525V6H8.025ZM9.525 6V4H8.025V6H9.525ZM13.875 6V7H15.375V6H13.875ZM15.375 6V4H13.875V6H15.375ZM10.3933 11.857V13.571H11.8933V11.857H10.3933ZM11.1433 14.321H12.8144V12.821H11.1433V14.321Z", fill: "currentColor" })
  );
};
const DecoInputIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-deco-input", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M19 8.5V7.2C19 6.0799 19 5.51984 18.782 5.09202C18.5903 4.71569 18.2843 4.40973 17.908 4.21799C17.4802 4 16.9201 4 15.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.0799 20 6.2 20H9.5M7 8V12M11 8V12M19.8284 19.8284C18.2663 21.3905 15.7337 21.3905 14.1716 19.8284C13.3905 19.0474 13 18.0237 13 17C13 15.9763 13.3905 14.9526 14.1716 14.1716C14.1716 14.1716 14.5 15 15.5 15.5C15.5 14.5 15.75 13 16.9929 12C18 13 19.0456 13.3887 19.8284 14.1716C20.6095 14.9526 21 15.9763 21 17C21 18.0237 20.6095 19.0474 19.8284 19.8284Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const DecoNumberIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-deco-number", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M14 14H17M14 10H17M9 9.5V8.5M9 9.5H11.0001M9 9.5C7.20116 9.49996 7.00185 9.93222 7.0001 10.8325C6.99834 11.7328 7.00009 12 9.00009 12C11.0001 12 11.0001 12.2055 11.0001 13.1667C11.0001 13.889 11.0001 14.5 9.00009 14.5M9.00009 14.5L9 15.5M9.00009 14.5H7.0001M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const DecoPasswordIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-deco-pwd", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M11.7802 10.2195C11.4872 9.92672 11.0124 9.92683 10.7195 10.2198C10.4267 10.5128 10.4268 10.9876 10.7198 11.2805L11.4395 11.9998L10.7197 12.7197C10.4268 13.0126 10.4268 13.4874 10.7197 13.7803C11.0126 14.0732 11.4874 14.0732 11.7803 13.7803L12.5004 13.0602L13.2198 13.7793C13.5128 14.0721 13.9876 14.072 14.2805 13.779C14.5733 13.4861 14.5732 13.0112 14.2802 12.7184L13.5611 11.9996L14.2803 11.2803C14.5732 10.9874 14.5732 10.5126 14.2803 10.2197C13.9874 9.92678 13.5126 9.92678 13.2197 10.2197L12.5002 10.9392L11.7802 10.2195Z", fill: "currentColor" }),
    React.createElement("path", { d: "M5.21954 10.2198C5.51237 9.92683 5.98724 9.92672 6.2802 10.2195L7.00017 10.9392L7.71967 10.2197C8.01256 9.92678 8.48743 9.92678 8.78033 10.2197C9.07322 10.5126 9.07322 10.9874 8.78033 11.2803L8.06108 11.9996L8.7802 12.7184C9.07317 13.0112 9.07328 13.4861 8.78046 13.779C8.48763 14.072 8.01276 14.0721 7.7198 13.7793L7.00042 13.0602L6.28033 13.7803C5.98744 14.0732 5.51256 14.0732 5.21967 13.7803C4.92678 13.4874 4.92678 13.0126 5.21967 12.7197L5.93951 11.9998L5.21979 11.2805C4.92683 10.9876 4.92672 10.5128 5.21954 10.2198Z", fill: "currentColor" }),
    React.createElement("path", { d: "M16.5 13.5C16.0858 13.5 15.75 13.8358 15.75 14.25C15.75 14.6642 16.0858 15 16.5 15H18.25C18.6642 15 19 14.6642 19 14.25C19 13.8358 18.6642 13.5 18.25 13.5H16.5Z", fill: "currentColor" }),
    React.createElement("path", { d: "M5.24923 5C3.454 5 2 6.45538 2 8.25V15.75C2 17.5449 3.45507 19 5.25 19H18.75C20.5449 19 22 17.5449 22 15.75V8.25C22 6.45538 20.546 5 18.7508 5H5.24923ZM3.5 8.25C3.5 7.2832 4.28303 6.5 5.24923 6.5H18.7508C19.717 6.5 20.5 7.2832 20.5 8.25V15.75C20.5 16.7165 19.7165 17.5 18.75 17.5H5.25C4.2835 17.5 3.5 16.7165 3.5 15.75V8.25Z", fill: "currentColor" })
  );
};
const DisplayGroupIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-display-group", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M22 10V9C22 6.17157 22 4.75736 21.1213 3.87868C20.2426 3 18.8284 3 16 3H8C5.17157 3 3.75736 3 2.87868 3.87868C2.57888 4.17848 2.38137 4.54062 2.25125 5M2 9V10C2 12.8284 2 14.2426 2.87868 15.1213C3.75736 16 5.17157 16 8 16H16C18.8284 16 20.2426 16 21.1213 15.1213C21.4211 14.8215 21.6186 14.4594 21.7487 14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M12 19V16.5M12 19L18 21M12 19L6 21", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const DropdownIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-dropdown", viewBox: "-3 -3 20 20", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { fill: "currentColor", d: "M15 4h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6c0-0.6-0.4-1-1-1zM10 11h-9v-6h9v6zM13 8.4l-2-1.4h4l-2 1.4z" }),
    React.createElement("path", { fill: "currentColor", d: "M2 6h1v4h-1v-4z" })
  );
};
const InputIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-input", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M5 8.5H6.5M8 8.5H6.5M6.5 8.5V15.5M6.5 15.5H5M6.5 15.5H8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const InputGroupIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-input-group", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 3C8 2.44772 8.44772 2 9 2L15 2C15.5523 2 16 2.44772 16 3C16 3.55229 15.5523 4 15 4L13 4L13 20H15C15.5523 20 16 20.4477 16 21C16 21.5523 15.5523 22 15 22H9C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20H11L11 4H9C8.44772 4 8 3.55228 8 3ZM7.788 6L8 6C8.55229 6 9 6.44772 9 7C9 7.55228 8.55229 8 8 8H7.83C6.95898 8 6.36686 8.0008 5.90945 8.03879C5.46401 8.07578 5.23663 8.1428 5.07805 8.22517C4.71277 8.41492 4.41493 8.71276 4.22517 9.07805C4.1428 9.23663 4.07578 9.46401 4.03879 9.90945C4.0008 10.3669 4 10.959 4 11.83V12.17C4 13.041 4.0008 13.6331 4.03879 14.0905C4.07578 14.536 4.1428 14.7634 4.22517 14.9219C4.41493 15.2872 4.71277 15.5851 5.07805 15.7748C5.23663 15.8572 5.46402 15.9242 5.90945 15.9612C6.36686 15.9992 6.95898 16 7.83 16H8C8.55229 16 9 16.4477 9 17C9 17.5523 8.55229 18 8 18H7.78798C6.96946 18 6.29393 18 5.74393 17.9543C5.17258 17.9069 4.64774 17.805 4.1561 17.5497C3.42553 17.1702 2.82985 16.5745 2.45035 15.8439C2.19496 15.3523 2.0931 14.8274 2.04565 14.2561C1.99998 13.7061 1.99999 13.0305 2 12.212V11.788C1.99999 10.9695 1.99998 10.2939 2.04565 9.74393C2.0931 9.17258 2.19496 8.64774 2.45035 8.1561C2.82985 7.42553 3.42553 6.82985 4.1561 6.45035C4.64774 6.19496 5.17258 6.0931 5.74393 6.04565C6.29393 5.99998 6.96947 5.99999 7.788 6ZM18.0905 8.03879C17.6331 8.0008 17.041 8 16.17 8H16C15.4477 8 15 7.55228 15 7C15 6.44772 15.4477 6 16 6L16.212 6C17.0305 5.99999 17.7061 5.99998 18.2561 6.04565C18.8274 6.0931 19.3523 6.19496 19.8439 6.45035C20.5745 6.82985 21.1702 7.42553 21.5497 8.1561C21.805 8.64774 21.9069 9.17258 21.9543 9.74393C22 10.2939 22 10.9695 22 11.788V12.212C22 13.0305 22 13.7061 21.9543 14.2561C21.9069 14.8274 21.805 15.3523 21.5497 15.8439C21.1702 16.5745 20.5745 17.1702 19.8439 17.5497C19.3523 17.805 18.8274 17.9069 18.2561 17.9543C17.7061 18 17.0305 18 16.212 18H16C15.4477 18 15 17.5523 15 17C15 16.4477 15.4477 16 16 16H16.17C17.041 16 17.6331 15.9992 18.0905 15.9612C18.536 15.9242 18.7634 15.8572 18.9219 15.7748C19.2872 15.5851 19.5851 15.2872 19.7748 14.9219C19.8572 14.7634 19.9242 14.536 19.9612 14.0905C19.9992 13.6331 20 13.041 20 12.17V11.83C20 10.959 19.9992 10.3669 19.9612 9.90945C19.9242 9.46401 19.8572 9.23663 19.7748 9.07805C19.5851 8.71277 19.2872 8.41492 18.9219 8.22517C18.7634 8.1428 18.536 8.07578 18.0905 8.03879Z", fill: "currentColor" })
  );
};
const LabelIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-label", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M7 6V14.5925C7 16.3108 9.02384 17.2291 10.317 16.0976L11 15.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M4 9H10", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M14 9L19 17", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M19 9L14 17", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const LinkIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-link", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M14 12C14 14.7614 11.7614 17 9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H7.5M10 12C10 9.23858 12.2386 7 15 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17H16.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
  );
};
const MaxIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-max", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M17 7H14M17 7V10M17 7L13.5 10.5M7 17H10M7 17V14M7 17L10.5 13.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M7 7H10M7 7V10M7 7L10.5 10.5M17 17H14M17 17V14M17 17L13.5 13.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z", stroke: "currentColor", strokeWidth: "1.5" })
  );
};
const MinIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-min", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M10.5 13.5H7.5M10.5 13.5V16.5M10.5 13.5L7 17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M13.5 10.5H16.5M13.5 10.5V7.5M13.5 10.5L17 7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M10.5 10.5H7.5M10.5 10.5V7.5M10.5 10.5L7 7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M13.5 13.5H16.5M13.5 13.5V16.5M13.5 13.5L17 17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z", stroke: "currentColor", strokeWidth: "1.5" })
  );
};
const MultiDropdownIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-multi-dropdown", viewBox: "-3 -3 20 20", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" },
    React.createElement("path", { d: "M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-13z" }),
    React.createElement("path", { d: "M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" })
  );
};
const NumberInputIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-number-input", viewBox: "2 2 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M21.0165 17.6336H3.83636V16.4336H21.0165V17.6336Z", fill: "currentColor" }),
    React.createElement("path", { d: "M7.09808 13.3967V7.50803H5.74066L3.83636 8.78244V10.091L5.65277 8.88498H5.74066V13.3967H3.84125V14.5539H8.89984V13.3967H7.09808Z", fill: "currentColor" }),
    React.createElement("path", { d: "M9.81781 9.63205V9.66135H11.1069V9.62717C11.1069 8.95334 11.5756 8.49435 12.2739 8.49435C12.9575 8.49435 13.4018 8.89474 13.4018 9.5051C13.4018 9.97873 13.1528 10.3498 12.1909 11.3117L9.89594 13.5822V14.5539H14.8618V13.3869H11.7807V13.299L13.1577 11.9856C14.3491 10.843 14.7543 10.1838 14.7543 9.41232C14.7543 8.19162 13.7729 7.36642 12.3178 7.36642C10.8383 7.36642 9.81781 8.28439 9.81781 9.63205Z", fill: "currentColor" }),
    React.createElement("path", { d: "M17.6694 11.4631H18.5092C19.3198 11.4631 19.8422 11.8684 19.8422 12.4983C19.8422 13.1184 19.3295 13.5139 18.5239 13.5139C17.767 13.5139 17.2592 13.133 17.2104 12.5324H15.9262C15.9897 13.8508 17.0248 14.6955 18.5629 14.6955C20.1401 14.6955 21.2192 13.841 21.2192 12.591C21.2192 11.6584 20.6528 11.0334 19.7006 10.9211V10.8332C20.4721 10.677 20.9457 10.0666 20.9457 9.23654C20.9457 8.12326 19.9741 7.36642 18.5434 7.36642C17.0541 7.36642 16.1118 8.17697 16.0629 9.50021H17.2983C17.3422 8.8801 17.8061 8.48459 18.4995 8.48459C19.2075 8.48459 19.6567 8.85568 19.6567 9.44162C19.6567 10.0324 19.1977 10.4182 18.4946 10.4182H17.6694V11.4631Z", fill: "currentColor" })
  );
};
const OptionsGroupIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-options-group", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement(
      "g",
      { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
      React.createElement(
        "g",
        { fill: "currentColor", fillRule: "nonzero" },
        React.createElement("path", { d: "M8.65066382,15.2406341 C9.03778956,15.5723434 9.1090367,16.1357649 8.83506726,16.550341 L8.75936591,16.6506638 L5.75936591,20.1518539 C5.44270399,20.5214185 4.91140117,20.6054403 4.49988533,20.3672446 L4.39969546,20.3009616 L2.39969546,18.7997715 C1.95799386,18.4682325 1.86868945,17.8413971 2.20022849,17.3996955 C2.50626453,16.9919709 3.06391403,16.8845138 3.49530567,17.1311589 L3.60030454,17.2002285 L4.85,18.138 L7.24063409,15.3493362 C7.59998579,14.92995 8.23127761,14.8812824 8.65066382,15.2406341 Z M21,17 C21.5522847,17 22,17.4477153 22,18 C22,18.5128358 21.6139598,18.9355072 21.1166211,18.9932723 L21,19 L11,19 C10.4477153,19 10,18.5522847 10,18 C10,17.4871642 10.3860402,17.0644928 10.8833789,17.0067277 L11,17 L21,17 Z M20.9875789,11 C21.5398637,11 21.9875789,11.4477153 21.9875789,12 C21.9875789,12.5128358 21.6015387,12.9355072 21.1042001,12.9932723 L20.9875789,13 L10.9875789,13 C10.4352942,13 9.98757893,12.5522847 9.98757893,12 C9.98757893,11.4871642 10.3736191,11.0644928 10.8709578,11.0067277 L10.9875789,11 L20.9875789,11 Z M8.65066382,3.24063409 C9.03778956,3.57234335 9.1090367,4.1357649 8.83506726,4.55034098 L8.75936591,4.65066382 L5.75936591,8.15185393 C5.44270399,8.52141847 4.91140117,8.60544033 4.49988533,8.36724463 L4.39969546,8.30096162 L2.39969546,6.79977151 C1.95799386,6.46823246 1.86868945,5.84139707 2.20022849,5.39969546 C2.50626453,4.9919709 3.06391403,4.88451378 3.49530567,5.13115892 L3.60030454,5.20022849 L4.85,6.138 L7.24063409,3.34933618 C7.59998579,2.92994996 8.23127761,2.88128238 8.65066382,3.24063409 Z M21,5 C21.5522847,5 22,5.44771525 22,6 C22,6.51283584 21.6139598,6.93550716 21.1166211,6.99327227 L21,7 L11,7 C10.4477153,7 10,6.55228475 10,6 C10,5.48716416 10.3860402,5.06449284 10.8833789,5.00672773 L11,5 L21,5 Z" })
      )
    )
  );
};
const PasswordIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-password", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const RadioIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-radio", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z", fill: "currentColor" }),
    React.createElement("circle", { cx: "12", cy: "12", r: "5.25", fill: "currentColor", opacity: "0.4" })
  );
};
const RadiosIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-radios", viewBox: "-3 -3 20 20", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor" },
    React.createElement("path", { d: "M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM0 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm7-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zM3 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" })
  );
};
const RibsIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-ribs", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M19.3198 9.99977H4.68977C3.20977 9.99977 2.00977 8.78978 2.00977 7.31978V4.68977C2.00977 3.20977 3.21977 2.00977 4.68977 2.00977H19.3198C20.7998 2.00977 21.9998 3.21977 21.9998 4.68977V7.31978C21.9998 8.78978 20.7898 9.99977 19.3198 9.99977Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M19.3198 21.9998H4.68977C3.20977 21.9998 2.00977 20.7898 2.00977 19.3198V16.6898C2.00977 15.2098 3.21977 14.0098 4.68977 14.0098H19.3198C20.7998 14.0098 21.9998 15.2198 21.9998 16.6898V19.3198C21.9998 20.7898 20.7898 21.9998 19.3198 21.9998Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M6 5V7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M10 5V7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M6 17V19", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M10 17V19", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M14 6H18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M14 18H18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const SectionIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-section", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M1.99609 8.5H11.4961", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M5.99609 16.5H7.99609", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M10.4961 16.5H14.4961", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M21.9961 12.03V16.11C21.9961 19.62 21.1061 20.5 17.5561 20.5H6.43609C2.88609 20.5 1.99609 19.62 1.99609 16.11V7.89C1.99609 4.38 2.88609 3.5 6.43609 3.5H14.4961", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement(
      "g",
      { opacity: "0.4" },
      React.createElement("path", { d: "M19.0764 4.13031L15.3664 7.84031C15.2264 7.98031 15.0864 8.26031 15.0564 8.46031L14.8564 9.88031C14.7864 10.3903 15.1464 10.7503 15.6564 10.6803L17.0764 10.4803C17.2764 10.4503 17.5564 10.3103 17.6964 10.1703L21.4064 6.46031C22.0464 5.82031 22.3464 5.08031 21.4064 4.14031C20.4564 3.19031 19.7164 3.49031 19.0764 4.13031Z", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M18.5469 4.66016C18.8669 5.79016 19.7469 6.67016 20.8669 6.98016", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" })
    )
  );
};
const TableIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-table", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { opacity: "0.4", d: "M6 6.25V8.25", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M10 6.25V8.25", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M6 16V18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M10 16V18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M14 7.25H18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M14 17H18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M2 12H22", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const TabsIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-tabs", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M12.89 5.87988H5.10999C3.39999 5.87988 2 7.27987 2 8.98987V20.3499C2 21.7999 3.04 22.4199 4.31 21.7099L8.23999 19.5199C8.65999 19.2899 9.34 19.2899 9.75 19.5199L13.68 21.7099C14.95 22.4199 15.99 21.7999 15.99 20.3499V8.98987C16 7.27987 14.6 5.87988 12.89 5.87988Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const TextAreaIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-textarea", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M7.5 4H16.5C17.12 4 17.67 4.02 18.16 4.09C20.79 4.38 21.5 5.62 21.5 9V15C21.5 18.38 20.79 19.62 18.16 19.91C17.67 19.98 17.12 20 16.5 20H7.5C6.88 20 6.33 19.98 5.84 19.91C3.21 19.62 2.5 18.38 2.5 15V9C2.5 5.62 3.21 4.38 5.84 4.09C6.33 4.02 6.88 4 7.5 4Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M13.5 10H17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M7 15.5H7.02H17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M10.0941 10H10.1031", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M7.09412 10H7.1031", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const TreeIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-tree", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M7 8H4C2.9 8 2 7.1 2 6V4C2 2.9 2.9 2 4 2H7C8.1 2 9 2.9 9 4V6C9 7.1 8.1 8 7 8Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M20.8 7H17.2C16.54 7 16 6.45999 16 5.79999V4.20001C16 3.54001 16.54 3 17.2 3H20.8C21.46 3 22 3.54001 22 4.20001V5.79999C22 6.45999 21.46 7 20.8 7Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M20.8 14.5H17.2C16.54 14.5 16 13.96 16 13.3V11.7C16 11.04 16.54 10.5 17.2 10.5H20.8C21.46 10.5 22 11.04 22 11.7V13.3C22 13.96 21.46 14.5 20.8 14.5Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement(
      "g",
      { opacity: "0.4" },
      React.createElement("path", { d: "M9 5H16", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M12.5 5V18C12.5 19.1 13.4 20 14.5 20H16", fill: "white" }),
      React.createElement("path", { d: "M12.5 5V18C12.5 19.1 13.4 20 14.5 20H16", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M12.5 12.5H16", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" })
    ),
    React.createElement("path", { d: "M20.8 22H17.2C16.54 22 16 21.46 16 20.8V19.2C16 18.54 16.54 18 17.2 18H20.8C21.46 18 22 18.54 22 19.2V20.8C22 21.46 21.46 22 20.8 22Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const UploadIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-upload", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M19.002 21V15M21.0303 17L19.0303 15L17.0303 17M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11M9 17H13M9 13H15M9 9H10", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const WindowIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playgroundWindow", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M7 6C7 6.55228 6.55228 7 6 7C5.44772 7 5 6.55228 5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6Z", fill: "currentColor" }),
    React.createElement("path", { d: "M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z", fill: "currentColor" }),
    React.createElement("path", { d: "M13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z", fill: "currentColor" }),
    React.createElement("path", { d: "M2 9.5H22", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M9 21L9 10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M2 12C2 7.28596 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28596 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2.49073 19.5618 2.16444 18.1934 2.0551 16", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const WizardIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-wizard", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement(
      "g",
      { opacity: "0.4" },
      React.createElement("path", { d: "M18 7.75V14.5C18 13.4 17.1 12.5 16 12.5H8C6.9 12.5 6 13.4 6 14.5V7.75C6 6.65 6.9 5.75 8 5.75H16C17.1 5.75 18 6.65 18 7.75Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M19 15.75H18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M6 15.75H5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M18 14V11C18 9.9 17.1 9 16 9H8C6.9 9 6 9.9 6 11V14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M18 14.5V15.75H14.5C14.5 17.13 13.38 18.25 12 18.25C10.62 18.25 9.5 17.13 9.5 15.75H6V14.5C6 13.4 6.9 12.5 8 12.5H16C17.1 12.5 18 13.4 18 14.5Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    )
  );
};
const ZenIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-zen", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M14.5 4.5C14.5 5.88071 13.3807 7 12 7C10.6193 7 9.5 5.88071 9.5 4.5C9.5 3.11929 10.6193 2 12 2C13.3807 2 14.5 3.11929 14.5 4.5Z", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { d: "M3 17L5.58887 15.6918C5.84084 15.5645 6 15.3043 6 15.0196C6 12.0802 8.1377 9.56573 11.0067 9.0825C11.6598 8.9725 12.3402 8.9725 12.9933 9.0825C15.8623 9.56573 18 12.0802 18 15.0196C18 15.3043 18.1592 15.5645 18.4111 15.6918L21 17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M9.5 16L8.45827 17.389C8.42647 17.4314 8.41057 17.4526 8.39456 17.4728C8.13149 17.8053 7.76956 18.0456 7.36102 18.1591C7.33616 18.166 7.31042 18.1724 7.25902 18.1852L5.77423 18.5564C4.7315 18.8171 4 19.754 4 20.8288C4 21.4757 4.52435 22 5.17116 22H6.72727C7.32654 22 7.62617 22 7.917 21.9658C8.59721 21.8859 9.25375 21.667 9.84589 21.3229C10.0991 21.1757 10.3388 20.9959 10.8182 20.6364L11 20.5M11 20.5L13 19M11 20.5L13.5397 21.4524C14.1491 21.6809 14.4539 21.7952 14.7688 21.8688C14.9318 21.9069 15.0966 21.9368 15.2625 21.9583C15.5832 22 15.9087 22 16.5596 22H18.8288C19.4757 22 20 21.4757 20 20.8288C20 19.754 19.2685 18.8171 18.2258 18.5564L16.741 18.1852C16.6896 18.1724 16.6638 18.166 16.639 18.1591C16.2304 18.0456 15.8685 17.8053 15.6054 17.4728C15.5895 17.4526 15.5735 17.4313 15.5417 17.389L14.5 16", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
var PlaygroundIcons;
(function(PlaygroundIcons2) {
  PlaygroundIcons2["CONTAINER_GROUP"] = "playground.container-group";
  PlaygroundIcons2["INPUT_GROUP"] = "playground.input-group";
  PlaygroundIcons2["OPTIONS_GROUP"] = "playground.options-group";
  PlaygroundIcons2["DISPLAY_GROUP"] = "playground.display-group";
  PlaygroundIcons2["MAXIMIZE"] = "playground.max";
  PlaygroundIcons2["MINIMIZE"] = "playground.min";
  PlaygroundIcons2["ZEN"] = "playground.zen";
  PlaygroundIcons2["WINDOW"] = "playground.window";
  PlaygroundIcons2["SECTION"] = "playground.section";
  PlaygroundIcons2["BOX"] = "playground.box";
  PlaygroundIcons2["RIBS"] = "playground.ribs";
  PlaygroundIcons2["TABLE"] = "playground.table";
  PlaygroundIcons2["TREE"] = "playground.tree";
  PlaygroundIcons2["TABS"] = "playground.tabs";
  PlaygroundIcons2["WIZARD"] = "playground.wizard";
  PlaygroundIcons2["BUTTON_BAR"] = "playground.button-bar";
  PlaygroundIcons2["CAPTION"] = "playground.caption";
  PlaygroundIcons2["LABEL"] = "playground.label";
  PlaygroundIcons2["BUTTON"] = "playground.button";
  PlaygroundIcons2["LINK"] = "playground.link";
  PlaygroundIcons2["CHART_PIE"] = "playground.chart-pie";
  PlaygroundIcons2["CHART_BAR"] = "playground.chart-bar";
  PlaygroundIcons2["CHART_LINE"] = "playground.chart-line";
  PlaygroundIcons2["CHART_RELIANT"] = "playground.chart-reliant";
  PlaygroundIcons2["CHART_AUTONOMOUS"] = "playground.chart-autonomous";
  PlaygroundIcons2["INPUT"] = "playground.input";
  PlaygroundIcons2["NUMBER_INPUT"] = "playground.number-input";
  PlaygroundIcons2["PASSWORD"] = "playground.password";
  PlaygroundIcons2["DECO_INPUT"] = "playground.deco-input";
  PlaygroundIcons2["DECO_NUMBER"] = "playground.deco-number";
  PlaygroundIcons2["DECO_PASSWORD"] = "playground.deco-pwd";
  PlaygroundIcons2["TEXTAREA"] = "playground.textarea";
  PlaygroundIcons2["DROPDOWN"] = "playground.dropdown";
  PlaygroundIcons2["MULTI_DROPDOWN"] = "playground.multi-dropdown";
  PlaygroundIcons2["DATE"] = "playground.date";
  PlaygroundIcons2["DATETIME"] = "playground.datetime";
  PlaygroundIcons2["CHECKBOX"] = "playground.checkbox";
  PlaygroundIcons2["CHECKS"] = "playground.checks";
  PlaygroundIcons2["RADIO"] = "playground.radio";
  PlaygroundIcons2["RADIOS"] = "playground.radios";
  PlaygroundIcons2["UPLOAD"] = "playground.upload";
})(PlaygroundIcons || (PlaygroundIcons = {}));
index$2$1.Registrar.register({
  [PlaygroundIcons.CONTAINER_GROUP]: () => React.createElement(ContainerGroupIcon, null),
  [PlaygroundIcons.INPUT_GROUP]: () => React.createElement(InputGroupIcon, null),
  [PlaygroundIcons.OPTIONS_GROUP]: () => React.createElement(OptionsGroupIcon, null),
  [PlaygroundIcons.DISPLAY_GROUP]: () => React.createElement(DisplayGroupIcon, null),
  [PlaygroundIcons.MAXIMIZE]: () => React.createElement(MaxIcon, null),
  [PlaygroundIcons.MINIMIZE]: () => React.createElement(MinIcon, null),
  [PlaygroundIcons.ZEN]: () => React.createElement(ZenIcon, null),
  [PlaygroundIcons.WINDOW]: () => React.createElement(WindowIcon, null),
  [PlaygroundIcons.SECTION]: () => React.createElement(SectionIcon, null),
  [PlaygroundIcons.BOX]: () => React.createElement(BoxIcon, null),
  [PlaygroundIcons.RIBS]: () => React.createElement(RibsIcon, null),
  [PlaygroundIcons.TABLE]: () => React.createElement(TableIcon, null),
  [PlaygroundIcons.TREE]: () => React.createElement(TreeIcon, null),
  [PlaygroundIcons.TABS]: () => React.createElement(TabsIcon, null),
  [PlaygroundIcons.WIZARD]: () => React.createElement(WizardIcon, null),
  [PlaygroundIcons.BUTTON_BAR]: () => React.createElement(ButtonBarIcon, null),
  [PlaygroundIcons.CAPTION]: () => React.createElement(CaptionIcon, null),
  [PlaygroundIcons.LABEL]: () => React.createElement(LabelIcon, null),
  [PlaygroundIcons.BUTTON]: () => React.createElement(ButtonIcon, null),
  [PlaygroundIcons.LINK]: () => React.createElement(LinkIcon, null),
  [PlaygroundIcons.CHART_PIE]: () => React.createElement(ChartPieIcon, null),
  [PlaygroundIcons.CHART_BAR]: () => React.createElement(ChartBarIcon, null),
  [PlaygroundIcons.CHART_LINE]: () => React.createElement(ChartLineIcon, null),
  [PlaygroundIcons.CHART_RELIANT]: () => React.createElement(ChartReliantIcon, null),
  [PlaygroundIcons.CHART_AUTONOMOUS]: () => React.createElement(ChartAutonomousIcon, null),
  [PlaygroundIcons.INPUT]: () => React.createElement(InputIcon, null),
  [PlaygroundIcons.NUMBER_INPUT]: () => React.createElement(NumberInputIcon, null),
  [PlaygroundIcons.PASSWORD]: () => React.createElement(PasswordIcon, null),
  [PlaygroundIcons.DECO_INPUT]: () => React.createElement(DecoInputIcon, null),
  [PlaygroundIcons.DECO_NUMBER]: () => React.createElement(DecoNumberIcon, null),
  [PlaygroundIcons.DECO_PASSWORD]: () => React.createElement(DecoPasswordIcon, null),
  [PlaygroundIcons.TEXTAREA]: () => React.createElement(TextAreaIcon, null),
  [PlaygroundIcons.DATE]: () => React.createElement(DateIcon, null),
  [PlaygroundIcons.DATETIME]: () => React.createElement(DateTimeIcon, null),
  [PlaygroundIcons.UPLOAD]: () => React.createElement(UploadIcon, null),
  [PlaygroundIcons.DROPDOWN]: () => React.createElement(DropdownIcon, null),
  [PlaygroundIcons.MULTI_DROPDOWN]: () => React.createElement(MultiDropdownIcon, null),
  [PlaygroundIcons.CHECKBOX]: () => React.createElement(CheckboxIcon, null),
  [PlaygroundIcons.CHECKS]: () => React.createElement(ChecksIcon, null),
  [PlaygroundIcons.RADIO]: () => React.createElement(RadioIcon, null),
  [PlaygroundIcons.RADIOS]: () => React.createElement(RadiosIcon, null)
});
const PlaygroundCssVars = {
  Z_INDEX: 9999999,
  TOOLBAR_BACKGROUND_COLOR: `var(--d9-playground-toolbar-background-color, ${CssVars.BACKGROUND_COLOR})`,
  TOOLBAR_BUTTON_SIZE: "var(--d9-playground-toolbar-button-size, 30px)",
  TOOLBAR_BUTTON_ACTIVE_COLOR: `var(--d9-playground-toolbar-button-active-color, ${CssVars.PRIMARY_COLOR})`,
  TOOLBAR_BUTTON_HOVER_COLOR: `var(--d9-playground-toolbar-hover-color, ${CssVars.HOVER_COLOR})`,
  TOOLBAR_TOOLTIP_BACKGROUND_COLOR: `var(--d9-playground-toolbar-tooltip-background-color, ${CssVars.BACKGROUND_COLOR})`,
  TOOLBAR_TOOLTIP_SHADOW: `var(--d9-playground-toolbar-tooltip-shadow, ${CssVars.WAIVE_HOVER_SHADOW})`,
  SLIDER_BACKGROUND_COLOR: `var(--d9-playground-slider-background-color, ${CssVars.HOVER_COLOR})`,
  WIDGET_DECLARATION_INSTRUCTION_COLOR: "var(--d9-playground-widget-declaration-instruction-color, rgb(134, 54, 153))",
  WIDGET_DECLARATION_SPLITTER_COLOR: "var(--d9-playground-widget-declaration-splitter-color, rgb(85, 85, 85, 0.7))",
  WIDGET_DECLARATION_TYPE_COLOR: "var(--d9-playground-widget-declaration-type-color, rgb(134, 54, 153))",
  WIDGET_DECLARATION_HEADLINE_COLOR: "var(--d9-playground-widget-declaration-headline-color, rgb(55, 122, 41))",
  WIDGET_DECLARATION_PROPERTY_COLOR: "var(--d9-playground-widget-declaration-property-color, rgb(70, 141, 142))",
  WIDGET_DECLARATION_ID_COLOR: "var(--d9-playground-widget-declaration-id-color, rgb(70, 141, 142))",
  WIDGET_DECLARATION_FLAG_COLOR: "var(--d9-playground-widget-declaration-flag-color, rgb(114, 113, 64))",
  WIDGET_DECLARATION_ATTR_NAME_COLOR: "var(--d9-playground-widget-declaration-attr-name-color, rgb(79, 148, 149))",
  WIDGET_DECLARATION_ATTR_VALUE_ICON_COLOR: "var(--d9-playground-widget-declaration-attr-name-color, rgb(55, 122, 41))",
  WIDGET_DECLARATION_ATTR_VALUE_STR_COLOR: "var(--d9-playground-widget-declaration-attr-name-color, rgb(55, 122, 41))",
  WIDGET_DECLARATION_ATTR_VALUE_EXT_COLOR: "var(--d9-playground-widget-declaration-attr-name-color, rgb(10, 56, 172))"
};
const AutoSelect = {
  name: "autoSelect",
  label: "Boolean. Select all content automatically.",
  description: "Default true."
};
const InputPlaceholder = { name: "placeholder", label: "Text. Placeholder when no content." };
const DecorateElements = (name) => {
  return {
    name,
    label: "Decorations.",
    description: "A string or a predefined icon. Icons need to start with “$icons.” Multiple decorations can be connected with “;”."
  };
};
const LeadsDecorateElements = DecorateElements("leads");
const TailsDecorateElements = DecorateElements("tails");
const Please = { name: "please", label: "Text. Placeholder." };
const Clearable = { name: "clearable", label: "Boolean.", description: "Default true." };
const CalendarProperties = [
  Please,
  Clearable,
  { name: "dateFormat", label: "Text.", description: "Default value depends on system settings." },
  { name: "time", label: "Boolean. Allow time part or not.", description: "Default false." },
  {
    name: "timeFormat",
    label: "Text.",
    description: 'Default value depends on system settings, works only when "time" is true.'
  },
  { name: "storeFormat", label: "Text.", description: "Default value depends on system settings." },
  {
    name: "fixedTimeAt",
    label: "Text.",
    description: 'Default value depends on system settings, works only when "time" is false. "start", "0", "end", "HH:mm:ss", "HH:mm:ss.SSS".'
  },
  {
    name: "initTimeAt",
    label: "Text.",
    description: '"start", "0", "end", "HH:mm:ss", "HH:mm:ss.SSS".'
  },
  { name: "autoConfirm", label: "Boolean.", description: "Confirm selection when blurred." },
  { name: "useCalendarIcon", label: "Boolean.", description: "Use calendar icon instead of caret." }
];
const OptionItemsProperties = [
  { name: "options", label: "Text, Various." },
  { name: "optionSort", label: "Text.", description: '"asc", "desc".' },
  { name: "sort", label: 'Text. Shortcut of "optionSort".', description: '"asc", "desc".' },
  { name: "noAvailable", label: "Text.", description: "Reminder text when no available option item." },
  { name: "noMatched", label: "Text.", description: "Reminder text when no matched option item." }
];
const CheckboxesProperties = [
  ...OptionItemsProperties.filter(({ name }) => name !== "noMatched"),
  { name: "columns", label: "Number.", description: "Display columns when not on compact mode." },
  { name: "compact", label: "Boolean.", description: "Default true. Try to fit as many as possible onto one line." },
  {
    name: "single",
    label: "Boolean.",
    description: "Default false. Use primitive value of model instead of an array."
  },
  { name: "boolOnSingle", label: "Boolean.", description: "Default false. Use false when no option checked." }
];
const DropdownProperties = [
  ...OptionItemsProperties,
  Please,
  Clearable,
  { name: "maxWidth", label: "Number.", description: "Max popup width, in pixels." }
];
const Click = { name: "click", label: "Snippet.", description: "Handle click event." };
const CaptionProperties = [
  { name: "labelOnValue", label: "Boolean.", description: "Default false. Content read from model or not." },
  { name: "label", label: "Text.", description: 'Static content, ignored when "text" declared.' },
  { name: "text", label: "Text.", description: 'Static content, works on "labelOnValue" is false.' },
  { name: "valueToLabel", label: "Snippet.", description: "Snippet to compute display label." },
  Click
];
const Ink = {
  name: "ink",
  label: "Text.",
  description: 'Ink mode. "primary", "success", "warn", "info", "danger", "waive".'
};
const Fill = {
  name: "fill",
  label: "Text.",
  description: 'Fill mode. "link", "plain", "fill".'
};
const ButtonProperties = [
  Ink,
  Fill,
  { name: "text", label: "Text.", description: "Label." },
  Click
];
const NoElementReminder = {
  name: "noElementReminder",
  label: "Text.",
  description: "No item reminder text."
};
const ArrayProperties = [
  NoElementReminder,
  { name: "addable", label: "Boolean.", description: "Default false. Could add item or not." },
  { name: "addLabel", label: "Text.", description: "Default add button label." },
  {
    name: "couldAddElement",
    label: "Snippet.",
    description: "Check could add new item or not, runtime check before apply adding."
  },
  {
    name: "disableOnCannotAdd",
    label: "Boolean.",
    description: "Default false. Disable add button when adding new item is not allowed."
  },
  { name: "createElement", label: "Snippet.", description: "Default use empty object as new item." },
  { name: "elementAdded", label: "Snippet.", description: "Handle item added event." },
  { name: "removable", label: "Boolean.", description: "Default false. Could remove item or not." },
  {
    name: "couldRemoveElement",
    label: "Snippet.",
    description: "Check could remove item or not, runtime check before apply removing."
  },
  { name: "elementRemoved", label: "Snippet.", description: "Handle item removed event." }
];
const TableProperties = [
  {
    name: "headers",
    label: "Various.",
    description: "Column headers."
  },
  { name: "headerHeight", label: "Number.", description: "In pixels." },
  { name: "expandable", label: "Boolean.", description: "Default false. Row expandable." },
  { name: "fixedLeadColumns", label: "Number.", description: "How many lead columns are fixed." },
  { name: "fixedTailColumns", label: "Number.", description: "How many tail columns are fixed." },
  { name: "hideClassicCellsOnExpandable", label: "Boolean.", description: "Default false." },
  { name: "clickToExpand", label: "Boolean.", description: "Default false." },
  { name: "maxBodyHeight", label: "Number.", description: "Maximum body height, in pixels." },
  { name: "operatorsColumnWidth", label: "Number.", description: "Operators column width." },
  { name: "rowIndexStartsFrom", label: "Number.", description: "Default 1." },
  {
    name: "omitDefaultRowOperators",
    label: "Boolean, Text.",
    description: 'True to omit the remove, expand, collapse row operators. Or "remove" to omit remove only, "fold" to omit expand and collapse.'
  }
];
const RibsProperties = [
  { name: "caption", label: "Text, Various.", description: "Caption for each item." }
];
const ValidationRequired = {
  name: "required",
  label: "Boolean, Various.",
  description: 'Required check. Customize message after ";".'
};
const ValidationLength = {
  name: "length",
  label: "Number, Various.",
  description: 'Length check. Multiple rules connected by ",". Rule also can be "..x", "x..", "x..y". Customize message after ";".'
};
const ValidationNumeric = {
  name: "numeric",
  label: "Boolean, Various.",
  description: 'Number check. Customize message after ";".'
};
const ValidationPositive = {
  name: "positive",
  label: "Boolean, Various.",
  description: 'Positive number check. Customize message after ";".'
};
const ValidationNotNegative = {
  name: "notNegative",
  label: "Boolean, Various.",
  description: 'Not negative number check. Customize message after ";".'
};
const ValidationInteger = {
  name: "integer",
  label: "Boolean, Various.",
  description: 'Integer check. Customize message after ";".'
};
const ValidationNumberRange = {
  name: "numberRange",
  label: "Various.",
  description: 'Number range check. Multiple rules connected by ",". Rule also can be "[..x]", "(x..)", "(x..y]". Customize message after ";".'
};
const ValidationRegex = {
  name: "regex",
  label: "Boolean, Various.",
  description: 'Regex check. Regex could be predefined. Customize message after ";".'
};
const ValidationRegexp = {
  name: "regexp",
  label: "Boolean, Various.",
  description: 'Same as "regex".'
};
const N2WidgetGroups = [
  { icon: PlaygroundIcons.CONTAINER_GROUP, tooltip: "Container", key: PlaygroundWidgetGroupKey.CONTAINERS },
  { icon: PlaygroundIcons.INPUT_GROUP, tooltip: "Input", key: PlaygroundWidgetGroupKey.INPUTS },
  { icon: PlaygroundIcons.OPTIONS_GROUP, tooltip: "Choices", key: PlaygroundWidgetGroupKey.OPTIONS },
  { icon: PlaygroundIcons.DISPLAY_GROUP, tooltip: "Label & Chart", key: PlaygroundWidgetGroupKey.DISPLAY }
];
const N2Widgets = [
  {
    $wt: index.N2WidgetType.PAGE,
    description: "Only one allowed, and always at the highest level.",
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.INPUT,
    label: "Input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      {
        name: "valueToNumber",
        label: "Boolean. Treat as a number.",
        description: "Default false. Attempt to synchronize with the data model as a number."
      },
      ValidationRequired,
      ValidationRegex,
      ValidationRegexp,
      ValidationLength,
      ValidationNumeric,
      ValidationPositive,
      ValidationNotNegative,
      ValidationInteger,
      ValidationNumberRange
    ],
    icon: PlaygroundIcons.INPUT,
    group: PlaygroundWidgetGroupKey.INPUTS
  },
  {
    $wt: index.N2WidgetType.NUMBER,
    label: "Number input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      ValidationRequired,
      ValidationRegex,
      ValidationRegexp,
      ValidationLength,
      ValidationNumeric,
      ValidationPositive,
      ValidationNotNegative,
      ValidationInteger,
      ValidationNumberRange
    ],
    icon: PlaygroundIcons.NUMBER_INPUT,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Number input"
  },
  {
    $wt: index.N2WidgetType.PASSWORD,
    label: "Password input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      ValidationRequired,
      ValidationRegex,
      ValidationRegexp,
      ValidationLength
    ],
    icon: PlaygroundIcons.PASSWORD,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Password input"
  },
  {
    $wt: index.N2WidgetType.DECORATE_INPUT,
    label: "Decorable input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      LeadsDecorateElements,
      TailsDecorateElements,
      ValidationRequired,
      ValidationRegex,
      ValidationRegexp,
      ValidationLength,
      ValidationNumeric,
      ValidationPositive,
      ValidationNotNegative,
      ValidationInteger,
      ValidationNumberRange
    ],
    icon: PlaygroundIcons.DECO_INPUT,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Decorable input"
  },
  {
    $wt: index.N2WidgetType.DECORATE_NUMBER,
    label: "Decorable number input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      LeadsDecorateElements,
      TailsDecorateElements,
      ValidationRequired,
      ValidationRegex,
      ValidationRegexp,
      ValidationLength,
      ValidationNumeric,
      ValidationPositive,
      ValidationNotNegative,
      ValidationInteger,
      ValidationNumberRange
    ],
    icon: PlaygroundIcons.DECO_NUMBER,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Decorable number input"
  },
  {
    $wt: index.N2WidgetType.DECORATE_PASSWORD,
    label: "Decorable password input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      LeadsDecorateElements,
      TailsDecorateElements,
      ValidationRequired,
      ValidationRegex,
      ValidationRegexp,
      ValidationLength
    ],
    icon: PlaygroundIcons.DECO_PASSWORD,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Decorable password input"
  },
  {
    $wt: index.N2WidgetType.TEXTAREA,
    properties: [
      AutoSelect,
      InputPlaceholder,
      ValidationRequired,
      ValidationLength
    ],
    icon: PlaygroundIcons.TEXTAREA,
    group: PlaygroundWidgetGroupKey.INPUTS
  },
  {
    $wt: index.N2WidgetType.CALENDAR,
    label: "Date picker.",
    properties: [...CalendarProperties, ValidationRequired],
    icon: PlaygroundIcons.DATE,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Date picker",
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.DATE,
    label: 'Date picker. Shortcut of "Calendar"',
    properties: [
      ...CalendarProperties.filter(({ name }) => name !== "time" && name !== "timeFormat"),
      ValidationRequired
    ],
    icon: PlaygroundIcons.DATE,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Date picker"
  },
  {
    $wt: index.N2WidgetType.DATETIME,
    label: "Datetime picker.",
    properties: [
      ...CalendarProperties.filter(({ name }) => name !== "time" && name !== "fixedTimeAt"),
      ValidationRequired
    ],
    icon: PlaygroundIcons.DATETIME,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Datetime picker"
  },
  {
    $wt: index.N2WidgetType.CHECKBOX,
    properties: [
      {
        name: "values",
        label: "Text.",
        description: 'One or two values, connected by ",". First is true value, second is false value.'
      },
      {
        name: "emptyWhenFalse",
        label: "Boolean.",
        description: "Default false. Use times icon when it is false."
      },
      ValidationRequired
    ],
    icon: PlaygroundIcons.CHECKBOX,
    group: PlaygroundWidgetGroupKey.OPTIONS
  },
  {
    $wt: index.N2WidgetType.CHECKBOXES,
    label: "Checkbox group.",
    properties: [...CheckboxesProperties, ValidationRequired],
    icon: PlaygroundIcons.CHECKS,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Checkbox group",
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.CHECKS,
    label: 'Checkbox group. Shortcut of "Checkboxes".',
    properties: [...CheckboxesProperties, ValidationRequired],
    icon: PlaygroundIcons.CHECKS,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Checkbox group"
  },
  {
    $wt: index.N2WidgetType.RADIO,
    label: "Radio button.",
    properties: [
      {
        name: "values",
        label: "Text.",
        description: 'One or two values, connected by ",". First is true value, second is false value.'
      },
      ValidationRequired
    ],
    icon: PlaygroundIcons.RADIO,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Radio button"
  },
  {
    $wt: index.N2WidgetType.RADIOS,
    label: "Radio button group.",
    properties: [
      ...CheckboxesProperties.filter(({ name }) => name !== "single" && name !== "boolOnSingle"),
      ValidationRequired
    ],
    icon: PlaygroundIcons.RADIOS,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Radio button group"
  },
  {
    $wt: index.N2WidgetType.DROPDOWN,
    label: "Dropdown.",
    properties: [...DropdownProperties, ValidationRequired],
    icon: PlaygroundIcons.DROPDOWN,
    group: PlaygroundWidgetGroupKey.OPTIONS
  },
  {
    $wt: index.N2WidgetType.MULTI_DROPDOWN,
    label: "Dropdown allows multiple choices.",
    properties: [...DropdownProperties, ValidationRequired],
    icon: PlaygroundIcons.MULTI_DROPDOWN,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Multiple choices"
  },
  {
    $wt: index.N2WidgetType.CAPTION,
    label: "Caption.",
    properties: [...CaptionProperties, LeadsDecorateElements, TailsDecorateElements],
    icon: PlaygroundIcons.CAPTION,
    group: PlaygroundWidgetGroupKey.DISPLAY
  },
  {
    $wt: index.N2WidgetType.LABEL,
    label: 'Label. Shortcut of "Caption".',
    description: "Read text from model.",
    properties: [
      ...CaptionProperties.filter(({ name }) => name !== "labelOnValue"),
      LeadsDecorateElements,
      TailsDecorateElements
    ],
    icon: PlaygroundIcons.LABEL,
    group: PlaygroundWidgetGroupKey.DISPLAY
  },
  {
    $wt: index.N2WidgetType.BADGE,
    label: 'Badge. Shortcut of "Caption".',
    description: "With ink and fill mode.",
    properties: [...CaptionProperties, Ink, Fill, LeadsDecorateElements, TailsDecorateElements],
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.BUTTON,
    label: "Button",
    properties: [...ButtonProperties, LeadsDecorateElements, TailsDecorateElements],
    icon: PlaygroundIcons.BUTTON,
    group: PlaygroundWidgetGroupKey.DISPLAY
  },
  {
    $wt: index.N2WidgetType.LINK,
    label: 'Link. Shortcut of "Button".',
    description: "With link style.",
    properties: [
      ...ButtonProperties.filter(({ name }) => name !== "fill"),
      LeadsDecorateElements,
      TailsDecorateElements
    ],
    icon: PlaygroundIcons.LINK,
    group: PlaygroundWidgetGroupKey.DISPLAY
  },
  {
    $wt: "Chart",
    $key: "ChartPie",
    label: "Pie chart.",
    icon: PlaygroundIcons.CHART_PIE,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Pie Chart"
  },
  {
    $wt: "Chart",
    $key: "ChartBar",
    label: "Bar chart.",
    icon: PlaygroundIcons.CHART_BAR,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Bar Chart"
  },
  {
    $wt: "Chart",
    $key: "ChartLine",
    label: "Line chart.",
    icon: PlaygroundIcons.CHART_LINE,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Line Chart"
  },
  {
    $wt: "RelChart",
    label: "Chart. Refresh depends on others.",
    icon: PlaygroundIcons.CHART_RELIANT,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Chart depends on data"
  },
  {
    $wt: "AutChart",
    label: "Chart. Refresh autonomously.",
    icon: PlaygroundIcons.CHART_AUTONOMOUS,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Auto refresh chart"
  },
  {
    $wt: index.N2WidgetType.SECTION,
    icon: PlaygroundIcons.SECTION,
    group: PlaygroundWidgetGroupKey.CONTAINERS,
    properties: [
      { name: "title", label: "Text." },
      { name: "collapsible", label: "Boolean.", description: "Section could be folded." },
      { name: "marker", label: "Text.", description: "Global identify this section when global event fired." }
    ]
  },
  {
    $wt: index.N2WidgetType.BOX,
    label: "Box, for customized layout.",
    icon: PlaygroundIcons.BOX,
    group: PlaygroundWidgetGroupKey.CONTAINERS
  },
  {
    $wt: index.N2WidgetType.TABLE_ROW_OPERATORS,
    label: "Table row operators",
    description: 'Valid only within the confines of the "Table".',
    $parent: index.N2WidgetType.TABLE,
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.TABLE,
    properties: [...TableProperties, ...ArrayProperties],
    icon: PlaygroundIcons.TABLE,
    group: PlaygroundWidgetGroupKey.CONTAINERS
  },
  {
    $wt: index.N2WidgetType.RIBS,
    properties: [...RibsProperties, ...ArrayProperties],
    icon: PlaygroundIcons.RIBS,
    group: PlaygroundWidgetGroupKey.CONTAINERS
  },
  {
    $wt: index.N2WidgetType.READONLY_RIBS,
    label: "Readonly Ribs.",
    properties: [...RibsProperties, NoElementReminder],
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.BUTTON_BAR,
    label: "Button bar.",
    properties: [{ name: "alignment", label: "Text.", description: '"left", "center", "right".' }],
    icon: PlaygroundIcons.BUTTON_BAR,
    group: PlaygroundWidgetGroupKey.CONTAINERS,
    tooltip: "Button bar"
  },
  {
    $wt: index.N2WidgetType.TAB,
    description: 'Valid only within the confines of the "Tabs".',
    properties: [
      { name: "title", label: "Text, Various." },
      { name: "marker", label: "Text.", description: "Global identify this tab when global event fired." },
      { name: "badge", label: "Badge.", description: "Badge in tab title." },
      { name: "data", label: "Snippet.", description: "Asynchronously retrieve tab data." }
    ],
    $parent: index.N2WidgetType.TABS,
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.TABS,
    properties: [
      { name: "initActive", label: "Text, Number.", description: "Initial active tab, marker or index." }
    ],
    icon: PlaygroundIcons.TABS,
    group: PlaygroundWidgetGroupKey.CONTAINERS
  },
  {
    $wt: index.N2WidgetType.WIZARD_SHARED,
    label: "Shared part for all wizard steps.",
    description: 'Valid only within the confines of the "Wizard".',
    properties: [
      { name: "lead", label: "Boolean.", description: "Default false. Put share part on lead or tail." }
    ],
    $parent: index.N2WidgetType.WIZARD,
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.WIZARD_STEP,
    label: "Wizard step.",
    description: 'Valid only within the confines of the "Wizard".',
    properties: [
      { name: "title", label: "Text, Various." },
      { name: "marker", label: "Text.", description: "Global identify this tab when global event fired." },
      { name: "data", label: "Snippet.", description: "Asynchronously retrieve tab data." }
    ],
    $parent: index.N2WidgetType.WIZARD,
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.WIZARD,
    properties: [
      { name: "balloon", label: "Boolean.", description: "Default true. Steps in balloon style." },
      { name: "emphasisActive", label: "Boolean.", description: "Default true. Emphasis active step title." },
      { name: "freeWalk", label: "Boolean.", description: "Default false. Could free walk between steps." },
      {
        name: "omitWalker",
        label: "Boolean.",
        description: "Default false. Omit default previous and next button in step body."
      },
      { name: "reached", label: "Text, Number.", description: "Step reached, marker or index." }
    ],
    icon: PlaygroundIcons.WIZARD,
    group: PlaygroundWidgetGroupKey.CONTAINERS
  },
  {
    $wt: index.N2WidgetType.TREE,
    properties: [
      { name: "height", label: "Number.", description: "In pixels." },
      { name: "initExpandLevel", label: "Number.", description: "Default -1. Starts from 0." },
      { name: "showIndex", label: "Boolean.", description: "Default false. Show node index or not." },
      { name: "detective", label: "Snippet.", description: "Tree nodes builder." }
    ],
    icon: PlaygroundIcons.TREE,
    group: PlaygroundWidgetGroupKey.CONTAINERS
  },
  {
    $wt: index.N2WidgetType.PAGINATION,
    properties: [
      { name: "freeWalk", label: "Boolean.", description: "Default false. Show page free walker dropdown." },
      { name: "maxButtons", label: "Number.", description: "Default 7. Maximum page buttons." },
      { name: "possibleSizes", label: "Text.", description: "Possible page size. Show page size dropdown." }
    ],
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  }
];
const computeWidgetGroups = (groups, useN2) => {
  return [
    ...useN2 ? N2WidgetGroups : [],
    ...groups
  ];
};
const computeWidgets = (widgets, useN2) => {
  return [...useN2 ? N2Widgets : [], ...widgets];
};
const N2Icons = [
  { $key: "back" },
  { $key: "date" },
  { $key: "time" },
  { $key: "check" },
  { $key: "times" },
  { $key: "remove" },
  { $key: "expand" },
  { $key: "collapse" },
  { $key: "edit" },
  { $key: "view" },
  { $key: "forward" },
  { $key: "backward" },
  { $key: "caretLeft" },
  { $key: "caretRight" },
  { $key: "caretDown" },
  { $key: "arrowDown" },
  { $key: "angleLeft" },
  { $key: "angleRight" },
  { $key: "spinner" },
  { $key: "cart" }
];
const computeIcons = (icons, useN2) => {
  return [...useN2 ? N2Icons : [], ...icons];
};
const computeConstants = (constants, useN2) => {
  return [
    ...useN2 ? [{ $prefix: ATTRIBUTE_VALUE_ICON_SYMBOL, label: "Pre-built icon constant." }] : [],
    ...constants
  ];
};
const computeReferences = (references, _useN2) => {
  return [
    { $prefix: ATTRIBUTE_VALUE_EXT_SYMBOL, label: "Reference to pre-built function." },
    ...references
  ];
};
const CommonWidgetAttributes = [
  { name: "$fc", label: "Boolean.", description: "Force wrap widget to form cell." },
  {
    name: "holdPositionWhenInvisible",
    label: "Boolean.",
    description: "Hold position when widget is invisible, works when form cell wrapped."
  },
  { name: "$pp", label: "Text.", description: "Model property name." },
  { name: "property", label: "Text.", description: 'Alias of "$pp".' },
  { name: "$pos", label: "Text.", description: "Position in grid." },
  { name: "place", label: "Text.", description: 'Alias of "$pos".' },
  { name: "pos", label: "Text.", description: 'Alias of "$pos".' },
  { name: "position", label: "Text.", description: 'Alias of "$pos".' },
  {
    name: "$mpos",
    label: "Text.",
    description: "Position in grid, priority only takes effect in the mobile environment."
  },
  { name: "mpos", label: "Text.", description: 'Alias of "$mpos".' },
  { name: "$disabled", label: "Boolean, Various.", description: "Disablement." },
  { name: "disabled", label: "Boolean, Various.", description: 'Alias of "$disabled".' },
  { name: "$visible", label: "Boolean, Various.", description: "Visibility." },
  { name: "visible", label: "Boolean, Various.", description: 'Alias of "$visible".' },
  { name: "$valid", label: "Various.", description: "Validation rules." },
  { name: "validate", label: "Various.", description: 'Alias of "$valid".' },
  { name: "$validationScopes", label: "Text.", description: 'Multiple scopes connected by "," or ";".' },
  { name: "validateScopes", label: "Text.", description: 'Alias of "$validationScopes".' },
  { name: "watch", label: "Various.", description: "Monitor other property changes." },
  { name: "repaint", label: "Various.", description: "Monitor other property changes, and repaint myself." },
  { name: "clearMe", label: "Various.", description: "Monitor other property changes, and clear my value." },
  { name: "label", label: "Various.", description: "Label for form cell." }
];
const getCommonWidgetAttributes = () => {
  return CommonWidgetAttributes;
};
var PlaygroundEventTypes;
(function(PlaygroundEventTypes2) {
  PlaygroundEventTypes2["MAXIMIZE"] = "maximize";
  PlaygroundEventTypes2["QUIT_MAXIMIZE"] = "quit-maximize";
  PlaygroundEventTypes2["ZEN"] = "zen";
  PlaygroundEventTypes2["QUIT_ZEN"] = "quit-zen";
  PlaygroundEventTypes2["WIDGET_GROUP_CHANGE"] = "widget-group-change";
  PlaygroundEventTypes2["CONTENT_INITIALIZED"] = "content-initialized";
  PlaygroundEventTypes2["CONTENT_CHANGED"] = "content-changed";
})(PlaygroundEventTypes || (PlaygroundEventTypes = {}));
const Context = reactExports.createContext({});
Context.displayName = "EventBus";
const PlaygroundEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("d9-playground");
  return React.createElement(Context.Provider, { value: bus }, children);
};
const usePlaygroundEventBus = () => reactExports.useContext(Context);
const ToolbarWrapper = qe.div.attrs(() => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-toolbar",
    style: {
      "--width": "81px",
      "--primary-width": "41px",
      "--secondary-width": "40px"
    }
  };
})`
    display: grid;
    position: relative;
    grid-row: span 2;
    grid-template-columns: var(--primary-width) var(--secondary-width);
    grid-template-rows: 1fr;
    width: var(--width);
    background-color: ${PlaygroundCssVars.TOOLBAR_BACKGROUND_COLOR};
    border-right: ${CssVars.BORDER};

    button[data-w=d9-button] {
        align-self: center;
        border-color: transparent;
        padding: 0;

        &[data-fill=plain][data-ink=primary] {
            color: ${CssVars.FONT_COLOR};
            border-color: transparent;

            &[data-active=true] {
                &:before {
                    opacity: 0.5;
                }

                > span[data-w=d9-deco-lead] {
                    color: ${CssVars.INVERT_COLOR};
                    fill: ${CssVars.INVERT_COLOR};
                }
            }

            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: ${CssVars.BORDER_RADIUS};
                background-color: ${PlaygroundCssVars.TOOLBAR_BUTTON_ACTIVE_COLOR};
                opacity: 0;
                transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
                z-index: 0;
            }

            &:hover, &:focus {
                box-shadow: none;
            }

            &:hover {
                background-color: ${PlaygroundCssVars.TOOLBAR_BUTTON_HOVER_COLOR};
                overflow: visible;

                > span[data-role=text] {
                    display: block;
                }
            }

            > span[data-w=d9-deco-lead] {
                width: ${PlaygroundCssVars.TOOLBAR_BUTTON_SIZE};
                height: ${PlaygroundCssVars.TOOLBAR_BUTTON_SIZE};
                padding: 0;
                color: ${CssVars.FONT_COLOR};
                fill: ${CssVars.FONT_COLOR};

                > svg {
                    height: calc(${PlaygroundCssVars.TOOLBAR_BUTTON_SIZE} * 0.7);
                    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
                }
            }

            > span[data-role=text] {
                display: none;
                position: absolute;
                top: 0;
                left: calc(100% + 8px);
                font-variant: none;
                background-color: ${PlaygroundCssVars.TOOLBAR_TOOLTIP_BACKGROUND_COLOR};
                box-shadow: ${PlaygroundCssVars.TOOLBAR_TOOLTIP_SHADOW};
                border-radius: ${CssVars.BORDER_RADIUS};
                z-index: ${PlaygroundCssVars.Z_INDEX + 1};
            }
        }
    }
`;
const PrimaryToolbar = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-toolbar-primary" })`
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 8px 0;

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: calc(100% - 1px);
        width: 1px;
        height: 100%;
        background-color: ${CssVars.BORDER_COLOR};
        opacity: 0.3;
    }
`;
const SecondaryToolbar = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-toolbar-secondary" })`
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 8px 0;
`;
const ToolbarSeparator = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-playground-toolbar-separator" })`
    display: block;
    position: relative;
    margin: 4px 0;

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 20%;
        width: 60%;
        height: 1px;
        background-color: ${CssVars.BORDER_COLOR};
        opacity: 0.7;
    }
`;
const ToolbarButtonTooltip = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-toolbar-tooltip" })`
    display: flex;
    position: relative;
    align-items: center;
    height: calc(${PlaygroundCssVars.TOOLBAR_BUTTON_SIZE} * 1.2);
    padding: 0 12px;
    white-space: nowrap;
    overflow: hidden;
`;
const ToolbarButton = (props) => {
  const { icon, tooltip, click, ...rest } = props;
  const onClicked = () => click();
  const onTooltipClicked = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return React.createElement(UnwrappedButton, { ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, onClick: onClicked, leads: [`$icons.${icon}`], ...rest }, VUtils.isNotBlank(tooltip) ? React.createElement(ToolbarButtonTooltip, { onClick: onTooltipClicked }, tooltip) : null);
};
const PrimaryBar = (props) => {
  var _a;
  const { groups } = props;
  const { fire } = usePlaygroundEventBus();
  const [state, setState] = reactExports.useState({
    zen: false,
    maximized: false,
    group: ((_a = groups[0]) == null ? void 0 : _a.key) ?? ""
  });
  reactExports.useEffect(() => {
    const onFullScreenChanged = () => {
      if (document.fullscreenElement == null) {
        setState((state2) => ({ ...state2, maximized: false, zen: false }));
      }
    };
    window.addEventListener("fullscreenchange", onFullScreenChanged);
    return () => {
      window.removeEventListener("fullscreenchange", onFullScreenChanged);
    };
  }, []);
  const onGroupClicked = (group) => () => {
    setState((state2) => ({ ...state2, group }));
    fire(PlaygroundEventTypes.WIDGET_GROUP_CHANGE, group);
  };
  const onMaxClicked = () => {
    fire(PlaygroundEventTypes.MAXIMIZE);
    setState((state2) => ({ ...state2, maximized: true }));
  };
  const onMinClicked = () => {
    fire(PlaygroundEventTypes.QUIT_MAXIMIZE);
    setState((state2) => ({ ...state2, maximized: false }));
  };
  const onZenClicked = () => {
    fire(PlaygroundEventTypes.ZEN);
    setState((state2) => ({ ...state2, zen: true }));
  };
  const onWindowClicked = () => {
    fire(PlaygroundEventTypes.QUIT_ZEN);
    setState((state2) => ({ ...state2, zen: false }));
  };
  return React.createElement(
    PrimaryToolbar,
    null,
    groups.map(({ icon, tooltip, key: group }) => {
      return React.createElement(ToolbarButton, { icon, tooltip, click: onGroupClicked(group), "data-active": state.group === group, key: group });
    }),
    React.createElement(ToolbarSeparator, null),
    !state.zen && state.maximized ? React.createElement(ToolbarButton, { icon: PlaygroundIcons.MINIMIZE, tooltip: "Quit Maximization", click: onMinClicked }) : null,
    !state.zen && !state.maximized ? React.createElement(ToolbarButton, { icon: PlaygroundIcons.MAXIMIZE, tooltip: "Maximize", click: onMaxClicked }) : null,
    state.zen ? React.createElement(ToolbarButton, { icon: PlaygroundIcons.WINDOW, tooltip: "Quit Zen Mode", click: onWindowClicked }) : React.createElement(ToolbarButton, { icon: PlaygroundIcons.ZEN, tooltip: "Zen Mode", click: onZenClicked })
  );
};
const SecondaryBar = (props) => {
  var _a;
  const { groups, buttons } = props;
  const { on, off } = usePlaygroundEventBus();
  const [state, setState] = reactExports.useState({
    group: ((_a = groups[0]) == null ? void 0 : _a.key) ?? ""
  });
  reactExports.useEffect(() => {
    const onWidgetGroupChange = (group) => {
      setState((state2) => ({ ...state2, group }));
    };
    on(PlaygroundEventTypes.WIDGET_GROUP_CHANGE, onWidgetGroupChange);
    return () => {
      off(PlaygroundEventTypes.WIDGET_GROUP_CHANGE, onWidgetGroupChange);
    };
  }, [on, off]);
  return React.createElement(SecondaryToolbar, null, (buttons[state.group] ?? []).map(({ key, icon, tooltip }) => {
    return React.createElement(ToolbarButton, { icon, tooltip, click: VUtils.noop, key });
  }));
};
const Toolbar = (props) => {
  const { groups, widgets } = props;
  const buttons = widgets.reduce((buttons2, widget) => {
    const { $wt, $key, icon, tooltip, group, notInToolbar } = widget;
    if (notInToolbar)
      ;
    else {
      if (buttons2[group] == null) {
        buttons2[group] = [];
      }
      buttons2[group].push({ key: $key ?? $wt, icon, tooltip: VUtils.isBlank(tooltip) ? $key ?? $wt : tooltip });
    }
    return buttons2;
  }, {});
  return React.createElement(
    ToolbarWrapper,
    null,
    React.createElement(PrimaryBar, { groups }),
    React.createElement(SecondaryBar, { groups, buttons })
  );
};
const EditorWrapper = qe.div.attrs(() => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-editor",
    style: {}
  };
})`
    display: grid;
    position: relative;
    align-self: stretch;
    grid-column: 2;
    grid-template-columns: 1fr;
    overflow: hidden;
`;
const EditorPanel = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-editor-panel" })`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    > div.cm-editor {
        height: 100%;

        &.cm-focused {
            outline: none;
        }

        > div.cm-scroller {
            overflow-x: auto;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                background-color: transparent;
                height: ${CssVars.SCROLL_HEIGHT};
                width: ${CssVars.SCROLL_WEIGHT};
            }

            &::-webkit-scrollbar-track {
                background-color: ${CssVars.SCROLL_TRACK_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }

            &::-webkit-scrollbar-thumb {
                background-color: ${CssVars.SCROLL_THUMB_COLOR};
                border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
            }
        }

        div.cm-line {
            > span.d9-playground-editor-heading.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading1.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading2.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading3.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading4.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading5.d9-playground-editor-processing-instruction,
            > span.d9-playground-editor-heading6.d9-playground-editor-processing-instruction {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_INSTRUCTION_COLOR};
                font-weight: 900;
                font-size: 20px;
            }

            > span.d9-playground-editor-list.d9-playground-editor-processing-instruction {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_INSTRUCTION_COLOR};
                font-weight: 600;
                font-size: 18px;
            }

            span.d9-playground-editor-widget-declaration-icon {
                /** 
				 * cannot use display:none, it leads the problem as below,
				 * 1. select the word before this declaration, 
				 * 2. selection background cannot be calculated correctly.
				 * not sure reason of this problem, and use width: 0 to fix this
				 * and since inline element prevents width from having an effort (which span default is),
				 * change to inline-flex to make sure the width is applied.
				 */
                display: inline-flex;
                width: 0;
                overflow: hidden;
            }

            span.d9-playground-editor-heading.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading,
            span.d9-playground-editor-heading1.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading1,
            span.d9-playground-editor-heading2.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading2,
            span.d9-playground-editor-heading3.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading3,
            span.d9-playground-editor-heading4.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading4,
            span.d9-playground-editor-heading5.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading5,
            span.d9-playground-editor-heading6.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-heading6,
            span.d9-playground-editor-list.d9-playground-editor-processing-instruction ~ span.d9-playground-editor-list {
                &.d9-playground-editor-widget-declaration-splitter,
                &.d9-playground-editor-widget-declaration-attr-splitter {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_SPLITTER_COLOR};
                    margin: 0 4px;
                    font-weight: 600;
                    font-variant: all-small-caps;
                }

                &.d9-playground-editor-widget-declaration-type {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_COLOR};
                }

                &.d9-playground-editor-widget-declaration-headline {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_HEADLINE_COLOR};
                }

                &.d9-playground-editor-widget-declaration-property {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_PROPERTY_COLOR};
                }

                &.d9-playground-editor-widget-declaration-id {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_ID_COLOR};
                }

                &.d9-playground-editor-widget-declaration-flag {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_FLAG_COLOR};
                }

                &.d9-playground-editor-widget-declaration-attr-name {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_NAME_COLOR};
                }

                &.d9-playground-editor-widget-declaration-attr-value-icon {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_VALUE_ICON_COLOR};
                }

                &.d9-playground-editor-widget-declaration-attr-value-str {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_VALUE_STR_COLOR};
                }

                &.d9-playground-editor-widget-declaration-attr-value-ext {
                    color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_VALUE_EXT_COLOR};
                }

                & ~ span.d9-playground-editor-widget-declaration-icon {
                    display: inline-flex;
                    position: relative;
                    align-items: center;
                    justify-content: center;
                    margin-left: 2px;
                    font-weight: 600;
                    font-variant: petite-caps;
                    color: white;
                    border-radius: 4px;
                    width: unset;
                    height: 16px;
                    padding: 0 3px;

                    &.d9-playground-editor-widget-declaration-type-icon {
                        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_TYPE_COLOR};
                    }

                    &.d9-playground-editor-widget-declaration-headline-icon {
                        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_HEADLINE_COLOR};
                    }

                    &.d9-playground-editor-widget-declaration-property-icon {
                        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_PROPERTY_COLOR};
                    }

                    &.d9-playground-editor-widget-declaration-id-icon {
                        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_ID_COLOR};
                    }

                    &.d9-playground-editor-widget-declaration-flag-icon {
                        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_FLAG_COLOR};
                    }

                    &.d9-playground-editor-widget-declaration-attr-name-icon {
                        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_NAME_COLOR};
                    }
                }
            }
        }

        div.cm-panels.cm-panels-bottom {
            border-top: ${CssVars.BORDER};
            border-right: ${CssVars.BORDER};
        }

        div.cm-search.cm-panel {
            /** beautify search panel */
            display: grid;
            position: relative;
            grid-template-columns: auto auto 1fr auto auto auto;
            grid-column-gap: 8px;
            grid-template-rows: auto auto auto;
            grid-row-gap: 8px;

            > * {
                margin: 0;
            }

            > input {
                grid-column: span 3;

                &:not(:first-child) {
                    grid-row: 3;

                    ~ * {
                        grid-row: 3;
                    }
                }
            }

            > button {
                background-image: none;
                border: ${CssVars.BORDER};
                border-radius: ${CssVars.BORDER_RADIUS};
                text-transform: capitalize;
                cursor: pointer;

                &:last-child {
                    padding: 0 8px;
                }
            }

            > label {
                display: flex;
                position: relative;
                align-items: center;
                text-transform: capitalize;

                &:nth-child(7) {
                    grid-column: span 4;
                }

                > input {
                    margin: 0 4px 0 0;
                }
            }

            > br {
                display: none;
            }
        }

        div.cm-tooltip-autocomplete {
            > ul {
                &::-webkit-scrollbar {
                    background-color: transparent;
                    height: ${CssVars.SCROLL_HEIGHT};
                    width: ${CssVars.SCROLL_WEIGHT};
                }

                &::-webkit-scrollbar-track {
                    background-color: ${CssVars.SCROLL_TRACK_COLOR};
                    border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
                }

                &::-webkit-scrollbar-thumb {
                    background-color: ${CssVars.SCROLL_THUMB_COLOR};
                    border-radius: ${CssVars.SCROLL_BORDER_RADIUS};
                }
            }

            span.cm-completionLabel {
                font-weight: 600;
                margin-right: 16px;
            }
        }
    }
`;
const Editor = (props) => {
  const { content, externalDefsTypes, widgets, ...rest } = props;
  const ref = reactExports.useRef(null);
  const contentRef = reactExports.useRef(content ?? "");
  const { fire } = usePlaygroundEventBus();
  const [state, setState] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (ref.current == null) {
      return;
    }
    const editor = new EditorView({
      state: EditorState.create({
        doc: "",
        extensions: [
          basicSetup,
          keymap.of([indentWithTab]),
          d9mlHighlightStyle,
          createD9mlCompletions({ widgets, externalDefsTypes: externalDefsTypes ?? {} }),
          markdown$c({
            base: markdownLanguage,
            extensions: [d9mlExtensions]
          }),
          WidgetDeclarationIconPlugin,
          EditorView.updateListener.of((view) => {
            if (view.docChanged) {
              const doc = view.state.doc;
              const value = doc.toString();
              contentRef.current = value;
              fire(PlaygroundEventTypes.CONTENT_CHANGED, value);
            }
          })
        ]
      }),
      parent: ref.current
    });
    setState((state2) => ({ ...state2, editor }));
    return () => {
      editor.destroy();
    };
  }, [fire, widgets, externalDefsTypes]);
  reactExports.useEffect(() => {
    if (state.editor == null) {
      return;
    }
    state.editor.dispatch({ changes: { from: 0, insert: contentRef.current } });
    fire(PlaygroundEventTypes.CONTENT_INITIALIZED, contentRef.current);
  }, [fire, state.editor]);
  return React.createElement(
    EditorWrapper,
    { ...rest },
    React.createElement(EditorPanel, { ref })
  );
};
const HelpWrapper = qe.div.attrs(() => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-help",
    style: {}
  };
})`
    display: block;
    position: relative;
    grid-column: 2;
    grid-row: 2;
    overflow: hidden;
`;
const Help = () => {
  return React.createElement(HelpWrapper, null);
};
const ViewerWrapper = qe.div.attrs(() => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-viewer",
    style: {}
  };
})`
    display: block;
    position: relative;
    align-self: stretch;
    grid-column: 3;
    grid-row: 1 / span 2;
    overflow: auto;

    > div[data-w=d9-page] {
        margin: 16px;
    }
`;
const ParseError = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-viewer-error" })`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
`;
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content, hasError: false };
  }
  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true, error };
  }
  componentDidCatch(_error, _errorInfo) {
  }
  componentDidUpdate(_prevProps, prevState) {
    if (prevState.content !== this.props.content) {
      this.setState({ content: this.props.content, hasError: false });
    }
  }
  render() {
    if (this.state.hasError) {
      return React.createElement(ParseError, null, "Something went wrong.");
    }
    return this.props.children;
  }
}
const clearExternalDefs = (opts) => {
  if (opts == null || VUtils.isPrimitive(opts) || typeof opts === "function")
    ;
  else if (Array.isArray(opts)) {
    opts.forEach(clearExternalDefs);
  } else if (typeof opts === "object") {
    Object.keys(opts).forEach((key) => {
      const value = opts[key];
      if (value instanceof ExternalDefMismatchIndicator) {
        delete opts[key];
      } else {
        clearExternalDefs(value);
      }
    });
  }
};
const Viewer = (props) => {
  const { mockData, externalDefs } = props;
  const { on, off } = usePlaygroundEventBus();
  const { replace } = useThrottler();
  const [content, setContent] = reactExports.useState("");
  reactExports.useEffect(() => {
    const onContentInitialized = (content2) => {
      setContent(content2 ?? "");
    };
    const onContentChanged = (content2) => {
      replace(() => setContent(content2 ?? ""), 500);
    };
    on(PlaygroundEventTypes.CONTENT_INITIALIZED, onContentInitialized);
    on(PlaygroundEventTypes.CONTENT_CHANGED, onContentChanged);
    return () => {
      off(PlaygroundEventTypes.CONTENT_INITIALIZED, onContentInitialized);
      off(PlaygroundEventTypes.CONTENT_CHANGED, onContentChanged);
    };
  }, [on, off, replace]);
  if (VUtils.isBlank(content)) {
    return React.createElement(
      ViewerWrapper,
      null,
      React.createElement(ParseError, null, "No configuration.")
    );
  }
  try {
    const { node: def } = parseDoc(content);
    const enhancedExternalDefs = {
      onDetermined: (options) => {
        clearExternalDefs(options);
      },
      ...externalDefs ?? {}
    };
    return React.createElement(
      ViewerWrapper,
      null,
      React.createElement(
        ErrorBoundary,
        { content },
        React.createElement(StandaloneRoot, { ...def, "$root": mockData, externalDefs: enhancedExternalDefs })
      )
    );
  } catch (error) {
    return React.createElement(
      ViewerWrapper,
      null,
      React.createElement(ParseError, null, error.message || "Parse error occurred.")
    );
  }
};
const PlaygroundBridge = (props) => {
  const { onContentChanged } = props;
  const { on, off } = usePlaygroundEventBus();
  reactExports.useEffect(() => {
    const onChanged = (content) => {
      (async () => await onContentChanged(content))();
    };
    on(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
    return () => {
      off(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
    };
  }, [on, off, onContentChanged]);
  return React.createElement(reactExports.Fragment, null);
};
const SideSlider = qe.div.attrs(({ active, left }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-side-slider",
    style: {
      left: active ? 0 : utils$1.toCssSize(left),
      width: active ? "100%" : void 0,
      "--handle-left": active ? utils$1.toCssSize(left) : 0
    }
  };
})`
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    cursor: ew-resize;
    z-index: 1;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: var(--handle-left);
        width: 7px;
        height: 100%;
        transition: background-color 300ms ease-in-out;
    }

    &:hover {
        &:before {
            background-color: ${PlaygroundCssVars.SLIDER_BACKGROUND_COLOR};
        }
    }
`;
const Slider = (props) => {
  const { resizeTo } = props;
  const ref = reactExports.useRef(null);
  const [state, setState] = reactExports.useState({ active: false });
  reactExports.useEffect(() => {
    if (ref.current == null) {
      return;
    }
    const { width: editorWidth } = ref.current.parentElement.querySelector("div[data-w=d9-playground-editor]").getBoundingClientRect();
    setState((state2) => ({ ...state2, left: editorWidth + 81 }));
  }, []);
  const onMouseDown = (event) => {
    if (event.button === 0) {
      const { screenX: startX } = event;
      setState((state2) => ({ ...state2, active: true, startX }));
    }
  };
  const onMouseUp = (_event) => {
    setState((state2) => ({ ...state2, active: false }));
  };
  const onMouseMove = (event) => {
    if (!state.active) {
      return;
    }
    const { screenX } = event;
    const newWidth = Math.min(800, Math.max(200, state.left - 81 - state.startX + screenX));
    resizeTo(newWidth);
    setState((state2) => ({ ...state2, startX: screenX, left: newWidth + 81 }));
  };
  return React.createElement(SideSlider, { active: state.active, left: state.left ?? 0, onMouseDown, onMouseUp, onMouseMove, ref });
};
const PlaygroundWrapper = qe.div.attrs(({ editorSize }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground",
    style: {
      "--min-height": "500px",
      "--grid-columns": `auto ${editorSize != null ? utils$1.toCssSize(editorSize) : "min(400px, 40%)"} 1fr`,
      "--grid-rows": "1fr auto"
    }
  };
})`
    display: grid;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    grid-template-columns: var(--grid-columns);
    grid-template-rows: var(--grid-rows);
    min-height: var(--min-height);
    height: var(--min-height);
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;

    &[data-maximized=true]:not([data-visible=false]) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: ${CssVars.BACKGROUND_COLOR};
        border: 0;
        border-radius: 0;
        z-index: ${PlaygroundCssVars.Z_INDEX};
    }

    &[data-visible=false] {
        display: none;
    }
`;
const PlaygroundDelegate = (props) => {
  const { $pp, $wrapped, mockData, externalDefs, externalDefsTypes, widgets, useN2 = true, ...rest } = props;
  const { $p2r, $onValueChange, $avs: { $disabled, $visible } } = $wrapped;
  const { on, off } = usePlaygroundEventBus();
  const ref = reactExports.useRef(null);
  const mockDataRef = reactExports.useRef(null);
  const externalDefRef = reactExports.useRef(null);
  const externalDefsTypesRef = reactExports.useRef(null);
  const globalHandlers = useGlobalHandlers();
  const [state, setState] = reactExports.useState({
    initialized: false,
    maximized: false
  });
  const [layout, setLayout] = reactExports.useState({});
  const [availableWidgets, setAvailableWidgets] = reactExports.useState(() => {
    return {
      groups: computeWidgetGroups((widgets == null ? void 0 : widgets.groups) ?? [], useN2),
      widgets: computeWidgets((widgets == null ? void 0 : widgets.widgets) ?? [], useN2),
      icons: computeIcons((widgets == null ? void 0 : widgets.icons) ?? [], useN2),
      constants: computeConstants((widgets == null ? void 0 : widgets.constants) ?? [], useN2),
      extensions: computeReferences((widgets == null ? void 0 : widgets.extensions) ?? [])
    };
  });
  reactExports.useEffect(() => {
    if (!state.initialized || ref.current == null) {
      return;
    }
    const editor = ref.current.querySelector("div[data-w=d9-playground-editor]");
    const { width } = editor.getBoundingClientRect();
    setLayout({ editorSize: width });
  }, [state.initialized]);
  reactExports.useEffect(() => {
    setAvailableWidgets({
      groups: computeWidgetGroups((widgets == null ? void 0 : widgets.groups) ?? [], useN2),
      widgets: computeWidgets((widgets == null ? void 0 : widgets.widgets) ?? [], useN2),
      icons: computeIcons((widgets == null ? void 0 : widgets.icons) ?? [], useN2),
      constants: computeConstants((widgets == null ? void 0 : widgets.constants) ?? [], useN2),
      extensions: computeReferences((widgets == null ? void 0 : widgets.extensions) ?? [])
    });
  }, [widgets, useN2]);
  reactExports.useEffect(() => {
    if (state.initialized) {
      return;
    }
    (async () => {
      const ask = (given, defaultValue) => async () => {
        let ret;
        if (typeof given === "function") {
          ret = await given();
        } else {
          ret = given;
        }
        return ret ?? defaultValue;
      };
      const [mock, defs, types] = await Promise.all([
        ask(mockData, {})(),
        ask(externalDefs)(),
        ask(externalDefsTypes)()
      ]);
      mockDataRef.current = mock;
      externalDefRef.current = defs;
      externalDefsTypesRef.current = types;
      setState((state2) => ({ ...state2, initialized: true }));
    })();
  }, [state.initialized, mockData, externalDefs, externalDefsTypes]);
  reactExports.useEffect(() => {
    const onMaximize = () => setState((state2) => ({ ...state2, maximized: true }));
    const onQuitMaximize = () => setState((state2) => ({ ...state2, maximized: false }));
    const onZen = () => {
      document.documentElement.requestFullscreen && document.documentElement.requestFullscreen({ navigationUI: "hide" });
      onMaximize();
    };
    const onQuitZen = () => {
      onQuitMaximize();
      document.exitFullscreen && document.exitFullscreen();
    };
    const onFullScreenChanged = () => {
      if (document.fullscreenElement == null) {
        onQuitMaximize();
      }
    };
    window.addEventListener("fullscreenchange", onFullScreenChanged);
    on(PlaygroundEventTypes.MAXIMIZE, onMaximize);
    on(PlaygroundEventTypes.QUIT_MAXIMIZE, onQuitMaximize);
    on(PlaygroundEventTypes.ZEN, onZen);
    on(PlaygroundEventTypes.QUIT_ZEN, onQuitZen);
    return () => {
      window.removeEventListener("fullscreenchange", onFullScreenChanged);
      off(PlaygroundEventTypes.MAXIMIZE, onMaximize);
      off(PlaygroundEventTypes.QUIT_MAXIMIZE, onQuitMaximize);
      off(PlaygroundEventTypes.ZEN, onZen);
      off(PlaygroundEventTypes.QUIT_ZEN, onQuitZen);
    };
  }, [on, off]);
  if (!state.initialized) {
    return null;
  }
  const resizeTo = (width) => setLayout({ editorSize: width });
  const onContentChanged = async (content2) => {
    await $onValueChange(content2, false, { global: globalHandlers });
  };
  const content = MUtils.getValue($wrapped.$model, $pp);
  return React.createElement(
    PlaygroundWrapper,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, "data-maximized": state.maximized, editorSize: layout.editorSize, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref },
    React.createElement(PlaygroundBridge, { onContentChanged }),
    React.createElement(Toolbar, { groups: availableWidgets.groups, widgets: availableWidgets.widgets }),
    React.createElement(Editor, { content, externalDefsTypes: externalDefsTypesRef.current, widgets: availableWidgets }),
    React.createElement(Help, null),
    React.createElement(Viewer, { mockData: mockDataRef.current, externalDefs: externalDefRef.current }),
    React.createElement(Slider, { resizeTo })
  );
};
const Playground = (props) => {
  return React.createElement(
    PlaygroundEventBusProvider,
    null,
    React.createElement(PlaygroundDelegate, { ...props })
  );
};
index$1.ValidatorUtils.registerRegexps({ "abc": /^abc$/ });
const PlaygroundMockDataBuild = index$1.createAsyncSnippetBuild("mockData", []);
const PlaygroundExternalDefsBuild = index$1.createAsyncSnippetBuild("externalDefs", []);
const PlaygroundExternalDefsTypesBuild = index$1.createAsyncSnippetBuild("externalDefsTypes", []);
class AbstractPlaygroundTranslator extends index$1.SpecificWidgetTranslator {
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeValueBuilders() {
    return [
      PlaygroundMockDataBuild,
      PlaygroundExternalDefsBuild,
      PlaygroundExternalDefsTypesBuild
    ];
  }
}
const registerPlayground = (widgetHelper, widgetType) => {
  widgetType = VUtils.isBlank(widgetType) ? "Playground" : widgetType;
  registerWidget({ key: widgetType, JSX: Playground, container: false, array: false });
  const TranslatorClass = class extends AbstractPlaygroundTranslator {
    getSupportedType() {
      return widgetType;
    }
  };
  const repo = widgetHelper.repository;
  repo.register(new TranslatorClass(repo));
};
var define_process_env_default = { GITHUB_STATE: "/home/runner/work/_temp/_runner_file_commands/save_state_d78edd7a-bec9-4407-905f-3dd33f5e41b8", npm_package_scripts_build_n5_ci: "cd ./d9-n5 && yarn build-ci", npm_package_scripts_build_sample_cra: "cd ./d9-sample-cra && yarn build", STATS_TRP: "true", DEPLOYMENT_BASEPATH: "/opt/runner", DOTNET_NOLOGO: "1", npm_package_dependencies__vitejs_plugin_react: "^4.2.1", USER: "runner", npm_config_version_commit_hooks: "true", npm_config_user_agent: "yarn/1.22.21 npm/? node/v18.19.1 linux x64", npm_package_dependencies__types_jest: "^29.5.4", CI: "true", npm_config_bin_links: "true", npm_package_bugs_url: "https://github.com/InsureMO/rainbow-d9/issues", npm_config_wrap_output: "", RUNNER_ENVIRONMENT: "github-hosted", GITHUB_ENV: "/home/runner/work/_temp/_runner_file_commands/set_env_d78edd7a-bec9-4407-905f-3dd33f5e41b8", PIPX_HOME: "/opt/pipx", npm_node_execpath: "/opt/hostedtoolcache/node/18.19.1/x64/bin/node", npm_package_scripts_build_thai_all_ci: "yarn build-thai-plan-selection-ci", npm_config_init_version: "1.0.0", npm_package_devDependencies_gh_pages: "^6.1.1", npm_package_dependencies__babel_plugin_proposal_private_property_in_object: "^7.21.11", JAVA_HOME_8_X64: "/usr/lib/jvm/temurin-8-jdk-amd64", SHLVL: "1", HOME: "/home/runner", OLDPWD: "/home/runner/work/rainbow-d9/rainbow-d9", npm_package_browserslist_production_0: ">0.2%", RUNNER_TEMP: "/home/runner/work/_temp", GITHUB_EVENT_PATH: "/home/runner/work/_temp/_github_workflow/event.json", npm_package_scripts_build_all: "yarn build-n123 && yarn build-n5 && yarn build-echarts && yarn build-thai-all", npm_package_browserslist_production_1: "not dead", npm_package_dependencies_react_syntax_highlighter: "^15.5.0", JAVA_HOME_11_X64: "/usr/lib/jvm/temurin-11-jdk-amd64", PIPX_BIN_DIR: "/opt/pipx_bin", GITHUB_REPOSITORY_OWNER: "InsureMO", npm_package_volta_node: "18.19.0", npm_config_init_license: "MIT", npm_package_browserslist_production_2: "not op_mini all", GRADLE_HOME: "/usr/share/gradle-8.6", ANDROID_NDK_LATEST_HOME: "/usr/local/lib/android/sdk/ndk/26.2.11394342", JAVA_HOME_21_X64: "/usr/lib/jvm/temurin-21-jdk-amd64", STATS_RDCL: "true", GITHUB_RETENTION_DAYS: "90", YARN_WRAP_OUTPUT: "false", npm_package_scripts_build_thai_plan_selection_ci: "cd ./d9-thai-plan-selection && yarn build-ci", npm_package_scripts_build_n1: "cd ./d9-n1 && yarn build", npm_config_version_tag_prefix: "v", npm_package_dependencies__rainbow_d9_n2: "1.0.57", GITHUB_REPOSITORY_OWNER_ID: "38915232", POWERSHELL_DISTRIBUTION_CHANNEL: "GitHub-Actions-ubuntu22", AZURE_EXTENSION_DIR: "/opt/az/azcliextensions", GITHUB_HEAD_REF: "", npm_package_scripts_build_n2: "cd ./d9-n2 && yarn build", npm_package_dependencies__types_styled_components: "^5.1.34", npm_package_dependencies__rainbow_d9_n3: "1.0.57", npm_package_dependencies__rainbow_d9_echarts: "1.0.57", SYSTEMD_EXEC_PID: "603", npm_package_scripts_build_echarts: "cd ./d9-echarts && yarn build", npm_package_scripts_build_n3: "cd ./d9-n3 && yarn build", GITHUB_GRAPHQL_URL: "https://api.github.com/graphql", npm_package_description: "Assume the following envs are ready, otherwise contact the tech guy.", npm_package_scripts_predeploy: "npm run build", npm_package_dependencies__rainbow_d9_n5: "1.0.57", GOROOT_1_20_X64: "/opt/hostedtoolcache/go/1.20.14/x64", NVM_DIR: "/home/runner/.nvm", npm_package_readmeFilename: "README.md", npm_package_scripts_build_n5: "cd ./d9-n5 && yarn build", npm_package_dependencies__types_react: "^18.2.21", npm_package_dependencies__testing_library_react: "^13.4.0", DOTNET_SKIP_FIRST_TIME_EXPERIENCE: "1", GOROOT_1_21_X64: "/opt/hostedtoolcache/go/1.21.8/x64", JAVA_HOME_17_X64: "/usr/lib/jvm/temurin-17-jdk-amd64", ImageVersion: "20240310.1.0", RUNNER_OS: "Linux", GITHUB_API_URL: "https://api.github.com", GOROOT_1_22_X64: "/opt/hostedtoolcache/go/1.22.1/x64", SWIFT_PATH: "/usr/share/swift/usr/bin", RUNNER_USER: "runner", STATS_V3PS: "true", CHROMEWEBDRIVER: "/usr/local/share/chromedriver-linux64", JOURNAL_STREAM: "8:19552", GITHUB_WORKFLOW: "Publish to NPM", _: "/opt/hostedtoolcache/node/18.19.1/x64/bin/yarn", npm_package_private: "true", npm_package_dependencies_remark_gfm: "3.0.1", npm_package_scripts_build_thai_all: "yarn build-thai-plan-selection", npm_config_registry: "https://registry.yarnpkg.com", ACTIONS_RUNNER_ACTION_ARCHIVE_CACHE: "/opt/actionarchivecache", STATS_D: "false", GITHUB_RUN_ID: "8313063131", npm_package_workspaces_0: "d9-n1", GITHUB_REF_TYPE: "tag", BOOTSTRAP_HASKELL_NONINTERACTIVE: "1", GITHUB_WORKFLOW_SHA: "b2b9c4f0c3fc67743b43ff947f6906d7bb35541a", GITHUB_BASE_REF: "", ImageOS: "ubuntu22", npm_package_scripts_build_n123_ci: "yarn build-n1-ci && yarn build-n2-ci && yarn build-n3-ci", npm_package_workspaces_1: "d9-n2", npm_config_ignore_scripts: "", npm_package_scripts_start: "vite", npm_package_dependencies_github_markdown_css: "^5.5.0", GITHUB_WORKFLOW_REF: "InsureMO/rainbow-d9/.github/workflows/release.yml@refs/tags/r-1.0.58", PERFLOG_LOCATION_SETTING: "RUNNER_PERFLOG", GITHUB_ACTION_REPOSITORY: "", npm_package_workspaces_2: "d9-n3", npm_package_browserslist_development_0: "last 1 chrome version", PATH: "/tmp/yarn--1710651708724-0.6936684803089577:/home/runner/work/rainbow-d9/rainbow-d9/d9-sample-cra/node_modules/.bin:/home/runner/.config/yarn/link/node_modules/.bin:/home/runner/work/rainbow-d9/rainbow-d9/node_modules/.bin:/opt/hostedtoolcache/node/18.19.1/x64/libexec/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.19.1/x64/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.19.1/x64/bin/node_modules/npm/bin/node-gyp-bin:/tmp/yarn--1710651708521-0.8142917263948972:/home/runner/work/rainbow-d9/rainbow-d9/node_modules/.bin:/home/runner/.config/yarn/link/node_modules/.bin:/home/runner/work/rainbow-d9/rainbow-d9/node_modules/.bin:/opt/hostedtoolcache/node/18.19.1/x64/libexec/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.19.1/x64/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.19.1/x64/bin/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.19.1/x64/bin:/snap/bin:/home/runner/.local/bin:/opt/pipx_bin:/home/runner/.cargo/bin:/home/runner/.config/composer/vendor/bin:/usr/local/.ghcup/bin:/home/runner/.dotnet/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin", NODE: "/opt/hostedtoolcache/node/18.19.1/x64/bin/node", ANT_HOME: "/usr/share/ant", DOTNET_MULTILEVEL_LOOKUP: "0", RUNNER_TRACKING_ID: "github_370c3829-a733-4222-97e2-b078530d01c5", INVOCATION_ID: "60db059d5acf48f79bd28a741d526237", RUNNER_TOOL_CACHE: "/opt/hostedtoolcache", npm_package_name: "@rainbow-d9/sample-cra", npm_package_workspaces_3: "d9-n5", npm_package_browserslist_development_1: "last 1 firefox version", npm_package_repository_type: "git", npm_package_dependencies__types_react_syntax_highlighter: "^15.5.11", npm_package_dependencies__rainbow_d9_thai_plan_selection: "1.0.57", GITHUB_ACTION: "__run_5", GITHUB_RUN_NUMBER: "81", GITHUB_TRIGGERING_ACTOR: "bradwoo8621", RUNNER_ARCH: "X64", XDG_RUNTIME_DIR: "/run/user/1001", AGENT_TOOLSDIRECTORY: "/opt/hostedtoolcache", npm_package_scripts_build_thai_plan_selection: "cd ./d9-thai-plan-selection && yarn build", npm_package_workspaces_4: "d9-echarts", npm_package_browserslist_development_2: "last 1 safari version", npm_package_workspaces_5: "d9-thai-plan-selection", LANG: "C.UTF-8", VCPKG_INSTALLATION_ROOT: "/usr/local/share/vcpkg", npm_package_workspaces_6: "d9-sample-cra", npm_package_dependencies_react_dom: "^18.2.0", CONDA: "/usr/share/miniconda", RUNNER_NAME: "GitHub Actions 15", XDG_CONFIG_HOME: "/home/runner/.config", STATS_VMD: "true", GITHUB_REF_NAME: "r-1.0.58", GITHUB_REPOSITORY: "InsureMO/rainbow-d9", npm_lifecycle_script: "vite build", npm_package_eslintConfig_extends_0: "react-app", npm_package_dependencies_vite_plugin_markdown: "^2.2.0", npm_package_dependencies_react_markdown: "8.0.7", npm_package_dependencies__types_node: "^20.5.3", STATS_UE: "true", ANDROID_NDK_ROOT: "/usr/local/lib/android/sdk/ndk/25.2.9519653", GITHUB_ACTION_REF: "", DEBIAN_FRONTEND: "noninteractive", npm_package_scripts_build_sample_cra_ci: "cd ./d9-sample-cra && yarn build", npm_config_version_git_message: "v%s", npm_package_eslintConfig_extends_1: "react-app/jest", GITHUB_REPOSITORY_ID: "704514093", GITHUB_ACTIONS: "true", npm_lifecycle_event: "build", npm_package_version: "1.0.57", npm_package_repository_url: "git+https://github.com/InsureMO/rainbow-d9.git", npm_package_dependencies__testing_library_jest_dom: "^5.17.0", GITHUB_REF_PROTECTED: "false", npm_config_argv: '{"remain":[],"cooked":["run","build-sample-cra"],"original":["build-sample-cra"]}', npm_package_volta_yarn: "1.22.21", npm_package_scripts_build: "vite build", npm_package_dependencies__testing_library_user_event: "^13.5.0", GITHUB_WORKSPACE: "/home/runner/work/rainbow-d9/rainbow-d9", ACCEPT_EULA: "Y", GITHUB_JOB: "create-sample-pages", RUNNER_PERFLOG: "/home/runner/perflog", npm_package_dependencies_vite: "^5.0.12", GITHUB_SHA: "b2b9c4f0c3fc67743b43ff947f6906d7bb35541a", GITHUB_RUN_ATTEMPT: "1", npm_config_version_git_tag: "true", npm_config_version_git_sign: "", GITHUB_REF: "refs/tags/r-1.0.58", GITHUB_ACTOR: "bradwoo8621", ANDROID_SDK_ROOT: "/usr/local/lib/android/sdk", npm_package_license: "MIT", npm_config_strict_ssl: "true", LEIN_HOME: "/usr/local/lib/lein", npm_package_scripts_build_n123: "yarn build-n1 && yarn build-n2 && yarn build-n3", GITHUB_PATH: "/home/runner/work/_temp/_runner_file_commands/add_path_d78edd7a-bec9-4407-905f-3dd33f5e41b8", JAVA_HOME: "/usr/lib/jvm/temurin-11-jdk-amd64", PWD: "/home/runner/work/rainbow-d9/rainbow-d9/d9-sample-cra", GITHUB_ACTOR_ID: "2330098", RUNNER_WORKSPACE: "/home/runner/work/rainbow-d9", npm_execpath: "/opt/hostedtoolcache/node/18.19.1/x64/lib/node_modules/yarn/bin/yarn.js", npm_package_scripts_build_all_ci: "yarn build-n123-ci && yarn build-n5-ci && yarn build-echarts-ci && yarn build-thai-all-ci", HOMEBREW_CLEANUP_PERIODIC_FULL_DAYS: "3650", STATS_TIS: "mining", GITHUB_EVENT_NAME: "push", HOMEBREW_NO_AUTO_UPDATE: "1", ANDROID_HOME: "/usr/local/lib/android/sdk", GITHUB_SERVER_URL: "https://github.com", GECKOWEBDRIVER: "/usr/local/share/gecko_driver", LEIN_JAR: "/usr/local/lib/lein/self-installs/leiningen-2.11.2-standalone.jar", GHCUP_INSTALL_BASE_PREFIX: "/usr/local", GITHUB_OUTPUT: "/home/runner/work/_temp/_runner_file_commands/set_output_d78edd7a-bec9-4407-905f-3dd33f5e41b8", npm_package_author_name: "Rainbow Team", EDGEWEBDRIVER: "/usr/local/share/edge_driver", STATS_EXT: "true", npm_package_scripts_build_n1_ci: "cd ./d9-n1 && yarn build-ci", npm_config_save_prefix: "^", npm_config_ignore_optional: "", ANDROID_NDK: "/usr/local/lib/android/sdk/ndk/25.2.9519653", SGX_AESM_ADDR: "1", CHROME_BIN: "/usr/bin/google-chrome", npm_package_scripts_build_n2_ci: "cd ./d9-n2 && yarn build-ci", npm_package_scripts_deploy: "gh-pages -d build", npm_package_scripts_preview: "vite preview", SELENIUM_JAR_PATH: "/usr/share/java/selenium-server.jar", STATS_EXTP: "https://provjobdsettingscdn.blob.core.windows.net/settings/provjobdsettings-0.5.154/provjobd.data", npm_package_scripts_build_echarts_ci: "cd ./d9-echarts && yarn build-ci", npm_package_scripts_build_n3_ci: "cd ./d9-n3 && yarn build-ci", npm_package_dependencies_web_vitals: "^2.1.4", npm_package_dependencies_typescript: "^5.1.6", INIT_CWD: "/home/runner/work/rainbow-d9/rainbow-d9", ANDROID_NDK_HOME: "/usr/local/lib/android/sdk/ndk/25.2.9519653", GITHUB_STEP_SUMMARY: "/home/runner/work/_temp/_runner_file_commands/step_summary_d78edd7a-bec9-4407-905f-3dd33f5e41b8", npm_package_dependencies_react: "^18.2.0", npm_package_dependencies__types_react_dom: "^18.2.7", NODE_ENV: "production" };
dayjs.extend(WeekOfYear);
dayjs.extend(QuarterOfYear);
dayjs.extend(Duration);
dayjs.extend(IsToday);
dayjs.extend(RelativeTime);
dayjs.extend(ArraySupport);
dayjs.extend(ObjectSupport);
dayjs.extend(CustomParseFormat);
dayjs.extend(UTC);
dayjs.extend(BuddhistEra);
(() => {
  if (define_process_env_default.VITE_ENABLE_D9_LOGGER === "true") {
    N1Logger.enableLevel("debug");
  }
  const widgetsHelper = index$1.createOrGetTranslateHelperSingleton();
  registerN2Widgets(widgetsHelper);
  registerCharts(widgetsHelper);
  registerPlanSelect(widgetsHelper);
  registerPlayground(widgetsHelper);
  utils$2.setCalendarDefaults({
    dateFormat: "DD/MM/YYYY",
    // timeFormat: askDisplayTimeFormat(),
    // datetimeFormat: askDateTimeFormat(),
    useCalendarIcon: true
  });
})();
window.VUtils = VUtils;
window.PPUtils = PPUtils;
window.MUtils = MUtils;
const first = [
  120,
  200,
  150,
  80,
  70,
  110,
  130
];
const second = [
  {
    value: 40,
    name: "Mon"
  },
  {
    value: 38,
    name: "Tue"
  },
  {
    value: 32,
    name: "Wed"
  },
  {
    value: 30,
    name: "Thu"
  },
  {
    value: 28,
    name: "Fri"
  },
  {
    value: 26,
    name: "Sat"
  },
  {
    value: 22,
    name: "Sun"
  }
];
const third = {
  criteria: {
    weekOfYear: 2,
    gender: "F"
  },
  data: [
    {
      value: 40,
      name: "Mon"
    },
    {
      value: 38,
      name: "Tue"
    },
    {
      value: 32,
      name: "Wed"
    },
    {
      value: 30,
      name: "Thu"
    },
    {
      value: 28,
      name: "Fri"
    },
    {
      value: 26,
      name: "Sat"
    },
    {
      value: 22,
      name: "Sun"
    }
  ]
};
const DemoData$a = {
  first,
  second,
  third
};
const markdown$b = "# Page::Demo Tab\n\n## Section::# 10. ECharts\n\n### Section::## 10.1 Simple Charts\n\n- Chart::Use Canvas, Default::first\n	- $fc\n	- options:\n	  ```javascript\n	  return {\n	    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},\n	    yAxis: {type: 'value'},\n	    series: [{type: 'bar'}]\n	  }\n	  ```\n	- merge:\n	  ```javascript\n	  options.series[0].data = data;\n	  return options;\n	  ```\n- Chart::Use SVG::first\n	- $fc\n	- initOptions:\n	  ```javascript\n	  return { renderer: 'svg' };\n	  ```\n	- options:\n	  ```javascript\n	  return {\n	    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},\n	    yAxis: {type: 'value'},\n	    series: [{type: 'bar'}]\n	  }\n	  ```\n	- merge:\n	  ```javascript\n	  options.series[0].data = data;\n	  return options;\n	  ```\n\n### Section::## 10.2 Autonomous Chart\n\n- AutChart::Refresh every 1 second::second\n	- $fc\n	- options:\n	  ```javascript\n	  return {\n	    legend: {top: 'bottom'},\n	    series: [\n	      {\n	        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',\n	        itemStyle: { borderRadius: 8 }\n	      }\n	    ]\n	  }\n	  ```\n	- merge:\n	  ```javascript\n	  options.series[0].data = data;\n	  return options;\n	  ```\n	- fetch:\n	  ```typescript\n	  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {\n	    return { value: Math.ceil(Math.random() * 30) + 20, name };\n	  });\n	  ```\n	- interval: 1\n\n### Section::## 10.3 Chart on External Data\n\n- data-rows-auto-1fr: true\n\n- Dropdown::Month::third.criteria.weekOfYear\n	- options: 1:Jan; 2:Feb; 3:Mar; 4:Apr; 5:May; 6:Jun; 7:Jul; 8:Aug; 9:Sep; 10:Oct; 11:Nov; 12:Dec\n	- place: $row: 1, $col: 1, $cols: 3\n- Dropdown::Gender::third.criteria.gender\n	- options: F:Female;M:Male\n	- place: $row: 2, $col: 1, $cols: 3\n- RelChart::::third.data\n	- place: $row: 1, $rows: 2, $col: 4, $cols: 3\n	- options:\n	  ```javascript\n	  return {\n	    legend: {top: 'bottom'},\n	    series: [\n	      {\n	        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',\n	        itemStyle: { borderRadius: 8 }\n	      }\n	    ]\n	  }\n	  ```\n	- merge:\n	  ```javascript\n	  options.series[0].data = data;\n	  return options;\n	  ```\n	- fetch:\n	  ```typescript\n	  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {\n	    return { value: Math.ceil(Math.random() * 30) + 20, name };\n	  });\n	  ```\n	- criteria:\n		- on: /third.criteria.**";
use([
  install,
  install$1,
  install$2,
  install$3,
  install$4,
  install$5,
  installLabelLayout,
  installUniversalTransition,
  install$6,
  install$7
]);
const ECharts = () => {
  const def = useDemoMarkdown(markdown$b);
  const externalDefs = {
    mergeData: {
      first: (options, data) => {
        return {
          xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
          yAxis: { type: "value" },
          series: [
            { data, type: "bar" }
          ]
        };
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$a, externalDefs })
  ] });
};
const EChartsData = DemoData$a;
const EChartsMarkdown = markdown$b;
const ribs = [
  {
    propA: "Property A 1 @ribs",
    propB: "Property B 1 @ribs"
  },
  {
    propA: "Property A 2 @ribs",
    propB: "Property B 2 @ribs"
  }
];
const DemoData$9 = {
  ribs
};
const markdown$a = "# Page::Demo Tab\n\n## Section::# 4. Array Panel\n\n### Ribs::::ribs\n\n- removable, addable, disableOnCannotAdd\n- elementTitle:\n	- labelOnValue\n	- property: propA\n- couldAddElement: @ext.couldAddElement\n- Input::Property A::propA\n- Input::Property B::propB\n";
const N2ArrayPanel = () => {
  const def = useDemoMarkdown(markdown$a);
  const externalDefs = {
    couldAddElement: async (options, _handlers) => {
      return (options.model ?? []).length < 5;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$9, externalDefs })
  ] });
};
const N2ArrayPanelData = DemoData$9;
const N2ArrayPanelMarkdown = markdown$a;
const title = "Hello, I am a demo dialog.";
const propA = "Property A @root";
const decorateInput = "123";
const caption = "Some Caption";
const nested = {
  propA: "Property A @nested"
};
const DemoData$8 = {
  title,
  propA,
  decorateInput,
  caption,
  nested
};
const markdown$9 = "# Page::Demo Tab\n\n## Section::# 1. Basic Widgets\n\n- collapsible\n- marker: basic-widgets\n- DecoInput::Decorate Input::decorateInput\n	- label:\n		- labelOnValue\n		- property: decorateInput\n		- leads: Yes:\n	- leads: Hello\n	- tails: World\n	- regex: abc$,^def; must be abc or def.\n	- validateScopes: s1\n- DecoNumber::Decorate Number Input::decorateNumberInput\n	- label:\n		- valueToLabel: `'Hello world, again.'`\n	- leads: $icons.check;$\n	- tails: %;$icons.caretLeft\n	- numeric\n- DecoNumber::0 - 9 are Legal Keys::decorateNumberInput2\n	- leads: $icons.check;$\n	- tails: %;$icons.caretLeft\n	- numeric\n	- onKeyDown: @ext.keydown.numeric\n- Checkbox::A Checkbox::aCheckbox\n- Radio::A Radio::aRadio\n- Dropdown::::dropdown\n	- label: Dropdown\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n- Dropdown::::dropdown2\n	- label: Dropdown #2\n	- options: @ext.dropdown2\n- MultiDropdown::Multiple Dropdown::multiDropdown\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: A very very very very very very very very very very very very very very very very very very long Option #3\n		- 4: Option #4\n		- 5: Option #5\n- DateTime::Buddhist Era::buddhistEra\n	- dateFormat: BBBB/MM/DD\n	- timeFormat: HH\n- Label::A Label::label\n	- valueToLabel: `'Hello World'`\n	- leads: $icons.check;$\n	- tails: %;$icons.caretLeft\n- Caption::A Caption::caption\n	- $fc\n	- text: Hello World\n- Caption::A Caption::caption\n	- $fc\n	- valueToLabel: `'Caption is [' + value + ']'`\n- Radios::Radio Group::radios1\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: Option #3\n		- 4: Option #4\n		- 5: A very very very very very very very very very very very very very very very very very very long Option #5\n	- place: 6\n	- columns: 4\n- Checks::Checkbox Group::checks1\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: Option #3\n		- 4: Option #4\n		- 5: A very very very very very very very very very very very very very very very very very very long Option #5\n	- place: 6\n	- columns: 4\n- Checks::Checkbox Group::checks2\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: Option #3\n		- 4: Option #4\n	- single\n- Button::\n	- text: Validate Inputs\n	- click: validate s1\n\n";
const N2BasicWidgets = () => {
  const def = useDemoMarkdown(markdown$9);
  const externalDefs = {
    keydown: {
      numeric: (event) => {
        console.log(`Key event[key=${event.key}, code=${event.code}] capture.`);
        if (!["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(event.key)) {
          event.preventDefault();
          return false;
        }
      }
    },
    dropdown2: async (_options) => {
      return [
        { value: "1", label: "Option #1" },
        { value: "2", label: "Option #2" }
      ];
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$8, externalDefs })
  ] });
};
const N2BasicWidgetsData = DemoData$8;
const N2BasicWidgetsMarkdown = markdown$9;
const section1Title = "# 2.1. First Section, Buttons to Open Demo Dialog";
const DemoData$7 = {
  section1Title
};
const markdown$8 = "# Page::Demo Tab\n\n## Section::\n\n- title:\n	- labelOnValue\n	- property: section1Title\n- ButtonBar::::\n	- alignment: left\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.remove\n		- disabled\n	- Button::::\n		- fill: plain\n		- click: dialog:demo-dialog\n		- leads: $icons.check\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.times\n		- ink: danger\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.back\n		- fill: plain\n		- ink: danger\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.arrowDown\n		- ink: success\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.caretDown\n		- fill: plain\n		- ink: success\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.caretLeft\n		- ink: warn\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.caretRight\n		- fill: plain\n		- ink: warn\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.collapse\n		- ink: info\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.expand\n		- fill: plain\n		- ink: info\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.spinner\n		- ink: waive\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.time\n		- fill: plain\n		- ink: waive\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.date\n		- fill: plain\n		- ink: primary\n		- disabled\n- ButtonBar::::\n	- alignment: left\n	- Button::::\n		- text: Open Demo Dialog\n		- click: dialog:demo-dialog\n		- leads: [\n		- tails: ]\n	- Button::::\n		- text: Open Demo Dialog\n		- click: dialog:demo-dialog\n		- fill: fill\n		- ink: success\n		- leads: $icons.check;$\n		- disabled\n	- Button::::\n		- text: Open Demo Alert\n		- click: alert: Hello, this is a demo alert.\n		- ink: waive\n		- leads: $icons.check;$\n- ButtonBar::::\n	- alignment: left\n	- Button::::\n		- text: Open Demo Dialog\n		- click: dialog:demo-dialog\n		- fill: plain\n		- ink: danger\n		- leads: $icons.check;$\n		- tails: %;$icons.caretLeft\n		- disabled\n	- Button::::\n		- text: Print in Console\n		- click:\n		  ```javascript\n		  console.log(options);\n		  ```\n		- fill: plain\n		- ink: info\n		- leads: $icons.check;$\n- ButtonBar::::\n	- alignment: left\n	- Button::::\n		- text: Open Demo Dialog\n		- click: dialog:demo-dialog\n		- fill: link\n		- ink: warn\n		- leads: $icons.check;$\n		- disabled\n	- Button::::\n		- text: Open Native Alert\n		- click: custom:custom-alert\n		- fill: link\n		- ink: waive\n		- leads: $icons.check;$\n\n## Section::# 2.2. Last Section, Bottom Bar\n\n- ButtonBar::::\n	- alignment: right\n	- Button::::\n		- text: Exit";
const N2Buttons = () => {
  const def = useDemoMarkdown(markdown$8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$7 })
  ] });
};
const N2ButtonsData = DemoData$7;
const N2ButtonsMarkdown = markdown$8;
const pagination$1 = {
  pageNumber: 2,
  pageCount: 15,
  pageSize: 20,
  itemCount: 286
};
const DemoData$6 = {
  pagination: pagination$1
};
const markdown$7 = "# Page::Demo Tab\n\n## Section::# 8. Internationalization\n\n- Input::Test1::test1\n	- required\n- Dropdown::Test2::test2\n	- required: Test 2 is required.\n	- options:\n		- F: Female\n		- M: Male\n- Pagination::::pagination\n	- freeWalk\n	- sizes: 10;20;30\n";
$d9n2.intl.labels["zh"] = {
  "# 8. Internationalization": "# 8. 国际化",
  Test1: "测试1",
  Test2: "测试2",
  Female: "女",
  Male: "男",
  "Field is required.": "字段不能为空.",
  "Test 2 is required.": "测试2不能为空.",
  pagination: {
    page: "第",
    of: "页, 共",
    pages: "页,",
    afterSize: "行每页,",
    total: "共",
    unknownItemCount: "???",
    items: "行."
  }
};
const Languages = () => {
  const { fire } = useGlobalEventBus();
  const onEnClicked = () => {
    $d9n2.intl.language = "en-US";
    fire(GlobalEventTypes.LANGUAGE_CHANGED, "en-US");
  };
  const onZhClicked = () => {
    $d9n2.intl.language = "zh";
    fire(GlobalEventTypes.LANGUAGE_CHANGED, "zh");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(UnwrappedButtonBar, { alignment: ButtonBarAlignment.CENTER, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(UnwrappedButton, { onClick: onEnClicked, children: "EN" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UnwrappedButton, { onClick: onZhClicked, children: "ZH" })
  ] });
};
const N2Intl = () => {
  const def = useDemoMarkdown(markdown$7);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$6 })
  ] });
};
const N2IntlData = DemoData$6;
const N2IntlMarkdown = markdown$7;
const a = "";
const b = "b";
const clearMe = "something";
const DemoData$5 = {
  a,
  b,
  clearMe
};
const markdown$6 = "# Page::Demo Tab\n\n## Section::# 7. Monitors\n\n- Input::Property A::a\n- Input::Shadow of Property A::a\n	- disabled\n	- repaint:\n		- on: a\n- Input::Clear Me when Property A Changed::clearMe\n	- disabled\n	- clearMe:\n		- on: a\n- Input::Last 2 Chars of Property A::last2Chars\n	- disabled\n	- watch:\n		- on: a\n		- handle:\n		  ```javascript\n		  model.last2Chars = model.a.slice(-2);\n          return 'repaint';\n		  ```\n- Input::Property B, Disabled When \"A\" Is Empty::b\n	- place: 2, 1\n	- disabled:\n		- on: a\n		- handle: if ((model.a ?? '').length === 0) {\n		  return true;\n		  } else {\n		  return false;\n		  }\n- Input::Property C, Invisible When \"A\" Is Empty::c\n	- place: 3, 1\n	- visible:\n		- on: a\n		- handle:\n		  ```javascript\n		  if ((model.a ?? '').length === 0) {\n		    return false;\n		  } else {\n		    return true;\n		  }\n		  ```\n- Input::Property D::d\n	- place: 4, 1\n	- required\n	- validate:\n		- on: a\n		- handle:\n		  ```javascript\n		  if (VUtils.isBlank(model.a)) {\n		    return value === 'blank' ? {valid: true}: {valid:false, failReason: 'A is blank, D should be \"blank\".'};\n		  } else if (VUtils.isNumber(model.a).test) {\n		    return value === 'number' ? {valid: true}: {valid:false, failReason: 'A is number, D should be \"number\".'};\n		  } else {\n		    return value === 'string' ? {valid: true}: {valid:false, failReason: 'A is string, D should be \"string\"'};\n		  }       \n		  ```\n- Input::Property X::x\n	- place: 5, 1\n	- watch:\n		- on: x\n		- handle:\n		  ```javascript\n		  const oldValue = model.y;\n		  model.y = `${model.x} and y`;\n		  console.log(`[${oldValue}]`, `[${model.y}]`)\n		  return ['value-changed', {path: '/y', from: oldValue, to: model.y}]\n		  ```\n- Input::Property Y::y\n	- place: 5, 4\n	- visible:\n		- on: y\n		- handle: `return (model.y ?? '').startsWith('123')`";
const N2Monitors = () => {
  const def = useDemoMarkdown(markdown$6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$5 })
  ] });
};
const N2MonitorsData = DemoData$5;
const N2MonitorsMarkdown = markdown$6;
const markdown$5 = "# Page::Test Page\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
const DemoData$4 = {
  markdown: markdown$5
};
const markdown$4 = "# Page::Demo Tab\n\n## Section::# 999. D9 Playground\n\n- Playground::::markdown\n  - externalDefsTypes: @ext.playground.externalDefsTypes\n";
const N2Playground = () => {
  const def = useDemoMarkdown(markdown$4);
  const externalDefs = {
    playground: {
      externalDefs: {
        codes: async () => {
          return [
            { value: "01", label: "Option 01" },
            { value: "02", label: "Option 02" }
          ];
        },
        staticCodes: {
          gender: [
            { value: "F", label: "Female" },
            { value: "M", label: "Male" }
          ]
        }
      },
      externalDefsTypes: {
        codes: { $wt: "Dropdown", properties: ["options"], label: "Retrieve available options from remote." },
        staticCodes: {
          gender: { $wt: "Dropdown", properties: ["options"], label: "Gender options." }
        }
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalRoot, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$4, externalDefs }) });
};
const PlaygroundData = DemoData$4;
const PlaygroundMarkdown = markdown$4;
const nestedTables = [
  {
    columnA: "Value of Column A, Row #1",
    nested: [
      {
        columnNA: "Value of Column A, Row #1.1"
      },
      {
        columnNA: "Value of Column A, Row #1.2"
      }
    ]
  },
  {
    columnA: "Value of Column A, Row #2"
  },
  {
    columnA: "Value of Column A, Row #3"
  },
  {
    columnA: "Value of Column A, Row #4"
  },
  {
    columnA: "Value of Column A, Row #5"
  },
  {
    columnA: "Value of Column A, Row #6"
  },
  {
    columnA: "Value of Column A, Row #7"
  },
  {
    columnA: "Value of Column A, Row #8"
  },
  {
    columnA: "Value of Column A, Row #9"
  },
  {
    columnA: "Value of Column A, Row #10"
  },
  {
    columnA: "Value of Column A, Row #11"
  },
  {
    columnA: "Value of Column A, Row #12"
  },
  {
    columnA: "Value of Column A, Row #13"
  },
  {
    columnA: "Value of Column A, Row #14"
  },
  {
    columnA: "Value of Column A, Row #15"
  },
  {
    columnA: "Value of Column A, Row #16",
    nested: [
      {
        columnNA: "Value of Column A, Row #16.1"
      },
      {
        columnNA: "Value of Column A, Row #16.2"
      },
      {
        columnNA: "Value of Column A, Row #16.3"
      },
      {
        columnNA: "Value of Column A, Row #16.4"
      },
      {
        columnNA: "Value of Column A, Row #16.5"
      },
      {
        columnNA: "Value of Column A, Row #16.6"
      },
      {
        columnNA: "Value of Column A, Row #16.7"
      },
      {
        columnNA: "Value of Column A, Row #16.8"
      },
      {
        columnNA: "Value of Column A, Row #16.9"
      },
      {
        columnNA: "Value of Column A, Row #16.10"
      },
      {
        columnNA: "Value of Column A, Row #16.11"
      },
      {
        columnNA: "Value of Column A, Row #16.12"
      },
      {
        columnNA: "Value of Column A, Row #16.13"
      },
      {
        columnNA: "Value of Column A, Row #16.14"
      },
      {
        columnNA: "Value of Column A, Row #16.15"
      },
      {
        columnNA: "Value of Column A, Row #16.16"
      },
      {
        columnNA: "Value of Column A, Row #16.17"
      },
      {
        columnNA: "Value of Column A, Row #16.18"
      },
      {
        columnNA: "Value of Column A, Row #16.19"
      },
      {
        columnNA: "Value of Column A, Row #16.20"
      },
      {
        columnNA: "Value of Column A, Row #16.21"
      }
    ]
  }
];
const page = {
  pageNumber: 1,
  pageCount: 3,
  pageSize: 6,
  itemCount: 16
};
const pagination = {
  pageNumber: 2,
  pageCount: 15,
  pageSize: 20,
  itemCount: 286
};
const table2 = [];
const sectionForTable3 = {};
const DemoData$3 = {
  nestedTables,
  page,
  pagination,
  table2,
  sectionForTable3
};
const markdown$3 = "# Page::Demo Tab\n\n## Section::# 3.1. Table\n\n### Table\n\n- property: nestedTables\n- expandable, clickToExpand, addable, removable, !hideClassicCellsOnExpandable\n- omitDefaultRowOperators\n- addLabel: Add New One\n- maxBodyHeight: 400\n- fixedLeadColumns: 1\n- fixedTailColumns: 1\n- operatorsColumnWidth: 200\n- headers:\n	- Column A: 300\n	- Column B: 300\n	- Column C: 500\n	- Column D: 200\n	- Column E: 200\n	- Column F: 200\n	- Column G: 100\n- Label::::columnA\n- Caption::::\n	- label: Say Hello to World\n	- click: alert: Hello World!\n	- fill: link\n- Label::::columnC\n- Label::::columnD\n- Label::::columnE\n- Label::::columnF\n- Label::::columnG\n- Table::\n	- property: nested\n	- headers:\n		- Nest Column A: 300\n		- Nest Column B: 300\n	- Label::::columnNA\n	- Label::::columnNB\n- RowOperators::\n	- Button::\n		- text: X\n		- fill: plain\n		- click: alert: X\n	- Button::\n		- fill: plain\n		- tails: $icons.view\n		- click: alert: View\n	- Button::\n		- fill: plain\n		- tails: $icons.edit\n		- click: alert: Edit\n	- Button::\n		- fill: plain\n		- tails: $icons.remove\n		- prebuilt: remove\n	- Button::\n		- fill: plain\n		- tails: $icons.expand\n		- prebuilt: expand\n	- Button::\n		- fill: plain\n		- tails: $icons.collapse\n		- prebuilt: collapse\n- Pagination::::page\n	- maxButtons: 3\n\n## Section::# 3.2. Pagination\n\n- Pagination::::pagination\n	- freeWalk\n	- sizes: 10;20;30\n\n## Section::# 3.3. Remote Table\n\n### Table::\n\n- property: table2\n- headers:\n	- Column A: 300\n- Label::::columnA\n- Pagination::::page2\n	- freeWalk\n	- maxButtons: 3\n	- sizes: 6;9;12\n	- valueChanged: @ext.table2.onPageChanged\n\n## Section::# 3.4. Table 3\n\n- property: sectionForTable3\n\n### Table::\n\n- property: table3\n- addable\n- repaint:\n	- on: table3\n- headers:\n	- Column A: 300\n- Label::::columnA\n\n### Button::::\n\n- text: Add Row Into Table3\n- click: @ext.table3.addRow\n";
DemoData$3.table2 = DemoData$3.nestedTables.filter((_, index2) => index2 < 5);
DemoData$3.page2 = JSON.parse(JSON.stringify(DemoData$3.page));
const InternalN2Table = () => {
  const def = useDemoMarkdown(markdown$3);
  const { fire } = useBridgeEventBus();
  const externalDefs = {
    table2: {
      onPageChanged: async (options) => {
        const { newValue: { pageNumber, pageSize } } = options;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize - 1;
        DemoData$3.table2 = DemoData$3.nestedTables.filter((_, index2) => index2 >= startIndex && index2 <= endIndex);
      }
    },
    table3: {
      addRow: () => {
        const carrier = DemoData$3.sectionForTable3;
        if (carrier.table3 == null) {
          carrier.table3 = [{ columnA: nanoid() }];
        } else {
          carrier.table3.push({ columnA: nanoid() });
        }
        fire(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, {
          absolutePath: "/sectionForTable3.table3",
          from: carrier.table3,
          to: carrier.table3
        });
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$3, externalDefs })
  ] });
};
const N2Table = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BridgeEventBusProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InternalN2Table, {}) });
};
const N2TableData = DemoData$3;
const N2TableMarkdown = markdown$3;
const tabs = {
  tab1: {
    tab1Input1: "hello"
  },
  tab2: {
    count: 147,
    tab2check1: true
  },
  tab4: {
    tab4Input: "Tab4 world."
  }
};
const DemoData$2 = {
  tabs
};
const markdown$2 = "# Page::Demo Tab\n\n## Section::# 5. Tabs\n\n### Tabs::::tabs\n\n#### Tab::Tab #1::tab1\n\n- Input::First Input In Tab #1::tab1Input1\n\n#### Tab::::tab2\n\n- title:\n	- valueToLabel: `'Tab #2'`\n	- leads: $\n	- tails: $icons.caretLeft\n- badge: Badge\n	- property: count\n	- labelOnValue\n	- ink: info\n- Checkbox::First Check In Tab #2::tab2check1\n\n#### Tab::::tab3\n\n- title: Box\n	- Caption::Tab #3\n\n#### Tab::::tab4\n\n- title: Tab #4\n- body: @ext.tabs.tab4.def\n\n#### Tab::::tab5\n\n- title:\n	- labelOnValue\n	- property: tab5Title\n	- leads: $\n	- tails: $icons.caretLeft\n- data: @ext.tabs.tab5.data\n- Input::First Input In Tab #5::tab5Input\n\n#### Tab::::tab6\n\n- title: Tab #6\n\n#### Tab::::tab7\n\n- title: Tab #7\n\n#### Tab::::tab8\n\n- title: Tab #8\n\n#### Tab::::tab9\n\n- title: Tab #9\n\n#### Tab::::tab10\n\n- title: Tab #10\n\n#### Tab::::tab11\n\n- title: Tab #11\n\n#### Tab::::tab12\n\n- title: Tab #12\n\n#### Tab::::tab13\n\n- title: Tab #13\n\n#### Tab::::tab14\n\n- title: Tab #14\n\n#### Tab::::tab15\n\n- title: Tab #15\n\n#### Tab::::tab16\n\n- title: Tab #16\n\n#### Tab::::tab17\n\n- title: Tab #17\n\n#### Tab::::tab18\n\n- title: Tab #18\n\n#### Tab::::tab19\n\n- title: Tab #19\n\n#### Tab::::tab20\n\n- title: Tab #20\n\n#### Tab::::tab21\n\n- title: Tab #21\n\n#### Tab::::tab22\n\n- title: Tab #22\n\n#### Tab::::tab23\n\n- title: Tab #23\n\n#### Tab::::tab24\n\n- title: Tab #24\n";
const N2Tabs = () => {
  const def = useDemoMarkdown(markdown$2);
  const externalDefs = {
    tabs: {
      tab4: {
        def: (marker) => {
          return {
            $wt: "Section",
            $nodes: [{
              $wt: "Input.FC",
              label: "Hello Tab4",
              $pp: "tab4Input"
            }]
          };
        }
      },
      tab5: {
        data: async (options) => {
          const { root: root2, model, absolutePath } = options;
          if (model == null) {
            MUtils.setValue(root2, absolutePath, {
              tab5Title: "Tab5 Title",
              tab5Input: "Hello Tab5"
            });
            console.log("set tab5 value");
          }
          console.log(root2, model, absolutePath);
        }
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$2, externalDefs })
  ] });
};
const N2TabsData = DemoData$2;
const N2TabsMarkdown = markdown$2;
const tree = [
  {
    label: "Top #1",
    children: [
      {
        label: "2nd #1.1",
        children: [
          {
            label: "3rd #1.1.1"
          },
          {
            label: "3rd #1.1.2"
          }
        ]
      },
      {
        label: "2nd #1.2",
        children: [
          {
            label: "3rd #1.2.1"
          },
          {
            label: "3rd #1.2.2"
          }
        ]
      }
    ]
  },
  "Top #2",
  {
    label: "Top #3",
    children: [
      {
        label: "2nd #3.1",
        children: [
          {
            label: "3rd #3.1.1"
          },
          {
            label: "3rd #3.1.2"
          }
        ]
      },
      {
        label: "2nd #3.2",
        children: [
          {
            label: "3rd #3.2.1"
          },
          {
            label: "3rd #3.2.2"
          }
        ]
      }
    ]
  }
];
const tree2 = [
  {
    label: "Top #1",
    nodes: [
      {
        label: "2nd #1.1",
        nodes: [
          {
            label: "3rd #1.1.1"
          },
          {
            label: "3rd #1.1.2"
          }
        ]
      },
      {
        label: "2nd #1.2",
        nodes: [
          {
            label: "3rd #1.2.1"
          },
          {
            label: "3rd #1.2.2"
          }
        ]
      }
    ]
  },
  "Top #2",
  {
    label: "Top #3",
    nodes: [
      {
        label: "2nd #3.1",
        nodes: [
          {
            label: "3rd #3.1.1"
          },
          {
            label: "3rd #3.1.2"
          }
        ]
      },
      {
        label: "2nd #3.2",
        nodes: [
          {
            label: "3rd #3.2.1"
          },
          {
            label: {
              text: "3rd #3.2.2"
            }
          }
        ]
      }
    ]
  }
];
const DemoData$1 = {
  tree,
  tree2
};
const markdown$1 = "# Page::Demo Tab\n\n## Section::# 9. N2 Tree\n\n- Tree::::tree\n	- showIndex\n	- initExpandLevel: 0\n	- height: 400\n- Tree::::tree2\n	- detective: @ext.tree2.detective";
const N2Tree = () => {
  const def = useDemoMarkdown(markdown$1);
  const externalDefs = {
    tree2: {
      detective: (parentNode) => {
        if (parentNode == null || parentNode.value == null) {
          return [];
        }
        let nodes;
        let parent$ip2r;
        if (Array.isArray(parentNode.value)) {
          nodes = parentNode.value;
          parent$ip2r = parentNode.$ip2r;
        } else {
          nodes = parentNode.value.nodes ?? [];
          parent$ip2r = `${parentNode.$ip2r}.nodes`;
        }
        return nodes.map((item, index2, items) => {
          if (item == null) {
            return null;
          } else {
            const $ip2p = `[${index2}]`;
            const $ip2r = PPUtils.concat(parent$ip2r, $ip2p);
            let label;
            if (VUtils.isPrimitive(item)) {
              label = `${item ?? ""}`;
            } else if (item.label == null) {
              label = "Unnamed";
            } else if (VUtils.isPrimitive(item.label)) {
              label = `${item.label ?? ""}`;
            } else {
              label = {
                $wt: "Label",
                $pp: "label.text",
                leads: ["$icons.check"],
                tails: ["$icons.remove"]
              };
            }
            return {
              value: item,
              $ip2r,
              $ip2p,
              label,
              checkable: false,
              addable: false,
              removable: false,
              leaf: index2 === items.length - 1
            };
          }
        }).filter((item) => item != null);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$1, externalDefs })
  ] });
};
const N2TreeData = DemoData$1;
const N2TreeMarkdown = markdown$1;
const wizard1 = {
  step1: {
    step1Input1: "hello world"
  },
  step2: {
    step2check1: true
  },
  shared: {
    value: 3456
  }
};
const wizard2 = {
  step1: {
    step1Input1: "abcde"
  },
  step2: {}
};
const DemoData = {
  wizard1,
  wizard2
};
const markdown = "# Page::Demo Tab\n\n## Section::# 6.1. Wizard\n\n### Wizard::::wizard1\n\n- freeWalk, omitWalker\n\n#### WStep::Step #1::step1\n\n- marker: w1s1\n- Input::First Input In Wizard Step #1::step1Input1\n- Button::\n	- text: Next\n	- tails: $icons.angleRight\n	- place: row: 2, col:11, cols:2\n	- click: wstep: w1s2\n\n#### WStep::::step2\n\n- title:\n	- valueToLabel: `'Step #2'`\n	- leads: $\n	- tails: $icons.caretLeft\n- marker: w1s2\n- Checkbox::First Check In Step #2::step2check1\n- Button::\n	- text: Next\n	- leads: $icons.angleLeft\n	- place: row: 2, col:1, cols:2\n	- click: wstep: w1s1\n	- ink: waive\n- Button::\n	- text: Next\n	- tails: $icons.angleRight\n	- place: row: 2, col:11, cols:2\n	- click: wstep: w1s3\n\n#### WStep::::step3\n\n- title: Step #3\n- marker: w1s3\n- Button::\n	- text: Next\n	- leads: $icons.angleLeft\n	- place: row: 2, col:1, cols:2\n	- click: wstep: w1s2\n	- ink: waive\n- Button::\n	- text: Next\n	- tails: $icons.angleRight\n	- place: row: 2, col:11, cols:2\n	- click: wstep: w1s4\n\n#### WStep::::step4\n\n- title: Step #4\n- marker: w1s4\n- Button::\n	- text: Next\n	- leads: $icons.angleLeft\n	- place: row: 2, col:1, cols:2\n	- click: wstep: w1s3\n	- ink: waive\n\n#### WShared::::shared\n\n- Input::Summary Value::value\n	- pos: 12\n\n## Section::# 6.2. Wizard, Not Balloon\n\n### Wizard::::wizard2\n\n- balloon: false\n- reached: 1\n\n#### WStep::Step #1::step1\n\n- Input::First Input In Wizard Step #1::step1Input1\n\n#### WStep::::step2\n\n- title:\n	- valueToLabel: `'Step #2'`\n	- leads: $\n	- tails: $icons.caretLeft\n- Checkbox::First Check In Step #2::step2check1\n\n#### WStep::::step3\n\n- title: Step #3\n\n#### WStep::::step4\n\n- title: Step #4\n";
const N2Wizard = () => {
  const def = useDemoMarkdown(markdown);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData })
  ] });
};
const N2WizardData = DemoData;
const N2WizardMarkdown = markdown;
const DemoContainer = qe.div.attrs({ "data-w": "d9-demo-container" })`
    display: grid;
    position: relative;
    grid-template-columns: 300px 1fr;
    grid-template-rows: calc(100vh - ${CssVars.SECTION_HEADER_HEIGHT} - 2px) auto;

    &:not([data-active-source=none]) {
        grid-template-rows: 50vh 50vh;
    }
`;
const DemoMenus = qe.div.attrs({
  "data-w": "d9-demo-menus",
  "data-v-scroll": "",
  "data-h-scroll": ""
})`
    display: flex;
    position: sticky;
    grid-row: 1 / span 2;
    top: 0;
    flex-direction: column;
    height: 100vh;
    border-right: ${CssVars.BORDER};
    overflow: auto;
`;
const DemoMenuHeader = qe.div`
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 3);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: calc(${CssVars.FONT_SIZE} * 1.4);
    font-weight: ${CssVars.FONT_BOLD};
    color: ${CssVars.INVERT_COLOR};
    background-color: ${CssVars.PRIMARY_COLOR};
    min-height: calc(${CssVars.INPUT_HEIGHT} * 1.6);
    z-index: 1;
`;
const DemoMenu = qe.div`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 3);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: calc(${CssVars.FONT_SIZE} * 1.2);
    color: ${CssVars.FONT_COLOR};
    min-height: calc(${CssVars.INPUT_HEIGHT} * 1.4);
    border-bottom: ${CssVars.BORDER};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &[data-active=true] {
        &:before {
            content: '>>';
            display: block;
            position: relative;
            margin-right: 8px;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-color: ${CssVars.PRIMARY_COLOR};
            opacity: 0.1;
        }
    }

    &:hover {
        color: ${CssVars.PRIMARY_COLOR};
        background-color: ${CssVars.HOVER_COLOR};
        text-decoration: underline;
    }
`;
const DemoPlayground = qe.div.attrs({ "data-w": "d9-demo-playground" })`
    display: block;
    position: relative;
    overflow: auto;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 2);
    min-height: 50vh;
`;
const DemoSource = qe.div.attrs({ "data-w": "d9-demo-source" })`
    display: flex;
    position: relative;
    flex-direction: column;
    max-width: 100%;
    background-color: ${CssVars.INVERT_COLOR};
    border-top: ${CssVars.BORDER};
    border-top-width: 2px;
    overflow: hidden;
`;
const DemoSourceHeader = qe.div.attrs({ "data-w": "d9-demo-source-header" })`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 2);
    min-height: ${CssVars.SECTION_HEADER_HEIGHT};
    border-bottom: ${CssVars.BORDER};

    > button:not(:first-child) {
        margin-left: 8px;
    }
`;
const DemoSourceBody = qe.div.attrs({ "data-w": "d9-demo-source-body" })`
    display: flex;
    position: relative;
    flex-direction: column;
    row-gap: 16px;
    overflow: auto;
    padding: calc(${CssVars.SECTION_BODY_PADDING} * 2);

    > div[data-w=d9-section] > div[data-w=d9-section-body] {
        display: flex;
        flex-direction: column;
    }
`;
const MarkdownTitle = qe.div`
    display: flex;
    position: relative;
    align-items: center;
    color: ${CssVars.PRIMARY_COLOR};
    font-size: 1.6em;
    font-weight: bold;
`;
const MarkdownContainer = (props) => {
  const { contents } = props;
  let markdowns = [{ title: "", markdown: "" }];
  if (typeof contents === "string") {
    markdowns = [{ title: "", markdown: contents }];
  } else if (Array.isArray(contents)) {
    markdowns = contents.map(({ title: title2, content }) => {
      return {
        title: title2,
        markdown: typeof content === "string" ? content : "```json\n" + JSON.stringify(content, null, 4) + "\n```"
      };
    });
  } else {
    markdowns = [{ title: "", markdown: "```json\n" + JSON.stringify(contents, null, 4) + "\n```" }];
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: markdowns.map(({ title: title2, markdown: markdown2 }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      UnwrappedSection,
      {
        title: VUtils.isNotBlank(title2) ? /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownTitle, { children: title2 }) : null,
        collapsible: true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReactMarkdown, { className: "markdown-body", remarkPlugins: [remarkGfm], components: {
          code(props2) {
            const { children, className, node, ...rest } = props2;
            const match = /language-(\w+)/.exec(className || "");
            return match ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              SyntaxHighlighter,
              {
                ...rest,
                PreTag: "div",
                children: String(children).replace(/\n$/, ""),
                language: match[1],
                style: materialDark
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("code", { ...rest, className, children });
          }
        }, children: markdown2 })
      },
      VUtils.generateUniqueId()
    );
  }) });
};
const Demos = [
  {
    path: "/n2-basic-widgets",
    label: "1. N2 Basic Widgets",
    C: N2BasicWidgets,
    data: N2BasicWidgetsData,
    markdown: N2BasicWidgetsMarkdown
  },
  { path: "/n2-buttons", label: "2. N2 Buttons", C: N2Buttons, data: N2ButtonsData, markdown: N2ButtonsMarkdown },
  { path: "/n2-table", label: "3. N2 Table", C: N2Table, data: N2TableData, markdown: N2TableMarkdown },
  {
    path: "/n2-array-panel",
    label: "4. N2 Array Panel",
    C: N2ArrayPanel,
    data: N2ArrayPanelData,
    markdown: N2ArrayPanelMarkdown
  },
  { path: "/n2-tabs", label: "5. N2 Tabs", C: N2Tabs, data: N2TabsData, markdown: N2TabsMarkdown },
  { path: "/n2-wizard", label: "6. N2 Wizard", C: N2Wizard, data: N2WizardData, markdown: N2WizardMarkdown },
  {
    path: "/n2-monitors",
    label: "7. N2 Monitors",
    C: N2Monitors,
    data: N2MonitorsData,
    markdown: N2MonitorsMarkdown
  },
  { path: "/n2-intl", label: "8. N2 Internationalization", C: N2Intl, data: N2IntlData, markdown: N2IntlMarkdown },
  { path: "/n2-tree", label: "9. N2 Tree", C: N2Tree, data: N2TreeData, markdown: N2TreeMarkdown },
  { path: "/echarts", label: "10. ECharts", C: ECharts, data: EChartsData, markdown: EChartsMarkdown },
  {
    path: "/thai-plan-selection",
    label: "100. ThaiCloud Plan Selection",
    C: ThaiPlanSelection,
    data: ThaiPlanSelectionData,
    markdown: ThaiPlanSelectionMarkdown
  },
  {
    path: "/playground",
    label: "999. Playground",
    C: N2Playground,
    data: PlaygroundData,
    markdown: PlaygroundMarkdown
  }
];
const DemoLayoutMenus = (props) => {
  const { route, onMenuClicked } = props;
  const [expanded, setExpanded] = reactExports.useState(false);
  const onClicked = () => {
    if (!MBUtils.isTouchable()) {
      return;
    }
    setExpanded(!expanded);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoMenus, { "data-menu-expanded": expanded, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoMenuHeader, { onClick: onClicked, children: "Demo List" }),
    Demos.map((demo) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DemoMenu, { "data-active": route[demo.path], onClick: onMenuClicked(demo.path), children: demo.label }, demo.path);
    })
  ] });
};
const DemoIndex = () => {
  var _a, _b, _c;
  const [pathname, setPathname] = reactExports.useState(localStorage.getItem("PATH") || "/n2-basic-widgets");
  const [activeSource, setActiveSource] = reactExports.useState(
    "none"
    /* NONE */
  );
  const onMenuClicked = (pathname2) => () => {
    localStorage.setItem("PATH", pathname2);
    setPathname(pathname2);
  };
  const onHideAllClicked = () => setActiveSource(
    "none"
    /* NONE */
  );
  const onMarkdownClicked = () => setActiveSource(
    "markdown"
    /* MARKDOWN */
  );
  const onJsonClicked = () => setActiveSource(
    "json"
    /* JSON */
  );
  const route = { [pathname]: true };
  const C = ((_a = Demos.find((demo) => demo.path === pathname)) == null ? void 0 : _a.C) ?? reactExports.Fragment;
  const markdown2 = ((_b = Demos.find((demo) => demo.path === pathname)) == null ? void 0 : _b.markdown) ?? "";
  const json = ((_c = Demos.find((demo) => demo.path === pathname)) == null ? void 0 : _c.data) ?? {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoContainer, { "data-active-source": activeSource, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceDetective, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoLayoutMenus, { route, onMenuClicked }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoPlayground, { "data-v-scroll": "", "data-h-scroll": "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(C, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoSource, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoSourceHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UnwrappedButton,
          {
            onClick: onHideAllClicked,
            ink: ButtonInk.PRIMARY,
            fill: activeSource === "none" ? ButtonFill.FILL : ButtonFill.PLAIN,
            children: "Hide All"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UnwrappedButton,
          {
            onClick: onMarkdownClicked,
            ink: ButtonInk.PRIMARY,
            fill: activeSource === "markdown" ? ButtonFill.FILL : ButtonFill.PLAIN,
            children: "Markdown"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UnwrappedButton,
          {
            onClick: onJsonClicked,
            ink: ButtonInk.PRIMARY,
            fill: activeSource === "json" ? ButtonFill.FILL : ButtonFill.PLAIN,
            children: "JSON"
          }
        )
      ] }),
      activeSource === "none" ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoSourceBody, { "data-v-scroll": "", "data-h-scroll": "", children: [
        activeSource === "markdown" ? /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownContainer, { contents: markdown2 }) : null,
        activeSource === "json" ? /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownContainer, { contents: json }) : null
      ] })
    ] })
  ] });
};
const GlobalStyles = $e`
    *, *:before, *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *:focus-visible {
        outline: none;
    }

    html {
        width: 100%;
    }

    body {
        --d9-font-family: -apple-system, Roboto;
        --d9-font-color: #555;
        --d9-font-size: 14px;
        margin: 0;
        font-family: var(--d9-font-family);
        font-size: var(--d9-font-size);
        color: var(--d9-font-color);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: relative;
        //background-color        : var(--bg-color);
        overflow-x: hidden;
        width: 100%;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    div[data-w=d9-demo-container] {
        //--d9-font-family: Roboto;
        //--d9-font-color: #555;
        //--d9-font-size: 14px;
        --d9-border-color: #CED4DA;
        --d9-input-height: 32px;
        --d9-common-tabs-font-size: 20px;
        --d9-common-tabs-font-weight: 600;
        --d9-common-tabs-padding: 16px;
        --d9-section-header-title-font-size: 16px;
        --d9-section-header-title-font-weight: 500;
        --d9-section-header-border: 1px solid #eee;
        --d9-caption-font-color: #555;
        --d9-table-header-font-family: Roboto;
        --d9-table-header-font-size: 12px;
        --d9-table-header-font-weight: 400;
        --d9-table-cell-height: 32px;

        div[data-v-scroll],
        div[data-h-scroll] {
            &::-webkit-scrollbar {
                background-color: transparent;
                height: 6px;
                width: 4px;
            }

            &::-webkit-scrollbar-track {
                background-color: rgba(229, 229, 229, 0.5);
                border-radius: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgb(193, 193, 193);
                border-radius: 2px;
            }
        }

        div[data-w=d9-section-header-title] {
            > span[data-w=d9-caption] {
                font-size: var(--d9-section-header-title-font-size);
            }
        }

        span[data-r=d9-fc-caption] {
            font-size: 12px;
            font-weight: 300;
            color: #888;
        }

        div[data-w=d9-table-header-cell],
        div[data-w=d9-table-row-index-cell],
        div[data-w=d9-table-no-data-row] {
            color: #888;
        }

        div[data-w=d9-table-header-cell] {
            text-transform: uppercase;
        }

        div[data-w=d9-dropdown][data-as-label=true][data-disabled=true] {
            background-color: transparent;
            border: 0 transparent;
            cursor: text;
            padding: 0;
            font-family: var(--d9-font-family);
            font-size: var(--d9-font-size);
            min-height: var(--d9-input-height);
            color: var(--d9-font-color);
            margin: 0;

            > span[data-clear=true] {
                display: none;
            }
        }

        div[data-w=d9-plan-selection] {
            --d9-plan-selection-background-color: ${CssVars.INVERT_COLOR};

            div[data-w=d9-plan-selection-element-header-title] {
                > span[data-w=d9-caption] {
                    &[data-plan-element-level="0"] {
                        margin-left: 0;
                    }

                    &[data-plan-element-level="1"] {
                        margin-left: ${PlanSelectionCssVars.ELEMENT_INDENT};
                    }

                    &[data-plan-element-level="2"] {
                        margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 2);
                    }

                    &[data-plan-element-level="3"] {
                        margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 3);
                    }
                }
            }
        }

        div[data-w=d9-section][data-rows-auto-1fr=true] > div[data-w=d9-section-body] {
            grid-template-rows: auto 1fr;
        }
    }

    html[data-touchable=true] {
        div[data-w=d9-demo-container] {
            grid-template-columns: 1fr;

            > div[data-w=d9-demo-menus] {
                position: fixed;
                width: 100vw;
                background-color: ${CssVars.INVERT_COLOR};
                border-right: 0;
                z-index: 100;

                &[data-menu-expanded=false] {
                    height: calc(${CssVars.INPUT_HEIGHT} * 1.6);
                    overflow: hidden;
                }
            }

            > div[data-w=d9-demo-playground] {
                margin-top: calc(${CssVars.INPUT_HEIGHT} * 1.6);
                padding-bottom: calc(${CssVars.INPUT_HEIGHT} * 1.6);
            }
        }
    }
`;
const App = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalStyles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoIndex, {})
  ] });
};
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    __vitePreload(() => import("./vendor-imQJQEqk.js").then((n) => n.C), true ? __vite__mapDeps([0,1,2,3]) : void 0).then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
const root = client.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  /* @__PURE__ */ jsxRuntimeExports.jsx(App, {})
  // </React.StrictMode>
);
reportWebVitals();
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/vendor-imQJQEqk.js","assets/babel-AnpZxJH-.js","assets/unist-5yxlKLF4.js","assets/vendor-UDnasYXb.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
