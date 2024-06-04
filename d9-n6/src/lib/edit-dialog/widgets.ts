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
export const EditDialogContentContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-content'})`
    display: grid;
    position: relative;
    height: 100%;
    width: 100%;
    transition: grid-template-columns ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
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
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-help-doc',
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

    > div.markdown-body {
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
    }
`;
export const NavigatorDialogNavigatorElementsContainer = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-configurable-elements',
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
export const NavigatorConfigurableElementContainer = styled.div.attrs<{ level: number }>(
	({level}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-configurable-element',
			style: {
				'--level': level
			}
		};
	})<{ level: number }>`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HEIGHT};
    margin: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_MARGIN};
    padding: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_PADDING};
    border-radius: 0;
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HOVER_COLOR};
        border-radius: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BORDER_RADIUS};
        font-weight: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_HOVER_FONT_WEIGHT};
    }

    &:not(:last-child) {
        border-bottom: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_BORDER};
    }
`;
// noinspection CssUnresolvedCustomProperty
export const NavigatorConfigurableElementTreeLine = styled.span.attrs<{ level: number; }>(
	({level}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-configurable-element-tree-line',
			style: {
				'--margin-left': `calc(${level - 1} * ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT})`
			}
		};
	})<{ level: number; }>`
    display: flex;
    position: relative;
    align-self: stretch;
    width: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT};
    margin-left: var(--margin-left);

    &:before {
        content: '';
        display: block;
        position: absolute;
        width: 1px;
        height: calc(100% + 1px);
        top: 0;
        left: 3px;
        background-color: ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
    }

    &[data-last-level=true] {
        &:after {
            content: '';
            display: block;
            position: absolute;
            width: 100%;
            height: 50%;
            top: 0;
            left: 3px;
            border-bottom-left-radius: 3px;
            border-bottom: 1px solid ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
        }

        &[data-last-node=true]:before {
            display: none;
        }

        &[data-last-node=true]:after {
            border-left: 1px solid ${PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_TREE_LINE_COLOR};
        }
    }

    &[data-last-level=false][data-last-node=true]:before {
        display: none;
    }
`;
// noinspection CssUnresolvedCustomProperty
export const NavigatorConfigurableElementLabel = styled.div.attrs<{ level: number }>(
	({level}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-configurable-element-label',
			style: {
				'--margin-left': level === 0 ? 0 : PlaygroundCssVars.EDIT_DIALOG_CONFIGURABLE_ELEMENT_INDENT
			}
		};
	})<{ level: number }>`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    margin-left: var(--margin-left);
`;
export const NavigatorConfigurableElementBadge = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-configurable-element-badge'})`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
`;
