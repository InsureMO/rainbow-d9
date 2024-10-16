import { i as immutable, h as hastUtilParseSelector } from "./vendor-F7ewrTna.js";
var schema$1 = Schema$2;
var proto$1 = Schema$2.prototype;
proto$1.space = null;
proto$1.normal = {};
proto$1.property = {};
function Schema$2(property, normal, space2) {
  this.property = property;
  this.normal = normal;
  if (space2) {
    this.space = space2;
  }
}
var xtend = immutable;
var Schema$1 = schema$1;
var merge_1 = merge$1;
function merge$1(definitions) {
  var length = definitions.length;
  var property = [];
  var normal = [];
  var index = -1;
  var info2;
  var space2;
  while (++index < length) {
    info2 = definitions[index];
    property.push(info2.property);
    normal.push(info2.normal);
    space2 = info2.space;
  }
  return new Schema$1(
    xtend.apply(null, property),
    xtend.apply(null, normal),
    space2
  );
}
var normalize_1 = normalize$3;
function normalize$3(value) {
  return value.toLowerCase();
}
var info = Info$2;
var proto = Info$2.prototype;
proto.space = null;
proto.attribute = null;
proto.property = null;
proto.boolean = false;
proto.booleanish = false;
proto.overloadedBoolean = false;
proto.number = false;
proto.commaSeparated = false;
proto.spaceSeparated = false;
proto.commaOrSpaceSeparated = false;
proto.mustUseProperty = false;
proto.defined = false;
function Info$2(property, attribute) {
  this.property = property;
  this.attribute = attribute;
}
var types$3 = {};
var powers = 0;
types$3.boolean = increment();
types$3.booleanish = increment();
types$3.overloadedBoolean = increment();
types$3.number = increment();
types$3.spaceSeparated = increment();
types$3.commaSeparated = increment();
types$3.commaOrSpaceSeparated = increment();
function increment() {
  return Math.pow(2, ++powers);
}
var Info$1 = info;
var types$2 = types$3;
var definedInfo = DefinedInfo$2;
DefinedInfo$2.prototype = new Info$1();
DefinedInfo$2.prototype.defined = true;
var checks = [
  "boolean",
  "booleanish",
  "overloadedBoolean",
  "number",
  "commaSeparated",
  "spaceSeparated",
  "commaOrSpaceSeparated"
];
var checksLength = checks.length;
function DefinedInfo$2(property, attribute, mask, space2) {
  var index = -1;
  var check;
  mark(this, "space", space2);
  Info$1.call(this, property, attribute);
  while (++index < checksLength) {
    check = checks[index];
    mark(this, check, (mask & types$2[check]) === types$2[check]);
  }
}
function mark(values, key, value) {
  if (value) {
    values[key] = value;
  }
}
var normalize$2 = normalize_1;
var Schema = schema$1;
var DefinedInfo$1 = definedInfo;
var create_1 = create$5;
function create$5(definition) {
  var space2 = definition.space;
  var mustUseProperty = definition.mustUseProperty || [];
  var attributes = definition.attributes || {};
  var props = definition.properties;
  var transform = definition.transform;
  var property = {};
  var normal = {};
  var prop;
  var info2;
  for (prop in props) {
    info2 = new DefinedInfo$1(
      prop,
      transform(attributes, prop),
      props[prop],
      space2
    );
    if (mustUseProperty.indexOf(prop) !== -1) {
      info2.mustUseProperty = true;
    }
    property[prop] = info2;
    normal[normalize$2(prop)] = prop;
    normal[normalize$2(info2.attribute)] = prop;
  }
  return new Schema(property, normal, space2);
}
var create$4 = create_1;
var xlink$1 = create$4({
  space: "xlink",
  transform: xlinkTransform,
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});
function xlinkTransform(_, prop) {
  return "xlink:" + prop.slice(5).toLowerCase();
}
var create$3 = create_1;
var xml$1 = create$3({
  space: "xml",
  transform: xmlTransform,
  properties: {
    xmlLang: null,
    xmlBase: null,
    xmlSpace: null
  }
});
function xmlTransform(_, prop) {
  return "xml:" + prop.slice(3).toLowerCase();
}
var caseSensitiveTransform_1 = caseSensitiveTransform$1;
function caseSensitiveTransform$1(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}
var caseSensitiveTransform = caseSensitiveTransform_1;
var caseInsensitiveTransform_1 = caseInsensitiveTransform$2;
function caseInsensitiveTransform$2(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}
var create$2 = create_1;
var caseInsensitiveTransform$1 = caseInsensitiveTransform_1;
var xmlns$1 = create$2({
  space: "xmlns",
  attributes: {
    xmlnsxlink: "xmlns:xlink"
  },
  transform: caseInsensitiveTransform$1,
  properties: {
    xmlns: null,
    xmlnsXLink: null
  }
});
var types$1 = types$3;
var create$1 = create_1;
var booleanish$1 = types$1.booleanish;
var number$1 = types$1.number;
var spaceSeparated$1 = types$1.spaceSeparated;
var aria$1 = create$1({
  transform: ariaTransform,
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish$1,
    ariaAutoComplete: null,
    ariaBusy: booleanish$1,
    ariaChecked: booleanish$1,
    ariaColCount: number$1,
    ariaColIndex: number$1,
    ariaColSpan: number$1,
    ariaControls: spaceSeparated$1,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated$1,
    ariaDetails: null,
    ariaDisabled: booleanish$1,
    ariaDropEffect: spaceSeparated$1,
    ariaErrorMessage: null,
    ariaExpanded: booleanish$1,
    ariaFlowTo: spaceSeparated$1,
    ariaGrabbed: booleanish$1,
    ariaHasPopup: null,
    ariaHidden: booleanish$1,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated$1,
    ariaLevel: number$1,
    ariaLive: null,
    ariaModal: booleanish$1,
    ariaMultiLine: booleanish$1,
    ariaMultiSelectable: booleanish$1,
    ariaOrientation: null,
    ariaOwns: spaceSeparated$1,
    ariaPlaceholder: null,
    ariaPosInSet: number$1,
    ariaPressed: booleanish$1,
    ariaReadOnly: booleanish$1,
    ariaRelevant: null,
    ariaRequired: booleanish$1,
    ariaRoleDescription: spaceSeparated$1,
    ariaRowCount: number$1,
    ariaRowIndex: number$1,
    ariaRowSpan: number$1,
    ariaSelected: booleanish$1,
    ariaSetSize: number$1,
    ariaSort: null,
    ariaValueMax: number$1,
    ariaValueMin: number$1,
    ariaValueNow: number$1,
    ariaValueText: null,
    role: null
  }
});
function ariaTransform(_, prop) {
  return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
}
var types = types$3;
var create = create_1;
var caseInsensitiveTransform = caseInsensitiveTransform_1;
var boolean = types.boolean;
var overloadedBoolean = types.overloadedBoolean;
var booleanish = types.booleanish;
var number = types.number;
var spaceSeparated = types.spaceSeparated;
var commaSeparated = types.commaSeparated;
var html$2 = create({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: commaSeparated,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextMenu: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: commaSeparated,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: number,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: boolean,
    // Lists. Use CSS to reduce space between items instead
    declare: boolean,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: number,
    // `<img>` and `<object>`
    leftMargin: number,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: number,
    // `<body>`
    marginWidth: number,
    // `<body>`
    noResize: boolean,
    // `<frame>`
    noHref: boolean,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: number,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: booleanish,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: number,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});
