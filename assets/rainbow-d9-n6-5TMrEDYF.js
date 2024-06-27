var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { a as color, P as jsYaml } from "./vendor-MZyh1u1d.js";
import { f as CssConstants, C as CssVars, I as IntlLabel, D as DOM_KEY_WIDGET, d as utils$2, g as UnwrappedCaption, h as UnwrappedInput, b as useGlobalHandlers, j as UnwrappedCheckbox, k as UnwrappedDropdown, l as UnwrappedTextarea, m as UnwrappedDecorateInput } from "./rainbow-d9-n2-U9NZKv1d.js";
import { R as React, r as reactExports, q as qe, P as PortWidget, a as PortModel, b as PortModelAlignment, D as DefaultLinkModel, N as NodeModel, C as CanvasWidget, c as createEngine, d as DiagramModel, A as AbstractModelFactory, e as AbstractReactFactory } from "./react-base-8-0nj6j8.js";
import { V as VUtils, r as registerWidget, g as useCreateEventBus, M as MUtils, P as PPUtils, a as useThrottler, e as useForceUpdate } from "./rainbow-d9-n1-OB1df9sy.js";
import { i as index$1 } from "./rainbow-d9-n3-KMpvIgfW.js";
import { M as Markdown } from "./react-markdown-0BybtKi9.js";
import { r as remarkGfm } from "./remark-sXR2w4su.js";
import { S as SyntaxHighlighter, p as prism } from "./react-syntax-highlighter-94ZoRJV2.js";
const EDITOR_BACKGROUND_BLOCK_SIZE = "var(--o23-playground-editor-background-block-size, 48px)";
const EDITOR_BACKGROUND_LINE_COLOR = `var(--o23-playground-editor-background-line-color, ${color(CssConstants.PRIMARY_COLOR).alpha(0.08)})`;
const NODE_START_COLOR = "#ffb56b";
const NODE_END_COLOR = "#e0b35f";
const NODE_STEP_COLOR = "#54956b";
const NEXT_STEP_PORT_COLOR = "#a3ab5b";
const PREVIOUS_STEP_PORT_COLOR = "#8454aa";
const PORT_FIRST_SUB_STEP_COLOR = "#8454aa";
const PORT_SUB_STEPS_COLOR = "#617ba0";
const PORT_LAST_SUB_STEP_JOIN_COLOR = "#00618b";
const PRE_PORT_COLOR = "#87a55f";
const POST_PORT_COLOR = "#c69dab";
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
  EDIT_DIALOG_HELP_DOC_MAX_WIDTH: "var(--o23-playground-dialog-help-doc-max-width, 600px)",
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
  NODE_BORDER_WIDTH: `var(--o23-playground-node-border-width, 2px)`,
  NODE_BORDER_RADIUS: "var(--o23-playground-node-border-radius, 8px)",
  NODE_BACKGROUND: `var(--o23-playground-node-background, ${CssVars.BACKGROUND_COLOR})`,
  NODE_TITLE_PADDING: "var(--o23-playground-node-title-padding, 0 10px)",
  NODE_TITLE_SPREADER_MIN_WIDTH: "var(--o23-playground-node-title-spreader-min-width, 40px)",
  NODE_MIN_WIDTH: "var(--o23-playground-node-min-width, 160px)",
  NODE_ICON_SIZE: "var(--o23-playground-node-icon-size, 14px)",
  NODE_PORT_HEIGHT: "var(--o23-playground-node-port-height, 24px)",
  NODE_PORT_BORDER_WIDTH: `var(--o23-playground-node-port-border-width, 1px)`,
  NODE_PORT_RADIUS: "var(--o23-playground-node-link-port-radius, 8px)",
  NODE_NEXT_STEP_PORT_BACKGROUND_COLOR: `var(--o23-playground-node-next-step-port-background-color, ${NEXT_STEP_PORT_COLOR})`,
  NODE_NEXT_STEP_PORT_BORDER: `var(--o23-playground-node-next-step-port-border, 2px solid ${color(NEXT_STEP_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PREVIOUS_STEP_PORT_BACKGROUND_COLOR: `var(--o23-playground-node-previous-step-port-background-color, ${PREVIOUS_STEP_PORT_COLOR})`,
  NODE_PREVIOUS_STEP_PORT_BORDER: `var(--o23-playground-node-previous-step-port-border, 2px solid ${color(PREVIOUS_STEP_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PORT_SUB_STEPS_BORDER: `var(--o23-playground-port-sub-step-border, 1px solid ${PORT_SUB_STEPS_COLOR})`,
  NODE_PORT_SUB_STEPS_BACKGROUND: `var(--o23-playground-port-sub-step-background, ${color(PORT_SUB_STEPS_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PORT_FIRST_SUB_STEP_BACKGROUND: `var(--o23-playground-port-first-sub-step-background, ${PORT_FIRST_SUB_STEP_COLOR})`,
  NODE_PORT_FIRST_SUB_STEP_BORDER: `var(--o23-playground-port-first-sub-step-border, 1px solid ${color(PORT_FIRST_SUB_STEP_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PORT_LAST_SUB_STEP_JOIN_BACKGROUND: `var(--o23-playground-port-last-sub-step-join-background, ${PORT_LAST_SUB_STEP_JOIN_COLOR})`,
  NODE_PORT_LAST_SUB_STEP_JOIN_BORDER: `var(--o23-playground-port-last-sub-step-join-border, 1px solid ${color(PORT_LAST_SUB_STEP_JOIN_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PRE_PORT_FONT_SIZE: "var(--o23-playground-pre-port-font-size, 14px)",
  NODE_PRE_PORT_FONT_WEIGHT: "var(--o23-playground-pre-port-font-weight, 400)",
  NODE_PRE_PORT_COLOR: `var(--o23-playground-pre-port-color, ${CssVars.INVERT_COLOR})`,
  NODE_PRE_PORT_BACKGROUND: `var(--o23-playground-pre-port-background, ${PRE_PORT_COLOR})`,
  NODE_PRE_PORT_BORDER: `var(--o23-playground-pre-port-border, 1px solid ${color(PRE_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PRE_PORT_PADDING: "var(--o23-playground-pre-port-padding, 0 12px 0 8px)",
  NODE_PRE_PORT_UNDEFINED_BACKGROUND: `var(--o23-playground-pre-port-undefined-background, ${CssConstants.WAIVE_COLOR})`,
  NODE_PRE_PORT_UNDEFINED_BORDER: `var(--o23-playground-pre-port-undefined-border, 1px solid ${color(CssConstants.WAIVE_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PRE_PORT_LACKING_BACKGROUND: `var(--o23-playground-pre-port-lacking-background, ${CssVars.DANGER_COLOR})`,
  NODE_PRE_PORT_LACKING_BORDER: `var(--o23-playground-pre-port-lacking-border, 1px solid ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PRE_PORT_DANGER_BORDER: `var(--o23-playground-pre-port-danger-border, 1px solid ${CssVars.DANGER_COLOR})`,
  NODE_PRE_PORT_DANGER_BACKGROUND: `var(--o23-playground-pre-port-danger-background, ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PRE_PORT_BADGE_BACKGROUND: `var(--o23-playground-pre-port-badge-background, ${color(PRE_PORT_COLOR).darken(0.1).opaquer(0.9)})`,
  NODE_PRE_PORT_BADGE_DANGER_BACKGROUND: `var(--o23-playground-pre-port-badge-danger-background, ${CssVars.DANGER_COLOR})`,
  NODE_PRE_PORT_BADGE_BORDER: `var(--o23-playground-pre-port-badge-background, 1px solid ${CssVars.INVERT_COLOR})`,
  NODE_POST_PORT_FONT_SIZE: "var(--o23-playground-post-port-font-size, 14px)",
  NODE_POST_PORT_FONT_WEIGHT: "var(--o23-playground-post-port-font-weight, 400)",
  NODE_POST_PORT_COLOR: `var(--o23-playground-post-port-color, ${CssVars.INVERT_COLOR})`,
  NODE_POST_PORT_BACKGROUND: `var(--o23-playground-post-port-background, ${POST_PORT_COLOR})`,
  NODE_POST_PORT_BORDER: `var(--o23-playground-post-port-border, 1px solid ${color(POST_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_POST_PORT_PADDING: "var(--o23-playground-post-port-padding, 0 8px 0 12px)",
  NODE_POST_PORT_UNDEFINED_BACKGROUND: `var(--o23-playground-post-port-undefined-background, ${CssConstants.WAIVE_COLOR})`,
  NODE_POST_PORT_UNDEFINED_BORDER: `var(--o23-playground-post-port-undefined-border, 1px solid ${color(CssConstants.WAIVE_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_POST_PORT_LACKING_BACKGROUND: `var(--o23-playground-post-port-lacking-background, ${CssVars.DANGER_COLOR})`,
  NODE_POST_PORT_LACKING_BORDER: `var(--o23-playground-post-port-lacking-border, 1px solid ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_POST_PORT_DANGER_BORDER: `var(--o23-playground-post-port-danger-border, 1px solid ${CssVars.DANGER_COLOR})`,
  NODE_POST_PORT_DANGER_BACKGROUND: `var(--o23-playground-post-port-danger-background, ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_POST_PORT_BADGE_BACKGROUND: `var(--o23-playground-post-port-badge-background, ${color(POST_PORT_COLOR).darken(0.1).opaquer(0.9)})`,
  NODE_POST_PORT_BADGE_DANGER_BACKGROUND: `var(--o23-playground-post-port-badge-danger-background, ${CssVars.DANGER_COLOR})`,
  NODE_POST_PORT_BADGE_BORDER: `var(--o23-playground-post-port-badge-background, 1px solid ${CssVars.INVERT_COLOR})`,
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
  NODE_END_BODY_PADDING: "var(--o23-playground-node-end-body-padding, 8px 0)",
  NODE_STEP_BORDER: `var(--o23-playground-node-step-border, 2px solid ${NODE_STEP_COLOR})`,
  NODE_STEP_TITLE_FONT_SIZE: "var(--o23-playground-node-step-title-font-size, 16px)",
  NODE_STEP_TITLE_FONT_WEIGHT: "var(--o23-playground-node-step-title-font-weight, 600)",
  NODE_STEP_TITLE_COLOR: `var(--o23-playground-node-step-title-color, ${CssVars.INVERT_COLOR})`,
  NODE_STEP_TITLE_BACKGROUND: `var(--o23-playground-node-step-title-background, linear-gradient(135deg, ${NODE_STEP_COLOR} 0%, ${color(NODE_STEP_COLOR).alpha(0.7)} 70%, ${color(NODE_STEP_COLOR).alpha(0.5)} 100%))`,
  NODE_STEP_BODY_HEIGHT: "var(--o23-playground-node-step-body-height, 32px)",
  NODE_STEP_BODY_PADDING: "var(--o23-playground-node-step-body-padding, 8px 0)"
};
const Accept = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-accept", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { opacity: "0.5", d: "M20 6L3 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { opacity: "0.5", d: "M10 11L3 11", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { opacity: "0.5", d: "M10 16H3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M14 13.5L16.1 16L20 11", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
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
  StepNodeNoname: React.createElement(IntlLabel, { keys: ["o23", "node", "step", "noname"], value: "[Noname]" }),
  HelpDesk: React.createElement(IntlLabel, { keys: ["o23", "dialog", "docs", "title"], value: "Help Desk" }),
  Navigator: React.createElement(IntlLabel, { keys: ["o23", "dialog", "navigator", "title"], value: "Configurable Elements" }),
  Specific: React.createElement(IntlLabel, { keys: ["o23", "dialog", "specific", "title"], value: "Specific Details" }),
  ConfirmContent: React.createElement(IntlLabel, { keys: ["o23", "dialog", "confirm"], value: "Confirm" }),
  DiscardContent: React.createElement(IntlLabel, { keys: ["o23", "dialog", "discard"], value: "Discard" }),
  PipelineTypeApi: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "api"], value: "Pipeline as API" }),
  PipelineTypePipeline: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "standard"], value: "Pipeline" }),
  PipelineTypeStepSet: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "step-sets"], value: "Step Set" }),
  PipelineTypeStep: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "step"], value: "Step" }),
  ApiRouteLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-route"], value: "Route" }),
  ApiRequestLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-request"], value: "Request" }),
  ApiMethodLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-method"], value: "Method" }),
  ApiHeadersLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-headers"], value: "Headers" }),
  ApiPathParametersLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-path-parameters"], value: "Path Parameters" }),
  ApiQueryParametersLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-query-parameters"], value: "Query Parameters" }),
  ApiBodyLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-body"], value: "Body" }),
  ApiFilesLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-files"], value: "Files" }),
  ApiResponseLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-response"], value: "Response" }),
  ApiExposeHeadersLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-expose-headers"], value: "Expose Headers" }),
  ApiExposeFileLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "api-expose-file"], value: "Expose File" }),
  ExecuteOnInitLabel: React.createElement(IntlLabel, { keys: ["o23", "parameter", "execute-on-init"], value: "Execute on Initializing" }),
  ParameterNames: React.createElement(IntlLabel, { keys: ["o23", "parameter", "names"], value: "Names" }),
  BodyFollowHttpMethod: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "body", "follow-http-method"], value: "Follow method default" }),
  ParseBody: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "body", "parse"], value: "Parse" }),
  AllFiles: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "files", "all"], value: "Any File" }),
  NoFile: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "files", "ignored"], value: "No File" }),
  FileMaxSize: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "files", "max-size"], value: "Max size" }),
  FileMimeType: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "files", "mime-type"], value: "Mime types" }),
  StepFromRequest: React.createElement(IntlLabel, { keys: ["o23", "step", "from-request"], value: "From Input" }),
  StepToResponse: React.createElement(IntlLabel, { keys: ["o23", "step", "to-response"], value: "To Output" }),
  StepMergeRequest: React.createElement(IntlLabel, { keys: ["o23", "step", "merge-request"], value: "Merge" }),
  SnippetStepSnippet: React.createElement(IntlLabel, { keys: ["o23", "step", "snippet", "snippet"], value: "Snippet" }),
  StepSubSteps: React.createElement(IntlLabel, { keys: ["o23", "step", "sets", "steps"], value: "Sub Steps" }),
  StepFirstSubStep: React.createElement(IntlLabel, { keys: ["o23", "step", "first-sub-step"], value: "In" }),
  JoinEndNodeTitle: React.createElement(IntlLabel, { keys: ["o23", "node", "join-end"], value: "End of " }),
  StepUseSnippet: React.createElement(IntlLabel, { keys: ["o23", "step", "use", "snippet"], value: "Snippet" }),
  StepUseSets: React.createElement(IntlLabel, { keys: ["o23", "step", "use", "sets"], value: "Sets" }),
  Type: React.createElement(IntlLabel, { keys: ["o23", "variable", "type"], value: "Type" }),
  Code: React.createElement(IntlLabel, { keys: ["o23", "variable", "code"], value: "Code" }),
  Name: React.createElement(IntlLabel, { keys: ["o23", "variable", "name"], value: "Name" }),
  Enabled: React.createElement(IntlLabel, { keys: ["o23", "variable", "enabled"], value: "Enabled" }),
  All: React.createElement(IntlLabel, { keys: ["o23", "variable", "all"], value: "All" }),
  Ignored: React.createElement(IntlLabel, { keys: ["o23", "variable", "ignored"], value: "Ignored" }),
  Specified: React.createElement(IntlLabel, { keys: ["o23", "variable", "specified"], value: "Specified" }),
  NotAvailable: React.createElement(IntlLabel, { keys: ["o23", "variable", "not-available"], value: "N/A" }),
  YesChar: React.createElement(IntlLabel, { keys: ["o23", "variable", "yes-char"], value: "Y" }),
  NoChar: React.createElement(IntlLabel, { keys: ["o23", "variable", "no-char"], value: "N" }),
  BadgeChecked: React.createElement(IntlLabel, { keys: ["o23", "variable", "checked"], value: React.createElement(ElementChecked, null) }),
  BadgeMissed: React.createElement(IntlLabel, { keys: ["o23", "variable", "missed"], value: React.createElement(ElementMissed, null) }),
  BadgeBanned: React.createElement(IntlLabel, { keys: ["o23", "variable", "banned"], value: React.createElement(ElementBanned, null) }),
  NoCodeDefinedInFileDef: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "code", "undefined"], value: "No code defined" })
};
var StandardPipelineStepRegisterKey;
(function(StandardPipelineStepRegisterKey2) {
  StandardPipelineStepRegisterKey2["SNIPPET"] = "snippet";
  StandardPipelineStepRegisterKey2["SNOWFLAKE"] = "snowflake";
  StandardPipelineStepRegisterKey2["GET_PROPERTY"] = "get-property";
  StandardPipelineStepRegisterKey2["DEL_PROPERTY"] = "del-property";
  StandardPipelineStepRegisterKey2["DELETE_PROPERTIES"] = "del-properties";
  StandardPipelineStepRegisterKey2["SETS"] = "sets";
  StandardPipelineStepRegisterKey2["ASYNC_SETS"] = "async-sets";
  StandardPipelineStepRegisterKey2["EACH_SETS"] = "each";
  StandardPipelineStepRegisterKey2["PARALLEL_SETS"] = "parallel";
  StandardPipelineStepRegisterKey2["CONDITIONAL_SETS"] = "conditional";
  StandardPipelineStepRegisterKey2["ROUTES_SETS"] = "routes";
  StandardPipelineStepRegisterKey2["TYPEORM_BY_SNIPPET"] = "typeorm-snippet";
  StandardPipelineStepRegisterKey2["TYPEORM_LOAD_ENTITY_BY_ID"] = "typeorm-load-entity";
  StandardPipelineStepRegisterKey2["TYPEORM_SAVE_ENTITY"] = "typeorm-save-entity";
  StandardPipelineStepRegisterKey2["TYPEORM_LOAD_ONE_BY_SQL"] = "typeorm-load-one";
  StandardPipelineStepRegisterKey2["TYPEORM_LOAD_MANY_BY_SQL"] = "typeorm-load-many";
  StandardPipelineStepRegisterKey2["TYPEORM_SAVE_BY_SQL"] = "typeorm-save";
  StandardPipelineStepRegisterKey2["TYPEORM_BULK_SAVE_BY_SQL"] = "typeorm-bulk-save";
  StandardPipelineStepRegisterKey2["TYPEORM_TRANSACTIONAL"] = "typeorm-transactional";
  StandardPipelineStepRegisterKey2["HTTP_FETCH"] = "http-fetch";
  StandardPipelineStepRegisterKey2["HTTP_POST"] = "http-post";
  StandardPipelineStepRegisterKey2["HTTP_GET"] = "http-get";
  StandardPipelineStepRegisterKey2["REF_PIPELINE"] = "ref-pipeline";
  StandardPipelineStepRegisterKey2["REF_STEP"] = "ref-step";
})(StandardPipelineStepRegisterKey || (StandardPipelineStepRegisterKey = {}));
class FileDefDeserializer {
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
class YamlDefLoader extends FileDefDeserializer {
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
class FileDefSerializer {
  constructor(options) {
    __publicField(this, "_redress");
    this._redress = options == null ? void 0 : options.redress;
  }
  camelToDash(key) {
    return key.replace(/([A-Z])/g, ($1) => "-" + $1.toLowerCase());
  }
  redressKeyCase(given) {
    if (given == null) {
      return given;
    } else if (Array.isArray(given)) {
      return given.map((item) => this.redressKeyCase(item));
    } else if (typeof given === "object") {
      return Object.keys(given).reduce((redressed, key) => {
        if (key.indexOf("-") !== -1) {
          redressed[this.camelToDash(key)] = this.redressKeyCase(given[key]);
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
  stringify(def) {
    const redressed = this.redressDef(def);
    return this.doStringify(redressed);
  }
}
class YamlDefSaver extends FileDefSerializer {
  doStringify(def) {
    try {
      return jsYaml.dump(def);
    } catch (e) {
      console.group("Failed to dump O23 definition to yaml content.");
      console.error(e);
      console.log(def);
      console.groupEnd();
      throw new Error("Failed to dump O23 definition to yaml content.");
    }
  }
}
const isPipelineDef = (def) => def.type === "pipeline";
const isStepSetsDef = (def) => def.type === "step-sets";
const confirm$3 = (model, def, handlers) => {
  const edited = model;
  def.code = edited.code;
  def.type = edited.type;
  def.enabled = edited.enabled;
  const deleteApiAttrs = (given) => {
    const def2 = given;
    delete def2.route;
    delete def2.method;
    delete def2.headers;
    delete def2.pathParams;
    delete def2.queryParams;
    delete def2.body;
    delete def2.files;
    delete def2.exposeHeaders;
    delete def2.exposeFile;
  };
  const deleteNonApiAttrs = (given) => {
    const def2 = given;
    delete def2.initOnly;
  };
  const deleteNonPipelineAttrs = (given) => {
    const def2 = given;
    delete def2.use;
  };
  if (isPipelineDef(def)) {
    const editedDef = edited;
    if (editedDef.api === true) {
      def.route = editedDef.route;
      def.method = editedDef.method;
      def.headers = editedDef.headers;
      def.pathParams = editedDef.pathParams;
      def.queryParams = editedDef.queryParams;
      def.body = editedDef.body;
      def.files = editedDef.files;
      def.exposeHeaders = editedDef.exposeHeaders;
      def.exposeFile = editedDef.exposeFile;
      deleteNonApiAttrs(def);
    } else {
      def.initOnly = editedDef.initOnly === true;
      deleteApiAttrs(def);
    }
    deleteNonPipelineAttrs(def);
  } else {
    def.use = edited.use;
    deleteApiAttrs(def);
    deleteNonApiAttrs(def);
  }
  handlers.onChange();
  return true;
};
const discard$1 = (_model) => VUtils.noop();
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
        grid-template-columns: min(${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_MAX_WIDTH}, calc((100% - ${PlaygroundCssVars.EDIT_DIALOG_NAVIGATOR_WIDTH}) / 2 - ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_COLLAPSED_WIDTH})) ${PlaygroundCssVars.EDIT_DIALOG_NAVIGATOR_WIDTH} 1fr;

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
`;
const EditorDialogCloseButton = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-close-button" })`
    display: flex;
    position: relative;
    align-items: center;
    color: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_ICON_COLOR};
    font-size: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_FONT_SIZE};
    font-weight: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_FONT_WEIGHT};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_PADDING};
    cursor: pointer;
    transition: transform ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-role=confirm]:hover,
    &[data-role=discard]:hover {
        transform: scale(1.05);
        transform-origin: center;
    }

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

    > div[data-w=o23-playground-edit-dialog-part-content] {
        width: 100%;
    }
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

    &[data-opened=false] + div[data-w=o23-playground-edit-dialog-help-doc-content] {
        filter: blur(2px);
        opacity: 0.7;
    }

    &[data-opened=true] + div[data-w=o23-playground-edit-dialog-help-doc-content] {
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
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-help-doc-content",
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
const NavigatorElementChildren = qe.span.attrs(({ level }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-navigator-sub-elements",
    "data-level": level,
    style: {
      "--level": level
    }
  };
})`
    display: flex;
    position: relative;
    flex-direction: column;

    > span[data-w=o23-playground-edit-dialog-navigator-sub-elements]:nth-last-child(2) {
        > span[data-w=o23-playground-edit-dialog-navigator-sub-elements-tree-line] {
            display: none;
        }
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
const NavigatorElementChildrenTreeLine = qe.span.attrs(({ offset }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-navigator-sub-elements-tree-line",
    style: {
      "--offset": utils$2.toCssSize(offset)
    }
  };
})`
    display: block;
    position: absolute;
    width: 1px;
    height: calc(100% + 1px - var(--offset));
    top: 0;
    left: calc((max((var(--level) - 1), 0) * 2 + 0.5) * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT});
    background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
    z-index: 1;
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
  }
  const { className, node, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");
  if (match) {
    return React.createElement(SyntaxHighlighter, { ...rest, PreTag: "div", children: String(children).replace(/\n$/, ""), language: match[1], wrapLongLines: true, style: prism });
  } else {
    return React.createElement("code", { ...rest, className }, children);
  }
};
const components = { h1: "h2", a: LinkRenderer, code: CodeRenderer };
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
const DialogNavigatorElementChildrenTreeLine = () => {
  const ref = reactExports.useRef(null);
  const [offset, setOffset] = reactExports.useState(0);
  reactExports.useEffect(() => {
    var _a;
    if (ref.current == null) {
      return;
    }
    const parent = ref.current.parentElement;
    if (((_a = parent.nextElementSibling) == null ? void 0 : _a.nextElementSibling) != null) {
      if (offset !== 0) {
        setOffset(0);
      }
    } else {
      let height = 0;
      let ignored = ref.current.previousElementSibling;
      while (ignored != null) {
        if (ignored.tagName === "SPAN") {
          height += ignored.getBoundingClientRect().height;
          ignored = ignored.previousElementSibling;
          height += ignored.getBoundingClientRect().height;
          break;
        } else {
          height += ignored.getBoundingClientRect().height;
          ignored = ignored.previousElementSibling;
        }
      }
      if (offset !== height) {
        setOffset(height);
      }
    }
  });
  return React.createElement(NavigatorElementChildrenTreeLine, { offset, ref });
};
const DialogNavigatorElementChildren = (props) => {
  const { element, model, level, last } = props;
  if (element.children == null || element.children.length === 0) {
    return null;
  }
  return React.createElement(
    NavigatorElementChildren,
    { level },
    element.children.map((child, index, children) => {
      return React.createElement(DialogNavigatorElement, { element: child, model, level: level + 1, last: [...last, index === children.length - 1], key: child.code });
    }),
    React.createElement(DialogNavigatorElementChildrenTreeLine, null)
  );
};
const DialogNavigatorElement = (props) => {
  const { element, model } = props;
  const visible = useElementVisible(element, model);
  if (!visible) {
    return null;
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(DialogNavigatorElementWrapper, { ...props }),
    React.createElement(DialogNavigatorElementChildren, { ...props })
  );
};
const DialogNavigatorElements = (props) => {
  const { elements, model } = props;
  return React.createElement(NavigatorElementsContainer, null, elements.map((element, index, elements2) => {
    return React.createElement(DialogNavigatorElement, { element, model, level: 0, last: [index === elements2.length - 1], key: element.code });
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
  const { elements, model } = props;
  return React.createElement(SpecificElementsContainer, null, elements.map((element) => {
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
  const { replace } = useThrottler();
  reactExports.useEffect(() => {
    if (ref.current == null) {
      return;
    }
    const container = ref.current.previousElementSibling;
    const { width } = container.getBoundingClientRect();
    fire(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, width);
    const observer = new ResizeObserver(() => {
      replace(() => {
        fire(PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, container.getBoundingClientRect().width);
      }, 30);
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [fire, replace]);
  return React.createElement(EditDialogContentInitializer, { ref });
};
const DialogWorkArea = (props) => {
  const { helpDoc, elements, confirm: confirm2, discard: discard2, model } = props;
  const { fire } = usePlaygroundEventBus();
  const { fire: fireDialog } = useEditDialogEventBus();
  const onConfirmClicked = () => {
    const anchor = confirm2(model);
    if (anchor === true) {
      fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
    } else {
      fireDialog(EditDialogEventTypes.LOCATE_ELEMENT, anchor);
    }
  };
  const onDiscardClicked = () => {
    discard2(model);
    fire(PlaygroundEventTypes.HIDE_EDIT_DIALOG);
  };
  return React.createElement(
    EditDialogContentContainer,
    null,
    React.createElement(
      EditorDialogCloser,
      null,
      React.createElement(
        EditorDialogCloseButton,
        { "data-role": "confirm", onClick: onConfirmClicked },
        React.createElement(Accept, null),
        Labels.ConfirmContent
      ),
      React.createElement(
        EditorDialogCloseButton,
        { "data-role": "discard", onClick: onDiscardClicked },
        React.createElement(Back, null),
        Labels.DiscardContent
      )
    ),
    React.createElement(DialogHelpDesk, { helpDoc }),
    React.createElement(DialogSpecific, { elements, model }),
    React.createElement(DialogNavigator, { elements, model })
  );
};
const DialogContent = (props) => {
  const { helpDoc, elements, prepare: prepare2, confirm: confirm2, discard: discard2 } = props;
  const [state] = reactExports.useState({ model: prepare2() });
  return React.createElement(
    EditDialogEventBusProvider,
    null,
    React.createElement(StateHolder, null),
    React.createElement(LayoutController, null),
    React.createElement(DialogWorkArea, { helpDoc, elements, confirm: confirm2, discard: discard2, model: state.model }),
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
const markdown$g = "If using data from the request body, the data portion of the body must be in valid JSON format.\n\n> `GET` requests by default do not parse the request body, while other requests (methods) default to parsing the request body.\n";
const markdown$f = "Used for locating configurations within the application, required fields, and must be globally unique.";
const markdown$e = "Specify whether the current configuration is effective.\n\n> Note that configurations that are not effective will not be loaded when the application starts, so the effective status cannot be switched\n> at runtime.";
const markdown$d = "Indicate whether the returned response is a file.\n";
const markdown$c = "Specify the response headers to be outputted to the client, including names and values.\n\nThe syntax rules are as follows:\n\n- Use a colon to connect the name and value, for example `x-name: value`. Note that only the content before the first colon is considered\n  the name, and the remaining part is the value,\n- If multiple are needed, they should be written on multiple lines,\n- The spaces around the name and value will be automatically removed.\n";
const markdown$b = "To accept uploaded files, multiple attributes are required:\n\n- Specify name: Each line represents a name. For multiple names, define them on separate lines,\n- Each name can specify a max count by appending a colon followed by a number after the name,\n	- `<= 0` indicates unlimited files for that name,\n	- `>= 1` indicates a maximum count,\n- Specify maximum file size: Use plain numbers for bytes, or append `k`, `K`, `m`, `M` for kilobytes and megabytes,\n- Specify file type [mime type](https://docs.nestjs.com/techniques/file-upload#file-validation): Separate multiple types with commas or\n  semicolons.\n\n> The maximum file size and file type specifications apply to all files.\n\n> When defining upload file parameters, due to HTTP protocol specifications requiring the use of Form Data, the `body` supports only\n> key-value pairs. Therefore, the parsed data forms a single-layer JSON object and no longer retains a multi-layered structure.\n";
const markdown$a = "To specify receiving multiple request headers, use commas or semicolons as separators.\n";
const markdown$9 = "Only executed when the application starts, during which the system does not provide any parameters to the pipeline.\n";
const markdown$8 = "`GET` requests by default do not parse the request body, while other requests (methods) default to parsing the request body.\n";
const markdown$7 = "Parse parameters from the [route](https://docs.nestjs.com/controllers#route-parameters). For example, can parse the `name`\nand `age` parameters from `https://example.com/:name/:age`.\n\n> The parameter names are automatically synchronized here when modifying the `route` value.\n\n> Although parameters are defined in the `route`, it is still possible to ignore them here, but this is not the recommended approach. \n";
const markdown$6 = "## Overview\n\nThe core concept of `@rainbow-o23` is pipeline, where all logic is defined through pipeline and its steps. There are three different forms\nof\npipeline based on how it is defined:\n\n- Pipeline, which can optionally be exposed as an API. To differentiate, we generally refer to pipelines that are exposed as\n  APIs as `Pipeline as API`, and pipelines that are not exposed as APIs as `pipeline`. In all documents, we will use\n  this name to refer to it. If not specifically labeled as `as API`, it means that this pipeline has not been exposed as an API.\n- Step set, composed of a group of steps,\n- Step: based on the definition of a single step.\n\nIf defined as a pipeline and is exposed as an API, it does not allow other pipeline steps to call it, otherwise it does. Therefore, if\ncertain logic combinations can be reused, they should be defined as a pipeline/steps set/step.\n\n## Common attributes\n\nAll definitions should have the following attributes:\n\n- A `code` attribute for identification within the system, so the value of the `code` attribute is globally unique.\n- A `type` attribute is used to indicate the type of this definition, and the value of the `type` attribute must be one\n  of `pipeline`, `step-sets`, or `step`.\n- An `enabled` attribute is used to indicate whether this definition is effective, and the value of the `enabled` attribute must be\n  either `true` or `false`. If not defined, this definition is considered to be effective by default.\n\n## Pipeline as API\n\nIf the definition contains a `route` attribute and specifies a URI, it is considered to be published as an API. A pipeline published\nas an API includes all standard HTTP protocol elements:\n\n- `route`, URI of API. Excluding the scheme, domain name, and port in the URL, the application configuration can also specify the path\n  context,\n	- To facilitate the definition and parsing of data contained in the `route`, you can use `pathParams` for definition. `pathParams` can\n	  be a list of parameters, or you can use `true` to define receiving all valid path parameters. Please note that the definition of path\n	  parameters must conform to the [nestjs](https://docs.nestjs.com/controllers#route-parameters) standard.\n- `method`, supporting `get`, `post`, `put`, `patch`, and `delete`,\n- `headers`, a list of headers that need to be parsed, or `true` to parse all headers,\n- `queryParams`, a list of query parameters that need to be parsed, or `true` to parse all query parameters,\n- `body`, the content of the HTTP body is in JSON format. To better adapt to common practices of HTTP API usage:\n	- When `method` is specified as `get` and the `body` parameter is not explicitly set to `true`, the system defaults to ignoring the HTTP\n	  body content,\n	- When `method` is not specified as `get` and the `body` parameter is not explicitly set to `false`, the system defaults to parsing the\n	  HTTP body content,\n- `files`, a list of files that need to be parsed, or `true` to parse all files.\n\nThere are also some HTTP response definitions:\n\n- `exposeHeaders`, a set of headers that need to be pushed to the client,\n- `exposeFile`, indicating whether the response data is a file.\n\n## Pipeline\n\nIf the definition does not contain a `route` attribute, it is considered a pipeline. A pipeline can be called by other pipeline steps.\n\nA pipeline always includes at least one step, and its behavior is entirely determined by the steps defined within it.\n\nA pipeline also has a special property `initOnly`, which if declared as `true`, indicates that this pipeline will only be\nexecuted when the application starts, and the application will not provide any parameters during execution.\n\n## Step set\n\nStep set, as the name suggests, can define a set of steps. They can also define how their built-in steps are executed, typically in the\nfollowing ways:\n\n- Synchronous serial,\n- Asynchronous serial,\n- Synchronous parallel,\n- Conditional execution,\n- Loop execution (only for input data as an array),\n- Start a database transaction.\n\nBy combining the various types of step collections mentioned above, you can construct execution sequences suitable for different scenarios.\n\n## Step\n\nSteps can be any type of step definition, including step sets. Logically, a step set is a step which includes a set of sub steps, and\ndifferent step sets define the way their sub steps are executed. Steps are implemented by different standard step components for\ndifferent purposes. Here are some built-in standard steps:\n\n- Retrieve values from models or remove attributes,\n- Execute scripts,\n- Generate snowflake IDs,\n- Call predefined pipelines or steps,\n- Make remote HTTP API calls,\n- Read from or write to databases.\n\nAdditionally, you can also obtain the following steps support through the `@rainbow-o23` standard extension library:\n\n- Print PDF, Word, Excel, CSV,\n- Manipulate AWS S3 objects.\n\n> The latest step support can be found on [Github](https://github.com/InsureMO/rainbow-o23).\n";
const markdown$5 = "Parse parameters from the [URL Search](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams). For example, can parse the `name`\nand `age` parameters from `https://example.com/?name=Jonathan%20Smith&age=18`.\n\nTo specify receiving multiple query parameters, use commas or semicolons as separators.\n";
const markdown$4 = "The route of the API, excluding the HTTP protocol scheme, domain name, and port parts. The context of the URL path can also be\nspecified via the system environment variable `CFG_APP_CONTEXT`.\n\n> It should start with `/`.\n\n`route` syntax can be referenced from [nestjs - routing](https://docs.nestjs.com/controllers#routing)\nand [nestjs - route parameters](https://docs.nestjs.com/controllers#route-parameters), as well\nas [express](https://expressjs.com/en/guide/routing.html). Generally, there are the following rules:\n\n- Use regex for matching, but it's not recommended.\n- Define parameters with `:` prefix, for example `:name`, ensuring parameter names conform to the regex pattern `[A-Za-z0-9_]`.\n- For parsing multiple parameters, use `/`, `.`, or `-` as separators. \n";
const markdown$3 = "- `Pipeline`: A predefined pipeline that can be invoked by other pipelines and can also be executed during application\n  initialization. If specified to execute during application initialization, it cannot be used at runtime, and the initialization is\n  parameterless.\n- `Pipelne as API`: A predefined pipeline exposed as an API, which cannot be invoked by other pipelines.\n- `Step Set`: A predefined set of steps that can be invoked by other pipelines.\n- `Step`: A predefined step that can be invoked by other pipelines.\n";
const docs$2 = {
  pipeline: markdown$6,
  pipelineCode: markdown$f,
  pipelineEnabled: markdown$e,
  pipelineType: markdown$3,
  pipelineInitOnly: markdown$9,
  pipelineRoute: markdown$4,
  pipelineMethod: markdown$8,
  pipelineHeaders: markdown$a,
  pipelinePathParams: markdown$7,
  pipelineQueryParams: markdown$5,
  pipelineBody: markdown$g,
  pipelineFiles: markdown$b,
  pipelineExposeFile: markdown$d,
  pipelineExposeHeaders: markdown$c
};
const markdown$2 = "A brief name that indicates the purpose of the step.\n";
const markdown$1 = "### Input and output\n\nUsually, when processing logic, we do not need all the memory contexts, but only need to extract certain fragments for processing and return\nthe processing results to the context for subsequent logic to continue processing. Therefore, `@rainbow-o23` provides a relevant\nimplementation, allowing pipeline steps to flexibly access the relevant memory data and write back the processed result data to the context\nin the required format.\n\n#### From input\n\nUse the `From Input` property to define a script. The returned data will be used as input data for this step. The script is a function\nthat takes the following parameters:\n\n- `$factor` represents the incoming data,\n- `$request` represents the original request data (including incoming data and a context), it is not recommended,\n- `$helpers` represents function supporting, and it has a shortcut `$`.\n\nHere is a simple example:\n\n```ts\n// incoming data\nconst incoming = {name: 'John', age: 23};\n\n// Only the age is needed as a parameter in the step processing, not the name\n// Define a transformation script. So in the actual processing logic of the current step, only a number will be received.\nreturn {age: $factor.age};\n```\n\n> `return` is not necessary. If the script is only one line (and has no line breaks), the system will consider the result of executing that\n> line as the result of the entire function.\n\n> It's important to note that whether modifications to memory data during processing will affect the original input data depends on how the\n> transformation is handled. Generally, if deep cloning is not performed, it will affect the data; otherwise, it will not.\n\n#### To output\n\nUse the `To Output` property to define a script. The returned data will be used as output data for this step. The script is a function\nthat takes the following parameters:\n\n- `$result` represents the outgoing data,\n- `$request` represents the original request data (including incoming data and a context), it is not recommended,\n- `$helpers` represents function supporting, and it has a shortcut `$`.\n\nHere is a simple example:\n\n```ts\n// outgoing data\nconst outgoing = {name: 'John', age: 23};\n\n// The result data should only include age, not the name.\n// Define a transformation script. The age alone will be stored in memory for subsequent use.\nreturn {age: $result.age};\n```\n\n> `return` is not necessary. If the script is only one line (and has no line breaks), the system will consider the result of executing that\n> line as the result of the entire function.\n\n#### Merge\n\nHere is the translation of your text into English:\n\nAfter processing the step logic and obtaining the returned data, you can also define how this returned data should be merged into the\ncontext of the entire pipeline. There are several ways to define this, all declared using the `Merge` attribute:\n\n- If not defined, it means the returned data will overwrite the original context and be used as the new context.\n- Defined as `true`, it means the returned data will be automatically unpacked and merged into the original context. In this case, the\n  returned data must be a JSON object and cannot be a primitive type or an array.\n- Defined as a string, it means the returned data will be merged into the original context under the specified name.\n\nHere is a simple example:\n\n```ts\n// context data\nlet context = {name: 'John', age: 0};\nconst result = {age: 23};\n\n// merge not defined, equivalent to\ncontext = result;\n\n// merge is true, equivalent to\ncontext = {...context, ...result};\n\n// merge is 'person', equivalent to\ncontext = {...context, person: result};\n```\n\n> Note that in the latter two cases, there is a possibility of name collision resulting in the original context being overwritten.\n> Therefore, it is necessary to have a clear understanding of the data structure in the context.\n";
const docs$1 = {
  stepName: markdown$2,
  stepTransformer: markdown$1.replace(/\$/g, "$$$$")
};
const markdown = "${transformer}\n";
const docs = {
  snippetStep: markdown.replace("${transformer}\n", docs$1.stepTransformer)
};
const HelpDocs = {
  ...docs$2,
  ...docs$1,
  ...docs
};
const elementCode = {
  code: "code",
  label: Labels.Code,
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
  label: Labels.Enabled,
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
  label: Labels.ExecuteOnInitLabel,
  anchor: "initOnly",
  badge: (model) => model.initOnly === true ? React.createElement(ConfigurableElementBadgeChecked, null) : React.createElement(ConfigurableElementBadgeBanned, null),
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
  label: Labels.ApiBodyLabel,
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
const FilesOptions = [
  { value: "all", label: Labels.AllFiles },
  { value: "ignored", label: Labels.NoFile },
  { value: "specified", label: Labels.Specified }
];
const FilesEditor = (props) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const { model, onValueChanged } = props;
  const inputRef = reactExports.useRef(null);
  const { replace } = useThrottler();
  const writeToModel = () => {
    replace(() => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2;
      if (((_b2 = (_a2 = model.temporary) == null ? void 0 : _a2.files) == null ? void 0 : _b2.parse) !== true) {
        delete model.files;
        return;
      }
      if (((_d2 = (_c2 = model.temporary) == null ? void 0 : _c2.files) == null ? void 0 : _d2.list) === false) {
        model.files = true;
        return;
      }
      const specified = ((_f2 = (_e2 = model.temporary) == null ? void 0 : _e2.files) == null ? void 0 : _f2.files) ?? "";
      let files = specified.split("\n").map((line) => line.trim()).filter((line) => VUtils.isNotBlank(line)).map((line) => {
        const index = line.lastIndexOf(":");
        if (index === -1) {
          return [line.trim()];
        }
        const [name, count] = [line.substring(0, index).trim(), line.substring(index + 1).trim()];
        const tested = VUtils.isNumber(count);
        if (tested.test) {
          return [name, Math.trunc(tested.value)];
        } else {
          return [name];
        }
      });
      if (files.length === 0) {
        model.files = true;
        return;
      } else if (files.length !== 1) {
        files = files.filter(([name]) => VUtils.isNotBlank(name));
      }
      let size = VUtils.isNotBlank((_h2 = (_g2 = model.temporary) == null ? void 0 : _g2.files) == null ? void 0 : _h2.maxSize) ? model.temporary.files.maxSize.trim() : void 0;
      if (size != null && !VUtils.isNumber(size).test) {
        let unit = "";
        if (["k", "K", "m", "M"].includes(size[size.length - 1])) {
          size = size.substring(0, size.length - 1);
          unit = size[size.length - 1];
        }
        const tested = VUtils.isNumber(size);
        if (!tested.test || tested.value <= 0) {
          size = void 0;
        } else if (unit !== "") {
          size = `${size}${unit}`;
        } else {
          size = tested.value < 1 ? void 0 : Math.trunc(tested.value);
        }
      }
      const mimeType = VUtils.isNotBlank((_j2 = (_i2 = model.temporary) == null ? void 0 : _i2.files) == null ? void 0 : _j2.mimeType) ? model.temporary.files.maxSize.trim() : void 0;
      if (size != null || mimeType != null) {
        if (files.length === 1) {
          if (VUtils.isBlank(files[0][0])) {
            model.files = { maxSize: size, mimeType };
          } else if (files[0][1] <= 0 || files[0][1] == null) {
            model.files = { maxSize: size, mimeType, name: files[0][0], multiple: true };
          } else if (files[0][1] === 1) {
            model.files = { maxSize: size, mimeType, name: files[0][0], multiple: false };
          } else {
            model.files = {
              maxSize: size,
              mimeType,
              names: [{ name: files[0][0], maxCount: files[0][1] }]
            };
          }
        } else {
          model.files = {
            maxSize: size,
            mimeType,
            names: files.map(([name, count]) => {
              return count == null || count <= 0 ? name : { name, maxCount: count };
            })
          };
        }
      } else if (files.length === 1) {
        if (VUtils.isBlank(files[0][0])) {
          model.files = true;
        } else if (files[0][1] <= 0 || files[0][1] == null) {
          model.files = { name: files[0][0], multiple: true };
        } else if (files[0][1] === 1) {
          model.files = files[0][0];
        } else {
          model.files = [{ name: files[0][0], maxCount: files[0][1] }];
        }
      } else {
        model.files = files.map(([name, count]) => {
          return count == null || count <= 0 ? name : { name, maxCount: count };
        });
      }
    }, 100);
  };
  const onTypeChanged = (value) => {
    var _a2, _b2, _c2;
    switch (value) {
      case "all":
        model.temporary = {
          ...model.temporary ?? {},
          files: { ...((_a2 = model.temporary) == null ? void 0 : _a2.files) ?? {}, parse: true, list: false }
        };
        break;
      case "specified":
        model.temporary = {
          ...model.temporary ?? {},
          files: { ...((_b2 = model.temporary) == null ? void 0 : _b2.files) ?? {}, parse: true, list: true }
        };
        break;
      case "ignored":
      default:
        model.temporary = {
          ...model.temporary ?? {},
          files: { ...((_c2 = model.temporary) == null ? void 0 : _c2.files) ?? {}, parse: false, list: false }
        };
        break;
    }
    writeToModel();
    if (value === "specified") {
      setTimeout(() => {
        var _a3;
        return (_a3 = inputRef.current) == null ? void 0 : _a3.focus();
      }, 50);
    }
    onValueChanged();
  };
  const onFilesChanged = (value) => {
    var _a2;
    model.temporary = {
      ...model.temporary ?? {},
      files: { ...((_a2 = model.temporary) == null ? void 0 : _a2.files) ?? {}, files: value }
    };
    writeToModel();
    onValueChanged();
  };
  const onMaxSizeChanged = (value) => {
    var _a2;
    model.temporary = {
      ...model.temporary ?? {},
      files: { ...((_a2 = model.temporary) == null ? void 0 : _a2.files) ?? {}, maxSize: value }
    };
    writeToModel();
    onValueChanged();
  };
  const onMimeTypeChanged = (value) => {
    var _a2;
    model.temporary = {
      ...model.temporary ?? {},
      files: { ...((_a2 = model.temporary) == null ? void 0 : _a2.files) ?? {}, mimeType: value }
    };
    writeToModel();
    onValueChanged();
  };
  const type = ((_b = (_a = model.temporary) == null ? void 0 : _a.files) == null ? void 0 : _b.parse) !== true ? "ignored" : ((_d = (_c = model.temporary) == null ? void 0 : _c.files) == null ? void 0 : _d.list) !== true ? "all" : "specified";
  const rows = Math.max((((_f = (_e = model.temporary) == null ? void 0 : _e.files) == null ? void 0 : _f.files) ?? "").split("\n").length, 3);
  return React.createElement(
    VerticalLinesEditor,
    null,
    React.createElement(UnwrappedDropdown, { value: type, onValueChange: onTypeChanged, options: FilesOptions, clearable: false, style: { justifySelf: "start", width: "unset", minWidth: "min(200px, 100%)" } }),
    React.createElement(UnwrappedTextarea, { value: ((_h = (_g = model.temporary) == null ? void 0 : _g.files) == null ? void 0 : _h.files) ?? "", onValueChange: onFilesChanged, disabled: type !== "specified", ref: inputRef, style: {
      minHeight: CssVars.INPUT_HEIGHT,
      height: `calc(${rows} * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`,
      maxHeight: `calc(10 * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`
    } }),
    React.createElement(UnwrappedDecorateInput, { leads: [Labels.FileMaxSize], value: ((_i = model.temporary) == null ? void 0 : _i.files.maxSize) ?? "", onValueChange: onMaxSizeChanged, disabled: type !== "specified", "data-di-prefix-text": true }),
    React.createElement(UnwrappedDecorateInput, { leads: [Labels.FileMimeType], value: ((_j = model.temporary) == null ? void 0 : _j.files.mimeType) ?? "", onValueChange: onMimeTypeChanged, disabled: type !== "specified", "data-di-prefix-text": true })
  );
};
const elementFiles = {
  code: "files",
  label: Labels.ApiFilesLabel,
  anchor: "files",
  badge: (model) => {
    if (model.files != null && model.files !== false) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeIgnored, null);
    }
  },
  editor: FilesEditor,
  helpDoc: HelpDocs.pipelineFiles
};
const HeadersEditor = (props) => {
  return React.createElement(AllIgnoredOrArrayEditor, { ...props, name: "headers", lead: Labels.ParameterNames });
};
const elementHeaders = {
  code: "headers",
  label: Labels.ApiHeadersLabel,
  anchor: "headers",
  badge: (model) => allOrArray(model.headers),
  editor: HeadersEditor,
  helpDoc: HelpDocs.pipelineHeaders
};
const elementMethod = {
  code: "method",
  label: Labels.ApiMethodLabel,
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
  label: Labels.ApiPathParametersLabel,
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
  label: Labels.ApiQueryParametersLabel,
  anchor: "query-params",
  badge: (model) => allOrArray(model.queryParams),
  editor: QueryParamsEditor,
  helpDoc: HelpDocs.pipelineQueryParams
};
const elementRequest = {
  code: "request",
  label: Labels.ApiRequestLabel,
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
  label: Labels.ApiExposeFileLabel,
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
  label: Labels.ApiExposeHeadersLabel,
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
    const rows = Math.max((((_a = model.temporary) == null ? void 0 : _a.exposeHeaders) ?? "").split("\n").length, 3);
    return React.createElement(UnwrappedTextarea, { value: ((_b = model.temporary) == null ? void 0 : _b.exposeHeaders) ?? "", onValueChange, style: {
      minHeight: CssVars.INPUT_HEIGHT,
      height: `calc(${rows} * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`,
      maxHeight: `calc(10 * ${CssVars.LINE_HEIGHT} + ((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) * 2)`
    } });
  },
  helpDoc: HelpDocs.pipelineExposeHeaders
};
const elementResponse = {
  code: "response",
  label: Labels.ApiResponseLabel,
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
  label: Labels.ApiRouteLabel,
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
  label: Labels.Type,
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
const prepare$3 = (def) => {
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
        files: (() => {
          if (pipeline.files === true) {
            return { parse: true, list: false };
          } else if (pipeline.files === false || pipeline.files == null) {
            return { parse: false, list: false };
          } else if (typeof pipeline.files === "string") {
            return { parse: true, list: true, files: `${pipeline.files.trim()}
` };
          } else if (Array.isArray(pipeline.files)) {
            return {
              parse: true,
              list: true,
              files: pipeline.files.map((file) => {
                if (typeof file === "string") {
                  return file.trim();
                } else if (file.maxCount == null) {
                  return file.name.trim();
                } else {
                  return `${file.name.trim()}: ${file.maxCount ?? 1}`;
                }
              }).join("\n") + "\n"
            };
          } else if (pipeline.files.names == null) {
            const files = pipeline.files;
            return {
              parse: true,
              list: true,
              files: (files.multiple === true ? `${files.name.trim()}: -1` : files.name.trim()) + "\n",
              maxSize: files.maxSize == null ? void 0 : `${files.maxSize}`.trim(),
              mimeType: files.mimeType
            };
          } else {
            const files = pipeline.files;
            return {
              parse: true,
              list: true,
              files: (files.names ?? []).map((file) => {
                if (typeof file === "string") {
                  return file.trim();
                } else if (file.maxCount == null) {
                  return file.name.trim();
                } else {
                  return `${file.name.trim()}: ${file.maxCount ?? 1}`;
                }
              }).join("\n") + "\n",
              maxSize: files.maxSize == null ? void 0 : `${files.maxSize}`.trim(),
              mimeType: files.mimeType
            };
          }
        })(),
        exposeHeaders: pipeline.exposeHeaders == null ? void 0 : Object.keys(pipeline.exposeHeaders).map((key) => key.trim()).filter((key) => VUtils.isNotEmpty(key)).sort((a, b) => a.localeCompare(b, void 0, { sensitivity: "base" })).map((key) => `${key}: ${pipeline.exposeHeaders[key] ?? ""}`).join("\n") + "\n"
      };
    } else {
      pipelineModel.api = false;
      pipelineModel.initOnly = pipeline.initOnly;
    }
  } else {
    const step = def;
    model.use = step.use;
  }
  return model;
};
const FileDefs = {
  prepare: prepare$3,
  confirm: confirm$3,
  discard: discard$1,
  elements: [elementCode, elementEnabled, elementType]
};
var MergeRequestType;
(function(MergeRequestType2) {
  MergeRequestType2[MergeRequestType2["REPLACE"] = 0] = "REPLACE";
  MergeRequestType2[MergeRequestType2["UNBOX"] = 1] = "UNBOX";
  MergeRequestType2[MergeRequestType2["MERGE_AS_PROPERTY"] = 2] = "MERGE_AS_PROPERTY";
})(MergeRequestType || (MergeRequestType = {}));
var ErrorHandleType;
(function(ErrorHandleType2) {
  ErrorHandleType2[ErrorHandleType2["NONE"] = 0] = "NONE";
  ErrorHandleType2[ErrorHandleType2["SNIPPET"] = 1] = "SNIPPET";
  ErrorHandleType2[ErrorHandleType2["STEPS"] = 2] = "STEPS";
})(ErrorHandleType || (ErrorHandleType = {}));
const confirm$2 = (model, def, _file, handlers) => {
  var _a, _b, _c, _d, _e, _f, _g;
  def.name = model.name;
  def.use = model.use;
  if ((_a = model.temporary) == null ? void 0 : _a.fromRequestAsIs) {
    delete def.fromRequest;
  } else {
    def.fromRequest = model.fromRequest;
  }
  if ((_b = model.temporary) == null ? void 0 : _b.toResponseAsIs) {
    delete def.toResponse;
  } else {
    def.toResponse = model.toResponse;
  }
  switch ((_c = model.temporary) == null ? void 0 : _c.mergeRequestType) {
    case MergeRequestType.MERGE_AS_PROPERTY:
      def.mergeRequest = model.mergeRequest;
      break;
    case MergeRequestType.UNBOX:
      def.mergeRequest = true;
      break;
    case MergeRequestType.REPLACE:
    default:
      delete def.mergeRequest;
      break;
  }
  const confirmErrorHandling = (name, use) => {
    var _a2;
    def.errorHandles = def.errorHandles ?? {};
    if (use === ErrorHandleType.STEPS) {
      def.errorHandles[name] = model.temporary[name];
    } else if (use === ErrorHandleType.SNIPPET) {
      def.errorHandles[name] = (_a2 = model.errorHandles) == null ? void 0 : _a2[name];
    } else {
      delete def.errorHandles[name];
    }
  };
  confirmErrorHandling("catchable", (_d = model.temporary) == null ? void 0 : _d.useErrorHandlesForCatchable);
  confirmErrorHandling("uncatchable", (_e = model.temporary) == null ? void 0 : _e.useErrorHandlesForUncatchable);
  confirmErrorHandling("exposed", (_f = model.temporary) == null ? void 0 : _f.useErrorHandlesForExposed);
  confirmErrorHandling("any", (_g = model.temporary) == null ? void 0 : _g.useErrorHandlesForAny);
  handlers.onChange();
  return true;
};
const createSubNodes$1 = (_model, _options) => {
  return void 0;
};
const discard = (_model) => VUtils.noop();
const elementName = {
  code: "name",
  label: Labels.Name,
  anchor: "name",
  badge: (model) => {
    if (VUtils.isNotBlank(model.name)) {
      return model.name.trim();
    } else {
      return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.name = value;
      onValueChanged();
    };
    return React.createElement(UnwrappedInput, { onValueChange, value: model.name ?? "" });
  },
  helpDoc: HelpDocs.stepName
};
const findSubPorts$1 = (_model) => {
  return void 0;
};
const _NextStepPortModel = class _NextStepPortModel extends PortModel {
  constructor() {
    super({
      type: _NextStepPortModel.TYPE,
      name: _NextStepPortModel.NAME,
      alignment: PortModelAlignment.BOTTOM
    });
  }
  createLinkModel() {
    return this.createOutgoingLinkModel();
  }
  createOutgoingLinkModel() {
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
    throw new Error("DO NOT use NextStepPortFactory#generateModel.");
  }
}
const NextStepPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-next-step-port" })`
    display: flex;
    position: absolute;
    left: calc(50% - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    bottom: calc(-1 * ${PlaygroundCssVars.NODE_PORT_RADIUS});
    width: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    height: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    background-color: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_BACKGROUND_COLOR};
    border: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_BORDER};
    border-bottom-left-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    border-bottom-right-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};

    > div:first-child {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
    }
`;
const NextStepPortWidget = (props) => {
  const { port, engine, ...rest } = props;
  return React.createElement(
    NextStepPortContainer,
    { ...rest },
    React.createElement(PortWidget, { port, engine })
  );
};
const _PreviousStepPortModel = class _PreviousStepPortModel extends PortModel {
  constructor() {
    super({
      type: _PreviousStepPortModel.TYPE,
      name: _PreviousStepPortModel.NAME,
      alignment: PortModelAlignment.TOP
    });
  }
  createLinkModel() {
    return this.createIncomingLinkModel();
  }
  createIncomingLinkModel() {
    const link = new DefaultLinkModel();
    link.setTargetPort(this);
    return link;
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
    throw new Error("DO NOT use PreviousStepPortFactory#generateModel.");
  }
}
const PreviousStepPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-previous-step-port" })`
    display: flex;
    position: absolute;
    left: calc(50% - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_RADIUS});
    width: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    height: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    background-color: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_BACKGROUND_COLOR};
    border: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_BORDER};
    border-top-left-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    border-top-right-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};

    > div:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
    }
`;
const PreviousStepPortWidget = (props) => {
  const { port, engine } = props;
  return React.createElement(
    PreviousStepPortContainer,
    null,
    React.createElement(PortWidget, { port, engine })
  );
};
const computePortIconAndBadge = (props) => {
  const { required, defined, count, all, allAsBoolean = false, allAsGiven } = props;
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
  return { icon, badge };
};
const PrePortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-pre-port" })`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: start;
    color: ${PlaygroundCssVars.NODE_PRE_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_PRE_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_PRE_PORT_BORDER};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_PRE_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_PRE_PORT_FONT_SIZE};
    text-transform: capitalize;
    padding: ${PlaygroundCssVars.NODE_PRE_PORT_PADDING};
    margin-left: -1px;
    grid-column: 1;
    white-space: nowrap;

    &[data-defined=false] {
        border: ${PlaygroundCssVars.NODE_PRE_PORT_UNDEFINED_BORDER};
        background: ${PlaygroundCssVars.NODE_PRE_PORT_UNDEFINED_BACKGROUND};
    }

    &[data-required=true][data-defined=false] {
        border: ${PlaygroundCssVars.NODE_PRE_PORT_LACKING_BORDER};
        background: ${PlaygroundCssVars.NODE_PRE_PORT_LACKING_BACKGROUND};
    }

    &[data-danger=true] {
        border: ${PlaygroundCssVars.NODE_PRE_PORT_DANGER_BORDER};
        background: ${PlaygroundCssVars.NODE_PRE_PORT_DANGER_BACKGROUND};

        > span[data-role=count],
        > span[data-role=all] {
            background: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_DANGER_BACKGROUND};
        }
    }

    &[data-role=first-sub-step] {
        border: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BORDER};
        background: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BACKGROUND};
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
        background: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_BACKGROUND};
        margin-left: 6px;
        border: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_BORDER};
        border-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.3);
    }
