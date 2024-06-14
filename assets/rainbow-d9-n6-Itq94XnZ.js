var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { a as color, P as jsYaml } from "./vendor-FxhWBsAz.js";
import { f as CssConstants, C as CssVars, I as IntlLabel, D as DOM_KEY_WIDGET, g as UnwrappedCaption, b as useGlobalHandlers, h as UnwrappedInput, j as UnwrappedCheckbox, k as UnwrappedDropdown, l as UnwrappedTextarea, m as UnwrappedDecorateInput } from "./rainbow-d9-n2-v6HY_bjb.js";
import { R as React, q as qe, r as reactExports, D as DiagramModel, C as CanvasWidget, N as NodeModel, c as createEngine, P as PortModel, a as PortModelAlignment, b as DefaultLinkModel, A as AbstractModelFactory, d as AbstractReactFactory, e as PortWidget } from "./react-base-1xesxUK0.js";
import { V as VUtils, r as registerWidget, g as useCreateEventBus, M as MUtils, P as PPUtils, e as useForceUpdate } from "./rainbow-d9-n1-gFKePpQk.js";
import { i as index$1 } from "./rainbow-d9-n3-wStcAEft.js";
import { M as Markdown } from "./react-markdown-GotOSe77.js";
import { r as remarkGfm } from "./remark-qd4D0pQk.js";
const EDITOR_BACKGROUND_BLOCK_SIZE = "var(--o23-playground-editor-background-block-size, 48px)";
const EDITOR_BACKGROUND_LINE_COLOR = `var(--o23-playground-editor-background-line-color, ${color(CssConstants.PRIMARY_COLOR).alpha(0.08)})`;
const NODE_START_COLOR = "#ffb56b";
const NODE_END_COLOR = "#e0b35f";
const NEXT_STEP_PORT_COLOR = "#1f6b73";
const PREVIOUS_STEP_PORT_COLOR = "#00618b";
const API_VARIABLE_PORT_COLOR = "#87a55f";
const PlaygroundCssVars = {
  EDITOR_BACKGROUND_BLOCK_SIZE,
  EDITOR_BACKGROUND_LINE_COLOR,
  EDITOR_BACKGROUND_IMAGE: `var(--o23-playground-editor-background-image, linear-gradient(to right, ${EDITOR_BACKGROUND_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${EDITOR_BACKGROUND_LINE_COLOR} 1px, transparent 1px))`,
  EDITOR_BACKGROUND_SIZE: `var(--o23-playground-editor-background-size, ${EDITOR_BACKGROUND_BLOCK_SIZE} ${EDITOR_BACKGROUND_BLOCK_SIZE})`,
  EDITOR_BACKGROUND_POSITION: "var(--o23-playground-editor-background-position, -1px -1px)",
  EDITOR_ERROR_COLOR: `var(--o23-playground-editor-error-color, ${CssVars.DANGER_COLOR})`,
  MARKDOWN_FONT_SIZE: "var(--o23-playground-markdown-font-size, 14px)",
  MARKDOWN_COLOR: `var(--o23-playground-markdown-color, ${CssVars.FONT_COLOR})`,
  MARKDOWN_BACKGROUND_COLOR: `var(--o23-playground-markdown-background-color, ${CssVars.BACKGROUND_COLOR})`,
  SPECIFIC_MARKDOWN_FONT_SIZE: "var(--o23-playground-specific-markdown-font-size, 12px)",
  EDIT_DIALOG_BACKDROP_COLOR: "var(--o23-playground-dialog-backdrop-color, rgba(71, 69, 84, 0.75))",
  EDIT_DIALOG_Z_INDEX: "var(--o23-playground-dialog-z-index, 10000)",
  EDIT_DIALOG_MARGIN_TOP: "var(--o23-playground-dialog-margin-top, 32px)",
  EDIT_DIALOG_MARGIN_LEFT: "var(--o23-playground-dialog-margin-top, 24px)",
  EDIT_DIALOG_WIDTH: "var(--o23-playground-dialog-width, calc(100vw - 48px))",
  EDIT_DIALOG_HEIGHT: "var(--o23-playground-dialog-height, calc(100vh - 64px))",
  EDIT_DIALOG_BACKGROUND_COLOR: `var(--o23-playground-dialog-background-color, ${CssVars.BACKGROUND_COLOR})`,
  EDIT_DIALOG_PADDING: "var(--o23-playground-dialog-padding, 16px)",
  EDIT_DIALOG_PADDING_LEFT: "var(--o23-playground-dialog-padding-left, 16px)",
  EDIT_DIALOG_SHADOW: `var(--o23-playground-dialog-shadow, 0 0 10px 4px rgba(0, 0, 0, 0.2))`,
  EDIT_DIALOG_BORDER_RADIUS: "var(--o23-playground-dialog-border-radius, 12px)",
  EDIT_DIALOG_BORDER: `var(--o23-playground-dialog-border, ${CssVars.BORDER})`,
  EDIT_DIALOG_CLOSER_TOP: "var(--o23-playground-dialog-closer-top, -8px)",
  EDIT_DIALOG_CLOSER_ICON_COLOR: `var(--o23-playground-dialog-closer-icon-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CLOSER_ICON_SIZE: "var(--o23-playground-dialog-closer-icon-size, 20px)",
  EDIT_DIALOG_CLOSER_FONT_SIZE: "var(--o23-playground-dialog-closer-font-size, 16px)",
  EDIT_DIALOG_CLOSER_FONT_WEIGHT: "var(--o23-playground-dialog-closer-font-weight, 600)",
  EDIT_DIALOG_CLOSER_PADDING: "var(--o23-playground-dialog-closer-padding, 0 8px)",
  EDIT_DIALOG_PART_MARGIN: "var(--o23-playground-dialog-part-margin, 24px 0)",
  EDIT_DIALOG_PART_HEADER_HEIGHT: "var(--o23-playground-dialog-part-header-height, 32px)",
  EDIT_DIALOG_PART_TITLE_FONT_SIZE: "var(--o23-playground-dialog-part-title-font-size, 16px)",
  EDIT_DIALOG_PART_TITLE_FONT_WEIGHT: "var(--o23-playground-dialog-part-title-font-weight, 600)",
  EDIT_DIALOG_PART_BODY_MARGIN: `var(--o23-playground-dialog-part-body-margin, 0 -16px)`,
  EDIT_DIALOG_PART_BODY_PADDING: "var(--o23-playground-dialog-part-body-padding, 0 16px)",
  EDIT_DIALOG_HELP_DOC_TITLE_COLOR: `var(--o23-playground-dialog-part-title-color, rgb(184, 184, 184))`,
  EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_LEFT: "var(--o23-playground-dialog-help-doc-open-handle-left, 0)",
  EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_WIDTH: "var(--o23-playground-dialog-help-doc-open-handle-width, 64px)",
  EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_COLOR: `var(--o23-playground-dialog-help-doc-open-handle-color, ${CssVars.PRIMARY_COLOR})`,
  EDIT_DIALOG_HELP_DOC_MARGIN: "var(--o23-playground-dialog-help-doc-margin, 0 0 0 -16px)",
  EDIT_DIALOG_HELP_DOC_PADDING: "var(--o23-playground-dialog-help-doc-padding, 0 16px 0 16px)",
  EDIT_DIALOG_HELP_DOC_COLLAPSED_WIDTH: "var(--o23-playground-dialog-help-doc-collapsed-width, 64px)",
  EDIT_DIALOG_HELP_DOC_GUTTER_SIZE: "var(--o23-playground-dialog-help-doc-gutter-size, 16px)",
  EDIT_DIALOG_NAVIGATOR_WIDTH: "var(--o23-playground-dialog-navigator-width, 400px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_HEIGHT: `var(--o23-playground-dialog-configurable-element-height, ${CssVars.INPUT_HEIGHT})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_MARGIN: "var(--o23-playground-dialog-configurable-element-margin, 0 -8px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_PADDING: "var(--o23-playground-dialog-configurable-element-padding, 0 8px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BORDER_RADIUS: `var(--o23-playground-dialog-configurable-element-border-radius, ${CssVars.BORDER_RADIUS})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BORDER: "var(--o23-playground-dialog-configurable-element-border, 1px solid rgb(236, 242, 248))",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_HOVER_COLOR: `var(--o23-playground-dialog-configurable-element-hover-color, ${CssVars.HOVER_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_HOVER_FONT_WEIGHT: `var(--o23-playground-dialog-configurable-element-hover-font-weight, 600)`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT: "var(--o23-playground-dialog-configurable-element-indent, 8px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR: `var(--o23-playground-dialog-configurable-element-tree-line-color, ${CssVars.BORDER_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT: `var(--o23-playground-dialog-configurable-element-badge-height, calc(${CssVars.INPUT_HEIGHT} * 0.6))`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_FONT_WEIGHT: "var(--o23-playground-dialog-configurable-element-badge-font-weight, 400)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_PADDING: "var(--o23-playground-dialog-configurable-element-badge-padding, 0 12px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BORDER_RADIUS: "var(--o23-playground-dialog-configurable-element-badge-border-radius, 6px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_TEXT_FONT_SIZE: "var(--o23-playground-dialog-configurable-element-badge-text-font-size, 0.8em)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_TEXT_FONT_WEIGHT: "var(--o23-playground-dialog-configurable-element-badge-text-font-weight, 400)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ICON_MARGIN: "var(--o23-playground-dialog-configurable-element-badge-icon-margin, 0 -8px 0 0)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_CHECKED_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-checked-background-color, transparent)`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_CHECKED_COLOR: `var(--o23-playground-dialog-configurable-element-badge-checked-color, ${CssVars.SUCCESS_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_MISSED_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-missed-background-color, transparent)`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_MISSED_COLOR: `var(--o23-playground-dialog-configurable-element-badge-missed-color, ${CssVars.DANGER_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BANNED_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-banned-background-color, transparent)`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BANNED_COLOR: `var(--o23-playground-dialog-configurable-element-badge-banned-color, ${CssVars.DANGER_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ALL_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-all-background-color, ${CssVars.SUCCESS_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ALL_COLOR: `var(--o23-playground-dialog-configurable-element-badge-all-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_IGNORED_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-ignored-background-color, ${CssConstants.WAIVE_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_IGNORED_COLOR: `var(--o23-playground-dialog-configurable-element-badge-ignored-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NOT_AVAILABLE_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-not-available-background-color, ${CssVars.WAIVE_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NOT_AVAILABLE_COLOR: `var(--o23-playground-dialog-configurable-element-badge-not-available-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_COUNT_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-count-background-color, ${CssVars.SUCCESS_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_COUNT_COLOR: `var(--o23-playground-dialog-configurable-element-badge-count-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_MARGIN: "var(--o23-playground-dialog-configurable-element-specific-margin, 0 -8px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_PADDING: "var(--o23-playground-dialog-configurable-element-specific-padding, 8px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_COLUMN_GAP: "var(--o23-playground-dialog-configurable-element-specific-grid-column-gap, 32px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_ROW_GAP: "var(--o23-playground-dialog-configurable-element-specific-grid-row-gap, 8px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_LABEL_HEIGHT: `var(--o23-playground-dialog-configurable-element-help-label-height, ${CssVars.INPUT_HEIGHT})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_HEIGHT: `var(--o23-playground-dialog-configurable-element-help-badge-height, ${CssVars.INPUT_HEIGHT})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_COLOR: `var(--o23-playground-dialog-configurable-element-help-badge-color, ${CssVars.PRIMARY_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_FONT_WEIGHT: "var(--o23-playground-dialog-configurable-element-group-font-weight, 600)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_BORDER: `var(--o23-playground-dialog-configurable-element-group-border, 1px solid rgb(216, 222, 228))`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_INPUT_PREFIX_FONT_SIZE: "var(--o23-playground-dialog-configurable-element-specific-input-prefix-font-size, max(0.8em, 12px))",
  NODE_BORDER_RADIUS: "var(--o23-playground-node-border-radius, 8px)",
  NODE_BACKGROUND: `var(--o23-playground-node-background, ${CssVars.BACKGROUND_COLOR})`,
  NODE_TITLE_PADDING: "var(--o23-playground-node-title-padding, 0 10px)",
  NODE_TITLE_SPREADER_MIN_WIDTH: "var(--o23-playground-node-title-spreader-min-width, 40px)",
  NODE_MIN_WIDTH: "var(--o23-playground-node-min-width, 160px)",
  NODE_ICON_SIZE: "var(--o23-playground-node-icon-size, 14px)",
  NODE_PORT_HEIGHT: "var(--o23-playground-node-port-height, 24px)",
  NODE_NEXT_STEP_PORT_FONT_SIZE: "var(--o23-playground-next-step-port-font-size, 14px)",
  NODE_NEXT_STEP_PORT_FONT_WEIGHT: "var(--o23-playground-next-step-port-font-weight, 600)",
  NODE_NEXT_STEP_PORT_COLOR: `var(--o23-playground-next-step-port-color, ${CssVars.INVERT_COLOR})`,
  NODE_NEXT_STEP_PORT_BACKGROUND: `var(--o23-playground-next-step-port-background, ${NEXT_STEP_PORT_COLOR})`,
  NODE_NEXT_STEP_PORT_BORDER: `var(--o23-playground-next-step-port-border, 1px solid ${color(NEXT_STEP_PORT_COLOR).darken(0.1).fade(0.5)})`,
  NODE_NEXT_STEP_PORT_PADDING: "var(--o23-playground-next-step-port-padding, 0 8px 0 12px)",
  NODE_PREVIOUS_STEP_PORT_FONT_SIZE: "var(--o23-playground-previous-step-port-font-size, 14px)",
  NODE_PREVIOUS_STEP_PORT_FONT_WEIGHT: "var(--o23-playground-previous-step-port-font-weight, 600)",
  NODE_PREVIOUS_STEP_PORT_COLOR: `var(--o23-playground-previous-step-port-color, ${CssVars.INVERT_COLOR})`,
  NODE_PREVIOUS_STEP_PORT_BACKGROUND: `var(--o23-playground-previous-step-port-background, ${PREVIOUS_STEP_PORT_COLOR})`,
  NODE_PREVIOUS_STEP_PORT_BORDER: `var(--o23-playground-previous-step-port-border, 1px solid ${color(PREVIOUS_STEP_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PREVIOUS_STEP_PORT_PADDING: "var(--o23-playground-previous-step-port-padding, 0 12px 0 8px)",
  NODE_API_VARIABLE_PORT_FONT_SIZE: "var(--o23-playground-api-variable-port-font-size, 14px)",
  NODE_API_VARIABLE_PORT_FONT_WEIGHT: "var(--o23-playground-api-variable-port-font-weight, 400)",
  NODE_API_VARIABLE_PORT_COLOR: `var(--o23-playground-api-variable-port-color, ${CssVars.INVERT_COLOR})`,
  NODE_API_VARIABLE_PORT_BACKGROUND: `var(--o23-playground-api-variable-port-background, ${API_VARIABLE_PORT_COLOR})`,
  NODE_API_VARIABLE_PORT_BORDER: `var(--o23-playground-api-variable-port-border, 1px solid ${color(API_VARIABLE_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_API_VARIABLE_PORT_PADDING: "var(--o23-playground-api-variable-port-padding, 0 12px 0 8px)",
  NODE_API_VARIABLE_PORT_UNDEFINED_BACKGROUND: `var(--o23-playground-api-variable-port-undefined-background, ${CssConstants.WAIVE_COLOR})`,
  NODE_API_VARIABLE_PORT_UNDEFINED_BORDER: `var(--o23-playground-api-variable-port-undefined-border, 1px solid ${color(CssConstants.WAIVE_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_API_VARIABLE_PORT_LACKING_BACKGROUND: `var(--o23-playground-api-variable-port-lacking-background, ${CssVars.DANGER_COLOR})`,
  NODE_API_VARIABLE_PORT_LACKING_BORDER: `var(--o23-playground-api-variable-port-lacking-border, 1px solid ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_API_VARIABLE_PORT_BADGE_BACKGROUND: `var(--o23-playground-api-variable-port-badge-background, ${CssVars.SUCCESS_COLOR})`,
  NODE_API_VARIABLE_PORT_BADGE_BORDER: `var(--o23-playground-api-variable-port-badge-background, 1px solid ${CssVars.INVERT_COLOR})`,
  NODE_START_BORDER_COLOR: `var(--o23-playground-node-start-border-color, ${NODE_START_COLOR})`,
  NODE_START_BORDER: `var(--o23-playground-node-start-border, 2px solid ${NODE_START_COLOR})`,
  NODE_START_TITLE_FONT_SIZE: "var(--o23-playground-node-start-title-font-size, 16px)",
  NODE_START_TITLE_FONT_WEIGHT: "var(--o23-playground-node-start-title-font-weight, 600)",
  NODE_START_SECOND_TITLE_FONT_SIZE: "var(--o23-playground-node-start-second-title-font-size, 14px)",
  NODE_START_SECOND_TITLE_FONT_WEIGHT: "var(--o23-playground-node-start-second-title-font-weight, 600)",
  NODE_START_TITLE_COLOR: `var(--o23-playground-node-start-title-color, ${CssVars.INVERT_COLOR})`,
  NODE_START_TITLE_BACKGROUND: `var(--o23-playground-node-start-title-background, linear-gradient(135deg, ${NODE_START_COLOR} 0%, ${color(NODE_START_COLOR).alpha(0.7)} 70%, ${color(NODE_START_COLOR).alpha(0.5)} 100%))`,
  NODE_START_SECOND_TITLE_DECORATION: "var(--o23-playground-node-start-second-title-decoration, underline double)",
  NODE_START_BODY_HEIGHT: `var(--o23-playground-node-start-body-height, 32px)`,
  NODE_START_BODY_PADDING: "var(--o23-playground-node-start-body-padding, 8px 0)",
  NODE_END_BORDER_COLOR: `var(--o23-playground-node-end-border-color, ${NODE_END_COLOR})`,
  NODE_END_BORDER: `var(--o23-playground-node-end-border, 2px solid ${NODE_END_COLOR})`,
  NODE_END_TITLE_FONT_SIZE: "var(--o23-playground-node-end-title-font-size, 16px)",
  NODE_END_TITLE_FONT_WEIGHT: "var(--o23-playground-node-end-title-font-weight, 600)",
  NODE_END_TITLE_COLOR: `var(--o23-playground-node-end-title-color, ${CssVars.INVERT_COLOR})`,
  NODE_END_TITLE_BACKGROUND: `var(--o23-playground-node-end-title-background, linear-gradient(135deg, ${NODE_END_COLOR} 0%, ${color(NODE_END_COLOR).alpha(0.7)} 70%, ${color(NODE_END_COLOR).alpha(0.5)} 100%))`,
  NODE_END_BODY_HEIGHT: "var(--o23-playground-node-end-body-height, 32px)",
  NODE_END_BODY_PADDING: "var(--o23-playground-node-end-body-padding, 8px 0)"
};
const Back = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-back", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M9.5 7L4.5 12L9.5 17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.5", d: "M4.5 12L14.5 12C16.1667 12 19.5 13 19.5 17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const ArrowLeft = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-arrow-left", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const ArrowRight = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-arrow-right", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008", stroke: "currentColor", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const PortUndefined = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-port-undefined", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M12 22C10.9808 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914V10.4168C3 7.21918 3 5.62039 3.37752 5.08252C3.75503 4.54465 5.25825 4.02996 8.26484 3.00079L8.83765 2.80472C10.4049 2.26824 11.1885 2 11.9999 2", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { opacity: "0.5", d: "M12.0001 22C13.0193 22 13.3801 21.8424 14.1015 21.5273C16.7611 20.3655 21.0001 17.6294 21.0001 11.9914V10.4168C21.0001 7.21918 21.0001 5.62039 20.6226 5.08252C20.245 4.54465 18.7417 4.02996 15.7351 3.00079L15.1623 2.80472C13.595 2.26824 12.8114 2 12 2", stroke: "currentColor", strokeWidth: "1.5" })
  );
};
const PortChecked = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-port-checked", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { opacity: "0.5", d: "M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { d: "M9.5 12.4L10.9286 14L14.5 10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const PortIncorrect = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-port-incorrect", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { opacity: "0.5", d: "M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { d: "M14.5 9.5L9.50002 14.5M9.5 9.49998L14.5 14.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const ElementChecked = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-element-checked", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M9.5 12.4L10.9286 14L14.5 10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 14.4963 20.1632 16.4284 19 17.9041M3.19284 14C4.05026 18.2984 7.57641 20.5129 9.89856 21.5273C10.62 21.8424 10.9807 22 12 22C13.0193 22 13.38 21.8424 14.1014 21.5273C14.6796 21.2747 15.3324 20.9478 16 20.5328", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const ElementMissed = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-element-missed", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("circle", { cx: "12", cy: "16", r: "1", fill: "currentColor" }),
    React.createElement("path", { d: "M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const ElementBanned = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-element-banned", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M14.5 9.5L9.50002 14.5M9.5 9.49998L14.5 14.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 14.4963 20.1632 16.4284 19 17.9041M3.19284 14C4.05026 18.2984 7.57641 20.5129 9.89856 21.5273C10.62 21.8424 10.9807 22 12 22C13.0193 22 13.38 21.8424 14.1014 21.5273C14.6796 21.2747 15.3324 20.9478 16 20.5328", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const ElementHelp = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-element-help", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("circle", { opacity: "0.5", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { d: "M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("circle", { cx: "12", cy: "16", r: "1", fill: "currentColor" })
  );
};
const Labels = {
  ERROR: React.createElement(IntlLabel, { keys: ["o23", "error", "unknown"], value: "Something went wrong." }),
  NoContent: React.createElement(IntlLabel, { keys: ["o23", "error", "no-content"], value: "No content given." }),
  NoDefParsed: React.createElement(IntlLabel, { keys: ["o23", "error", "no-def"], value: "No definition parsed." }),
  ParseError: React.createElement(IntlLabel, { keys: ["o23", "error", "parse"], value: "Parse error occurred." }),
  EndNodeTitle: React.createElement(IntlLabel, { keys: ["o23", "node", "end"], value: "End" }),
  PreviousStepPort: React.createElement(IntlLabel, { keys: ["o23", "port", "previous"], value: "In" }),
  NextStepPort: React.createElement(IntlLabel, { keys: ["o23", "port", "next"], value: "Out" }),
  HelpDesk: React.createElement(IntlLabel, { keys: ["o23", "dialog", "docs", "title"], value: "Help Desk" }),
  Navigator: React.createElement(IntlLabel, { keys: ["o23", "dialog", "navigator", "title"], value: "Configurable Elements" }),
  Specific: React.createElement(IntlLabel, { keys: ["o23", "dialog", "specific", "title"], value: "Specific Details" }),
  BackToCanvas: React.createElement(IntlLabel, { keys: ["o23", "dialog", "close"], value: "Back to canvas" }),
  PipelineTypeApi: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "api"], value: "Pipeline as API" }),
  PipelineTypePipeline: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "standard"], value: "Pipeline" }),
  PipelineTypeStepSet: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "step-sets"], value: "Step Set" }),
  PipelineTypeStep: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "step"], value: "Step" }),
  ParameterNames: React.createElement(IntlLabel, { keys: ["o23", "parameter", "names"], value: "Names" }),
  BodyFollowHttpMethod: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "body", "follow-http-method"], value: "Follow method default" }),
  ParseBody: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "body", "parse"], value: "Parse" }),
  All: React.createElement(IntlLabel, { keys: ["o23", "variable", "all"], value: "All" }),
  Ignored: React.createElement(IntlLabel, { keys: ["o23", "variable", "ignored"], value: "Ignored" }),
  Designated: React.createElement(IntlLabel, { keys: ["o23", "variable", "designated"], value: "Designated" }),
  Specified: React.createElement(IntlLabel, { keys: ["o23", "variable", "specified"], value: "Specified" }),
  Customized: React.createElement(IntlLabel, { keys: ["o23", "variable", "customized"], value: "Customized" }),
  NotAvailable: React.createElement(IntlLabel, { keys: ["o23", "variable", "not-available"], value: "N/A" }),
  YesChar: React.createElement(IntlLabel, { keys: ["o23", "variable", "yes-char"], value: "Y" }),
  NoChar: React.createElement(IntlLabel, { keys: ["o23", "variable", "no-char"], value: "N" }),
  BadgeChecked: React.createElement(IntlLabel, { keys: ["o23", "variable", "checked"], value: React.createElement(ElementChecked, null) }),
  BadgeMissed: React.createElement(IntlLabel, { keys: ["o23", "variable", "missed"], value: React.createElement(ElementMissed, null) }),
  BadgeBanned: React.createElement(IntlLabel, { keys: ["o23", "variable", "banned"], value: React.createElement(ElementBanned, null) }),
  NoCodeDefinedInFileDef: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "code", "undefined"], value: "No code defined" })
};
const _NextStepPortModel = class _NextStepPortModel extends PortModel {
  constructor() {
    super({
      type: _NextStepPortModel.TYPE,
      name: _NextStepPortModel.NAME,
      alignment: PortModelAlignment.RIGHT
    });
  }
  createLinkModel() {
    const link = new DefaultLinkModel();
    link.setSourcePort(this);
    return link;
  }
};
__publicField(_NextStepPortModel, "TYPE", "next-step-port");
__publicField(_NextStepPortModel, "NAME", "next-step");
let NextStepPortModel = _NextStepPortModel;
class NextStepPortFactory extends AbstractModelFactory {
  constructor() {
    super(NextStepPortModel.TYPE);
  }
  generateModel(_event) {
    return new NextStepPortModel();
  }
}
const NextStepPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-next-step-port" })`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: end;
    color: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_BORDER};
    border-top-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_FONT_SIZE};
    text-transform: uppercase;
    padding: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_PADDING};
    margin-right: -1px;
    grid-column: 3;

    > div:first-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
    }
