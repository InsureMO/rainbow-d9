var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { i as index$2, I as IntlLabel, D as DOM_KEY_WIDGET, C as CssVars, d as utils$2, b as useGlobalHandlers, t as toIntlLabel, U as UnwrappedButton, B as ButtonInk, e as ButtonFill } from "./rainbow-d9-n2-uDowY2gS.js";
import { R as React, r as reactExports, q as qe } from "./react-base-_kUkTZyT.js";
import { V as VUtils, r as registerWidget, g as useCreateEventBus, M as MUtils, P as PPUtils, a as useThrottler, e as useForceUpdate, S as StandaloneRoot, m as ExternalDefMismatchIndicator } from "./rainbow-d9-n1-4fa2a4TQ.js";
import { T as Tag, r as tags, V as ViewPlugin, u as syntaxTree, H as HighlightStyle, v as defaultHighlightStyle, w as syntaxHighlighting, x as styleTags, D as Decoration, I as InlineContext, W as WidgetType, y as EditorView, z as EditorState, A as basicSetup, B as keymap, C as indentWithTab, F as markdown, G as javascript, J as markdownLanguage, K as lintGutter, L as linter, N as json, O as jsonParseLinter } from "./vendor-R-Spl4KT.js";
import { a as index, b as index$2$1, i as index$1, p as parseDoc } from "./rainbow-d9-n3-q7vik5Ee.js";
var PlaygroundWidgetGroupKey;
(function(PlaygroundWidgetGroupKey2) {
  PlaygroundWidgetGroupKey2["CONTAINERS"] = "container-group";
  PlaygroundWidgetGroupKey2["INPUTS"] = "input-group";
  PlaygroundWidgetGroupKey2["OPTIONS"] = "options-group";
  PlaygroundWidgetGroupKey2["DISPLAY"] = "display-group";
  PlaygroundWidgetGroupKey2["NOT_CARE"] = "not-care";
})(PlaygroundWidgetGroupKey || (PlaygroundWidgetGroupKey = {}));
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
  WIDGET_DECLARATION_ATTR_VALUE_EXT_COLOR: "var(--d9-playground-widget-declaration-attr-name-color, rgb(10, 56, 172))",
  VIEWER_ERROR_COLOR: `var(--d9-playground-viewer-error-color, ${CssVars.DANGER_COLOR})`,
  TEMPLATE_DIALOG_WIDTH: "var(--d9-playground-template-dialog-width, 70vw)",
  TEMPLATE_DIALOG_HEIGHT: "var(--d9-playground-template-dialog-height, 60vh)",
  TEMPLATE_DIALOG_MARGIN_TOP: "var(--d9-playground-template-dialog-margin-top, min(10vh, calc(20vh - 60px)))",
  TEMPLATE_DIALOG_MARGIN_LEFT: "var(--d9-playground-template-dialog-margin-left, 15vw)",
  TEMPLATE_DIALOG_PADDING: "var(--d9-playground-template-dialog-padding, 32px 32px 16px)",
  TEMPLATE_DIALOG_BODY_MARGIN_BOTTOM: "var(--d9-playground-template-dialog-margin-bottom, 16px)",
  WIDGET_WRAPPER_Z_INDEX: 2e9,
  WIDGET_WRAPPER_BORDER_RADIUS: "var(--d9-playground-ww-border-radius, 4px)",
  WIDGET_WRAPPER_SHADOW: "var(--d9-playground-ww-shadow, 0 0 5px 2px rgba(0,0,0,0.2))",
  WIDGET_WRAPPER_TOOLBAR_COLOR: "var(--d9-playground-ww-toolbar-color, rgba(0,0,0,0.4))",
  WIDGET_WRAPPER_TOOLBAR_FILTER: "var(--d9-playground-ww-toolbar-filter, drop-shadow(2px 4px 6px black))"
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
const DropdownTreeIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-dropdown-tree", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { opacity: "0.5", d: "M2 13H5.16026C6.06543 13 6.51802 13 6.91584 13.183C7.31367 13.3659 7.60821 13.7096 8.19729 14.3968L8.80271 15.1032C9.39179 15.7904 9.68633 16.1341 10.0842 16.317C10.482 16.5 10.9346 16.5 11.8397 16.5H12.1603C13.0654 16.5 13.518 16.5 13.9158 16.317C14.3137 16.1341 14.6082 15.7904 15.1973 15.1032L15.8027 14.3968C16.3918 13.7096 16.6863 13.3659 17.0842 13.183C17.482 13 17.9346 13 18.8397 13H22", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { opacity: "0.5", d: "M8 7H16", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { opacity: "0.5", d: "M10 10.5H14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const HideEditorBadgeIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-hide-editor-badge", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M20.0297 2.47998L4.17969 18.33", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M5.25008 13.0002C4.83008 12.0302 4.58008 10.9802 4.58008 9.90017C4.58008 4.99017 8.80008 1.12017 13.6001 2.17017C15.0601 2.49017 16.3601 3.27017 17.3601 4.35017", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M19.0602 7.2998C20.2802 11.1798 18.3102 15.0798 15.5202 16.8698V18.0298C15.5202 18.3198 15.6202 18.9898 14.6202 18.9898H9.42016C8.39016 18.9898 8.52016 18.5598 8.52016 18.0298V16.8698C8.04016 16.5698 7.59016 16.1998 7.16016 15.7698", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M8.5 22.0002C10.79 21.3502 13.21 21.3502 15.5 22.0002", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const HideLocatorIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-hide-locator", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M8.70906 13.2911C8.31854 12.9006 8.31854 12.2674 8.70906 11.8769L10.5859 10L8.70989 8.12401C8.31936 7.73348 8.31936 7.10032 8.70989 6.70979C9.10041 6.31927 9.73358 6.31927 10.1241 6.70979L12.0001 8.58582L13.8816 6.70434C14.2721 6.31381 14.9053 6.31381 15.2958 6.70434C15.6863 7.09486 15.6863 7.72803 15.2958 8.11855L13.4143 10L15.295 11.8806C15.6855 12.2712 15.6855 12.9043 15.295 13.2949C14.9044 13.6854 14.2713 13.6854 13.8807 13.2949L12.0001 11.4142L10.1233 13.2911C9.73275 13.6816 9.09959 13.6816 8.70906 13.2911Z", fill: "currentColor" }),
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 0.00354004C18.0052 0.00354004 22.5649 5.78816 21.272 11.5818C20.2752 16.2816 16.2429 20.8464 13.8364 23.2269C12.8058 24.2463 11.1942 24.2463 10.1636 23.2269C7.7572 20.8465 3.72523 16.2821 2.72816 11.5825C1.43639 5.7961 5.99649 0.00354004 12 0.00354004ZM19.32 11.1462C20.3368 6.58981 16.7124 2.00354 12 2.00354C7.29012 2.00354 3.66438 6.59682 4.68011 11.1467C5.16886 13.3361 6.26419 15.3017 7.55009 17.1193C8.89379 19.0186 10.4171 20.6645 11.5701 21.805C11.8214 22.0536 12.1786 22.0536 12.4299 21.805C13.5829 20.6644 15.1064 19.0184 16.4501 17.119C17.7359 15.3015 18.8316 13.3355 19.32 11.1462Z", fill: "currentColor" })
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
const JsonIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-json", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M14 19H16C17.1046 19 18 18.1046 18 17V14.5616C18 13.6438 18.6246 12.8439 19.5149 12.6213L21.0299 12.2425C21.2823 12.1794 21.2823 11.8206 21.0299 11.7575L19.5149 11.3787C18.6246 11.1561 18 10.3562 18 9.43845V5H14", stroke: "currentColor", strokeWidth: "2" }),
    React.createElement("path", { d: "M10 5H8C6.89543 5 6 5.89543 6 7V9.43845C6 10.3562 5.37541 11.1561 4.48507 11.3787L2.97014 11.7575C2.71765 11.8206 2.71765 12.1794 2.97014 12.2425L4.48507 12.6213C5.37541 12.8439 6 13.6438 6 14.5616V19H10", stroke: "currentColor", strokeWidth: "2" })
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
const LocateIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-locate", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { opacity: "0.5", d: "M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464Z", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { d: "M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { d: "M20.9605 15.5C21.6259 16.1025 22 16.7816 22 17.5C22 19.9853 17.5228 22 12 22C6.47715 22 2 19.9853 2 17.5C2 16.7816 2.37412 16.1025 3.03947 15.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
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
const MultiDropdownTreeIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-multi-dropdown-tree", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { opacity: "0.5", d: "M4 14.25C3.58579 14.25 3.25 14.5858 3.25 15C3.25 15.4142 3.58579 15.75 4 15.75V14.25ZM20 15.75C20.4142 15.75 20.75 15.4142 20.75 15C20.75 14.5858 20.4142 14.25 20 14.25V15.75ZM14.5987 16.4013L14.0684 15.8709H14.0684L14.5987 16.4013ZM14.8284 16.1716L14.2981 15.6412V15.6412L14.8284 16.1716ZM9.15 16.25L8.59805 16.7578H8.59805L9.15 16.25ZM9.18546 16.2885L9.73741 15.7807H9.73741L9.18546 16.2885ZM10.2809 17.2877L9.94463 17.9581H9.94463L10.2809 17.2877ZM10.4692 17.3703L10.7348 16.6689H10.7348L10.4692 17.3703ZM13.5262 17.3082L13.2057 16.6301H13.2057L13.5262 17.3082ZM13.3458 17.3829L13.5987 18.089L13.5987 18.089L13.3458 17.3829ZM16.0631 15.1522L15.776 14.4593H15.776L16.0631 15.1522ZM7.87676 15.1477L8.15966 14.4531L8.15966 14.4531L7.87676 15.1477ZM7.97471 15.1907L7.65508 15.8692L7.65508 15.8692L7.97471 15.1907ZM4.25 15C4.25 15.4142 4.58579 15.75 5 15.75C5.41421 15.75 5.75 15.4142 5.75 15H4.25ZM18.25 15C18.25 15.4142 18.5858 15.75 19 15.75C19.4142 15.75 19.75 15.4142 19.75 15H18.25ZM4 15.75H6.30147V14.25H4V15.75ZM17.6569 15.75H20V14.25H17.6569V15.75ZM15.1291 16.9316L15.3588 16.7019L14.2981 15.6412L14.0684 15.8709L15.1291 16.9316ZM8.59805 16.7578L8.63351 16.7963L9.73741 15.7807L9.70195 15.7422L8.59805 16.7578ZM8.63351 16.7963C9.10743 17.3115 9.46605 17.718 9.94463 17.9581L10.6172 16.6173C10.4413 16.5291 10.2877 16.3789 9.73741 15.7807L8.63351 16.7963ZM11.9462 16.75C11.1333 16.75 10.9189 16.7387 10.7348 16.6689L10.2035 18.0717C10.7042 18.2613 11.2462 18.25 11.9462 18.25V16.75ZM9.94463 17.9581C10.0289 18.0004 10.1153 18.0383 10.2035 18.0717L10.7348 16.6689C10.6948 16.6538 10.6555 16.6365 10.6172 16.6173L9.94463 17.9581ZM14.0684 15.8709C13.5252 16.4141 13.3746 16.5503 13.2057 16.6301L13.8467 17.9863C14.3058 17.7693 14.6609 17.3998 15.1291 16.9316L14.0684 15.8709ZM11.9462 18.25C12.6083 18.25 13.1206 18.2602 13.5987 18.089L13.093 16.6768C12.9171 16.7398 12.7143 16.75 11.9462 16.75V18.25ZM13.2057 16.6301C13.1689 16.6475 13.1313 16.6631 13.093 16.6768L13.5987 18.089C13.683 18.0588 13.7658 18.0245 13.8467 17.9863L13.2057 16.6301ZM17.6569 14.25C16.9005 14.25 16.3135 14.2367 15.776 14.4593L16.3501 15.8451C16.5477 15.7633 16.7782 15.75 17.6569 15.75V14.25ZM15.3588 16.7019C15.9801 16.0806 16.1524 15.927 16.3501 15.8451L15.776 14.4593C15.2386 14.6819 14.8329 15.1065 14.2981 15.6412L15.3588 16.7019ZM6.30147 15.75C7.17044 15.75 7.39887 15.7629 7.59386 15.8423L8.15966 14.4531C7.62918 14.2371 7.04924 14.25 6.30147 14.25V15.75ZM9.70195 15.7422C9.19566 15.1919 8.81252 14.7564 8.29435 14.5122L7.65508 15.8692C7.84554 15.9589 8.00971 16.1183 8.59805 16.7578L9.70195 15.7422ZM7.59386 15.8423C7.6145 15.8507 7.63491 15.8597 7.65508 15.8692L8.29435 14.5122C8.24999 14.4913 8.20508 14.4716 8.15966 14.4531L7.59386 15.8423ZM6.5 12.75H17.5V11.25H6.5V12.75ZM17.5 12.75C17.9142 12.75 18.25 13.0858 18.25 13.5H19.75C19.75 12.2574 18.7426 11.25 17.5 11.25V12.75ZM5.75 13.5C5.75 13.0858 6.08579 12.75 6.5 12.75V11.25C5.25736 11.25 4.25 12.2574 4.25 13.5H5.75ZM6.5 9.75H17.5V8.25H6.5V9.75ZM17.5 9.75C17.9142 9.75 18.25 10.0858 18.25 10.5H19.75C19.75 9.25736 18.7426 8.25 17.5 8.25V9.75ZM5.75 10.5C5.75 10.0858 6.08579 9.75 6.5 9.75V8.25C5.25736 8.25 4.25 9.25736 4.25 10.5H5.75ZM5.75 10.5V7.5H4.25V10.5H5.75ZM6.5 6.75H17.5V5.25H6.5V6.75ZM18.25 7.5V10.5H19.75V7.5H18.25ZM17.5 6.75C17.9142 6.75 18.25 7.08579 18.25 7.5H19.75C19.75 6.25736 18.7426 5.25 17.5 5.25V6.75ZM5.75 7.5C5.75 7.08579 6.08579 6.75 6.5 6.75V5.25C5.25736 5.25 4.25 6.25736 4.25 7.5H5.75ZM5.75 15V13.5H4.25V15H5.75ZM18.25 13.5V15H19.75V13.5H18.25ZM5.75 13.5V10.5H4.25V13.5H5.75ZM18.25 10.5V13.5H19.75V10.5H18.25Z", fill: "currentColor" })
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
const ShowEditorBadgeIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-show-editor-badge", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { opacity: "0.4", d: "M12.0001 7.89014L10.9301 9.75014C10.6901 10.1601 10.8901 10.5001 11.3601 10.5001H12.6301C13.1101 10.5001 13.3001 10.8401 13.0601 11.2501L12.0001 13.1101", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M8.30035 18.0402V16.8802C6.00035 15.4902 4.11035 12.7802 4.11035 9.90018C4.11035 4.95018 8.66035 1.07018 13.8004 2.19018C16.0604 2.69018 18.0404 4.19018 19.0704 6.26018C21.1604 10.4602 18.9604 14.9202 15.7304 16.8702V18.0302C15.7304 18.3202 15.8404 18.9902 14.7704 18.9902H9.26035C8.16035 19.0002 8.30035 18.5702 8.30035 18.0402Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M8.5 22.0002C10.79 21.3502 13.21 21.3502 15.5 22.0002", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const ShowLocatorIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-show-locator", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12.0036 14.0035C14.4889 14.0035 16.5036 11.9887 16.5036 9.50347C16.5036 7.01819 14.4889 5.00347 12.0036 5.00347C9.51831 5.00347 7.50359 7.01819 7.50359 9.50347C7.50359 11.9887 9.51831 14.0035 12.0036 14.0035ZM12.0036 12.0071C10.6209 12.0071 9.5 10.8862 9.5 9.50347C9.5 8.12077 10.6209 6.99988 12.0036 6.99988C13.3863 6.99988 14.5072 8.12077 14.5072 9.50347C14.5072 10.8862 13.3863 12.0071 12.0036 12.0071Z", fill: "currentColor" }),
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M21.272 11.5818C22.5649 5.78816 18.0052 0.00354004 12 0.00354004C5.99649 0.00354004 1.43639 5.7961 2.72816 11.5825C3.72523 16.2821 7.7572 20.8465 10.1636 23.2269C11.1942 24.2463 12.8058 24.2463 13.8364 23.2269C16.2429 20.8464 20.2752 16.2816 21.272 11.5818ZM12 2.00354C16.7124 2.00354 20.3368 6.58981 19.32 11.1462C18.8316 13.3355 17.7359 15.3015 16.4501 17.119C15.1064 19.0184 13.5829 20.6644 12.4299 21.805C12.1786 22.0536 11.8214 22.0536 11.5701 21.805C10.4171 20.6645 8.89379 19.0186 7.55009 17.1193C6.26419 15.3017 5.16886 13.3361 4.68011 11.1467C3.66438 6.59682 7.29012 2.00354 12 2.00354Z", fill: "currentColor" })
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
const TimeIcon = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "playground-time", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z", stroke: "currentColor2", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.4", d: "M15.7099 15.1798L12.6099 13.3298C12.0699 13.0098 11.6299 12.2398 11.6299 11.6098V7.50977", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
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
    { ...props, "data-icon": "playground-window", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
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
  PlaygroundIcons2["SHOW_EDITOR_BADGE"] = "playground.show-editor-badge";
  PlaygroundIcons2["HIDE_EDITOR_BADGE"] = "playground.hide-editor-badge";
  PlaygroundIcons2["SHOW_LOCATOR"] = "playground.show-locator";
  PlaygroundIcons2["HIDE_LOCATOR"] = "playground.hide-locator";
  PlaygroundIcons2["MAXIMIZE"] = "playground.max";
  PlaygroundIcons2["MINIMIZE"] = "playground.min";
  PlaygroundIcons2["ZEN"] = "playground.zen";
  PlaygroundIcons2["WINDOW"] = "playground.window";
  PlaygroundIcons2["LOCATE"] = "playground.locate";
  PlaygroundIcons2["JSON"] = "playground.json";
  PlaygroundIcons2["SECTION"] = "playground.section";
  PlaygroundIcons2["BOX"] = "playground.box";
  PlaygroundIcons2["RIBS"] = "playground.ribs";
  PlaygroundIcons2["TABLE"] = "playground.table";
  PlaygroundIcons2["TREE"] = "playground.tree";
  PlaygroundIcons2["DROPDOWN_TREE"] = "playground.dropdown-tree";
  PlaygroundIcons2["MULTI_DROPDOWN_TREE"] = "playground.multi-dropdown-tree";
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
  PlaygroundIcons2["TIME"] = "playground.time";
  PlaygroundIcons2["CHECKBOX"] = "playground.checkbox";
  PlaygroundIcons2["CHECKS"] = "playground.checks";
  PlaygroundIcons2["RADIO"] = "playground.radio";
  PlaygroundIcons2["RADIOS"] = "playground.radios";
  PlaygroundIcons2["UPLOAD"] = "playground.upload";
})(PlaygroundIcons || (PlaygroundIcons = {}));
index$2.Registrar.register({
  [PlaygroundIcons.CONTAINER_GROUP]: () => React.createElement(ContainerGroupIcon, null),
  [PlaygroundIcons.INPUT_GROUP]: () => React.createElement(InputGroupIcon, null),
  [PlaygroundIcons.OPTIONS_GROUP]: () => React.createElement(OptionsGroupIcon, null),
  [PlaygroundIcons.DISPLAY_GROUP]: () => React.createElement(DisplayGroupIcon, null),
  [PlaygroundIcons.SHOW_EDITOR_BADGE]: () => React.createElement(ShowEditorBadgeIcon, null),
  [PlaygroundIcons.HIDE_EDITOR_BADGE]: () => React.createElement(HideEditorBadgeIcon, null),
  [PlaygroundIcons.SHOW_LOCATOR]: () => React.createElement(ShowLocatorIcon, null),
  [PlaygroundIcons.HIDE_LOCATOR]: () => React.createElement(HideLocatorIcon, null),
  [PlaygroundIcons.MAXIMIZE]: () => React.createElement(MaxIcon, null),
  [PlaygroundIcons.MINIMIZE]: () => React.createElement(MinIcon, null),
  [PlaygroundIcons.ZEN]: () => React.createElement(ZenIcon, null),
  [PlaygroundIcons.WINDOW]: () => React.createElement(WindowIcon, null),
  [PlaygroundIcons.LOCATE]: () => React.createElement(LocateIcon, null),
  [PlaygroundIcons.JSON]: () => React.createElement(JsonIcon, null),
  [PlaygroundIcons.SECTION]: () => React.createElement(SectionIcon, null),
  [PlaygroundIcons.BOX]: () => React.createElement(BoxIcon, null),
  [PlaygroundIcons.RIBS]: () => React.createElement(RibsIcon, null),
  [PlaygroundIcons.TABLE]: () => React.createElement(TableIcon, null),
  [PlaygroundIcons.TREE]: () => React.createElement(TreeIcon, null),
  [PlaygroundIcons.DROPDOWN_TREE]: () => React.createElement(DropdownTreeIcon, null),
  [PlaygroundIcons.MULTI_DROPDOWN_TREE]: () => React.createElement(MultiDropdownTreeIcon, null),
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
  [PlaygroundIcons.TIME]: () => React.createElement(TimeIcon, null),
  [PlaygroundIcons.UPLOAD]: () => React.createElement(UploadIcon, null),
  [PlaygroundIcons.DROPDOWN]: () => React.createElement(DropdownIcon, null),
  [PlaygroundIcons.MULTI_DROPDOWN]: () => React.createElement(MultiDropdownIcon, null),
  [PlaygroundIcons.CHECKBOX]: () => React.createElement(CheckboxIcon, null),
  [PlaygroundIcons.CHECKS]: () => React.createElement(ChecksIcon, null),
  [PlaygroundIcons.RADIO]: () => React.createElement(RadioIcon, null),
  [PlaygroundIcons.RADIOS]: () => React.createElement(RadiosIcon, null)
});
const Labels = {
  ERROR: React.createElement(IntlLabel, { keys: ["playground", "error", "unknown"], value: "Something went wrong." }),
  NoContentGiven: React.createElement(IntlLabel, { keys: ["playground", "error", "no-content"], value: "No content given." }),
  ParseError: React.createElement(IntlLabel, { keys: ["playground", "error", "parse"], value: "Parse error occurred." }),
  InvalidJson: React.createElement(IntlLabel, { keys: ["playground", "mock", "json", "invalid"], value: "The JSON format is incorrect. Please check and modify before confirming." }),
  CopiedToClipboard: React.createElement(IntlLabel, { keys: ["playground", "message", "copied-to-clipboard"], value: "Copied!" }),
  CopyToClipboard: React.createElement(IntlLabel, { keys: ["playground", "action", "copy-to-clipboard"], value: "Copy to Clipboard" }),
  Download: React.createElement(IntlLabel, { keys: ["playground", "action", "download"], value: "Download as File" }),
  ConfirmAndRefresh: React.createElement(IntlLabel, { keys: ["playground", "action", "confirm-and-refresh"], value: "Confirm and Refresh" }),
  Close: React.createElement(IntlLabel, { keys: ["playground", "action", "close"], value: "Close" }),
  Cancel: React.createElement(IntlLabel, { keys: ["playground", "action", "cancel"], value: "Cancel" })
};
var PlaygroundEventTypes;
(function(PlaygroundEventTypes2) {
  PlaygroundEventTypes2["SWITCH_EDITOR_BADGE"] = "switch-editor-badge";
  PlaygroundEventTypes2["SWITCH_VIEWER_WRAPPER"] = "switch-viewer-wrapper";
  PlaygroundEventTypes2["MAXIMIZE"] = "maximize";
  PlaygroundEventTypes2["QUIT_MAXIMIZE"] = "quit-maximize";
  PlaygroundEventTypes2["ZEN"] = "zen";
  PlaygroundEventTypes2["QUIT_ZEN"] = "quit-zen";
  PlaygroundEventTypes2["WIDGET_GROUP_CHANGE"] = "widget-group-change";
  PlaygroundEventTypes2["RESIZE_EDITOR"] = "resize-editor";
  PlaygroundEventTypes2["ASK_NODE_DEF"] = "ask-node-def";
  PlaygroundEventTypes2["LOCATE_LINE"] = "locate-line";
  PlaygroundEventTypes2["CONTENT_CHANGED"] = "content-changed";
  PlaygroundEventTypes2["INSERT_WIDGET_TEMPLATE"] = "insert-widget-template";
  PlaygroundEventTypes2["SHOW_WIDGET_TEMPLATE_DIALOG"] = "show-widget-template-dialog";
  PlaygroundEventTypes2["EDIT_MOCK_JSON"] = "edit-mock-json";
  PlaygroundEventTypes2["FORCE_UPDATE_VIEWER"] = "force-update-viewer";
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
    editorBadge: false,
    locator: true,
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
  const onShowBadgeClicked = () => {
    fire(PlaygroundEventTypes.SWITCH_EDITOR_BADGE, true);
    setState((state2) => ({ ...state2, editorBadge: true }));
  };
  const onHideBadgeClicked = () => {
    fire(PlaygroundEventTypes.SWITCH_EDITOR_BADGE, false);
    setState((state2) => ({ ...state2, editorBadge: false }));
  };
  const onShowLocatorClicked = () => {
    fire(PlaygroundEventTypes.SWITCH_VIEWER_WRAPPER, { locator: true });
    setState((state2) => ({ ...state2, locator: true }));
  };
  const onHideLocatorClicked = () => {
    fire(PlaygroundEventTypes.SWITCH_VIEWER_WRAPPER, { locator: false });
    setState((state2) => ({ ...state2, locator: false }));
  };
  const onMockJsonClicked = () => {
    fire(PlaygroundEventTypes.EDIT_MOCK_JSON);
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
    state.editorBadge ? React.createElement(ToolbarButton, { icon: PlaygroundIcons.HIDE_EDITOR_BADGE, tooltip: "Hide Editor Badge", click: onHideBadgeClicked }) : React.createElement(ToolbarButton, { icon: PlaygroundIcons.SHOW_EDITOR_BADGE, tooltip: "Show Editor Badge", click: onShowBadgeClicked }),
    state.locator ? React.createElement(ToolbarButton, { icon: PlaygroundIcons.HIDE_LOCATOR, tooltip: "Hide Widget Locator", click: onHideLocatorClicked }) : React.createElement(ToolbarButton, { icon: PlaygroundIcons.SHOW_LOCATOR, tooltip: "Show Widget Locator", click: onShowLocatorClicked }),
    React.createElement(ToolbarButton, { icon: PlaygroundIcons.JSON, tooltip: "Mock JSON", click: onMockJsonClicked }),
    React.createElement(ToolbarSeparator, null),
    !state.zen && state.maximized ? React.createElement(ToolbarButton, { icon: PlaygroundIcons.MINIMIZE, tooltip: "Quit Maximization", click: onMinClicked }) : null,
    !state.zen && !state.maximized ? React.createElement(ToolbarButton, { icon: PlaygroundIcons.MAXIMIZE, tooltip: "Maximize", click: onMaxClicked }) : null,
    state.zen ? React.createElement(ToolbarButton, { icon: PlaygroundIcons.WINDOW, tooltip: "Quit Zen Mode", click: onWindowClicked }) : React.createElement(ToolbarButton, { icon: PlaygroundIcons.ZEN, tooltip: "Zen Mode", click: onZenClicked })
  );
};
const SecondaryBar = (props) => {
  var _a;
  const { groups, buttons } = props;
  const { on, off, fire } = usePlaygroundEventBus();
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
  const onAddWidget = (keyOrWidgetType) => () => {
    fire(PlaygroundEventTypes.INSERT_WIDGET_TEMPLATE, keyOrWidgetType);
  };
  return React.createElement(SecondaryToolbar, null, (buttons[state.group] ?? []).map((button) => {
    const { key, icon, tooltip } = button;
    return React.createElement(ToolbarButton, { icon, tooltip, click: onAddWidget(key), key });
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
      buttons2[group].push({
        key: $key ?? $wt,
        icon,
        tooltip: VUtils.isBlank(tooltip) ? $key ?? $wt : tooltip
      });
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
const HeadingMarkTag = Tag.define();
const ListMarkTag = Tag.define();
const MightBeWidgetDeclarationTag = Tag.define(tags.content);
const WidgetDeclarationTag = Tag.define(tags.content);
const WidgetDeclarationSplitterTag = Tag.define();
const WidgetDeclarationTypeTag = Tag.define();
const WidgetDeclarationHeadlineTag = Tag.define();
const WidgetDeclarationPropertyTag = Tag.define();
const WidgetDeclarationIdTag = Tag.define();
const WidgetDeclarationFlagTag = Tag.define();
const WidgetDeclarationAttrNameTag = Tag.define();
const WidgetDeclarationAttrNameButBlankTag = Tag.define();
const WidgetDeclarationAttrNameJointTag = Tag.define();
const WidgetDeclarationAttrSplitterTag = Tag.define();
const WidgetDeclarationAttrValueTag = Tag.define();
const WidgetDeclarationAttrValueSplitterTag = Tag.define();
const WidgetDeclarationAttrValueIconTag = Tag.define();
const WidgetDeclarationAttrValueStrTag = Tag.define();
const WidgetDeclarationAttrValueExtTag = Tag.define();
const WidgetDeclarationNodes = [
  { name: "MightBeWidgetDeclaration", style: MightBeWidgetDeclarationTag },
  { name: "WidgetDeclaration", style: WidgetDeclarationTag },
  { name: "WidgetDeclarationSplitter", style: WidgetDeclarationSplitterTag },
  { name: "WidgetDeclarationType", style: WidgetDeclarationTypeTag },
  { name: "WidgetDeclarationHeadline", style: WidgetDeclarationHeadlineTag },
  { name: "WidgetDeclarationProperty", style: WidgetDeclarationPropertyTag },
  { name: "WidgetDeclarationId", style: WidgetDeclarationIdTag },
  { name: "WidgetDeclarationFlag", style: WidgetDeclarationFlagTag },
  { name: "WidgetDeclarationAttrName", style: WidgetDeclarationAttrNameTag },
  { name: "WidgetDeclarationAttrNameButBlank", style: WidgetDeclarationAttrNameButBlankTag },
  { name: "WidgetDeclarationAttrNameJoint", style: WidgetDeclarationAttrNameJointTag },
  { name: "WidgetDeclarationAttrSplitter", style: WidgetDeclarationAttrSplitterTag },
  { name: "WidgetDeclarationAttrValue", style: WidgetDeclarationAttrValueTag },
  { name: "WidgetDeclarationAttrValueSplitter", style: WidgetDeclarationAttrValueSplitterTag },
  { name: "WidgetDeclarationAttrValueIcon", style: WidgetDeclarationAttrValueIconTag },
  { name: "WidgetDeclarationAttrValueStr", style: WidgetDeclarationAttrValueStrTag },
  { name: "WidgetDeclarationAttrValueExt", style: WidgetDeclarationAttrValueExtTag }
];
const BOX = {
  $wt: index.N2WidgetType.BOX,
  label: "Box, for customized layout.",
  icon: PlaygroundIcons.BOX,
  group: PlaygroundWidgetGroupKey.CONTAINERS,
  template: `Box::[title]
`
};
const ValueChanged = {
  name: "valueChanged",
  label: "Snippet.",
  description: "Handle value changed."
};
const AutoSelect = {
  name: "autoSelect",
  label: "Boolean. Select all content automatically.",
  description: "Default true."
};
const InputPlaceholder = {
  name: "placeholder",
  label: "Text. Placeholder when no content."
};
const Please = { name: "please", label: "Text. Placeholder." };
const Clearable = { name: "clearable", label: "Boolean.", description: "Default true." };
const Click = { name: "click", label: "Snippet.", description: "Handle click event." };
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
const DecorateElements = (name) => {
  return {
    name,
    label: "Decorations.",
    description: "A string or a predefined icon. Icons need to start with “$icons.” Multiple decorations can be connected with “;”."
  };
};
const LeadsDecorateElements = DecorateElements("leads");
const TailsDecorateElements = DecorateElements("tails");
const OptionItemsProperties = [
  { name: "options", label: "Text, Various." },
  { name: "optionSort", label: "Text.", description: '"asc", "desc".' },
  { name: "sort", label: 'Text. Shortcut of "optionSort".', description: '"asc", "desc".' },
  { name: "noAvailable", label: "Text.", description: "Reminder text when no available option item." },
  { name: "noMatched", label: "Text.", description: "Reminder text when no matched option item." }
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
const ButtonProperties = [
  Ink,
  Fill,
  { name: "text", label: "Text.", description: "Label." },
  Click
];
const BUTTONS = [
  {
    $wt: index.N2WidgetType.BUTTON,
    label: "Button",
    properties: [...ButtonProperties, LeadsDecorateElements, TailsDecorateElements],
    icon: PlaygroundIcons.BUTTON,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    template: `Button::[caption]
- ink: success
- fill: plain
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
- click: validate me
- validateScopes: scope1, scope2
`
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
    group: PlaygroundWidgetGroupKey.DISPLAY,
    template: `Link::[caption]
- ink: warn
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
- click: validate me
- validateScopes: scope1, scope2
`
  }
];
const BUTTON_BAR = {
  $wt: index.N2WidgetType.BUTTON_BAR,
  label: "Button bar.",
  properties: [{ name: "alignment", label: "Text.", description: '"left", "center", "right".' }],
  icon: PlaygroundIcons.BUTTON_BAR,
  group: PlaygroundWidgetGroupKey.CONTAINERS,
  tooltip: "Button bar",
  template: `ButtonBar::
- alignment: left
- Button::::
  - click:
    \`\`\`
    alert('Remove clicked');
    \`\`\`
  - leads: $icons.remove
  - disabled
- Button::::
  - click:
    \`\`\`
    alert('Check clicked');
    \`\`\`
  - fill: plain
  - leads: $icons.check
`
};
const CalendarProperties = [
  Please,
  Clearable,
  { name: "date", label: "Boolean. Allow date part or not.", description: "Default true." },
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
  {
    name: "autoConfirmOnDate",
    label: "Boolean.",
    description: "Confirm selection when date clicked when no time part."
  },
  { name: "useCalendarIcon", label: "Boolean.", description: "Use calendar icon instead of caret." },
  { name: "couldPerform", label: "Snippet.", description: "Check given date could be performed or not." }
];
const CALENDARS = [
  {
    $wt: index.N2WidgetType.CALENDAR,
    label: "Date picker.",
    properties: [...CalendarProperties, ValueChanged, ValidationRequired],
    icon: PlaygroundIcons.DATE,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Date picker",
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.DATE,
    label: 'Date picker. Shortcut of "Calendar"',
    properties: [
      ...CalendarProperties.filter(({ name }) => !["date", "time", "timeFormat"].includes(name)),
      ValueChanged,
      ValidationRequired
    ],
    icon: PlaygroundIcons.DATE,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Date picker",
    template: `Date::[caption]::[property]
- dateFormat: YYYY/MM/DD
- fixedTimeAt: start
- initTimeAt: start
- useCalendarIcon
`
  },
  {
    $wt: index.N2WidgetType.DATETIME,
    label: "Datetime picker.",
    properties: [
      ...CalendarProperties.filter(({ name }) => !["date", "time", "fixedTimeAt"].includes(name)),
      ValueChanged,
      ValidationRequired
    ],
    icon: PlaygroundIcons.DATETIME,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Datetime picker",
    template: `DateTime::[caption]::[property]
- initTimeAt: 12:30:00
`
  },
  {
    $wt: index.N2WidgetType.TIME,
    label: "Datetime picker.",
    properties: [
      ...CalendarProperties.filter(({ name }) => !["date", "dateFormat", "autoConfirmOnDate", "time", "fixedTimeAt"].includes(name)),
      ValueChanged,
      ValidationRequired
    ],
    icon: PlaygroundIcons.TIME,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Time picker",
    template: `Time::[caption]::[property]
- initTimeAt: 12:30:00
`
  }
];
const CaptionProperties = [
  { name: "labelOnValue", label: "Boolean.", description: "Default false. Content read from model or not." },
  { name: "label", label: "Text.", description: 'Static content, ignored when "text" declared.' },
  { name: "text", label: "Text.", description: 'Static content, works on "labelOnValue" is false.' },
  { name: "valueToLabel", label: "Snippet.", description: "Snippet to compute display label." },
  Click
];
const CAPTIONS = [
  {
    $wt: index.N2WidgetType.CAPTION,
    label: "Caption.",
    properties: [...CaptionProperties, LeadsDecorateElements, TailsDecorateElements],
    icon: PlaygroundIcons.CAPTION,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    template: `Caption::[caption]
- text: Hello world
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
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
    group: PlaygroundWidgetGroupKey.DISPLAY,
    template: `Label::[caption]::[property]
- valueToLabel: \`value ?? 'An empty value.'\`
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
  },
  {
    $wt: index.N2WidgetType.BADGE,
    label: 'Badge. Shortcut of "Caption".',
    description: "With ink and fill mode.",
    properties: [...CaptionProperties, Ink, Fill, LeadsDecorateElements, TailsDecorateElements],
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  }
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
const CHECKBOXES = [
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
      ValueChanged,
      ValidationRequired
    ],
    icon: PlaygroundIcons.CHECKBOX,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    template: `Checkbox::[caption]::[property]
- values: 1, 0
`
  },
  {
    $wt: index.N2WidgetType.CHECKBOXES,
    label: "Checkbox group.",
    properties: [...CheckboxesProperties, ValueChanged, ValidationRequired, ValidationLength],
    icon: PlaygroundIcons.CHECKS,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Checkbox group",
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.CHECKS,
    label: 'Checkbox group. Shortcut of "Checkboxes".',
    properties: [...CheckboxesProperties, ValueChanged, ValidationRequired, ValidationLength],
    icon: PlaygroundIcons.CHECKS,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Checkbox group",
    template: `Checks::[caption]::[property]
- options: 1: Pizza; 2: Hamburger; 3: Noodle
`
  }
];
const DECORATE_INPUTS = [
  {
    $wt: index.N2WidgetType.DECORATE_INPUT,
    label: "Decorable input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      ValueChanged,
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
    tooltip: "Decorable input",
    template: `DecoInput::[caption]::[property]
- placeholder: a placeholder text
- length: 5,10,15..20; Length should be 5, 10 or between 15 and 20.
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
  },
  {
    $wt: index.N2WidgetType.DECORATE_NUMBER,
    label: "Decorable number input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      ValueChanged,
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
    tooltip: "Decorable number input",
    template: `DecoNumber::[caption]::[property]
- notNegative, integer
- placeholder: a placeholder text
- numberRange: ..100],(200..300],[400..; Value should <=100, or >200 and <=300, or >=400.
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
  },
  {
    $wt: index.N2WidgetType.DECORATE_PASSWORD,
    label: "Decorable password input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      ValueChanged,
      LeadsDecorateElements,
      TailsDecorateElements,
      ValidationRequired,
      ValidationRegex,
      ValidationRegexp,
      ValidationLength
    ],
    icon: PlaygroundIcons.DECO_PASSWORD,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Decorable password input",
    template: `DecoPwd::[caption]::[property]
- placeholder: a placeholder text
- length: 12..; Minimum length is 12.
- regex: key-of-predefined-regex
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
  }
];
const DropdownProperties = [
  ...OptionItemsProperties,
  Please,
  Clearable,
  { name: "maxWidth", label: "Number.", description: "Max popup width, in pixels." }
];
const DROPDOWNS = [
  {
    $wt: index.N2WidgetType.DROPDOWN,
    label: "Dropdown.",
    properties: [...DropdownProperties, ValueChanged, ValidationRequired],
    icon: PlaygroundIcons.DROPDOWN,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    template: `Dropdown::[caption]::[property]
- !clearable
- please: a placeholder text
- options:
  - Y: Yes
  - N: No
  - U: Unknown
`
  },
  {
    $wt: index.N2WidgetType.MULTI_DROPDOWN,
    label: "Dropdown allows multiple choices.",
    properties: [...DropdownProperties, ValueChanged, ValidationRequired, ValidationLength],
    icon: PlaygroundIcons.MULTI_DROPDOWN,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Multiple choices",
    template: `MultiDropdown::[caption]::[property]
- !clearable
- please: a placeholder text
- options: 1: Pizza; 2: Hamburger; 3: Noodle
- sort: asc
`
  }
];
const ChartProperties = [
  { name: "initOptions", label: "Snippet.", description: "Init options of echarts." },
  { name: "options", label: "Snippet.", description: "Options of echarts." },
  { name: "settings", label: "Snippet.", description: "Settings of echarts." },
  { name: "marker", label: "Text.", description: "Global identify this section when global event fired." },
  {
    name: "mergeData",
    label: "Snippet.",
    description: "Merge data into chart options, data format depends on chart type."
  },
  {
    name: "merge",
    label: 'Snippet. Shortcut of "mergeData".',
    description: "Merge data into chart options, data format depends on chart type."
  },
  { name: "loading", label: "Snippet.", description: "Loading options of echarts." },
  { name: "height", label: "Text, Number.", description: "Height of chart." }
];
const ChartFetchProperties = [
  {
    name: "fetchData",
    label: "Snippet.",
    description: "Fetch data for chart. Data format depends on chart type."
  },
  {
    name: "fetch",
    label: 'Snippet. Shortcut of "fetchData".',
    description: "Fetch data for chart. Data format depends on chart type."
  }
];
const EChartsWidgets = [
  {
    $wt: "Chart",
    $key: "ChartPie",
    label: "Pie chart.",
    properties: ChartProperties,
    icon: PlaygroundIcons.CHART_PIE,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Pie Chart",
    template: `Chart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    yAxis: {type: 'value'},
    series: [{type: 'pie'}]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  // options.series[0].data = data;
  options.series[0].data = [120, 200, 150, 80, 70, 110, 130];
  return options;
  \`\`\`
`
  },
  {
    $wt: "Chart",
    $key: "ChartBar",
    label: "Bar chart.",
    properties: ChartProperties,
    icon: PlaygroundIcons.CHART_BAR,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Bar Chart",
    template: `Chart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    yAxis: {type: 'value'},
    series: [{type: 'bar'}]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  // options.series[0].data = data;
  options.series[0].data = [120, 200, 150, 80, 70, 110, 130];
  return options;
  \`\`\`
`
  },
  {
    $wt: "Chart",
    $key: "ChartLine",
    label: "Line chart.",
    properties: ChartProperties,
    icon: PlaygroundIcons.CHART_LINE,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Line Chart",
    template: `Chart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    yAxis: {type: 'value'},
    series: [{type: 'line'}]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  // options.series[0].data = data;
  options.series[0].data = [120, 200, 150, 80, 70, 110, 130];
  return options;
  \`\`\`
`
  },
  {
    $wt: "RelChart",
    label: "Chart. Refresh depends on others.",
    properties: [
      ...ChartProperties,
      ...ChartFetchProperties,
      { name: "fetchDefer", label: "Number.", description: "Defer time in seconds after criteria changed." },
      {
        name: "defer",
        label: 'Number. Shortcut of "fetchDefer".',
        description: "Defer time in seconds after criteria changed."
      }
    ],
    icon: PlaygroundIcons.CHART_RELIANT,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Chart depends on data",
    template: `RelChart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    legend: {top: 'bottom'},
    series: [
      {
        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',
        itemStyle: { borderRadius: 8 }
      }
    ]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  options.series[0].data = data;
  return options;
  \`\`\`
- fetch:
  \`\`\`typescript
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {
    return { value: Math.ceil(Math.random() * 30) + 20, name };
  });
  \`\`\`
- criteria:
  - on: /criteria.**
`
  },
  {
    $wt: "AutChart",
    label: "Chart. Refresh autonomously.",
    properties: [
      ...ChartProperties,
      ...ChartFetchProperties,
      { name: "fetchInterval", label: "Number.", description: "Interval time in seconds." },
      { name: "interval", label: 'Number. Shortcut of "fetchInterval".', description: "Interval time in seconds." }
    ],
    icon: PlaygroundIcons.CHART_AUTONOMOUS,
    group: PlaygroundWidgetGroupKey.DISPLAY,
    tooltip: "Auto refresh chart",
    template: `AutChart::[caption]::[property]
- options:
  \`\`\`javascript
  return {
    legend: {top: 'bottom'},
    series: [
      {
        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',
        itemStyle: { borderRadius: 8 }
      }
    ]
  }
  \`\`\`
- merge:
  \`\`\`javascript
  options.series[0].data = data;
  return options;
  \`\`\`
- fetch:
  \`\`\`typescript
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {
    return { value: Math.ceil(Math.random() * 30) + 20, name };
  });
  \`\`\`
- interval: 1
`
  }
];
const INPUTS = [
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
      ValueChanged,
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
    group: PlaygroundWidgetGroupKey.INPUTS,
    template: `Input::[caption]::[property]
- placeholder: a placeholder text
- required: a reminder message
- length: 5,10,15..20; Length should be 5, 10 or between 15 and 20.
`
  },
  {
    $wt: index.N2WidgetType.NUMBER,
    label: "Number input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      ValueChanged,
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
    tooltip: "Number input",
    template: `Number::[caption]::[property]
- notNegative, integer
- placeholder: a placeholder text
- numberRange: ..100],(200..300],[400..; Value should <=100, or >200 and <=300, or >=400.
`
  },
  {
    $wt: index.N2WidgetType.PASSWORD,
    label: "Password input box.",
    properties: [
      AutoSelect,
      InputPlaceholder,
      ValueChanged,
      ValidationRequired,
      ValidationRegex,
      ValidationRegexp,
      ValidationLength
    ],
    icon: PlaygroundIcons.PASSWORD,
    group: PlaygroundWidgetGroupKey.INPUTS,
    tooltip: "Password input",
    template: `Pwd::[caption]::[property]
- placeholder: a placeholder text
- length: 12..; Minimum length is 12.
- regex: key-of-predefined-regex
`
  }
];
const PAGE = {
  $wt: index.N2WidgetType.PAGE,
  description: "Only one allowed, and always at the highest level.",
  icon: "",
  group: PlaygroundWidgetGroupKey.NOT_CARE,
  notInToolbar: true
};
const PAGINATION = {
  $wt: index.N2WidgetType.PAGINATION,
  properties: [
    { name: "freeWalk", label: "Boolean.", description: "Default false. Show page free walker dropdown." },
    { name: "maxButtons", label: "Number.", description: "Default 7. Maximum page buttons." },
    { name: "possibleSizes", label: "Text.", description: "Possible page size. Show page size dropdown." },
    ValueChanged
  ],
  icon: "",
  group: PlaygroundWidgetGroupKey.NOT_CARE,
  notInToolbar: true
};
const RADIOS = [
  {
    $wt: index.N2WidgetType.RADIO,
    label: "Radio button.",
    properties: [
      {
        name: "values",
        label: "Text.",
        description: 'One or two values, connected by ",". First is true value, second is false value.'
      },
      ValueChanged,
      ValidationRequired
    ],
    icon: PlaygroundIcons.RADIO,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Radio button",
    template: `Radio::[caption]::[property]
- values: 1, 0
`
  },
  {
    $wt: index.N2WidgetType.RADIOS,
    label: "Radio button group.",
    properties: [
      ...CheckboxesProperties.filter(({ name }) => name !== "single" && name !== "boolOnSingle"),
      ValueChanged,
      ValidationRequired
    ],
    icon: PlaygroundIcons.RADIOS,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    tooltip: "Radio button group",
    template: `Radios::[caption]::[property]
- options:
  - Y: Yes
  - N: No
  - U: Unknown
`
  }
];
const RibsProperties = [
  { name: "caption", label: "Text, Various.", description: "Caption for each item." },
  {
    name: "useSectionStyleIcons",
    label: "Boolean.",
    description: "Use section style icons for expanding and collapsing."
  }
];
const RIBS = [
  {
    $wt: index.N2WidgetType.RIBS,
    properties: [...RibsProperties, ...ArrayProperties],
    icon: PlaygroundIcons.RIBS,
    group: PlaygroundWidgetGroupKey.CONTAINERS,
    template: `Ribs::
- removable, addable, disableOnCannotAdd
- elementTitle:
  - labelOnValue
  - property: titleProperty
- Input::Property A::propA
- Input::Property B::propB
`
  },
  {
    $wt: index.N2WidgetType.READONLY_RIBS,
    label: "Readonly Ribs.",
    properties: [...RibsProperties, NoElementReminder],
    icon: "",
    group: PlaygroundWidgetGroupKey.NOT_CARE,
    notInToolbar: true
  }
];
const SECTION = {
  $wt: index.N2WidgetType.SECTION,
  icon: PlaygroundIcons.SECTION,
  group: PlaygroundWidgetGroupKey.CONTAINERS,
  properties: [
    { name: "title", label: "Text." },
    { name: "collapsible", label: "Boolean.", description: "Section could be folded." },
    { name: "marker", label: "Text.", description: "Global identify this section when global event fired." }
  ],
  template: `Section::[title]
- collapsible
- marker: global-unique-marker
`
};
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
const TABLE = [
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
    group: PlaygroundWidgetGroupKey.CONTAINERS,
    template: `Table::
- property: property
- expandable, clickToExpand, addable, removable, !hideClassicCellsOnExpandable
- omitDefaultRowOperators
- addLabel: Add New One
- maxBodyHeight: 400
- fixedLeadColumns: 1
- fixedTailColumns: 1
- operatorsColumnWidth: 200
- headers:
  - Column A: 300
  - Column B: 300
  - Column C: 500
  - Column D: 200
  - Column E: 200
  - Column F: 200
  - Column G: 100
- Label::::columnA
- Caption::::
  - label: Say Hello to World
  - click: alert: Hello World!
- Label::::columnC
- Label::::columnD
- Label::::columnE
- Label::::columnF
- Label::::columnG
- Table::
  - property: nested
  - headers:
    - Nest Column A: 300
    - Nest Column B: 300
  - Label::::columnNA
  - Label::::columnNB
- RowOperators::
  - Button::
    - text: X
    - fill: plain
    - click: alert: X
  - Button::
    - fill: plain
    - tails: $icons.view
    - click: alert: View
  - Button::
    - fill: plain
    - tails: $icons.edit
    - click: alert: Edit
  - Button::
    - fill: plain
    - tails: $icons.remove
    - prebuilt: remove
  - Button::
    - fill: plain
    - tails: $icons.expand
    - prebuilt: expand
  - Button::
    - fill: plain
    - tails: $icons.collapse
    - prebuilt: collapse
- Pagination::::page
  - maxButtons: 3
`
  }
];
const TABS = [
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
    group: PlaygroundWidgetGroupKey.CONTAINERS,
    template: `Tabs::
- Tab::[caption]::[property1]
  - Input::[caption]::[property]
- Tab::::[property2]
  - title:
    - valueToLabel: \`'Tab2 title'\`
  - badge: Badge
    - property: count
    - labelOnValue
    - ink: info
  - Checkbox::[caption]::[property]
`
  }
];
const TEXTAREA = {
  $wt: index.N2WidgetType.TEXTAREA,
  properties: [
    AutoSelect,
    InputPlaceholder,
    ValueChanged,
    ValidationRequired,
    ValidationLength
  ],
  icon: PlaygroundIcons.TEXTAREA,
  group: PlaygroundWidgetGroupKey.INPUTS,
  template: `Textarea::[caption]::[property]
- placeholder: a placeholder text
- length: 10..; Minimum length is 10.
`
};
const TREES = [
  {
    $wt: index.N2WidgetType.TREE,
    properties: [
      { name: "height", label: "Number.", description: "In pixels." },
      { name: "initExpandLevel", label: "Number.", description: "Default -1. Starts from 0." },
      { name: "showIndex", label: "Boolean.", description: "Default false. Show node index or not." },
      { name: "detective", label: "Snippet.", description: "Tree nodes builder." }
    ],
    icon: PlaygroundIcons.TREE,
    group: PlaygroundWidgetGroupKey.CONTAINERS,
    template: `Tree::::tree
- showIndex
- initExpandLevel: 0
- height: 400
`
  },
  {
    $wt: index.N2WidgetType.DROPDOWN_TREE,
    label: "Dropdown with tree.",
    properties: [
      { name: "couldSelect", label: "Snippet.", description: "Check if the selected node can be used as a value." },
      ...DropdownProperties,
      ValueChanged,
      ValidationRequired
    ],
    icon: PlaygroundIcons.DROPDOWN_TREE,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    template: `DropdownTree::[caption]::[property]
- !clearable
- please: a placeholder text
- options: @ext.options
`
  },
  {
    $wt: index.N2WidgetType.DDT,
    label: 'Dropdown with tree. Shortcut of "DropdownTree".',
    properties: [
      { name: "couldSelect", label: "Snippet.", description: "Check if the selected node can be used as a value." },
      ...DropdownProperties,
      ValueChanged,
      ValidationRequired
    ],
    icon: PlaygroundIcons.DROPDOWN_TREE,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    template: `DDT::[caption]::[property]
- !clearable
- please: a placeholder text
- options: @ext.options
`,
    notInToolbar: true
  },
  {
    $wt: index.N2WidgetType.MULTI_DROPDOWN_TREE,
    label: "Dropdown allows multiple choices, with tree.",
    properties: [
      { name: "couldSelect", label: "Snippet.", description: "Check if the selected node can be used as a value." },
      ...DropdownProperties,
      ValueChanged,
      ValidationRequired,
      ValidationLength
    ],
    icon: PlaygroundIcons.DROPDOWN_TREE,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    template: `MultiDropdownTree::[caption]::[property]
- !clearable
- please: a placeholder text
- options: @ext.options
`
  },
  {
    $wt: index.N2WidgetType.MDDT,
    label: 'Dropdown allows multiple choices, with tree. Shortcut of "DropdownTree".',
    properties: [
      { name: "couldSelect", label: "Snippet.", description: "Check if the selected node can be used as a value." },
      ...DropdownProperties,
      ValueChanged,
      ValidationRequired,
      ValidationLength
    ],
    icon: PlaygroundIcons.DROPDOWN_TREE,
    group: PlaygroundWidgetGroupKey.OPTIONS,
    template: `MDDT::[caption]::[property]
- !clearable
- please: a placeholder text
- options: @ext.options
`,
    notInToolbar: true
  }
];
const WIZARD = [
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
    group: PlaygroundWidgetGroupKey.CONTAINERS,
    template: `Wizard::::[property]
- balloon: false
- reached: 1
- WStep::[caption]::[property1]
  - Input::[caption]::[property]
- WStep::::[property2]
  - title:
    - valueToLabel: \`'Step #2'\`
  - Checkbox::[caption]::[property2]
- WStep::[caption]::[property3]
- WStep::[caption]::[property4]
`
  }
];
const N2Widgets = [
  PAGE,
  SECTION,
  BOX,
  BUTTON_BAR,
  ...INPUTS,
  ...DECORATE_INPUTS,
  TEXTAREA,
  ...CALENDARS,
  ...CHECKBOXES,
  ...RADIOS,
  ...DROPDOWNS,
  ...CAPTIONS,
  ...BUTTONS,
  ...TABLE,
  ...RIBS,
  ...TABS,
  ...WIZARD,
  ...TREES,
  PAGINATION
];
const WIDGET_DECLARATION_SPLITTER = index$2$1.AbstractSemanticNodeWidgetParser.WIDGET_TITLE_SPLITTER;
const ATTRIBUTE_DECLARATION_SPLITTER = ":";
const ATTRIBUTE_DECLARATION_JOINT = ",";
const ATTRIBUTE_DECLARATION_EXCLAMATION_MARK = "!";
const ATTRIBUTE_VALUE_CONST_START = "$";
const ATTRIBUTE_VALUE_ICON_SYMBOL = "$icons";
const ATTRIBUTE_VALUE_ICON_PREFIX = `${ATTRIBUTE_VALUE_ICON_SYMBOL}.`;
const ATTRIBUTE_VALUE_REF_START = "@";
const ATTRIBUTE_VALUE_EXT_SYMBOL = "@ext";
const ATTRIBUTE_VALUE_EXT_PREFIX = `${ATTRIBUTE_VALUE_EXT_SYMBOL}.`;
const N2WidgetGroups = [
  { icon: PlaygroundIcons.CONTAINER_GROUP, tooltip: "Container", key: PlaygroundWidgetGroupKey.CONTAINERS },
  { icon: PlaygroundIcons.INPUT_GROUP, tooltip: "Input", key: PlaygroundWidgetGroupKey.INPUTS },
  { icon: PlaygroundIcons.OPTIONS_GROUP, tooltip: "Choices", key: PlaygroundWidgetGroupKey.OPTIONS },
  { icon: PlaygroundIcons.DISPLAY_GROUP, tooltip: "Label & Chart", key: PlaygroundWidgetGroupKey.DISPLAY }
];
const computeWidgetGroups = (groups, useN2) => {
  return [...useN2 ? N2WidgetGroups : [], ...groups];
};
const computeWidgets = (widgets, options) => {
  return [
    ...options.useN2 ? N2Widgets : [],
    ...options.useCharts ? EChartsWidgets : [],
    ...widgets
  ];
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
const N2IconsApplicableTo = [
  { $wt: "Button", properties: ["leads", "tails"] },
  { $wt: "Label", properties: ["leads", "tails"] },
  { $wt: "Caption", properties: ["leads", "tails"] },
  { $wt: "Badge", properties: ["leads", "tails"] },
  { $wt: "DecoInput", properties: ["leads", "tails"] },
  { $wt: "DecoNumber", properties: ["leads", "tails"] },
  { $wt: "DecoPwd", properties: ["leads", "tails"] }
];
const computeIcons = (icons, useN2) => {
  return {
    icons: [...useN2 ? N2Icons : [], ...icons.icons],
    applicableTo: [...useN2 ? N2IconsApplicableTo : [], ...icons.applicableTo]
  };
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
  { name: "renderOn", label: "Text, Snippet.", description: 'Alias of "$renderOn".' },
  {
    name: "$renderOn",
    label: "Text, Snippet.",
    description: 'Render on specific devices, could be one of "desktop", "mobile", "touchable" "tablet", or connected by "," or ";".'
  },
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
  { name: "label", label: "Various.", description: "Label for form cell." },
  {
    name: "style",
    label: "Text.",
    description: "CSS style, could be [[[name: value]; name: value]...] or a JSON string."
  }
];
const getCommonWidgetAttributes = () => {
  return CommonWidgetAttributes;
};
const parseWidgetFlag = (text) => {
  const str = (text ?? "").trim();
  const matches = index$2$1.HeadingParser.WIDGET_TITLE_FLAG_MATCHERS.find((matcher) => str.endsWith(matcher));
  if (matches == null) {
    return { title: text };
  } else {
    const index2 = text.indexOf(matches);
    return { title: text.substring(0, index2), $flag: text.substring(index2 + 2), $flagOffset: index2 };
  }
};
const parseWidgetDeclaration = (text) => {
  const { title, ...$flags } = parseWidgetFlag(text);
  text = title;
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
  return ctx.addElement(ctx.elt("WidgetDeclaration", offset, offset + text.length, children));
};
const parseAttribute = (ctx, text, offset) => {
  const segments = text.split(ATTRIBUTE_DECLARATION_SPLITTER);
  if (segments.length === 1) {
    return -1;
  }
  const [attributeName, ...attributeValues] = segments;
  const attributeValue = attributeValues.join(ATTRIBUTE_DECLARATION_SPLITTER);
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
  return ctx.addElement(ctx.elt("WidgetDeclaration", offset, offset + text.length, children));
};
const parseAttributes = (ctx, text, offset) => {
  const segments = text.split(ATTRIBUTE_DECLARATION_JOINT).map((x) => {
    return { checked: VUtils.isNotBlank(x), text: x };
  });
  if (segments.length === 0 || segments.every((x) => !x.checked)) {
    return -1;
  }
  const lastIndex = segments.length - 1;
  const children = segments.reduce((parsed, { checked, text: text2 }, index2) => {
    if (checked) {
      parsed.elements.push(ctx.elt("WidgetDeclarationAttrName", parsed.offset, parsed.offset + text2.length));
    } else if (text2.length !== 0) {
      parsed.elements.push(ctx.elt("WidgetDeclarationAttrNameButBlank", parsed.offset, parsed.offset + text2.length));
    }
    if (index2 !== lastIndex) {
      parsed.elements.push(ctx.elt("WidgetDeclarationAttrNameJoint", parsed.offset + text2.length, parsed.offset + text2.length + 1));
    }
    parsed.offset = parsed.offset + 1 + text2.length;
    return parsed;
  }, { offset, elements: [] });
  return ctx.addElement(ctx.elt("WidgetDeclaration", offset, offset + text.length, children.elements));
};
const WidgetParse = {
  name: "WidgetDeclaration",
  parse: (ctx, _next, pos, leader) => {
    if (leader == null) {
      return -1;
    }
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
    const parsers = [
      parseWidget,
      ...leader === "ListItem" ? [parseAttribute, parseAttributes] : []
    ].filter((x) => x != null);
    return parsers.reduce((result, parse) => {
      if (result !== -1) {
        return result;
      }
      return parse(ctx, text, pos);
    }, -1);
  }
};
const parseInline = (type) => {
  return (parser, text, offset) => {
    const ctx = new InlineContext(parser, text, offset);
    const asWidget = WidgetParse.parse(ctx, ctx.char(offset), offset, type);
    offset = asWidget !== -1 ? asWidget : offset;
    outer:
      for (let pos = offset; pos < ctx.end; ) {
        const next = ctx.char(pos);
        for (const token of parser.inlineParsers) {
          if (token != null) {
            const result = token(ctx, next, pos, type);
            if (result >= 0) {
              pos = result;
              continue outer;
            }
          }
        }
        pos++;
      }
    return ctx.resolveMarkers(0);
  };
};
const ListItemParser = (() => {
  const parseInlineOnListItem = parseInline("ListItem");
  return {
    name: "WidgetOnListItem",
    leaf(ctx, _leaf) {
      if (ctx.parentType().name !== "ListItem") {
        return null;
      } else {
        return {
          nextLine(_ctx, _line, _leaf2) {
            return true;
          },
          finish(ctx2, leaf) {
            ctx2.addLeafElement(leaf, ctx2.elt("MightBeWidgetDeclaration", leaf.start, leaf.start + leaf.content.length, [
              ...parseInlineOnListItem(ctx2.parser, leaf.content, leaf.start)
            ]));
            return true;
          }
        };
      }
    },
    after: "SetextHeading"
  };
})();
const HeadingParser = (() => {
  const isAtxHeading = (line) => {
    if (line.next != 35) {
      return -1;
    }
    let pos = line.pos + 1;
    while (pos < line.text.length && line.text.charCodeAt(pos) == 35) {
      pos++;
    }
    if (pos < line.text.length && line.text.charCodeAt(pos) != 32) {
      return -1;
    }
    const size = pos - line.pos;
    return size > 6 ? -1 : size;
  };
  const skipSpaceBack = (line, i, to) => {
    while (i > to && space(line.charCodeAt(i - 1))) {
      i--;
    }
    return i;
  };
  const space = (ch) => {
    return ch == 32 || ch == 9 || ch == 10 || ch == 13;
  };
  let Type;
  (function(Type2) {
    Type2[Type2["HeaderMark"] = 34] = "HeaderMark";
    Type2[Type2["ATXHeading1"] = 9] = "ATXHeading1";
  })(Type || (Type = {}));
  const parseInlineOnHeading = parseInline("Heading");
  return {
    name: "ATXHeading",
    parse(ctx, line) {
      const size = isAtxHeading(line);
      if (size < 0) {
        return false;
      }
      const offset = line.pos;
      const from = ctx.lineStart + offset;
      const endOfSpace = skipSpaceBack(line.text, line.text.length, offset);
      let after = endOfSpace;
      while (after > offset && line.text.charCodeAt(after - 1) == line.next) {
        after--;
      }
      if (after == endOfSpace || after == offset || !space(line.text.charCodeAt(after - 1))) {
        after = line.text.length;
      }
      const buf = ctx.buffer.write(Type.HeaderMark, 0, size).writeElements(parseInlineOnHeading(ctx.parser, line.text.slice(offset + size + 1, after), from + size + 1), -from);
      if (after < line.text.length) {
        buf.write(Type.HeaderMark, after - offset, endOfSpace - offset);
      }
      const node = buf.finish(Type.ATXHeading1 - 1 + size, line.text.length - offset);
      ctx.nextLine();
      ctx.addNode(node, from);
      return true;
    }
  };
})();
const findPropertyNode = (node) => {
  while (node.name !== "WidgetDeclarationAttrName") {
    node = node.prevSibling;
    if (node.name === "BulletList" || node.name === "ListItem") {
      break;
    }
  }
  if (node.name !== "WidgetDeclarationAttrName") {
    return void 0;
  }
  return node;
};
const findWidgetType = (node, state) => {
  var _a, _b, _c;
  const bulletList = node.parent;
  if (bulletList == null || bulletList.name !== "BulletList") {
    return void 0;
  }
  const parent = bulletList.parent;
  if (parent == null) {
    return {};
  }
  const tryToFind = (declaration, heading) => {
    if (declaration == null || declaration.name !== "WidgetDeclaration") {
      return {};
    }
    const declarationType = declaration.firstChild;
    if (declarationType == null || declarationType.name !== "WidgetDeclarationType") {
      return {};
    }
    return { $wt: (state.sliceDoc(declarationType.from, declarationType.to) ?? "").trim(), direct: true };
  };
  if (parent.name === "Document") {
    let previous = parent.childBefore(node.from);
    while (previous != null && !previous.name.startsWith("ATXHeading")) {
      previous = parent.childBefore(previous.from);
    }
    if (previous == null) {
      return {};
    }
    return tryToFind((_a = previous.firstChild) == null ? void 0 : _a.nextSibling);
  } else if (parent.name !== "ListItem") {
    return {};
  } else {
    return tryToFind((_c = (_b = parent.firstChild) == null ? void 0 : _b.nextSibling) == null ? void 0 : _c.firstChild);
  }
};
const findParentWidgetType = (node, state) => {
  var _a, _b;
  if (node.name === "ListItem") {
    return findWidgetType(node, state).$wt;
  } else if (node.name.startsWith("ATXHeading")) {
    const level = Number(node.name.substring(10));
    let previous = node.prevSibling;
    while (previous != null) {
      if (previous.name.startsWith("ATXHeading")) {
        const previousLevel = Number(previous.name.substring(10));
        if (previousLevel < level) {
          const typeNode = (_b = (_a = previous.firstChild) == null ? void 0 : _a.nextSibling) == null ? void 0 : _b.firstChild;
          if ((typeNode == null ? void 0 : typeNode.name) === "WidgetDeclarationType") {
            return (state.sliceDoc(typeNode.from, typeNode.to) ?? "").trim();
          } else {
            return void 0;
          }
        }
      }
      previous = previous.prevSibling;
    }
    return void 0;
  } else {
    return void 0;
  }
};
const findWidgetTypeAndProperty = (node, state, tree) => {
  const propertyNode = findPropertyNode(node);
  if (propertyNode == null) {
    return {};
  }
  const property = (state.sliceDoc(propertyNode.from, propertyNode.to) ?? "").trim();
  let nodeBefore = tree.resolveInner(propertyNode.from, -1);
  if (nodeBefore == null) {
    return { property };
  } else if (nodeBefore.name === "MightBeWidgetDeclaration") {
    nodeBefore = tree.resolveInner(nodeBefore.from, -1);
  }
  if (nodeBefore.name === "ListItem") {
    const { $wt, direct } = findWidgetType(nodeBefore, state);
    return { $wt, property, direct };
  } else {
    return { property };
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
    widgets.push(rangeDecoration(Decoration.widget({ widget: new WidgetDeclarationIcon(ch, classSuffix), side: 1 })));
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
  { tag: HeadingMarkTag, class: "d9-playground-editor-heading-mark" },
  { tag: ListMarkTag, class: "d9-playground-editor-list-mark" },
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
  { tag: WidgetDeclarationAttrNameButBlankTag, class: "d9-playground-editor-widget-declaration-attr-name-but-blank" },
  { tag: WidgetDeclarationAttrNameJointTag, class: "d9-playground-editor-widget-declaration-attr-name-joint" },
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
  const WidgetIconOptions = widgets.icons.icons.map(({ $key, label, description }) => ({ label: $key, detail: label, info: description, type: "variable" }));
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
  const completeListItem = (context, nodeBefore, attributes) => {
    const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? "";
    const tagBefore = /([-|*]\s+)(.*)$/.exec(textBefore);
    if (tagBefore == null) {
      return null;
    }
    const { $wt: widgetType } = findWidgetType(nodeBefore, context.state);
    let typeOptions = WidgetTypeOptions;
    if (widgetType != null) {
      typeOptions = typeOptions.filter((option) => {
        return option.$parent == null || option.$parent === widgetType || Array.isArray(option.$parent) && option.$parent.includes(widgetType);
      });
    }
    const attrOptions = widgetType == null || widgetType === index.N2WidgetType.PAGE ? [] : WidgetAttrNameOptions.filter((option) => {
      return option.$wt === "$all" || option.$wt === widgetType;
    });
    const lastJointIndex = attributes ? Math.max(textBefore.lastIndexOf(ATTRIBUTE_DECLARATION_JOINT), textBefore.lastIndexOf(" "), textBefore.lastIndexOf(ATTRIBUTE_DECLARATION_EXCLAMATION_MARK)) : -1;
    if (lastJointIndex !== -1) {
      return {
        from: nodeBefore.from + lastJointIndex + 1,
        options: [...typeOptions, ...attrOptions]
      };
    } else {
      return {
        from: nodeBefore.from + tagBefore[1].length,
        options: [...typeOptions, ...attrOptions]
      };
    }
  };
  const completeMightBeWidgetDeclaration = (context, nodeBefore, tree, attributes) => {
    const nodeBefore2 = tree.resolveInner(nodeBefore.from, -1);
    if (nodeBefore2 == null) {
      return null;
    } else if (nodeBefore2.name === "ListItem") {
      return completeListItem(context, nodeBefore2, attributes);
    } else {
      return null;
    }
  };
  const completeWidgetDeclarationAttrName = (context, nodeBefore, tree) => {
    let nodeBefore2 = tree.resolveInner(nodeBefore.from, -1);
    if (nodeBefore2 == null) {
      return null;
    } else if (nodeBefore2.name === "ListItem") {
      return completeListItem(context, nodeBefore2, true);
    } else if (nodeBefore2.name === "MightBeWidgetDeclaration") {
      return completeMightBeWidgetDeclaration(context, nodeBefore2, tree, true);
    } else if ([
      "WidgetDeclarationAttrName",
      "WidgetDeclarationAttrNameButBlank",
      "WidgetDeclarationAttrNameJoint"
    ].includes(nodeBefore2.name)) {
      while (true) {
        nodeBefore2 = tree.resolveInner(nodeBefore2.from, -1);
        if (nodeBefore2.name === "ListItem") {
          return completeListItem(context, nodeBefore2, true);
        } else if (nodeBefore2.name === "MightBeWidgetDeclaration") {
          return completeMightBeWidgetDeclaration(context, nodeBefore2, tree, true);
        } else if (!nodeBefore2.name.startsWith("WidgetDeclaration")) {
          break;
        }
      }
      return null;
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
    const tree = syntaxTree(context.state);
    const nodeBefore = tree.resolveInner(context.pos, -1);
    if (nodeBefore == null) {
      return null;
    }
    switch (true) {
      case nodeBefore.name.startsWith("ATXHeading"):
        return completeHeading(context, nodeBefore);
      case nodeBefore.name === "ListItem":
        return completeListItem(context, nodeBefore, false);
      case nodeBefore.name === "MightBeWidgetDeclaration":
        return completeMightBeWidgetDeclaration(context, nodeBefore, tree, false);
      case nodeBefore.name === "WidgetDeclarationAttrName":
      case nodeBefore.name === "WidgetDeclarationAttrNameButBlank":
      case nodeBefore.name === "WidgetDeclarationAttrNameJoint":
        return completeWidgetDeclarationAttrName(context, nodeBefore, tree);
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
const createWidgetLinter = (options) => {
  const putIntoExtMap = (map, edt, key, parentKey) => {
    const id = parentKey == null ? key : `${parentKey}.${key}`;
    map.byKey[id] = edt;
    (edt.properties ?? []).filter((x) => VUtils.isNotBlank(x)).map((property) => {
      const $wtAndPp = `${edt.$wt}.${property}`;
      if (map.byWidgetTypeAndProperty[$wtAndPp] == null) {
        map.byWidgetTypeAndProperty[$wtAndPp] = [[edt.$wt, property]];
      } else {
        map.byWidgetTypeAndProperty[$wtAndPp].push([edt.$wt, property]);
      }
    });
  };
  const buildExtMap = (all, externalDefsTypes, parentKey) => {
    return Object.keys(externalDefsTypes).reduce((map, key) => {
      const value = externalDefsTypes[key];
      if (value == null) {
        return map;
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item == null) {
            return;
          }
          if (VUtils.isNotBlank(item.$wt)) {
            putIntoExtMap(map, item, key, parentKey);
          } else {
            buildExtMap(map, item, parentKey == null ? key : `${parentKey}.${key}`);
          }
        });
      } else if (VUtils.isNotBlank(value.$wt)) {
        putIntoExtMap(map, value, key, parentKey);
      } else {
        buildExtMap(map, value, parentKey == null ? key : `${parentKey}.${key}`);
      }
      return map;
    }, all);
  };
  const buildIconsMap = (all, icons) => {
    icons.icons.forEach((icon) => all.byKey[icon.$key] = icon);
    icons.applicableTo.forEach((applicableTo) => {
      (applicableTo.properties ?? []).forEach((property) => {
        all.byWidgetTypeAndProperty[`${applicableTo.$wt}.${property}`] = [applicableTo.$wt, property];
      });
    });
    return all;
  };
  const allWidgets = options.widgets.widgets.reduce((map, widget) => {
    map[widget.$wt] = widget;
    return map;
  }, {});
  const allIndependentWidgets = options.widgets.widgets.filter((widget) => {
    if (VUtils.isBlank(widget.$parent)) {
      return false;
    } else if (Array.isArray(widget.$parent)) {
      return widget.$parent.filter((p) => VUtils.isNotBlank(p)).length !== 0;
    } else {
      return true;
    }
  }).reduce((map, widget) => {
    map[widget.$wt] = widget;
    return map;
  }, {});
  const commonWidgetAttributes = getCommonWidgetAttributes().reduce((map, attr) => {
    map[attr.name] = attr;
    return map;
  }, {});
  const extMap = buildExtMap({ byKey: {}, byWidgetTypeAndProperty: {} }, options.externalDefsTypes);
  const iconMap = buildIconsMap({ byKey: {}, byWidgetTypeAndProperty: {} }, options.widgets.icons);
  const lintWidgetType = (view, node, diagnostics) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const type = (view.state.sliceDoc(node.from, node.to) ?? "").trim();
    if (allWidgets[type] == null) {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "error",
        message: `Widget[${type}] not declared.`
      });
    }
    if (((_a = node.node.parent) == null ? void 0 : _a.name) === "WidgetDeclaration") {
      if (((_c = (_b = node.node.parent.parent) == null ? void 0 : _b.name) == null ? void 0 : _c.startsWith("ATXHeading")) && ((_d = node.node.parent.parent) == null ? void 0 : _d.name) !== "ATXHeading1" && type === index.N2WidgetType.PAGE) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Widget[Page] is only allowed  on heading level 1."
        });
      } else {
        let independentWidget = null;
        let tryToFindParentWidgetType = () => void 0;
        if ((_f = (_e = node.node.parent.parent) == null ? void 0 : _e.name) == null ? void 0 : _f.startsWith("ATXHeading")) {
          independentWidget = allIndependentWidgets[type];
          tryToFindParentWidgetType = () => findParentWidgetType(node.node.parent.parent, view.state);
        } else if (((_g = node.node.parent.parent) == null ? void 0 : _g.name) === "MightBeWidgetDeclaration" && ((_h = node.node.parent.parent.parent) == null ? void 0 : _h.name) === "ListItem") {
          independentWidget = allIndependentWidgets[type];
          tryToFindParentWidgetType = () => findParentWidgetType(node.node.parent.parent.parent, view.state);
        }
        if (independentWidget != null) {
          const parents = () => {
            const { $parent } = independentWidget;
            if (Array.isArray($parent)) {
              return $parent.filter((parent) => VUtils.isNotBlank(parent));
            } else {
              return [$parent];
            }
          };
          const $wt = tryToFindParentWidgetType();
          if ($wt == null) {
            diagnostics.push({
              from: node.from,
              to: node.to,
              severity: "error",
              message: `Widget[${type}] is not allowed outside of [${parents().join(", ")}].`
            });
          } else {
            const possibleParents = parents();
            if (possibleParents.every((parent) => parent !== $wt)) {
              diagnostics.push({
                from: node.from,
                to: node.to,
                severity: "error",
                message: `Widget[${type}] is not allowed outside of [${possibleParents.join(", ")}].`
              });
            }
          }
        }
      }
    }
  };
  const lintWidgetAttrName = (view, tree, node, diagnostics) => {
    const found = findWidgetTypeAndProperty(node.node, view.state, tree);
    const { $wt, direct } = found;
    let property = found.property ?? "";
    if (property.startsWith("!")) {
      property = property.substring(1).trim();
    }
    if ($wt == null && direct === true) {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "warning",
        message: `Cannot apply applicable check on property[${property}].`
      });
      return;
    }
    if (property.startsWith("data-") || commonWidgetAttributes[property] != null) {
      return;
    }
    if ($wt == null) {
      return;
    }
    const widgetType = $wt.trim();
    if (allWidgets[widgetType] == null) {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "error",
        message: `Property[${property}] on widget[${$wt}] is not allowed.`
      });
    } else if ((allWidgets[widgetType].properties ?? []).every(({ name }) => name !== property.trim())) {
      if (widgetType === "Button" && property === "prebuilt") {
        return;
      }
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "error",
        message: `Property[${property}] on widget[${$wt}] is not allowed.`
      });
    }
  };
  const lintWidgetAttrValueExt = (view, tree, node, diagnostics) => {
    const ext = view.state.sliceDoc(node.from, node.to);
    const key = (ext ?? "").trim().substring(ATTRIBUTE_VALUE_EXT_PREFIX.length);
    if (extMap.byKey[key] == null) {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "error",
        message: `External def[${ext}] not declared.`
      });
      return;
    }
    const { $wt, property } = findWidgetTypeAndProperty(node.node, view.state, tree);
    if ($wt != null && property != null) {
      if (extMap.byWidgetTypeAndProperty[`${$wt}.${property}`] == null) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "warning",
          message: `Cannot apply applicable check on external def on widget[${$wt}], property[${property}].`
        });
      }
    } else if ($wt != null) {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "warning",
        message: `Cannot apply applicable check on external def on widget[${$wt}].`
      });
    } else if (property != null) {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "warning",
        message: `Cannot apply applicable check on external def on property[${property}].`
      });
    } else {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "warning",
        message: `External def is allowed on widget property only.`
      });
    }
  };
  const lintWidgetAttrValueIcon = (view, tree, node, diagnostics) => {
    const icon = view.state.sliceDoc(node.from, node.to);
    const key = (icon ?? "").trim().substring(ATTRIBUTE_VALUE_ICON_PREFIX.length);
    if (iconMap.byKey[key] == null) {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "error",
        message: `Icon[${icon}] not declared.`
      });
      return;
    }
    const { $wt, property } = findWidgetTypeAndProperty(node.node, view.state, tree);
    if ($wt != null && property != null) {
      if (iconMap.byWidgetTypeAndProperty[`${$wt}.${property}`] == null) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: `Icon on widget[${$wt}], property[${property}] is not allowed.`
        });
      }
    } else if ($wt != null) {
      const exists = Object.values(iconMap.byWidgetTypeAndProperty).filter(([widgetType]) => widgetType === $wt);
      if (exists.length === 0) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: `Icon on widget[${$wt}] is not allowed.`
        });
      } else {
        const properties = exists.map(([, property2]) => property2).sort().join(", ");
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "warning",
          message: `Icon on widget[${$wt}] is allowed on property[${properties}] only.`
        });
      }
    } else if (property != null) {
      const exists = Object.values(iconMap.byWidgetTypeAndProperty).filter(([, p]) => p === property);
      if (exists.length === 0) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: `Icon on property[${property}] is not allowed.`
        });
      } else {
        const widgetTypes = exists.map(([$wt2]) => $wt2).sort().join(", ");
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "warning",
          message: `Icon on property[${property}] is allowed on widget[${widgetTypes}] only.`
        });
      }
    } else {
      diagnostics.push({
        from: node.from,
        to: node.to,
        severity: "warning",
        message: `Icon is allowed on widget property only.`
      });
    }
  };
  return [
    lintGutter(),
    linter((view) => {
      const diagnostics = [];
      const tree = syntaxTree(view.state);
      tree.cursor().iterate((node) => {
        switch (node.name) {
          case "WidgetDeclarationType":
            lintWidgetType(view, node, diagnostics);
            break;
          case "WidgetDeclarationAttrName":
            lintWidgetAttrName(view, tree, node, diagnostics);
            break;
          case "WidgetDeclarationAttrValueExt":
            lintWidgetAttrValueExt(view, tree, node, diagnostics);
            break;
          case "WidgetDeclarationAttrValueIcon":
            lintWidgetAttrValueIcon(view, tree, node, diagnostics);
            break;
        }
      });
      return diagnostics;
    })
  ];
};
const d9mlExtensions = [{
  defineNodes: WidgetDeclarationNodes,
  parseBlock: [HeadingParser, ListItemParser],
  props: [styleTags({ ListMark: ListMarkTag, HeaderMark: HeadingMarkTag })]
}];
const createDisableBadgesForWrapper = () => `> div[data-w=d9-playground-editor-panel] {
    > div.cm-editor div.cm-line {
        span.d9-playground-editor-heading1,
        span.d9-playground-editor-heading2,
        span.d9-playground-editor-heading3,
        span.d9-playground-editor-heading4,
        span.d9-playground-editor-heading5,
        span.d9-playground-editor-heading6,
        span.d9-playground-editor-list {
            & ~ span.d9-playground-editor-widget-declaration-icon {
                &.d9-playground-editor-widget-declaration-type-icon,
                &.d9-playground-editor-widget-declaration-headline-icon,
                &.d9-playground-editor-widget-declaration-property-icon,
                &.d9-playground-editor-widget-declaration-id-icon,
                &.d9-playground-editor-widget-declaration-flag-icon,
                &.d9-playground-editor-widget-declaration-attr-name-icon {
                    width: 0;
                    padding: 0;
                }
            }
        }

        span.d9-playground-editor-list {
            & ~ span.d9-playground-editor-widget-declaration-icon.d9-playground-editor-widget-declaration-attr-name-icon {
                width: 0;
                padding: 0;
            }
        }
    }
}
`;
const createEditorStyles = (options) => {
  const { badge } = options;
  const EDITOR_BADGES = `& ~ span.d9-playground-editor-widget-declaration-icon {
    width: unset;
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

    /** disable icons for list */

    &.d9-playground-editor-widget-declaration-attr-name-icon {
        width: 0;
        padding: 0;
    }
}
`;
  const BULLET_LIST_BADGES = `& ~ span.d9-playground-editor-widget-declaration-icon {
    /** enable icons for list */

    &.d9-playground-editor-widget-declaration-attr-name-icon {
        width: unset;
        padding: 0 3px;
        background-color: ${PlaygroundCssVars.WIDGET_DECLARATION_ATTR_NAME_COLOR};
    }
}
`;
  return `> div.cm-editor {
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
            width: ${CssVars.SCROLL_WIDTH};
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
        span.d9-playground-editor-heading-mark {
            color: ${PlaygroundCssVars.WIDGET_DECLARATION_INSTRUCTION_COLOR};
            font-weight: 900;
        }

        span.d9-playground-editor-heading1.d9-playground-editor-heading-mark {
            font-size: 24px;
        }

        span.d9-playground-editor-heading2.d9-playground-editor-heading-mark {
            font-size: 20px;
        }

        span.d9-playground-editor-heading3.d9-playground-editor-heading-mark {
            font-size: 18px;
        }

        span.d9-playground-editor-heading4.d9-playground-editor-heading-mark {
            font-size: 16px;
        }

        //span.d9-playground-editor-heading5.d9-playground-editor-heading-mark,
        //span.d9-playground-editor-heading6.d9-playground-editor-heading-mark {
        //    font-size: 16px;
        //}

        span.d9-playground-editor-list.d9-playground-editor-list-mark {
            color: ${PlaygroundCssVars.WIDGET_DECLARATION_INSTRUCTION_COLOR};
            font-weight: 600;
            //font-size: 16px;
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
            position: relative;
            align-items: center;
            justify-content: center;
            margin-left: 2px;
            font-weight: 600;
            font-variant: petite-caps;
            color: white;
            border-radius: 4px;
            width: 0;
            height: 16px;
            padding: 0;
            overflow: hidden;
        }

        span.d9-playground-editor-heading1,
        span.d9-playground-editor-heading2,
        span.d9-playground-editor-heading3,
        span.d9-playground-editor-heading4,
        span.d9-playground-editor-heading5,
        span.d9-playground-editor-heading6,
        span.d9-playground-editor-list {
            &.d9-playground-editor-widget-declaration-splitter {
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

            ${badge ? EDITOR_BADGES : ""}
        }

        span.d9-playground-editor-list {
            /** attribute available only in list */

            &.d9-playground-editor-widget-declaration-attr-splitter,
            &.d9-playground-editor-widget-declaration-attr-value-splitter,
            &.d9-playground-editor-widget-declaration-attr-name-joint {
                color: ${PlaygroundCssVars.WIDGET_DECLARATION_SPLITTER_COLOR};
                margin: 0 4px;
                font-weight: 600;
                font-variant: all-small-caps;
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

            ${badge ? BULLET_LIST_BADGES : ""}
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
                width: ${CssVars.SCROLL_WIDTH};
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
};
const beautifyTemplate = (template, prefix, indent) => {
  template = `${prefix} ${template}`;
  template = template.split("\n").map((line, index2) => {
    if (index2 === 0) {
      return `${indent}${line}`;
    } else if (line.trim().startsWith("#")) {
      return `${indent}${line}
`;
    } else if (line === "") {
      return line;
    } else {
      return `${indent}  ${line}`;
    }
  }).join("\n");
  return template;
};
const WidgetTemplateDialogContainer = qe.div.attrs(({ visible }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-widget-template-dialog",
    style: {
      opacity: visible ? 1 : void 0,
      pointerEvents: visible ? "auto" : void 0
    }
  };
})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    opacity: 0;
    pointer-events: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    z-index: ${CssVars.DIALOG_Z_INDEX};
`;
const WidgetTemplateDialogWrapper = qe.div.attrs(({ visible }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-widget-template-dialog-wrapper",
    style: {
      transform: visible ? "none" : void 0
    }
  };
})`
    display: flex;
    flex-direction: column;
    width: ${PlaygroundCssVars.TEMPLATE_DIALOG_WIDTH};
    margin-top: ${PlaygroundCssVars.TEMPLATE_DIALOG_MARGIN_TOP};
    margin-left: ${PlaygroundCssVars.TEMPLATE_DIALOG_MARGIN_LEFT};
    padding: ${PlaygroundCssVars.TEMPLATE_DIALOG_PADDING};
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    box-shadow: ${CssVars.DIALOG_SHADOW};
    transform: scale(0.75);
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
const WidgetTemplateDialogBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-widget-template-dialog-body" })`
    display: flex;
    position: relative;
    flex-direction: column;
    flex-grow: 1;
    height: ${PlaygroundCssVars.TEMPLATE_DIALOG_HEIGHT};
    margin-bottom: ${PlaygroundCssVars.TEMPLATE_DIALOG_BODY_MARGIN_BOTTOM};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.CAPTION_FONT_COLOR};