`;
const PrePort = (props) => {
  const { label, required, defined, danger = false, children, ...rest } = props;
  const { icon, badge } = computePortIconAndBadge(props);
  return React.createElement(
    PrePortContainer,
    { "data-required": required, "data-defined": defined, "data-danger": danger, ...rest },
    icon,
    React.createElement("span", null, label),
    badge,
    children
  );
};
const PostPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-post-port" })`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: end;
    color: ${PlaygroundCssVars.NODE_POST_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_POST_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_POST_PORT_BORDER};
    border-top-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_POST_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_POST_PORT_FONT_SIZE};
    text-transform: capitalize;
    padding: ${PlaygroundCssVars.NODE_POST_PORT_PADDING};
    margin-right: -1px;
    grid-column: 3;
    white-space: nowrap;

    &[data-defined=false] {
        border: ${PlaygroundCssVars.NODE_POST_PORT_UNDEFINED_BORDER};
        background: ${PlaygroundCssVars.NODE_POST_PORT_UNDEFINED_BACKGROUND};
    }

    &[data-required=true][data-defined=false] {
        border: ${PlaygroundCssVars.NODE_POST_PORT_LACKING_BORDER};
        background: ${PlaygroundCssVars.NODE_POST_PORT_LACKING_BACKGROUND};
    }

    &[data-danger=true] {
        border: ${PlaygroundCssVars.NODE_POST_PORT_DANGER_BORDER};
        background: ${PlaygroundCssVars.NODE_POST_PORT_DANGER_BACKGROUND};

        > span[data-role=count],
        > span[data-role=all] {
            background: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_DANGER_BACKGROUND};
        }
    }

    &[data-role=sub-steps] {
        border: ${PlaygroundCssVars.NODE_PORT_SUB_STEPS_BORDER};
        background: ${PlaygroundCssVars.NODE_PORT_SUB_STEPS_BACKGROUND};
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
        background: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_BACKGROUND};
        margin-left: 6px;
        border: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_BORDER};
        border-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.3);
    }