`;
const NextStepPortWidget = (props) => {
  const { port, engine } = props;
  return React.createElement(
    NextStepPortContainer,
    null,
    React.createElement(PortWidget, { port, engine }),
    React.createElement("span", null, Labels.NextStepPort)
  );
};
const _PreviousStepPortModel = class _PreviousStepPortModel extends PortModel {
  constructor() {
    super({
      type: _PreviousStepPortModel.TYPE,
      name: _PreviousStepPortModel.NAME,
      alignment: PortModelAlignment.LEFT
    });
  }
  createLinkModel() {
    return new DefaultLinkModel();
  }
};
__publicField(_PreviousStepPortModel, "TYPE", "previous-step-port");
__publicField(_PreviousStepPortModel, "NAME", "previous-step");
let PreviousStepPortModel = _PreviousStepPortModel;
class PreviousStepPortFactory extends AbstractModelFactory {
  constructor() {
    super(PreviousStepPortModel.TYPE);
  }
  generateModel(_event) {
    return new PreviousStepPortModel();
  }
}
const PreviousStepPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-previous-step-port" })`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: start;
    color: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_BORDER};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_FONT_SIZE};
    text-transform: uppercase;
    padding: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_PADDING};
    margin-left: -1px;
    grid-column: 1;

    > div:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
    }