`;
const WidgetTemplateViewerWrapper = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-widget-template-viewer-wrapper" })`
    display: grid;
    position: relative;
    align-self: stretch;
    flex-grow: 1;
    grid-template-columns: 1fr;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;
`;
const WidgetTemplateViewer = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-widget-template-viewer" })`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    ${createEditorStyles({ badge: false })}
`;
const WidgetTemplateReason = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-widget-template-dialog-reason" })`
    display: flex;
    position: relative;
    align-items: center;
    font-size: 1.1em;
    font-style: italic;
    color: ${CssVars.DANGER_COLOR};

    &:not(:empty) {
        margin-top: 16px;
    }
`;
const WidgetTemplateDialogFooter = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-widget-template-dialog-footer" })`
    display: flex;
    justify-content: flex-end;

    > button:not(:last-child) {
        margin-right: 8px;
    }
`;
const WidgetTemplateDialog = (props) => {
  const { widgets } = props;
  const ref = reactExports.useRef(null);
  const { on, off } = usePlaygroundEventBus();
  const [state, setState] = reactExports.useState({ visible: false, copied: false });
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
          markdown({
            defaultCodeLanguage: javascript({ jsx: false, typescript: false }),
            base: markdownLanguage,
            extensions: d9mlExtensions
          }),
          WidgetDeclarationIconPlugin
        ]
      }),
      parent: ref.current
    });
    setState((state2) => ({ ...state2, editor }));
    return () => {
      editor.destroy();
    };
  }, []);
  reactExports.useEffect(() => {
    const show = (keyOrWidgetType, prefix, reason) => {
      var _a, _b;
      if (state.visible || state.editor == null) {
        return;
      }
      const padding = window.innerWidth - document.body.clientWidth;
      if (padding > 0) {
        document.body.style.paddingRight = `${padding}px`;
      }
      document.body.style.overflowY = "hidden";
      const doc = state.editor.state.doc;
      let template = ((_a = widgets.widgets.find((widget) => widget.$key === keyOrWidgetType)) == null ? void 0 : _a.template) ?? ((_b = widgets.widgets.find((widget) => widget.$wt === keyOrWidgetType)) == null ? void 0 : _b.template) ?? "";
      template = beautifyTemplate(template, prefix, "");
      state.editor.dispatch({ changes: { from: 0, to: doc.length, insert: template } });
      setState((state2) => ({ ...state2, visible: true, copied: false, widgetType: keyOrWidgetType, reason }));
    };
    on(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, show);
    return () => {
      off(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, show);
    };
  }, [on, off, state.visible, state.editor, widgets.widgets]);
  reactExports.useEffect(() => {
    if (state.copied) {
      setTimeout(() => {
        setState((state2) => ({ ...state2, copied: false }));
      }, 5e3);
    }
  }, [state.copied]);
  const onCopyToClipboard = async () => {
    const { widgetType } = state;
    if (!widgetType) {
      return;
    }
    const template = state.editor.state.doc.toString();
    await navigator.clipboard.writeText(template);
    setState((state2) => ({ ...state2, copied: true }));
  };
  const onHide = () => {
    document.body.style.paddingRight = "";
    document.body.style.overflowY = "";
    setState((state2) => ({ ...state2, visible: false }));
  };
  return React.createElement(
    WidgetTemplateDialogContainer,
    { visible: state.visible },
    React.createElement(
      WidgetTemplateDialogWrapper,
      { visible: state.visible },
      React.createElement(
        WidgetTemplateDialogBody,
        null,
        React.createElement(
          WidgetTemplateViewerWrapper,
          null,
          React.createElement(WidgetTemplateViewer, { ref })
        ),
        React.createElement(WidgetTemplateReason, null, toIntlLabel(state.reason))
      ),
      React.createElement(
        WidgetTemplateDialogFooter,
        null,
        state.copied ? React.createElement(UnwrappedButton, { ink: ButtonInk.SUCCESS, onClick: onCopyToClipboard }, Labels.CopiedToClipboard) : React.createElement(UnwrappedButton, { ink: ButtonInk.PRIMARY, onClick: onCopyToClipboard }, Labels.CopyToClipboard),
        React.createElement(UnwrappedButton, { ink: ButtonInk.WAIVE, onClick: onHide }, Labels.Close)
      )
    )
  );
};
const EditorWrapper = qe.div.attrs(({ editorSize }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-editor",
    style: {
      width: editorSize == null ? "min(400px, 40vw)" : utils$2.toCssSize(editorSize)
    }
  };
})`
    display: grid;
    position: relative;
    align-self: stretch;
    grid-column: 2;
    grid-template-columns: 1fr;
    overflow: hidden;

    &[data-editor-badge=false] {
        ${createDisableBadgesForWrapper()}
    }