`;
const PostPort = (props) => {
  const { label, required, defined, danger = false, children, ...rest } = props;
  const { icon, badge } = computePortIconAndBadge(props);
  return React.createElement(
    PostPortContainer,
    { "data-required": required, "data-defined": defined, "data-danger": danger, ...rest },
    icon,
    React.createElement("span", null, label),
    badge,
    children
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
class HandledNodeModel extends NodeModel {
  constructor(options, handlers) {
    super(options);
    __publicField(this, "handlers");
    __publicField(this, "_positionAppointed", false);
    this.handlers = handlers;
  }
  isPositionAppointed() {
    return this._positionAppointed;
  }
  setPositionAppointed(value) {
    this._positionAppointed = value;
  }
  previous(node) {
    const port = this.getPort(PreviousStepPortModel.NAME);
    const link = port.createIncomingLinkModel();
    link.setSourcePort(node.getPort(NextStepPortModel.NAME));
    return link;
  }
  next(node) {
    const port = this.getPort(NextStepPortModel.NAME);
    const link = port.createOutgoingLinkModel();
    link.setTargetPort(node.getPort(PreviousStepPortModel.NAME));
    return link;
  }
}
const _EndNodeModel = class _EndNodeModel extends HandledNodeModel {
  constructor(def, handlers) {
    super({ type: _EndNodeModel.TYPE }, handlers);
    __publicField(this, "def");
    this.def = def;
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
})`
    display: none;