`;
const PreviousStepPortWidget = (props) => {
  const { port, engine } = props;
  return React.createElement(
    PreviousStepPortContainer,
    null,
    React.createElement(PortWidget, { port, engine }),
    React.createElement("span", null, Labels.PreviousStepPort)
  );
};
const NodeContainer = qe.div`
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: var(--border-radius);
    border: var(--border);
    background-color: var(--background-color);
    min-width: ${PlaygroundCssVars.NODE_MIN_WIDTH};
`;
const NodeHeader = qe.div`
    display: flex;
    position: relative;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    background: var(--background);
    padding: var(--padding);
    margin-top: -2px;
`;
const NodeTitle = qe(UnwrappedCaption)`
    color: var(--color);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
`;
const NodeTitleSpreader = qe.span.attrs({ [DOM_KEY_WIDGET]: "o23-playground-node-title-spreader" })`
    display: flex;
    position: relative;
    flex-grow: 1;
    min-width: var(--min-width, ${PlaygroundCssVars.NODE_TITLE_SPREADER_MIN_WIDTH});

    + span {
        flex-grow: unset;
    }
`;
const NodeSecondTitle = qe(UnwrappedCaption)`
    flex-grow: 1;
    justify-content: flex-end;
    color: var(--color);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    text-decoration: var(--text-decoration);
`;
const NodeBody = qe.div`
    display: grid;
    position: relative;
    grid-column: 1 / span 2;
    grid-row: 2;
    grid-template-columns: auto minmax(40px, 1fr) auto;
    min-height: var(--min-height);
    padding: var(--padding);
`;
const NodeWrapper = (props) => {
  const { children, ...rest } = props;
  return React.createElement(NodeContainer, { ...rest }, children);
};
const _EndNodeModel = class _EndNodeModel extends NodeModel {
  constructor() {
    super({ type: _EndNodeModel.TYPE });
    this.addPort(new PreviousStepPortModel());
  }
};
__publicField(_EndNodeModel, "TYPE", "end-node");
let EndNodeModel = _EndNodeModel;
const EndNodeContainer = qe(NodeWrapper).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-end-node",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--border": PlaygroundCssVars.NODE_END_BORDER,
    "--background-color": PlaygroundCssVars.NODE_BACKGROUND
  }
})``;
const EndNodeHeader = qe(NodeHeader).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-end-node-header",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--background": PlaygroundCssVars.NODE_END_TITLE_BACKGROUND,
    "--padding": PlaygroundCssVars.NODE_TITLE_PADDING
  }
})``;
const EndNodeTitle = qe(NodeTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-end-node-title",
  style: {
    "--color": PlaygroundCssVars.NODE_END_TITLE_COLOR,
    "--font-size": PlaygroundCssVars.NODE_END_TITLE_FONT_SIZE,
    "--font-weight": PlaygroundCssVars.NODE_END_TITLE_FONT_WEIGHT
  }
})``;
const EndNodeBody = qe(NodeBody).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-end-node-body",
  style: {
    "--min-height": PlaygroundCssVars.NODE_END_BODY_HEIGHT,
    "--padding": PlaygroundCssVars.NODE_END_BODY_PADDING
  }
})``;
const EndNodeWidget = (props) => {
  const { node, engine } = props;
  return React.createElement(
    EndNodeContainer,
    null,
    React.createElement(
      EndNodeHeader,
      null,
      React.createElement(EndNodeTitle, null, Labels.EndNodeTitle)
    ),
    React.createElement(
      EndNodeBody,
      null,
      React.createElement(PreviousStepPortWidget, { port: node.getPort(PreviousStepPortModel.NAME), engine })
    )
  );
};
class EndNodeFactory extends AbstractReactFactory {
  constructor() {
    super(EndNodeModel.TYPE);
  }
  generateReactWidget(event) {
    return React.createElement(EndNodeWidget, { engine: this.engine, node: event.model });
  }
  generateModel(_event) {
    throw new Error("DO NOT use EndNodeFactory#generateModel.");
  }
}
const _StartNodeModel = class _StartNodeModel extends NodeModel {
  constructor(def) {
    super({ type: _StartNodeModel.TYPE });
    __publicField(this, "def");
    this.def = def;
    this.addPort(new NextStepPortModel());
  }
  routeTo(node) {
    const port = this.getPort(NextStepPortModel.NAME);
    const link = port.createLinkModel();
    link.setTargetPort(node.getPort(PreviousStepPortModel.NAME));
    return link;
  }
};
__publicField(_StartNodeModel, "TYPE", "start-node");
let StartNodeModel = _StartNodeModel;
var PlaygroundEventTypes;
(function(PlaygroundEventTypes2) {
  PlaygroundEventTypes2["CONTENT_CHANGED"] = "content-changed";
  PlaygroundEventTypes2["INIT_HELP_DOC_WIDTH"] = "init-help-doc-width";
  PlaygroundEventTypes2["SHOW_EDIT_DIALOG"] = "show-edit-dialog";
  PlaygroundEventTypes2["HIDE_EDIT_DIALOG"] = "hide-edit-dialog";
})(PlaygroundEventTypes || (PlaygroundEventTypes = {}));
const Context$1 = reactExports.createContext({});
Context$1.displayName = "PlaygroundEventBus";
const PlaygroundEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("playground");
  return React.createElement(Context$1.Provider, { value: bus }, children);
};
const usePlaygroundEventBus = () => reactExports.useContext(Context$1);
const EditDialogContainer = qe.div.attrs(({ visible }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog",
    style: {
      opacity: visible ? 1 : void 0,
      pointerEvents: visible ? "auto" : void 0
    }
  };
})`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    background-color: ${PlaygroundCssVars.EDIT_DIALOG_BACKDROP_COLOR};
    pointer-events: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    z-index: ${PlaygroundCssVars.EDIT_DIALOG_Z_INDEX};
`;
const EditDialogWrapper = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-wrapper" })`
    display: block;
    position: relative;
    margin-top: ${PlaygroundCssVars.EDIT_DIALOG_MARGIN_TOP};
    margin-left: ${PlaygroundCssVars.EDIT_DIALOG_MARGIN_LEFT};
    width: ${PlaygroundCssVars.EDIT_DIALOG_WIDTH};
    height: ${PlaygroundCssVars.EDIT_DIALOG_HEIGHT};
`;
const EditDialogLayoutControllerHandle = qe.div.attrs(({ opened }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-layout-controller",
    "data-opened": opened
  };
})`
    display: none;
    position: absolute;

    &[data-opened=true] + div[data-w=o23-playground-edit-dialog-content] {
        grid-template-columns: calc((100% - ${PlaygroundCssVars.EDIT_DIALOG_NAVIGATOR_WIDTH}) / 2 - ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_COLLAPSED_WIDTH}) ${PlaygroundCssVars.EDIT_DIALOG_NAVIGATOR_WIDTH} 1fr;

        > div[data-w=o23-playground-edit-dialog-help-doc] > div[data-w=o23-playground-edit-dialog-part-content] > div[data-w=o23-playground-edit-dialog-part-header] > div[data-w=o23-playground-edit-dialog-part-title] {
            color: unset;
        }
    }

    &[data-opened=false] + div[data-w=o23-playground-edit-dialog-content] {
        grid-template-columns: ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_COLLAPSED_WIDTH} ${PlaygroundCssVars.EDIT_DIALOG_NAVIGATOR_WIDTH} 1fr;

        > div[data-w=o23-playground-edit-dialog-help-doc] > div[data-w=o23-playground-edit-dialog-part-content] > div[data-w=o23-playground-edit-dialog-part-header] > div[data-w=o23-playground-edit-dialog-part-title] {
            color: ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_TITLE_COLOR};
        }
    }
`;
const EditDialogContentContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-content" })`
    display: grid;
    position: relative;
    height: 100%;
    width: 100%;
    transition: grid-template-columns ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    div.markdown-body {
        font-size: ${PlaygroundCssVars.MARKDOWN_FONT_SIZE};
        color: ${PlaygroundCssVars.MARKDOWN_COLOR};
        background-color: ${PlaygroundCssVars.MARKDOWN_BACKGROUND_COLOR};

        h1 {
            font-size: 1.5em;
        }

        h2 {
            font-size: 1.35em;
        }

        h3 {
            font-size: 1.2em;
        }

        h4 {
            font-size: 1.1em;
        }

        h5, h6 {
            font-size: 1em;
        }

        p, blockquote, ul, ol, dl, table, pre, details {
            margin-bottom: 4px;
        }

        > *:last-child {
            margin-bottom: 0;
        }
    }
`;
const EditDialogContentInitializer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-content-initializer" })`
    display: none;
`;
const EditorDialogCloser = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-closer" })`
    display: flex;
    position: absolute;
    align-items: center;
    top: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_TOP};
    right: 0;
    color: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_ICON_COLOR};
    font-size: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_FONT_SIZE};
    font-weight: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_FONT_WEIGHT};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_PADDING};
    cursor: pointer;

    > svg {
        height: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_ICON_SIZE};
        width: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_ICON_SIZE};
        margin-right: 4px;
    }
`;
const EditDialogHelpDocContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-help-doc" })`
    display: flex;
    position: relative;
    align-self: stretch;
    margin: ${PlaygroundCssVars.EDIT_DIALOG_PART_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_PADDING};
    background-color: ${PlaygroundCssVars.EDIT_DIALOG_BACKGROUND_COLOR};
    border-top-left-radius: ${PlaygroundCssVars.EDIT_DIALOG_BORDER_RADIUS};
    border-bottom-left-radius: ${PlaygroundCssVars.EDIT_DIALOG_BORDER_RADIUS};
    box-shadow: ${PlaygroundCssVars.EDIT_DIALOG_SHADOW};
    overflow: hidden;
`;
const EditDialogNavigatorContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-navigator" })`
    display: flex;
    position: relative;
    grid-column: 2;
    grid-row: 1;
    align-self: stretch;
    padding: ${PlaygroundCssVars.EDIT_DIALOG_PADDING};
    background-color: ${PlaygroundCssVars.EDIT_DIALOG_BACKGROUND_COLOR};
    box-shadow: ${PlaygroundCssVars.EDIT_DIALOG_SHADOW};
    border-radius: ${PlaygroundCssVars.EDIT_DIALOG_BORDER_RADIUS};
    border: ${PlaygroundCssVars.EDIT_DIALOG_BORDER};
    overflow: hidden;
`;
const EditDialogSpecificDetailsContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-details" })`
    display: flex;
    position: relative;
    grid-column: 3;
    align-self: stretch;
    margin: ${PlaygroundCssVars.EDIT_DIALOG_PART_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_PADDING};
    background-color: ${PlaygroundCssVars.EDIT_DIALOG_BACKGROUND_COLOR};
    border-top-right-radius: ${PlaygroundCssVars.EDIT_DIALOG_BORDER_RADIUS};
    border-bottom-right-radius: ${PlaygroundCssVars.EDIT_DIALOG_BORDER_RADIUS};
    box-shadow: ${PlaygroundCssVars.EDIT_DIALOG_SHADOW};
    overflow: hidden;
`;
const EditDialogPartContent = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-part-content" })`
    display: flex;
    position: relative;
    flex-direction: column;
    align-self: stretch;
    flex-grow: 1;
`;
const EditDialogPartHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-part-header" })`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${PlaygroundCssVars.EDIT_DIALOG_PART_HEADER_HEIGHT};
    margin-bottom: calc(${PlaygroundCssVars.EDIT_DIALOG_PART_HEADER_HEIGHT} / 4);