`;
const EditorPanel = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-editor-panel" })`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    ${createEditorStyles({ badge: true })}
`;
const Editor = (props) => {
  const { content, externalDefsTypes, widgets, ...rest } = props;
  const ref = reactExports.useRef(null);
  const { on, off, fire } = usePlaygroundEventBus();
  const [state, setState] = reactExports.useState({ editorBadge: false });
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
          markdown({
            defaultCodeLanguage: javascript({ jsx: false, typescript: false }),
            base: markdownLanguage,
            extensions: d9mlExtensions
          }),
          ...createWidgetLinter({ widgets, externalDefsTypes: externalDefsTypes ?? {} }),
          WidgetDeclarationIconPlugin,
          EditorView.updateListener.of((view) => {
            if (view.docChanged) {
              const doc = view.state.doc;
              const value = doc.toString();
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
    const doc = state.editor.state.doc;
    const value = doc.toString();
    if (value !== (content ?? "")) {
      state.editor.dispatch({ changes: { from: 0, to: doc.length, insert: content ?? "" } });
    }
  }, [fire, state.editor, content]);
  reactExports.useEffect(() => {
    const onResizeEditor = (width) => {
      setState((state2) => ({ ...state2, size: width }));
    };
    on(PlaygroundEventTypes.RESIZE_EDITOR, onResizeEditor);
    return () => {
      off(PlaygroundEventTypes.RESIZE_EDITOR, onResizeEditor);
    };
  }, [on, off]);
  reactExports.useEffect(() => {
    const onSwitchEditorBadge = (visible) => {
      setState((state2) => ({ ...state2, editorBadge: visible }));
    };
    on(PlaygroundEventTypes.SWITCH_EDITOR_BADGE, onSwitchEditorBadge);
    return () => {
      off(PlaygroundEventTypes.SWITCH_EDITOR_BADGE, onSwitchEditorBadge);
    };
  }, [on, off]);
  reactExports.useEffect(() => {
    if (state.editor == null) {
      return;
    }
    const onLocateLine = (lineNumber) => {
      const editor = state.editor;
      const line = editor.state.doc.line(lineNumber);
      editor.dispatch({ selection: { anchor: line.from }, scrollIntoView: true });
      setTimeout(() => {
        try {
          const { top, left } = editor.coordsAtPos(line.from);
          const { top: contentTop, left: contentLeft } = editor.contentDOM.getBoundingClientRect();
          const scroller = editor.scrollDOM;
          scroller.scrollTo({
            top: Math.max(0, top - contentTop - 20),
            left: left - contentLeft,
            behavior: "smooth"
          });
        } catch {
        }
      }, 100);
    };
    on(PlaygroundEventTypes.LOCATE_LINE, onLocateLine);
    return () => {
      off(PlaygroundEventTypes.LOCATE_LINE, onLocateLine);
    };
  }, [on, off, state.editor]);
  reactExports.useEffect(() => {
    if (state.editor == null) {
      return;
    }
    const findDefaultPrefix = (keyOrWidgetType, level) => {
      var _a, _b;
      const group = ((_a = widgets.widgets.find((widget) => widget.$key === keyOrWidgetType)) == null ? void 0 : _a.group) ?? ((_b = widgets.widgets.find((widget) => widget.$wt === keyOrWidgetType)) == null ? void 0 : _b.group);
      if (group === PlaygroundWidgetGroupKey.CONTAINERS) {
        if (level < 6) {
          return new Array(level).fill("#").join("");
        }
      }
      return "-";
    };
    const findClosestPreviousHeadingLevel = (lineNumber, include) => {
      if (lineNumber === 1) {
        return 2;
      }
      const editorState = state.editor.state;
      for (let line = include ? lineNumber : lineNumber - 1; line >= 1; line--) {
        const { text } = editorState.doc.line(line);
        if (text.startsWith("#")) {
          const [, symbol] = text.match(/^(#{1,6})\s(.*)$/) ?? [];
          if (symbol != null) {
            return Math.max(symbol.length, 2);
          }
        }
      }
      return 2;
    };
    const onInsertWidgetTemplate = (keyOrWidgetType) => {
      var _a, _b;
      const editorState = state.editor.state;
      const { from, to } = editorState.selection.main;
      const { from: fromLineFirstCharPos, number: fromLineNumber, text: fromLineText } = editorState.doc.lineAt(from);
      if (fromLineNumber === 1) {
        fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType, findDefaultPrefix(keyOrWidgetType, 2), "The cursor is at the beginning of the designer, so it cannot be directly inserted the widget template.");
        return;
      }
      const text = editorState.sliceDoc(from, to) ?? "";
      if (from !== to && text.trim().length !== 0) {
        fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType, findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false)), "The current selection in the designer already contains content, so it cannot be directly inserted the widget template.");
        return;
      }
      const { number: toLineNumber } = editorState.doc.lineAt(to);
      if (fromLineNumber !== toLineNumber) {
        fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType, findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false)), "The current selection contains multiple lines, so it cannot be directly inserted the widget template.");
        return;
      }
      let indent = "";
      let prefix = "";
      if (fromLineText.trim().length !== 0) {
        const [, spaces, symbol, content2] = fromLineText.match(/^(\s*)(#{1,6}|-|\*)(.*)$/) ?? [];
        if (symbol == null || spaces.length !== 0 && symbol.includes("#")) {
          fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType, findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false)), "The selected line is neither a heading nor a bullet list, so it cannot be directly inserted into the widget template.");
          return;
        }
        if (content2.trim().length !== 0) {
          fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType, findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false)), "The selected line already contains content, so it cannot be directly inserted into the widget template.");
          return;
        }
        indent = spaces;
        prefix = symbol;
      } else {
        prefix = findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false));
      }
      let template = ((_a = widgets.widgets.find((widget) => widget.$key === keyOrWidgetType)) == null ? void 0 : _a.template) ?? ((_b = widgets.widgets.find((widget) => widget.$wt === keyOrWidgetType)) == null ? void 0 : _b.template) ?? "";
      template = beautifyTemplate(template, prefix, indent);
      state.editor.dispatch({
        changes: {
          from: fromLineFirstCharPos,
          to: fromLineFirstCharPos + fromLineText.length,
          insert: template
        }
      });
    };
    on(PlaygroundEventTypes.INSERT_WIDGET_TEMPLATE, onInsertWidgetTemplate);
    return () => {
      off(PlaygroundEventTypes.INSERT_WIDGET_TEMPLATE, onInsertWidgetTemplate);
    };
  }, [on, off, fire, state.editor, widgets.widgets]);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(WidgetTemplateDialog, { widgets }),
    React.createElement(
      EditorWrapper,
      { editorSize: state.size, ...rest, "data-editor-badge": state.editorBadge },
      React.createElement(EditorPanel, { ref })
    )
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
const PLAYGROUND_WIDGET_WRAPPER = "PWW";
const WidgetWrapperAnchor = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-playground-widget-wrapper-anchor" })`
    display: none;