`;
const EndNodeWidget = (props) => {
  const { node, engine } = props;
  return React.createElement(
    EndNodeContainer,
    null,
    React.createElement(PreviousStepPortWidget, { port: node.getPort(PreviousStepPortModel.NAME), engine }),
    React.createElement(
      EndNodeHeader,
      null,
      React.createElement(EndNodeTitle, null, Labels.EndNodeTitle)
    ),
    React.createElement(EndNodeBody, null)
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
const _JoinEndNodeModel = class _JoinEndNodeModel extends HandledNodeModel {
  constructor(step, file, rest) {
    super({ type: _JoinEndNodeModel.TYPE }, rest.handlers);
    __publicField(this, "step");
    __publicField(this, "file");
    __publicField(this, "rest");
    this.step = step;
    this.file = file;
    this.rest = rest;
    this.addPort(new PreviousStepPortModel());
    this.addPort(new LastSubStepJoinPortModel());
    this.addPort(new NextStepPortModel());
  }
  getEntityType() {
    return this.rest.type;
  }
  getSubOf() {
    return this.rest.subOf;
  }
  endOf(node) {
    const port = this.getPort(LastSubStepJoinPortModel.NAME);
    const link = port.createIncomingLinkModel();
    link.setSourcePort(node.getPort(NextStepPortModel.NAME));
    return link;
  }
};
__publicField(_JoinEndNodeModel, "TYPE", "join-end-node");
let JoinEndNodeModel = _JoinEndNodeModel;
var StepNodeEntityType;
(function(StepNodeEntityType2) {
  StepNodeEntityType2["START"] = "start";
  StepNodeEntityType2["NORMAL"] = "normal";
  StepNodeEntityType2["JOIN_END"] = "join-end";
})(StepNodeEntityType || (StepNodeEntityType = {}));
const _StepNodeModel = class _StepNodeModel extends HandledNodeModel {
  constructor(step, file, rest) {
    super({ type: _StepNodeModel.TYPE }, rest.handlers);
    __publicField(this, "step");
    __publicField(this, "file");
    __publicField(this, "rest");
    __publicField(this, "firstSubStep", false);
    this.step = step;
    this.file = file;
    this.rest = rest;
    this.addPort(new PreviousStepPortModel());
    this.addPort(new NextStepPortModel());
  }
  getEntityType() {
    return this.rest.type;
  }
  getSubOf() {
    return this.rest.subOf;
  }
  asFirstSubStep(is) {
    this.firstSubStep = is;
  }
  isFirstSubStep() {
    return this.firstSubStep;
  }
};
__publicField(_StepNodeModel, "TYPE", "step-node");
let StepNodeModel = _StepNodeModel;
const StepNodeContainer = qe(NodeWrapper).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-step-node",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--border": PlaygroundCssVars.NODE_STEP_BORDER,
    "--background-color": PlaygroundCssVars.NODE_BACKGROUND
  }
})``;
const StepNodeHeader = qe(NodeHeader).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-step-node-header",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--background": PlaygroundCssVars.NODE_STEP_TITLE_BACKGROUND,
    "--padding": PlaygroundCssVars.NODE_TITLE_PADDING
  }
})``;
const StepNodeTitle = qe(NodeTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-step-node-title",
  style: {
    "--color": PlaygroundCssVars.NODE_STEP_TITLE_COLOR,
    "--font-size": PlaygroundCssVars.NODE_STEP_TITLE_FONT_SIZE,
    "--font-weight": PlaygroundCssVars.NODE_STEP_TITLE_FONT_WEIGHT
  }
})``;
const StepNodeSecondTitle = qe(NodeSecondTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-step-node-second-title",
  style: {
    "--color": PlaygroundCssVars.NODE_START_TITLE_COLOR,
    "--font-size": PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_SIZE,
    "--font-weight": PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_WEIGHT
  }
})`
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
const StepNodeBody = qe(NodeBody).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-step-node-body",
  style: {
    "--min-height": PlaygroundCssVars.NODE_STEP_BODY_HEIGHT,
    "--padding": PlaygroundCssVars.NODE_STEP_BODY_PADDING
  }
})``;
const StepNodeWidget = (props) => {
  const { node, engine } = props;
  const { fire } = usePlaygroundEventBus();
  const forceUpdate = useForceUpdate();
  const { step: def, file } = node;
  const { use } = def;
  const StepDefs = AllStepDefs.find((defs) => defs.use === use);
  const onConfirm = (model) => {
    const ret = StepDefs.confirm(model, def, file, node.handlers);
    if (ret === true) {
      forceUpdate();
    }
    return ret;
  };
  const onDiscard = (model) => StepDefs.discard(model);
  const prepareModel = () => StepDefs.prepare(def);
  const onDoubleClicked = () => {
    fire(PlaygroundEventTypes.SHOW_EDIT_DIALOG, React.createElement(DialogContent, { helpDoc: StepDefs.helpDocs, prepare: prepareModel, confirm: onConfirm, discard: onDiscard, elements: StepDefs.properties }));
  };
  const isFirstSubStep = node.isFirstSubStep();
  const asUseLabelKey = () => {
    return "StepUse" + (use ?? "").trim().split("-").reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1), "");
  };
  return React.createElement(
    StepNodeContainer,
    { onDoubleClick: onDoubleClicked },
    isFirstSubStep ? React.createElement(FirstSubStepPortWidget, { port: node.getPort(FirstSubStepPortModel.NAME), engine }) : React.createElement(PreviousStepPortWidget, { port: node.getPort(PreviousStepPortModel.NAME), engine }),
    React.createElement(
      StepNodeHeader,
      null,
      React.createElement(StepNodeTitle, null, (def.name ?? "").trim() || Labels.StepNodeNoname),
      React.createElement(NodeTitleSpreader, null),
      React.createElement(StepNodeSecondTitle, null, Labels[asUseLabelKey()])
    ),
    React.createElement(StepNodeBody, null, StepDefs.ports.map(({ key, port: StepPort }) => {
      return React.createElement(StepPort, { step: def, file, node, engine, key });
    })),
    React.createElement(NextStepPortWidget, { port: node.getPort(NextStepPortModel.NAME), engine })
  );
};
class StepNodeFactory extends AbstractReactFactory {
  constructor() {
    super(StepNodeModel.TYPE);
  }
  generateReactWidget(event) {
    return React.createElement(StepNodeWidget, { engine: this.engine, node: event.model });
  }
  generateModel(_event) {
    throw new Error("DO NOT use StepNodeFactory#generateModel.");
  }
}
const JoinEndNodeContainer = qe(NodeWrapper).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-join-end-node",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--border": PlaygroundCssVars.NODE_END_BORDER,
    "--background-color": PlaygroundCssVars.NODE_BACKGROUND
  }
})``;
const JoinEndNodeHeader = qe(NodeHeader).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-join-end-node-header",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--background": PlaygroundCssVars.NODE_END_TITLE_BACKGROUND,
    "--padding": PlaygroundCssVars.NODE_TITLE_PADDING
  }
})``;
const JoinEndNodeTitle = qe(NodeTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-join-end-node-title",
  style: {
    "--color": PlaygroundCssVars.NODE_END_TITLE_COLOR,
    "--font-size": PlaygroundCssVars.NODE_END_TITLE_FONT_SIZE,
    "--font-weight": PlaygroundCssVars.NODE_END_TITLE_FONT_WEIGHT
  }
})``;
const JoinEndNodeWidget = (props) => {
  const { node, engine } = props;
  const { step: def } = node;
  return React.createElement(
    JoinEndNodeContainer,
    null,
    React.createElement(PreviousStepPortWidget, { port: node.getPort(PreviousStepPortModel.NAME), engine }),
    React.createElement(LastSubStepJoinPortWidget, { port: node.getPort(LastSubStepJoinPortModel.NAME), engine }),
    React.createElement(
      JoinEndNodeHeader,
      null,
      React.createElement(JoinEndNodeTitle, null, Labels.JoinEndNodeTitle),
      React.createElement(StepNodeSecondTitle, null, (def.name ?? "").trim() || Labels.StepNodeNoname)
    ),
    React.createElement(NextStepPortWidget, { port: node.getPort(NextStepPortModel.NAME), engine })
  );
};
class JoinEndNodeFactory extends AbstractReactFactory {
  constructor() {
    super(JoinEndNodeModel.TYPE);
  }
  generateReactWidget(event) {
    return React.createElement(JoinEndNodeWidget, { engine: this.engine, node: event.model });
  }
  generateModel(_event) {
    throw new Error("DO NOT use JoinEndNodeFactory#generateModel.");
  }
}
const _StartNodeModel = class _StartNodeModel extends HandledNodeModel {
  constructor(def, handlers) {
    super({ type: _StartNodeModel.TYPE }, handlers);
    __publicField(this, "def");
    this.def = def;
    this.addPort(new NextStepPortModel());
  }
};
__publicField(_StartNodeModel, "TYPE", "start-node");
let StartNodeModel = _StartNodeModel;
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
const EnabledPortWidget = (props) => {
  const { def } = props;
  const { enabled } = def;
  if (enabled !== false) {
    return null;
  }
  return React.createElement(PrePort, { label: Labels.Enabled, required: true, defined: true, all: false, allAsBoolean: true, danger: true });
};
const ApiMethodPortWidget = (props) => {
  const { def } = props;
  const { method } = def;
  const exists = VUtils.isNotBlank(method);
  return React.createElement(PrePort, { label: Labels.ApiMethodLabel, required: true, defined: exists, all: exists, allAsBoolean: false, allAsGiven: `${method ?? ""}`.toUpperCase().trim() });
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
  return React.createElement(PrePort, { label: Labels.ApiHeadersLabel, required: false, defined: count != null || all != null, count, all });
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
  return React.createElement(PrePort, { label: Labels.ApiPathParametersLabel, required: false, defined: count != null || all != null, count, all });
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
  return React.createElement(PrePort, { label: Labels.ApiQueryParametersLabel, required: false, defined: count != null || all != null, count, all });
};
const ApiBodyPortWidget = (props) => {
  const { def } = props;
  const { body } = def;
  return React.createElement(PrePort, { label: Labels.ApiBodyLabel, required: false, defined: body != null, all: body, allAsBoolean: true });
};
const ApiFilesPortWidget = (props) => {
  const { def } = props;
  const { files } = def;
  let all = void 0;
  if (files != null && files !== false) {
    all = true;
  }
  return React.createElement(PrePort, { label: Labels.ApiFilesLabel, required: false, defined: all != null, all, allAsBoolean: true });
};
const ApiExposeHeadersPortWidget = (props) => {
  const { def } = props;
  const { exposeHeaders } = def;
  let count = Object.keys(exposeHeaders ?? {}).length;
  if (count === 0) {
    count = void 0;
  }
  return React.createElement(PrePort, { label: Labels.ApiExposeHeadersLabel, required: false, defined: count != null, count });
};
const ApiExposeFilePortWidget = (props) => {
  const { def } = props;
  const { exposeFile } = def;
  return React.createElement(PrePort, { label: Labels.ApiExposeFileLabel, required: false, defined: exposeFile != null, all: exposeFile, allAsBoolean: true });
};
const InitOnlyPortWidget = (props) => {
  const { def } = props;
  const { initOnly } = def;
  if (initOnly !== true) {
    return null;
  }
  return React.createElement(PrePort, { label: Labels.ExecuteOnInitLabel, required: false, defined: true, all: true, allAsBoolean: true });
};
const StartNodeWidget = (props) => {
  const { node, engine } = props;
  const { fire } = usePlaygroundEventBus();
  const forceUpdate = useForceUpdate();
  const def = node.def;
  const { isApi, secondTitle, secondTitleRole } = (() => {
    if (isPipelineDef(def)) {
      if (VUtils.isNotBlank(def.route)) {
        return { isApi: true, secondTitle: def.route.trim(), secondTitleRole: "route" };
      } else {
        return { isApi: false, secondTitle: Labels.PipelineTypePipeline, secondTitleRole: void 0 };
      }
    } else {
      return {
        isApi: false,
        secondTitle: isStepSetsDef(def) ? Labels.PipelineTypeStepSet : Labels.PipelineTypeStep,
        secondTitleRole: void 0
      };
    }
  })();
  const onConfirm = (model) => {
    const ret = FileDefs.confirm(model, def, node.handlers);
    {
      forceUpdate();
    }
    return ret;
  };
  const onDiscard = (model) => FileDefs.discard(model);
  const prepareModel = () => FileDefs.prepare(def);
  const onDoubleClicked = () => {
    fire(PlaygroundEventTypes.SHOW_EDIT_DIALOG, React.createElement(DialogContent, { helpDoc: HelpDocs.pipeline, prepare: prepareModel, confirm: onConfirm, discard: onDiscard, elements: FileDefs.elements }));
  };
  let body = void 0;
  if (isApi) {
    body = React.createElement(
      React.Fragment,
      null,
      React.createElement(ApiMethodPortWidget, { def }),
      React.createElement(ApiHeadersPortWidget, { def }),
      React.createElement(ApiPathParamsPortWidget, { def }),
      React.createElement(ApiQueryParamsPortWidget, { def }),
      React.createElement(ApiBodyPortWidget, { def }),
      React.createElement(ApiFilesPortWidget, { def }),
      React.createElement(ApiExposeHeadersPortWidget, { def }),
      React.createElement(ApiExposeFilePortWidget, { def })
    );
  } else if (isPipelineDef(def)) {
    body = React.createElement(InitOnlyPortWidget, { def });
  }
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
      React.createElement(EnabledPortWidget, { def }),
      body
    ),
    React.createElement(NextStepPortWidget, { port: node.getPort(NextStepPortModel.NAME), engine })
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
const Factories = {
  ports: [],
  nodes: []
};
const initEngine = (engine) => {
  const portFactories = engine.getPortFactories();
  portFactories.registerFactory(new NextStepPortFactory());
  portFactories.registerFactory(new PreviousStepPortFactory());
  portFactories.registerFactory(new SubStepsPortFactory());
  Factories.ports.forEach((factory) => portFactories.registerFactory(factory));
  const nodeFactories = engine.getNodeFactories();
  nodeFactories.registerFactory(new StartNodeFactory());
  nodeFactories.registerFactory(new StepNodeFactory());
  nodeFactories.registerFactory(new EndNodeFactory());
  nodeFactories.registerFactory(new JoinEndNodeFactory());
  Factories.nodes.forEach((factory) => nodeFactories.registerFactory(factory));
};
const PortFromRequest = (props) => {
  const { step: def } = props;
  const { fromRequest } = def;
  const exists = VUtils.isNotBlank(fromRequest);
  if (!exists) {
    return null;
  }
  return React.createElement(PrePort, { label: Labels.StepFromRequest, required: false, defined: true, all: true, allAsBoolean: true });
};
const PortMergeRequest = (props) => {
  const { step: def } = props;
  const { mergeRequest } = def;
  if (mergeRequest == null) {
    return null;
  } else if (mergeRequest === false) {
    return null;
  } else if (mergeRequest === true) {
    return React.createElement(PostPort, { label: Labels.StepMergeRequest, required: false, defined: true, all: true, allAsBoolean: true });
  } else if (VUtils.isBlank(mergeRequest)) {
    return null;
  } else {
    return React.createElement(PostPort, { label: Labels.StepToResponse, required: false, defined: true, all: true, allAsBoolean: false, allAsGiven: mergeRequest.trim() });
  }
};
const PortToResponse = (props) => {
  const { step: def } = props;
  const { toResponse } = def;
  const exists = VUtils.isNotBlank(toResponse);
  if (!exists) {
    return null;
  }
  return React.createElement(PostPort, { label: Labels.StepToResponse, required: false, defined: true, all: true, allAsBoolean: true });
};
const prepare$2 = (def) => {
  const model = {
    name: def.name,
    use: def.use,
    fromRequest: def.fromRequest,
    toResponse: def.toResponse,
    temporary: {}
  };
  model.temporary.fromRequestAsIs = VUtils.isBlank(def.fromRequest);
  model.temporary.toResponseAsIs = VUtils.isBlank(def.toResponse);
  model.temporary.mergeRequestType = VUtils.isBlank(def.mergeRequest) || def.mergeRequest === false ? MergeRequestType.REPLACE : def.mergeRequest === true ? MergeRequestType.UNBOX : MergeRequestType.MERGE_AS_PROPERTY;
  if (model.temporary.mergeRequestType === MergeRequestType.MERGE_AS_PROPERTY) {
    model.mergeRequest = def.mergeRequest;
  }
  const { errorHandles: { catchable, uncatchable, exposed, any: anyError } = {} } = def;
  model.errorHandles = {};
  const copyErrorHandle = (def2, name, flagName) => {
    if (def2 == null) {
      model.temporary[flagName] = ErrorHandleType.NONE;
    } else if (Array.isArray(def2)) {
      model.temporary[flagName] = ErrorHandleType.STEPS;
      model.temporary[name] = def2;
    } else {
      model.errorHandles[name] = def2;
      model.temporary[flagName] = ErrorHandleType.SNIPPET;
    }
  };
  copyErrorHandle(catchable, "catchable", "useErrorHandlesForCatchable");
  copyErrorHandle(uncatchable, "uncatchable", "useErrorHandlesForUncatchable");
  copyErrorHandle(exposed, "exposed", "useErrorHandlesForExposed");
  copyErrorHandle(anyError, "any", "useErrorHandlesForAny");
  return model;
};
const START_X = 64;
const START_Y = 64;
const askStartNodePosition = (def) => {
  var _a, _b, _c, _d;
  const diagramDef = def;
  if (((_b = (_a = diagramDef.$diagram) == null ? void 0 : _a.$start) == null ? void 0 : _b.$x) != null && ((_d = (_c = diagramDef.$diagram) == null ? void 0 : _c.$start) == null ? void 0 : _d.$y) != null) {
    return { x: diagramDef.$diagram.$start.$x, y: diagramDef.$diagram.$start.$y, appointed: true };
  } else {
    return { x: START_X, y: START_Y, appointed: false };
  }
};
const askEndNodePosition = (def) => {
  var _a, _b, _c, _d;
  const diagramDef = def;
  if (((_b = (_a = diagramDef.$diagram) == null ? void 0 : _a.$end) == null ? void 0 : _b.$x) != null && ((_d = (_c = diagramDef.$diagram) == null ? void 0 : _c.$end) == null ? void 0 : _d.$y) != null) {
    return { x: diagramDef.$diagram.$end.$x, y: diagramDef.$diagram.$end.$y, appointed: true };
  } else {
    return { x: START_X, y: START_Y, appointed: false };
  }
};
const askStepNodePosition = (def) => {
  var _a, _b, _c, _d;
  if (isPipelineDef(def)) {
    const diagramDef = def;
    if (((_b = (_a = diagramDef.$diagram) == null ? void 0 : _a.$virtualStep) == null ? void 0 : _b.$x) != null && ((_d = (_c = diagramDef.$diagram) == null ? void 0 : _c.$virtualStep) == null ? void 0 : _d.$y) != null) {
      return { x: diagramDef.$diagram.$virtualStep.$x, y: diagramDef.$diagram.$virtualStep.$y, appointed: true };
    } else {
      return { x: START_X, y: START_Y, appointed: false };
    }
  } else {
    const diagramDef = def;
    if (diagramDef.$x != null && diagramDef.$y != null) {
      return { x: diagramDef.$x, y: diagramDef.$y, appointed: true };
    } else {
      return { x: START_X, y: START_Y, appointed: false };
    }
  }
};
class CustomDiagramModel extends DiagramModel {
  addLink(link) {
    if (this.isLocked()) {
      link.setLocked(true);
    }
    return super.addLink(link);
  }
  addNode(node) {
    if (this.isLocked()) {
      node.setLocked(true);
    }
    return super.addNode(node);
  }
}
const createLockedDiagramModel = () => {
  const model = new CustomDiagramModel();
  model.setLocked(true);
  return model;
};
const createDiagramNodes = (file, handlers) => {
  const allNodes = [];
  const allLinks = [];
  const nodeHandlers = {
    onChange: () => handlers.onContentChange(() => handlers.serialize(file))
  };
  const startNode = new StartNodeModel(file, nodeHandlers);
  setNodePosition(startNode, () => askStartNodePosition(file));
  allNodes.push(startNode);
  let previousNode = startNode;
  if (isPipelineDef(file)) {
    const steps = file.steps ?? [];
    if (steps.length === 0) {
      const step = DEFAULTS.createDefaultStep();
      steps.push(step);
      file.steps = steps;
    }
    previousNode = steps.reduce((previousNode2, step) => {
      return createStepNode(step, file, {
        type: StepNodeEntityType.NORMAL,
        handlers: nodeHandlers,
        previousNode: previousNode2,
        linkPrevious: (node) => previousNode2.next(node),
        appendNode: (...nodes) => allNodes.push(...nodes),
        appendLink: (...links) => allLinks.push(...links)
      });
    }, previousNode);
  } else {
    const step = file;
    previousNode = createStepNode(step, file, {
      type: StepNodeEntityType.START,
      handlers: nodeHandlers,
      previousNode,
      linkPrevious: (node) => previousNode.next(node),
      appendNode: (...nodes) => allNodes.push(...nodes),
      appendLink: (...links) => allLinks.push(...links)
    });
  }
  const endNode = new EndNodeModel(file, nodeHandlers);
  setNodePosition(endNode, () => askEndNodePosition(file));
  allNodes.push(endNode);
  const link = previousNode.next(endNode);
  allLinks.push(link);
  const model = createLockedDiagramModel();
  model.setLocked(true);
  model.addAll(...allNodes, ...allLinks);
  return model;
};
const cloneDiagramNodes = (old) => {
  const model = createLockedDiagramModel();
  model.setLocked(true);
  model.addAll(...old.getModels());
  return model;
};
const buildGrid = (node, grid, x, y) => {
  var _a;
  let hasSubSteps = false;
  if (node instanceof StepNodeModel) {
    const { use } = node.step;
    const ports = ((_a = AllStepDefs.find((def) => def.use === use)) == null ? void 0 : _a.findSubPorts(node)) ?? [];
    ports.forEach((port2) => {
      Object.values(port2.getLinks()).forEach((link) => {
        hasSubSteps = true;
        const subNode = link.getTargetPort().getNode();
        grid[x + 1] = grid[x + 1] ?? [];
        grid[x + 1][y + 1] = {
          node: subNode,
          x: subNode.getPosition().x,
          y: subNode.getPosition().y,
          maxWidth: -1,
          maxHeight: -1,
          top: -1,
          left: -1
        };
        y = buildGrid(subNode, grid, x + 1, y + 1);
      });
    });
  }
  const port = node.getPort(NextStepPortModel.NAME);
  if (port != null) {
    const links = port.getLinks();
    const link = Object.values(links)[0];
    const next = link.getTargetPort().getNode();
    grid[x] = grid[x] ?? [];
    if (hasSubSteps) {
      grid[x][y] = {
        node: next,
        x: next.getPosition().x,
        y: next.getPosition().y,
        maxWidth: -1,
        maxHeight: -1,
        top: -1,
        left: -1
      };
      return buildGrid(next, grid, x, y);
    } else if (next instanceof JoinEndNodeModel) {
      return y;
    } else {
      grid[x][y + 1] = {
        node: next,
        x: next.getPosition().x,
        y: next.getPosition().y,
        maxWidth: -1,
        maxHeight: -1,
        top: -1,
        left: -1
      };
      return buildGrid(next, grid, x, y + 1);
    }
  } else {
    return y;
  }
};
const computeGrid = (grid, top, left, rowGap, columnGap) => {
  let offsetX = left;
  let offsetY = top;
  const maxX = grid.length - 1;
  const maxY = grid.reduce((max, column) => Math.max(max, column.length - 1), 0);
  for (let x = 0; x <= maxX; x++) {
    const column = grid[x];
    new Array(maxY + 1).fill(1).forEach((v, y) => {
      if (column[y] == null) {
        column[y] = { x, y, maxWidth: -1, maxHeight: -1, top: -1, left: -1 };
      }
    });
    const maxWidth = column.reduce((max, cell) => {
      var _a;
      return Math.max(max, ((_a = cell.node) == null ? void 0 : _a.width) ?? 0);
    }, 0);
    offsetX = offsetX + (x === 0 ? 0 : grid[x - 1][0].maxWidth + columnGap);
    column.forEach((cell) => {
      cell.maxWidth = maxWidth;
      cell.left = cell.node == null ? offsetX + maxWidth / 2 : offsetX + (maxWidth - cell.node.width) / 2;
    });
  }
  for (let y = 0; y <= maxY; y++) {
    const row = grid.map((column) => column[y]);
    const maxHeight = row.reduce((max, cell) => {
      var _a;
      return Math.max(max, ((_a = cell.node) == null ? void 0 : _a.height) ?? 0);
    }, 0);
    offsetY = offsetY + (y === 0 ? 0 : grid[0][y - 1].maxHeight + rowGap);
    row.forEach((cell) => {
      cell.maxHeight = maxHeight;
      cell.top = cell.node == null ? offsetY + maxHeight / 2 : offsetY;
    });
  }
  grid.forEach((column) => {
    column.forEach((cell) => {
      if (cell.node != null) {
        cell.node.setPosition(cell.left, cell.top);
      }
    });
  });
};
const createDiagramHandlers = (options) => {
  const { serializer, replace, syncContentToStateRef, notifyContentChanged } = options;
  return {
    serialize: (def) => serializer.stringify(def),
    onContentChange: (serialize) => {
      replace(() => {
        const content = syncContentToStateRef(serialize());
        notifyContentChanged(content);
      }, 100);
    }
  };
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

    &[data-diagram-status=first-paint] {
        > div.o23-playground-editor-content {
            opacity: 0;
            user-select: none;
            pointer-events: none;

            div.node, div.node * {
                user-select: none;
                pointer-events: none;
                cursor: default;
            }
        }
    }

    &[data-diagram-locked=true] {
        > div.o23-playground-editor-content {
            cursor: default;

            div.node {
                cursor: pointer;
            }
        }
    }

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
var EditorKernelDiagramStatus;
(function(EditorKernelDiagramStatus2) {
  EditorKernelDiagramStatus2["IGNORED"] = "ignored";
  EditorKernelDiagramStatus2["PAINT"] = "paint";
  EditorKernelDiagramStatus2["IN_SERVICE"] = "in-service";
})(EditorKernelDiagramStatus || (EditorKernelDiagramStatus = {}));
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
  const { content, serializer, deserializer } = props;
  const wrapperRef = reactExports.useRef(null);
  const { fire } = usePlaygroundEventBus();
  const { replace } = useThrottler();
  const stateRef = reactExports.useRef((() => {
    const engine = createDiagramEngine();
    try {
      const def = parseContent(deserializer, content ?? "");
      const handlers = createDiagramHandlers({
        serializer,
        replace,
        syncContentToStateRef: (content2) => {
          stateRef.current.content = content2;
          return content2;
        },
        notifyContentChanged: (content2) => {
          fire(PlaygroundEventTypes.CONTENT_CHANGED, content2);
        }
      });
      const model = createDiagramNodes(def, handlers);
      engine.setModel(model);
      return {
        engine,
        content,
        serializer,
        deserializer,
        def,
        diagramStatus: EditorKernelDiagramStatus.PAINT
      };
    } catch (e) {
      console.error(e);
      engine.setModel(createLockedDiagramModel());
      return {
        engine,
        content,
        serializer,
        deserializer,
        message: e.message,
        diagramStatus: EditorKernelDiagramStatus.IGNORED
      };
    }
  })());
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    if (serializer === stateRef.current.serializer && deserializer === stateRef.current.deserializer && content === stateRef.current.content) {
      return;
    }
    try {
      const def = parseContent(deserializer, content ?? "");
      stateRef.current.content = content;
      stateRef.current.serializer = serializer;
      stateRef.current.deserializer = deserializer;
      stateRef.current.def = def;
      const handlers = createDiagramHandlers({
        serializer,
        replace,
        syncContentToStateRef: (content2) => {
          stateRef.current.content = content2;
          return content2;
        },
        notifyContentChanged: (content2) => {
          fire(PlaygroundEventTypes.CONTENT_CHANGED, content2);
        }
      });
      const model = createDiagramNodes(def, handlers);
      stateRef.current.engine.setModel(model);
      delete stateRef.current.message;
      stateRef.current.diagramStatus = EditorKernelDiagramStatus.PAINT;
    } catch (e) {
      console.error(e);
      stateRef.current.content = content;
      stateRef.current.serializer = serializer;
      stateRef.current.deserializer = deserializer;
      delete stateRef.current.def;
      stateRef.current.engine.setModel(createLockedDiagramModel());
      stateRef.current.message = e.message;
      stateRef.current.diagramStatus = EditorKernelDiagramStatus.IGNORED;
    }
    forceUpdate();
  }, [fire, replace, forceUpdate, serializer, deserializer, content]);
  reactExports.useEffect(() => {
    if (EditorKernelDiagramStatus.PAINT !== stateRef.current.diagramStatus) {
      return;
    }
    const grid = [];
    const nodes = stateRef.current.engine.getModel().getNodes();
    const startNode = nodes.find((node) => node instanceof StartNodeModel);
    grid[0] = grid[0] ?? [];
    grid[0][0] = {
      node: startNode,
      x: startNode.getPosition().x,
      y: startNode.getPosition().y,
      maxWidth: -1,
      maxHeight: -1,
      top: -1,
      left: -1
    };
    buildGrid(startNode, grid, 0, 0);
    computeGrid(grid, 64, 64, 64, 64);
    stateRef.current.engine.setModel(cloneDiagramNodes(stateRef.current.engine.getModel()));
    stateRef.current.diagramStatus = EditorKernelDiagramStatus.IN_SERVICE;
    forceUpdate();
  }, [forceUpdate, stateRef.current.diagramStatus]);
  if (VUtils.isNotBlank(stateRef.current.message)) {
    return React.createElement(
      EditorWrapper,
      { "data-diagram-status": EditorKernelDiagramStatus.IGNORED },
      React.createElement(ParseError, null, stateRef.current.message)
    );
  } else if (VUtils.isBlank(stateRef.current.content)) {
    return React.createElement(
      EditorWrapper,
      { "data-diagram-status": EditorKernelDiagramStatus.IGNORED },
      React.createElement(ParseError, null, Labels.NoContent)
    );
  } else if (stateRef.current.def == null) {
    return React.createElement(
      EditorWrapper,
      { "data-diagram-status": EditorKernelDiagramStatus.IGNORED },
      React.createElement(ParseError, null, Labels.NoDefParsed)
    );
  }
  try {
    return React.createElement(
      EditorWrapper,
      { "data-diagram-status": stateRef.current.diagramStatus, "data-diagram-locked": stateRef.current.engine.getModel().isLocked(), ref: wrapperRef },
      React.createElement(
        ErrorBoundary,
        { content },
        React.createElement(CanvasWidget, { engine: stateRef.current.engine, className: "o23-playground-editor-content" })
      )
    );
  } catch (error) {
    return React.createElement(
      EditorWrapper,
      { "data-diagram-status": EditorKernelDiagramStatus.IGNORED, ref: wrapperRef },
      React.createElement(ParseError, null, error.message || Labels.ParseError)
    );
  }
};
const Editor = (props) => {
  return React.createElement(EditorKernel, { ...props });
};
const setNodePosition = (node, position) => {
  const { x, y, appointed } = position();
  node.setPosition(x, y);
  node.setPositionAppointed(appointed);
};
const createStepNode = (step, file, options) => {
  const { type, subOf, handlers, linkPrevious, appendNode, appendLink } = options;
  const node = new StepNodeModel(step, file, { type, subOf, handlers });
  setNodePosition(node, () => askStepNodePosition(step));
  appendNode(node);
  const link = linkPrevious(node);
  appendLink(link);
  const endOfSub = DEFAULTS.createSubStepNodes(node, { appendNode, appendLink, handlers });
  return endOfSub == null ? node : endOfSub;
};
const _SubStepsPortModel = class _SubStepsPortModel extends PortModel {
  constructor(name) {
    super({ type: _SubStepsPortModel.TYPE, name, alignment: PortModelAlignment.RIGHT });
  }
  createLinkModel() {
    return this.createOutgoingLinkModel();
  }
  createOutgoingLinkModel() {
    const link = new DefaultLinkModel();
    link.setSourcePort(this);
    return link;
  }
};
__publicField(_SubStepsPortModel, "TYPE", "sub-steps-port");
let SubStepsPortModel = _SubStepsPortModel;
class SubStepsPortFactory extends AbstractModelFactory {
  constructor() {
    super(SubStepsPortModel.TYPE);
  }
  generateModel(_event) {
    throw new Error("DO NOT use SubStepsPortFactory#generateModel.");
  }
}
const SubStepsPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-sub-steps-port" })`
    display: flex;
    position: absolute;
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_BORDER_WIDTH});
    right: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / -2 - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
    width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    background-color: ${PlaygroundCssVars.NODE_PORT_SUB_STEPS_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_SUB_STEPS_BORDER};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);

    > div:first-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
    }