`;
const EditDialogPartTitle = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-part-title" })`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    font-size: ${PlaygroundCssVars.EDIT_DIALOG_PART_TITLE_FONT_SIZE};
    font-weight: ${PlaygroundCssVars.EDIT_DIALOG_PART_TITLE_FONT_WEIGHT};
    white-space: nowrap;
    transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
const EditDialogPartBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-part-body" })`
    display: flex;
    position: relative;
    flex-grow: 1;
    margin: ${PlaygroundCssVars.EDIT_DIALOG_PART_BODY_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_PART_BODY_PADDING};
    overflow: hidden;
`;
const EditDialogHelpDocOpenHandle = qe.div.attrs(({ opened }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-help-doc-open-handle",
    "data-opened": opened,
    style: {
      "--opacity": opened ? 0 : void 0,
      "--pointer-events": opened ? "none" : "auto",
      "--left": opened ? `calc(100% - ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_WIDTH})` : PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_LEFT
    }
  };
})`
    display: flex;
    position: absolute;
    align-items: center;
    top: 0;
    left: var(--left);
    width: ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_WIDTH};
    height: 100%;
    opacity: var(--opacity);
    pointer-events: var(--pointer-events);
    cursor: pointer;
    z-index: 1;
    transition: left ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, opacity ${CssVars.TRANSITION_DURATION} calc(${CssVars.TRANSITION_DURATION} / 2) ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-opened=false] + div[data-w=o23-playground-edit-dialog-help-doc] {
        filter: blur(2px);
        opacity: 0.7;
    }

    &[data-opened=true] + div[data-w=o23-playground-edit-dialog-help-doc] {
        opacity: 1;
    }

    > svg {
        color: ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_COLOR};
        opacity: 0.7;
    }
`;
const EditDialogHelpDocCloseHandle = qe.div.attrs(({ opened }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-help-doc-close-handle",
    style: {
      "--opacity": opened ? void 0 : 0,
      "--pointer-events": opened ? "auto" : "none"
    }
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    height: ${PlaygroundCssVars.EDIT_DIALOG_PART_HEADER_HEIGHT};
    width: ${PlaygroundCssVars.EDIT_DIALOG_PART_HEADER_HEIGHT};
    opacity: var(--opacity);
    pointer-events: var(--pointer-events);
    cursor: pointer;
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        > svg {
            color: ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_COLOR};
        }
    }

    > svg {
        opacity: 0.7;
        transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
const HelpDocContainer = qe.div.attrs(({ width }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-help-doc",
    "data-v-scroll": "",
    "data-h-scroll": "",
    style: {
      "--min-width": width ? `calc((${width}px - ${PlaygroundCssVars.EDIT_DIALOG_NAVIGATOR_WIDTH}) / 2 - ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_COLLAPSED_WIDTH} - ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_GUTTER_SIZE})` : void 0
    }
  };
})`
    display: block;
    position: relative;
    flex-grow: 1;
    margin: ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_PADDING};
    min-width: var(--min-width);
    overflow: auto;
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, filter ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
const NavigatorElementsContainer = qe.div.attrs({
  [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-navigator-elements",
  "data-h-scroll": ""
})`
    display: flex;
    position: relative;
    flex-grow: 1;
    flex-direction: column;
    align-self: stretch;
    margin: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_PADDING};
    overflow-y: auto;
    overflow-x: hidden;

    > div[data-w=o23-playground-edit-dialog-navigator-element]:first-child {
        border-top-color: transparent;
    }
`;
const NavigatorElementContainer = qe.div.attrs(({ level }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-navigator-element",
    "data-level": level,
    style: {
      "--level": level
    }
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HEIGHT};
    margin: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_PADDING};
    border-top: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BORDER};
    border-radius: 0;
    cursor: pointer;
    transition: background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, border-radius ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, font-weight ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HOVER_COLOR};
        border-radius: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BORDER_RADIUS};
        font-weight: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HOVER_FONT_WEIGHT};
    }

`;
const NavigatorElementLabel = qe.div.attrs(({ level }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-navigator-element-label",
    style: {
      "--margin-left": level == 0 ? 0 : `calc(${level * 2} * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT})`
    }
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    margin-left: var(--margin-left);
    height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HEIGHT};
`;
const NavigatorElementBadge = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-navigator-element-badge" })`
    display: flex;
    position: relative;
    align-items: center;
    font-weight: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_FONT_WEIGHT};
`;
const NavigatorElementBadgeWrapper = qe.span.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-navigator-element-badge-wrapper" })`
    display: flex;
    position: relative;
    align-items: center;
    font-size: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_TEXT_FONT_SIZE};
    font-weight: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_TEXT_FONT_WEIGHT};
    height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_PADDING};
    border-radius: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BORDER_RADIUS};

    &[data-role=checked] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_CHECKED_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_CHECKED_COLOR};
    }

    &[data-role=missed] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_MISSED_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_MISSED_COLOR};
    }

    &[data-role=banned] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BANNED_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BANNED_COLOR};
    }

    &[data-role=all] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ALL_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ALL_COLOR};
    }

    &[data-role=ignored] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_IGNORED_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_IGNORED_COLOR};
    }

    &[data-role=not-available] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NOT_AVAILABLE_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NOT_AVAILABLE_COLOR};
    }

    &[data-role=count] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_COUNT_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_COUNT_COLOR};
    }

    > svg {
        width: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT};
        margin: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ICON_MARGIN};
    }
`;
const NavigatorElementChildren = qe.span.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-navigator-element-children-container" })`
    display: flex;
    position: relative;
    flex-direction: column;

    &:not(:last-child):before {
        content: '';
        display: block;
        position: absolute;
        width: 1px;
        height: calc(100% + 1px);
        top: 0;
        left: calc(0.5 * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT});
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
    }

    > div[data-w=o23-playground-edit-dialog-navigator-element] {
        > div[data-w=o23-playground-edit-dialog-navigator-element-label] {
            &:before {
                content: '';
                display: block;
                position: absolute;
                width: 1px;
                height: calc(100% + 1px);
                top: 0;
                left: calc(-1.5 * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT});
                background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
            }

            &:after {
                content: '';
                display: block;
                position: absolute;
                width: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT};
                height: 50%;
                top: 0;
                left: calc(-1.5 * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT});
                border-bottom-left-radius: 3px;
                border-bottom: 1px solid ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
            }
        }
    }

    > div[data-w=o23-playground-edit-dialog-navigator-element]:last-of-type {
        > div[data-w=o23-playground-edit-dialog-navigator-element-label] {
            &:before {
                display: none;
            }

            &:after {
                border-left: 1px solid ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
            }
        }
    }
`;
const SpecificElementsContainer = qe.div.attrs({
  [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-elements",
  "data-h-scroll": ""
})`
    display: grid;
    position: relative;
    flex-grow: 1;
    align-self: stretch;
    grid-template-columns: auto 1fr;
    grid-column-gap: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_COLUMN_GAP};
    grid-row-gap: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_ROW_GAP};
    align-content: start;
    margin: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_PADDING};
    overflow-y: auto;
    overflow-x: hidden;
    // avoid external grid effect
    --grid-column: auto;
    --grid-row: auto;
`;
const SpecificElementLabel = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-element-label" })`
    display: flex;
    position: relative;
    align-items: start;
    min-height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_LABEL_HEIGHT};

    &[data-group=true] {
        font-weight: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_FONT_WEIGHT};
        border-bottom: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_BORDER};
        margin-right: calc(-1 * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_COLUMN_GAP});

        + div[data-w=o23-playground-edit-dialog-specific-element-editor-placeholder] {
            border-bottom: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_BORDER};
        }
    }

    > span:first-child {
        height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_LABEL_HEIGHT};
        display: inline-flex;
        align-items: center;
        position: relative;
    }
`;
const SpecificElementHelpBadge = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-element-help-badge" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_HEIGHT};
    width: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_HEIGHT};
    opacity: 0;
    cursor: pointer;
    pointer-events: none;
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=true] {
        opacity: 1;
        pointer-events: auto;
    }

    > svg {
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_COLOR};
        height: calc(${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_HEIGHT} * 0.6);
    }
`;
const SpecificElementEditorPlaceholder = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-element-editor-placeholder" })``;
const SpecificElementHelpDoc = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-element-help-doc" })`
    display: block;
    position: relative;
    grid-column: 2;
    height: 0;
    overflow: hidden;
    transition: height ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=true] {
        height: auto;
        overflow: visible;
    }

    > div {
        font-size: ${PlaygroundCssVars.SPECIFIC_MARKDOWN_FONT_SIZE};
    }
