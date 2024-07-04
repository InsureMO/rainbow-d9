import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../widgets';

export const EditDialogContainer = styled.div.attrs<{ visible: boolean }>(
	({visible}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog',
			style: {
				opacity: visible ? 1 : (void 0),
				pointerEvents: visible ? 'auto' : (void 0)
			}
		};
	})<{ visible: boolean }>`
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
export const EditDialogWrapper = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-wrapper'})`
    display: block;
    position: relative;
    margin-top: ${PlaygroundCssVars.EDIT_DIALOG_MARGIN_TOP};
    margin-left: ${PlaygroundCssVars.EDIT_DIALOG_MARGIN_LEFT};
    width: ${PlaygroundCssVars.EDIT_DIALOG_WIDTH};
    height: ${PlaygroundCssVars.EDIT_DIALOG_HEIGHT};
`;
export const EditDialogLayoutControllerHandle = styled.div.attrs<{ opened: boolean }>(
	({opened}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-layout-controller',
			'data-opened': opened
		};
	})<{ opened: boolean }>`
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
export const EditDialogContentContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-content'})`
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
export const EditDialogContentInitializer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-content-initializer'})`
    display: none;
`;
export const EditorDialogCloser = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-closer'})`
    display: flex;
    position: absolute;
    align-items: center;
    top: ${PlaygroundCssVars.EDIT_DIALOG_CLOSER_TOP};
    right: 0;
`;
export const EditorDialogCloseButton = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-close-button'})`
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
export const EditDialogHelpDocContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-help-doc'})`
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
export const EditDialogNavigatorContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-navigator'})`
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
export const EditDialogSpecificDetailsContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-specific-details'})`
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
export const EditDialogPartContent = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-part-content'})`
    display: flex;
    position: relative;
    flex-direction: column;
    align-self: stretch;
    flex-grow: 1;
`;
export const EditDialogPartHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-part-header'})`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${PlaygroundCssVars.EDIT_DIALOG_PART_HEADER_HEIGHT};
    margin-bottom: calc(${PlaygroundCssVars.EDIT_DIALOG_PART_HEADER_HEIGHT} / 4);
`;
export const EditDialogPartTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-part-title'})`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    font-size: ${PlaygroundCssVars.EDIT_DIALOG_PART_TITLE_FONT_SIZE};
    font-weight: ${PlaygroundCssVars.EDIT_DIALOG_PART_TITLE_FONT_WEIGHT};
    white-space: nowrap;
    transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
export const EditDialogPartBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-part-body'})`
    display: flex;
    position: relative;
    flex-grow: 1;
    margin: ${PlaygroundCssVars.EDIT_DIALOG_PART_BODY_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_PART_BODY_PADDING};
    overflow: hidden;
`;
// noinspection CssUnresolvedCustomProperty
export const EditDialogHelpDocOpenHandle = styled.div.attrs<{ opened: boolean }>(
	({opened}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-help-doc-open-handle',
			'data-opened': opened,
			style: {
				'--opacity': opened ? 0 : (void 0),
				'--pointer-events': opened ? 'none' : 'auto',
				'--left': opened ? `calc(100% - ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_WIDTH})` : PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_OPEN_HANDLE_LEFT
			}
		};
	})<{ opened: boolean }>`
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
// noinspection CssUnresolvedCustomProperty
export const EditDialogHelpDocCloseHandle = styled.div.attrs<{ opened: boolean }>(
	({opened}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-help-doc-close-handle',
			style: {
				'--opacity': opened ? (void 0) : 0,
				'--pointer-events': opened ? 'auto' : 'none'
			}
		};
	})<{ opened: boolean }>`
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
// noinspection CssUnresolvedCustomProperty
export const HelpDocContainer = styled.div.attrs<{ width?: number }>(
	({width}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-help-doc-content',
			'data-v-scroll': '',
			'data-h-scroll': '',
			style: {
				'--min-width': width ? `calc((${width}px - ${PlaygroundCssVars.EDIT_DIALOG_NAVIGATOR_WIDTH}) / 2 - ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_COLLAPSED_WIDTH} - ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_GUTTER_SIZE})` : (void 0)
			}
		};
	})<{ width?: number }>`
    display: block;
    position: relative;
    flex-grow: 1;
    margin: ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_HELP_DOC_PADDING};
    min-width: var(--min-width);
    overflow: auto;
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, filter ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
export const NavigatorElementsContainer = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-navigator-elements',
	'data-h-scroll': ''
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
// noinspection CssUnresolvedCustomProperty
export const NavigatorElementContainer = styled.div.attrs<{ level: number }>(
	({level}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-navigator-element',
			'data-level': level,
			style: {
				'--level': level
			}
		};
	})<{ level: number }>`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HEIGHT};
    width: 100%;
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
// noinspection CssUnresolvedCustomProperty
export const NavigatorElementLabel = styled.div.attrs<{ level: number }>(
	({level}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-navigator-element-label',
			style: {
				'--margin-left': level == 0 ? 0 : `calc(${level * 2} * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT})`
			}
		};
	})<{ level: number }>`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    margin-left: var(--margin-left);
    height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HEIGHT};
`;
export const NavigatorElementBadge = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-navigator-element-badge'})`
    display: flex;
    position: relative;
    align-items: center;
    font-weight: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BADGE_FONT_WEIGHT};
`;
export const NavigatorElementBadgeWrapper = styled.span.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-navigator-element-badge-wrapper'})`
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
        color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_AS_IS_STEPS_COLOR};
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
// use span, since element use *-of-type selector
// noinspection CssUnresolvedCustomProperty
export const NavigatorElementChildren = styled.span.attrs<{ level: number }>(
	({level}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-navigator-sub-elements',
			'data-level': level,
			style: {
				'--level': level
			}
		};
	})<{ level: number }>`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;

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
export const SpecificElementsContainer = styled.span.attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-specific-elements',
	'data-h-scroll': ''
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
export const SpecificElementLabel = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-specific-element-label'})`
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
export const SpecificElementHelpBadge = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-specific-element-help-badge'})`
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
export const SpecificElementEditorPlaceholder = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-specific-element-editor-placeholder'})``;
export const SpecificElementHelpDoc = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-specific-element-help-doc'})`
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