var merge = merge_1;
var xlink = xlink$1;
var xml = xml$1;
var xmlns = xmlns$1;
var aria = aria$1;
var html$1 = html$2;
var html_1$1 = merge([xml, xlink, xmlns, aria, html$1]);
var normalize$1 = normalize_1;
var DefinedInfo = definedInfo;
var Info = info;
var data = "data";
var find_1 = find$1;
var valid = /^data[-\w.:]+$/i;
var dash = /-[a-z]/g;
var cap = /[A-Z]/g;
function find$1(schema2, value) {
  var normal = normalize$1(value);
  var prop = value;
  var Type = Info;
  if (normal in schema2.normal) {
    return schema2.property[schema2.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === data && valid.test(value)) {
    if (value.charAt(4) === "-") {
      prop = datasetToProperty(value);
    } else {
      value = datasetToAttribute(value);
    }
    Type = DefinedInfo;
  }
  return new Type(prop, value);
}
function datasetToProperty(attribute) {
  var value = attribute.slice(5).replace(dash, camelcase);
  return data + value.charAt(0).toUpperCase() + value.slice(1);
}
function datasetToAttribute(property) {
  var value = property.slice(4);
  if (dash.test(value)) {
    return property;
  }
  value = value.replace(cap, kebab);
  if (value.charAt(0) !== "-") {
    value = "-" + value;
  }
  return data + value;
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}
var spaceSeparatedTokens = {};
spaceSeparatedTokens.parse = parse$1;
spaceSeparatedTokens.stringify = stringify$1;
var empty$1 = "";
var space$1 = " ";
var whiteSpace = /[ \t\n\r\f]+/g;
function parse$1(value) {
  var input = String(value || empty$1).trim();
  return input === empty$1 ? [] : input.split(whiteSpace);
}
function stringify$1(values) {
  return values.join(space$1).trim();
}
var commaSeparatedTokens = {};
commaSeparatedTokens.parse = parse;
commaSeparatedTokens.stringify = stringify;
var comma = ",";
var space = " ";
var empty = "";
function parse(value) {
  var values = [];
  var input = String(value || empty);
  var index = input.indexOf(comma);
  var lastIndex = 0;
  var end = false;
  var val;
  while (!end) {
    if (index === -1) {
      index = input.length;
      end = true;
    }
    val = input.slice(lastIndex, index).trim();
    if (val || !end) {
      values.push(val);
    }
    lastIndex = index + 1;
    index = input.indexOf(comma, lastIndex);
  }
  return values;
}
function stringify(values, options) {
  var settings = options || {};
  var left = settings.padLeft === false ? empty : space;
  var right = settings.padRight ? space : empty;
  if (values[values.length - 1] === empty) {
    values = values.concat(empty);
  }
  return values.join(right + comma + left).trim();
}
var find = find_1;
var normalize = normalize_1;
var parseSelector = hastUtilParseSelector;
var spaces = spaceSeparatedTokens.parse;
var commas = commaSeparatedTokens.parse;
var factory_1 = factory$1;
var own = {}.hasOwnProperty;
function factory$1(schema2, defaultTagName, caseSensitive) {
  var adjust = caseSensitive ? createAdjustMap(caseSensitive) : null;
  return h;
  function h(selector, properties) {
    var node = parseSelector(selector, defaultTagName);
    var children = Array.prototype.slice.call(arguments, 2);
    var name = node.tagName.toLowerCase();
    var property;
    node.tagName = adjust && own.call(adjust, name) ? adjust[name] : name;
    if (properties && isChildren(properties, node)) {
      children.unshift(properties);
      properties = null;
    }
    if (properties) {
      for (property in properties) {
        addProperty(node.properties, property, properties[property]);
      }
    }
    addChild(node.children, children);
    if (node.tagName === "template") {
      node.content = { type: "root", children: node.children };
      node.children = [];
    }
    return node;
  }
  function addProperty(properties, key, value) {
    var info2;
    var property;
    var result;
    if (value === null || value === void 0 || value !== value) {
      return;
    }
    info2 = find(schema2, key);
    property = info2.property;
    result = value;
    if (typeof result === "string") {
      if (info2.spaceSeparated) {
        result = spaces(result);
      } else if (info2.commaSeparated) {
        result = commas(result);
      } else if (info2.commaOrSpaceSeparated) {
        result = spaces(commas(result).join(" "));
      }
    }
    if (property === "style" && typeof value !== "string") {
      result = style(result);
    }
    if (property === "className" && properties.className) {
      result = properties.className.concat(result);
    }
    properties[property] = parsePrimitives(info2, property, result);
  }
}
function isChildren(value, node) {
  return typeof value === "string" || "length" in value || isNode(node.tagName, value);
}
function isNode(tagName, value) {
  var type = value.type;
  if (tagName === "input" || !type || typeof type !== "string") {
    return false;
  }
  if (typeof value.children === "object" && "length" in value.children) {
    return true;
  }
  type = type.toLowerCase();
  if (tagName === "button") {
    return type !== "menu" && type !== "submit" && type !== "reset" && type !== "button";
  }
  return "value" in value;
}
function addChild(nodes, value) {
  var index;
  var length;
  if (typeof value === "string" || typeof value === "number") {
    nodes.push({ type: "text", value: String(value) });
    return;
  }
  if (typeof value === "object" && "length" in value) {
    index = -1;
    length = value.length;
    while (++index < length) {
      addChild(nodes, value[index]);
    }
    return;
  }
  if (typeof value !== "object" || !("type" in value)) {
    throw new Error("Expected node, nodes, or string, got `" + value + "`");
  }
  nodes.push(value);
}
function parsePrimitives(info2, name, value) {
  var index;
  var length;
  var result;
  if (typeof value !== "object" || !("length" in value)) {
    return parsePrimitive(info2, name, value);
  }
  length = value.length;
  index = -1;
  result = [];
  while (++index < length) {
    result[index] = parsePrimitive(info2, name, value[index]);
  }
  return result;
}
function parsePrimitive(info2, name, value) {
  var result = value;
  if (info2.number || info2.positiveNumber) {
    if (!isNaN(result) && result !== "") {
      result = Number(result);
    }
  } else if (info2.boolean || info2.overloadedBoolean) {
    if (typeof result === "string" && (result === "" || normalize(value) === normalize(name))) {
      result = true;
    }
  }
  return result;
}
function style(value) {
  var result = [];
  var key;
  for (key in value) {
    result.push([key, value[key]].join(": "));
  }
  return result.join("; ");
}
function createAdjustMap(values) {
  var length = values.length;
  var index = -1;
  var result = {};
  var value;
  while (++index < length) {
    value = values[index];
    result[value.toLowerCase()] = value;
  }
  return result;
}
var schema = html_1$1;
var factory = factory_1;
var html = factory(schema, "div");
html.displayName = "html";
var html_1 = html;
var hastscript = html_1;
export {
  hastscript as h
};