`;
var EditDialogEventTypes;
(function(EditDialogEventTypes2) {
  EditDialogEventTypes2["OPEN_HELP_DESK"] = "open-help-desk";
  EditDialogEventTypes2["CLOSE_HELP_DESK"] = "close-help-desk";
  EditDialogEventTypes2["ASK_HELP_DESK_OPENED"] = "ask-help-desk-opened";
  EditDialogEventTypes2["ELEMENT_VALUE_CHANGED"] = "element-value-changed";
  EditDialogEventTypes2["LOCATE_ELEMENT"] = "locate-element";
})(EditDialogEventTypes || (EditDialogEventTypes = {}));
const Context = reactExports.createContext({});
Context.displayName = "EditDialogEventBus";
const EditDialogEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("edit-dialog");
  return React.createElement(Context.Provider, { value: bus }, children);
};
const useEditDialogEventBus = () => reactExports.useContext(Context);
const ConfigurableElementBadgeChecked = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "checked" }, Labels.BadgeChecked);
};
const ConfigurableElementBadgeMissed = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "missed" }, Labels.BadgeMissed);
};
const ConfigurableElementBadgeBanned = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "banned" }, Labels.BadgeBanned);
};
const ConfigurableElementBadgeAll = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "all" }, Labels.All);
};
const ConfigurableElementBadgeIgnored = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "ignored" }, Labels.Ignored);
};
const ConfigurableElementBadgeNotAvailable = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "not-available" }, Labels.NotAvailable);
};
const ConfigurableElementBadgeCount = (props) => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "count" }, props.count);
};
const LinkRenderer = (props) => {
  return React.createElement("a", { href: props.href, target: "_blank", rel: "noreferrer" }, props.children);
};
const CodeRenderer = (props) => {
  const { children } = props;
  if (children === "@rainbow-o23") {
    return React.createElement(
      "code",
      null,
      React.createElement("a", { href: "https://github.com/InsureMO/rainbow-o23", target: "_blank", rel: "noreferrer" }, props.children)
    );
  } else {
    return React.createElement("code", null, children);
  }
};
const components = { a: LinkRenderer, code: CodeRenderer };
const HelpDoc = (props) => {
  const { content } = props;
  return React.createElement(Markdown, { className: "markdown-body", components, remarkPlugins: [remarkGfm] }, content);
};
const useHelpDeskOpened = () => {
  const { on, off } = useEditDialogEventBus();
  const [helpDeskOpened, setHelpDeskOpened] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onOpenHelpDesk = () => setHelpDeskOpened(true);
    const onCloseHelpDesk = () => setHelpDeskOpened(false);
    on(EditDialogEventTypes.OPEN_HELP_DESK, onOpenHelpDesk);
    on(EditDialogEventTypes.CLOSE_HELP_DESK, onCloseHelpDesk);
    return () => {
      off(EditDialogEventTypes.OPEN_HELP_DESK, onOpenHelpDesk);
      off(EditDialogEventTypes.CLOSE_HELP_DESK, onCloseHelpDesk);
    };
  }, [on, off, helpDeskOpened]);
  return [helpDeskOpened, setHelpDeskOpened];
};
const StateHolder = () => {
  const { on, off } = useEditDialogEventBus();
  const [helpDeskOpened] = useHelpDeskOpened();
  reactExports.useEffect(() => {
    const onAskHelpDeskOpened = (callback) => {
      callback(helpDeskOpened);
    };
    on(EditDialogEventTypes.ASK_HELP_DESK_OPENED, onAskHelpDeskOpened);
    return () => {
      off(EditDialogEventTypes.ASK_HELP_DESK_OPENED, onAskHelpDeskOpened);
    };
  }, [on, off, helpDeskOpened]);
  return React.createElement(reactExports.Fragment, null);
};
const CloseHandle = () => {
  const { fire } = useEditDialogEventBus();
  const [opened, setOpened] = useHelpDeskOpened();
  reactExports.useEffect(() => {
    fire(EditDialogEventTypes.ASK_HELP_DESK_OPENED, (opened2) => setOpened(opened2));
  }, [fire, setOpened]);
  const onCloseHelpDesk = () => {
    setOpened(false);
    fire(EditDialogEventTypes.CLOSE_HELP_DESK);
  };
  return React.createElement(
    EditDialogHelpDocCloseHandle,
    { opened, onClick: onCloseHelpDesk },
    React.createElement(ArrowLeft, null)
  );
};
const OpenHandle = () => {
  const { fire } = useEditDialogEventBus();
  const [opened, setOpened] = useHelpDeskOpened();
  reactExports.useEffect(() => {
    fire(EditDialogEventTypes.ASK_HELP_DESK_OPENED, (opened2) => setOpened(opened2));
  }, [fire, setOpened]);
  const onOpenHelpDesk = () => {
    setOpened(true);
    fire(EditDialogEventTypes.OPEN_HELP_DESK);
  };
  return React.createElement(
    EditDialogHelpDocOpenHandle,
    { opened, onClick: onOpenHelpDesk },
    React.createElement(ArrowRight, null)
  );
};
const DialogHelpDesk = (props) => {
  const { helpDoc } = props;
  const [state, setState] = reactExports.useState({});
  const { on, off } = usePlaygroundEventBus();
  reactExports.useEffect(() => {
    const onInitHelpDocWidth = (width) => {
      setState((state2) => ({ ...state2, docWidth: width }));
    };
    on(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, onInitHelpDocWidth);
    return () => {
      off(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, onInitHelpDocWidth);
    };
  }, [on, off]);
  return React.createElement(
    EditDialogHelpDocContainer,
    null,
    React.createElement(
      EditDialogPartContent,
      null,
      React.createElement(
        EditDialogPartHeader,
        null,
        React.createElement(EditDialogPartTitle, null, Labels.HelpDesk),
        React.createElement(CloseHandle, null)
      ),
      React.createElement(
        EditDialogPartBody,
        null,
        React.createElement(OpenHandle, null),
        React.createElement(
          HelpDocContainer,
          { width: state.docWidth },
          React.createElement(HelpDoc, { content: helpDoc })
        )
      )
    )
  );
};
const useElementVisible = (element, model) => {
  const { visibleOn, visible } = element;
  const { on, off } = useEditDialogEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    if (visibleOn == null || visibleOn.length === 0) {
      return;
    }
    const onElementValueChanged = (anchor) => {
      if (visibleOn.includes(anchor)) {
        forceUpdate();
      }
    };
    on(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
    return () => {
      off(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
    };
  }, [on, off, forceUpdate, visibleOn]);
  return visible == null || visible(model);
};
const useElementValueChange = (element) => {
  const { anchor } = element;
  const { on, off } = useEditDialogEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onElementValueChanged = (anchorOfChanged) => {
      if (anchor === anchorOfChanged) {
        forceUpdate();
      }
    };
    on(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
    return () => {
      off(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
    };
  }, [on, off, forceUpdate, anchor]);
};
const DialogNavigatorElementWrapper = (props) => {
  const { element, model, level } = props;
  const { label, badge } = element;
  const { fire } = useEditDialogEventBus();
  useElementValueChange(element);
  const onClicked = () => {
    fire(EditDialogEventTypes.LOCATE_ELEMENT, element.anchor);
  };
  return React.createElement(
    NavigatorElementContainer,
    { level, onClick: onClicked },
    React.createElement(NavigatorElementLabel, { level }, label),
    badge != null ? React.createElement(NavigatorElementBadge, null, badge(model)) : null
  );
};
const DialogNavigatorElement = (props) => {
  const { element, model, level, last } = props;
  const visible = useElementVisible(element, model);
  if (!visible) {
    return null;
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(DialogNavigatorElementWrapper, { ...props }),
    element.children != null ? React.createElement(NavigatorElementChildren, null, element.children.map((child, index, children) => {
      return React.createElement(DialogNavigatorElement, { element: child, model, level: level + 1, last: [...last, index === children.length - 1], key: child.code });
    })) : null
  );
};
const DialogNavigatorElements = (props) => {
  const { elements: elements2, model } = props;
  return React.createElement(NavigatorElementsContainer, null, elements2.map((element, index, elements3) => {
    return React.createElement(DialogNavigatorElement, { element, model, level: 0, last: [index === elements3.length - 1], key: element.code });
  }));
};
const DialogNavigator = (props) => {
  return React.createElement(
    EditDialogNavigatorContainer,
    null,
    React.createElement(
      EditDialogPartContent,
      null,
      React.createElement(
        EditDialogPartHeader,
        null,
        React.createElement(EditDialogPartTitle, null, Labels.Navigator)
      ),
      React.createElement(
        EditDialogPartBody,
        null,
        React.createElement(DialogNavigatorElements, { ...props })
      )
    )
  );
};
const useElementValueChangeBy = (element) => {
  const { changeBy } = element;
  const { on, off } = useEditDialogEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    if (changeBy == null || changeBy.length === 0) {
      return;
    }
    const onElementValueChanged = (anchorOfChanged) => {
      if (changeBy.includes(anchorOfChanged)) {
        forceUpdate();
      }
    };
    on(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
    return () => {
      off(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
    };
  }, [on, off, forceUpdate, changeBy]);
};
const DialogSpecificElementWrapper = (props) => {
  const { element, model } = props;
  const { anchor, label, editor: Editor2, helpDoc, group } = element;
  const ref = reactExports.useRef(null);
  const { on, off, fire } = useEditDialogEventBus();
  const [showHelp, setShowHelp] = reactExports.useState(false);
  useElementValueChangeBy(element);
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onLocateElement = (anchorToLocate) => {
      if (anchor !== anchorToLocate) {
        return;
      }
      if (ref.current != null) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      }
    };
    on(EditDialogEventTypes.LOCATE_ELEMENT, onLocateElement);
    return () => {
      off(EditDialogEventTypes.LOCATE_ELEMENT, onLocateElement);
    };
  }, [on, off, anchor]);
  const onHelpBadgeClicked = () => setShowHelp(!showHelp);
  const onValueChanged = () => {
    forceUpdate();
    fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, anchor);
  };
  const hasHelpDoc = VUtils.isNotBlank(helpDoc);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      SpecificElementLabel,
      { "data-group": group, ref },
      React.createElement("span", null, label),
      hasHelpDoc ? React.createElement(
        SpecificElementHelpBadge,
        { "data-visible": true, onClick: onHelpBadgeClicked },
        React.createElement(ElementHelp, null)
      ) : null
    ),
    Editor2 != null ? React.createElement(Editor2, { model, onValueChanged }) : React.createElement(SpecificElementEditorPlaceholder, null),
    hasHelpDoc ? React.createElement(
      SpecificElementHelpDoc,
      { "data-visible": showHelp },
      React.createElement(HelpDoc, { content: helpDoc })
    ) : React.createElement(SpecificElementHelpDoc, null)
  );
};
const DialogSpecificElement = (props) => {
  const { element, model } = props;
  const visible = useElementVisible(element, model);
  if (!visible) {
    return null;
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(DialogSpecificElementWrapper, { ...props }),
    element.children != null ? element.children.map((child) => {
      return React.createElement(DialogSpecificElement, { element: child, model, key: child.code });
    }) : null
  );
};
const DialogSpecificElements = (props) => {
  const { elements: elements2, model } = props;
  return React.createElement(SpecificElementsContainer, null, elements2.map((element) => {
    return React.createElement(DialogSpecificElement, { element, model, key: element.code });
  }));
};
const DialogSpecific = (props) => {
  return React.createElement(
    EditDialogSpecificDetailsContainer,
    null,
    React.createElement(
      EditDialogPartContent,
      null,
      React.createElement(
        EditDialogPartHeader,
        null,
        React.createElement(EditDialogPartTitle, null, Labels.Specific)
      ),
      React.createElement(
        EditDialogPartBody,
        null,
        React.createElement(DialogSpecificElements, { ...props })
      )
    )
  );
};
const LayoutController = () => {
  const { fire } = useEditDialogEventBus();
  const [opened, setOpened] = useHelpDeskOpened();
  reactExports.useEffect(() => {
    fire(EditDialogEventTypes.ASK_HELP_DESK_OPENED, (opened2) => setOpened(opened2));
  }, [fire, setOpened]);
  return React.createElement(EditDialogLayoutControllerHandle, { opened });
};
const DialogContentInitializer = () => {
  const ref = reactExports.useRef(null);
  const { fire } = usePlaygroundEventBus();
  reactExports.useEffect(() => {
    if (ref.current == null) {
      return;
    }
    const container = ref.current.previousElementSibling;
    const { width } = container.getBoundingClientRect();
    fire(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, width);
  }, [fire]);
  return React.createElement(EditDialogContentInitializer, { ref });
};
const DialogContent = (props) => {
  const { helpDoc, elements: elements2, prepare, confirm } = props;
  const { fire } = usePlaygroundEventBus();
  const [state] = reactExports.useState({ model: prepare() });
  const onBackClicked = () => {
    confirm(state.model);
    fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
  };
  return React.createElement(
    EditDialogEventBusProvider,
    null,
    React.createElement(StateHolder, null),
    React.createElement(LayoutController, null),
    React.createElement(
      EditDialogContentContainer,
      null,
      React.createElement(
        EditorDialogCloser,
        { onClick: onBackClicked },
        React.createElement(Back, null),
        Labels.BackToCanvas
      ),
      React.createElement(DialogHelpDesk, { helpDoc }),
      React.createElement(DialogSpecific, { elements: elements2, model: state.model }),
      React.createElement(DialogNavigator, { elements: elements2, model: state.model })
    ),
    React.createElement(DialogContentInitializer, null)
  );
};
const EditDialog = () => {
  const { on, off } = usePlaygroundEventBus();
  const [state, setState] = reactExports.useState({ visible: false });
  const [functions] = reactExports.useState({
    show: (content) => {
      if (state.visible) {
        return;
      }
      const padding = window.innerWidth - document.body.clientWidth;
      if (padding > 0) {
        document.body.style.paddingRight = `${padding}px`;
      }
      document.body.style.overflowY = "hidden";
      setState({ visible: true, content });
    },
    hide: () => {
      document.body.style.paddingRight = "";
      document.body.style.overflowY = "";
      setState(({ content }) => ({ visible: false, content }));
    }
  });
  reactExports.useEffect(() => {
    on(PlaygroundEventTypes.SHOW_EDIT_DIALOG, functions.show);
    on(PlaygroundEventTypes.HIDE_EDIT_DIALOG, functions.hide);
    return () => {
      off(PlaygroundEventTypes.SHOW_EDIT_DIALOG, functions.show);
      off(PlaygroundEventTypes.HIDE_EDIT_DIALOG, functions.hide);
    };
  }, [on, off, functions.show, functions.hide]);
  const onTransitionEnd = () => {
    if (!state.visible) {
      setState({ visible: false });
    }
  };
  return React.createElement(
    EditDialogContainer,
    { visible: state.visible, onTransitionEnd },
    React.createElement(EditDialogWrapper, null, state.content)
  );
};
const markdown$c = "If using data from the request body, the data portion of the body must be in valid JSON format.\n\n> `GET` requests by default do not parse the request body, while other requests (methods) default to parsing the request body.\n";
const markdown$b = "Used for locating configurations within the application, required fields, and must be globally unique.";
const markdown$a = "Specify whether the current configuration is effective.\n\n> Note that configurations that are not effective will not be loaded when the application starts, so the effective status cannot be switched\n> at runtime.";
const markdown$9 = "Indicate whether the returned response is a file.\n";
const markdown$8 = "Specify the response headers to be outputted to the client, including names and values.\n\nThe syntax rules are as follows:\n\n- Use a colon to connect the name and value, for example `x-name: value`. Note that only the content before the first colon is considered\n  the name, and the remaining part is the value,\n- If multiple are needed, they should be written on multiple lines,\n- The spaces around the name and value will be automatically removed.\n";
const markdown$7 = "To specify receiving multiple request headers, use commas or semicolons as separators.\n";
const markdown$6 = "Only executed when the application starts, during which the system does not provide any parameters to the pipeline.\n";
const markdown$5 = "`GET` requests by default do not parse the request body, while other requests (methods) default to parsing the request body.\n";
const markdown$4 = "Parse parameters from the [route](https://docs.nestjs.com/controllers#route-parameters). For example, can parse the `name`\nand `age` parameters from `https://example.com/:name/:age`.\n\n> The parameter names are automatically synchronized here when modifying the `route` value.\n\n> Although parameters are defined in the `route`, it is still possible to ignore them here, but this is not the recommended approach. \n";
const markdown$3 = "## Overview\n\nThe core concept of `@rainbow-o23` is pipeline, where all logic is defined through pipeline and its steps. There are three different forms\nof\npipeline based on how it is defined:\n\n- Pipeline, which can optionally be exposed as an API. To differentiate, we generally refer to pipelines that are exposed as\n  APIs as `Pipeline as API`, and pipelines that are not exposed as APIs as `pipeline`. In all documents, we will use\n  this name to refer to it. If not specifically labeled as `as API`, it means that this pipeline has not been exposed as an API.\n- Step set, composed of a group of steps,\n- Step: based on the definition of a single step.\n\nIf defined as a pipeline and is exposed as an API, it does not allow other pipeline steps to call it, otherwise it does. Therefore, if\ncertain logic combinations can be reused, they should be defined as a pipeline/steps set/step.\n\n## Common attributes\n\nAll definitions should have the following attributes:\n\n- A `code` attribute for identification within the system, so the value of the `code` attribute is globally unique.\n- A `type` attribute is used to indicate the type of this definition, and the value of the `type` attribute must be one\n  of `pipeline`, `step-sets`, or `step`.\n- An `enabled` attribute is used to indicate whether this definition is effective, and the value of the `enabled` attribute must be\n  either `true` or `false`. If not defined, this definition is considered to be effective by default.\n\n## Pipeline as API\n\nIf the definition contains a `route` attribute and specifies a URI, it is considered to be published as an API. A pipeline published\nas an API includes all standard HTTP protocol elements:\n\n- `route`, URI of API. Excluding the scheme, domain name, and port in the URL, the application configuration can also specify the path\n  context,\n	- To facilitate the definition and parsing of data contained in the `route`, you can use `pathParams` for definition. `pathParams` can\n	  be a list of parameters, or you can use `true` to define receiving all valid path parameters. Please note that the definition of path\n	  parameters must conform to the [nestjs](https://docs.nestjs.com/controllers#route-parameters) standard.\n- `method`, supporting `get`, `post`, `put`, `patch`, and `delete`,\n- `headers`, a list of headers that need to be parsed, or `true` to parse all headers,\n- `queryParams`, a list of query parameters that need to be parsed, or `true` to parse all query parameters,\n- `body`, the content of the HTTP body is in JSON format. To better adapt to common practices of HTTP API usage:\n	- When `method` is specified as `get` and the `body` parameter is not explicitly set to `true`, the system defaults to ignoring the HTTP\n	  body content,\n	- When `method` is not specified as `get` and the `body` parameter is not explicitly set to `false`, the system defaults to parsing the\n	  HTTP body content,\n- `files`, a list of files that need to be parsed, or `true` to parse all files.\n\nThere are also some HTTP response definitions:\n\n- `exposeHeaders`, a set of headers that need to be pushed to the client,\n- `exposeFile`, indicating whether the response data is a file.\n\n## Pipeline\n\nIf the definition does not contain a `route` attribute, it is considered a pipeline. A pipeline can be called by other pipeline steps.\n\nA pipeline always includes at least one step, and its behavior is entirely determined by the steps defined within it.\n\nA pipeline also has a special property `initOnly`, which if declared as `true`, indicates that this pipeline will only be\nexecuted when the application starts, and the application will not provide any parameters during execution.\n\n## Step set\n\nStep set, as the name suggests, can define a set of steps. They can also define how their built-in steps are executed, typically in the\nfollowing ways:\n\n- Synchronous serial,\n- Asynchronous serial,\n- Synchronous parallel,\n- Conditional execution,\n- Loop execution (only for input data as an array),\n- Start a database transaction.\n\nBy combining the various types of step collections mentioned above, you can construct execution sequences suitable for different scenarios.\n\n## Step\n\nSteps can be any type of step definition, including step sets. Logically, a step set is a step which includes a set of sub steps, and\ndifferent step sets define the way their sub steps are executed. Steps are implemented by different standard step components for\ndifferent purposes. Here are some built-in standard steps:\n\n- Retrieve values from models or remove attributes,\n- Execute scripts,\n- Generate snowflake IDs,\n- Call predefined pipelines or steps,\n- Make remote HTTP API calls,\n- Read from or write to databases.\n\nAdditionally, you can also obtain the following steps support through the `@rainbow-o23` standard extension library:\n\n- Print PDF, Word, Excel, CSV,\n- Manipulate AWS S3 objects.\n\n> The latest step support can be found on [Github](https://github.com/InsureMO/rainbow-o23).\n";
const markdown$2 = "Parse parameters from the [URL Search](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams). For example, can parse the `name`\nand `age` parameters from `https://example.com/?name=Jonathan%20Smith&age=18`.\n\nTo specify receiving multiple query parameters, use commas or semicolons as separators.\n";
const markdown$1 = "The route of the API, excluding the HTTP protocol scheme, domain name, and port parts. The context of the URL path can also be\nspecified via the system environment variable `CFG_APP_CONTEXT`.\n\n> It should start with `/`.\n\n`route` syntax can be referenced from [nestjs - routing](https://docs.nestjs.com/controllers#routing)\nand [nestjs - route parameters](https://docs.nestjs.com/controllers#route-parameters), as well\nas [express](https://expressjs.com/en/guide/routing.html). Generally, there are the following rules:\n\n- Use regex for matching, but it's not recommended.\n- Define parameters with `:` prefix, for example `:name`, ensuring parameter names conform to the regex pattern `[A-Za-z0-9_]`.\n- For parsing multiple parameters, use `/`, `.`, or `-` as separators. \n";
const markdown = "- `Pipeline`: A predefined pipeline that can be invoked by other pipelines and can also be executed during application\n  initialization. If specified to execute during application initialization, it cannot be used at runtime, and the initialization is\n  parameterless.\n- `Pipelne as API`: A predefined pipeline exposed as an API, which cannot be invoked by other pipelines.\n- `Step Set`: A predefined set of steps that can be invoked by other pipelines.\n- `Step`: A predefined step that can be invoked by other pipelines.\n";
const docs = {
  pipeline: markdown$3,
  pipelineCode: markdown$b,
  pipelineEnabled: markdown$a,
  pipelineType: markdown,
  pipelineInitOnly: markdown$6,
  pipelineRoute: markdown$1,
  pipelineMethod: markdown$5,
  pipelineHeaders: markdown$7,
  pipelinePathParams: markdown$4,
  pipelineQueryParams: markdown$2,
  pipelineBody: markdown$c,
  pipelineExposeFile: markdown$9,
  pipelineExposeHeaders: markdown$8
};
const HelpDocs = {
  ...docs
};
const elementCode = {
  code: "code",
  label: "Code",
  anchor: "code",
  badge: (model) => {
    if (VUtils.isNotBlank(model.code)) {
      return model.code.trim();
    } else {
      return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.code = value;
      onValueChanged();
    };
    return React.createElement(UnwrappedInput, { onValueChange, value: model.code ?? "" });
  },
  helpDoc: HelpDocs.pipelineCode
};
const elementEnabled = {
  code: "enabled",
  label: "Enabled",
  anchor: "enabled",
  badge: (model) => model.enabled !== false ? React.createElement(ConfigurableElementBadgeChecked, null) : React.createElement(ConfigurableElementBadgeBanned, null),
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.enabled = value;
      onValueChanged();
    };
    return React.createElement(UnwrappedCheckbox, { onValueChange, value: model.enabled ?? true });
  },
  helpDoc: HelpDocs.pipelineEnabled
};
const VerticalLinesEditorContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-element-editor-vertical" })`
    display: grid;
    position: relative;
    grid-template-columns: 1fr;
    grid-row-gap: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_ROW_GAP};

    > div[data-w=d9-deco-input][data-di-prefix-text=true] {
        &[data-disabled=true] > span:first-child {
            cursor: default;
            background-color: ${CssVars.DISABLE_COLOR};
        }

        > span:first-child {
            font-size: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_INPUT_PREFIX_FONT_SIZE};
            transition: background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
        }
    }