`;
const PlaygroundWidgetWrapper = (props) => {
  const ref = reactExports.useRef(null);
  const { on, off } = usePlaygroundEventBus();
  reactExports.useEffect(() => {
    const onAskNodeDef = ($key, _widgetType, callback) => {
      if ($key !== props["data-for-playground-key"]) {
        return;
      }
      callback(props);
    };
    on(PlaygroundEventTypes.ASK_NODE_DEF, onAskNodeDef);
    return () => {
      off(PlaygroundEventTypes.ASK_NODE_DEF, onAskNodeDef);
    };
  }, [on, off, props]);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(WidgetWrapperAnchor, { ref }),
    props.children
  );
};
const ViewerWrapper = qe.div.attrs(({ minViewerWidth }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-viewer",
    "data-v-scroll": "",
    "data-h-scroll": "",
    style: {
      "--min-viewer-width": minViewerWidth == null ? "600px" : utils$2.toCssSize(minViewerWidth)
    }
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
        min-width: var(--min-viewer-width);
    }
`;
const ParseError = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-viewer-error" })`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
    color: ${PlaygroundCssVars.VIEWER_ERROR_COLOR};
    font-size: 1.5em;
    font-style: italic;
    font-weight: 500;
`;
const WidgetWrapper = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-widget-wrapper" })`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    user-select: none;
    pointer-events: none;
    border-radius: ${PlaygroundCssVars.WIDGET_WRAPPER_BORDER_RADIUS};
    box-shadow: ${PlaygroundCssVars.WIDGET_WRAPPER_SHADOW};
    transition: top 0.2s, left 0.2s, width 0.2s, height 0.2s;
    z-index: ${PlaygroundCssVars.WIDGET_WRAPPER_Z_INDEX};

    &[data-view-anchor] + div[data-w=d9-playground-widget-wrapper-toolbar] {
        opacity: 1;
        user-select: auto;
        pointer-events: auto;
    }