`;
const SubStepsPortWidget = (props) => {
  const { port, engine } = props;
  return React.createElement(
    SubStepsPortContainer,
    null,
    React.createElement(PortWidget, { port, engine })
  );
};
const _FirstSubStepPortModel = class _FirstSubStepPortModel extends PortModel {
  constructor() {
    super({
      type: _FirstSubStepPortModel.TYPE,
      name: _FirstSubStepPortModel.NAME,
      alignment: PortModelAlignment.RIGHT
    });
  }
  createLinkModel() {
    return this.createIncomingLinkModel();
  }
  createIncomingLinkModel() {
    const link = new DefaultLinkModel();
    link.setTargetPort(this);
    return link;
  }
};
__publicField(_FirstSubStepPortModel, "TYPE", "first-sub-step-port");
__publicField(_FirstSubStepPortModel, "NAME", "first-sub-step");
let FirstSubStepPortModel = _FirstSubStepPortModel;
const FirstSubStepPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-first-sub-step-port" })`
    display: flex;
    position: absolute;
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_RADIUS});
    left: calc(50% - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    width: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    height: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    background-color: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BORDER};
    border-top-left-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    border-top-right-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};

    > div:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
    }
`;
const FirstSubStepPortWidget = (props) => {
  const { port, engine } = props;
  return React.createElement(
    FirstSubStepPortContainer,
    null,
    React.createElement(PortWidget, { port, engine })
  );
};
const _LastSubStepJoinPortModel = class _LastSubStepJoinPortModel extends PortModel {
  constructor() {
    super({
      type: _LastSubStepJoinPortModel.TYPE,
      name: _LastSubStepJoinPortModel.NAME,
      alignment: PortModelAlignment.RIGHT
    });
  }
  createLinkModel() {
    return this.createIncomingLinkModel();
  }
  createIncomingLinkModel() {
    const link = new DefaultLinkModel();
    link.setTargetPort(this);
    return link;
  }
};
__publicField(_LastSubStepJoinPortModel, "TYPE", "last-sub-step-join-port");
__publicField(_LastSubStepJoinPortModel, "NAME", "last-sub-step-join");
let LastSubStepJoinPortModel = _LastSubStepJoinPortModel;
const LastSubStepJoinPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-last-sub-step-join-port" })`
    display: flex;
    position: absolute;
    top: calc(50% - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    right: calc(-1 * ${PlaygroundCssVars.NODE_PORT_RADIUS} - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
    width: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    height: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    background-color: ${PlaygroundCssVars.NODE_PORT_LAST_SUB_STEP_JOIN_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_LAST_SUB_STEP_JOIN_BORDER};
    border-top-right-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    border-bottom-right-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};

    > div:first-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
    }