`;
const VerticalLinesEditor = (props) => {
  return React.createElement(VerticalLinesEditorContainer, null, props.children);
};
const allOrArray = (value) => {
  if (value === true) {
    return React.createElement(ConfigurableElementBadgeAll, null);
  } else if (Array.isArray(value)) {
    const length = value.filter((header) => VUtils.isNotBlank(header)).length;
    return React.createElement(ConfigurableElementBadgeCount, { count: length });
  } else {
    return React.createElement(ConfigurableElementBadgeIgnored, null);
  }
};
const ANCHOR_TYPE = "type";
const ANCHOR_ROUTE = "route";
const ANCHOR_PATH_PARAMS = "path-params";
const visibleOnPipeline = (model) => model.type === "pipeline";
const visibleOnNotApi = (model) => visibleOnPipeline(model) && model.api !== true;
const visibleOnApi = (model) => visibleOnPipeline(model) && model.api === true;
const AllIgnoredOrArrayOptions = [
  { value: "all", label: Labels.All },
  { value: "ignored", label: Labels.Ignored },
  { value: "specified", label: Labels.Specified }
];
const AllIgnoredOrArrayEditor = (props) => {
  var _a;
  const { model, onValueChanged, name, lead } = props;
  const inputRef = reactExports.useRef(null);
  const writeToModel = (value2) => {
    const array = (value2 ?? "").split(/[,;]/).map((header) => header.trim()).filter((header) => VUtils.isNotBlank(header));
    if (array.length === 0) {
      model[name] = [];
    } else {
      model[name] = array;
    }
  };
  const onValueChange = (value2) => {
    var _a2;
    if (value2 === "all") {
      model[name] = true;
    } else if (value2 === "ignored") {
      delete model[name];
    } else {
      writeToModel((_a2 = model.temporary) == null ? void 0 : _a2[name]);
      setTimeout(() => {
        var _a3, _b;
        return (_b = (_a3 = inputRef.current) == null ? void 0 : _a3.querySelector("input")) == null ? void 0 : _b.focus();
      }, 50);
    }
    onValueChanged();
  };
  const onArrayValueChange = (value2) => {
    writeToModel(value2);
    model.temporary = { ...model.temporary ?? {}, [name]: value2 };
    onValueChanged();
  };
  const value = model[name] == null ? "ignored" : model[name] === true ? "all" : "specified";
  return React.createElement(
    VerticalLinesEditor,
    null,
    React.createElement(UnwrappedDropdown, { value, onValueChange, options: AllIgnoredOrArrayOptions, clearable: false, style: { justifySelf: "start", width: "unset", minWidth: "min(200px, 100%)" } }),
    React.createElement(UnwrappedDecorateInput, { leads: [lead], value: ((_a = model.temporary) == null ? void 0 : _a[name]) ?? "", onValueChange: onArrayValueChange, disabled: value !== "specified", ref: inputRef, "data-di-prefix-text": true })
  );
};
const elementInitOnly = {
  code: "initOnly",
  label: "Execute on Initializing",
  anchor: "initOnly",
  badge: (model) => model.initOnly !== true ? React.createElement(ConfigurableElementBadgeChecked, null) : React.createElement(ConfigurableElementBadgeBanned, null),
  visibleOn: [ANCHOR_TYPE],
  visible: visibleOnNotApi,
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.initOnly = value;
      onValueChanged();
    };
    return React.createElement(UnwrappedCheckbox, { onValueChange, value: model.initOnly ?? false });
  },
  helpDoc: HelpDocs.pipelineInitOnly
};
const ParseIgnoredOrDefaultOptions = [
  { value: "default", label: Labels.BodyFollowHttpMethod },
  { value: "ignored", label: Labels.Ignored },
  { value: "parse", label: Labels.ParseBody }
];
const elementBody = {
  code: "body",
  label: "Body",
  anchor: "body",
  badge: (model) => {
    if (model.body === true) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeIgnored, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value2) => {
      if (value2 === "default") {
        delete model.body;
      } else {
        model.body = value2 !== "ignored";
      }
      onValueChanged();
    };
    const value = model.body == null ? "default" : model.body ? "parse" : "ignored";
    return React.createElement(UnwrappedDropdown, { value, onValueChange, options: ParseIgnoredOrDefaultOptions, clearable: false, style: { justifySelf: "start", width: "unset", minWidth: "min(200px, 100%)" } });
  },
  helpDoc: HelpDocs.pipelineBody
};
const elementFiles = {
  code: "files",
  label: "Files",
  anchor: "files",
  badge: (model) => {
    if (model.files != null && model.files !== false) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeIgnored, null);
    }
  }
};
const HeadersEditor = (props) => {
  return React.createElement(AllIgnoredOrArrayEditor, { ...props, name: "headers", lead: Labels.ParameterNames });
};
const elementHeaders = {
  code: "headers",
  label: "Headers",
  anchor: "headers",
  badge: (model) => allOrArray(model.headers),
  editor: HeadersEditor,
  helpDoc: HelpDocs.pipelineHeaders
};
const elementMethod = {
  code: "method",
  label: "Method",
  anchor: "method",
  badge: (model) => {
    if (VUtils.isNotBlank(model.method)) {
      return model.method.trim().toUpperCase();
    } else {
      return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.method = value;
      onValueChanged();
    };
    const options = [
      { value: "get", label: "GET" },
      { value: "post", label: "POST" },
      { value: "put", label: "PUT" },
      { value: "delete", label: "DELETE" },
      { value: "patch", label: "PATCH" }
    ];
    return React.createElement(UnwrappedDropdown, { value: model.method ?? "", onValueChange, options, clearable: false, style: { justifySelf: "start", width: "unset", minWidth: "min(200px, 100%)" } });
  },
  helpDoc: HelpDocs.pipelineMethod
};
const PathParamsEditor = (props) => {
  var _a;
  const { model, onValueChanged } = props;
  const writeToModel = (value2) => {
    const array = (value2 ?? "").split(/[,;]/).map((header) => header.trim()).filter((header) => VUtils.isNotBlank(header));
    if (array.length === 0) {
      model.pathParams = [];
    } else {
      model.pathParams = array;
    }
  };
  const onValueChange = (value2) => {
    var _a2;
    if (value2 === "all") {
      model.pathParams = true;
    } else if (value2 === "ignored") {
      delete model.pathParams;
    } else {
      writeToModel((_a2 = model.temporary) == null ? void 0 : _a2.pathParams);
    }
    onValueChanged();
  };
  const value = model.pathParams == null ? "ignored" : model.pathParams === true ? "all" : "specified";
  return React.createElement(
    VerticalLinesEditor,
    null,
    React.createElement(UnwrappedDropdown, { value, onValueChange, options: AllIgnoredOrArrayOptions, clearable: false, style: { justifySelf: "start", width: "unset", minWidth: "min(200px, 100%)" } }),
    React.createElement(UnwrappedDecorateInput, { leads: [Labels.ParameterNames], value: ((_a = model.temporary) == null ? void 0 : _a.pathParams) ?? "", onValueChange: VUtils.noop, disabled: true, "data-di-prefix-text": true })
  );
};
const elementPathParams = {
  code: "pathParams",
  label: "Path Parameters",
  anchor: ANCHOR_PATH_PARAMS,
  badge: (model) => allOrArray(model.pathParams),
  changeBy: [ANCHOR_ROUTE],
  editor: PathParamsEditor,
  helpDoc: HelpDocs.pipelinePathParams
};
const QueryParamsEditor = (props) => {
  return React.createElement(AllIgnoredOrArrayEditor, { ...props, name: "queryParams", lead: Labels.ParameterNames });
};
const elementQueryParams = {
  code: "queryParams",
  label: "Query Parameters",
  anchor: "query-params",
  badge: (model) => allOrArray(model.queryParams),
  editor: QueryParamsEditor,
  helpDoc: HelpDocs.pipelineQueryParams
};
const elementRequest = {
  code: "request",
  label: "Request",
  anchor: "request",
  children: [
    elementMethod,
    elementHeaders,
    elementPathParams,
    elementQueryParams,
    elementBody,
    elementFiles
  ],
  visibleOn: [ANCHOR_TYPE],
  visible: visibleOnApi,
  group: true
};
const elementExposeFile = {
  code: "exposeFile",
  label: "Expose File",
  anchor: "expose-file",
  badge: (model) => {
    if (model.exposeFile === true) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeNotAvailable, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.exposeFile = value;
      onValueChanged();
    };
    return React.createElement(UnwrappedCheckbox, { onValueChange, value: model.exposeFile ?? false });
  },
  helpDoc: HelpDocs.pipelineExposeFile
};
const elementExposeHeaders = {
  code: "exposeHeaders",
  label: "Expose Headers",
  anchor: "expose-headers",
  badge: (model) => {
    const count = Object.keys(model.exposeHeaders ?? {}).length;
    if (count !== 0) {
      return React.createElement(ConfigurableElementBadgeCount, { count });
    } else {
      return React.createElement(ConfigurableElementBadgeNotAvailable, null);
    }
  },
  editor: (props) => {
    var _a, _b;
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.temporary = { ...model.temporary ?? {}, exposeHeaders: value };
      model.exposeHeaders = value.split("\n").filter((line) => VUtils.isNotBlank(line)).map((line) => [line, line.split(":", 1)[0]]).filter(([, key]) => VUtils.isNotBlank(key)).map(([line, key]) => [key, line.substring(key.length + 1)]).map(([key, value2]) => [key.trim(), (value2 ?? "").trim()]).reduce((acc, [key, value2]) => {
        acc[key] = value2;
        return acc;
      }, {});
      onValueChanged();
    };
    const rows = (((_a = model.temporary) == null ? void 0 : _a.exposeHeaders) ?? "").split("\n").length;
    return React.createElement(UnwrappedTextarea, { value: ((_b = model.temporary) == null ? void 0 : _b.exposeHeaders) ?? "", onValueChange, style: {
      height: `calc(${rows} * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`,
      maxHeight: `calc(10 * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`
    } });
  },
  helpDoc: HelpDocs.pipelineExposeHeaders
};
const elementResponse = {
  code: "response",
  label: "Response",
  anchor: "response",
  children: [elementExposeHeaders, elementExposeFile],
  visibleOn: [ANCHOR_TYPE],
  visible: visibleOnApi,
  group: true
};
const RouteEditor = (props) => {
  const { model, onValueChanged } = props;
  const { fire } = useEditDialogEventBus();
  const onValueChange = (value) => {
    model.route = value;
    const pathParamNames = model.route.split(/[/.-]/).map((name) => name.trim()).filter((name) => name.startsWith(":")).map((name) => name.substring(1));
    model.temporary = { ...model.temporary ?? {}, pathParams: pathParamNames.join(", ") };
    if (model.pathParams != null && model.pathParams !== true) {
      model.pathParams = pathParamNames;
      fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, ANCHOR_PATH_PARAMS);
    }
    onValueChanged();
  };
  return React.createElement(UnwrappedInput, { onValueChange, value: model.route ?? "" });
};
const elementRoute = {
  code: "route",
  label: "Route",
  anchor: ANCHOR_ROUTE,
  badge: (model) => {
    if (VUtils.isNotBlank(model.route)) {
      return model.route.trim();
    } else {
      return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  visibleOn: [ANCHOR_TYPE],
  visible: visibleOnApi,
  editor: RouteEditor,
  helpDoc: HelpDocs.pipelineRoute
};
const elementType = {
  code: "type",
  label: "Type",
  anchor: ANCHOR_TYPE,
  badge: (model) => {
    switch (true) {
      case (model.type === "pipeline" && model.api === true):
        return Labels.PipelineTypeApi;
      case model.type === "pipeline":
        return Labels.PipelineTypePipeline;
      case model.type === "step-sets":
        return Labels.PipelineTypeStepSet;
      case model.type === "step":
        return Labels.PipelineTypeStep;
      default:
        return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value2) => {
      if (value2 === "api") {
        model.type = "pipeline";
        model.api = true;
      } else if (value2 === "pipeline") {
        model.type = "pipeline";
        model.api = false;
      } else {
        model.type = value2;
        delete model.api;
      }
      onValueChanged();
    };
    const value = (model.api === true ? "api" : model.type) ?? "pipeline";
    const options = [
      { value: "pipeline", label: Labels.PipelineTypePipeline },
      { value: "api", label: Labels.PipelineTypeApi },
      { value: "step-sets", label: Labels.PipelineTypeStepSet },
      { value: "step", label: Labels.PipelineTypeStep }
    ];
    return React.createElement(UnwrappedDropdown, { value, onValueChange, options, clearable: false, style: { justifySelf: "start", width: "unset", minWidth: "min(200px, 100%)" } });
  },
  helpDoc: HelpDocs.pipelineType,
  children: [elementInitOnly, elementRoute, elementRequest, elementResponse]
};
class FileDefLoader {
  constructor(options) {
    __publicField(this, "_redress");
    this._redress = options == null ? void 0 : options.redress;
  }
  dashToCamel(key) {
    return key.replace(/-(.)/g, (_, group1) => group1.toUpperCase());
  }
  redressKeyCase(given) {
    if (given == null) {
      return given;
    } else if (Array.isArray(given)) {
      return given.map((item) => this.redressKeyCase(item));
    } else if (typeof given === "object") {
      return Object.keys(given).reduce((redressed, key) => {
        if (key.indexOf("-") !== -1) {
          redressed[this.dashToCamel(key)] = this.redressKeyCase(given[key]);
        } else {
          redressed[key] = this.redressKeyCase(given[key]);
        }
        return redressed;
      }, {});
    } else {
      return given;
    }
  }
  redressDef(given) {
    if (this._redress) {
      given = this._redress(given);
    }
    return this.redressKeyCase(given);
  }
  parse(content) {
    const def = this.doParse(content);
    return this.redressDef(def);
  }
}
class YamlDefLoader extends FileDefLoader {
  doParse(content) {
    try {
      return jsYaml.load(content);
    } catch (e) {
      console.group("Failed to parse yaml content to O23 definition.");
      console.error(e);
      console.log(content);
      console.groupEnd();
      throw new Error("Failed to parse yaml content to O23 definition.");
    }
  }
}
const isPipelineDef = (def) => def.type === "pipeline";
const isStepSetsDef = (def) => def.type === "step-sets";
const prepareModel = (def) => {
  var _a, _b, _c;
  const model = {
    code: def.code,
    type: def.type,
    enabled: def.enabled
  };
  if (isPipelineDef(def)) {
    const pipeline = def;
    const pipelineModel = model;
    if (VUtils.isNotBlank(pipeline.route)) {
      pipelineModel.api = true;
      pipelineModel.route = pipeline.route;
      pipelineModel.method = pipeline.method;
      pipelineModel.headers = pipeline.headers;
      pipelineModel.pathParams = pipeline.pathParams;
      pipelineModel.queryParams = pipeline.queryParams;
      pipelineModel.body = pipeline.body;
      pipelineModel.files = pipeline.files;
      pipelineModel.exposeHeaders = pipeline.exposeHeaders;
      pipelineModel.exposeFile = pipeline.exposeFile;
      pipelineModel.temporary = {
        headers: pipeline.headers === true ? void 0 : (_a = pipeline.headers) == null ? void 0 : _a.filter((header) => VUtils.isNotBlank(header)).join(", "),
        pathParams: pipeline.pathParams === true ? void 0 : (_b = pipeline.pathParams) == null ? void 0 : _b.filter((param) => VUtils.isNotBlank(param)).join(", "),
        queryParams: pipeline.queryParams === true ? void 0 : (_c = pipeline.queryParams) == null ? void 0 : _c.filter((param) => VUtils.isNotBlank(param)).join(", "),
        exposeHeaders: pipeline.exposeHeaders === null ? void 0 : Object.keys(pipeline.exposeHeaders).map((key) => key.trim()).filter((key) => VUtils.isNotEmpty(key)).sort((a, b) => a.localeCompare(b, void 0, { sensitivity: "base" })).map((key) => `${key}: ${pipeline.exposeHeaders[key] ?? ""}`).join("\n") + "\n"
      };
    } else {
      pipelineModel.api = false;
    }
  } else {
    const step = def;
    model.use = step.use;
  }
  return model;
};
const elements = [elementCode, elementEnabled, elementType];
const ApiVariablePortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-api-variable-port" })`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: start;
    color: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_BORDER};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_FONT_SIZE};
    text-transform: capitalize;
    padding: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_PADDING};
    margin-left: -1px;
    grid-column: 1;
    white-space: nowrap;

    &[data-defined=false] {
        border: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_UNDEFINED_BORDER};
        background: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_UNDEFINED_BACKGROUND};
    }

    &[data-required=true][data-defined=false] {
        border: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_LACKING_BORDER};
        background: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_LACKING_BACKGROUND};
    }

    > svg:first-child {
        height: 1em;
        width: 1em;
        margin-right: 6px;
    }

    > span[data-role=count],
    > span[data-role=all] {
        display: flex;
        position: relative;
        align-items: center;
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.6);
        font-size: 0.6em;
        font-variant: petite-caps;
        padding: 0 8px;
        background: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_BADGE_BACKGROUND};
        margin-left: 6px;
        border: ${PlaygroundCssVars.NODE_API_VARIABLE_PORT_BADGE_BORDER};
        border-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.3);
    }