`;
const WidgetWrapperToolbar = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-widget-wrapper-toolbar" })`
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    border-top-left-radius: ${CssVars.BORDER_RADIUS};
    border-top-right-radius: ${CssVars.BORDER_RADIUS};
    opacity: 0;
    transition: bottom 0.2s, left 0.2s, opacity 0.2s;
    z-index: ${PlaygroundCssVars.WIDGET_WRAPPER_Z_INDEX + 1};
    user-select: none;
    pointer-events: none;

    > button[data-ink=primary] {
        border: 0;
        border-radius: calc(${CssVars.BORDER_RADIUS} * 2);
        width: ${CssVars.INPUT_HEIGHT};

        &:hover, &:focus, &:active {
            background-color: ${PlaygroundCssVars.WIDGET_WRAPPER_TOOLBAR_COLOR};
            box-shadow: ${PlaygroundCssVars.WIDGET_WRAPPER_SHADOW};

            > span > svg {
                color: ${CssVars.INVERT_COLOR};
            }
        }

        > span {
            padding: 0;

            > svg {
                height: 20px;
                color: ${PlaygroundCssVars.WIDGET_WRAPPER_TOOLBAR_COLOR};
                filter: ${PlaygroundCssVars.WIDGET_WRAPPER_TOOLBAR_FILTER};
            }
        }
    }
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
      return React.createElement(ParseError, null, Labels.ERROR);
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
const ViewerToolbarButton = (props) => {
  const { icon, click, ...rest } = props;
  const onClicked = () => click();
  return React.createElement(UnwrappedButton, { ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, onClick: onClicked, leads: [`$icons.${icon}`], ...rest });
};
const ViewerKernel = (props) => {
  const { mockData, externalDefs, minViewerWidth, content } = props;
  const vwRef = reactExports.useRef(null);
  const wwRef = reactExports.useRef(null);
  const wwtRef = reactExports.useRef(null);
  const { replace, clear } = useThrottler();
  const { on, off, fire } = usePlaygroundEventBus();
  const forceUpdate = useForceUpdate();
  const [state, setState] = reactExports.useState({ locator: true });
  reactExports.useEffect(() => {
    const onSwitchViewerWrapper = (wrapper) => setState((state2) => ({
      ...state2,
      locator: wrapper.locator
    }));
    on(PlaygroundEventTypes.SWITCH_VIEWER_WRAPPER, onSwitchViewerWrapper);
    return () => {
      off(PlaygroundEventTypes.SWITCH_VIEWER_WRAPPER, onSwitchViewerWrapper);
    };
  }, [on, off]);
  reactExports.useEffect(() => {
    const onForceUpdateViewer = () => {
      forceUpdate();
    };
    on(PlaygroundEventTypes.FORCE_UPDATE_VIEWER, onForceUpdateViewer);
    return () => {
      off(PlaygroundEventTypes.FORCE_UPDATE_VIEWER, onForceUpdateViewer);
    };
  }, [on, off, forceUpdate]);
  try {
    const { node: def, success, error } = parseDoc(content, { keepMd: true, forPlayground: PLAYGROUND_WIDGET_WRAPPER });
    if (!success) {
      throw typeof error === "string" ? new Error(error) : error ?? new Error("Unpredicted parse error occurred.");
    }
    const clearLocator = () => {
      const ww = wwRef.current;
      ww.style.top = "";
      ww.style.left = "";
      ww.style.width = "";
      ww.style.height = "";
      ww.style.opacity = "0";
      ww.removeAttribute("data-view-anchor");
      clear(false);
    };
    const onMouseMove = (event) => {
      if (!state.locator) {
        return;
      }
      let target = event.target;
      const forPlayground = target.getAttribute("data-for-playground");
      if (forPlayground !== "true") {
        target = target.closest("[data-for-playground]");
      }
      if (target != null) {
        const widgetType = target.getAttribute("data-w");
        if (widgetType === "d9-page") {
          clearLocator();
        } else {
          const vwRect = vwRef.current.getBoundingClientRect();
          const vwScrollTop = vwRef.current.scrollTop;
          const vwScrollLeft = vwRef.current.scrollLeft;
          const targetRect = target.getBoundingClientRect();
          const ww = wwRef.current;
          ww.style.top = `${targetRect.top - vwRect.top + vwScrollTop - 2}px`;
          ww.style.left = `${targetRect.left - vwRect.left + vwScrollLeft - 4}px`;
          ww.style.width = `${targetRect.width + 8}px`;
          ww.style.height = `${targetRect.height + 4}px`;
          ww.style.opacity = "1";
          replace(() => ww.setAttribute("data-view-anchor", "true"), 300);
          const wwt = wwtRef.current;
          wwt.style.bottom = `${window.innerHeight - targetRect.top}px`;
          wwt.style.left = `${targetRect.left - 4}px`;
          const $key = target.getAttribute("data-for-playground-key");
          if (ww.getAttribute("data-current-for-playground-key") !== $key || ww.getAttribute("data-current-w") !== widgetType) {
            ww.setAttribute("data-current-for-playground-key", $key);
            ww.setAttribute("data-current-w", widgetType);
          }
        }
      } else {
        clearLocator();
      }
    };
    const onMouseLeave = () => {
      if (!state.locator) {
        return;
      }
      clearLocator();
    };
    const onScroll = () => {
      if (!state.locator) {
        return;
      }
      clearLocator();
    };
    const onToolbarMouseMove = (event) => {
      event.stopPropagation();
      event.preventDefault();
    };
    const onLocateClicked = () => {
      const ww = wwRef.current;
      const $key = ww.getAttribute("data-current-for-playground-key");
      const widgetType = ww.getAttribute("data-current-w");
      fire(PlaygroundEventTypes.ASK_NODE_DEF, $key, widgetType, (def2) => {
        const { preparsed } = def2;
        if (preparsed == null) {
          return;
        }
        const { content: { position: { start: { line } } } } = preparsed;
        fire(PlaygroundEventTypes.LOCATE_LINE, line);
      });
    };
    const enhancedExternalDefs = {
      onDetermined: (options) => {
        clearExternalDefs(options);
      },
      ...externalDefs ?? {}
    };
    return React.createElement(
      ViewerWrapper,
      { minViewerWidth, onMouseMove, onMouseLeave, onScroll, ref: vwRef },
      state.locator ? React.createElement(
        React.Fragment,
        null,
        React.createElement(WidgetWrapper, { ref: wwRef }),
        React.createElement(
          WidgetWrapperToolbar,
          { onMouseMove: onToolbarMouseMove, ref: wwtRef },
          React.createElement(ViewerToolbarButton, { icon: PlaygroundIcons.LOCATE, click: onLocateClicked })
        )
      ) : null,
      React.createElement(
        ErrorBoundary,
        { content },
        React.createElement(StandaloneRoot, { ...def, "$root": mockData, externalDefs: enhancedExternalDefs })
      )
    );
  } catch (error) {
    return React.createElement(
      ViewerWrapper,
      { minViewerWidth },
      React.createElement(ParseError, null, error.message || Labels.ParseError)
    );
  }
};
const MockJsonDialogContainer = qe.div.attrs(({ visible }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-mock-json-dialog",
    style: {
      opacity: visible ? 1 : void 0,
      pointerEvents: visible ? "auto" : void 0
    }
  };
})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    opacity: 0;
    pointer-events: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    z-index: ${CssVars.DIALOG_Z_INDEX};
