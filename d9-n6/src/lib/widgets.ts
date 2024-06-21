import {CssConstants, CssVars} from '@rainbow-d9/n2';
import color from 'color';

const EDITOR_BACKGROUND_BLOCK_SIZE = 'var(--o23-playground-editor-background-block-size, 48px)';
const EDITOR_BACKGROUND_LINE_COLOR = `var(--o23-playground-editor-background-line-color, ${color(CssConstants.PRIMARY_COLOR).alpha(0.08)})`;
const NODE_START_COLOR = '#ffb56b';
const NODE_END_COLOR = '#e0b35f';
const NODE_STEP_COLOR = '#54956b';
const NEXT_STEP_PORT_COLOR = '#1f6b73';
const PREVIOUS_STEP_PORT_COLOR = '#00618b';
const PRE_PORT_COLOR = '#87a55f';
const POST_PORT_COLOR = '#c69dab';
export const PlaygroundCssVars = {
	EDITOR_BACKGROUND_BLOCK_SIZE,
	EDITOR_BACKGROUND_LINE_COLOR,
	EDITOR_BACKGROUND_IMAGE: `var(--o23-playground-editor-background-image, linear-gradient(to right, ${EDITOR_BACKGROUND_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${EDITOR_BACKGROUND_LINE_COLOR} 1px, transparent 1px))`,
	EDITOR_BACKGROUND_SIZE: `var(--o23-playground-editor-background-size, ${EDITOR_BACKGROUND_BLOCK_SIZE} ${EDITOR_BACKGROUND_BLOCK_SIZE})`,
	EDITOR_BACKGROUND_POSITION: 'var(--o23-playground-editor-background-position, -1px -1px)',
	EDITOR_ERROR_COLOR: `var(--o23-playground-editor-error-color, ${CssVars.DANGER_COLOR})`,
	// markdown
	MARKDOWN_FONT_SIZE: 'var(--o23-playground-markdown-font-size, 14px)',
	MARKDOWN_COLOR: `var(--o23-playground-markdown-color, ${CssVars.FONT_COLOR})`,
	MARKDOWN_BACKGROUND_COLOR: `var(--o23-playground-markdown-background-color, ${CssVars.BACKGROUND_COLOR})`,
	SPECIFIC_MARKDOWN_FONT_SIZE: 'var(--o23-playground-specific-markdown-font-size, 12px)',
	// dialog
	EDIT_DIALOG_BACKDROP_COLOR: 'var(--o23-playground-dialog-backdrop-color, rgba(71, 69, 84, 0.75))',
	EDIT_DIALOG_Z_INDEX: 'var(--o23-playground-dialog-z-index, 10000)',
	EDIT_DIALOG_MARGIN_TOP: 'var(--o23-playground-dialog-margin-top, 32px)',
	EDIT_DIALOG_MARGIN_LEFT: 'var(--o23-playground-dialog-margin-top, 24px)',
	EDIT_DIALOG_WIDTH: 'var(--o23-playground-dialog-width, calc(100vw - 48px))',
	EDIT_DIALOG_HEIGHT: 'var(--o23-playground-dialog-height, calc(100vh - 64px))',
	EDIT_DIALOG_BACKGROUND_COLOR: `var(--o23-playground-dialog-background-color, ${CssVars.BACKGROUND_COLOR})`,
	EDIT_DIALOG_PADDING: 'var(--o23-playground-dialog-padding, 16px)',
	EDIT_DIALOG_PADDING_LEFT: 'var(--o23-playground-dialog-padding-left, 16px)',
	EDIT_DIALOG_SHADOW: `var(--o23-playground-dialog-shadow, 0 0 10px 4px rgba(0, 0, 0, 0.2))`,
	EDIT_DIALOG_BORDER_RADIUS: 'var(--o23-playground-dialog-border-radius, 12px)',
	EDIT_DIALOG_BORDER: `var(--o23-playground-dialog-border, ${CssVars.BORDER})`,
	EDIT_DIALOG_CLOSER_TOP: 'var(--o23-playground-dialog-closer-top, -8px)',
	EDIT_DIALOG_CLOSER_ICON_COLOR: `var(--o23-playground-dialog-closer-icon-color, ${CssVars.INVERT_COLOR})`,
	EDIT_DIALOG_CLOSER_ICON_SIZE: 'var(--o23-playground-dialog-closer-icon-size, 20px)',
	EDIT_DIALOG_CLOSER_FONT_SIZE: 'var(--o23-playground-dialog-closer-font-size, 16px)',
	EDIT_DIALOG_CLOSER_FONT_WEIGHT: 'var(--o23-playground-dialog-closer-font-weight, 600)',
	EDIT_DIALOG_CLOSER_PADDING: 'var(--o23-playground-dialog-closer-padding, 0 8px)',
	EDIT_DIALOG_PART_MARGIN: 'var(--o23-playground-dialog-part-margin, 24px 0)',
	EDIT_DIALOG_PART_HEADER_HEIGHT: 'var(--o23-playground-dialog-part-header-height, 32px)',
	EDIT_DIALOG_PART_TITLE_FONT_SIZE: 'var(--o23-playground-dialog-part-title-font-size, 16px)',
	EDIT_DIALOG_PART_TITLE_FONT_WEIGHT: 'var(--o23-playground-dialog-part-title-font-weight, 600)',
	EDIT_DIALOG_PART_BODY_MARGIN: `var(--o23-playground-dialog-part-body-margin, 0 -16px)`,
	EDIT_DIALOG_PART_BODY_PADDING: 'var(--o23-playground-dialog-part-body-padding, 0 16px)',
	EDIT_DIALOG_HELP_DOC_TITLE_COLOR: `var(--o23-playground-dialog-part-title-color, rgb(184, 184, 184))`,
	EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_LEFT: 'var(--o23-playground-dialog-help-doc-open-handle-left, 0)',
	EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_WIDTH: 'var(--o23-playground-dialog-help-doc-open-handle-width, 64px)',
	EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_COLOR: `var(--o23-playground-dialog-help-doc-open-handle-color, ${CssVars.PRIMARY_COLOR})`,
	EDIT_DIALOG_HELP_DOC_MARGIN: 'var(--o23-playground-dialog-help-doc-margin, 0 0 0 -16px)',
	EDIT_DIALOG_HELP_DOC_PADDING: 'var(--o23-playground-dialog-help-doc-padding, 0 16px 0 16px)',
	EDIT_DIALOG_HELP_DOC_COLLAPSED_WIDTH: 'var(--o23-playground-dialog-help-doc-collapsed-width, 64px)',
	EDIT_DIALOG_HELP_DOC_GUTTER_SIZE: 'var(--o23-playground-dialog-help-doc-gutter-size, 16px)',
	EDIT_DIALOG_NAVIGATOR_WIDTH: 'var(--o23-playground-dialog-navigator-width, 400px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_HEIGHT: `var(--o23-playground-dialog-configurable-element-height, ${CssVars.INPUT_HEIGHT})`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_MARGIN: 'var(--o23-playground-dialog-configurable-element-margin, 0 -8px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_PADDING: 'var(--o23-playground-dialog-configurable-element-padding, 0 8px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_BORDER_RADIUS: `var(--o23-playground-dialog-configurable-element-border-radius, ${CssVars.BORDER_RADIUS})`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_BORDER: 'var(--o23-playground-dialog-configurable-element-border, 1px solid rgb(236, 242, 248))',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_HOVER_COLOR: `var(--o23-playground-dialog-configurable-element-hover-color, ${CssVars.HOVER_COLOR})`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_HOVER_FONT_WEIGHT: `var(--o23-playground-dialog-configurable-element-hover-font-weight, 600)`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT: 'var(--o23-playground-dialog-configurable-element-indent, 8px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR: `var(--o23-playground-dialog-configurable-element-tree-line-color, ${CssVars.BORDER_COLOR})`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_HEIGHT: `var(--o23-playground-dialog-configurable-element-badge-height, calc(${CssVars.INPUT_HEIGHT} * 0.6))`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_FONT_WEIGHT: 'var(--o23-playground-dialog-configurable-element-badge-font-weight, 400)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_PADDING: 'var(--o23-playground-dialog-configurable-element-badge-padding, 0 12px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_BORDER_RADIUS: 'var(--o23-playground-dialog-configurable-element-badge-border-radius, 6px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_TEXT_FONT_SIZE: 'var(--o23-playground-dialog-configurable-element-badge-text-font-size, 0.8em)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_TEXT_FONT_WEIGHT: 'var(--o23-playground-dialog-configurable-element-badge-text-font-weight, 400)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_ICON_MARGIN: 'var(--o23-playground-dialog-configurable-element-badge-icon-margin, 0 -8px 0 0)',
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
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_MARGIN: 'var(--o23-playground-dialog-configurable-element-specific-margin, 0 -8px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_PADDING: 'var(--o23-playground-dialog-configurable-element-specific-padding, 8px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_COLUMN_GAP: 'var(--o23-playground-dialog-configurable-element-specific-grid-column-gap, 32px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_GRID_ROW_GAP: 'var(--o23-playground-dialog-configurable-element-specific-grid-row-gap, 8px)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_LABEL_HEIGHT: `var(--o23-playground-dialog-configurable-element-help-label-height, ${CssVars.INPUT_HEIGHT})`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_HEIGHT: `var(--o23-playground-dialog-configurable-element-help-badge-height, ${CssVars.INPUT_HEIGHT})`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_HELP_BADGE_COLOR: `var(--o23-playground-dialog-configurable-element-help-badge-color, ${CssVars.PRIMARY_COLOR})`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_FONT_WEIGHT: 'var(--o23-playground-dialog-configurable-element-group-font-weight, 600)',
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_GROUP_BORDER: `var(--o23-playground-dialog-configurable-element-group-border, 1px solid rgb(216, 222, 228))`,
	EDIT_DIALOG_CONFIGURABLE_ELEMENT_SPECIFIC_INPUT_PREFIX_FONT_SIZE: 'var(--o23-playground-dialog-configurable-element-specific-input-prefix-font-size, max(0.8em, 12px))',
	// node common
	NODE_BORDER_RADIUS: 'var(--o23-playground-node-border-radius, 8px)',
	NODE_BACKGROUND: `var(--o23-playground-node-background, ${CssVars.BACKGROUND_COLOR})`,
	NODE_TITLE_PADDING: 'var(--o23-playground-node-title-padding, 0 10px)',
	NODE_TITLE_SPREADER_MIN_WIDTH: 'var(--o23-playground-node-title-spreader-min-width, 40px)',
	NODE_MIN_WIDTH: 'var(--o23-playground-node-min-width, 160px)',
	NODE_ICON_SIZE: 'var(--o23-playground-node-icon-size, 14px)',
	NODE_PORT_HEIGHT: 'var(--o23-playground-node-port-height, 24px)',
	// next step port
	NODE_NEXT_STEP_PORT_FONT_SIZE: 'var(--o23-playground-next-step-port-font-size, 14px)',
	NODE_NEXT_STEP_PORT_FONT_WEIGHT: 'var(--o23-playground-next-step-port-font-weight, 600)',
	NODE_NEXT_STEP_PORT_COLOR: `var(--o23-playground-next-step-port-color, ${CssVars.INVERT_COLOR})`,
	NODE_NEXT_STEP_PORT_BACKGROUND: `var(--o23-playground-next-step-port-background, ${NEXT_STEP_PORT_COLOR})`,
	NODE_NEXT_STEP_PORT_BORDER: `var(--o23-playground-next-step-port-border, 1px solid ${color(NEXT_STEP_PORT_COLOR).darken(0.1).fade(0.5)})`,
	NODE_NEXT_STEP_PORT_PADDING: 'var(--o23-playground-next-step-port-padding, 0 8px 0 12px)',
	// previous step port
	NODE_PREVIOUS_STEP_PORT_FONT_SIZE: 'var(--o23-playground-previous-step-port-font-size, 14px)',
	NODE_PREVIOUS_STEP_PORT_FONT_WEIGHT: 'var(--o23-playground-previous-step-port-font-weight, 600)',
	NODE_PREVIOUS_STEP_PORT_COLOR: `var(--o23-playground-previous-step-port-color, ${CssVars.INVERT_COLOR})`,
	NODE_PREVIOUS_STEP_PORT_BACKGROUND: `var(--o23-playground-previous-step-port-background, ${PREVIOUS_STEP_PORT_COLOR})`,
	NODE_PREVIOUS_STEP_PORT_BORDER: `var(--o23-playground-previous-step-port-border, 1px solid ${color(PREVIOUS_STEP_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_PREVIOUS_STEP_PORT_PADDING: 'var(--o23-playground-previous-step-port-padding, 0 12px 0 8px)',
	// pre port
	NODE_PRE_PORT_FONT_SIZE: 'var(--o23-playground-pre-port-font-size, 14px)',
	NODE_PRE_PORT_FONT_WEIGHT: 'var(--o23-playground-pre-port-font-weight, 400)',
	NODE_PRE_PORT_COLOR: `var(--o23-playground-pre-port-color, ${CssVars.INVERT_COLOR})`,
	NODE_PRE_PORT_BACKGROUND: `var(--o23-playground-pre-port-background, ${PRE_PORT_COLOR})`,
	NODE_PRE_PORT_BORDER: `var(--o23-playground-pre-port-border, 1px solid ${color(PRE_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_PRE_PORT_PADDING: 'var(--o23-playground-pre-port-padding, 0 12px 0 8px)',
	NODE_PRE_PORT_UNDEFINED_BACKGROUND: `var(--o23-playground-pre-port-undefined-background, ${CssConstants.WAIVE_COLOR})`,
	NODE_PRE_PORT_UNDEFINED_BORDER: `var(--o23-playground-pre-port-undefined-border, 1px solid ${color(CssConstants.WAIVE_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_PRE_PORT_LACKING_BACKGROUND: `var(--o23-playground-pre-port-lacking-background, ${CssVars.DANGER_COLOR})`,
	NODE_PRE_PORT_LACKING_BORDER: `var(--o23-playground-pre-port-lacking-border, 1px solid ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_PRE_PORT_DANGER_BORDER: `var(--o23-playground-pre-port-danger-border, 1px solid ${CssVars.DANGER_COLOR})`,
	NODE_PRE_PORT_DANGER_BACKGROUND: `var(--o23-playground-pre-port-danger-background, ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_PRE_PORT_BADGE_BACKGROUND: `var(--o23-playground-pre-port-badge-background, ${CssVars.SUCCESS_COLOR})`,
	NODE_PRE_PORT_BADGE_DANGER_BACKGROUND: `var(--o23-playground-pre-port-badge-danger-background, ${CssVars.DANGER_COLOR})`,
	NODE_PRE_PORT_BADGE_BORDER: `var(--o23-playground-pre-port-badge-background, 1px solid ${CssVars.INVERT_COLOR})`,
	// post port
	NODE_POST_PORT_FONT_SIZE: 'var(--o23-playground-post-port-font-size, 14px)',
	NODE_POST_PORT_FONT_WEIGHT: 'var(--o23-playground-post-port-font-weight, 400)',
	NODE_POST_PORT_COLOR: `var(--o23-playground-post-port-color, ${CssVars.INVERT_COLOR})`,
	NODE_POST_PORT_BACKGROUND: `var(--o23-playground-post-port-background, ${POST_PORT_COLOR})`,
	NODE_POST_PORT_BORDER: `var(--o23-playground-post-port-border, 1px solid ${color(POST_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_POST_PORT_PADDING: 'var(--o23-playground-post-port-padding, 0 8px 0 12px)',
	NODE_POST_PORT_UNDEFINED_BACKGROUND: `var(--o23-playground-post-port-undefined-background, ${CssConstants.WAIVE_COLOR})`,
	NODE_POST_PORT_UNDEFINED_BORDER: `var(--o23-playground-post-port-undefined-border, 1px solid ${color(CssConstants.WAIVE_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_POST_PORT_LACKING_BACKGROUND: `var(--o23-playground-post-port-lacking-background, ${CssVars.DANGER_COLOR})`,
	NODE_POST_PORT_LACKING_BORDER: `var(--o23-playground-post-port-lacking-border, 1px solid ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_POST_PORT_DANGER_BORDER: `var(--o23-playground-post-port-danger-border, 1px solid ${CssVars.DANGER_COLOR})`,
	NODE_POST_PORT_DANGER_BACKGROUND: `var(--o23-playground-post-port-danger-background, ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_POST_PORT_BADGE_BACKGROUND: `var(--o23-playground-post-port-badge-background, ${CssVars.SUCCESS_COLOR})`,
	NODE_POST_PORT_BADGE_DANGER_BACKGROUND: `var(--o23-playground-post-port-badge-danger-background, ${CssVars.DANGER_COLOR})`,
	NODE_POST_PORT_BADGE_BORDER: `var(--o23-playground-post-port-badge-background, 1px solid ${CssVars.INVERT_COLOR})`,
	// start node
	NODE_START_BORDER_COLOR: `var(--o23-playground-node-start-border-color, ${NODE_START_COLOR})`,
	NODE_START_BORDER: `var(--o23-playground-node-start-border, 2px solid ${NODE_START_COLOR})`,
	NODE_START_TITLE_FONT_SIZE: 'var(--o23-playground-node-start-title-font-size, 16px)',
	NODE_START_TITLE_FONT_WEIGHT: 'var(--o23-playground-node-start-title-font-weight, 600)',
	NODE_START_SECOND_TITLE_FONT_SIZE: 'var(--o23-playground-node-start-second-title-font-size, 14px)',
	NODE_START_SECOND_TITLE_FONT_WEIGHT: 'var(--o23-playground-node-start-second-title-font-weight, 600)',
	NODE_START_TITLE_COLOR: `var(--o23-playground-node-start-title-color, ${CssVars.INVERT_COLOR})`,
	NODE_START_TITLE_BACKGROUND: `var(--o23-playground-node-start-title-background, linear-gradient(135deg, ${NODE_START_COLOR} 0%, ${color(NODE_START_COLOR).alpha(0.7)} 70%, ${color(NODE_START_COLOR).alpha(0.5)} 100%))`,
	NODE_START_SECOND_TITLE_DECORATION: 'var(--o23-playground-node-start-second-title-decoration, underline double)',
	NODE_START_BODY_HEIGHT: `var(--o23-playground-node-start-body-height, 32px)`,
	NODE_START_BODY_PADDING: 'var(--o23-playground-node-start-body-padding, 8px 0)',
	// end node
	NODE_END_BORDER_COLOR: `var(--o23-playground-node-end-border-color, ${NODE_END_COLOR})`,
	NODE_END_BORDER: `var(--o23-playground-node-end-border, 2px solid ${NODE_END_COLOR})`,
	NODE_END_TITLE_FONT_SIZE: 'var(--o23-playground-node-end-title-font-size, 16px)',
	NODE_END_TITLE_FONT_WEIGHT: 'var(--o23-playground-node-end-title-font-weight, 600)',
	NODE_END_TITLE_COLOR: `var(--o23-playground-node-end-title-color, ${CssVars.INVERT_COLOR})`,
	NODE_END_TITLE_BACKGROUND: `var(--o23-playground-node-end-title-background, linear-gradient(135deg, ${NODE_END_COLOR} 0%, ${color(NODE_END_COLOR).alpha(0.7)} 70%, ${color(NODE_END_COLOR).alpha(0.5)} 100%))`,
	NODE_END_BODY_HEIGHT: 'var(--o23-playground-node-end-body-height, 32px)',
	NODE_END_BODY_PADDING: 'var(--o23-playground-node-end-body-padding, 8px 0)',
	// step node
	NODE_STEP_BORDER: `var(--o23-playground-node-step-border, 2px solid ${NODE_STEP_COLOR})`,
	NODE_STEP_TITLE_FONT_SIZE: 'var(--o23-playground-node-step-title-font-size, 16px)',
	NODE_STEP_TITLE_FONT_WEIGHT: 'var(--o23-playground-node-step-title-font-weight, 600)',
	NODE_STEP_TITLE_COLOR: `var(--o23-playground-node-step-title-color, ${CssVars.INVERT_COLOR})`,
	NODE_STEP_TITLE_BACKGROUND: `var(--o23-playground-node-step-title-background, linear-gradient(135deg, ${NODE_STEP_COLOR} 0%, ${color(NODE_STEP_COLOR).alpha(0.7)} 70%, ${color(NODE_STEP_COLOR).alpha(0.5)} 100%))`,
	NODE_STEP_BODY_HEIGHT: 'var(--o23-playground-node-step-body-height, 32px)',
	NODE_STEP_BODY_PADDING: 'var(--o23-playground-node-step-body-padding, 8px 0)'
};

// background: linear-gradient(90deg, #24606e, #1f6b73, #207675, #2c8174, #3e8b71, #54956b, #6c9e65, #87a55f, #a3ab5b, #c1b05a, #e0b35f, #ffb56b);
// background: linear-gradient(165deg, #005f7a, #00618b, #18629a, #3d61a6, #615cac, #8454aa, #a449a2, #c13a92, #d72a7b, #e72160, #ed2b41, #eb4119);
// linear-gradient(165deg, rgba(34,150,241,1) 0%, rgba(31,123,195,1) 80%, rgba(20,77,121,1) 100%);