`;
const ApiVariablePortWidget = (props) => {
  const { label, required, defined, count, all, allAsBoolean = false, allAsGiven } = props;
  let icon;
  let badge = null;
  if (defined) {
    icon = React.createElement(PortChecked, null);
    if (count != null) {
      badge = React.createElement("span", { "data-role": "count" }, count);
    } else if (all != null) {
      if (allAsBoolean) {
        if (all === true) {
          badge = React.createElement("span", { "data-role": "all" }, Labels.YesChar);
        } else {
          badge = React.createElement("span", { "data-role": "all" }, Labels.NoChar);
        }
      } else if (allAsGiven != null) {
        badge = React.createElement("span", { "data-role": "all" }, allAsGiven);
      } else if (all === true) {
        badge = React.createElement("span", { "data-role": "all" }, Labels.All);
      }
    }
  } else if (required) {
    icon = React.createElement(PortIncorrect, null);
  } else {
    icon = React.createElement(PortUndefined, null);
  }
  return React.createElement(
    ApiVariablePortContainer,
    { "data-required": required, "data-defined": defined },
    icon,
    React.createElement("span", null, label),
    badge
  );
};
const StartNodeContainer = qe(NodeWrapper).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--border": PlaygroundCssVars.NODE_START_BORDER,
    "--background-color": PlaygroundCssVars.NODE_BACKGROUND
  }
})``;
const StartNodeHeader = qe(NodeHeader).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node-header",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--background": PlaygroundCssVars.NODE_START_TITLE_BACKGROUND,
    "--padding": PlaygroundCssVars.NODE_TITLE_PADDING
  }
})``;
const StartNodeTitle = qe(NodeTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node-title",
  style: {
    "--color": PlaygroundCssVars.NODE_START_TITLE_COLOR,
    "--font-size": PlaygroundCssVars.NODE_START_TITLE_FONT_SIZE,
    "--font-weight": PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT
  }
})``;
const StartNodeSecondTitle = qe(NodeSecondTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node-second-title",
  style: {
    "--color": PlaygroundCssVars.NODE_START_TITLE_COLOR,
    "--font-size": PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_SIZE,
    "--font-weight": PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_WEIGHT
  }
})`
    text-transform: capitalize;

    &[data-role=route] {
        text-transform: unset;
    }

    &:before, &:after {
        display: inline-block;
        position: relative;
        margin-top: 3px;
    }

    &:before {
        content: '〔';
        margin-right: 2px;
    }

    &:after {
        content: '〕';
        margin-left: 2px;
    }