`;
const MockJsonDialogWrapper = qe.div.attrs(({ visible }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-mock-json-dialog-wrapper",
    style: {
      transform: visible ? "none" : void 0
    }
  };
})`
    display: flex;
    flex-direction: column;
    width: ${PlaygroundCssVars.TEMPLATE_DIALOG_WIDTH};
    margin-top: ${PlaygroundCssVars.TEMPLATE_DIALOG_MARGIN_TOP};
    margin-left: ${PlaygroundCssVars.TEMPLATE_DIALOG_MARGIN_LEFT};
    padding: ${PlaygroundCssVars.TEMPLATE_DIALOG_PADDING};
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    box-shadow: ${CssVars.DIALOG_SHADOW};
    transform: scale(0.75);
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
const MockJsonDialogBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-mock-json-dialog-body" })`
    display: flex;
    position: relative;
    flex-direction: column;
    flex-grow: 1;
    height: ${PlaygroundCssVars.TEMPLATE_DIALOG_HEIGHT};
    margin-bottom: ${PlaygroundCssVars.TEMPLATE_DIALOG_BODY_MARGIN_BOTTOM};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.CAPTION_FONT_COLOR};
`;
const MockJsonViewerWrapper = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-mock-json-viewer-wrapper" })`
    display: grid;
    position: relative;
    align-self: stretch;
    flex-grow: 1;
    grid-template-columns: 1fr;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;
