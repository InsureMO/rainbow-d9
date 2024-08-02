var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { a as color, y as EditorView, z as EditorState, A as basicSetup, B as keymap, C as indentWithTab, G as javascript, K as lintGutter, P as Compartment, Q as jsYaml, R as dom2image } from "./vendor-R-Spl4KT.js";
import { f as CssConstants, C as CssVars, I as IntlLabel, D as DOM_KEY_WIDGET, d as utils$2, g as UnwrappedCaption, h as UnwrappedInput, j as UnwrappedCheckbox, k as UnwrappedDropdown, O as OptionItemSort, l as UnwrappedDecorateInput, b as useGlobalHandlers, m as UnwrappedTextarea } from "./rainbow-d9-n2-uDowY2gS.js";
import { R as React, r as reactExports, q as qe, W as We, P as PortModelAlignment, a as PortWidget, D as DefaultLinkModel, b as PortModel, N as NodeModel, C as CanvasWidget, c as DiagramModel, d as createEngine, A as AbstractModelFactory, e as DefaultLinkFactory, f as AbstractReactFactory, L as LinkWidget, g as DefaultLinkPointWidget, h as DefaultLinkSegmentWidget } from "./react-base-_kUkTZyT.js";
import { V as VUtils, r as registerWidget, a as useThrottler, g as useCreateEventBus, e as useForceUpdate, M as MUtils, P as PPUtils } from "./rainbow-d9-n1-4fa2a4TQ.js";
import { i as index$1 } from "./rainbow-d9-n3-q7vik5Ee.js";
import { M as Markdown } from "./react-markdown-60uj6MoK.js";
import { r as remarkGfm } from "./remark-uKKevoCO.js";
import { S as SyntaxHighlighter, p as prism } from "./react-syntax-highlighter-LKfzZla3.js";
const EDITOR_BACKGROUND_BLOCK_SIZE = "var(--o23-playground-editor-background-block-size, 48px)";
const EDITOR_BACKGROUND_LINE_COLOR = `var(--o23-playground-editor-background-line-color, ${color(CssConstants.PRIMARY_COLOR).alpha(0.08)})`;
const EDITOR_ATTRIBUTE_BADGE_COLOR = "#9db6c6";
const NODE_START_COLOR = "#ffb56b";
const NODE_END_COLOR = "#e0b35f";
const NODE_JOIN_END_COLOR = "#c4c2bf";
const NODE_STEP_COLOR = "#54956b";
const NODE_STEP_HTTP_COLOR = "#8fabb0";
const NODE_STEP_SETS_COLOR = "#615cac";
const NODE_ASYNC_SETS_STEP_COLOR = "#ff714b";
const NODE_EACH_STEP_COLOR = "#c6a0d2";
const NODE_PARALLEL_STEP_COLOR = "#4785ff";
const NEXT_STEP_PORT_COLOR = "#a3ab5b";
const PREVIOUS_STEP_PORT_COLOR = "#8454aa";
const PORT_FIRST_SUB_STEP_COLOR = "#8454aa";
const PORT_STEPS_COLOR = "#617ba0";
const PORT_ERROR_HANDLES_COLOR = "#c13a92";
const LINK_ERROR_HANDLES_COLOR = "#a97f98";
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
  EDITOR_TOOLBAR_HEIGHT: "var(--o23-playground-editor-toolbar-height, 32px)",
  EDITOR_TOOLBAR_GUTTER_SIZE: "var(--o23-playground-editor-toolbar-gutter-size, 8px)",
  EDITOR_TOOLBAR_BORDER: `var(--o23-playground-editor-toolbar-border, 1px solid ${CssVars.BORDER_COLOR})`,
  EDITOR_TOOLBAR_BORDER_RADIUS: `var(--o23-playground-editor-toolbar-border-radius, ${CssVars.BORDER_RADIUS})`,
  EDITOR_TOOLBAR_BUTTON_HEIGHT: `var(--o23-playground-editor-toolbar-button-size, 30px)`,
  EDITOR_TOOLBAR_BUTTON_WIDTH: `var(--o23-playground-editor-toolbar-button-size, 32px)`,
  EDITOR_TOOLBAR_BUTTON_COLOR: `var(--o23-playground-editor-toolbar-button-color, ${CssVars.FONT_COLOR})`,
  EDITOR_TOOLBAR_BUTTON_ACTIVE_COLOR: `var(--o23-playground-editor-toolbar-button-active-color, ${CssVars.INVERT_COLOR})`,
  EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR: `var(--o23-playground-editor-toolbar-button-active-background-color, ${CssVars.PRIMARY_COLOR})`,
  EDITOR_MAX_Z_INDEX: `var(--o23-playground-editor-max-z-index, 9999)`,
  MARKDOWN_FONT_SIZE: "var(--o23-playground-markdown-font-size, 14px)",
  MARKDOWN_COLOR: `var(--o23-playground-markdown-color, ${CssVars.FONT_COLOR})`,
  MARKDOWN_BACKGROUND_COLOR: `var(--o23-playground-markdown-background-color, ${CssVars.BACKGROUND_COLOR})`,
  MARKDOWN_TABLE_MARGIN: "var(--o23-playground-markdown-table-margin, 16px 0)",
  MARKDOWN_TABLE_HEADER_BACKGROUND_COLOR: "var(--o23-playground-markdown-table-header-background-color, var(--color-canvas-subtle))",
  MARKDOWN_TABLE_BORDER: "var(--o23-playground-markdown-table-border, 1px solid var(--color-border-default))",
  MARKDOWN_TABLE_BORDER_RADIUS: "var(--o23-playground-markdown-table-border-radius, 4px)",
  MARKDOWN_TABLE_ROW_BACKGROUND_COLOR: "var(--o23-playground-markdown-table-row-background-color, var(--color-canvas-default))",
  MARKDOWN_TABLE_ROW_EVEN_BACKGROUND_COLOR: "var(--o23-playground-markdown-table-even-row-background-color, var(--color-canvas-subtle))",
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
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SIZE: `var(--o23-playground-dialog-configurable-element-badge-size-ratio, calc(0.6 * ${CssVars.INPUT_HEIGHT}))`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SIZE_S: `var(--o23-playground-dialog-configurable-element-badge-size-ratio, calc(0.5 * ${CssVars.INPUT_HEIGHT}))`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_FONT_WEIGHT: "var(--o23-playground-dialog-configurable-element-badge-font-weight, 400)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_PADDING: "var(--o23-playground-dialog-configurable-element-badge-padding, 0 12px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BORDER_RADIUS: "var(--o23-playground-dialog-configurable-element-badge-border-radius, 6px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_TEXT_FONT_SIZE: "var(--o23-playground-dialog-configurable-element-badge-text-font-size, 0.8em)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_TEXT_FONT_WEIGHT: "var(--o23-playground-dialog-configurable-element-badge-text-font-weight, 400)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ICON_MARGIN: "var(--o23-playground-dialog-configurable-element-badge-icon-margin, 0 -8px 0 0)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_CHECKED_BACKGROUND_COLOR: "var(--o23-playground-dialog-configurable-element-badge-checked-background-color, transparent)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_CHECKED_COLOR: `var(--o23-playground-dialog-configurable-element-badge-checked-color, ${CssVars.SUCCESS_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_MISSED_BACKGROUND_COLOR: "var(--o23-playground-dialog-configurable-element-badge-missed-background-color, transparent)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_MISSED_COLOR: `var(--o23-playground-dialog-configurable-element-badge-missed-color, ${CssVars.DANGER_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BANNED_BACKGROUND_COLOR: "var(--o23-playground-dialog-configurable-element-badge-banned-background-color, transparent)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BANNED_COLOR: `var(--o23-playground-dialog-configurable-element-badge-banned-color, ${CssVars.DANGER_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ALL_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-all-background-color, ${CssVars.SUCCESS_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ALL_COLOR: `var(--o23-playground-dialog-configurable-element-badge-all-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_IGNORED_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-ignored-background-color, ${CssVars.WAIVE_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_IGNORED_COLOR: `var(--o23-playground-dialog-configurable-element-badge-ignored-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NOT_AVAILABLE_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-not-available-background-color, ${CssVars.WAIVE_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NOT_AVAILABLE_COLOR: `var(--o23-playground-dialog-configurable-element-badge-not-available-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_COUNT_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-count-background-color, ${CssVars.SUCCESS_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_COUNT_COLOR: `var(--o23-playground-dialog-configurable-element-badge-count-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SNIPPET_BACKGROUND_COLOR: "var(--o23-playground-dialog-configurable-element-badge-snippet-background-color, transparent)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SNIPPET_COLOR: `var(--o23-playground-dialog-configurable-element-badge-snippet-color, ${CssVars.PRIMARY_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_STEPS_BACKGROUND_COLOR: "var(--o23-playground-dialog-configurable-element-badge-steps-background-color, transparent)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_STEPS_COLOR: `var(--o23-playground-dialog-configurable-element-badge-steps-color, ${CssVars.PRIMARY_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_AS_IS_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-as-is-background-color, ${CssVars.WAIVE_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_AS_IS_COLOR: `var(--o23-playground-dialog-configurable-element-badge-as-is-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_USE_DEFAULT_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-use-default-background-color, ${CssVars.WAIVE_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_USE_DEFAULT_COLOR: `var(--o23-playground-dialog-configurable-element-badge-use-default-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_YES_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-yes-background-color, ${EDITOR_ATTRIBUTE_BADGE_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_YES_COLOR: `var(--o23-playground-dialog-configurable-element-badge-yes-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NO_BACKGROUND_COLOR: `var(--o23-playground-dialog-configurable-element-badge-no-background-color, ${EDITOR_ATTRIBUTE_BADGE_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NO_COLOR: `var(--o23-playground-dialog-configurable-element-badge-no-color, ${CssVars.INVERT_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_MARGIN: "var(--o23-playground-dialog-configurable-element-specific-margin, 0 -8px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_PADDING: "var(--o23-playground-dialog-configurable-element-specific-padding, 8px 16px 8px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_COLUMN_GAP: "var(--o23-playground-dialog-configurable-element-specific-grid-column-gap, 32px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_ROW_GAP: "var(--o23-playground-dialog-configurable-element-specific-grid-row-gap, 8px)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_LABEL_HEIGHT: `var(--o23-playground-dialog-configurable-element-help-label-height, ${CssVars.INPUT_HEIGHT})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT: `var(--o23-playground-dialog-configurable-element-help-badge-height, ${CssVars.INPUT_HEIGHT})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_COLOR: `var(--o23-playground-dialog-configurable-element-help-badge-color, ${CssVars.PRIMARY_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_EXPAND_BADGE_COLOR: `var(--o23-playground-dialog-configurable-element-expand-badge-color, ${CssVars.PRIMARY_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_COLLAPSE_BADGE_COLOR: `var(--o23-playground-dialog-configurable-element-collapse-badge-color, ${CssVars.PRIMARY_COLOR})`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_FONT_WEIGHT: "var(--o23-playground-dialog-configurable-element-group-font-weight, 600)",
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_BORDER: `var(--o23-playground-dialog-configurable-element-group-border, 1px solid rgb(216, 222, 228))`,
  EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_INPUT_PREFIX_FONT_SIZE: "var(--o23-playground-dialog-configurable-element-specific-input-prefix-font-size, max(0.8em, 12px))",
  NODE_BORDER_WIDTH: `var(--o23-playground-node-border-width, 2px)`,
  NODE_BORDER_RADIUS: "var(--o23-playground-node-border-radius, 8px)",
  NODE_BACKGROUND: `var(--o23-playground-node-background, ${CssVars.BACKGROUND_COLOR})`,
  NODE_TITLE_PADDING: "var(--o23-playground-node-title-padding, 0 10px)",
  NODE_TITLE_SPREADER_MIN_WIDTH: "var(--o23-playground-node-title-spreader-min-width, 40px)",
  NODE_MIN_WIDTH: "var(--o23-playground-node-min-width, 160px)",
  NODE_MAX_WIDTH: `var(--o23-playground-node-max-width, unset)`,
  NODE_ICON_SIZE: "var(--o23-playground-node-icon-size, 14px)",
  NODE_PORT_HEIGHT: "var(--o23-playground-node-port-height, 24px)",
  NODE_PORT_BORDER_WIDTH: `var(--o23-playground-node-port-border-width, 1px)`,
  NODE_PORT_RADIUS: "var(--o23-playground-node-link-port-radius, 8px)",
  NODE_NEXT_STEP_PORT_BACKGROUND_COLOR: `var(--o23-playground-node-next-step-port-background-color, ${NEXT_STEP_PORT_COLOR})`,
  NODE_NEXT_STEP_PORT_BORDER: `var(--o23-playground-node-next-step-port-border, 2px solid ${color(NEXT_STEP_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PREVIOUS_STEP_PORT_BACKGROUND_COLOR: `var(--o23-playground-node-previous-step-port-background-color, ${PREVIOUS_STEP_PORT_COLOR})`,
  NODE_PREVIOUS_STEP_PORT_BORDER: `var(--o23-playground-node-previous-step-port-border, 2px solid ${color(PREVIOUS_STEP_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PORT_STEPS_BORDER: `var(--o23-playground-port-sub-step-border, 1px solid ${PORT_STEPS_COLOR})`,
  NODE_PORT_STEPS_BACKGROUND: `var(--o23-playground-port-sub-step-background, ${color(PORT_STEPS_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PORT_STEPS_ICON_COLOR: `var(--o23-playground-port-sub-step-icon-color, ${CssVars.INVERT_COLOR})`,
  NODE_PORT_ERROR_HANDLES_BORDER: `var(--o23-playground-port-error-handles-border, 1px solid ${PORT_ERROR_HANDLES_COLOR})`,
  NODE_PORT_ERROR_HANDLES_BACKGROUND: `var(--o23-playground-port-error-handles-background, ${color(PORT_ERROR_HANDLES_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PORT_ERROR_HANDLES_ICON_COLOR: `var(--o23-playground-port-error-handles-icon-color, ${CssVars.INVERT_COLOR})`,
  NODE_PORT_FIRST_SUB_STEP_BACKGROUND: `var(--o23-playground-port-first-sub-step-background, ${PORT_FIRST_SUB_STEP_COLOR})`,
  NODE_PORT_FIRST_SUB_STEP_BORDER: `var(--o23-playground-port-first-sub-step-border, 1px solid ${color(PORT_FIRST_SUB_STEP_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PORT_LAST_SUB_STEP_JOIN_BACKGROUND: `var(--o23-playground-port-last-sub-step-join-background, ${PORT_LAST_SUB_STEP_JOIN_COLOR})`,
  NODE_PORT_LAST_SUB_STEP_JOIN_BORDER: `var(--o23-playground-port-last-sub-step-join-border, 1px solid ${color(PORT_LAST_SUB_STEP_JOIN_COLOR).darken(0.1).opaquer(0.5)})`,
  LINK_STROKE_LINECAP: "var(--o23-playground-link-stroke-linecap, round)",
  LINK_DEFAULT_STROKE_DASHARRAY: "var(--o23-playground-link-default-stroke-dasharray, unset)",
  LINK_DEFAULT_SELECTED_STROKE_DASHARRAY: "var(--o23-playground-link-default-selected-stroke-dasharray, 8 4)",
  LINK_SELECTED_STROKE_DASHOFFSET: "var(--o23-playground-link-selected-stroke-dashoffset, 24)",
  LINK_STEPS_DASHARRAY: "var(--o23-playground-link-steps-dasharray, unset)",
  LINK_STEPS_SELECTED_DASHARRAY: "var(--o23-playground-link-steps-selected-dasharray, var(--o23-playground-link-default-selected-stroke-dasharray, 8 4))",
  LINK_ERROR_HANDLES_COLOR: `var(--o23-playground-link-error-handles-color, ${LINK_ERROR_HANDLES_COLOR})`,
  LINK_ERROR_HANDLES_SELECTED_COLOR: `var(--o23-playground-link-error-handles-selected-color, ${color(LINK_ERROR_HANDLES_COLOR).lighten(0.1).opaquer(0.7)})`,
  LINK_ERROR_HANDLES_DASHARRAY: "var(--o23-playground-link-error-handles-dasharray, unset)",
  LINK_ERROR_HANDLES_SELECTED_DASHARRAY: "var(--o23-playground-link-error-handles-selected-dasharray, var(--o23-playground-link-default-selected-stroke-dasharray, 8 4))",
  LINK_LAST_SUB_STEP_JOIN_DASHARRAY: `var(--o23-playground-link-last-sub-step-join-dasharray, 6)`,
  LINK_LAST_SUB_STEP_JOIN_SELECTED_DASHARRAY: `var(--o23-playground-link-last-sub-step-join-selected-dasharray, 6)`,
  LINK_END_OF_ME_JOIN_DASHARRAY: "var(--o23-playground-link-end-of-me-join-dasharray, 6)",
  LINK_END_OF_ME_JOIN_SELECTED_DASHARRAY: "var(--o23-playground-link-end-of-me-join-selected-dasharray, 6)",
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
  NODE_JOIN_END_BORDER_COLOR: `var(--o23-playground-node-join-end-border-color, ${NODE_JOIN_END_COLOR})`,
  NODE_JOIN_END_BORDER: `var(--o23-playground-node-join-end-border, 2px solid ${NODE_JOIN_END_COLOR})`,
  NODE_JOIN_END_TITLE_FONT_SIZE: "var(--o23-playground-node-join-end-title-font-size, 16px)",
  NODE_JOIN_END_TITLE_FONT_WEIGHT: "var(--o23-playground-node-join-end-title-font-weight, 600)",
  NODE_JOIN_END_TITLE_COLOR: `var(--o23-playground-node-join-end-title-color, ${CssVars.INVERT_COLOR})`,
  NODE_JOIN_END_TITLE_BACKGROUND: `var(--o23-playground-node-join-end-title-background, linear-gradient(135deg, ${NODE_JOIN_END_COLOR} 0%, ${color(NODE_JOIN_END_COLOR).alpha(0.7)} 70%, ${color(NODE_JOIN_END_COLOR).alpha(0.5)} 100%))`,
  NODE_STEP_BORDER: `var(--o23-playground-node-step-border, 2px solid ${NODE_STEP_COLOR})`,
  NODE_STEP_TITLE_FONT_SIZE: "var(--o23-playground-node-step-title-font-size, 16px)",
  NODE_STEP_TITLE_FONT_WEIGHT: "var(--o23-playground-node-step-title-font-weight, 600)",
  NODE_STEP_TITLE_COLOR: `var(--o23-playground-node-step-title-color, ${CssVars.INVERT_COLOR})`,
  NODE_STEP_TITLE_BACKGROUND: `var(--o23-playground-node-step-title-background, linear-gradient(135deg, ${NODE_STEP_COLOR} 0%, ${color(NODE_STEP_COLOR).alpha(0.7)} 70%, ${color(NODE_STEP_COLOR).alpha(0.5)} 100%))`,
  NODE_STEP_BODY_HEIGHT: "var(--o23-playground-node-step-body-height, 32px)",
  NODE_STEP_BODY_PADDING: "var(--o23-playground-node-step-body-padding, 8px 0)",
  NODE_STEP_HTTP_FETCH_BORDER: `var(--o23-playground-node-step-http-fetch-border, 2px solid ${NODE_STEP_HTTP_COLOR})`,
  NODE_STEP_HTTP_FETCH_TITLE_BACKGROUND: `var(--o23-playground-node-step-http-fetch-title-background, linear-gradient(135deg, ${NODE_STEP_HTTP_COLOR} 0%, ${color(NODE_STEP_HTTP_COLOR).alpha(0.7)} 70%, ${color(NODE_STEP_HTTP_COLOR).alpha(0.5)} 100%))`,
  NODE_STEP_HTTP_GET_BORDER: `var(--o23-playground-node-step-http-fetch-border, 2px solid ${NODE_STEP_HTTP_COLOR})`,
  NODE_STEP_HTTP_GET_TITLE_BACKGROUND: `var(--o23-playground-node-step-http-fetch-title-background, linear-gradient(135deg, ${NODE_STEP_HTTP_COLOR} 0%, ${color(NODE_STEP_HTTP_COLOR).alpha(0.7)} 70%, ${color(NODE_STEP_HTTP_COLOR).alpha(0.5)} 100%))`,
  NODE_STEP_HTTP_POST_BORDER: `var(--o23-playground-node-step-http-fetch-border, 2px solid ${NODE_STEP_HTTP_COLOR})`,
  NODE_STEP_HTTP_POST_TITLE_BACKGROUND: `var(--o23-playground-node-step-http-fetch-title-background, linear-gradient(135deg, ${NODE_STEP_HTTP_COLOR} 0%, ${color(NODE_STEP_HTTP_COLOR).alpha(0.7)} 70%, ${color(NODE_STEP_HTTP_COLOR).alpha(0.5)} 100%))`,
  NODE_STEP_SETS_BORDER: `var(--o23-playground-node-step-sets-border, 2px solid ${NODE_STEP_SETS_COLOR})`,
  NODE_STEP_SETS_TITLE_BACKGROUND: `var(--o23-playground-node-step-sets-title-background, linear-gradient(135deg, ${NODE_STEP_SETS_COLOR} 0%, ${color(NODE_STEP_SETS_COLOR).alpha(0.7)} 70%, ${color(NODE_STEP_SETS_COLOR).alpha(0.5)} 100%))`,
  NODE_STEP_ASYNC_SETS_BORDER: `var(--o23-playground-node-step-async-sets-border, 2px solid ${NODE_ASYNC_SETS_STEP_COLOR})`,
  NODE_STEP_ASYNC_SETS_TITLE_BACKGROUND: `var(--o23-playground-node-step-async-sets-title-background, linear-gradient(135deg, ${NODE_ASYNC_SETS_STEP_COLOR} 0%, ${color(NODE_ASYNC_SETS_STEP_COLOR).alpha(0.7)} 70%, ${color(NODE_ASYNC_SETS_STEP_COLOR).alpha(0.5)} 100%))`,
  NODE_STEP_EACH_BORDER: `var(--o23-playground-node-step-each-border, 2px solid ${NODE_EACH_STEP_COLOR})`,
  NODE_STEP_EACH_TITLE_BACKGROUND: `var(--o23-playground-node-step-each-title-background, linear-gradient(135deg, ${NODE_EACH_STEP_COLOR} 0%, ${color(NODE_EACH_STEP_COLOR).alpha(0.7)} 70%, ${color(NODE_EACH_STEP_COLOR).alpha(0.5)} 100%))`,
  NODE_STEP_PARALLEL_BORDER: `var(--o23-playground-node-step-parallel-border, 2px solid ${NODE_PARALLEL_STEP_COLOR})`,
  NODE_STEP_PARALLEL_TITLE_BACKGROUND: `var(--o23-playground-node-step-parallel-title-background, linear-gradient(135deg, ${NODE_PARALLEL_STEP_COLOR} 0%, ${color(NODE_PARALLEL_STEP_COLOR).alpha(0.7)} 70%, ${color(NODE_PARALLEL_STEP_COLOR).alpha(0.5)} 100%))`,
  SNIPPET_BORDER: `var(--o23-playground-snippet-border, ${CssVars.BORDER})`,
  SNIPPET_BORDER_RADIUS: `var(--o23-playground-snippet-border-radius, ${CssVars.BORDER_RADIUS})`,
  SNIPPET_HEIGHT: "var(--o23-playground-snippet-height, 400px)",
  SNIPPET_IO_TRANSFORMER_HEIGHT: "var(--o23-playground-snippet-io-transformer-height, 200px)",
  SNIPPET_ERROR_HANDLES_HEIGHT: `var(--o23-playground-snippet-error-handles-height, 200px)`,
  SNIPPET_HTTP_DECORATE_URL_HEIGHT: "var(--o23-playground-snippet-http-decorate-url-height, 200px)"
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
const Collapse = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-collapse", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M9.99756 6.00065C9.98309 7.70722 9.88834 8.64801 9.26793 9.26842C8.64752 9.88883 7.70673 9.98358 6.00017 9.99805", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M9.99756 17.9974C9.98309 16.2908 9.88834 15.35 9.26793 14.7296C8.64752 14.1092 7.70673 14.0145 6.00017 14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M14 6.00065C14.0145 7.70722 14.1092 8.64801 14.7296 9.26842C15.35 9.88883 16.2908 9.98358 17.9974 9.99805", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M14 17.9974C14.0145 16.2908 14.1092 15.35 14.7296 14.7296C15.35 14.1092 16.2908 14.0145 17.9974 14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("circle", { opacity: "0.5", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5" })
  );
};
const Expand = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-expand", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M6 9.99739C6.01447 8.29083 6.10921 7.35004 6.72963 6.72963C7.35004 6.10921 8.29083 6.01447 9.99739 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M6 14.0007C6.01447 15.7072 6.10921 16.648 6.72963 17.2684C7.35004 17.8888 8.29083 17.9836 9.99739 17.998", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M17.9976 9.99739C17.9831 8.29083 17.8883 7.35004 17.2679 6.72963C16.6475 6.10921 15.7067 6.01447 14.0002 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M17.9976 14.0007C17.9831 15.7072 17.8883 16.648 17.2679 17.2684C16.6475 17.8888 15.7067 17.9836 14.0002 17.998", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("circle", { opacity: "0.5", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5" })
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
const Snippet = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-snippet", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z", fill: "currentColor" }),
    React.createElement("path", { opacity: "0.5", d: "M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { opacity: "0.5", d: "M7 14L6 15L7 16M11.5 16L12.5 17L11.5 18M10 14L8.5 18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const Steps = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-steps", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("circle", { cx: "5", cy: "5", r: "3", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("circle", { cx: "19", cy: "19", r: "3", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { opacity: "0.5", d: "M11 4.25C10.5858 4.25 10.25 4.58579 10.25 5C10.25 5.41421 10.5858 5.75 11 5.75V4.25ZM13 19L13.5303 19.5303C13.8232 19.2374 13.8232 18.7626 13.5303 18.4697L13 19ZM17.2056 8.68732L17.6083 9.32007L17.2056 8.68732ZM6.79434 15.3127L7.197 15.9454H7.197L6.79434 15.3127ZM12.0303 16.9697C11.7374 16.6768 11.2625 16.6768 10.9696 16.9697C10.6768 17.2626 10.6768 17.7374 10.9696 18.0303L12.0303 16.9697ZM10.9696 19.9697C10.6768 20.2626 10.6768 20.7374 10.9696 21.0303C11.2625 21.3232 11.7374 21.3232 12.0303 21.0303L10.9696 19.9697ZM16.1319 4.25H11V5.75H16.1319V4.25ZM13 18.25H7.86809V19.75H13V18.25ZM16.803 8.05458L6.39169 14.6799L7.197 15.9454L17.6083 9.32007L16.803 8.05458ZM13.5303 18.4697L12.0303 16.9697L10.9696 18.0303L12.4696 19.5303L13.5303 18.4697ZM12.4696 18.4697L10.9696 19.9697L12.0303 21.0303L13.5303 19.5303L12.4696 18.4697ZM7.86809 18.25C6.61754 18.25 6.14195 16.6168 7.197 15.9454L6.39169 14.6799C4.07059 16.157 5.11685 19.75 7.86809 19.75V18.25ZM16.1319 5.75C17.3824 5.75 17.858 7.38318 16.803 8.05458L17.6083 9.32007C19.9294 7.843 18.8831 4.25 16.1319 4.25V5.75Z", fill: "currentColor" })
  );
};
const FoldSubNodes = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-fold-sub-nodes", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M11.3357 5.47875L7.36344 9.00968C5.79482 10.404 5.0105 11.1012 5.0105 11.9993C5.0105 12.8975 5.79481 13.5946 7.36344 14.989L11.3357 18.5199C12.0517 19.1563 12.4098 19.4746 12.7049 19.342C13.0001 19.2095 13.0001 18.7305 13.0001 17.7725V15.4279C16.6001 15.4279 20.5001 17.1422 22.0001 19.9993C22.0001 10.8565 16.6668 8.57075 13.0001 8.57075V6.22616C13.0001 5.26817 13.0001 4.78917 12.7049 4.65662C12.4098 4.52407 12.0517 4.8423 11.3357 5.47875Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.5", d: "M8.46129 4.5L3.24509 9.34362C2.45098 10.081 1.99976 11.1158 1.99976 12.1994C1.99976 13.3418 2.50097 14.4266 3.37087 15.1671L8.46129 19.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const UnfoldSubNodes = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-unfold-sub-nodes", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M20 6C21.1046 6 22 5.10457 22 4C22 2.89543 21.1046 2 20 2C18.8954 2 18 2.89543 18 4C18 5.10457 18.8954 6 20 6Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement(
      "g",
      { opacity: "0.4" },
      React.createElement("path", { d: "M6 12H18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      React.createElement("path", { d: "M18 4H14C12 4 11 5 11 7V17C11 19 12 20 14 20H18", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    )
  );
};
const FitCanvas = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-fit-canvas", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M12 12L17 7M17 7H13.25M17 7V10.75", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M12 12L7 17M7 17H10.75M7 17V13.25", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { opacity: "0.5", d: "M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z", stroke: "currentColor", strokeWidth: "1.5" })
  );
};
const OriginSize = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-origin-size", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { opacity: "0.5", d: "M11.0002 2C6.94518 2.0073 4.82174 2.10686 3.46471 3.46389C2.00024 4.92835 2.00024 7.28538 2.00024 11.9994C2.00024 16.7135 2.00024 19.0705 3.46471 20.535C4.92918 21.9994 7.2862 21.9994 12.0002 21.9994C16.7143 21.9994 19.0713 21.9994 20.5358 20.535C21.8928 19.1779 21.9924 17.0545 21.9997 12.9994", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M13 11L22 2M22 2H16.6562M22 2V7.34375M21 3L12 12M12 12H16M12 12V8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const ZoomIn = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-zoom-in", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("circle", { cx: "11", cy: "11", r: "9", stroke: "currentColor", strokeWidth: "1.5", opacity: "0.5" }),
    React.createElement("path", { d: "M9 11H11M11 11H13M11 11V13M11 11V9", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M21.812 20.9748C21.7493 21.0695 21.636 21.1828 21.4094 21.4094C21.1828 21.636 21.0695 21.7493 20.9748 21.812C20.4202 22.1793 19.6699 21.99 19.3559 21.4036C19.3023 21.3035 19.2563 21.15 19.1643 20.843C19.0638 20.5076 19.0136 20.3398 19.0038 20.2218C18.9466 19.5268 19.5268 18.9466 20.2218 19.0038C20.3398 19.0136 20.5075 19.0638 20.843 19.1643C21.15 19.2563 21.3035 19.3023 21.4036 19.3559C21.99 19.6699 22.1793 20.4202 21.812 20.9748Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const ZoomOut = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-zoom-out", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("circle", { cx: "11", cy: "11", r: "9", stroke: "currentColor", strokeWidth: "1.5", opacity: "0.5" }),
    React.createElement("path", { d: "M9 11H11H13", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M21.812 20.9748C21.7493 21.0695 21.636 21.1828 21.4094 21.4094C21.1828 21.636 21.0695 21.7493 20.9748 21.812C20.4202 22.1793 19.6699 21.99 19.3559 21.4036C19.3023 21.3035 19.2563 21.15 19.1643 20.843C19.0638 20.5076 19.0136 20.3398 19.0038 20.2218C18.9466 19.5268 19.5268 18.9466 20.2218 19.0038C20.3398 19.0136 20.5075 19.0638 20.843 19.1643C21.15 19.2563 21.3035 19.3023 21.4036 19.3559C21.99 19.6699 22.1793 20.4202 21.812 20.9748Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const DownloadImage = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-download-image", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none" },
    React.createElement("path", { d: "M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { opacity: "0.5", d: "M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M17 11V2M17 11L20 8M17 11L14 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const DownloadFile = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-download-file", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z", fill: "currentColor" }),
    React.createElement("path", { opacity: "0.5", d: "M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { opacity: "0.5", d: "M8.5 13.5L8.5 18.5M8.5 18.5L10.5 16.625M8.5 18.5L6.5 16.625", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const UploadFile = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-upload-file", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z", fill: "currentColor" }),
    React.createElement("path", { opacity: "0.5", d: "M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { opacity: "0.5", d: "M8.5 18.5L8.5 13.5M8.5 13.5L6.5 15.375M8.5 13.5L10.5 15.375", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
const Max = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-max", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M17 7H14M17 7V10M17 7L13.5 10.5M7 17H10M7 17V14M7 17L10.5 13.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M7 7H10M7 7V10M7 7L10.5 10.5M17 17H14M17 17V14M17 17L13.5 13.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z", stroke: "currentColor", strokeWidth: "1.5" })
  );
};
const Min = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-min", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M10.5 13.5H7.5M10.5 13.5V16.5M10.5 13.5L7 17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M13.5 10.5H16.5M13.5 10.5V7.5M13.5 10.5L17 7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M10.5 10.5H7.5M10.5 10.5V7.5M10.5 10.5L7 7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M13.5 13.5H16.5M13.5 13.5V16.5M13.5 13.5L17 17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z", stroke: "currentColor", strokeWidth: "1.5" })
  );
};
const Window = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-window", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M7 6C7 6.55228 6.55228 7 6 7C5.44772 7 5 6.55228 5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6Z", fill: "currentColor" }),
    React.createElement("path", { d: "M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z", fill: "currentColor" }),
    React.createElement("path", { d: "M13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6Z", fill: "currentColor" }),
    React.createElement("path", { d: "M2 9.5H22", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M9 21L9 10", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
    React.createElement("path", { d: "M2 12C2 7.28596 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28596 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2.49073 19.5618 2.16444 18.1934 2.0551 16", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  );
};
const Zen = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "o23-zen", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", { d: "M14.5 4.5C14.5 5.88071 13.3807 7 12 7C10.6193 7 9.5 5.88071 9.5 4.5C9.5 3.11929 10.6193 2 12 2C13.3807 2 14.5 3.11929 14.5 4.5Z", stroke: "currentColor", strokeWidth: "1.5" }),
    React.createElement("path", { d: "M3 17L5.58887 15.6918C5.84084 15.5645 6 15.3043 6 15.0196C6 12.0802 8.1377 9.56573 11.0067 9.0825C11.6598 8.9725 12.3402 8.9725 12.9933 9.0825C15.8623 9.56573 18 12.0802 18 15.0196C18 15.3043 18.1592 15.5645 18.4111 15.6918L21 17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("path", { d: "M9.5 16L8.45827 17.389C8.42647 17.4314 8.41057 17.4526 8.39456 17.4728C8.13149 17.8053 7.76956 18.0456 7.36102 18.1591C7.33616 18.166 7.31042 18.1724 7.25902 18.1852L5.77423 18.5564C4.7315 18.8171 4 19.754 4 20.8288C4 21.4757 4.52435 22 5.17116 22H6.72727C7.32654 22 7.62617 22 7.917 21.9658C8.59721 21.8859 9.25375 21.667 9.84589 21.3229C10.0991 21.1757 10.3388 20.9959 10.8182 20.6364L11 20.5M11 20.5L13 19M11 20.5L13.5397 21.4524C14.1491 21.6809 14.4539 21.7952 14.7688 21.8688C14.9318 21.9069 15.0966 21.9368 15.2625 21.9583C15.5832 22 15.9087 22 16.5596 22H18.8288C19.4757 22 20 21.4757 20 20.8288C20 19.754 19.2685 18.8171 18.2258 18.5564L16.741 18.1852C16.6896 18.1724 16.6638 18.166 16.639 18.1591C16.2304 18.0456 15.8685 17.8053 15.6054 17.4728C15.5895 17.4526 15.5735 17.4313 15.5417 17.389L14.5 16", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
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
  StepFromInput: React.createElement(IntlLabel, { keys: ["o23", "step", "from-input"], value: "Pick From Input" }),
  StepToOutput: React.createElement(IntlLabel, { keys: ["o23", "step", "to-output"], value: "Write To Output" }),
  StepMerge: React.createElement(IntlLabel, { keys: ["o23", "step", "merge"], value: "Merge-back strategy" }),
  StepMergeReplace: React.createElement(IntlLabel, { keys: ["o23", "step", "merge-replace"], value: "Replace Merge" }),
  StepMergeAsProperty: React.createElement(IntlLabel, { keys: ["o23", "step", "merge-as-property"], value: "Merge As" }),
  StepMainContent: React.createElement(IntlLabel, { keys: ["o23", "step", "main-content"], value: "Main Task" }),
  StepSteps: React.createElement(IntlLabel, { keys: ["o23", "step", "sets", "steps"], value: "Sub Steps" }),
  StepHandleCatchableError: React.createElement(IntlLabel, { keys: ["o23", "step", "error-handles", "catchable"], value: "Catchable Errors" }),
  StepHandleUncatchableError: React.createElement(IntlLabel, { keys: ["o23", "step", "error-handles", "uncatchable"], value: "Uncatchable Errors" }),
  StepHandleExposedError: React.createElement(IntlLabel, { keys: ["o23", "step", "error-handles", "uncatchable"], value: "Exposed Errors" }),
  StepHandleAnyError: React.createElement(IntlLabel, { keys: ["o23", "step", "error-handles", "uncatchable"], value: "Any Errors" }),
  StepFirstSubStep: React.createElement(IntlLabel, { keys: ["o23", "step", "first-sub-step"], value: "In" }),
  JoinEndNodeTitle: React.createElement(IntlLabel, { keys: ["o23", "node", "join-end"], value: "End of " }),
  StepUseSnippet: "Snippet",
  StepUseGetProperty: "Get Property",
  StepUseDelProperty: "Del Property",
  StepUseDelProperties: "Del Properties (Alias for Del Property)",
  StepUseSnowflake: "Snowflake",
  StepUseHttpFetch: "Http Fetch",
  StepUseHttpGet: "Http Get (Using Get method for HTTP Fetch)",
  StepUseHttpPost: "Http Post (Using Post method for HTTP Fetch)",
  StepUseSets: "Sets",
  StepUseAsyncSets: "Async Sets",
  StepUseEach: "Each",
  StepUseParallel: "Parallel",
  StepVariableIgnoreSnippet: React.createElement(IntlLabel, { keys: ["o23", "step", "common-variable", "ignore-snippet"], value: "Ignore" }),
  StepVariableUseSnippet: React.createElement(IntlLabel, { keys: ["o23", "step", "common-variable", "use-snippet"], value: "Use Snippet" }),
  StepErrorHandleTypeNone: React.createElement(IntlLabel, { keys: ["o23", "step", "error-handle", "none"], value: "Ignored" }),
  StepErrorHandleTypeSnippet: React.createElement(IntlLabel, { keys: ["o23", "step", "error-handle", "none"], value: "Use Snippet" }),
  StepErrorHandleTypeSteps: React.createElement(IntlLabel, { keys: ["o23", "step", "error-handle", "none"], value: "Use Sub-steps" }),
  StepIOTransformer: React.createElement(IntlLabel, { keys: ["o23", "step", "io-transformer", "use"], value: "Transformer" }),
  StepIOTransformerAsIs: React.createElement(IntlLabel, { keys: ["o23", "step", "io-transformer", "as-is"], value: "As Is" }),
  StepIOTransformerSnippet: React.createElement(IntlLabel, { keys: ["o23", "step", "io-transformer", "snippet"], value: "Use Snippet" }),
  StepIOMergeBackReplace: React.createElement(IntlLabel, { keys: ["o23", "step", "io-merge-back", "replace"], value: "Replace" }),
  StepIOMergeBackUnbox: React.createElement(IntlLabel, { keys: ["o23", "step", "io-merge-back", "unbox"], value: "Unbox and Merge" }),
  StepIOMergeBackAsProperty: React.createElement(IntlLabel, { keys: ["o23", "step", "io-merge-back", "as-property"], value: "As Specific Property" }),
  StepIOMergeBackAsPropertyName: React.createElement(IntlLabel, { keys: ["o23", "step", "io-merge-back", "as-property-name"], value: "Property Name" }),
  StepSnippetSnippet: React.createElement(IntlLabel, { keys: ["o23", "step", "snippet", "snippet"], value: "Snippet" }),
  StepGetPropertyProperty: React.createElement(IntlLabel, { keys: ["o23", "step", "get-property", "property"], value: "Property" }),
  StepDelPropertyProperty: React.createElement(IntlLabel, { keys: ["o23", "step", "del-property", "property"], value: "Property" }),
  StepHttpRemote: React.createElement(IntlLabel, { keys: ["o23", "step", "http", "system"], value: "HTTP API" }),
  StepHttpSystem: React.createElement(IntlLabel, { keys: ["o23", "step", "http", "system"], value: "System" }),
  StepHttpEndpoint: React.createElement(IntlLabel, { keys: ["o23", "step", "http", "endpoint"], value: "Endpoint" }),
  StepHttpDecorateUrl: React.createElement(IntlLabel, { keys: ["o23", "step", "http", "decorate-url"], value: "Decorate URL" }),
  StepEachOriginalContentName: React.createElement(IntlLabel, { keys: ["o23", "step", "each", "original-content-name"], value: "Origin Content Variable" }),
  StepEachItemName: React.createElement(IntlLabel, { keys: ["o23", "step", "each", "item-name"], value: "Item Variable" }),
  StepParallelCloneData: React.createElement(IntlLabel, { keys: ["o23", "step", "parallel", "clone-data"], value: "Clone For Each Step" }),
  StepParallelRace: React.createElement(IntlLabel, { keys: ["o23", "step", "parallel", "race"], value: "Race" }),
  Type: React.createElement(IntlLabel, { keys: ["o23", "variable", "type"], value: "Type" }),
  Code: React.createElement(IntlLabel, { keys: ["o23", "variable", "code"], value: "Code" }),
  Name: React.createElement(IntlLabel, { keys: ["o23", "variable", "name"], value: "Name" }),
  Enabled: React.createElement(IntlLabel, { keys: ["o23", "variable", "enabled"], value: "Enabled" }),
  Use: React.createElement(IntlLabel, { keys: ["o23", "variable", "use"], value: "Use" }),
  ErrorHandles: React.createElement(IntlLabel, { keys: ["o23", "variable", "error-handles"], value: "Error Handling" }),
  CatchableErrorHandle: React.createElement(IntlLabel, { keys: ["o23", "variable", "catchable-error-handle"], value: "Catchable" }),
  UncatchableErrorHandle: React.createElement(IntlLabel, { keys: ["o23", "variable", "uncatchable-error-handle"], value: "Uncatchable" }),
  ExposedErrorHandle: React.createElement(IntlLabel, { keys: ["o23", "variable", "exposed-error-handle"], value: "Exposed" }),
  AnyErrorHandle: React.createElement(IntlLabel, { keys: ["o23", "variable", "any-error-handle"], value: "Any" }),
  All: React.createElement(IntlLabel, { keys: ["o23", "badge", "all"], value: "All" }),
  Ignored: React.createElement(IntlLabel, { keys: ["o23", "badge", "ignored"], value: "Ignored" }),
  Specified: React.createElement(IntlLabel, { keys: ["o23", "badge", "specified"], value: "Specified" }),
  NotAvailable: React.createElement(IntlLabel, { keys: ["o23", "badge", "not-available"], value: "N/A" }),
  UseDefault: React.createElement(IntlLabel, { keys: ["o23", "badge", "use-default"], value: "Default" }),
  NoDecoration: React.createElement(IntlLabel, { keys: ["o23", "badge", "no-decoration"], value: "No Decoration" }),
  YesChar: React.createElement(IntlLabel, { keys: ["o23", "badge", "yes-char"], value: "Y" }),
  NoChar: React.createElement(IntlLabel, { keys: ["o23", "badge", "no-char"], value: "N" }),
  Snippet: React.createElement(IntlLabel, { keys: ["o23", "badge", "snippet"], value: React.createElement(Snippet, null) }),
  Steps: React.createElement(IntlLabel, { keys: ["o23", "badge", "steps"], value: React.createElement(Steps, null) }),
  AsIs: React.createElement(IntlLabel, { keys: ["o23", "badge", "as-is"], value: "N/A" }),
  BadgeChecked: React.createElement(IntlLabel, { keys: ["o23", "badge", "checked"], value: React.createElement(ElementChecked, null) }),
  BadgeMissed: React.createElement(IntlLabel, { keys: ["o23", "badge", "missed"], value: React.createElement(ElementMissed, null) }),
  BadgeBanned: React.createElement(IntlLabel, { keys: ["o23", "badge", "banned"], value: React.createElement(ElementBanned, null) }),
  NoCodeDefinedInFileDef: React.createElement(IntlLabel, { keys: ["o23", "pipeline", "code", "undefined"], value: "No code defined" }),
  IllegalDropdownOptionSuffix: React.createElement(IntlLabel, { keys: ["o23", "illegal", "dropdown", "option", "suffix"], value: "(Illegal)" })
};
const asUseLabelKey = (use) => {
  return "StepUse" + (use ?? "").trim().split("-").reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1), "");
};
const asBeautifiedUse = (use) => {
  return use.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
};
const askUseLabel = (use) => {
  return Labels[asUseLabelKey(use)];
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
  extname() {
    return "yaml";
  }
}
const isPipelineDef = (def) => def.type === "pipeline";
const isStepSetsDef = (def) => def.type === "step-sets";
const confirm$9 = (model, def, handlers) => {
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
  PlaygroundEventTypes2["RESET_CONTENT"] = "reset-content";
  PlaygroundEventTypes2["INIT_HELP_DOC_WIDTH"] = "init-help-doc-width";
  PlaygroundEventTypes2["SHOW_EDIT_DIALOG"] = "show-edit-dialog";
  PlaygroundEventTypes2["HIDE_EDIT_DIALOG"] = "hide-edit-dialog";
  PlaygroundEventTypes2["REPAINT"] = "repaint";
})(PlaygroundEventTypes || (PlaygroundEventTypes = {}));
const Context$2 = reactExports.createContext({});
Context$2.displayName = "PlaygroundEventBus";
const PlaygroundEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("playground");
  return React.createElement(Context$2.Provider, { value: bus }, children);
};
const usePlaygroundEventBus = () => reactExports.useContext(Context$2);
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

        table {
            border-collapse: separate;
            border-radius: 4px;
            margin: ${PlaygroundCssVars.MARKDOWN_TABLE_MARGIN};

            > thead > tr {
                border-top: 0;
                background-color: ${PlaygroundCssVars.MARKDOWN_TABLE_HEADER_BACKGROUND_COLOR};

                &:first-child {
                    > th:first-child {
                        border-top-left-radius: ${PlaygroundCssVars.MARKDOWN_TABLE_BORDER_RADIUS};
                    }

                    > th:last-child {
                        border-top-right-radius: ${PlaygroundCssVars.MARKDOWN_TABLE_BORDER_RADIUS};
                    }
                }

                > td:not(:first-child) {
                    border-left: 0;
                }
            }


            > tbody > tr {
                border-top: 0;
                background-color: ${PlaygroundCssVars.MARKDOWN_TABLE_ROW_BACKGROUND_COLOR};

                &:nth-child(even) {
                    background-color: ${PlaygroundCssVars.MARKDOWN_TABLE_ROW_EVEN_BACKGROUND_COLOR};
                }

                &:last-child {
                    > td:first-child {
                        border-bottom-left-radius: ${PlaygroundCssVars.MARKDOWN_TABLE_BORDER_RADIUS};
                    }

                    > td:last-child {
                        border-bottom-right-radius: ${PlaygroundCssVars.MARKDOWN_TABLE_BORDER_RADIUS};
                    }
                }

                > td {
                    border-top: 0;

                    &:not(:first-child) {
                        border-left: 0;
                    }
                }
            }
        }

        p, blockquote, ul, ol, dl, pre, details {
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

    &:not([data-level="0"]) {
        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: calc((var(--level) * 2 - 0.5) * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT});
            width: 1px;
            height: 100%;
            background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
        }

        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: calc((var(--level) * 2 - 0.5) * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT});
            width: 8px;
            height: 1px;
            background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
        }
    }

    &:last-of-type {
        // last one, since flex direction is column reverse

        &:before {
            border-bottom-left-radius: 3px;
            width: 8px;
            height: calc(${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HEIGHT} / 2);
            background-color: transparent;
            border-left: 1px solid ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
            border-bottom: 1px solid ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
        }

        &:after {
            display: none;
        }
    }

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
    height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SIZE};
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

    &[data-role=snippet] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SNIPPET_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SNIPPET_COLOR};
    }

    &[data-role=steps] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_STEPS_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_STEPS_COLOR};
    }

    &[data-role=as-is] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_AS_IS_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_AS_IS_COLOR};
    }

    &[data-role=use-default] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_USE_DEFAULT_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_USE_DEFAULT_COLOR};
    }

    &[data-role=yes] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_YES_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_YES_COLOR};
    }

    &[data-role=no] {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NO_BACKGROUND_COLOR};
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_NO_COLOR};
    }

    &[data-role=snippet], &[data-role=steps] {
        > svg {
            height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SIZE_S};
            width: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SIZE_S};
        }
    }

    > svg {
        width: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_SIZE};
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

    &:not(:last-child):not([data-level="0"]) {
        // not last one, since flex direction is column reverse

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: calc(((var(--level) - 1) * 2 + 0.5) * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT});
            width: 1px;
            height: 100%;
            background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
            z-index: 1;
        }
    }
`;
const SpecificElementsContainer = qe.span.attrs({
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

    &[data-visible=false] {
        display: none;

        & + * {
            display: none;
        }
    }

    > span:first-child {
        height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_LABEL_HEIGHT};
        display: inline-flex;
        align-items: center;
        position: relative;
    }
`;
const SpecificElementBadge = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-element-badge" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT};
    width: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT};
    cursor: pointer;

    > svg {
        height: calc(${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT} * 0.6);
        transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }

    &[data-role=help] > svg {
        &:hover {
            color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_COLOR};
        }
    }

    &[data-role=expand] > svg {
        height: calc(${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT} * 0.7);

        &:hover {
            color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_EXPAND_BADGE_COLOR};
        }
    }

    &[data-role=collapse] > svg {
        height: calc(${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT} * 0.7);

        &:hover {
            color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_COLLAPSE_BADGE_COLOR};
        }
    }
`;
const SpecificElementGroupHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-element-group-header" })`
    display: flex;
    position: relative;
    align-items: center;
    border-bottom: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_BORDER};
    justify-content: flex-end;

    &[data-visible=false] {
        display: none;
    }
`;
const SpecificElementEditorPlaceholder = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-edit-dialog-specific-element-editor-placeholder" })`
    display: block;

    &[data-visible=false] {
        display: none;
    }
`;
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

    &[data-visible=false] {
        display: none;
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
const Context$1 = reactExports.createContext({});
Context$1.displayName = "EditDialogEventBus";
const EditDialogEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("edit-dialog");
  return React.createElement(Context$1.Provider, { value: bus }, children);
};
const useEditDialogEventBus = () => reactExports.useContext(Context$1);
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
const ConfigurableElementBadgeSnippet = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "snippet" }, Labels.Snippet);
};
const ConfigurableElementBadgeSteps = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "steps" }, Labels.Steps);
};
const ConfigurableElementBadgeAsIs = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "as-is" }, Labels.AsIs);
};
const ConfigurableElementBadgeUseDefault = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "use-default" }, Labels.UseDefault);
};
const ConfigurableElementBadgeYes = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "yes" }, Labels.YesChar);
};
const ConfigurableElementBadgeNo = () => {
  return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "no" }, Labels.NoChar);
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
const DialogNavigatorElementChildren = (props) => {
  const { element, model, level } = props;
  if (element.children == null || element.children.length === 0) {
    return null;
  }
  return React.createElement(NavigatorElementChildren, { level }, element.children.map((child) => {
    return React.createElement(DialogNavigatorElement, { element: child, model, level: level + 1, key: child.code });
  }));
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
  return React.createElement(NavigatorElementsContainer, null, elements.map((element) => {
    return React.createElement(DialogNavigatorElement, { element, model, level: 0, key: element.code });
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
var DialogSpecificElementEventTypes;
(function(DialogSpecificElementEventTypes2) {
  DialogSpecificElementEventTypes2["EXPAND"] = "expand";
  DialogSpecificElementEventTypes2["COLLAPSE"] = "collapse";
  DialogSpecificElementEventTypes2["ASK_EXPAND"] = "ask-expand";
})(DialogSpecificElementEventTypes || (DialogSpecificElementEventTypes = {}));
const Context = reactExports.createContext({});
Context.displayName = "DialogSpecificElementEventBus";
const DialogSpecificElementEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("dialog-specific-element");
  return React.createElement(Context.Provider, { value: bus }, children);
};
const useDialogSpecificElementEventBus = () => reactExports.useContext(Context);
const DialogSpecificElementWrapper = (props) => {
  const { element, model, visible = true, assistant, askParentExpand } = props;
  const { anchor, label, editor: Editor2, helpDoc, group, collapsible = false } = element;
  const ref = reactExports.useRef(null);
  const { on, off, fire } = useEditDialogEventBus();
  const { on: onElement, off: offElement, fire: fireElement } = useDialogSpecificElementEventBus();
  const [collapsed, setCollapsed] = reactExports.useState(element.collapsed ?? false);
  const [showHelp, setShowHelp] = reactExports.useState(false);
  useElementValueChangeBy(element);
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onLocateElement = (anchorToLocate) => {
      if (anchor !== anchorToLocate) {
        return;
      }
      if (ref.current != null) {
        if (!visible) {
          askParentExpand();
        }
        setTimeout(() => {
          ref.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }, 30);
      }
    };
    on(EditDialogEventTypes.LOCATE_ELEMENT, onLocateElement);
    return () => {
      off(EditDialogEventTypes.LOCATE_ELEMENT, onLocateElement);
    };
  }, [on, off, fireElement, anchor, visible, askParentExpand]);
  reactExports.useEffect(() => {
    const onAskExpand = () => {
      if (!visible) {
        askParentExpand();
      }
      setCollapsed(false);
      fireElement(DialogSpecificElementEventTypes.EXPAND);
    };
    onElement(DialogSpecificElementEventTypes.ASK_EXPAND, onAskExpand);
    return () => {
      offElement(DialogSpecificElementEventTypes.ASK_EXPAND, onAskExpand);
    };
  }, [onElement, offElement, fireElement, visible, askParentExpand]);
  const onHelpBadgeClicked = () => setShowHelp(!showHelp);
  const onExpandClicked = () => {
    setCollapsed(!collapsed);
    fireElement(DialogSpecificElementEventTypes.EXPAND);
  };
  const onCollapseClicked = () => {
    setCollapsed(!collapsed);
    fireElement(DialogSpecificElementEventTypes.COLLAPSE);
  };
  const onValueChanged = (repaint2 = true) => {
    if (repaint2) {
      forceUpdate();
    }
    fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, anchor);
  };
  const hasHelpDoc = VUtils.isNotBlank(helpDoc);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      SpecificElementLabel,
      { "data-group": group, "data-visible": visible, ref },
      React.createElement("span", null, label),
      hasHelpDoc ? React.createElement(
        SpecificElementBadge,
        { onClick: onHelpBadgeClicked, "data-role": "help" },
        React.createElement(ElementHelp, null)
      ) : null
    ),
    group && collapsible ? React.createElement(SpecificElementGroupHeader, { "data-visible": visible }, collapsed ? React.createElement(
      SpecificElementBadge,
      { onClick: onExpandClicked, "data-role": "expand" },
      React.createElement(Expand, null)
    ) : React.createElement(
      SpecificElementBadge,
      { onClick: onCollapseClicked, "data-role": "collapse" },
      React.createElement(Collapse, null)
    )) : null,
    group && !collapsible ? React.createElement(SpecificElementEditorPlaceholder, { "data-visible": visible }) : null,
    !group && Editor2 != null ? React.createElement(Editor2, { model, onValueChanged, assistant }) : null,
    hasHelpDoc ? React.createElement(
      SpecificElementHelpDoc,
      { "data-visible": visible && showHelp },
      React.createElement(HelpDoc, { content: helpDoc })
    ) : null
  );
};
const DialogSpecificElementInitExpand = (props) => {
  const { element } = props;
  const { fire } = useDialogSpecificElementEventBus();
  reactExports.useEffect(() => {
    if (element.group !== true || element.collapsible !== true || element.collapsed !== true) {
      return;
    }
    fire(DialogSpecificElementEventTypes.COLLAPSE);
  }, []);
  return React.createElement(reactExports.Fragment, null);
};
const DialogSpecificElement = (props) => {
  const { element, model, assistant } = props;
  const { on, off, fire } = useDialogSpecificElementEventBus();
  const [visible, setVisible] = reactExports.useState(props.visible ?? true);
  reactExports.useEffect(() => {
    const onExpand = () => setVisible(true);
    const onCollapse = () => setVisible(false);
    on && on(DialogSpecificElementEventTypes.EXPAND, onExpand);
    on && on(DialogSpecificElementEventTypes.COLLAPSE, onCollapse);
    return () => {
      off && off(DialogSpecificElementEventTypes.EXPAND, onExpand);
      off && off(DialogSpecificElementEventTypes.COLLAPSE, onCollapse);
    };
  }, [on, off]);
  const elementVisible = useElementVisible(element, model);
  if (!elementVisible) {
    return null;
  }
  const askParentExpand = () => fire(DialogSpecificElementEventTypes.ASK_EXPAND);
  return React.createElement(
    DialogSpecificElementEventBusProvider,
    null,
    React.createElement(DialogSpecificElementWrapper, { ...props, visible, askParentExpand }),
    element.children != null ? element.children.map((child) => {
      return React.createElement(DialogSpecificElement, { element: child, model, visible, assistant, key: child.code });
    }) : null,
    React.createElement(DialogSpecificElementInitExpand, { element })
  );
};
const DialogSpecificElements = (props) => {
  const { elements, model, assistant } = props;
  return React.createElement(SpecificElementsContainer, null, elements.map((element) => {
    return React.createElement(DialogSpecificElement, { element, model, visible: true, assistant, key: element.code });
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
  const { helpDoc, elements, confirm: confirm2, discard: discard2, model, assistant } = props;
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
    React.createElement(DialogSpecific, { elements, model, assistant }),
    React.createElement(DialogNavigator, { elements, model })
  );
};
const DialogContent = (props) => {
  const { helpDoc, elements, prepare: prepare2, confirm: confirm2, discard: discard2, assistant } = props;
  const [state] = reactExports.useState({ model: prepare2() });
  return React.createElement(
    EditDialogEventBusProvider,
    null,
    React.createElement(StateHolder, null),
    React.createElement(LayoutController, null),
    React.createElement(DialogWorkArea, { helpDoc, elements, confirm: confirm2, discard: discard2, model: state.model, assistant }),
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
const markdown$K = "Handle any error thrown by current step. The following parameters can be used during the error handling process:\n\n- `$code`: Error code. Note that it is always `O01-99999` when using the `AnyError` handler.\n- `$error`: Error object itself,\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\n> It is an async function, so `await` is available inside.\n";
const markdown$J = "Handle `CatchableError` thrown by current step. The following parameters can be used during the error handling process:\n\n- `$code`: Error code. Note that it is always `O01-99999` when using the `AnyError` handler.\n- `$error`: Error object itself,\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\n> It is an async function, so `await` is available inside.\n";
const markdown$I = "### Error handling\n\nError handling is a critical part of any step. It is important to handle errors properly to ensure that your step is robust\nand reliable. `@rainbow-o23` provided a standard exception handling process, including the following four types of exceptions:\n\n- `CatchableError`: Catchable exception. Generally refers to exceptions thrown in pipeline steps expected to be caught and handled\n  externally,\n- `ExposedUncathableError`: Uncatchable exception which identified as exposed. Generally refers to exceptions thrown in pipeline steps not\n  expected to be handled additionally externally, and should be exposed to the caller,\n- `UncatchableError`: Uncatchable exception. Generally refers to exceptions thrown in pipeline steps not expected to be handled additionally\n  externally,\n- `AnyError`: Any exception. Generally refers to any exception thrown in pipeline steps.\n\nIt is important to note that exception handling is mutually exclusive. If an exception has already been caught by a handler, it will not be\ncaught by any other handlers. After throwing an exception, the pipeline steps will detect exception type in the above order. As long as the\nexception matches the catch type and the processor for that catch type has been defined, the defined processing logic will be entered. In\npractical scenarios, exception catching needs to be done according to requirements. Generally, there are some recommended practices:\n\n- Generally, `CatchableError` is expected to be caught and handled. For whether the pipeline step will throw this exception, please refer to\n  the corresponding step documentation,\n- In most pipeline steps, since custom snippet can be used to define logic (in addition to the step itself, can use snippet to\n  define the logic for `pick from input` and `write to output`), any type of exception can be thrown in these snippets, so whether or not\n  you need to catch it depends on the specific definition of the custom snippet for this step,\n- Generally speaking, `ExposedUncatchableError` and `UncatchableError` do not require further processing,\n- Also, can use `AnyError` to catch all types of exceptions, including `Node.js` standard exceptions\n\n`@rainbow-o23` provides two ways to handle exceptions, which will be demonstrated below.\n\n#### Using snippet\n\nUse snippet processing for handling error. The following parameters can be used during the error handling process:\n\n- `$code`: Error code. Note that it is always `O01-99999` when using the `AnyError` handler.\n- `$error`: Error object itself,\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\n> All handlers are async functions, so `await` is available inside.\n\nAfter handling the exception in the snippet, can either return normally, rethrow the original exception, or construct and throw a new\nexception. The following examples will provide some references:\n\n```ts\n// simply log the exception.\n$.$logger.error(`An exception[code=${$code}] caught.`, $error);\n\n// return normally\nreturn 'Everything is OK now.';\n\n// or check exception type, decide to rethrow or construct a new exception\nif ($.$errors.isCatchable($error)) {\n	// construct and throw a new exception\n	$.$errors.exposed({status: 500, code: $code, reason: $error.message});\n} else {\n	// rethrow the original exception\n	throw $error;\n}\n```\n\n> In most cases, special exception handling is not necessary, as `@rainbow-o23` will handle all exceptions consistently when returning to\n> the API caller.\n\n> When choosing to return normally, meaning no exception is thrown anymore, the returned data will go through the `write to output` process\n> and will be consistent with the normal logic of returning data in the pipeline steps. However, if an exception is thrown during\n> the `write to output` process, this exception will be thrown directly, no error handling on this situation.\n\nHere are some commonly used utility function examples for exception handling in `$helpers`. For detailed specifications, please refer to\nthe `@rainbow-o23` documentation.\n\n```ts\n// log exception\n$.$logger.log(`An exception[code=${$code}] caught.`, $error);\n$.$logger.warn(`An exception[code=${$code}] caught.`, $error);\n// If the log function has two or more parameters, and the last one is a string, then the last parameter will be used as the log category\n$.$logger.error(`An exception[code=${$code}] caught.`, $error, 'SomeLogCategory');\n\n// check error type\n// note exposed uncatchable error is also an uncatchable error\n// so if want to check exposed uncatchable error, should check it first\n$.$errors.isCatchable($error);       // check it is a catchable error\n$.$errors.isExposed($error);         // check it is an exposed uncatchable error\n$.$errors.isUncatchable($error);     // check it is an uncatchable error\n\n// construct a new error and rethrow it\n// for catchable\n$.$errors.catchable({code: $code, reason: 'I am catchable.'});\n// for exposed uncatchable, a status field is required\n// status is exactly following the HTTP status code, code is the error code, reason is the error message\n$.$error({status: 500, code: $code, reason: 'Unpredicated error occurred.'});\n$.$errors.exposed({status: 500, code: $code, reason: 'Unpredicated error occurred.'});\n// for uncatchable\n$.$errors.uncatchable({code: $code, reason: 'I am uncatchable.'});\n```\n\n#### Using sub-steps\n\nIn practice, if an exception requires additional handling and is not thrown after processing, it is recommended to configure this using\npipeline steps. When choosing to handle exceptions using pipeline steps, the format of the request data received by the step is as follows\n\n```ts\ninterface Data {\n	$code: string;        // error code \n	$error: Error;        // error itself \n	$factor: any;         // original factor data, return by the pick from input process\n	$request: any;        // original request data, with both input data and pipeline context\n}\n```\n\n";
const markdown$H = "Handle `ExposedUncatchableError` thrown by current step. The following parameters can be used during the error handling process:\n\n- `$code`: Error code. Note that it is always `O01-99999` when using the `AnyError` handler.\n- `$error`: Error object itself,\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\n> It is an async function, so `await` is available inside.\n";
const markdown$G = "Obtain a portion of the request data as the input for this step. Additional processing of the data can also be performed during this\nprocess. The following parameters can be used during the conversion process:\n\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\nThe returned data will be used as the real input data for this step. If no data is returned, there is no input data for this step.\n";
const markdown$F = "### Input and output\n\nUsually, when processing logic, we do not need all the memory contexts, but only need to extract certain fragments for processing and return\nthe processing results to the context for subsequent logic to continue processing. Therefore, `@rainbow-o23` provides a relevant\nimplementation, allowing pipeline steps to flexibly access the relevant memory data and write back the processed result data to the context\nin the required format.\n\n#### Pick from input\n\nUse the `Pick from input` property to define a script. The returned data will be used as input data for this step. The script is a function\nthat takes the following parameters:\n\n- `$factor` represents the incoming data,\n- `$request` represents the original request data (including incoming data and a context), it is not recommended,\n- `$helpers` represents function supporting, and it has a shortcut `$`.\n\nHere is a simple example:\n\n```ts\n// incoming data\nconst incoming = {name: 'John', age: 23};\n\n// Only the age is needed as a parameter in the step processing, not the name.\n// Define a transformation script, so in the actual processing logic of the current step, only the age will be collected, and there won't be a field for the name attribute.\nreturn {age: $factor.age};\n```\n\n> `return` is not necessary. If the script is only one line (and has no line breaks), the system will consider the result of executing that\n> line as the result of the entire function.\n\n> It's important to note that whether modifications to memory data during processing will affect the original input data depends on how the\n> transformation is handled. Generally, if deep cloning is not performed, it will affect the data; otherwise, it will not.\n\n#### Write to output\n\nUse the `Write to output` property to define a script. The returned data will be used as output data for this step. The script is a function\nthat takes the following parameters:\n\n- `$result` represents the outgoing data,\n- `$request` represents the original request data (including incoming data and a context), it is not recommended,\n- `$helpers` represents function supporting, and it has a shortcut `$`.\n\nHere is a simple example:\n\n```ts\n// outgoing data\nconst outgoing = {name: 'John', age: 23};\n\n// The result data should only include age, not the name.\n// Define a transformation script, the age alone will be stored in memory for subsequent use.\nreturn {age: $result.age};\n```\n\n> `return` is not necessary. If the script is only one line (and has no line breaks), the system will consider the result of executing that\n> line as the result of the entire function.\n\n>\n\n#### Merge-back Strategy\n\nAfter processing the step logic and obtaining the returned data, you can also define how this returned data should be merged into the\ncontext of the entire pipeline. There are several ways to define this, all declared using the `Merge-back strategy` attribute:\n\n- Defined as `Replace`, it means the returned data will overwrite the original context and be used as the new context.\n- Defined as `Unbox and merge`, it means the returned data will be automatically unboxed and merged into the original context. In this\n  case, the returned data must be a JSON object and cannot be a primitive type or an array.\n- Defined as `As specific property`, it means the returned data will be merged into the original context under the specified name.\n\nHere is a simple example:\n\n```ts\n// context data\nlet context = {name: 'John', age: 0};\nconst result = {age: 23};\n\n// merge not defined, equivalent to\ncontext = result;\n// context is {age: 23}\n\n// merge is \"unbox and merge\", equivalent to\ncontext = {...context, ...result};\n// context is {name: 'John', age: 23}\n\n// merge is 'person', equivalent to\ncontext = {...context, person: result};\n// context is {name: 'John', age: 0, person: {age: 23}}\n```\n\n> Note that in the latter two cases, there is a possibility of name collision resulting in the original context being overwritten.\n> Therefore, it is necessary to have a clear understanding of the data structure in the context.\n\n#### Keep or clear\n\nIn the following `Write to output` scenarios, and in cases where merge-back strategy is specified as `Replace`:\n\n- Returning `null` or `undefined` (recommended to use `(void 0)` to represent `undefined`) indicates that the original request data will\n  continue to be used as the request data for the next step without any modifications.\n- Returning a flag created by `$helpers.$clearContextData()` to clear context data will be used as the request data for the next step, while\n  all other data is cleared.\n\n> Please note that \"without any modifications\" is a conceptual reference. If the data has already been altered by the logic executed in the\n> step, the data passed to the next step may not be identical to the input data of this step.\n";
const markdown$E = "Define the strategy for writing back step result data to memory:\n\n- `Replace`: means the returned data will overwrite the original context and be used as the new context.\n- `Unbox and merge`: means the returned data will be automatically unboxed and merged into the original context. In this\n  case, the returned data must be a JSON object and cannot be a primitive type or an array.\n- `As specific property`: means the returned data will be merged into the original context under the specified name.\n";
const markdown$D = "A brief name that indicates the purpose of the step.\n";
const markdown$C = "Write back the result of the step execution to memory for use as the request data in the next step. Additional processing of the data can\nalso be performed during this process. The following parameters can be used during the conversion process:\n\n- `$result`: Result data of the step execution,\n- `$request`: Entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\nThe returned data will be written back to memory as the actual result data for this step.\n\n> How the step's returned data is written back to memory depends on the return result of this process and the chosen write-back strategy.\n> Please refer to the merge-back strategy documentation for details.\n";
const markdown$B = "Handle `UncatchableError` thrown by current step. The following parameters can be used during the error handling process:\n\n- `$code`: Error code. Note that it is always `O01-99999` when using the `AnyError` handler.\n- `$error`: Error object itself,\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\n> It is an async function, so `await` is available inside.\n";
const markdown$A = "The specified step definition is used. The logic executed by the system has already been predefined in the step definition. After specifying\nthe step definition, you will also need to specify the parameters required for that step definition.\n";
const docs$a = {
  stepName: markdown$D,
  stepUse: markdown$A,
  stepFromInput: markdown$G,
  stepToOutput: markdown$C,
  stepMergeToRequest: markdown$E,
  stepCatchableErrorHandle: markdown$J,
  stepUncatchableErrorHandle: markdown$B,
  stepExposedErrorHandle: markdown$H,
  stepAnyErrorHandle: markdown$K,
  stepIOTransformer: markdown$F.replace(/\$/g, "$$$$"),
  stepErrorHandles: markdown$I.replace(/\$/g, "$$$$")
};
const addTocToStepDocs = (markdown2) => {
  const indexes = new Array(6).fill(0);
  let topLevel = 10;
  return markdown2.split("\n").map((line) => {
    const matched = line.match(/^(#{1,6})\s(.*)$/);
    if (matched == null) {
      return line;
    } else {
      topLevel = Math.min(topLevel, matched[1].length - 1);
      return [matched[1], matched[2]];
    }
  }).map((parsed) => {
    if (typeof parsed === "string") {
      return parsed;
    } else {
      const myLevel = parsed[0].length - 1;
      indexes[myLevel]++;
      for (let i = myLevel + 1; i < indexes.length; i++) {
        indexes[i] = 0;
      }
      return `${parsed[0]} ${indexes.slice(topLevel, myLevel + 1).join(".")}. ${parsed[1]}`;
    }
  }).join("\n");
};
const mergeStepDocsFreely = (doc, replacements) => {
  const markdown2 = Object.keys(replacements).reduce((doc2, key) => {
    return doc2.replace(`\${${key}}`, replacements[key]);
  }, doc);
  return addTocToStepDocs(markdown2);
};
const mergeStepDocs = (doc, toc = true) => {
  const markdown2 = doc.replace("${transformer}\n", docs$a.stepIOTransformer).replace("${errorHandles}\n", docs$a.stepErrorHandles);
  return toc ? addTocToStepDocs(markdown2) : markdown2;
};
const markdown$z = "### Async sets step\n\nThe async sets pipeline step includes a set of sub-step definitions, where all the actual processing logic is executed within the sub-steps,\nasynchronously. The input data for the first sub-step could be specified by `Pick from input`.\n\n> Note that the sub-steps are executed in sequence, asynchronous is relative to this async sets step. This also means that modifications to\n> memory within sub-steps cannot be directly reflected in the current process, so must handle it with caution. Generally, direct\n> modifications to input data or context data within sub-steps should be avoided unless it can be confirmed that the data will not be used\n> in the current process.\n\n#### Environment variables\n\nThis step does not use any environment variables.\n\n#### Step variables\n\nThis step has no other properties defined except for using the `steps` attribute to define sub-steps.\n\n#### Returning\n\nThis step does not return anything.\n\n${transformer}\n\n${errorHandles}\n";
const docs$9 = {
  asyncSetsStep: mergeStepDocs(markdown$z)
};
const markdown$y = "Delete specified property or properties from the input data. If there are multiple attributes, use `,` to connect them.\n\nFor example, if there is input data like `{a: 1, b: 2, c: 3}`, then with the following definition, you can retrieve the\ncorresponding value:\n\n| Property | After deletion  |\n|:---------|:----------------|\n| `a`      | `{b : 2, c: 3}` |\n| `a, b`   | `{c: 3}`        |\n\n> If the specified property name does not exist on the given data object, there will be no side effects.\n";
const markdown$x = "### Delete property step\n\nThe delete property pipeline step remove the specified property name from input data.\n\n#### Environment variables\n\nThis step does not use any environment variables.\n\n#### Step variables\n\nDefine the `property` attribute to remove a specified property from the input data. Since property does not support multi-level data\nstructures, when removing a property from a non-top-level data object in the input data, should first use `Pick from input` to retrieve\nthe non-top-level object.\n\n#### Returning\n\nThis step does not return anything.\n\n${transformer}\n\n${errorHandles}\n";
const docs$8 = {
  stepDelPropertyProperty: markdown$y,
  delPropertyStep: mergeStepDocs(markdown$x)
};
const markdown$w = "The variable name for obtaining the current round's input data in the sub-steps.  \n`$item` by default, and the value can be accessed through `$factor.$item`.\n";
const markdown$v = "The variable name for obtaining original input data obtained in the sub-steps.\n`$content` by default, and the value can be accessed through `$factor.$content`.\n";
const markdown$u = "### Each step\n\nThe each pipeline step includes a set of sub-step definitions, where all the actual processing logic is executed within the sub-steps. The\nsub-step set will be executed N times, where N is the length of the given sub-step input data array. For each execution of the sub-step set,\nthe input data are the array element at the current index and original input data itself.\n\n> Ensure that the input data is always an array; otherwise, the sub-steps cannot execute correctly. Additionally, if the given input\n> parameter is `null`, `undefined`, or an array with a length of 0, it will be returned directly without affecting the context data and\n> without executing the `Write to output` stage.\n\n#### Environment variables\n\nThis step does not use any environment variables.\n\n#### Step variables\n\n| Variable name       | Type   | Description                                                                                      |\n|---------------------|--------|--------------------------------------------------------------------------------------------------|\n| originalContentName | string | The name of the variable that contains the original input data. Optional, default is `$content`. |\n| itemName            | string | The name of the variable that contains the current item. Optional, default is `$item`.           |\n\nAt the same time, the step provides a semaphore to exit the loop, named `$semaphore`. Therefore, the format of the input data received by\nthe sub-steps is as follows:\n\n```ts\n// Assuming no parameters are specified, all defaults will be used.\ninterface Data {\n	$content: any;          // original input data\n	$item: any;             // item at the current index\n	$semaphore: Symbol;     // return this semaphore to break and exit the loop\n}\n\n// Assuming the parameters are specified as originalContentName=input, itemName=data\ninterface Data {\n	input: any;             // original input data\n	data: any;              // item at the current index\n	$semaphore: Symbol;     // return this semaphore to break and exit the loop\n}\n```\n\n#### Returning\n\nAn array containing the returns from all execution rounds, maintaining the same order as the given parameter array.\n\n> Typically, need to specify a merge property in the `Write to output` step for use in subsequent pipeline steps.\n\n${transformer}\n\n${errorHandles}\n";
const docs$7 = {
  stepEachItemName: markdown$w,
  stepEachOriginalContentName: markdown$v,
  eachStep: mergeStepDocs(markdown$u)
};
const markdown$t = "Retrieve the value of a specified property name from the input data. Property names can be connected with dots (`.`) to denote multiple\nhierarchical levels.\n\nFor example, if there is input data like `{a: {b: [{c: 3}, {c: 4}]}}`, then with the following definition, you can retrieve the\ncorresponding value:\n\n| Property | Value                   |\n|:---------|:------------------------|\n| `a`      | `{b: [{c: 3}, {c: 4}]}` |\n| `a.b`    | `[{c: 3}, {c: 4}]`      |\n| `a.b.c`  | `[3, 4]`                |\n\n> Please note that when attempting to retrieve a property value from `null`, `undefined`, or a primitive type (including `string`,\n> `number`, `boolean`, `symbol`, `bigint`), will always receive a `null`.\n";
const markdown$s = "### Get property step\n\nThe get property pipeline step retrieves the value of the specified property name and finally returns the processed result to the memory\ncontext for further processing.\n\n#### Environment variables\n\nThis step does not use any environment variables.\n\n#### Step variables\n\nDefine the `property` attribute to retrieve the value from a specified position in the input data. The retrieval rules are as follows:\n\n- Property names can use dot (`.`) to connect, allowing access to values from nested objects.\n- Values based on `null` or `undefined` will return `null`.\n- Values based on any basic type (including `string`, `number`, `bigint`, `boolean`, `Symbol`) will return `null`.\n- If there are multiple levels of properties and one level's data is an array, the final result will be an array.\n\n#### Returning\n\nThe value of the specified property, can be any value.\n\n> Typically, need to specify a merge property in the `Write to output` step for use in subsequent pipeline steps.\n\n${transformer}\n\n${errorHandles}\n";
const docs$6 = {
  stepGetPropertyProperty: markdown$t,
  getPropertyStep: mergeStepDocs(markdown$s)
};
const markdown$r = "Reprocess the endpoint URL read from the environment. The following parameters can be used during the decoration process:\n\n- `$endpointUrl`: The URL read from the environment based on the `System` and `Endpoint` definitions, can be a fully qualified URL\n  or just a\n  URL context or template,\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\nShould return the final URL to be used for the HTTP request. If this snippet is not defined, then use the URL configured in\nthe environment variables for access.\n";
const markdown$q = "Remote HTTP service endpoint code. This code can represent a single API or a strongly related set of APIs, depending on how `Decorate URL`\nis used.\n";
const markdown$p = "### Http fetch step\n\nThe http fetch pipeline step calls remote HTTP services through defined parameters, and can process the returned results and perform related\nerror handling.\n\n${http}\n";
const markdown$o = "### Http get step\n\nThe http get pipeline step calls remote HTTP services through defined parameters, and can process the returned results and perform related\nerror handling. The Http method is `get`.\n\n${http}\n";
const markdown$n = "#### Environment variables\n\nAll environment variable names depend on the definitions of the `System` and `Endpoint` step variables. For convenience, using the\nfollowing\ndefinitions, which will be used in the environment variables:\n\n- `SYSTEM`: corresponding to the value of `System`,\n- `ENDPOINT`: corresponding to the value of `Endpoint`.\n\nAssuming the value of `System` is `s1` and the value of `Endpoint` is `order`, a system parameter\nnamed `CFG_ENDPOINTS_{SYSTEM}_{ENDPOINT}_URL` would thus be `CFG_ENDPOINTS_S1_ORDER_URL`.\n\n> Note that the values of `System` and `Endpoint` will be converted to uppercase, and any `.` characters will be replaced\n> with `_`. Additionally, based on common practices for environment parameter definitions, the values for `System` and `Endpoint`\n> cannot include `-`, `=` or whitespace characters.\n\nThis step uses the following system environment variables definition:\n\n- `CFG_ENDPOINTS_{SYSTEM}_{ENDPOINT}_URL`: Definition of the endpoint’s URL. This URL can be a fully qualified URL or just a URL context\n  or template, depending on whether and how the `Decorate URL` step variable is used to modify and obtain the final effective access URL,\n- `CFG_ENDPOINTS_{SYSTEM}_GLOBAL_HEADERS`: HTTP request headers used in the step, which are global and will be used in all requests. Defined\n  using the string format `key1=value[;key2=value2...[;keyN=valueN]]`,\n- `CFG_ENDPOINTS_{SYSTEM}_{ENDPOINT}_HEADERS`: HTTP request headers used in the step. Defined using the string\n  format `key1=value[;key2=value2...[;keyN=valueN]]`. If the same key as defined in the global definition is used, the definition here takes\n  precedence, and the value in the global definition will be overwritten,\n- `CFG_ENDPOINTS_{SYSTEM}_GLOBAL_TIMEOUT`: Timeout for the HTTP request in seconds. If not defined, the default value is -1, which means no\n  timeout,\n- `CFG_ENDPOINTS_{SYSTEM}_{ENDPOINT}_TIMEOUT`: Timeout for the HTTP request in seconds. If not defined, use the global definition instead.\n\n> Key of headers are trimmed automatically.\n\n> The timeout definition only takes effect when there is no `timeout` defined in the step variables.\n\n#### Step variables\n\nMaking a remote HTTP call requires many parameter definitions, some of which are mandatory and some optional.\n\n##### `System`\n\nCode for accessing the remote system. Generally, a remote system provides a set of APIs. To facilitate the use of the same defined data in\ndifferent steps, the remote system needs to be defined in code first. This variable is mandatory and case-insensitive.\n\n##### `Endpoint`\n\nDefine an endpoint code for the remote system. This code can represent a single API or a strongly related set of APIs, depending on\nhow `Decorate URL` is used.\n\n##### `Decorate URL`\n\nThis variable is optional and can be used to decorate the URL of the endpoint. The value can be a JavaScript snippet that will be executed\nas a JavaScript function. This function accepts the following input parameters:\n\n- `$endpointUrl`: The URL read from the environment based on the `System` and `Endpoint` definitions, can be a fully qualified URL\n  or just a\n  URL context or template,\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\nThis function should return the final URL to be used for the HTTP request. If this snippet is not defined, then use the URL configured in\nthe environment variables for access.\n\n##### `Http method`\n\nThe HTTP method to be used for the request. This variable is mandatory and case-insensitive. It is optional, with a default value of `post`.\n\n##### `Timeout`\n\nThe timeout for the HTTP request, in seconds. If not defined, use the timeout configured in the environment variables. If none of these are\ndefined, use `-1`, which means no timeout.\n\n##### `Generate request headers`\n\nThis variable is optional and can be used to build the HTTP request headers. The value can be a JavaScript snippet that will be executed\nas a JavaScript function. This function accepts the following input parameters:\n\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\nThis function should return an object (`Record<string, string>`) containing the headers to be used in the HTTP request. If the same key as\ndefined in the environment definition is used, the definition here takes precedence, and the headers in the environment definition will be\noverwritten. If this snippet is not defined, then use the headers in the environment definition.\n\n> Key of headers are NOT trimmed.\n\n##### `Use request body`\n\nSpecify whether the HTTP request uses the HTTP body content. This variable is optional and follows these rules:\n\n- Not defined: For requests other than `GET`, use the HTTP body by default,\n- `true`: Always use the HTTP body, regardless of the request method,\n- `false`: Always avoid using the HTTP body, regardless of the request method.\n\n> How to generate the HTTP body content is referenced by the definition of the `generateBody` variable.\n\n##### `Generate request body`\n\nThis variable is optional and can be used to build the HTTP request body. The value can be a JavaScript snippet that will be executed\nas a JavaScript function. This function accepts the following input parameters:\n\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\nThis function could return anything. If the returned data is not `null`, `undefined`, and not a string, use `JSON.stringify` to convert it\nto a string. `null` and `undefined` essentially represent the absence of an HTTP body. If this snippet is not defined, the default behavior\nis to use `$factor` as the HTTP body after processing it accordingly.\n\n##### `Read response body`\n\nThis variable is optional and can be used to read the HTTP response. The value can be a JavaScript snippet that will be executed\nas a JavaScript function. This function accepts the following input parameters:\n\n- `$response`: The response (`Response`, check [node-fetch](https://www.npmjs.com/package/node-fetch) for more details) object from the HTTP\n  request,\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\nThis function could return anything, and the returned data will be used as output data of this step. If this snippet is not defined, the\nresponse should be read as JSON by `Response.json()`. It is important to note that the response body will only be read if the response\nstatus is in the normal range (`1xx`, `2xx`, `3xx`); otherwise, it will skip to the error handling.\n\n> It is an async function, so `await` is available inside.\n\n##### `Response error handling`\n\nError handling for different HTTP response statuses is generally implemented in a way that only `4xx` and `5xx` statuses trigger\nerror handling. Each exception handling snippet is designed for a specific status; if a status does not have a defined handler, a\ndefault `UncatchableError` will be thrown, with an error code of `O03-00010`. Error handling can either rethrow the original exception,\nwrap the exception and rethrow it, or return data normally. If data is returned normally, it will be used as the output data for this step.\n\nThere are two special cases:\n\n- If the request times out, the status is `600`,\n- If the exception is not caused by the request itself, such as an exception thrown due to a problem with a certain configuration logic,\n  then,\n	- If the exception type is `UncatchableError`, no further handling will be performed and the exception will be directly thrown to the\n	  outer layer,\n	- Otherwise, use the exception handler with status `000` for processing.\n\n> DO NOT rethrow an error that is not an `UncatchableError` from the error handler, as it will be caught again by the error handler with\n> status `000`, which could lead to confusion.\n\n> All handlers are async functions, so `await` is available inside.\n\n#### Returning\n\nThe step's return data is from the response of the HTTP request or error handling.\n\n> The returned data can still be further processed during the `Write to output` stage.\n\n${transformer}\n\n${errorHandles}\n";
const markdown$m = "### Http post step\n\nThe http get pipeline step calls remote HTTP services through defined parameters, and can process the returned results and perform related\nerror handling. The Http method is `post`.\n\n${http}\n";
const markdown$l = "Remote HTTP service provider system code.\n\n";
const docs$5 = (() => {
  const httpDocs = mergeStepDocs(markdown$n, false);
  return {
    stepHttpSystem: markdown$l,
    stepHttpEndpoint: markdown$q,
    stepHttpDecorateUrl: markdown$r,
    httpFetchStep: mergeStepDocsFreely(markdown$p, { "http": httpDocs }),
    httpGetStep: mergeStepDocsFreely(markdown$o, { "http": httpDocs }),
    httpPostStep: mergeStepDocsFreely(markdown$m, { "http": httpDocs })
  };
})();
const markdown$k = "The return value of the function will be used as the input data for each sub-step, and this function will be executed before each sub-step.\nIf the return data contains shared memory data, modifications to this data in any sub-step may affect other sub-steps. The following\nparameters can be used during the clone process:\n\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n";
const markdown$j = "Check to receive only the result data of the first completed sub-step; otherwise, receive the result data of all sub-steps in the form of an\narray.\n";
const markdown$i = "### Parallel sets step\n\nThe parallel sets pipeline step includes a set of sub-step definitions, where all the actual processing logic is executed within the\nsub-steps. Each substep is executed in parallel, and it can be specified whether to collect only the result of the first completed sub-step\nor to collect the results of all sub-steps.The input data for each sub-step is specified by `Pick from input`.\n\n> No matter how the collection of sub-step execution results is specified, if any sub-step throws an exception before the results are\n> collected, the entire parallel process is terminated. Note that the completion of a step does not necessarily mean that other\n> asynchronously executed substeps will be terminated. Please refer\n> to [Promise.race](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise.race) for more details.\n\n> The parallel step relies on the exception raised by the sub-step. If the sub-step encounters an exception and is caught and processed by\n> the exception handler without re-throwing an exception, it is considered to have ended normally.\n\n#### Environment variables\n\nThis step does not use any environment variables.\n\n#### Step variables\n\n| Variable name | Type    | Description                                                                                                                  |\n|---------------|---------|------------------------------------------------------------------------------------------------------------------------------|\n| cloneData     | snippet | Provide a snippet to copy data. The return value of this snippet will be used as the input data for each sub-step. Optional. |\n| race          | boolean | When set to `true`, only the result data of the first completed sub-step will be received. Optional, default is `false`.     |\n\n> If `cloneData` snippet is not provided, the input data for each sub-step will be the same memory data, which is shared among all\n> sub-steps. Therefore, any modification of this memory data by one sub-step may affect the other sub-steps.\n\n#### Returning\n\nUse the return from the first resolved sub-step as the return data. If defined to receive the results of all sub-steps, the data will be an\narray; otherwise, it will be the result data returned by the first completed sub-step.\n\n> It can still be further decorated during `Write to output` stage for the return data.\n\n${transformer}\n\n${errorHandles}\n";
const docs$4 = {
  stepParallelRace: markdown$j,
  stepParallelCloneData: markdown$k,
  parallelStep: mergeStepDocs(markdown$i)
};
const markdown$h = "If using data from the request body, the data portion of the body must be in valid JSON format.\n\n> `GET` requests by default do not parse the request body, while other requests (methods) default to parsing the request body.\n";
const markdown$g = "Used for locating configurations within the application, required fields, and must be globally unique.";
const markdown$f = "Specify whether the current configuration is effective.\n\n> Note that configurations that are not effective will not be loaded when the application starts, so the effective status cannot be switched\n> at runtime.";
const markdown$e = "Indicate whether the returned response is a file.\n";
const markdown$d = "Specify the response headers to be outputted to the client, including names and values.\n\nThe syntax rules are as follows:\n\n- Use a colon to connect the name and value, for example `x-name: value`. Note that only the content before the first colon is considered\n  the name, and the remaining part is the value,\n- If multiple are needed, they should be written on multiple lines,\n- The spaces around the name and value will be automatically removed.\n";
const markdown$c = "To accept uploaded files, multiple attributes are required:\n\n- Specify name: Each line represents a name. For multiple names, define them on separate lines,\n- Each name can specify a max count by appending a colon followed by a number after the name,\n	- `<= 0` indicates unlimited files for that name,\n	- `>= 1` indicates a maximum count,\n- Specify maximum file size: Use plain numbers for bytes, or append `k`, `K`, `m`, `M` for kilobytes and megabytes,\n- Specify file type [mime type](https://docs.nestjs.com/techniques/file-upload#file-validation): Separate multiple types with commas or\n  semicolons.\n\n> The maximum file size and file type specifications apply to all files.\n\n> When defining upload file parameters, due to HTTP protocol specifications requiring the use of Form Data, the `body` supports only\n> key-value pairs. Therefore, the parsed data forms a single-layer JSON object and no longer retains a multi-layered structure.\n";
const markdown$b = "To specify receiving multiple request headers, use commas or semicolons as separators.\n";
const markdown$a = "Only executed when the application starts, during which the system does not provide any parameters to the pipeline.\n";
const markdown$9 = "`GET` requests by default do not parse the request body, while other requests (methods) default to parsing the request body.\n";
const markdown$8 = "Parse parameters from the [route](https://docs.nestjs.com/controllers#route-parameters). For example, can parse the `name`\nand `age` parameters from `https://example.com/:name/:age`.\n\n> The parameter names are automatically synchronized here when modifying the `route` value.\n\n> Although parameters are defined in the `route`, it is still possible to ignore them here, but this is not the recommended approach. \n";
const markdown$7 = "## Overview\n\nThe core concept of `@rainbow-o23` is pipeline, where all logic is defined through pipeline and its steps. There are three different forms\nof\npipeline based on how it is defined:\n\n- Pipeline, which can optionally be exposed as an API. To differentiate, we generally refer to pipelines that are exposed as\n  APIs as `Pipeline as API`, and pipelines that are not exposed as APIs as `pipeline`. In all documents, we will use\n  this name to refer to it. If not specifically labeled as `as API`, it means that this pipeline has not been exposed as an API.\n- Step set, composed of a group of steps,\n- Step: based on the definition of a single step.\n\nIf defined as a pipeline and is exposed as an API, it does not allow other pipeline steps to call it, otherwise it does. Therefore, if\ncertain logic combinations can be reused, they should be defined as a pipeline/steps set/step.\n\n## Common attributes\n\nAll definitions should have the following attributes:\n\n- A `code` attribute for identification within the system, so the value of the `code` attribute is globally unique.\n- A `type` attribute is used to indicate the type of this definition, and the value of the `type` attribute must be one\n  of `pipeline`, `step-sets`, or `step`.\n- An `enabled` attribute is used to indicate whether this definition is effective, and the value of the `enabled` attribute must be\n  either `true` or `false`. If not defined, this definition is considered to be effective by default.\n\n## Pipeline as API\n\nIf the definition contains a `route` attribute and specifies a URI, it is considered to be published as an API. A pipeline published\nas an API includes all standard HTTP protocol elements:\n\n- `route`, URI of API. Excluding the scheme, domain name, and port in the URL, the application configuration can also specify the path\n  context,\n	- To facilitate the definition and parsing of data contained in the `route`, you can use `pathParams` for definition. `pathParams` can\n	  be a list of parameters, or you can use `true` to define receiving all valid path parameters. Please note that the definition of path\n	  parameters must conform to the [nestjs](https://docs.nestjs.com/controllers#route-parameters) standard.\n- `method`, supporting `get`, `post`, `put`, `patch`, and `delete`,\n- `headers`, a list of headers that need to be parsed, or `true` to parse all headers,\n- `queryParams`, a list of query parameters that need to be parsed, or `true` to parse all query parameters,\n- `body`, the content of the HTTP body is in JSON format. To better adapt to common practices of HTTP API usage:\n	- When `method` is specified as `get` and the `body` parameter is not explicitly set to `true`, the system defaults to ignoring the HTTP\n	  body content,\n	- When `method` is not specified as `get` and the `body` parameter is not explicitly set to `false`, the system defaults to parsing the\n	  HTTP body content,\n- `files`, a list of files that need to be parsed, or `true` to parse all files.\n\nThere are also some HTTP response definitions:\n\n- `exposeHeaders`, a set of headers that need to be pushed to the client,\n- `exposeFile`, indicating whether the response data is a file.\n\n## Pipeline\n\nIf the definition does not contain a `route` attribute, it is considered a pipeline. A pipeline can be called by other pipeline steps.\n\nA pipeline always includes at least one step, and its behavior is entirely determined by the steps defined within it.\n\nA pipeline also has a special property `initOnly`, which if declared as `true`, indicates that this pipeline will only be\nexecuted when the application starts, and the application will not provide any parameters during execution.\n\n## Step set\n\nStep set, as the name suggests, can define a set of steps. They can also define how their built-in steps are executed, typically in the\nfollowing ways:\n\n- Synchronous serial,\n- Asynchronous serial,\n- Synchronous parallel,\n- Conditional execution,\n- Loop execution (only for input data as an array),\n- Start a database transaction.\n\nBy combining the various types of step collections mentioned above, you can construct execution sequences suitable for different scenarios.\n\n## Step\n\nSteps can be any type of step definition, including step sets. Logically, a step set is a step which includes a set of sub steps, and\ndifferent step sets define the way their sub steps are executed. Steps are implemented by different standard step components for\ndifferent purposes. Here are some built-in standard steps:\n\n- Retrieve values from models or remove attributes,\n- Execute scripts,\n- Generate snowflake IDs,\n- Call predefined pipelines or steps,\n- Make remote HTTP API calls,\n- Read from or write to databases.\n\nAdditionally, you can also obtain the following steps support through the `@rainbow-o23` standard extension library:\n\n- Print PDF, Word, Excel, CSV,\n- Manipulate AWS S3 objects.\n\n> The latest step support can be found on [Github](https://github.com/InsureMO/rainbow-o23).\n";
const markdown$6 = "Parse parameters from the [URL Search](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams). For example, can parse the `name`\nand `age` parameters from `https://example.com/?name=Jonathan%20Smith&age=18`.\n\nTo specify receiving multiple query parameters, use commas or semicolons as separators.\n";
const markdown$5 = "The route of the API, excluding the HTTP protocol scheme, domain name, and port parts. The context of the URL path can also be\nspecified via the system environment variable `CFG_APP_CONTEXT`.\n\n> It should start with `/`.\n\n`route` syntax can be referenced from [nestjs - routing](https://docs.nestjs.com/controllers#routing)\nand [nestjs - route parameters](https://docs.nestjs.com/controllers#route-parameters), as well\nas [express](https://expressjs.com/en/guide/routing.html). Generally, there are the following rules:\n\n- Use regex for matching, but it's not recommended.\n- Define parameters with `:` prefix, for example `:name`, ensuring parameter names conform to the regex pattern `[A-Za-z0-9_]`.\n- For parsing multiple parameters, use `/`, `.`, or `-` as separators. \n";
const markdown$4 = "- `Pipeline`: A predefined pipeline that can be invoked by other pipelines and can also be executed during application\n  initialization. If specified to execute during application initialization, it cannot be used at runtime, and the initialization is\n  parameterless.\n- `Pipelne as API`: A predefined pipeline exposed as an API, which cannot be invoked by other pipelines.\n- `Step Set`: A predefined set of steps that can be invoked by other pipelines.\n- `Step`: A predefined step that can be invoked by other pipelines.\n";
const docs$3 = {
  pipeline: markdown$7,
  pipelineCode: markdown$g,
  pipelineEnabled: markdown$f,
  pipelineType: markdown$4,
  pipelineInitOnly: markdown$a,
  pipelineRoute: markdown$5,
  pipelineMethod: markdown$9,
  pipelineHeaders: markdown$b,
  pipelinePathParams: markdown$8,
  pipelineQueryParams: markdown$6,
  pipelineBody: markdown$h,
  pipelineFiles: markdown$c,
  pipelineExposeFile: markdown$e,
  pipelineExposeHeaders: markdown$d
};
const markdown$3 = "### Sets step\n\nThe sets pipeline step includes a set of sub-step definitions, where all the actual processing logic is executed within the sub-steps. The\ninput data for the first sub-step is specified by `Pick from input`.\n\n#### Environment variables\n\nThis step does not use any environment variables.\n\n#### Step variables\n\nThis step has no other properties defined except for using the `steps` attribute to define sub-steps.\n\n#### Returning\n\nUse the return from the final sub-step as the return data.\n\n> It can still be further decorated during `Write to output` stage for the return data.\n\n${transformer}\n\n${errorHandles}\n";
const docs$2 = {
  setsStep: mergeStepDocs(markdown$3)
};
const markdown$2 = "Use snippet processing for data processing. The following parameters can be used during the conversion process:\n\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\n> It is an async function, so `await` is available inside.\n";
const markdown$1 = "### Snippet step\n\nThe snippet pipeline step use a snippet (in JavaScript syntax) to process the data. Conceptually, it can be understood as a function that\nperforms appropriate operations on the given parameters and finally returns the processed result to the memory context for further\nprocessing.\n\n#### Environment variables\n\nThis step does not use any environment variables.\n\n#### Step variables\n\nDefine the `snippet` attribute, which is a JavaScript script that will ultimately be executed as a JavaScript function. This function\naccepts the following input parameters:\n\n- `$factor`: The content portion of the request data, excluding context data,\n- `$request`: The entire request data, including both content and context,\n- `$helpers` or `$`: Data manipulation helpers.\n\n#### Returning\n\nThe snippet's return data follows these conventions:\n\n- If it returns `undefined`, `null`, or no value returned, the context of the entire pipeline is considered unchanged,\n- If it returns `$.$clearContextData()`, the context is considered cleared (this is actually a specific `Symbol` object that, apart from\n  serving as a flag, has no practical significance),\n- Other data is directly returned as the response data.\n\n> The returned data can still be further processed during the `Write to output` stage.\n\n${transformer}\n\n${errorHandles}\n";
const docs$1 = {
  stepSnippetSnippet: markdown$2,
  snippetStep: mergeStepDocs(markdown$1)
};
const markdown = "### Snowflake step\n\nThe snowflake pipeline step is used to generate a unique, incrementing sequence number. This sequence number is typically used for scenarios\nsuch as database primary keys or unique identifiers in memory. The sequence number is of type string and contains only numeric characters.\n\n> Monotonic increment is limited to within a single node.\n\n#### Environment variables\n\nThis step uses the following system environment variable definition:\n\n- `CFG_SNOWFLAKE_SHARD_ID`: A number between `0` and `1023`, optional, with a default value of `1`. In a multi-node scenario, each node\n  should be assigned a different shard id to ensure that the sequence numbers do not conflict.\n\n#### Step variables\n\nThis step does not use any step variables.\n\n#### Returning\n\nA string containing a unique serial number.\n\n> Typically, need to specify a merge property in the `Write to output` step for use in subsequent pipeline steps.\n\n${transformer}\n\n${errorHandles}\n";
const docs = {
  snowflakeStep: mergeStepDocs(markdown)
};
const HelpDocs = {
  ...docs$3,
  ...docs$a,
  ...docs$1,
  ...docs$6,
  ...docs$8,
  ...docs,
  ...docs$5,
  ...docs$2,
  ...docs$9,
  ...docs$7,
  ...docs$4
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
const CommonElementEditorStyles = {
  dropdown: { justifySelf: "start", width: "unset", minWidth: "min(200px, 100%)" }
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
    React.createElement(UnwrappedDropdown, { value, onValueChange, options: AllIgnoredOrArrayOptions, clearable: false, style: CommonElementEditorStyles.dropdown }),
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
    return React.createElement(UnwrappedDropdown, { value, onValueChange, options: ParseIgnoredOrDefaultOptions, clearable: false, style: CommonElementEditorStyles.dropdown });
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
    React.createElement(UnwrappedDropdown, { value: type, onValueChange: onTypeChanged, options: FilesOptions, clearable: false, style: CommonElementEditorStyles.dropdown }),
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
    return React.createElement(UnwrappedDropdown, { value: model.method ?? "", onValueChange, options, clearable: false, style: CommonElementEditorStyles.dropdown });
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
    React.createElement(UnwrappedDropdown, { value, onValueChange, options: AllIgnoredOrArrayOptions, clearable: false, style: CommonElementEditorStyles.dropdown }),
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
    return React.createElement(UnwrappedDropdown, { value, onValueChange, options, clearable: false, style: CommonElementEditorStyles.dropdown });
  },
  helpDoc: HelpDocs.pipelineType,
  children: [elementInitOnly, elementRoute, elementRequest, elementResponse]
};
const prepare$9 = (def) => {
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
  prepare: prepare$9,
  confirm: confirm$9,
  discard: discard$1,
  elements: [elementCode, elementEnabled, elementType]
};
var MergeType;
(function(MergeType2) {
  MergeType2[MergeType2["REPLACE"] = 0] = "REPLACE";
  MergeType2[MergeType2["UNBOX"] = 1] = "UNBOX";
  MergeType2[MergeType2["MERGE_AS_PROPERTY"] = 2] = "MERGE_AS_PROPERTY";
})(MergeType || (MergeType = {}));
var ErrorHandleType;
(function(ErrorHandleType2) {
  ErrorHandleType2[ErrorHandleType2["NONE"] = 0] = "NONE";
  ErrorHandleType2[ErrorHandleType2["SNIPPET"] = 1] = "SNIPPET";
  ErrorHandleType2[ErrorHandleType2["STEPS"] = 2] = "STEPS";
})(ErrorHandleType || (ErrorHandleType = {}));
const confirm$8 = (model, def, _file, options) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { assistant } = options;
  def.name = model.name;
  def.use = model.use;
  if ((_a = model.temporary) == null ? void 0 : _a.fromInputAsIs) {
    delete def.fromInput;
  } else {
    def.fromInput = model.fromInput;
  }
  if ((_b = model.temporary) == null ? void 0 : _b.toOutputAsIs) {
    delete def.toOutput;
  } else {
    def.toOutput = model.toOutput;
  }
  switch ((_c = model.temporary) == null ? void 0 : _c.mergeType) {
    case MergeType.MERGE_AS_PROPERTY:
      def.merge = model.merge;
      break;
    case MergeType.UNBOX:
      def.merge = true;
      break;
    case MergeType.REPLACE:
    default:
      delete def.merge;
      break;
  }
  const confirmErrorHandling = (name, use) => {
    var _a2;
    def.errorHandles = def.errorHandles ?? {};
    if (use === ErrorHandleType.STEPS) {
      if (def.errorHandles[name] != null && !Array.isArray(def.errorHandles[name])) {
        def.errorHandles[name] = [assistant.createDefaultStep()];
      }
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
  return true;
};
const StandardLinkSelectionKeyFrames = We`
    from {
        stroke-dashoffset: ${PlaygroundCssVars.LINK_SELECTED_STROKE_DASHOFFSET};
    }
    to {
        stroke-dashoffset: 0;
    }
`;
const StandardLinkSegmentPath = qe.path.attrs(({ selected, dasharray, selectedDasharray }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-link-segment-path",
    style: {
      "--selected-stroke-dasharray": selected ? selectedDasharray || PlaygroundCssVars.LINK_DEFAULT_SELECTED_STROKE_DASHARRAY : dasharray || void 0,
      "--selected-animation": selected ? "running" : "paused",
      "--selected-z-index": selected ? 1 : void 0
    }
  };
})`
    fill: none;
    pointer-events: auto;
    stroke-dasharray: var(--selected-stroke-dasharray);
    stroke-linecap: ${PlaygroundCssVars.LINK_STROKE_LINECAP};
    animation: ${StandardLinkSelectionKeyFrames} 1s linear infinite;
    animation-play-state: var(--selected-animation);
    z-index: var(--selected-z-index);
`;
const StandardLinkWidget = (props) => {
  const { link, engine, renderPoints: shouldRenderPoints, selected: onSelected } = props;
  const [selected, setSelected] = reactExports.useState(false);
  const refPaths = reactExports.useRef([]);
  reactExports.useEffect(() => {
    link.setRenderedPaths(refPaths.current.map((ref) => ref.current).filter(Boolean));
    return () => {
      link.setRenderedPaths([]);
    };
  }, [link]);
  const renderPoints = () => shouldRenderPoints ?? true;
  const generateRef = () => {
    const ref = reactExports.createRef();
    refPaths.current.push(ref);
    return ref;
  };
  const addPointToLink = (event, index) => {
    if (!event.shiftKey && !link.isLocked() && link.getPoints().length - 1 <= engine.getMaxNumberPointsPerLink()) {
      const position = engine.getRelativeMousePoint(event);
      const point = link.point(position.x, position.y, index);
      event.persist();
      event.stopPropagation();
      engine.getActionEventBus().fireAction({ event, model: point });
    }
  };
  const generatePoint = (point) => {
    return React.createElement(DefaultLinkPointWidget, { key: point.getID(), point, colorSelected: link.getOptions().selectedColor ?? "", color: link.getOptions().color });
  };
  const generateLink = (path, extraProps, id) => {
    return React.createElement(DefaultLinkSegmentWidget, { key: `link-${id}`, path, selected, diagramEngine: engine, factory: engine.getFactoryForLink(link), link, forwardRef: generateRef(), onSelection: setSelected, extras: extraProps });
  };
  const points = link.getPoints();
  const paths = [];
  refPaths.current = [];
  if (points.length === 2) {
    paths.push(generateLink(link.getSVGPath(), {
      onMouseDown: (event) => {
        onSelected == null ? void 0 : onSelected(event);
        addPointToLink(event, 1);
      }
    }, "0"));
    if (link.getTargetPort() == null) {
      paths.push(generatePoint(points[1]));
    }
  } else {
    for (let j = 0; j < points.length - 1; j++) {
      paths.push(generateLink(LinkWidget.generateLinePath(points[j], points[j + 1]), {
        "data-linkid": link.getID(),
        "data-point": j,
        onMouseDown: (event) => {
          onSelected == null ? void 0 : onSelected(event);
          addPointToLink(event, j + 1);
        }
      }, j));
    }
    if (renderPoints()) {
      for (let i = 1; i < points.length - 1; i++) {
        paths.push(generatePoint(points[i]));
      }
      if (link.getTargetPort() == null) {
        paths.push(generatePoint(points[points.length - 1]));
      }
    }
  }
  return React.createElement("g", { "data-default-link-test": link.getOptions().testName }, paths);
};
class StandardLinkFactory extends DefaultLinkFactory {
  constructor(type) {
    super(type);
  }
  generateReactWidget(event) {
    return React.createElement(StandardLinkWidget, { link: event.model, engine: this.engine });
  }
  generateLinkSegment(model, selected, path) {
    return React.createElement(StandardLinkSegmentPath, { selected, dasharray: this.getLinkSegmentDasharray(), selectedDasharray: this.getLinkSegmentSelectedDasharray(), stroke: selected ? model.getOptions().selectedColor : model.getOptions().color, strokeWidth: model.getOptions().width, d: path });
  }
  getLinkSegmentDasharray() {
    return PlaygroundCssVars.LINK_DEFAULT_STROKE_DASHARRAY;
  }
  getLinkSegmentSelectedDasharray() {
    return PlaygroundCssVars.LINK_DEFAULT_SELECTED_STROKE_DASHARRAY;
  }
}
const _EndOfMeJoinLinkModel = class _EndOfMeJoinLinkModel extends DefaultLinkModel {
  constructor() {
    super({ type: _EndOfMeJoinLinkModel.TYPE });
  }
  getSVGPath() {
    if (this.points.length == 2) {
      const sourceX = this.getFirstPoint().getX();
      const sourceY = this.getFirstPoint().getY();
      const targetX = this.getLastPoint().getX();
      const targetY = this.getLastPoint().getY();
      return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    }
  }
};
__publicField(_EndOfMeJoinLinkModel, "TYPE", "end-of-me-join-link");
let EndOfMeJoinLinkModel = _EndOfMeJoinLinkModel;
class EndOfMeJoinLinkFactory extends StandardLinkFactory {
  constructor() {
    super(EndOfMeJoinLinkModel.TYPE);
  }
  generateModel(_event) {
    return new EndOfMeJoinLinkModel();
  }
  getLinkSegmentDasharray() {
    return PlaygroundCssVars.LINK_END_OF_ME_JOIN_DASHARRAY;
  }
  getLinkSegmentSelectedDasharray() {
    return PlaygroundCssVars.LINK_END_OF_ME_JOIN_SELECTED_DASHARRAY;
  }
}
class OutgoingPortModel extends PortModel {
  constructor(type, name, alignment) {
    super({ type, name, alignment });
  }
  createLinkModel(extras) {
    return this.createOutgoingLinkModel(extras);
  }
  createOutgoingLinkModel(extras) {
    const link = this.createDefaultLinkModel(extras);
    link.setSourcePort(this);
    return link;
  }
  toLinkModelOptions(extras) {
    return extras == null ? void 0 : { extras };
  }
  createDefaultLinkModel(extras) {
    return new DefaultLinkModel(this.toLinkModelOptions(extras));
  }
}
const _NextStepPortModel = class _NextStepPortModel extends OutgoingPortModel {
  constructor() {
    super(_NextStepPortModel.TYPE, _NextStepPortModel.NAME, PortModelAlignment.BOTTOM);
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
class IncomingPortModel extends PortModel {
  constructor(type, name, alignment) {
    super({ type, name, alignment });
  }
  createLinkModel() {
    return this.createIncomingLinkModel();
  }
  createIncomingLinkModel() {
    const link = this.createDefaultLinkModel();
    link.setTargetPort(this);
    return link;
  }
  createDefaultLinkModel() {
    return new DefaultLinkModel();
  }
}
const _PreviousStepPortModel = class _PreviousStepPortModel extends IncomingPortModel {
  constructor() {
    super(_PreviousStepPortModel.TYPE, _PreviousStepPortModel.NAME, PortModelAlignment.TOP);
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
  const { required, defined, count, all, allAsBoolean = false, allAsGiven, caseTransform } = props;
  let icon;
  let badge = null;
  if (defined) {
    icon = React.createElement(PortChecked, null);
    if (count != null) {
      badge = React.createElement("span", { "data-role": "count", "data-case-transform": caseTransform }, count);
    } else if (all != null) {
      if (allAsBoolean) {
        if (all === true) {
          badge = React.createElement("span", { "data-role": "all", "data-case-transform": "up" }, Labels.YesChar);
        } else {
          badge = React.createElement("span", { "data-role": "all", "data-case-transform": "up" }, Labels.NoChar);
        }
      } else if (allAsGiven != null) {
        badge = React.createElement("span", { "data-role": "all", "data-case-transform": caseTransform }, allAsGiven);
      } else if (all === true) {
        badge = React.createElement("span", { "data-role": "all", "data-case-transform": "up" }, Labels.All);
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

        > span[data-role~=count],
        > span[data-role~=all] {
            background: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_DANGER_BACKGROUND};
        }
    }

    &[data-role~=first-sub-step] {
        border: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BORDER};
        background: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BACKGROUND};
    }

    > svg:first-child {
        height: 1em;
        width: 1em;
        margin-right: 6px;
    }

    > span[data-role~=count],
    > span[data-role~=all] {
        display: flex;
        position: relative;
        align-items: center;
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.6);
        font-size: 0.6em;
        padding: 0 8px;
        background: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_BACKGROUND};
        margin-left: 6px;
        border: ${PlaygroundCssVars.NODE_PRE_PORT_BADGE_BORDER};
        border-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.3);
    }

    > span[data-case-transform=caps] {
        text-transform: capitalize;
    }

    > span[data-case-transform=up] {
        text-transform: uppercase;
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

        > span[data-role~=count],
        > span[data-role~=all] {
            background: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_DANGER_BACKGROUND};
        }
    }

    &[data-role~=steps] {
        border: ${PlaygroundCssVars.NODE_PORT_STEPS_BORDER};
        background: ${PlaygroundCssVars.NODE_PORT_STEPS_BACKGROUND};
    }

    &[data-role~=catchable-error],
    &[data-role~=uncatchable-error],
    &[data-role~=exposed-error],
    &[data-role~=any-error] {
        border: ${PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER};
        background: ${PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND};
    }

    > svg:first-child {
        height: 1em;
        width: 1em;
        margin-right: 6px;
    }

    > span[data-role~=count],
    > span[data-role~=all] {
        display: flex;
        position: relative;
        align-items: center;
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.6);
        font-size: 0.6em;
        padding: 0 8px;
        background: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_BACKGROUND};
        margin-left: 6px;
        border: ${PlaygroundCssVars.NODE_POST_PORT_BADGE_BORDER};
        border-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} * 0.3);
    }

    > span[data-case-transform=caps] {
        text-transform: capitalize;
    }

    > span[data-case-transform=up] {
        text-transform: uppercase;
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
    max-width: ${PlaygroundCssVars.NODE_MAX_WIDTH}
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
    height: unset;
    min-height: ${CssVars.INPUT_HEIGHT};
    white-space: unset;
    overflow: unset;
    text-overflow: unset;
    padding: calc((${CssVars.INPUT_HEIGHT} - var(--font-size)) / 2) 0;
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
    height: unset;
    min-height: ${CssVars.INPUT_HEIGHT};
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
  endOfMe(node) {
    const port = this.getPort(PreviousStepPortModel.NAME);
    const link = new EndOfMeJoinLinkModel();
    link.setTargetPort(port);
    link.setSourcePort(node.getPort(NextStepPortModel.NAME));
    return link;
  }
  endOfSub(node) {
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
    __publicField(this, "assistant");
    __publicField(this, "firstSubStep", false);
    this.step = step;
    this.file = file;
    this.rest = rest;
    this.assistant = rest.assistant;
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
const StepNodeContainer = qe(NodeWrapper).attrs(({ "data-use": use }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-step-node",
    style: {
      "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
      "--border": PlaygroundCssVars[`NODE_STEP_${(use ?? "").trim().toUpperCase().replace(/-/g, "_")}_BORDER`] ?? PlaygroundCssVars.NODE_STEP_BORDER,
      "--background-color": PlaygroundCssVars.NODE_BACKGROUND
    }
  };
})``;
const StepNodeHeader = qe(NodeHeader).attrs(({ "data-use": use }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-step-node-header",
    style: {
      "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
      "--background": PlaygroundCssVars[`NODE_STEP_${(use ?? "").trim().toUpperCase().replace(/-/g, "_")}_TITLE_BACKGROUND`] ?? PlaygroundCssVars.NODE_STEP_TITLE_BACKGROUND,
      "--padding": PlaygroundCssVars.NODE_TITLE_PADDING
    }
  };
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
})`
`;
const StepNodeWidget = (props) => {
  const { node, engine } = props;
  const { fire } = usePlaygroundEventBus();
  const { step: def, file } = node;
  const { use } = def;
  const StepDefs = findStepDef(use);
  const onConfirm = (model) => {
    return StepDefs.confirm(model, def, file, {
      handlers: node.handlers,
      assistant: node.assistant
    });
  };
  const onDiscard = (model) => StepDefs.discard(model);
  const prepareModel = () => StepDefs.prepare(def);
  const onDoubleClicked = () => {
    fire(PlaygroundEventTypes.SHOW_EDIT_DIALOG, React.createElement(DialogContent, { helpDoc: StepDefs.helpDocs, prepare: prepareModel, confirm: onConfirm, discard: onDiscard, elements: StepDefs.properties, assistant: node.assistant }));
  };
  const isFirstSubStep = node.isFirstSubStep();
  return React.createElement(
    StepNodeContainer,
    { onDoubleClick: onDoubleClicked, "data-use": use },
    isFirstSubStep ? React.createElement(FirstSubStepPortWidget, { port: node.getPort(FirstSubStepPortModel.NAME), engine }) : React.createElement(PreviousStepPortWidget, { port: node.getPort(PreviousStepPortModel.NAME), engine }),
    React.createElement(
      StepNodeHeader,
      { "data-use": use },
      React.createElement(StepNodeTitle, null, (def.name ?? "").trim() || Labels.StepNodeNoname),
      React.createElement(NodeTitleSpreader, null),
      React.createElement(StepNodeSecondTitle, null, asBeautifiedUse(use))
    ),
    React.createElement(StepNodeBody, { "data-use": use }, StepDefs.ports.map(({ key, port: StepPort }) => {
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
    "--border": PlaygroundCssVars.NODE_JOIN_END_BORDER,
    "--background-color": PlaygroundCssVars.NODE_BACKGROUND
  }
})``;
const JoinEndNodeHeader = qe(NodeHeader).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-join-end-node-header",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--background": PlaygroundCssVars.NODE_JOIN_END_TITLE_BACKGROUND,
    "--padding": PlaygroundCssVars.NODE_TITLE_PADDING
  }
})``;
const JoinEndNodeTitle = qe(NodeTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-join-end-node-title",
  style: {
    "--color": PlaygroundCssVars.NODE_JOIN_END_TITLE_COLOR,
    "--font-size": PlaygroundCssVars.NODE_JOIN_END_TITLE_FONT_SIZE,
    "--font-weight": PlaygroundCssVars.NODE_JOIN_END_TITLE_FONT_WEIGHT
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
  constructor(def, rest) {
    super({ type: _StartNodeModel.TYPE }, rest.handlers);
    __publicField(this, "def");
    __publicField(this, "rest");
    __publicField(this, "assistant");
    this.def = def;
    this.rest = rest;
    this.assistant = rest.assistant;
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
  return React.createElement(PrePort, { label: Labels.ApiMethodLabel, required: true, defined: exists, all: exists, allAsGiven: `${method ?? ""}`.trim(), caseTransform: "up" });
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
    return FileDefs.confirm(model, def, node.handlers);
  };
  const onDiscard = (model) => FileDefs.discard(model);
  const prepareModel = () => FileDefs.prepare(def);
  const onDoubleClicked = () => {
    fire(PlaygroundEventTypes.SHOW_EDIT_DIALOG, React.createElement(DialogContent, { helpDoc: HelpDocs.pipeline, prepare: prepareModel, confirm: onConfirm, discard: onDiscard, elements: FileDefs.elements, assistant: node.assistant }));
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
  nodes: [],
  links: []
};
const initEngine = (engine) => {
  const portFactories = engine.getPortFactories();
  portFactories.registerFactory(new NextStepPortFactory());
  portFactories.registerFactory(new PreviousStepPortFactory());
  portFactories.registerFactory(new StepsPortFactory());
  portFactories.registerFactory(new CatchableErrorHandlePortFactory());
  portFactories.registerFactory(new UncatchableErrorHandlePortFactory());
  portFactories.registerFactory(new ExposedErrorHandlePortFactory());
  portFactories.registerFactory(new AnyErrorHandlePortFactory());
  portFactories.registerFactory(new FirstSubStepPortFactory());
  portFactories.registerFactory(new LastSubStepJoinPortFactory());
  Factories.ports.forEach((factory) => portFactories.registerFactory(factory));
  const nodeFactories = engine.getNodeFactories();
  nodeFactories.registerFactory(new StartNodeFactory());
  nodeFactories.registerFactory(new StepNodeFactory());
  nodeFactories.registerFactory(new EndNodeFactory());
  nodeFactories.registerFactory(new JoinEndNodeFactory());
  Factories.nodes.forEach((factory) => nodeFactories.registerFactory(factory));
  const linkFactories = engine.getLinkFactories();
  linkFactories.registerFactory(new StepsLinkFactory());
  linkFactories.registerFactory(new ErrorHandlesLinkFactory());
  linkFactories.registerFactory(new EndOfMeJoinLinkFactory());
  linkFactories.registerFactory(new LastSubStepJoinLinkFactory());
  Factories.links.forEach((factory) => linkFactories.registerFactory(factory));
};
const Defs = {};
const AllStepDefsAsArray = () => Object.values(Defs);
const registerStepDef = (def) => {
  Defs[def.use] = def;
};
const findStepDef = (use) => {
  return Defs[use];
};
class ToSubStepsLinkModel extends DefaultLinkModel {
  constructor(type, options) {
    super({ type, ...options ?? {} });
  }
  getSVGPath() {
    if (this.points.length == 2) {
      const sourceX = this.getFirstPoint().getX();
      const sourceY = this.getFirstPoint().getY();
      const targetX = this.getLastPoint().getX();
      const targetY = this.getLastPoint().getY();
      const centerX = this.computeCenterX(sourceX, targetX);
      const centerY = Math.min(sourceY, targetY) + Math.abs((sourceY - targetY) / 2);
      const radius = Math.min(DEFAULTS.diagram.linkArcRadius, Math.abs(sourceY - centerY));
      if (sourceY === targetY) {
        return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
      } else if (sourceY > targetY) {
        return [
          `M ${sourceX} ${sourceY}`,
          `L ${centerX - radius} ${sourceY}`,
          `A ${radius} ${radius} 0 0 0 ${centerX} ${sourceY - radius}`,
          `L ${centerX} ${targetY + radius}`,
          `A ${radius} ${radius} 0 0 1 ${centerX + radius} ${targetY}`,
          `L ${targetX} ${targetY}`
        ].join(" ");
      } else {
        return [
          `M ${sourceX} ${sourceY}`,
          `L ${centerX - radius} ${sourceY}`,
          `A ${radius} ${radius} 0 0 1 ${centerX} ${sourceY + radius}`,
          `L ${centerX} ${targetY - radius}`,
          `A ${radius} ${radius} 0 0 0 ${centerX + radius} ${targetY}`,
          `L ${targetX} ${targetY}`
        ].join(" ");
      }
    }
  }
  askPorts(node) {
    const { use } = node.step;
    const def = findStepDef(use);
    const ports = def.findSubPorts(node);
    const firstPort = ports[0];
    const linksOfFirstPort = Object.values(firstPort.getLinks());
    if (linksOfFirstPort.length === 0) {
      return { ports, hasStepsLink: false, stepsLinkCount: 0 };
    }
    const sourcePort = linksOfFirstPort[0].getSourcePort();
    if (!(sourcePort instanceof StepsPortModel)) {
      return { ports, hasStepsLink: false, stepsLinkCount: 0 };
    }
    return { ports, hasStepsLink: true, stepsLinkCount: linksOfFirstPort.length };
  }
  computeCenterX(sourceX, targetX) {
    const sourceNode = this.getSourcePort().getNode();
    const { ports, hasStepsLink, stepsLinkCount } = this.askPorts(sourceNode);
    const links = ports.map((port) => Object.values(port.getLinks())).flat();
    const minTargetX = links.map((link) => Math.max(link.getFirstPoint().getX(), link.getLastPoint().getX())).reduce((x1, x2) => Math.min(x1, x2));
    const absoluteCenterX = (minTargetX - Math.min(sourceX, targetX)) / 2;
    const nonStepsLinkCount = links.length - stepsLinkCount;
    const linkGutter = this.getGutterSize();
    const centerXStart = absoluteCenterX - linkGutter * (nonStepsLinkCount - 1) / 2;
    let myIndex = hasStepsLink ? links.indexOf(this) - stepsLinkCount : links.indexOf(this);
    if (myIndex < 0) {
      if (stepsLinkCount > 1 && nonStepsLinkCount > 0) {
        myIndex = -1;
      } else {
        myIndex = 0;
      }
    }
    return Math.min(sourceX, targetX) + centerXStart + (nonStepsLinkCount - myIndex - 1) * linkGutter;
  }
  getGutterSize() {
    return DEFAULTS.diagram.linkGutterSize;
  }
}
const _StepsLinkModel = class _StepsLinkModel extends ToSubStepsLinkModel {
  constructor(options) {
    super(_StepsLinkModel.TYPE, options);
  }
};
__publicField(_StepsLinkModel, "TYPE", "steps-link");
let StepsLinkModel = _StepsLinkModel;
class StepsLinkFactory extends StandardLinkFactory {
  constructor() {
    super(StepsLinkModel.TYPE);
  }
  generateModel(_event) {
    return new StepsLinkModel();
  }
  getLinkSegmentDasharray() {
    return PlaygroundCssVars.LINK_STEPS_DASHARRAY;
  }
  getLinkSegmentSelectedDasharray() {
    return PlaygroundCssVars.LINK_STEPS_SELECTED_DASHARRAY;
  }
}
const _ErrorHandlesLinkModel = class _ErrorHandlesLinkModel extends ToSubStepsLinkModel {
  constructor(options) {
    super(_ErrorHandlesLinkModel.TYPE, { selectedColor: PlaygroundCssVars.LINK_ERROR_HANDLES_SELECTED_COLOR, ...options ?? {} });
    this.setColor(PlaygroundCssVars.LINK_ERROR_HANDLES_COLOR);
  }
};
__publicField(_ErrorHandlesLinkModel, "TYPE", "error-handles-link");
let ErrorHandlesLinkModel = _ErrorHandlesLinkModel;
class ErrorHandlesLinkFactory extends StandardLinkFactory {
  constructor() {
    super(ErrorHandlesLinkModel.TYPE);
  }
  generateModel(_event) {
    return new ErrorHandlesLinkModel();
  }
  getLinkSegmentDasharray() {
    return PlaygroundCssVars.LINK_ERROR_HANDLES_DASHARRAY;
  }
  getLinkSegmentSelectedDasharray() {
    return PlaygroundCssVars.LINK_ERROR_HANDLES_SELECTED_DASHARRAY;
  }
}
const _LastSubStepJoinLinkModel = class _LastSubStepJoinLinkModel extends DefaultLinkModel {
  constructor() {
    super({ type: _LastSubStepJoinLinkModel.TYPE });
  }
  getSVGPath() {
    if (this.points.length == 2) {
      const sourceX = this.getFirstPoint().getX();
      const sourceY = this.getFirstPoint().getY();
      const targetX = this.getLastPoint().getX();
      const targetY = this.getLastPoint().getY();
      const radius = DEFAULTS.diagram.linkArcRadius;
      const { index, count } = this.getJoinIndex();
      if (index === count - 1) {
        return [
          `M ${sourceX} ${sourceY}`,
          `L ${sourceX} ${targetY - radius}`,
          `A ${radius} ${radius} 0 0 1 ${sourceX - radius} ${targetY}`,
          `L ${targetX} ${targetY}`
        ].join(" ");
      } else {
        const sinkingOffset = this.getSinkingOffset();
        const gutterSize = this.getGutterSize();
        const { firstX, firstY, secondX } = this.getTargetNodePositionBase();
        return [
          `M ${sourceX} ${sourceY}`,
          `L ${sourceX} ${sourceY + sinkingOffset - radius}`,
          `A ${radius} ${radius} 0 0 1 ${sourceX - radius} ${sourceY + sinkingOffset}`,
          `L ${firstX + gutterSize * (index + 1) + radius} ${sourceY + sinkingOffset}`,
          `A ${radius} ${radius} 0 0 0 ${firstX + gutterSize * (index + 1)} ${sourceY + sinkingOffset + radius}`,
          `L ${firstX + gutterSize * (index + 1)} ${firstY - gutterSize * (index + 1) - radius}`,
          `A ${radius} ${radius} 0 0 0 ${firstX + gutterSize * (index + 1) + radius} ${firstY - gutterSize * (index + 1)}`,
          `L ${secondX + gutterSize * (index + 1) - radius} ${firstY - gutterSize * (index + 1)}`,
          `A ${radius} ${radius} 0 0 1 ${secondX + gutterSize * (index + 1)} ${firstY - gutterSize * (index + 1) + radius}`,
          `L ${secondX + gutterSize * (index + 1)} ${targetY - radius}`,
          `A ${radius} ${radius} 0 0 1 ${secondX + gutterSize * (index + 1) - radius} ${targetY}`,
          `L ${targetX} ${targetY}`
        ].join(" ");
      }
    }
  }
  getJoinIndex() {
    const sourceY = this.getFirstPoint().getY();
    let index = 0;
    const links = Object.values(this.getTargetPort().getLinks());
    links.forEach((link) => {
      if (link.getFirstPoint().getY() < sourceY) {
        index++;
      }
    });
    return { index, count: links.length };
  }
  getSinkingOffset() {
    var _a, _b;
    const node = this.getSourcePort().getNode();
    const nodeBottom = node.getY() + node.height;
    const previousNode = [
      ...Object.values(((_a = node.getPort(PreviousStepPortModel.NAME)) == null ? void 0 : _a.getLinks()) ?? {}),
      ...Object.values(((_b = node.getPort(FirstSubStepPortModel.NAME)) == null ? void 0 : _b.getLinks()) ?? {})
    ][0].getSourcePort().getNode();
    const previousNodeBottom = previousNode.getY() + previousNode.height;
    if (nodeBottom <= previousNodeBottom) {
      return previousNodeBottom - nodeBottom + DEFAULTS.diagram.linkJoinEndSinkingOffset;
    } else {
      return DEFAULTS.diagram.linkJoinEndSinkingOffset;
    }
  }
  getGutterSize() {
    return DEFAULTS.diagram.linkJoinEndGutterSize;
  }
  getTargetNodePositionBase() {
    const node = this.getTargetPort().getNode();
    const previousPort = node.getPort(PreviousStepPortModel.NAME);
    const firstX = Object.values(previousPort.getLinks())[0].getLastPoint().getX();
    const firstY = node.getY();
    const secondX = node.getX() + node.width;
    return { firstX, firstY, secondX };
  }
};
__publicField(_LastSubStepJoinLinkModel, "TYPE", "last-sub-step-join-link");
let LastSubStepJoinLinkModel = _LastSubStepJoinLinkModel;
class LastSubStepJoinLinkFactory extends StandardLinkFactory {
  constructor() {
    super(LastSubStepJoinLinkModel.TYPE);
  }
  generateModel(_event) {
    return new LastSubStepJoinLinkModel();
  }
  getLinkSegmentDasharray() {
    return PlaygroundCssVars.LINK_LAST_SUB_STEP_JOIN_DASHARRAY;
  }
  getLinkSegmentSelectedDasharray() {
    return PlaygroundCssVars.LINK_LAST_SUB_STEP_JOIN_SELECTED_DASHARRAY;
  }
}
const useSubNodesFold = (options) => {
  var _a;
  const { model, property } = options;
  const forceUpdate = useForceUpdate();
  const def = model.step;
  const onClicked = () => {
    var _a2;
    if (def.$diagram == null) {
      def.$diagram = { [property]: ((_a2 = def.$diagram) == null ? void 0 : _a2[property]) ?? false };
    }
    def.$diagram[property] = !def.$diagram[property];
    forceUpdate();
    model.handlers.onChange();
  };
  return {
    fold: ((_a = def.$diagram) == null ? void 0 : _a[property]) ?? false,
    switchFold: onClicked
  };
};
const SubNodesPortContainer = qe.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_BORDER_WIDTH});
    right: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / -2 - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
    width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    background-color: var(--background-color);
    border: var(--border);
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    transition: width ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, right ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-fold=true], &:hover {
        right: calc(0px - ${PlaygroundCssVars.NODE_PORT_HEIGHT} - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
        width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT});

        > svg:first-child {
            width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
            opacity: 1;
        }
    }

    > svg:first-child {
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
        width: 0;
        opacity: 0;
        color: var(--icon-color);
        overflow: hidden;
        transition: width ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        &[data-icon=o23-fold-sub-nodes] {
            margin-left: -4px;
        }

        &[data-icon=o23-unfold-sub-nodes] {
            margin-left: -3px;
        }
    }

    > div:last-child {
        position: absolute;
        top: 0;
        left: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
        width: 0;
        height: 100%;
    }
`;
const _StepsPortModel = class _StepsPortModel extends OutgoingPortModel {
  constructor(name) {
    super(_StepsPortModel.TYPE, name, PortModelAlignment.RIGHT);
  }
  createDefaultLinkModel(extras) {
    return new StepsLinkModel(this.toLinkModelOptions(extras));
  }
};
__publicField(_StepsPortModel, "TYPE", "steps-port");
let StepsPortModel = _StepsPortModel;
class StepsPortFactory extends AbstractModelFactory {
  constructor() {
    super(StepsPortModel.TYPE);
  }
  generateModel(_event) {
    throw new Error("DO NOT use StepsPortFactory#generateModel.");
  }
}
const StepsPortContainer = qe(SubNodesPortContainer).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-steps-port",
  style: {
    "--background-color": PlaygroundCssVars.NODE_PORT_STEPS_BACKGROUND,
    "--border": PlaygroundCssVars.NODE_PORT_STEPS_BORDER,
    "--icon-color": PlaygroundCssVars.NODE_PORT_STEPS_ICON_COLOR
  }
})``;
const StepsPortWidget = (props) => {
  const { port, engine } = props;
  const model = port.getNode();
  const { fold, switchFold } = useSubNodesFold({ model, property: "$foldSubSteps" });
  return React.createElement(
    StepsPortContainer,
    { "data-fold": fold, onClick: switchFold },
    fold ? React.createElement(UnfoldSubNodes, null) : React.createElement(FoldSubNodes, null),
    React.createElement(PortWidget, { port, engine })
  );
};
const _FirstSubStepPortModel = class _FirstSubStepPortModel extends IncomingPortModel {
  constructor() {
    super(_FirstSubStepPortModel.TYPE, _FirstSubStepPortModel.NAME, PortModelAlignment.LEFT);
  }
};
__publicField(_FirstSubStepPortModel, "TYPE", "first-sub-step-port");
__publicField(_FirstSubStepPortModel, "NAME", "first-sub-step");
let FirstSubStepPortModel = _FirstSubStepPortModel;
class FirstSubStepPortFactory extends AbstractModelFactory {
  constructor() {
    super(FirstSubStepPortModel.TYPE);
  }
  generateModel(_event) {
    throw new Error("DO NOT use FirstSubStepPortFactory#generateModel.");
  }
}
const FirstSubStepPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-first-sub-step-port" })`
    display: flex;
    position: absolute;
    top: calc(${CssVars.INPUT_HEIGHT} / 2 - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    left: calc(-1 * (${PlaygroundCssVars.NODE_PORT_RADIUS} + ${PlaygroundCssVars.NODE_BORDER_WIDTH}));
    width: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    height: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    background-color: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BORDER};
    border-top-left-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    border-bottom-left-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};

    > div:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
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
const _LastSubStepJoinPortModel = class _LastSubStepJoinPortModel extends IncomingPortModel {
  constructor() {
    super(_LastSubStepJoinPortModel.TYPE, _LastSubStepJoinPortModel.NAME, PortModelAlignment.RIGHT);
  }
  createDefaultLinkModel() {
    return new LastSubStepJoinLinkModel();
  }
};
__publicField(_LastSubStepJoinPortModel, "TYPE", "last-sub-step-join-port");
__publicField(_LastSubStepJoinPortModel, "NAME", "last-sub-step-join");
let LastSubStepJoinPortModel = _LastSubStepJoinPortModel;
class LastSubStepJoinPortFactory extends AbstractModelFactory {
  constructor() {
    super(LastSubStepJoinPortModel.TYPE);
  }
  generateModel(_event) {
    throw new Error("DO NOT use LastSubStepJoinPortFactory#generateModel.");
  }
}
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
class ErrorHandlesPortModel extends OutgoingPortModel {
  constructor(type, name, alignment) {
    super(type, name, alignment);
  }
}
const _CatchableErrorHandlePortModel = class _CatchableErrorHandlePortModel extends ErrorHandlesPortModel {
  constructor() {
    super(_CatchableErrorHandlePortModel.TYPE, _CatchableErrorHandlePortModel.NAME, PortModelAlignment.RIGHT);
  }
  createDefaultLinkModel(extras) {
    return new ErrorHandlesLinkModel(this.toLinkModelOptions(extras));
  }
};
__publicField(_CatchableErrorHandlePortModel, "TYPE", "catchable-error-handle-port");
__publicField(_CatchableErrorHandlePortModel, "NAME", "catchable-error-handle");
let CatchableErrorHandlePortModel = _CatchableErrorHandlePortModel;
class CatchableErrorHandlePortFactory extends AbstractModelFactory {
  constructor() {
    super(CatchableErrorHandlePortModel.TYPE);
  }
  generateModel(_event) {
    throw new Error("DO NOT use CatchableErrorHandlePortFactory#generateModel.");
  }
}
const CatchableErrorHandlePortContainer = qe(SubNodesPortContainer).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-catchable-error-port",
  style: {
    "--background-color": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND,
    "--border": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER,
    "--icon-color": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_ICON_COLOR
  }
})``;
const CatchableErrorHandlePortWidget = (props) => {
  const { port, engine } = props;
  const model = port.getNode();
  const { fold, switchFold } = useSubNodesFold({ model, property: "$foldCatchable" });
  return React.createElement(
    CatchableErrorHandlePortContainer,
    { "data-fold": fold, onClick: switchFold },
    fold ? React.createElement(UnfoldSubNodes, null) : React.createElement(FoldSubNodes, null),
    React.createElement(PortWidget, { port, engine })
  );
};
const _UncatchableErrorHandlePortModel = class _UncatchableErrorHandlePortModel extends ErrorHandlesPortModel {
  constructor() {
    super(_UncatchableErrorHandlePortModel.TYPE, _UncatchableErrorHandlePortModel.NAME, PortModelAlignment.RIGHT);
  }
  createDefaultLinkModel(extras) {
    return new ErrorHandlesLinkModel(this.toLinkModelOptions(extras));
  }
};
__publicField(_UncatchableErrorHandlePortModel, "TYPE", "uncatchable-error-handle-port");
__publicField(_UncatchableErrorHandlePortModel, "NAME", "uncatchable-error-handle");
let UncatchableErrorHandlePortModel = _UncatchableErrorHandlePortModel;
class UncatchableErrorHandlePortFactory extends AbstractModelFactory {
  constructor() {
    super(UncatchableErrorHandlePortModel.TYPE);
  }
  generateModel(_event) {
    throw new Error("DO NOT use UncatchableErrorHandlePortFactory#generateModel.");
  }
}
const UncatchableErrorHandlePortContainer = qe(SubNodesPortContainer).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-uncatchable-error-port",
  style: {
    "--background-color": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND,
    "--border": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER,
    "--icon-color": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_ICON_COLOR
  }
})``;
const UncatchableErrorHandlePortWidget = (props) => {
  const { port, engine } = props;
  const model = port.getNode();
  const { fold, switchFold } = useSubNodesFold({ model, property: "$foldUncatchable" });
  return React.createElement(
    UncatchableErrorHandlePortContainer,
    { "data-fold": fold, onClick: switchFold },
    fold ? React.createElement(UnfoldSubNodes, null) : React.createElement(FoldSubNodes, null),
    React.createElement(PortWidget, { port, engine })
  );
};
const _ExposedErrorHandlePortModel = class _ExposedErrorHandlePortModel extends ErrorHandlesPortModel {
  constructor() {
    super(_ExposedErrorHandlePortModel.TYPE, _ExposedErrorHandlePortModel.NAME, PortModelAlignment.RIGHT);
  }
  createDefaultLinkModel(extras) {
    return new ErrorHandlesLinkModel(this.toLinkModelOptions(extras));
  }
};
__publicField(_ExposedErrorHandlePortModel, "TYPE", "exposed-error-handle-port");
__publicField(_ExposedErrorHandlePortModel, "NAME", "exposed-error-handle");
let ExposedErrorHandlePortModel = _ExposedErrorHandlePortModel;
class ExposedErrorHandlePortFactory extends AbstractModelFactory {
  constructor() {
    super(ExposedErrorHandlePortModel.TYPE);
  }
  generateModel(_event) {
    throw new Error("DO NOT use ExposedErrorHandlePortFactory#generateModel.");
  }
}
const ExposedErrorHandlePortContainer = qe(SubNodesPortContainer).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-exposed-error-port",
  style: {
    "--background-color": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND,
    "--border": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER,
    "--icon-color": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_ICON_COLOR
  }
})``;
const ExposedErrorHandlePortWidget = (props) => {
  const { port, engine } = props;
  const model = port.getNode();
  const { fold, switchFold } = useSubNodesFold({ model, property: "$foldExposed" });
  return React.createElement(
    ExposedErrorHandlePortContainer,
    { "data-fold": fold, onClick: switchFold },
    fold ? React.createElement(UnfoldSubNodes, null) : React.createElement(FoldSubNodes, null),
    React.createElement(PortWidget, { port, engine })
  );
};
const _AnyErrorHandlePortModel = class _AnyErrorHandlePortModel extends ErrorHandlesPortModel {
  constructor() {
    super(_AnyErrorHandlePortModel.TYPE, _AnyErrorHandlePortModel.NAME, PortModelAlignment.RIGHT);
  }
  createDefaultLinkModel(extras) {
    return new ErrorHandlesLinkModel(this.toLinkModelOptions(extras));
  }
};
__publicField(_AnyErrorHandlePortModel, "TYPE", "any-error-handle-port");
__publicField(_AnyErrorHandlePortModel, "NAME", "any-error-handle");
let AnyErrorHandlePortModel = _AnyErrorHandlePortModel;
class AnyErrorHandlePortFactory extends AbstractModelFactory {
  constructor() {
    super(AnyErrorHandlePortModel.TYPE);
  }
  generateModel(_event) {
    throw new Error("DO NOT use AnyErrorHandlePortFactory#generateModel.");
  }
}
const AnyErrorHandlePortContainer = qe(SubNodesPortContainer).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-any-error-port",
  style: {
    "--background-color": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND,
    "--border": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER,
    "--icon-color": PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_ICON_COLOR
  }
})``;
const AnyErrorHandlePortWidget = (props) => {
  const { port, engine } = props;
  const model = port.getNode();
  const { fold, switchFold } = useSubNodesFold({ model, property: "$foldAny" });
  return React.createElement(
    AnyErrorHandlePortContainer,
    { "data-fold": fold, onClick: switchFold },
    fold ? React.createElement(UnfoldSubNodes, null) : React.createElement(FoldSubNodes, null),
    React.createElement(PortWidget, { port, engine })
  );
};
const PortFromInput = (props) => {
  const { step: def } = props;
  const { fromInput } = def;
  const exists = VUtils.isNotBlank(fromInput);
  if (!exists) {
    return null;
  }
  return React.createElement(PrePort, { label: Labels.StepFromInput, required: false, defined: true, all: true, allAsBoolean: true });
};
const StepsPortName = "steps";
const PortSteps = (props) => {
  const { node, engine } = props;
  return React.createElement(
    PostPort,
    { label: Labels.StepSteps, required: false, defined: true, "data-role": "steps" },
    React.createElement(StepsPortWidget, { port: node.getPort(StepsPortName), engine })
  );
};
const PortCatchableError = (props) => {
  const { node, engine, step: def } = props;
  const { errorHandles: { catchable } = {} } = def;
  const exists = catchable != null && Array.isArray(catchable);
  if (!exists) {
    return null;
  }
  return React.createElement(
    PostPort,
    { label: Labels.StepHandleCatchableError, required: false, defined: true, "data-role": "catchable-error" },
    React.createElement(CatchableErrorHandlePortWidget, { port: node.getPort(CatchableErrorHandlePortModel.NAME), engine })
  );
};
const PortUncatchableError = (props) => {
  const { node, engine, step: def } = props;
  const { errorHandles: { uncatchable } = {} } = def;
  const exists = uncatchable != null && Array.isArray(uncatchable);
  if (!exists) {
    return null;
  }
  return React.createElement(
    PostPort,
    { label: Labels.StepHandleUncatchableError, required: false, defined: true, "data-role": "uncatchable-error" },
    React.createElement(UncatchableErrorHandlePortWidget, { port: node.getPort(UncatchableErrorHandlePortModel.NAME), engine })
  );
};
const PortExposedError = (props) => {
  const { node, engine, step: def } = props;
  const { errorHandles: { exposed } = {} } = def;
  const exists = exposed != null && Array.isArray(exposed);
  if (!exists) {
    return null;
  }
  return React.createElement(
    PostPort,
    { label: Labels.StepHandleExposedError, required: false, defined: true, "data-role": "exposed-error" },
    React.createElement(ExposedErrorHandlePortWidget, { port: node.getPort(ExposedErrorHandlePortModel.NAME), engine })
  );
};
const PortAnyError = (props) => {
  const { node, engine, step: def } = props;
  const { errorHandles: { any } = {} } = def;
  const exists = any != null && Array.isArray(any);
  if (!exists) {
    return null;
  }
  return React.createElement(
    PostPort,
    { label: Labels.StepHandleAnyError, required: false, defined: true, "data-role": "any-error" },
    React.createElement(AnyErrorHandlePortWidget, { port: node.getPort(AnyErrorHandlePortModel.NAME), engine })
  );
};
const PortToOutput = (props) => {
  const { step: def } = props;
  const { toOutput } = def;
  const exists = VUtils.isNotBlank(toOutput);
  if (!exists) {
    return null;
  }
  return React.createElement(PostPort, { label: Labels.StepToOutput, required: false, defined: true, all: true, allAsBoolean: true });
};
const PortMerge = (props) => {
  const { step: def } = props;
  const { merge } = def;
  if (merge == null) {
    return null;
  } else if (merge === false) {
    return null;
  } else if (merge === true) {
    return React.createElement(PostPort, { label: Labels.StepMergeReplace, required: false, defined: true });
  } else if (VUtils.isBlank(merge)) {
    return null;
  } else {
    return React.createElement(PostPort, { label: Labels.StepMergeAsProperty, required: false, defined: true, all: true, allAsGiven: merge.trim() });
  }
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
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (isPipelineDef(def)) {
    const diagramDef = def;
    if (((_b = (_a = diagramDef.$diagram) == null ? void 0 : _a.$virtualStep) == null ? void 0 : _b.$x) != null && ((_d = (_c = diagramDef.$diagram) == null ? void 0 : _c.$virtualStep) == null ? void 0 : _d.$y) != null) {
      return { x: diagramDef.$diagram.$virtualStep.$x, y: diagramDef.$diagram.$virtualStep.$y, appointed: true };
    } else {
      return { x: START_X, y: START_Y, appointed: false };
    }
  } else {
    const diagramDef = def;
    if (((_e = diagramDef.$diagram) == null ? void 0 : _e.$x) != null && ((_f = diagramDef.$diagram) == null ? void 0 : _f.$y) != null) {
      return { x: (_g = diagramDef.$diagram) == null ? void 0 : _g.$x, y: (_h = diagramDef.$diagram) == null ? void 0 : _h.$y, appointed: true };
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
  const startNode = new StartNodeModel(file, { handlers: nodeHandlers, assistant: handlers.assistant });
  setNodePosition(startNode, () => askStartNodePosition(file));
  allNodes.push(startNode);
  let previousNode = startNode;
  if (isPipelineDef(file)) {
    const steps = file.steps ?? [];
    if (steps.length === 0) {
      const step = handlers.assistant.createDefaultStep();
      steps.push(step);
      file.steps = steps;
    }
    previousNode = steps.reduce((previousNode2, step) => {
      return createStepNode(step, file, {
        type: StepNodeEntityType.NORMAL,
        handlers: nodeHandlers,
        assistant: handlers.assistant,
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
      assistant: handlers.assistant,
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
    const ports = ((_a = findStepDef(use)) == null ? void 0 : _a.findSubPorts(node)) ?? [];
    ports.map((port2) => ({ port: port2, links: Object.values(port2.getLinks()) })).filter(({ links }) => links.length !== 0).forEach(({ links }, portIndex) => {
      links.sort((l1, l2) => {
        var _a2, _b;
        return (((_a2 = l1.getOptions().extras) == null ? void 0 : _a2.index) ?? 0) - (((_b = l2.getOptions().extras) == null ? void 0 : _b.index) ?? 0);
      }).forEach((link, linkIndex) => {
        y = y + (portIndex === 0 && linkIndex === 0 ? 0 : 1);
        hasSubSteps = true;
        const subNode = link.getTargetPort().getNode();
        grid[x + 1] = grid[x + 1] ?? [];
        grid[x + 1][y] = {
          node: subNode,
          x: subNode.getPosition().x,
          y: subNode.getPosition().y,
          maxWidth: -1,
          maxHeight: -1,
          top: -1,
          left: -1
        };
        y = buildGrid(subNode, grid, x + 1, y);
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
  const { serializer, assistant, replace, syncContentToStateRef, notifyContentChanged } = options;
  return {
    serialize: (def) => serializer.stringify(def),
    assistant: {
      createDefaultStep: (assistant == null ? void 0 : assistant.createDefaultStep) ?? DEFAULTS.createDefaultStep,
      askRefPipelines: (assistant == null ? void 0 : assistant.askRefPipelines) ?? (() => []),
      askRefSteps: (assistant == null ? void 0 : assistant.askRefSteps) ?? (() => []),
      askSystemsForHttp: (assistant == null ? void 0 : assistant.askSystemsForHttp) ?? (() => [])
    },
    onContentChange: (serialize) => {
      const content = syncContentToStateRef(serialize());
      replace(() => {
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
    overflow: hidden;

    &[data-diagram-status=paint],
    &[data-diagram-status=paint-on-position] {
        > div.o23-playground-editor-content {
            //opacity: 0;
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

    > div.o23-playground-editor-content-backend {
        position: absolute;
        left: 100%;
        // Width is necessary; 
        // otherwise, it will cause the node width to be rendered incorrectly,
        // ultimately resulting in the connections not being straight.
        width: 100%;
        opacity: 0;
        user-select: none;
        pointer-events: none;
    }
`;
const EditorToolbar = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-editor-toolbar" })`
    display: flex;
    position: absolute;
    align-items: center;
    top: ${PlaygroundCssVars.EDITOR_TOOLBAR_GUTTER_SIZE};
    right: ${PlaygroundCssVars.EDITOR_TOOLBAR_GUTTER_SIZE};
    height: ${PlaygroundCssVars.EDITOR_TOOLBAR_HEIGHT};
    border-radius: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER_RADIUS};
    border: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER};
    background-color: ${CssVars.BACKGROUND_COLOR};
    overflow: hidden;
    transition: border-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        border-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};

        > span[data-w=o23-playground-editor-toolbar-button]:not(:hover) {
            color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};
        }
    }
`;
const EditorToolbarButton = qe.span.attrs({ [DOM_KEY_WIDGET]: "o23-playground-editor-toolbar-button" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_WIDTH};
    height: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_HEIGHT};
    color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_COLOR};
    cursor: pointer;
    transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:not(:last-child) {
        border-right: ${PlaygroundCssVars.EDITOR_TOOLBAR_BORDER};
    }

    &:hover {
        color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_COLOR};
        background-color: ${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_ACTIVE_BACKGROUND_COLOR};
    }

    > svg {
        height: calc(${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_HEIGHT} / 3 * 2);

        &[data-icon=o23-origin-size] {
            height: calc(${PlaygroundCssVars.EDITOR_TOOLBAR_BUTTON_HEIGHT} / 3 * 2 - 2px);
            margin-top: 2px;
        }
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
  EditorKernelDiagramStatus2["PAINT_ON_POSITION"] = "paint-on-position";
  EditorKernelDiagramStatus2["IN_SERVICE"] = "in-service";
})(EditorKernelDiagramStatus || (EditorKernelDiagramStatus = {}));
const parseContent = (parser, content) => {
  const def = parser.parse(content ?? "");
  if (VUtils.isBlank(def.type)) {
    def.type = "pipeline";
  }
  return def;
};
const createDiagramModel = (options) => {
  const { def, serializer, assistant, replace, writeContentToState, onContentChanged } = options;
  const handlers = createDiagramHandlers({
    serializer,
    assistant,
    replace,
    syncContentToStateRef: (content) => {
      writeContentToState(content);
      return content;
    },
    notifyContentChanged: onContentChanged
  });
  return createDiagramNodes(def, handlers);
};
const createDiagramEngine = () => {
  const engine = createEngine({
    registerDefaultPanAndZoomCanvasAction: false,
    registerDefaultZoomCanvasAction: false
  });
  initEngine(engine);
  const model = createLockedDiagramModel();
  model.setLocked(true);
  engine.setModel(model);
  return engine;
};
const firstPaint = (options) => {
  const { content, serializer, deserializer, assistant, replace, writeContentToState, onContentChanged } = options;
  const engine = createDiagramEngine();
  const engineBackend = createDiagramEngine();
  try {
    const def = parseContent(deserializer, content ?? "");
    const model = createDiagramModel({
      def,
      serializer,
      assistant,
      replace,
      writeContentToState,
      onContentChanged
    });
    engineBackend.setModel(model);
    return {
      engine,
      engineBackend,
      content,
      def,
      serializer,
      deserializer,
      diagramStatus: EditorKernelDiagramStatus.PAINT
    };
  } catch (e) {
    console.error(e);
    engine.setModel(createLockedDiagramModel());
    return {
      engine,
      engineBackend,
      content,
      serializer,
      deserializer,
      message: e.message,
      diagramStatus: EditorKernelDiagramStatus.IGNORED
    };
  }
};
const paintErrorDiagram = (options) => {
  const { error, stateRef, content, serializer, deserializer } = options;
  console.error(error);
  stateRef.current.content = content;
  stateRef.current.serializer = serializer;
  stateRef.current.deserializer = deserializer;
  delete stateRef.current.def;
  stateRef.current.engine.setModel(createLockedDiagramModel());
  stateRef.current.engineBackend.setModel(createLockedDiagramModel());
  stateRef.current.message = error.message;
  stateRef.current.diagramStatus = EditorKernelDiagramStatus.IGNORED;
};
const paint = (options) => {
  const { stateRef, replace, onStateContentChanged, onContentChanged } = options;
  const content = options.content();
  const serializer = options.serializer();
  const deserializer = options.deserializer();
  const assistant = options.assistant();
  try {
    const def = parseContent(deserializer, content ?? "");
    const model = createDiagramModel({
      def,
      serializer,
      assistant,
      replace,
      writeContentToState: (content2) => {
        stateRef.current.content = content2;
        (async () => await onStateContentChanged())();
      },
      onContentChanged
    });
    stateRef.current.content = content;
    stateRef.current.serializer = serializer;
    stateRef.current.deserializer = deserializer;
    stateRef.current.def = def;
    stateRef.current.engineBackend.setModel(model);
    delete stateRef.current.message;
    stateRef.current.diagramStatus = EditorKernelDiagramStatus.PAINT;
  } catch (e) {
    paintErrorDiagram({ error: e, stateRef, content, serializer, deserializer });
  }
};
const repaint = (options) => {
  const { stateRef, replace, onStateContentChanged, onContentChanged } = options;
  const def = stateRef.current.def;
  const serializer = stateRef.current.serializer;
  const assistant = options.assistant();
  try {
    const model = createDiagramModel({
      def,
      serializer,
      assistant,
      replace,
      writeContentToState: (content) => {
        stateRef.current.content = content;
        (async () => await onStateContentChanged())();
      },
      onContentChanged
    });
    stateRef.current.engineBackend.setModel(model);
    stateRef.current.diagramStatus = EditorKernelDiagramStatus.PAINT_ON_POSITION;
  } catch (e) {
    paintErrorDiagram({
      error: e,
      stateRef,
      content: stateRef.current.content,
      serializer: stateRef.current.serializer,
      deserializer: stateRef.current.deserializer
    });
  }
};
const Toolbar = (props) => {
  const { engine, def, serializer, allowUploadFile, allowDownloadFile, allowDownloadImage } = props;
  const ref = reactExports.useRef(null);
  const { fire } = usePlaygroundEventBus();
  const [state, setState] = reactExports.useState({ max: false, zen: false });
  reactExports.useEffect(() => {
    const onFullScreenChanged = () => {
      if (document.fullscreenElement == null) {
        setState({ zen: false, max: false });
      }
    };
    window.addEventListener("fullscreenchange", onFullScreenChanged);
    return () => {
      window.removeEventListener("fullscreenchange", onFullScreenChanged);
    };
  }, []);
  reactExports.useEffect(() => {
    const wrapper = ref.current.parentElement.parentElement;
    switch (true) {
      case state.zen:
        wrapper.setAttribute("data-diagram-work-mode", "zen");
        document.documentElement.requestFullscreen && document.documentElement.requestFullscreen({ navigationUI: "hide" });
        break;
      case state.max:
        wrapper.setAttribute("data-diagram-work-mode", "max");
        break;
      case !state.max:
        wrapper.removeAttribute("data-diagram-work-mode");
        if (document.fullscreenElement != null) {
          document.exitFullscreen && document.exitFullscreen();
        }
        break;
    }
  }, [state.max, state.zen]);
  const zoomTo = (factor) => {
    engine.getModel().setZoomLevel(factor);
    engine.repaintCanvas();
  };
  const onZoomInClicked = () => {
    zoomTo(engine.getModel().getZoomLevel() + 5);
  };
  const onZoomOutClicked = () => {
    zoomTo(engine.getModel().getZoomLevel() - 5);
  };
  const onOriginSizeClicked = () => {
    zoomTo(100);
  };
  const onFitCanvasClicked = () => {
    engine.zoomToFit();
  };
  const onDownloadImageClicked = async () => {
    const node = ref.current.parentElement.querySelector("div.o23-playground-editor-content");
    node.style.overflow = "visible";
    const svgNode = node.querySelector("svg");
    const transform = svgNode.style.transform;
    const divNode = node.querySelector("div");
    svgNode.style.transform = "";
    divNode.style.transform = "";
    const dataUrl = await dom2image.toPng(node, { quality: 1, bgcolor: "white" });
    svgNode.style.transform = transform;
    divNode.style.transform = transform;
    node.style.overflow = "";
    const link = document.createElement("a");
    link.download = `${(def == null ? void 0 : def.code) || "no-code"}-diagram.png`;
    link.href = dataUrl;
    link.click();
  };
  const onDownloadFileClicked = async () => {
    const link = document.createElement("a");
    link.download = `${(def == null ? void 0 : def.code) || "no-code"}-config.${serializer.extname()}`;
    link.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(serializer.stringify(def));
    link.click();
  };
  const onUploadFileClicked = async () => {
    const file = document.createElement("input");
    file.setAttribute("type", "file");
    file.setAttribute("accept", ".yml,.yaml");
    file.setAttribute("multiple", "false");
    file.addEventListener("change", () => {
      if (file.files.length == 1) {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result;
          fire(PlaygroundEventTypes.RESET_CONTENT, content);
        };
        reader.readAsText(file.files[0]);
      }
    });
    file.click();
  };
  const onMaxClicked = () => setState((state2) => ({ ...state2, max: true }));
  const onMinClicked = () => setState((state2) => ({ ...state2, max: false }));
  const onZenClicked = () => setState({ zen: true, max: true });
  const onWindowClicked = () => {
    document.exitFullscreen && document.exitFullscreen();
    setState({ zen: false, max: false });
  };
  return React.createElement(
    EditorToolbar,
    { ref },
    React.createElement(
      EditorToolbarButton,
      { onClick: onZoomInClicked },
      React.createElement(ZoomIn, null)
    ),
    React.createElement(
      EditorToolbarButton,
      { onClick: onZoomOutClicked },
      React.createElement(ZoomOut, null)
    ),
    React.createElement(
      EditorToolbarButton,
      { onClick: onOriginSizeClicked },
      React.createElement(OriginSize, null)
    ),
    React.createElement(
      EditorToolbarButton,
      { onClick: onFitCanvasClicked },
      React.createElement(FitCanvas, null)
    ),
    allowDownloadImage ? React.createElement(
      EditorToolbarButton,
      { onClick: onDownloadImageClicked },
      React.createElement(DownloadImage, null)
    ) : null,
    allowDownloadFile ? React.createElement(
      EditorToolbarButton,
      { onClick: onDownloadFileClicked },
      React.createElement(DownloadFile, null)
    ) : null,
    allowUploadFile ? React.createElement(
      EditorToolbarButton,
      { onClick: onUploadFileClicked },
      React.createElement(UploadFile, null)
    ) : null,
    state.max ? null : React.createElement(
      EditorToolbarButton,
      { onClick: onMaxClicked },
      React.createElement(Max, null)
    ),
    state.max && !state.zen ? React.createElement(
      EditorToolbarButton,
      { onClick: onMinClicked },
      React.createElement(Min, null)
    ) : null,
    state.zen ? null : React.createElement(
      EditorToolbarButton,
      { onClick: onZenClicked },
      React.createElement(Zen, null)
    ),
    state.zen ? React.createElement(
      EditorToolbarButton,
      { onClick: onWindowClicked },
      React.createElement(Window, null)
    ) : null
  );
};
const EditorKernel = (props) => {
  const { content, assistant, serializer, deserializer, allowUploadFile, allowDownloadFile, allowDownloadImage } = props;
  const wrapperRef = reactExports.useRef(null);
  const { on, off, fire } = usePlaygroundEventBus();
  const { replace } = useThrottler();
  const stateRef = reactExports.useRef(firstPaint({
    content,
    serializer,
    deserializer,
    assistant,
    replace,
    writeContentToState: (content2) => {
      stateRef.current.content = content2;
      (async () => {
        fire(PlaygroundEventTypes.REPAINT);
      })();
    },
    onContentChanged: (content2) => {
      fire(PlaygroundEventTypes.CONTENT_CHANGED, content2);
    }
  }));
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    if (serializer === stateRef.current.serializer && deserializer === stateRef.current.deserializer && content === stateRef.current.content) {
      return;
    }
    paint({
      serializer: () => serializer,
      deserializer: () => deserializer,
      assistant: () => assistant,
      content: () => content,
      stateRef,
      replace,
      onStateContentChanged: async () => {
        fire(PlaygroundEventTypes.REPAINT);
      },
      onContentChanged: (content2) => {
        fire(PlaygroundEventTypes.CONTENT_CHANGED, content2);
      }
    });
    forceUpdate();
  }, [fire, replace, forceUpdate, serializer, deserializer, assistant, content]);
  reactExports.useEffect(() => {
    if (![
      EditorKernelDiagramStatus.PAINT,
      EditorKernelDiagramStatus.PAINT_ON_POSITION
    ].includes(stateRef.current.diagramStatus)) {
      return;
    }
    const backendModel = stateRef.current.engineBackend.getModel();
    const grid = [];
    const nodes = backendModel.getNodes();
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
    const { startTop, startLeft, rowGap, columnGap } = DEFAULTS.diagram;
    computeGrid(grid, startTop, startLeft, rowGap, columnGap);
    const newModel = cloneDiagramNodes(backendModel);
    if (EditorKernelDiagramStatus.PAINT_ON_POSITION === stateRef.current.diagramStatus) {
      const model = stateRef.current.engine.getModel();
      const offsetX = model.getOffsetX();
      const offsetY = model.getOffsetY();
      const zoom = model.getZoomLevel();
      newModel.setOffset(offsetX, offsetY);
      newModel.setZoomLevel(zoom);
    }
    stateRef.current.engine.setModel(newModel);
    stateRef.current.engineBackend.setModel(createLockedDiagramModel());
    stateRef.current.diagramStatus = EditorKernelDiagramStatus.IN_SERVICE;
    forceUpdate();
  }, [forceUpdate, stateRef.current.diagramStatus]);
  reactExports.useEffect(() => {
    const onRepaint = () => {
      repaint({
        assistant: () => assistant,
        stateRef,
        replace,
        onStateContentChanged: async () => {
          fire(PlaygroundEventTypes.REPAINT);
        },
        onContentChanged: (content2) => {
          fire(PlaygroundEventTypes.CONTENT_CHANGED, content2);
        }
      });
      forceUpdate();
    };
    on(PlaygroundEventTypes.REPAINT, onRepaint);
    return () => {
      off(PlaygroundEventTypes.REPAINT, onRepaint);
    };
  }, [on, off, fire, replace, forceUpdate, assistant]);
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
        React.createElement(CanvasWidget, { engine: stateRef.current.engineBackend, className: "o23-playground-editor-content-backend" }),
        React.createElement(CanvasWidget, { engine: stateRef.current.engine, className: "o23-playground-editor-content" }),
        React.createElement(Toolbar, { engine: stateRef.current.engine, def: stateRef.current.def, serializer, allowUploadFile, allowDownloadFile, allowDownloadImage })
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
  const { type, subOf, handlers, assistant, linkPrevious, appendNode, appendLink } = options;
  const node = new StepNodeModel(step, file, { type, subOf, handlers, assistant });
  setNodePosition(node, () => askStepNodePosition(step));
  appendNode(node);
  const link = linkPrevious(node);
  appendLink(link);
  const endOfSub = DEFAULTS.createSubStepNodes(node, { appendNode, appendLink, handlers, assistant });
  return endOfSub == null ? node : endOfSub;
};
const createLinkFromParent = (model) => {
  return (node, findPortFromModel, createPortFromModel, askLinkExtras) => {
    let sourcePort = findPortFromModel();
    if (sourcePort == null) {
      sourcePort = createPortFromModel();
      model.addPort(sourcePort);
    }
    const link = sourcePort.createOutgoingLinkModel(askLinkExtras == null ? void 0 : askLinkExtras());
    let targetPort = node.getPort(FirstSubStepPortModel.NAME);
    if (targetPort == null) {
      targetPort = new FirstSubStepPortModel();
      node.addPort(targetPort);
    }
    link.setTargetPort(targetPort);
    node.asFirstSubStep(true);
    return link;
  };
};
const createSubNodesOfSingleRoute = (options) => {
  const { model, askSteps, options: { appendNode, appendLink, handlers, assistant }, findPortFromModel, createPortFromModel, askFirstLinkExtras } = options;
  const steps = askSteps();
  if (steps == null || steps.length === 0) {
    return void 0;
  }
  const createLinkFromModel = createLinkFromParent(model);
  const previousNode = model;
  return steps.reduce((previousNode2, step) => {
    const linkPrevious = previousNode2 === model ? (node) => createLinkFromModel(node, findPortFromModel, createPortFromModel, askFirstLinkExtras) : (node) => previousNode2.next(node);
    return createStepNode(step, model.file, {
      type: StepNodeEntityType.NORMAL,
      handlers,
      assistant,
      subOf: step,
      previousNode: previousNode2,
      linkPrevious,
      appendNode,
      appendLink
    });
  }, previousNode);
};
const createErrorHandlesSubNodes = (step, model, options) => {
  const errorHandles = step.errorHandles;
  if (errorHandles == null) {
    return void 0;
  }
  const createDefaultStep = options.assistant.createDefaultStep;
  const createAskSteps = (name, findPortFromModel, createPortFromModel) => {
    return () => {
      if (errorHandles[name] == null || !Array.isArray(errorHandles[name])) {
        return void 0;
      }
      const diagram = step.$diagram;
      const hideSteps = (diagram == null ? void 0 : diagram[`$fold${name.charAt(0).toUpperCase() + name.slice(1)}`]) ?? false;
      if (hideSteps) {
        let sourcePort = findPortFromModel();
        if (sourcePort == null) {
          sourcePort = createPortFromModel();
          model.addPort(sourcePort);
        }
        return void 0;
      }
      if (errorHandles[name].length === 0) {
        const defaultFirstStep = createDefaultStep();
        errorHandles[name].push(defaultFirstStep);
      }
      return errorHandles[name];
    };
  };
  return [
    {
      name: "catchable",
      findPortFromModel: () => model.getPort(CatchableErrorHandlePortModel.NAME),
      createPortFromModel: () => new CatchableErrorHandlePortModel()
    },
    {
      name: "exposed",
      findPortFromModel: () => model.getPort(ExposedErrorHandlePortModel.NAME),
      createPortFromModel: () => new ExposedErrorHandlePortModel()
    },
    {
      name: "uncatchable",
      findPortFromModel: () => model.getPort(UncatchableErrorHandlePortModel.NAME),
      createPortFromModel: () => new UncatchableErrorHandlePortModel()
    },
    {
      name: "any",
      findPortFromModel: () => model.getPort(AnyErrorHandlePortModel.NAME),
      createPortFromModel: () => new AnyErrorHandlePortModel()
    }
  ].map(({ name, findPortFromModel, createPortFromModel }) => {
    return {
      steps: createAskSteps(name, findPortFromModel, createPortFromModel),
      findPortFromModel,
      createPortFromModel
    };
  }).map(({ steps, ...rest }) => {
    return { steps: steps(), ...rest };
  }).filter(({ steps }) => {
    return steps != null && steps.length !== 0;
  }).map(({ steps, findPortFromModel, createPortFromModel }) => {
    return createSubNodesOfSingleRoute({
      model,
      options,
      askSteps: () => steps,
      findPortFromModel,
      createPortFromModel
    });
  });
};
const createSubNodes$4 = (model, options) => {
  const step = model.step;
  return createErrorHandlesSubNodes(step, model, options);
};
const createSubNodesAndEndNode = (model, options) => {
  const { appendNode, appendLink, handlers, assistant, createSpecificSubNodes } = options;
  const step = model.step;
  const commonSubNodes = createSubNodes$4(model, options);
  const specificSubNodes = createSpecificSubNodes == null ? void 0 : createSpecificSubNodes(model, options);
  const subNodes = [...commonSubNodes ?? [], ...specificSubNodes ?? []];
  if (subNodes.length === 0) {
    return void 0;
  }
  const endNode = new JoinEndNodeModel(step, model.file, {
    type: StepNodeEntityType.JOIN_END,
    subOf: step,
    handlers,
    assistant
  });
  appendNode(endNode);
  subNodes.forEach((node) => {
    const link = endNode.endOfSub(node);
    appendLink(link);
  });
  const directLink = endNode.endOfMe(model);
  appendLink(directLink);
  return endNode;
};
const createSetsLikeSubNodesAndEndNode = (model, options) => {
  return createSubNodesAndEndNode(model, {
    ...options,
    createSpecificSubNodes: (_node, options2) => {
      const step = model.step;
      const diagram = step.$diagram;
      const hideSteps = (diagram == null ? void 0 : diagram.$foldSubSteps) ?? false;
      if (hideSteps) {
        let sourcePort = model.getPort(StepsPortName);
        if (sourcePort == null) {
          sourcePort = new StepsPortModel(StepsPortName);
          model.addPort(sourcePort);
        }
        return void 0;
      }
      const createDefaultStep = options2.assistant.createDefaultStep;
      const lastNodeOfSteps = createSubNodesOfSingleRoute({
        model,
        options: options2,
        askSteps: () => {
          const steps = step.steps ?? [];
          if (steps.length === 0) {
            const defaultFirstStep = createDefaultStep();
            steps.push(defaultFirstStep);
            step.steps = steps;
          }
          return steps;
        },
        findPortFromModel: () => model.getPort(StepsPortName),
        createPortFromModel: () => new StepsPortModel(StepsPortName)
      });
      return [lastNodeOfSteps];
    }
  });
};
const createParallelSubNodesAndEndNode = (model, options) => {
  return CommonStepDefs.createSubNodesAndEndNode(model, {
    ...options,
    createSpecificSubNodes: (_node, options2) => {
      const step = model.step;
      const diagram = step.$diagram;
      const hideSteps = (diagram == null ? void 0 : diagram.$foldSubSteps) ?? false;
      if (hideSteps) {
        let sourcePort = model.getPort(StepsPortName);
        if (sourcePort == null) {
          sourcePort = new StepsPortModel(StepsPortName);
          model.addPort(sourcePort);
        }
        return void 0;
      }
      const createDefaultStep = options2.assistant.createDefaultStep;
      const steps = step.steps ?? [];
      if (steps.length === 0) {
        const defaultFirstStep = createDefaultStep();
        steps.push(defaultFirstStep);
        step.steps = steps;
      }
      return steps.map((step2, stepIndex) => {
        return createSubNodesOfSingleRoute({
          model,
          options: options2,
          askSteps: () => [step2],
          findPortFromModel: () => model.getPort(StepsPortName),
          createPortFromModel: () => new StepsPortModel(StepsPortName),
          askFirstLinkExtras: () => ({ index: stepIndex })
        });
      });
    }
  });
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
const elementUse = {
  code: "type",
  label: Labels.Use,
  anchor: "use",
  badge: (model) => asBeautifiedUse(model.use),
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value2) => {
      const originalUse = model.use;
      if (originalUse === value2) {
        return;
      }
      model.use = value2;
      const def = findStepDef(model.use);
      def.switchUse(model, originalUse);
      onValueChanged();
    };
    const value = model.use;
    const options = AllStepDefsAsArray().map((def) => {
      return { value: def.use, label: askUseLabel(def.use) };
    });
    return React.createElement(UnwrappedDropdown, { value, onValueChange, options, optionSort: OptionItemSort.ASC, clearable: false, style: CommonElementEditorStyles.dropdown });
  },
  helpDoc: HelpDocs.stepUse
};
const JsEditorContainer = qe.div.attrs(({ "data-height": height }) => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground-js-editor",
    style: {
      "--height": utils$2.toCssSize(height ?? 300)
    }
  };
})`
    display: block;
    position: relative;
    width: 100%;
    height: var(--height);
    min-height: var(--height);
    max-height: var(--height);
    border: ${PlaygroundCssVars.SNIPPET_BORDER};
    border-radius: ${PlaygroundCssVars.SNIPPET_BORDER_RADIUS};
    overflow: hidden;

    &[data-visible=false] {
        display: none;
    }

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
const JsEditor = (props) => {
  const { visible = true, height, snippet, onChange } = props;
  const ref = reactExports.useRef(null);
  const [state, setState] = reactExports.useState({});
  const { replace } = useThrottler();
  reactExports.useEffect(() => {
    if (ref.current == null) {
      return;
    }
    const changeListener = new Compartment();
    const editor = new EditorView({
      state: EditorState.create({
        doc: "",
        extensions: [
          basicSetup,
          keymap.of([indentWithTab]),
          javascript(),
          lintGutter(),
          changeListener.of(EditorView.updateListener.of(VUtils.noop))
        ]
      }),
      parent: ref.current
    });
    setState((state2) => ({ ...state2, editor, changeListener }));
    return () => {
      editor.destroy();
    };
  }, []);
  reactExports.useEffect(() => {
    if (state.editor == null) {
      return;
    }
    const doc = state.editor.state.doc;
    const text = doc.toString();
    if (text !== snippet) {
      state.editor.dispatch({ changes: { from: 0, to: doc.length, insert: snippet ?? "" } });
    }
  }, [state.editor, snippet]);
  reactExports.useEffect(() => {
    if (state.editor == null) {
      return;
    }
    state.editor.dispatch({
      effects: state.changeListener.reconfigure(EditorView.updateListener.of((view) => {
        if (view.docChanged) {
          replace(async () => {
            await onChange(view.state.doc.toString());
          }, 300);
        }
      }))
    });
  }, [replace, state.editor, state.changeListener, onChange]);
  return React.createElement(JsEditorContainer, { "data-visible": visible, "data-height": height, ref });
};
const createSelectableJsEditor = (options) => {
  const { findFlag, saveFlag, findSnippet, saveSnippet, flagCandidates, isSnippetAvailable, height: editorHeight } = options;
  return (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      saveFlag(model, value);
      onValueChanged();
    };
    const onSnippetChange = async (snippet2) => {
      saveSnippet(model, snippet2);
      onValueChanged(false);
    };
    const flag = findFlag(model);
    const snippet = findSnippet(model);
    return React.createElement(
      VerticalLinesEditor,
      null,
      React.createElement(UnwrappedDropdown, { value: flag, onValueChange, options: flagCandidates, clearable: false, filterable: false, style: CommonElementEditorStyles.dropdown }),
      React.createElement(JsEditor, { snippet, onChange: onSnippetChange, visible: isSnippetAvailable(flag), height: editorHeight })
    );
  };
};
const createBadge$1 = (name) => {
  return (model) => {
    var _a;
    if (((_a = model.temporary) == null ? void 0 : _a[name]) === false) {
      return React.createElement(ConfigurableElementBadgeSnippet, null);
    } else {
      return React.createElement(ConfigurableElementBadgeAsIs, null);
    }
  };
};
const createEditor$1 = (names) => {
  const { flag, snippet } = names;
  return createSelectableJsEditor({
    findFlag: (model) => {
      var _a;
      return ((_a = model.temporary) == null ? void 0 : _a[flag]) ?? true;
    },
    saveFlag: (model, value) => {
      model.temporary = { ...model.temporary ?? {}, [flag]: value };
    },
    findSnippet: (model) => model[snippet],
    saveSnippet: (model, text) => {
      model[snippet] = text;
    },
    flagCandidates: [
      { value: true, label: Labels.StepIOTransformerAsIs },
      { value: false, label: Labels.StepIOTransformerSnippet }
    ],
    isSnippetAvailable: (value) => value === false,
    height: PlaygroundCssVars.SNIPPET_IO_TRANSFORMER_HEIGHT
  });
};
const elementFromInput = {
  code: "from-input",
  label: Labels.StepIOTransformer,
  anchor: "from-input",
  badge: createBadge$1("fromInputAsIs"),
  editor: createEditor$1({ flag: "fromInputAsIs", snippet: "fromInput" }),
  helpDoc: HelpDocs.stepFromInput
};
const elementFromInputGroup = {
  code: "from-input-group",
  label: Labels.StepFromInput,
  anchor: "from-input-group",
  children: [elementFromInput],
  group: true
};
const elementToOutput = {
  code: "to-output",
  label: Labels.StepIOTransformer,
  anchor: "to-output",
  badge: createBadge$1("toOutputAsIs"),
  editor: createEditor$1({ flag: "toOutputAsIs", snippet: "toOutput" }),
  helpDoc: HelpDocs.stepToOutput
};
const MergeToRequestEditor = (props) => {
  var _a, _b;
  const { model, onValueChanged } = props;
  const inputRef = reactExports.useRef(null);
  const onValueChange = (value) => {
    model.temporary = { ...model.temporary ?? {}, mergeType: value };
    setTimeout(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = inputRef.current) == null ? void 0 : _a2.querySelector("input")) == null ? void 0 : _b2.focus();
    }, 50);
    onValueChanged();
  };
  const onNameChange = (value) => {
    model.merge = value;
    onValueChanged();
  };
  const options = [
    { value: MergeType.REPLACE, label: Labels.StepIOMergeBackReplace },
    { value: MergeType.MERGE_AS_PROPERTY, label: Labels.StepIOMergeBackAsProperty },
    { value: MergeType.UNBOX, label: Labels.StepIOMergeBackUnbox }
  ];
  return React.createElement(
    VerticalLinesEditor,
    null,
    React.createElement(UnwrappedDropdown, { value: ((_a = model.temporary) == null ? void 0 : _a.mergeType) ?? MergeType.REPLACE, onValueChange, options, clearable: false, style: CommonElementEditorStyles.dropdown }),
    React.createElement(UnwrappedDecorateInput, { leads: [Labels.StepIOMergeBackAsPropertyName], value: model.merge ?? "", onValueChange: onNameChange, disabled: ((_b = model.temporary) == null ? void 0 : _b.mergeType) !== MergeType.MERGE_AS_PROPERTY, ref: inputRef, "data-di-prefix-text": true })
  );
};
const elementMergeToRequest = {
  code: "merge-to-output",
  label: Labels.StepMerge,
  anchor: "merge-to-output",
  badge: (model) => {
    const { mergeType: type } = model.temporary ?? {};
    switch (type) {
      case MergeType.UNBOX:
        return Labels.StepIOMergeBackUnbox;
      case MergeType.MERGE_AS_PROPERTY:
        return Labels.StepIOMergeBackAsProperty;
      case MergeType.REPLACE:
        return Labels.StepIOMergeBackReplace;
    }
  },
  editor: MergeToRequestEditor,
  helpDoc: HelpDocs.stepMergeToRequest
};
const elementToOutputGroup = {
  code: "to-output-group",
  label: Labels.StepToOutput,
  anchor: "to-output-group",
  children: [elementToOutput, elementMergeToRequest],
  group: true
};
const createBadge = (name) => {
  return (model) => {
    var _a;
    switch ((_a = model.temporary) == null ? void 0 : _a[name]) {
      case ErrorHandleType.SNIPPET:
        return React.createElement(ConfigurableElementBadgeSnippet, null);
      case ErrorHandleType.STEPS:
        return React.createElement(ConfigurableElementBadgeSteps, null);
      case ErrorHandleType.NONE:
      default:
        return React.createElement(ConfigurableElementBadgeIgnored, null);
    }
  };
};
const createEditor = (names) => {
  const { flag, snippet } = names;
  return createSelectableJsEditor({
    findFlag: (model) => {
      var _a;
      return ((_a = model.temporary) == null ? void 0 : _a[flag]) ?? ErrorHandleType.NONE;
    },
    saveFlag: (model, value) => {
      model.temporary = { ...model.temporary ?? {}, [flag]: value };
    },
    findSnippet: (model) => {
      var _a;
      return (_a = model.errorHandles) == null ? void 0 : _a[snippet];
    },
    saveSnippet: (model, text) => {
      if (model.errorHandles == null) {
        model.errorHandles = {};
      }
      model.errorHandles[snippet] = text;
    },
    flagCandidates: [
      { value: ErrorHandleType.NONE, label: Labels.StepErrorHandleTypeNone },
      { value: ErrorHandleType.SNIPPET, label: Labels.StepErrorHandleTypeSnippet },
      { value: ErrorHandleType.STEPS, label: Labels.StepErrorHandleTypeSteps }
    ],
    isSnippetAvailable: (value) => value === ErrorHandleType.SNIPPET,
    height: PlaygroundCssVars.SNIPPET_ERROR_HANDLES_HEIGHT
  });
};
const elementCatchableErrorHandle = {
  code: "catchable-error-handle",
  label: Labels.CatchableErrorHandle,
  anchor: "catchable-error-handle",
  badge: createBadge("useErrorHandlesForCatchable"),
  editor: createEditor({ flag: "useErrorHandlesForCatchable", snippet: "catchable" }),
  helpDoc: HelpDocs.stepCatchableErrorHandle
};
const elementUncatchableErrorHandle = {
  code: "uncatchable-error-handle",
  label: Labels.UncatchableErrorHandle,
  anchor: "uncatchable-error-handle",
  badge: createBadge("useErrorHandlesForUncatchable"),
  editor: createEditor({ flag: "useErrorHandlesForUncatchable", snippet: "uncatchable" }),
  helpDoc: HelpDocs.stepUncatchableErrorHandle
};
const elementExposedErrorHandle = {
  code: "exposed-error-handle",
  label: Labels.ExposedErrorHandle,
  anchor: "exposed-error-handle",
  badge: createBadge("useErrorHandlesForExposed"),
  editor: createEditor({ flag: "useErrorHandlesForExposed", snippet: "exposed" }),
  helpDoc: HelpDocs.stepExposedErrorHandle
};
const elementAnyErrorHandle = {
  code: "any-error-handle",
  label: Labels.AnyErrorHandle,
  anchor: "any-error-handle",
  badge: createBadge("useErrorHandlesForAny"),
  editor: createEditor({ flag: "useErrorHandlesForAny", snippet: "any" }),
  helpDoc: HelpDocs.stepAnyErrorHandle
};
const elementErrorHandles = {
  code: "error-handles",
  label: Labels.ErrorHandles,
  anchor: "error-handles",
  children: [
    elementCatchableErrorHandle,
    elementExposedErrorHandle,
    elementUncatchableErrorHandle,
    elementAnyErrorHandle
  ],
  group: true,
  collapsible: true,
  collapsed: true
};
const createMainContentElement = (...children) => {
  return {
    code: "main-content",
    label: Labels.StepMainContent,
    anchor: "main-content",
    children,
    group: true
  };
};
const findSubPorts$4 = (model) => {
  return [
    model.getPort(CatchableErrorHandlePortModel.NAME),
    model.getPort(ExposedErrorHandlePortModel.NAME),
    model.getPort(UncatchableErrorHandlePortModel.NAME),
    model.getPort(AnyErrorHandlePortModel.NAME)
  ].filter((port) => port != null);
};
const prepare$8 = (def) => {
  const model = {
    name: def.name,
    use: def.use,
    fromInput: def.fromInput,
    toOutput: def.toOutput,
    temporary: {}
  };
  model.temporary.fromInputAsIs = VUtils.isBlank(def.fromInput);
  model.temporary.toOutputAsIs = VUtils.isBlank(def.toOutput);
  model.temporary.mergeType = VUtils.isBlank(def.merge) || def.merge === false ? MergeType.REPLACE : def.merge === true ? MergeType.UNBOX : MergeType.MERGE_AS_PROPERTY;
  if (model.temporary.mergeType === MergeType.MERGE_AS_PROPERTY) {
    model.merge = def.merge;
  }
  model.errorHandles = model.errorHandles ?? {};
  const copyErrorHandle = (name, flagName) => {
    var _a;
    const handle = (_a = def.errorHandles) == null ? void 0 : _a[name];
    if (handle == null) {
      model.temporary[flagName] = ErrorHandleType.NONE;
    } else if (Array.isArray(handle)) {
      model.temporary[flagName] = ErrorHandleType.STEPS;
    } else {
      model.temporary[flagName] = ErrorHandleType.SNIPPET;
    }
  };
  copyErrorHandle("catchable", "useErrorHandlesForCatchable");
  copyErrorHandle("uncatchable", "useErrorHandlesForUncatchable");
  copyErrorHandle("exposed", "useErrorHandlesForExposed");
  copyErrorHandle("any", "useErrorHandlesForAny");
  return model;
};
const switchUse$8 = (def, keptPropNames, originalUse) => {
  const keptProps = {
    name: true,
    use: true,
    fromInput: true,
    toOutput: true,
    merge: true,
    errorHandles: true,
    temporary: true,
    ...keptPropNames.reduce((names, name) => {
      return names[name] = true;
    }, {})
  };
  def.temporary[originalUse] = Object.keys(def).reduce((acc, key) => {
    if (keptProps[key] != true) {
      acc[key] = def[key];
      delete def[key];
    }
    return acc;
  }, {});
};
const CommonStepDefs = {
  prepare: prepare$8,
  switchUse: switchUse$8,
  confirm: confirm$8,
  discard,
  properties: {
    name: elementName,
    use: elementUse,
    fromInput: elementFromInputGroup,
    toOutput: elementToOutputGroup,
    errorHandles: elementErrorHandles,
    leadingGroup: [elementName, elementUse, elementFromInputGroup],
    tailingGroup: [elementErrorHandles, elementToOutputGroup]
  },
  ports: {
    fromInput: PortFromInput,
    toOutput: PortToOutput,
    merge: PortMerge,
    handleCatchableError: PortCatchableError,
    handleUncatchableError: PortUncatchableError,
    handleExposedError: PortExposedError,
    handleAnyError: PortAnyError
  },
  prebuiltPorts: {
    steps: PortSteps,
    input: [{ key: "from-input", port: PortFromInput }],
    errorHandles: [
      { key: "catchable-error-handle", port: PortCatchableError },
      { key: "exposed-error-handle", port: PortExposedError },
      { key: "uncatchable-error-handle", port: PortUncatchableError },
      { key: "any-error-handle", port: PortAnyError }
    ],
    output: [
      { key: "to-output", port: PortToOutput },
      { key: "merge", port: PortMerge }
    ]
  },
  createSubNodes: createSubNodes$4,
  createSubNodesAndEndNode,
  createSetsLikeSubNodesAndEndNode,
  createParallelSubNodesAndEndNode,
  findSubPorts: findSubPorts$4,
  createMainContentElement
};
const confirm$7 = (model, def, file, options) => {
  CommonStepDefs.confirm(model, def, file, options);
  def.snippet = model.snippet;
  options.handlers.onChange();
  return true;
};
const SnippetEditor$1 = (props) => {
  const { model, onValueChanged } = props;
  const onValueChange = async (snippet) => {
    model.snippet = snippet;
    onValueChanged(false);
  };
  return React.createElement(JsEditor, { snippet: model.snippet, onChange: onValueChange, height: PlaygroundCssVars.SNIPPET_HEIGHT });
};
const elementSnippet = {
  code: "snippet",
  label: Labels.StepSnippetSnippet,
  anchor: "snippet",
  badge: (model) => {
    if (VUtils.isNotBlank(model.snippet)) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  editor: SnippetEditor$1,
  helpDoc: HelpDocs.stepSnippetSnippet
};
const PortSnippet = (props) => {
  const { step: def } = props;
  const { snippet } = def;
  const exists = VUtils.isNotBlank(snippet);
  return React.createElement(PrePort, { label: Labels.StepSnippetSnippet, required: true, defined: exists, all: true, allAsBoolean: true });
};
const prepare$7 = (def) => {
  const model = CommonStepDefs.prepare(def);
  model.snippet = def.snippet;
  return model;
};
const switchUse$7 = (model, originalUse) => {
  CommonStepDefs.switchUse(model, ["snippet"], originalUse);
  return model;
};
const SnippetStepDefs = {
  use: StandardPipelineStepRegisterKey.SNIPPET,
  prepare: prepare$7,
  switchUse: switchUse$7,
  confirm: confirm$7,
  discard: CommonStepDefs.discard,
  properties: [
    ...CommonStepDefs.properties.leadingGroup,
    CommonStepDefs.createMainContentElement(elementSnippet),
    ...CommonStepDefs.properties.tailingGroup
  ],
  ports: [
    ...CommonStepDefs.prebuiltPorts.input,
    { key: "snippet", port: PortSnippet },
    ...CommonStepDefs.prebuiltPorts.errorHandles,
    ...CommonStepDefs.prebuiltPorts.output
  ],
  createSubNodes: CommonStepDefs.createSubNodesAndEndNode,
  findSubPorts: CommonStepDefs.findSubPorts,
  helpDocs: HelpDocs.snippetStep
};
registerStepDef(SnippetStepDefs);
const confirm$6 = (model, def, file, options) => {
  CommonStepDefs.confirm(model, def, file, options);
  def.property = (model.property ?? "").trim();
  options.handlers.onChange();
  return true;
};
const elementProperty$1 = {
  code: "property",
  label: Labels.StepGetPropertyProperty,
  anchor: "property",
  badge: (model) => {
    if (VUtils.isNotBlank(model.property)) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.property = value;
      onValueChanged();
    };
    return React.createElement(UnwrappedInput, { onValueChange, value: model.property ?? "" });
  },
  helpDoc: HelpDocs.stepGetPropertyProperty
};
const PortProperty$1 = (props) => {
  const { step: def } = props;
  const { property } = def;
  const exists = VUtils.isNotBlank(property);
  return React.createElement(PrePort, { label: Labels.StepGetPropertyProperty, required: true, defined: exists, all: true, allAsBoolean: true });
};
const prepare$6 = (def) => {
  const model = CommonStepDefs.prepare(def);
  model.property = def.property;
  return model;
};
const switchUse$6 = (model, originalUse) => {
  CommonStepDefs.switchUse(model, ["property"], originalUse);
  return model;
};
const GetPropertyStepDefs = {
  use: StandardPipelineStepRegisterKey.GET_PROPERTY,
  prepare: prepare$6,
  switchUse: switchUse$6,
  confirm: confirm$6,
  discard: CommonStepDefs.discard,
  properties: [
    ...CommonStepDefs.properties.leadingGroup,
    CommonStepDefs.createMainContentElement(elementProperty$1),
    ...CommonStepDefs.properties.tailingGroup
  ],
  ports: [
    ...CommonStepDefs.prebuiltPorts.input,
    { key: "property", port: PortProperty$1 },
    ...CommonStepDefs.prebuiltPorts.errorHandles,
    ...CommonStepDefs.prebuiltPorts.output
  ],
  createSubNodes: CommonStepDefs.createSubNodesAndEndNode,
  findSubPorts: CommonStepDefs.findSubPorts,
  helpDocs: HelpDocs.getPropertyStep
};
registerStepDef(GetPropertyStepDefs);
const confirm$5 = (model, def, file, options) => {
  CommonStepDefs.confirm(model, def, file, options);
  def.property = (model.property ?? "").trim();
  options.handlers.onChange();
  return true;
};
const elementProperty = {
  code: "property",
  label: Labels.StepDelPropertyProperty,
  anchor: "property",
  badge: (model) => {
    if (VUtils.isNotBlank(model.property)) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.property = value;
      onValueChanged();
    };
    return React.createElement(UnwrappedInput, { onValueChange, value: model.property ?? "" });
  },
  helpDoc: HelpDocs.stepDelPropertyProperty
};
const PortProperty = (props) => {
  const { step: def } = props;
  const { property } = def;
  const exists = VUtils.isNotBlank(property);
  return React.createElement(PrePort, { label: Labels.StepDelPropertyProperty, required: true, defined: exists, all: true, allAsBoolean: true });
};
const prepare$5 = (def) => {
  const model = CommonStepDefs.prepare(def);
  model.property = def.property;
  return model;
};
const switchUse$5 = (model, originalUse) => {
  CommonStepDefs.switchUse(model, ["property"], originalUse);
  return model;
};
const DelPropertyStepDefs = {
  use: StandardPipelineStepRegisterKey.DEL_PROPERTY,
  prepare: prepare$5,
  switchUse: switchUse$5,
  confirm: confirm$5,
  discard: CommonStepDefs.discard,
  properties: [
    ...CommonStepDefs.properties.leadingGroup,
    CommonStepDefs.createMainContentElement(elementProperty),
    ...CommonStepDefs.properties.tailingGroup
  ],
  ports: [
    ...CommonStepDefs.prebuiltPorts.input,
    { key: "property", port: PortProperty },
    ...CommonStepDefs.prebuiltPorts.errorHandles,
    ...CommonStepDefs.prebuiltPorts.output
  ],
  createSubNodes: CommonStepDefs.createSubNodesAndEndNode,
  findSubPorts: CommonStepDefs.findSubPorts,
  helpDocs: HelpDocs.delPropertyStep
};
const DelPropertiesStepDefs = {
  ...DelPropertyStepDefs,
  use: StandardPipelineStepRegisterKey.DELETE_PROPERTIES
};
registerStepDef(DelPropertyStepDefs);
registerStepDef(DelPropertiesStepDefs);
const confirm$4 = (model, def, file, options) => {
  CommonStepDefs.confirm(model, def, file, options);
  options.handlers.onChange();
  return true;
};
const prepare$4 = (def) => {
  return CommonStepDefs.prepare(def);
};
const switchUse$4 = (model, _originalUse) => model;
const SnowflakePropertyStepDefs = {
  use: StandardPipelineStepRegisterKey.SNOWFLAKE,
  prepare: prepare$4,
  switchUse: switchUse$4,
  confirm: confirm$4,
  discard: CommonStepDefs.discard,
  properties: [
    ...CommonStepDefs.properties.leadingGroup,
    ...CommonStepDefs.properties.tailingGroup
  ],
  ports: [
    ...CommonStepDefs.prebuiltPorts.input,
    ...CommonStepDefs.prebuiltPorts.errorHandles,
    ...CommonStepDefs.prebuiltPorts.output
  ],
  createSubNodes: CommonStepDefs.createSubNodesAndEndNode,
  findSubPorts: CommonStepDefs.findSubPorts,
  helpDocs: HelpDocs.snowflakeStep
};
registerStepDef(SnowflakePropertyStepDefs);
const createConfirm = () => {
  return (model, def, file, options) => {
    var _a, _b, _c, _d;
    CommonStepDefs.confirm(model, def, file, options);
    def.system = VUtils.asUndefinedWhenBlank(model.system);
    def.endpoint = VUtils.asUndefinedWhenBlank(model.endpoint);
    if ((_a = model.temporary) == null ? void 0 : _a.decorateUrlAsIs) {
      delete def.decorateUrl;
    } else {
      def.decorateUrl = VUtils.asUndefinedWhenBlank(model.decorateUrl);
    }
    def.method = model.method;
    def.timeout = VUtils.asUndefinedWhenBlank(model.timeout);
    if ((_b = model.temporary) == null ? void 0 : _b.generateHeadersAsIs) {
      delete def.generateHeaders;
    } else {
      def.generateHeaders = VUtils.asUndefinedWhenBlank(model.generateHeaders);
    }
    def.bodyUsed = model.bodyUsed;
    if ((_c = model.temporary) == null ? void 0 : _c.generateBodyAsIs) {
      delete def.generateBody;
    } else {
      def.generateBody = VUtils.asUndefinedWhenBlank(model.generateBody);
    }
    if ((_d = model.temporary) == null ? void 0 : _d.readResponseAsIs) {
      delete def.readResponse;
    } else {
      def.readResponse = VUtils.asUndefinedWhenBlank(model.readResponse);
    }
    def.responseErrorHandles = (model.responseErrorHandles ?? []).reduce((handles, { code, snippet }) => {
      if (VUtils.isNotBlank(code)) {
        handles[code] = snippet;
      }
      return handles;
    }, {});
    if (Object.keys(def.responseErrorHandles).length === 0) {
      delete def.responseErrorHandles;
    }
    options.handlers.onChange();
    return true;
  };
};
const confirmHttpFetch = createConfirm();
const confirmHttpGet = createConfirm();
const confirmHttpPost = createConfirm();
const elementDecorateUrl = {
  code: "decorate-url",
  label: Labels.StepHttpDecorateUrl,
  anchor: "decorate-url",
  badge: (model) => {
    var _a;
    if (((_a = model.temporary) == null ? void 0 : _a.decorateUrlAsIs) === false) {
      return React.createElement(ConfigurableElementBadgeSnippet, null);
    } else {
      return React.createElement(NavigatorElementBadgeWrapper, { "data-role": "use-default" }, Labels.NoDecoration);
    }
  },
  editor: createSelectableJsEditor({
    findFlag: (model) => {
      var _a;
      return ((_a = model.temporary) == null ? void 0 : _a.decorateUrlAsIs) ?? true;
    },
    saveFlag: (model, value) => {
      model.temporary = { ...model.temporary ?? {}, decorateUrlAsIs: value };
    },
    findSnippet: (model) => model.decorateUrl,
    saveSnippet: (model, text) => {
      model.decorateUrl = text;
    },
    flagCandidates: [
      { value: true, label: Labels.NoDecoration },
      { value: false, label: Labels.StepVariableUseSnippet }
    ],
    isSnippetAvailable: (value) => value === false,
    height: PlaygroundCssVars.SNIPPET_HTTP_DECORATE_URL_HEIGHT
  }),
  helpDoc: HelpDocs.stepHttpDecorateUrl
};
const NotAvailableDropdownOptionLabel = qe.span`
    color: ${CssVars.DANGER_COLOR};

    > span {
        margin-left: 0.5em;
    }
`;
const NotAvailableDropdownOption = (props) => {
  const { label } = props;
  return React.createElement(
    NotAvailableDropdownOptionLabel,
    null,
    label,
    React.createElement("span", null, Labels.IllegalDropdownOptionSuffix)
  );
};
const elementEndpoint = {
  code: "endpoint",
  label: Labels.StepHttpEndpoint,
  anchor: "endpoint",
  badge: (model) => {
    if (VUtils.isNotBlank(model.endpoint)) {
      return model.endpoint.trim();
    } else {
      return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  changeBy: ["system"],
  editor: (props) => {
    const { model, onValueChanged, assistant } = props;
    const systems = assistant.askSystemsForHttp();
    const system = VUtils.isBlank(model.system) ? void 0 : model.system.trim();
    const selectedSystem = systems.find(({ code }) => code === system);
    const endpoints = (selectedSystem == null ? void 0 : selectedSystem.endpoints) ?? [];
    const endpoint = VUtils.isBlank(model.endpoint) ? void 0 : model.endpoint.trim();
    const options = endpoints.map((endpoint2) => {
      return { value: endpoint2.code, label: endpoint2.name };
    });
    const onValueChange = (value) => {
      model.endpoint = value;
      onValueChanged();
    };
    if (endpoint != null && options.every(({ value }) => value !== endpoint)) {
      options.unshift({ value: endpoint, label: React.createElement(NotAvailableDropdownOption, { label: endpoint }) });
    }
    return React.createElement(UnwrappedDropdown, { value: endpoint, onValueChange, options, clearable: false, style: CommonElementEditorStyles.dropdown });
  },
  helpDoc: HelpDocs.stepHttpEndpoint
};
const SystemEditor = (props) => {
  const { model, onValueChanged, assistant } = props;
  const { fire } = useEditDialogEventBus();
  const systems = assistant.askSystemsForHttp();
  const options = systems.map((system2) => {
    return { value: system2.code, label: system2.name };
  });
  const onValueChange = (value) => {
    model.system = value;
    const endpoint = VUtils.isBlank(model.endpoint) ? void 0 : model.endpoint.trim();
    const selectedSystem = systems.find(({ code }) => code === value);
    const availableEndpoints = selectedSystem.endpoints || [];
    if (availableEndpoints.every(({ code }) => code !== endpoint)) {
      delete model.endpoint;
    }
    onValueChanged();
    fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, "endpoint");
  };
  const system = VUtils.isBlank(model.system) ? void 0 : model.system.trim();
  if (system != null && options.every(({ value }) => value !== system)) {
    options.unshift({ value: system, label: React.createElement(NotAvailableDropdownOption, { label: system }) });
  }
  return React.createElement(UnwrappedDropdown, { value: system, onValueChange, options, clearable: false, style: CommonElementEditorStyles.dropdown });
};
const elementSystem = {
  code: "system",
  label: Labels.StepHttpSystem,
  anchor: "system",
  badge: (model) => {
    if (VUtils.isNotBlank(model.system)) {
      return model.system.trim();
    } else {
      return React.createElement(ConfigurableElementBadgeMissed, null);
    }
  },
  editor: SystemEditor,
  helpDoc: HelpDocs.stepHttpSystem
};
const elementRemote = {
  code: "remote",
  label: Labels.StepHttpRemote,
  anchor: "remote",
  children: [elementSystem, elementEndpoint, elementDecorateUrl],
  group: true
};
const PortEndpoint = (props) => {
  const { step: def } = props;
  const { endpoint } = def;
  const exists = VUtils.isNotBlank(endpoint);
  return React.createElement(PrePort, { label: Labels.StepHttpEndpoint, required: true, defined: exists, all: true, allAsGiven: (endpoint ?? "").trim() });
};
const PortSystem = (props) => {
  const { step: def } = props;
  const { system } = def;
  const exists = VUtils.isNotBlank(system);
  return React.createElement(PrePort, { label: Labels.StepHttpSystem, required: true, defined: exists, all: true, allAsGiven: (system ?? "").trim() });
};
const createPrepare = () => {
  return (def) => {
    const model = CommonStepDefs.prepare(def);
    model.system = def.system;
    model.endpoint = def.endpoint;
    model.decorateUrl = def.decorateUrl;
    model.temporary.decorateUrlAsIs = VUtils.isBlank(def.fromInput);
    model.method = def.method;
    model.timeout = def.timeout;
    model.generateHeaders = def.generateHeaders;
    model.temporary.generateHeadersAsIs = VUtils.isBlank(def.generateHeaders);
    model.bodyUsed = def.bodyUsed;
    model.generateBody = def.generateBody;
    model.temporary.generateBodyAsIs = VUtils.isBlank(def.generateBody);
    model.readResponse = def.readResponse;
    model.temporary.readResponseAsIs = VUtils.isBlank(def.readResponse);
    model.responseErrorHandles = Object.keys(def.responseErrorHandles ?? {}).map((code) => {
      var _a;
      return { code, snippet: (_a = def.responseErrorHandles) == null ? void 0 : _a[code] };
    });
    return model;
  };
};
const prepareHttpFetch = createPrepare();
const prepareHttpGet = createPrepare();
const prepareHttpPost = createPrepare();
const createSwitchUse = () => {
  return (model, originalUse) => {
    CommonStepDefs.switchUse(model, [
      "system",
      "endpoint",
      "decorateUrl",
      "method",
      "timeout",
      "generateHeaders",
      "bodyUsed",
      "generateBody",
      "readResponse",
      "responseErrorHandles"
    ], originalUse);
    return model;
  };
};
const switchUseHttpFetch = createSwitchUse();
const switchUseHttpGet = createSwitchUse();
const switchUseHttpPost = createSwitchUse();
const createHttpStepDefs = (options) => {
  const { docs: docs2, ...rest } = options;
  const defs = {
    ...rest,
    discard: CommonStepDefs.discard,
    properties: [
      ...CommonStepDefs.properties.leadingGroup,
      elementRemote,
      ...CommonStepDefs.properties.tailingGroup
    ],
    ports: [
      ...CommonStepDefs.prebuiltPorts.input,
      { key: "system", port: PortSystem },
      { key: "endpoint", port: PortEndpoint },
      ...CommonStepDefs.prebuiltPorts.errorHandles,
      ...CommonStepDefs.prebuiltPorts.output
    ],
    createSubNodes: CommonStepDefs.createSubNodesAndEndNode,
    findSubPorts: CommonStepDefs.findSubPorts,
    helpDocs: docs2
  };
  registerStepDef(defs);
  return defs;
};
createHttpStepDefs({
  use: StandardPipelineStepRegisterKey.HTTP_FETCH,
  prepare: prepareHttpFetch,
  switchUse: switchUseHttpFetch,
  confirm: confirmHttpFetch,
  docs: HelpDocs.httpFetchStep
});
createHttpStepDefs({
  use: StandardPipelineStepRegisterKey.HTTP_GET,
  prepare: prepareHttpGet,
  switchUse: switchUseHttpGet,
  confirm: confirmHttpGet,
  docs: HelpDocs.httpGetStep
});
createHttpStepDefs({
  use: StandardPipelineStepRegisterKey.HTTP_POST,
  prepare: prepareHttpPost,
  switchUse: switchUseHttpPost,
  confirm: confirmHttpPost,
  docs: HelpDocs.httpPostStep
});
const confirm$3 = (model, def, file, options) => {
  CommonStepDefs.confirm(model, def, file, options);
  options.handlers.onChange();
  return true;
};
const createSubNodes$3 = (model, options) => {
  return CommonStepDefs.createSetsLikeSubNodesAndEndNode(model, options);
};
const findSubPorts$3 = (model) => {
  const subStepsPort = model.getPort(StepsPortName);
  return subStepsPort != null ? [subStepsPort, ...CommonStepDefs.findSubPorts(model) ?? []] : CommonStepDefs.findSubPorts(model);
};
const prepare$3 = (def) => {
  const model = CommonStepDefs.prepare(def);
  return model;
};
const switchUse$3 = (model, originalUse) => {
  CommonStepDefs.switchUse(model, ["steps"], originalUse);
  return model;
};
const SetsStepDefs = {
  use: StandardPipelineStepRegisterKey.SETS,
  prepare: prepare$3,
  switchUse: switchUse$3,
  confirm: confirm$3,
  discard: CommonStepDefs.discard,
  properties: [
    ...CommonStepDefs.properties.leadingGroup,
    ...CommonStepDefs.properties.tailingGroup
  ],
  ports: [
    ...CommonStepDefs.prebuiltPorts.input,
    { key: "steps", port: CommonStepDefs.prebuiltPorts.steps },
    ...CommonStepDefs.prebuiltPorts.errorHandles,
    ...CommonStepDefs.prebuiltPorts.output
  ],
  createSubNodes: createSubNodes$3,
  findSubPorts: findSubPorts$3,
  helpDocs: HelpDocs.setsStep
};
registerStepDef(SetsStepDefs);
const confirm$2 = (model, def, file, options) => {
  CommonStepDefs.confirm(model, def, file, options);
  options.handlers.onChange();
  return true;
};
const createSubNodes$2 = (model, options) => {
  return CommonStepDefs.createSetsLikeSubNodesAndEndNode(model, options);
};
const findSubPorts$2 = (model) => {
  const subStepsPort = model.getPort(StepsPortName);
  return subStepsPort != null ? [subStepsPort, ...CommonStepDefs.findSubPorts(model) ?? []] : CommonStepDefs.findSubPorts(model);
};
const prepare$2 = (def) => {
  const model = CommonStepDefs.prepare(def);
  return model;
};
const switchUse$2 = (model, originalUse) => {
  CommonStepDefs.switchUse(model, ["steps"], originalUse);
  return model;
};
const AsyncSetsStepDefs = {
  use: StandardPipelineStepRegisterKey.ASYNC_SETS,
  prepare: prepare$2,
  switchUse: switchUse$2,
  confirm: confirm$2,
  discard: CommonStepDefs.discard,
  properties: [
    ...CommonStepDefs.properties.leadingGroup,
    ...CommonStepDefs.properties.tailingGroup
  ],
  ports: [
    ...CommonStepDefs.prebuiltPorts.input,
    { key: "steps", port: CommonStepDefs.prebuiltPorts.steps },
    ...CommonStepDefs.prebuiltPorts.errorHandles,
    ...CommonStepDefs.prebuiltPorts.output
  ],
  createSubNodes: createSubNodes$2,
  findSubPorts: findSubPorts$2,
  helpDocs: HelpDocs.asyncSetsStep
};
registerStepDef(AsyncSetsStepDefs);
const confirm$1 = (model, def, file, options) => {
  CommonStepDefs.confirm(model, def, file, options);
  if (VUtils.isBlank(model.originalContentName)) {
    delete def.originalContentName;
  } else {
    def.originalContentName = model.originalContentName.trim();
  }
  if (VUtils.isBlank(model.itemName)) {
    delete def.itemName;
  } else {
    def.itemName = model.itemName.trim();
  }
  options.handlers.onChange();
  return true;
};
const createSubNodes$1 = (model, options) => {
  return CommonStepDefs.createSetsLikeSubNodesAndEndNode(model, options);
};
const elementItemName = {
  code: "item-name",
  label: Labels.StepEachItemName,
  anchor: "item-name",
  badge: (model) => {
    if (VUtils.isNotBlank(model.itemName)) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeUseDefault, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.itemName = value;
      onValueChanged();
    };
    return React.createElement(UnwrappedInput, { onValueChange, value: model.itemName ?? "", placeholder: "$item" });
  },
  helpDoc: HelpDocs.stepEachItemName
};
const elementOriginalContentName = {
  code: "original-content-name",
  label: Labels.StepEachOriginalContentName,
  anchor: "original-content-name",
  badge: (model) => {
    if (VUtils.isNotBlank(model.originalContentName)) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeUseDefault, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      model.originalContentName = value;
      onValueChanged();
    };
    return React.createElement(UnwrappedInput, { onValueChange, value: model.originalContentName ?? "", placeholder: "$content" });
  },
  helpDoc: HelpDocs.stepEachOriginalContentName
};
const findSubPorts$1 = (model) => {
  const subStepsPort = model.getPort(StepsPortName);
  return subStepsPort != null ? [subStepsPort, ...CommonStepDefs.findSubPorts(model) ?? []] : CommonStepDefs.findSubPorts(model);
};
const prepare$1 = (def) => {
  const model = CommonStepDefs.prepare(def);
  model.originalContentName = def.originalContentName;
  model.itemName = def.itemName;
  return model;
};
const switchUse$1 = (model, originalUse) => {
  CommonStepDefs.switchUse(model, ["originalContentName", "itemName", "steps"], originalUse);
  return model;
};
const EachStepDefs = {
  use: StandardPipelineStepRegisterKey.EACH_SETS,
  prepare: prepare$1,
  switchUse: switchUse$1,
  confirm: confirm$1,
  discard: CommonStepDefs.discard,
  properties: [
    ...CommonStepDefs.properties.leadingGroup,
    CommonStepDefs.createMainContentElement(elementOriginalContentName, elementItemName),
    ...CommonStepDefs.properties.tailingGroup
  ],
  ports: [
    ...CommonStepDefs.prebuiltPorts.input,
    { key: "steps", port: CommonStepDefs.prebuiltPorts.steps },
    ...CommonStepDefs.prebuiltPorts.errorHandles,
    ...CommonStepDefs.prebuiltPorts.output
  ],
  createSubNodes: createSubNodes$1,
  findSubPorts: findSubPorts$1,
  helpDocs: HelpDocs.eachStep
};
registerStepDef(EachStepDefs);
const confirm = (model, def, file, options) => {
  CommonStepDefs.confirm(model, def, file, options);
  if (VUtils.isBlank(model.cloneData)) {
    delete def.cloneData;
  } else {
    def.cloneData = model.cloneData.trim();
  }
  if (VUtils.isBlank(model.race)) {
    delete def.race;
  } else {
    def.race = model.race;
  }
  options.handlers.onChange();
  return true;
};
const createSubNodes = (model, options) => {
  return CommonStepDefs.createParallelSubNodesAndEndNode(model, options);
};
const SnippetEditor = (props) => {
  const { model, onValueChanged } = props;
  const onValueChange = async (snippet) => {
    model.cloneData = snippet;
    onValueChanged(false);
  };
  return React.createElement(JsEditor, { snippet: model.snippet, onChange: onValueChange, height: PlaygroundCssVars.SNIPPET_HEIGHT });
};
const elementCloneData = {
  code: "clone-data",
  label: Labels.StepParallelCloneData,
  anchor: "clone-data",
  badge: (model) => {
    if (VUtils.isNotBlank(model.snippet)) {
      return React.createElement(ConfigurableElementBadgeChecked, null);
    } else {
      return React.createElement(ConfigurableElementBadgeIgnored, null);
    }
  },
  editor: SnippetEditor,
  helpDoc: HelpDocs.stepParallelCloneData
};
const elementRace = {
  code: "race",
  label: Labels.StepParallelRace,
  anchor: "race",
  badge: (model) => {
    if (model.race == null || model.race === false) {
      return React.createElement(ConfigurableElementBadgeNo, null);
    } else {
      return React.createElement(ConfigurableElementBadgeYes, null);
    }
  },
  editor: (props) => {
    const { model, onValueChanged } = props;
    const onValueChange = (value) => {
      if (value == null || value === false) {
        delete model.race;
      } else {
        model.race = true;
      }
      onValueChanged();
    };
    return React.createElement(UnwrappedCheckbox, { onValueChange, value: model.race ?? false });
  },
  helpDoc: HelpDocs.stepParallelRace
};
const findSubPorts = (model) => {
  const subStepsPort = model.getPort(StepsPortName);
  return subStepsPort != null ? [subStepsPort, ...CommonStepDefs.findSubPorts(model) ?? []] : CommonStepDefs.findSubPorts(model);
};
const PortRace = (props) => {
  const { step: def } = props;
  return React.createElement(PostPort, { label: Labels.StepParallelRace, required: false, defined: true, all: def.race ?? false, allAsBoolean: true });
};
const prepare = (def) => {
  const model = CommonStepDefs.prepare(def);
  model.cloneData = def.cloneData;
  model.race = def.race;
  return model;
};
const switchUse = (model, originalUse) => {
  CommonStepDefs.switchUse(model, ["cloneData", "race", "steps"], originalUse);
  return model;
};
const ParallelStepDefs = {
  use: StandardPipelineStepRegisterKey.PARALLEL_SETS,
  prepare,
  switchUse,
  confirm,
  discard: CommonStepDefs.discard,
  properties: [
    ...CommonStepDefs.properties.leadingGroup,
    CommonStepDefs.createMainContentElement(elementRace, elementCloneData),
    ...CommonStepDefs.properties.tailingGroup
  ],
  ports: [
    ...CommonStepDefs.prebuiltPorts.input,
    { key: "race", port: PortRace },
    { key: "steps", port: CommonStepDefs.prebuiltPorts.steps },
    ...CommonStepDefs.prebuiltPorts.errorHandles,
    ...CommonStepDefs.prebuiltPorts.output
  ],
  createSubNodes,
  findSubPorts,
  helpDocs: HelpDocs.parallelStep
};
registerStepDef(ParallelStepDefs);
const DEFAULT_CREATE_SUB_STEP_NODES = (node, options) => {
  var _a;
  return (_a = findStepDef(node.step.use)) == null ? void 0 : _a.createSubNodes(node, options);
};
const DEFAULTS = {
  diagram: {
    startTop: 64,
    startLeft: 64,
    rowGap: 64,
    columnGap: 128,
    linkArcRadius: 8,
    linkGutterSize: 8,
    linkJoinEndSinkingOffset: 24,
    linkJoinEndGutterSize: 16
  },
  createDefaultStep: () => {
    return {
      name: "",
      use: StandardPipelineStepRegisterKey.SNIPPET,
      fromInput: "$factor",
      toOutput: "$result",
      merge: true
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

    &[data-diagram-work-mode] {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: ${CssVars.BACKGROUND_COLOR};
        border: 0;
        border-radius: 0;
        z-index: ${PlaygroundCssVars.EDITOR_MAX_Z_INDEX};
    }
`;
const PlaygroundDelegate = (props) => {
  const { $pp, $wrapped, usage, assistant, serializer, deserializer, allowUploadFile = false, allowDownloadFile = true, allowDownloadImage = true, ...rest } = props;
  const { $p2r, $onValueChange, $avs: { $disabled, $visible } } = $wrapped;
  const ref = reactExports.useRef(null);
  const globalHandlers = useGlobalHandlers();
  const { on, off } = usePlaygroundEventBus();
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
  reactExports.useEffect(() => {
    const onResetContent = async (content2) => {
      await $onValueChange(content2, true, { global: globalHandlers });
    };
    on(PlaygroundEventTypes.RESET_CONTENT, onResetContent);
    return () => {
      off(PlaygroundEventTypes.RESET_CONTENT, onResetContent);
    };
  }, [on, off, globalHandlers, $onValueChange]);
  const onContentChanged = async (content2) => {
    await $onValueChange(content2, false, { global: globalHandlers });
  };
  const content = MUtils.getValue($wrapped.$model, $pp);
  return React.createElement(
    PlaygroundWrapper,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref },
    React.createElement(EditDialog, null),
    React.createElement(PlaygroundBridge, { content, onContentChanged }),
    React.createElement(Editor, { content, usage, assistant, serializer: state.serializer, deserializer: state.deserializer, allowUploadFile, allowDownloadFile, allowDownloadImage })
  );
};
const Playground = (props) => {
  return React.createElement(
    PlaygroundEventBusProvider,
    null,
    React.createElement(PlaygroundDelegate, { ...props })
  );
};
const PlaygroundCreateDefaultStepBuild = {
  accept: (key) => key === "defaultStep",
  build: (value, list) => {
    if (VUtils.isBlank(value)) {
      return void 0;
    }
    return index$1.createSyncSnippetBuild("createDefaultStep", []).build(value, list);
  }
};
const PlaygroundAskRefPipelinesBuild = {
  accept: (key) => key === "refPipelines",
  build: (value, list) => {
    if (VUtils.isBlank(value)) {
      return void 0;
    }
    return index$1.createSyncSnippetBuild("askRefPipelines", []).build(value, list);
  }
};
const PlaygroundAskRefStepsBuild = {
  accept: (key) => key === "refSteps",
  build: (value, list) => {
    if (VUtils.isBlank(value)) {
      return void 0;
    }
    return index$1.createSyncSnippetBuild("askRefSteps", []).build(value, list);
  }
};
const PlaygroundaskSystemsForHttpBuild = {
  accept: (key) => key === "httpSystems",
  build: (value, list) => {
    if (VUtils.isBlank(value)) {
      return void 0;
    }
    return index$1.createSyncSnippetBuild("askSystemsForHttp", []).build(value, list);
  }
};
class AbstractPlaygroundTranslator extends index$1.SpecificWidgetTranslator {
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeValueBuilders() {
    return [PlaygroundCreateDefaultStepBuild, PlaygroundAskRefPipelinesBuild, PlaygroundAskRefStepsBuild, PlaygroundaskSystemsForHttpBuild];
  }
  getAttributeNamesMapping() {
    const type = this.getSupportedType();
    return {
      ...["useN3", "useN5", "useN6", "useN7", "useN8"].reduce((mapping, key) => {
        mapping[`${type}.${key}`] = `usage.${key}`;
        return mapping;
      }, {}),
      [`${type}.defaultStep`]: "assistant.createDefaultStep",
      [`${type}.refPipelines`]: "assistant.askRefPipelines",
      [`${type}.refSteps`]: "assistant.askRefSteps",
      [`${type}.httpSystems`]: "assistant.askSystemsForHttp"
    };
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