`;
const StartNodeBody = qe(NodeBody).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node-body",
  style: {
    "--min-height": PlaygroundCssVars.NODE_START_BODY_HEIGHT,
    "--padding": PlaygroundCssVars.NODE_START_BODY_PADDING
  }
})``;
const ApiMethodPortWidget = (props) => {
  const { def } = props;
  const { method } = def;
  const all = VUtils.isNotBlank(method);
  return React.createElement(ApiVariablePortWidget, { label: "Method", required: true, defined: all === true, all, allAsBoolean: false, allAsGiven: `${method ?? ""}`.toUpperCase().trim() });
};
const ApiHeadersPortWidget = (props) => {
  const { def } = props;
  const { headers } = def;
  let count = void 0;
  let all = void 0;
  if (headers === true) {
    all = true;
  } else if (Array.isArray(headers)) {
    const length = headers.filter((header) => VUtils.isNotBlank(header)).length;
    if (length !== 0) {
      count = length;
    }
  }
  return React.createElement(ApiVariablePortWidget, { label: "Headers", required: false, defined: count != null || all != null, count, all });
};
const ApiPathParamsPortWidget = (props) => {
  const { def } = props;
  const { pathParams } = def;
  let count = void 0;
  let all = void 0;
  if (pathParams === true) {
    all = true;
  } else if (Array.isArray(pathParams)) {
    const length = pathParams.filter((param) => VUtils.isNotBlank(param)).length;
    if (length !== 0) {
      count = length;
    }
  }
  return React.createElement(ApiVariablePortWidget, { label: "Path Parameters", required: false, defined: count != null || all != null, count, all });
};
const ApiQueryParamsPortWidget = (props) => {
  const { def } = props;
  const { queryParams } = def;
  let count = void 0;
  let all = void 0;
  if (queryParams === true) {
    all = true;
  } else if (Array.isArray(queryParams)) {
    const length = queryParams.filter((param) => VUtils.isNotBlank(param)).length;
    if (length !== 0) {
      count = length;
    }
  }
  return React.createElement(ApiVariablePortWidget, { label: "Query Parameters", required: false, defined: count != null || all != null, count, all });
};
const ApiBodyPortWidget = (props) => {
  const { def } = props;
  const { body } = def;
  return React.createElement(ApiVariablePortWidget, { label: "Body", required: false, defined: body != null, all: body, allAsBoolean: true });
};
const ApiFilesPortWidget = (props) => {
  const { def } = props;
  const { files } = def;
  let all = void 0;
  if (files != null && files !== false) {
    all = true;
  }
  return React.createElement(ApiVariablePortWidget, { label: "Files", required: false, defined: all != null, all, allAsBoolean: true });
};
const ApiExposeHeadersPortWidget = (props) => {
  const { def } = props;
  const { exposeHeaders } = def;
  let count = Object.keys(exposeHeaders ?? {}).length;
  if (count === 0) {
    count = void 0;
  }
  return React.createElement(ApiVariablePortWidget, { label: "Expose Headers", required: false, defined: count != null, count });
};
const ApiExposeFilePortWidget = (props) => {
  const { def } = props;
  const { exposeFile } = def;
  return React.createElement(ApiVariablePortWidget, { label: "Expose File", required: false, defined: exposeFile != null, all: exposeFile, allAsBoolean: true });
};
const StartNodeWidget = (props) => {
  const { node, engine } = props;
  const { fire } = usePlaygroundEventBus();
  const def = node.def;
  const { isApi, showRouteLack, secondTitle, secondTitleRole } = (() => {
    if (isPipelineDef(def)) {
      if (VUtils.isNotBlank(def.route)) {
        return {
          isApi: true,
          showRouteLack: false,
          secondTitle: def.route.trim(),
          secondTitleRole: "route"
        };
      } else {
        return {
          isApi: false,
          showRouteLack: false,
          secondTitle: Labels.PipelineTypePipeline,
          secondTitleRole: void 0
        };
      }
    } else {
      return {
        isApi: false,
        showRouteLack: false,
        secondTitle: isStepSetsDef(def) ? Labels.PipelineTypeStepSet : Labels.PipelineTypeStep,
        secondTitleRole: void 0
      };
    }
  })();
  const onConfirm = () => {
  };
  const prepareModel$1 = () => prepareModel(def);
  const onDoubleClicked = () => {
    fire(PlaygroundEventTypes.SHOW_EDIT_DIALOG, React.createElement(DialogContent, { helpDoc: HelpDocs.pipeline, confirm: onConfirm, prepare: prepareModel$1, elements }));
  };
  return React.createElement(
    StartNodeContainer,
    { onDoubleClick: onDoubleClicked },
    React.createElement(
      StartNodeHeader,
      null,
      React.createElement(StartNodeTitle, null, VUtils.isNotBlank(def.code) ? def.code.trim() : Labels.NoCodeDefinedInFileDef),
      React.createElement(NodeTitleSpreader, null),
      React.createElement(StartNodeSecondTitle, { "data-role": secondTitleRole }, secondTitle)
    ),
    React.createElement(
      StartNodeBody,
      null,
      isApi ? React.createElement(
        React.Fragment,
        null,
        showRouteLack ? React.createElement(ApiVariablePortWidget, { label: "Route", required: true, defined: false }) : null,
        React.createElement(ApiMethodPortWidget, { def }),
        React.createElement(ApiHeadersPortWidget, { def }),
        React.createElement(ApiPathParamsPortWidget, { def }),
        React.createElement(ApiQueryParamsPortWidget, { def }),
        React.createElement(ApiBodyPortWidget, { def }),
        React.createElement(ApiFilesPortWidget, { def }),
        React.createElement(ApiExposeHeadersPortWidget, { def }),
        React.createElement(ApiExposeFilePortWidget, { def })
      ) : null,
      React.createElement(NextStepPortWidget, { port: node.getPort(NextStepPortModel.NAME), engine })
    )
  );
};
class StartNodeFactory extends AbstractReactFactory {
  constructor() {
    super(StartNodeModel.TYPE);
  }
  generateReactWidget(event) {
    return React.createElement(StartNodeWidget, { engine: this.engine, node: event.model });
  }
  generateModel(_event) {
    throw new Error("DO NOT use StartNodeFactory#generateModel.");
  }
}
const initEngine = (engine) => {
  const portFactories = engine.getPortFactories();
  portFactories.registerFactory(new NextStepPortFactory());
  portFactories.registerFactory(new PreviousStepPortFactory());
  const nodeFactories = engine.getNodeFactories();
  nodeFactories.registerFactory(new StartNodeFactory());
  nodeFactories.registerFactory(new EndNodeFactory());
};
const EditorWrapper = qe.div.attrs({
  [DOM_KEY_WIDGET]: "o23-playground-editor",
  "data-v-scroll": "",
  "data-h-scroll": ""
})`
    display: block;
    position: relative;
    align-self: stretch;
    background-image: ${PlaygroundCssVars.EDITOR_BACKGROUND_IMAGE};
    background-size: ${PlaygroundCssVars.EDITOR_BACKGROUND_SIZE};
    background-position: ${PlaygroundCssVars.EDITOR_BACKGROUND_POSITION};
    overflow: auto;

    > div.o23-playground-editor-content {
        height: 100%;
    }
`;
const ParseError = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-viewer-error" })`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
    color: ${PlaygroundCssVars.EDITOR_ERROR_COLOR};
    font-size: 1.5em;
    font-style: italic;
    font-weight: 500;
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
const createDiagramEngine = () => {
  const engine = createEngine();
  initEngine(engine);
  return engine;
};
const parseContent = (parser, content) => {
  const def = parser.parse(content ?? "");
  if (VUtils.isBlank(def.type)) {
    def.type = "pipeline";
  }
  return def;
};
const EditorKernel = (props) => {
  const { content, parser } = props;
  const vwRef = reactExports.useRef(null);
  const [state, setState] = reactExports.useState(() => {
    const engine = createDiagramEngine();
    try {
      const def = parseContent(parser, content ?? "");
      return { engine, content, parser, def };
    } catch (e) {
      console.error(e);
      return { engine, content, parser, message: e.message };
    }
  });
  reactExports.useEffect(() => {
    if (parser === state.parser && content === state.content) {
      return;
    }
    try {
      const def = parseContent(parser, content ?? "");
      setState((state2) => ({ engine: state2.engine, content, parser, def }));
    } catch (e) {
      console.error(e);
      setState((state2) => ({ engine: state2.engine, content, parser, message: e.message }));
    }
  }, [parser, content, state.content, state.parser]);
  if (VUtils.isNotBlank(state.message)) {
    return React.createElement(
      EditorWrapper,
      null,
      React.createElement(ParseError, null, state.message)
    );
  } else if (VUtils.isBlank(state.content)) {
    return React.createElement(
      EditorWrapper,
      null,
      React.createElement(ParseError, null, Labels.NoContent)
    );
  } else if (state.def == null) {
    return React.createElement(
      EditorWrapper,
      null,
      React.createElement(ParseError, null, Labels.NoDefParsed)
    );
  }
  try {
    const startNode = new StartNodeModel(state.def);
    startNode.setPosition(100, 100);
    const endNode = new EndNodeModel();
    endNode.setPosition(500, 100);
    const link = startNode.routeTo(endNode);
    const model = new DiagramModel();
    model.addAll(startNode, endNode, link);
    state.engine.setModel(model);
    return React.createElement(
      EditorWrapper,
      { ref: vwRef },
      React.createElement(
        ErrorBoundary,
        { content },
        React.createElement(CanvasWidget, { engine: state.engine, className: "o23-playground-editor-content" })
      )
    );
  } catch (error) {
    return React.createElement(
      EditorWrapper,
      null,
      React.createElement(ParseError, null, error.message || Labels.ParseError)
    );
  }
};
const Editor = (props) => {
  return React.createElement(EditorKernel, { ...props });
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
const PlaygroundWrapper = qe.div.attrs(() => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground",
    style: {
      "--min-height": "500px",
      "--grid-columns": `1fr`,
      "--grid-rows": "1fr"
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

    &[data-visible=false] {
        display: none;
    }
`;
const PlaygroundDelegate = (props) => {
  const { $pp, $wrapped, usage, parser, ...rest } = props;
  const { $p2r, $onValueChange, $avs: { $disabled, $visible } } = $wrapped;
  const ref = reactExports.useRef(null);
  const globalHandlers = useGlobalHandlers();
  const [state, setState] = reactExports.useState(() => {
    return { parser: parser ?? new YamlDefLoader() };
  });
  reactExports.useEffect(() => {
    setState((state2) => ({ ...state2, parser: parser ?? new YamlDefLoader() }));
  }, [parser]);
  const onContentChanged = async (content2) => {
    await $onValueChange(content2, false, { global: globalHandlers });
  };
  const content = MUtils.getValue($wrapped.$model, $pp);
  return React.createElement(
    PlaygroundWrapper,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref },
    React.createElement(PlaygroundBridge, { content, onContentChanged }),
    React.createElement(Editor, { content, usage, parser: state.parser })
  );
};
const Playground = (props) => {
  return React.createElement(
    PlaygroundEventBusProvider,
    null,
    React.createElement(EditDialog, null),
    React.createElement(PlaygroundDelegate, { ...props })
  );
};
class AbstractPlaygroundTranslator extends index$1.SpecificWidgetTranslator {
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeNamesMapping() {
    const keys = ["useN3", "useN5", "useN6", "useN7", "useN8"];
    return keys.reduce((mapping, key) => {
      mapping[`${this.getSupportedType()}.${key}`] = `usage.${key}`;
      return mapping;
    }, {});
  }
}
const registerPlayground = (widgetHelper, widgetType) => {
  widgetType = VUtils.isBlank(widgetType) ? "O23Playground" : widgetType;
  registerWidget({ key: widgetType, JSX: Playground, container: false, array: false });
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