`;
const LastSubStepJoinPortWidget = (props) => {
  const { port, engine } = props;
  return React.createElement(
    LastSubStepJoinPortContainer,
    null,
    React.createElement(PortWidget, { port, engine })
  );
};
const CommonStepDefs = {
  prepare: prepare$2,
  confirm: confirm$2,
  discard,
  properties: { name: elementName },
  ports: { fromRequest: PortFromRequest, toResponse: PortToResponse, mergeRequest: PortMergeRequest },
  createSubNodes: createSubNodes$1,
  findSubPorts: findSubPorts$1
};
const confirm$1 = (model, def, file, handlers) => {
  CommonStepDefs.confirm(model, def, file, handlers);
  handlers.onChange();
  return true;
};
const SetsSubStepsPortName = "sets-sub-steps";
const PortSubSteps = (props) => {
  const { node, engine } = props;
  return React.createElement(
    PostPort,
    { label: Labels.StepSubSteps, required: false, defined: true, "data-role": "sub-steps" },
    React.createElement(SubStepsPortWidget, { port: node.getPort(SetsSubStepsPortName), engine })
  );
};
const createSubNodes = (model, options) => {
  const { appendNode, appendLink, handlers } = options;
  const step = model.step;
  const steps = step.steps ?? [];
  if (steps.length === 0) {
    const defaultFirstStep = DEFAULTS.createDefaultStep();
    steps.push(defaultFirstStep);
    step.steps = steps;
  }
  let previousNode = model;
  previousNode = steps.reduce((previousNode2, step2) => {
    const linkPrevious = previousNode2 === model ? (node) => {
      let sourcePort = model.getPort(SetsSubStepsPortName);
      if (sourcePort == null) {
        sourcePort = new SubStepsPortModel(SetsSubStepsPortName);
        model.addPort(sourcePort);
      }
      const link2 = sourcePort.createOutgoingLinkModel();
      let targetPort = node.getPort(FirstSubStepPortModel.NAME);
      if (targetPort == null) {
        targetPort = new FirstSubStepPortModel();
        node.addPort(targetPort);
      }
      link2.setTargetPort(targetPort);
      node.asFirstSubStep(true);
      return link2;
    } : (node) => previousNode2.next(node);
    return createStepNode(step2, model.file, {
      type: StepNodeEntityType.NORMAL,
      handlers,
      subOf: step2,
      previousNode: previousNode2,
      linkPrevious,
      appendNode,
      appendLink
    });
  }, previousNode);
  const endNode = new JoinEndNodeModel(step, model.file, { type: StepNodeEntityType.JOIN_END, subOf: step, handlers });
  appendNode(endNode);
  const link = endNode.endOf(previousNode);
  appendLink(link);
  const directLink = model.next(endNode);
  appendLink(directLink);
  return endNode;
};
const findSubPorts = (model) => {
  const subStepsPort = model.getPort(SetsSubStepsPortName);
  return subStepsPort != null ? [subStepsPort, ...[]] : CommonStepDefs.findSubPorts(model);
};
const prepare$1 = (def) => {
  const model = CommonStepDefs.prepare(def);
  return model;
};
const SetsStepDefs = {
  use: StandardPipelineStepRegisterKey.SETS,
  prepare: prepare$1,
  confirm: confirm$1,
  discard: CommonStepDefs.discard,
  properties: [CommonStepDefs.properties.name],
  ports: [
    { key: "from-request", port: CommonStepDefs.ports.fromRequest },
    { key: "sub-steps", port: PortSubSteps },
    { key: "to-response", port: CommonStepDefs.ports.toResponse },
    { key: "merge-request", port: CommonStepDefs.ports.mergeRequest }
  ],
  createSubNodes,
  findSubPorts,
  helpDocs: HelpDocs.snippetStep
};
const confirm = (model, def, file, handlers) => {
  CommonStepDefs.confirm(model, def, file, handlers);
  def.snippet = model.snippet;
  handlers.onChange();
  return true;
};
const PortSnippet = (props) => {
  const { step: def } = props;
  const { snippet } = def;
  const exists = VUtils.isNotBlank(snippet);
  return React.createElement(PrePort, { label: Labels.SnippetStepSnippet, required: true, defined: exists, all: true, allAsBoolean: true });
};
const prepare = (def) => {
  const model = CommonStepDefs.prepare(def);
  model.snippet = def.snippet;
  return model;
};
const SnippetStepDefs = {
  use: StandardPipelineStepRegisterKey.SNIPPET,
  prepare,
  confirm,
  discard: CommonStepDefs.discard,
  properties: [CommonStepDefs.properties.name],
  ports: [
    { key: "from-request", port: CommonStepDefs.ports.fromRequest },
    { key: "to-response", port: CommonStepDefs.ports.toResponse },
    { key: "snippet", port: PortSnippet },
    { key: "merge-request", port: CommonStepDefs.ports.mergeRequest }
  ],
  createSubNodes: CommonStepDefs.createSubNodes,
  findSubPorts: CommonStepDefs.findSubPorts,
  helpDocs: HelpDocs.snippetStep
};
const AllStepDefs = [
  SnippetStepDefs,
  SetsStepDefs
];
const DEFAULT_CREATE_SUB_STEP_NODES = (node, options) => {
  var _a;
  return (_a = AllStepDefs.find((def) => {
    return def.use === node.step.use;
  })) == null ? void 0 : _a.createSubNodes(node, options);
};
const DEFAULTS = {
  createDefaultStep: () => {
    return {
      name: "",
      use: StandardPipelineStepRegisterKey.SNIPPET,
      fromRequest: "$factor",
      toResponse: "$result",
      mergeRequest: true
    };
  },
  createSubStepNodes: DEFAULT_CREATE_SUB_STEP_NODES
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
  const { $pp, $wrapped, usage, assistant, serializer, deserializer, ...rest } = props;
  const { $p2r, $onValueChange, $avs: { $disabled, $visible } } = $wrapped;
  const ref = reactExports.useRef(null);
  const globalHandlers = useGlobalHandlers();
  const [state, setState] = reactExports.useState(() => {
    return {
      serializer: serializer ?? new YamlDefSaver(),
      deserializer: deserializer ?? new YamlDefLoader()
    };
  });
  reactExports.useEffect(() => {
    setState((state2) => {
      return {
        ...state2,
        serializer: serializer ?? state2.serializer,
        deserializer: deserializer ?? state2.deserializer
      };
    });
  }, [serializer, deserializer]);
  const onContentChanged = async (content2) => {
    await $onValueChange(content2, false, { global: globalHandlers });
  };
  const content = MUtils.getValue($wrapped.$model, $pp);
  return React.createElement(
    PlaygroundWrapper,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref },
    React.createElement(PlaygroundBridge, { content, onContentChanged }),
    React.createElement(Editor, { content, usage, assistant, serializer: state.serializer, deserializer: state.deserializer })
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
