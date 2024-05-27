import {CssConstants, CssVars} from '@rainbow-d9/n2';
import color from 'color';

const EDITOR_BACKGROUND_BLOCK_SIZE = 'var(--o23-playground-editor-background-block-size, 48px)';
const EDITOR_BACKGROUND_LINE_COLOR = `var(--o23-playground-editor-background-line-color, ${color(CssConstants.PRIMARY_COLOR).alpha(0.08)})`;
const NODE_START_COLOR = '#ffb56b';
const NODE_END_COLOR = '#e0b35f';
const NEXT_STEP_PORT_COLOR = '#1f6b73';
const PREVIOUS_STEP_PORT_COLOR = '#00618b';
const REST_API_VARIABLE_PORT_COLOR = '#87a55f';
const NODE_PORT_UNDEFINED_COLOR = '#968b82';
export const PlaygroundCssVars = {
	EDITOR_BACKGROUND_BLOCK_SIZE,
	EDITOR_BACKGROUND_LINE_COLOR,
	EDITOR_BACKGROUND_IMAGE: `var(--o23-playground-editor-background-image, linear-gradient(to right, ${EDITOR_BACKGROUND_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${EDITOR_BACKGROUND_LINE_COLOR} 1px, transparent 1px))`,
	EDITOR_BACKGROUND_SIZE: `var(--o23-playground-editor-background-size, ${EDITOR_BACKGROUND_BLOCK_SIZE} ${EDITOR_BACKGROUND_BLOCK_SIZE})`,
	EDITOR_BACKGROUND_POSITION: `var(--o23-playground-editor-background-position, -1px -1px)`,
	EDITOR_ERROR_COLOR: `var(--o23-playground-viewer-error-color, ${CssVars.DANGER_COLOR})`,
	// node common
	NODE_BORDER_RADIUS: `var(--o23-playground-node-border-radius, 8px)`,
	NODE_BACKGROUND: `var(--o23-playground-node-background, ${CssVars.BACKGROUND_COLOR})`,
	NODE_TITLE_PADDING: `var(--o23-playground-node-title-padding, 0 10px)`,
	NODE_MIN_WIDTH: `var(--o23-playground-node-min-width, 160px)`,
	NODE_ICON_SIZE: `var(--o23-playground-node-icon-size, 14px)`,
	NODE_PORT_HEIGHT: `var(--o23-playground-node-port-height, 24px)`,
	// next step port
	NODE_NEXT_STEP_PORT_FONT_SIZE: `var(--o23-playground-next-step-port-font-size, 14px)`,
	NODE_NEXT_STEP_PORT_FONT_WEIGHT: `var(--o23-playground-next-step-port-font-weight, 600)`,
	NODE_NEXT_STEP_PORT_COLOR: `var(--o23-playground-next-step-port-color, ${CssVars.INVERT_COLOR})`,
	NODE_NEXT_STEP_PORT_BACKGROUND: `var(--o23-playground-next-step-port-background, ${NEXT_STEP_PORT_COLOR})`,
	NODE_NEXT_STEP_PORT_BORDER: `var(--o23-playground-next-step-port-border, 1px solid ${color(NEXT_STEP_PORT_COLOR).darken(0.1).fade(0.5)})`,
	NODE_NEXT_STEP_PORT_PADDING: `var(--o23-playground-next-step-port-padding, 0 8px 0 12px)`,
	// previous step port
	NODE_PREVIOUS_STEP_PORT_FONT_SIZE: `var(--o23-playground-previous-step-port-font-size, 14px)`,
	NODE_PREVIOUS_STEP_PORT_FONT_WEIGHT: `var(--o23-playground-previous-step-port-font-weight, 600)`,
	NODE_PREVIOUS_STEP_PORT_COLOR: `var(--o23-playground-previous-step-port-color, ${CssVars.INVERT_COLOR})`,
	NODE_PREVIOUS_STEP_PORT_BACKGROUND: `var(--o23-playground-previous-step-port-background, ${PREVIOUS_STEP_PORT_COLOR})`,
	NODE_PREVIOUS_STEP_PORT_BORDER: `var(--o23-playground-previous-step-port-border, 1px solid ${color(PREVIOUS_STEP_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_PREVIOUS_STEP_PORT_PADDING: `var(--o23-playground-previous-step-port-padding, 0 12px 0 8px)`,
	// rest api variable port
	NODE_REST_API_VARIABLE_PORT_FONT_SIZE: `var(--o23-playground-rest-api-variable-port-font-size, 14px)`,
	NODE_REST_API_VARIABLE_PORT_FONT_WEIGHT: `var(--o23-playground-rest-api-variable-port-font-weight, 400)`,
	NODE_REST_API_VARIABLE_PORT_COLOR: `var(--o23-playground-rest-api-variable-port-color, ${CssVars.INVERT_COLOR})`,
	NODE_REST_API_VARIABLE_PORT_BACKGROUND: `var(--o23-playground-rest-api-variable-port-background, ${REST_API_VARIABLE_PORT_COLOR})`,
	NODE_REST_API_VARIABLE_PORT_BORDER: `var(--o23-playground-rest-api-variable-port-border, 1px solid ${color(REST_API_VARIABLE_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_REST_API_VARIABLE_PORT_PADDING: `var(--o23-playground-rest-api-variable-port-padding, 0 12px 0 8px)`,
	NODE_REST_API_VARIABLE_PORT_UNDEFINED_BACKGROUND: `var(--o23-playground-rest-api-variable-port-undefined-background, ${NODE_PORT_UNDEFINED_COLOR})`,
	NODE_REST_API_VARIABLE_PORT_UNDEFINED_BORDER: `var(--o23-playground-rest-api-variable-port-undefined-border, 1px solid ${color(NODE_PORT_UNDEFINED_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_REST_API_VARIABLE_PORT_LACKING_BACKGROUND: `var(--o23-playground-rest-api-variable-port-lacking-background, ${CssVars.DANGER_COLOR})`,
	NODE_REST_API_VARIABLE_PORT_LACKING_BORDER: `var(--o23-playground-rest-api-variable-port-lacking-border, 1px solid ${color(CssConstants.DANGER_COLOR).darken(0.1).opaquer(0.5)})`,
	NODE_REST_API_VARIABLE_PORT_BADGE_BACKGROUND: `var(--o23-playground-rest-api-variable-port-badge-background, ${CssVars.SUCCESS_COLOR})`,
	NODE_REST_API_VARIABLE_PORT_BADGE_BORDER: `var(--o23-playground-rest-api-variable-port-badge-background, 1px solid ${CssVars.INVERT_COLOR})`,
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
	NODE_START_BODY_PADDING: `var(--o23-playground-node-start-body-padding, 8px 0)`,
	// start node
	NODE_END_BORDER_COLOR: `var(--o23-playground-node-end-border-color, ${NODE_END_COLOR})`,
	NODE_END_BORDER: `var(--o23-playground-node-end-border, 2px solid ${NODE_END_COLOR})`,
	NODE_END_TITLE_FONT_SIZE: 'var(--o23-playground-node-end-title-font-size, 16px)',
	NODE_END_TITLE_FONT_WEIGHT: `var(--o23-playground-node-end-title-font-weight, 600)`,
	NODE_END_TITLE_COLOR: `var(--o23-playground-node-end-title-color, ${CssVars.INVERT_COLOR})`,
	NODE_END_TITLE_BACKGROUND: `var(--o23-playground-node-end-title-background, linear-gradient(135deg, ${NODE_END_COLOR} 0%, ${color(NODE_END_COLOR).alpha(0.7)} 70%, ${color(NODE_END_COLOR).alpha(0.5)} 100%))`,
	NODE_END_BODY_HEIGHT: `var(--o23-playground-node-end-body-height, 32px)`,
	NODE_END_BODY_PADDING: `var(--o23-playground-node-end-body-padding, 8px 0)`
};

// background: linear-gradient(90deg, #24606e, #1f6b73, #207675, #2c8174, #3e8b71, #54956b, #6c9e65, #87a55f, #a3ab5b, #c1b05a, #e0b35f, #ffb56b);
// background: linear-gradient(165deg, #005f7a, #00618b, #18629a, #3d61a6, #615cac, #8454aa, #a449a2, #c13a92, #d72a7b, #e72160, #ed2b41, #eb4119);
// linear-gradient(165deg, rgba(34,150,241,1) 0%, rgba(31,123,195,1) 80%, rgba(20,77,121,1) 100%);