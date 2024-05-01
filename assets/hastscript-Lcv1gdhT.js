import { f as find_1, n as normalize_1, h as html_1$1 } from "./property-information-jMlvOj4b.js";
import { h as hastUtilParseSelector } from "./vendor-BZZTreDf.js";
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
    var info;
    var property;
    var result;
    if (value === null || value === void 0 || value !== value) {
      return;
    }
    info = find(schema2, key);
    property = info.property;
    result = value;
    if (typeof result === "string") {
      if (info.spaceSeparated) {
        result = spaces(result);
      } else if (info.commaSeparated) {
        result = commas(result);
      } else if (info.commaOrSpaceSeparated) {
        result = spaces(commas(result).join(" "));
      }
    }
    if (property === "style" && typeof value !== "string") {
      result = style(result);
    }
    if (property === "className" && properties.className) {
      result = properties.className.concat(result);
    }
    properties[property] = parsePrimitives(info, property, result);
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
function parsePrimitives(info, name, value) {
  var index;
  var length;
  var result;
  if (typeof value !== "object" || !("length" in value)) {
    return parsePrimitive(info, name, value);
  }
  length = value.length;
  index = -1;
  result = [];
  while (++index < length) {
    result[index] = parsePrimitive(info, name, value[index]);
  }
  return result;
}
function parsePrimitive(info, name, value) {
  var result = value;
  if (info.number || info.positiveNumber) {
    if (!isNaN(result) && result !== "") {
      result = Number(result);
    }
  } else if (info.boolean || info.overloadedBoolean) {
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