`;
const MockJsonViewer = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-mock-json-viewer" })`
    display: block;
    position: relative;
    width: 100%;
    align-self: stretch;
    overflow: hidden;

    > div.cm-editor {
        height: 100%;
    }
`;
const MockJsonReason = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-mock-json-dialog-reason" })`
    display: flex;
    position: relative;
    align-items: center;
    font-size: 1.1em;
    font-style: italic;
    color: ${CssVars.DANGER_COLOR};

    &:not(:empty) {
        margin-top: 16px;
    }
`;
const MockJsonDialogFooter = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-playground-mock-json-dialog-footer" })`
    display: flex;
    justify-content: flex-end;

    > button:not(:last-child) {
        margin-right: 8px;
    }
`;
const MockJsonDialog = (props) => {
  const { mockData } = props;
  const ref = reactExports.useRef(null);
  const { on, off, fire } = usePlaygroundEventBus();
  const [state, setState] = reactExports.useState({ visible: false, copied: false });
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
          json(),
          lintGutter(),
          linter(jsonParseLinter())
        ]
      }),
      parent: ref.current
    });
    setState((state2) => ({ ...state2, editor }));
    return () => {
      editor.destroy();
    };
  }, []);
  reactExports.useEffect(() => {
    const show = () => {
      if (state.visible || state.editor == null) {
        return;
      }
      const padding = window.innerWidth - document.body.clientWidth;
      if (padding > 0) {
        document.body.style.paddingRight = `${padding}px`;
      }
      document.body.style.overflowY = "hidden";
      const doc = state.editor.state.doc;
      const json2 = JSON.stringify(mockData, null, "  ");
      state.editor.dispatch({ changes: { from: 0, to: doc.length, insert: json2 } });
      setState((state2) => ({ ...state2, visible: true, copied: false, reason: void 0 }));
    };
    on(PlaygroundEventTypes.EDIT_MOCK_JSON, show);
    return () => {
      off(PlaygroundEventTypes.EDIT_MOCK_JSON, show);
    };
  }, [on, off, state.visible, state.editor, mockData]);
  reactExports.useEffect(() => {
    if (state.copied) {
      setTimeout(() => {
        setState((state2) => ({ ...state2, copied: false }));
      }, 5e3);
    }
  }, [state.copied]);
  const onCopyToClipboard = async () => {
    const json2 = state.editor.state.doc.toString();
    await navigator.clipboard.writeText(json2);
    setState((state2) => ({ ...state2, copied: true }));
  };
  const onDownload = () => {
    const json2 = state.editor.state.doc.toString();
    const blob = new Blob([json2], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mock-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const onConfirm = () => {
    const json2 = state.editor.state.doc.toString();
    try {
      const parsed = JSON.parse(json2);
      Object.keys(mockData).forEach((key) => delete mockData[key]);
      Object.keys(parsed).forEach((key) => mockData[key] = parsed[key]);
      fire(PlaygroundEventTypes.FORCE_UPDATE_VIEWER);
      onHide();
    } catch {
      setState((state2) => ({
        ...state2,
        reason: Labels.InvalidJson
      }));
    }
  };
  const onHide = () => {
    document.body.style.paddingRight = "";
    document.body.style.overflowY = "";
    setState((state2) => ({ ...state2, visible: false, reason: void 0 }));
  };
  return React.createElement(
    MockJsonDialogContainer,
    { visible: state.visible },
    React.createElement(
      MockJsonDialogWrapper,
      { visible: state.visible },
      React.createElement(
        MockJsonDialogBody,
        null,
        React.createElement(
          MockJsonViewerWrapper,
          null,
          React.createElement(MockJsonViewer, { ref })
        ),
        React.createElement(MockJsonReason, null, toIntlLabel(state.reason))
      ),
      React.createElement(
        MockJsonDialogFooter,
        null,
        state.copied ? React.createElement(UnwrappedButton, { ink: ButtonInk.SUCCESS, onClick: onCopyToClipboard }, Labels.CopiedToClipboard) : React.createElement(UnwrappedButton, { ink: ButtonInk.PRIMARY, onClick: onCopyToClipboard }, Labels.CopyToClipboard),
        React.createElement(UnwrappedButton, { ink: ButtonInk.PRIMARY, onClick: onDownload }, Labels.Download),
        React.createElement(UnwrappedButton, { ink: ButtonInk.PRIMARY, onClick: onConfirm }, Labels.ConfirmAndRefresh),
        React.createElement(
          UnwrappedButton,
          { ink: ButtonInk.WAIVE, onClick: onHide },
          Labels.Cancel,
          ";"
        )
      )
    )
  );
};
const Viewer = (props) => {
  const { minViewerWidth, mockData } = props;
  const { on, off } = usePlaygroundEventBus();
  const { replace } = useThrottler();
  const [content, setContent] = reactExports.useState("");
  reactExports.useEffect(() => {
    const onContentChanged = (content2) => {
      replace(() => setContent(content2 ?? ""), 500);
    };
    on(PlaygroundEventTypes.CONTENT_CHANGED, onContentChanged);
    return () => {
      off(PlaygroundEventTypes.CONTENT_CHANGED, onContentChanged);
    };
  }, [on, off, replace]);
  if (VUtils.isBlank(content)) {
    return React.createElement(
      ViewerWrapper,
      { minViewerWidth },
      React.createElement(MockJsonDialog, { mockData }),
      React.createElement(ParseError, null, Labels.NoContentGiven)
    );
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(MockJsonDialog, { mockData }),
    React.createElement(ViewerKernel, { ...props, content })
  );
};
const PlaygroundBridge = (props) => {
  const { content, onContentChanged } = props;
  const { on, off } = usePlaygroundEventBus();
  reactExports.useEffect(() => {
    const onChanged = (changed) => {
      if ((content ?? "") === (changed ?? "")) {
        return;
      }
      (async () => await onContentChanged(changed))();
    };
    on(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
    return () => {
      off(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
    };
  }, [on, off, content, onContentChanged]);
  return React.createElement(reactExports.Fragment, null);
};
const useViewMode = () => {
  const { on, off } = usePlaygroundEventBus();
  const [state, setState] = reactExports.useState({ zen: false, maximized: false });
  reactExports.useEffect(() => {
    const onMaximize = () => setState((state2) => ({ ...state2, maximized: true }));
    const onQuitMaximize = () => setState((state2) => ({ ...state2, maximized: false }));
    const onZen = () => {
      document.documentElement.requestFullscreen && document.documentElement.requestFullscreen({ navigationUI: "hide" });
      setState({ zen: true, maximized: true });
    };
    const onQuitZen = () => {
      document.exitFullscreen && document.exitFullscreen();
      setState({ zen: false, maximized: false });
    };
    const onFullScreenChanged = () => {
      if (document.fullscreenElement == null) {
        setState({ zen: false, maximized: false });
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
  return state;
};
const useAvailableWidgets = (widgets, options) => {
  const { useN2, useCharts } = options;
  const [availableWidgets, setAvailableWidgets] = reactExports.useState(() => {
    return {
      groups: computeWidgetGroups((widgets == null ? void 0 : widgets.groups) ?? [], useN2),
      widgets: computeWidgets((widgets == null ? void 0 : widgets.widgets) ?? [], { useN2, useCharts }),
      icons: computeIcons({
        icons: (widgets == null ? void 0 : widgets.icons.icons) ?? [],
        applicableTo: (widgets == null ? void 0 : widgets.icons.applicableTo) ?? []
      }, useN2),
      constants: computeConstants((widgets == null ? void 0 : widgets.constants) ?? [], useN2),
      extensions: computeReferences((widgets == null ? void 0 : widgets.extensions) ?? [])
    };
  });
  reactExports.useEffect(() => {
    setAvailableWidgets({
      groups: computeWidgetGroups((widgets == null ? void 0 : widgets.groups) ?? [], useN2),
      widgets: computeWidgets((widgets == null ? void 0 : widgets.widgets) ?? [], { useN2, useCharts }),
      icons: computeIcons({
        icons: (widgets == null ? void 0 : widgets.icons.icons) ?? [],
        applicableTo: (widgets == null ? void 0 : widgets.icons.applicableTo) ?? []
      }, useN2),
      constants: computeConstants((widgets == null ? void 0 : widgets.constants) ?? [], useN2),
      extensions: computeReferences((widgets == null ? void 0 : widgets.extensions) ?? [])
    });
  }, [widgets, useN2, useCharts]);
  return availableWidgets;
};
const ask = (given, defaultValue) => async () => {
  let ret;
  if (typeof given === "function") {
    ret = await given();
  } else {
    ret = given;
  }
  return ret ?? defaultValue;
};
const useInitialize = (options) => {
  const { mockData, externalDefs, externalDefsTypes } = options;
  const mockDataRef = reactExports.useRef({});
  const externalDefRef = reactExports.useRef(null);
  const externalDefsTypesRef = reactExports.useRef(null);
  const [state, setState] = reactExports.useState({
    initialized: false
  });
  reactExports.useEffect(() => {
    (async () => {
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
  }, [mockData, externalDefs, externalDefsTypes]);
  return {
    initialized: state.initialized,
    mockData: mockDataRef.current,
    externalDefs: externalDefRef.current,
    externalDefsTypes: externalDefsTypesRef.current
  };
};
const SideSlider = qe.div.attrs(({ active, left }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground-side-slider",
    style: {
      left: active ? 0 : utils$2.toCssSize(left),
      width: active ? "100%" : void 0,
      "--handle-left": active ? utils$2.toCssSize(left) : 0
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
const PlaygroundWrapper = qe.div.attrs(() => {
  return {
    [DOM_KEY_WIDGET]: "d9-playground",
    style: {
      "--min-height": "500px",
      "--grid-columns": `auto auto 1fr`,
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
  const { $pp, $wrapped, mockData, externalDefs, externalDefsTypes, widgets, usage: { useN2 = true, useCharts = false } = {}, minViewerWidth, ...rest } = props;
  const { $p2r, $onValueChange, $avs: { $disabled, $visible } } = $wrapped;
  const ref = reactExports.useRef(null);
  const globalHandlers = useGlobalHandlers();
  const { fire } = usePlaygroundEventBus();
  const { initialized, mockData: initializedMockData, externalDefs: initializedExternalDefs, externalDefsTypes: initializedExternalDefsTypes } = useInitialize({ mockData, externalDefs, externalDefsTypes });
  const availableWidgets = useAvailableWidgets(widgets, { useN2, useCharts });
  const { zen, maximized } = useViewMode();
  if (!initialized) {
    return null;
  }
  const onContentChanged = async (content2) => {
    await $onValueChange(content2, false, { global: globalHandlers });
  };
  const resizeTo = (width) => {
    fire(PlaygroundEventTypes.RESIZE_EDITOR, width);
  };
  const content = MUtils.getValue($wrapped.$model, $pp);
  return React.createElement(
    PlaygroundWrapper,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, "data-zen": zen, "data-maximized": maximized, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref },
    React.createElement(PlaygroundBridge, { content, onContentChanged }),
    React.createElement(Toolbar, { groups: availableWidgets.groups, widgets: availableWidgets.widgets }),
    React.createElement(Editor, { content, externalDefsTypes: initializedExternalDefsTypes, widgets: availableWidgets }),
    React.createElement(Help, null),
    React.createElement(Viewer, { mockData: initializedMockData, externalDefs: initializedExternalDefs, minViewerWidth }),
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
  getAttributeNamesMapping() {
    const keys = ["useN2", "useCharts"];
    return keys.reduce((mapping, key) => {
      mapping[`${this.getSupportedType()}.${key}`] = `usage.${key}`;
      return mapping;
    }, {});
  }
}
const registerPlayground = (widgetHelper, widgetType) => {
  widgetType = VUtils.isBlank(widgetType) ? "Playground" : widgetType;
  registerWidget({ key: widgetType, JSX: Playground, container: false, array: false });
  registerWidget({
    key: PLAYGROUND_WIDGET_WRAPPER,
    JSX: PlaygroundWidgetWrapper,
    container: false,
    array: false,
    consumePosition: false
  });
  const TranslatorClass = class extends AbstractPlaygroundTranslator {
    getSupportedType() {
      return widgetType;
    }
  };
  const repo = widgetHelper.repository;
  repo.register(new TranslatorClass(repo));
};
export {
  registerPlayground as r
};
