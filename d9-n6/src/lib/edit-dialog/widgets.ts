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
        grid-template-columns: calc((100% - 400px) / 2 - 64px) 400px 1fr;
    }

    &[data-opened=false] + div[data-w=o23-playground-edit-dialog-content] {
        grid-template-columns: 64px 400px 1fr;
    }
`;
export const EditDialogContentContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-content'})`
    display: grid;
    position: relative;
    height: 100%;
    width: 100%;
    transition: grid-template-columns ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
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
export const EditDialogLeftPart = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-left'})`
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
export const EditDialogCenterPart = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-center'})`
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
export const EditDialogRightPart = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-right'})`
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
`;
export const EditDialogPartTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-part-title'})`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    font-size: ${PlaygroundCssVars.EDIT_DIALOG_PART_TITLE_FONT_SIZE};
    font-weight: ${PlaygroundCssVars.EDIT_DIALOG_PART_TITLE_FONT_WEIGHT};
    color: ${PlaygroundCssVars.EDIT_DIALOG_PART_TITLE_COLOR};
    white-space: nowrap;
`;
export const EditDialogPartBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-part-body'})`
    display: flex;
    position: relative;
    flex-grow: 1;
    overflow: hidden;
`;
// noinspection CssUnresolvedCustomProperty
export const EditDialogLeftPartOpenHandle = styled.div.attrs<{ opened: boolean }>(
	({opened}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-left-open-handle',
			'data-opened': opened,
			style: {
				'--opacity': opened ? 0 : (void 0),
				'--pointer-events': opened ? 'none' : 'auto',
				'--left': opened ? `calc(100% - ${PlaygroundCssVars.EDIT_DIALOG_LEFT_PART_OPEN_HANDLE_WIDTH})` : PlaygroundCssVars.EDIT_DIALOG_LEFT_PART_OPEN_HANDLE_LEFT
			}
		};
	})<{ opened: boolean }>`
    display: flex;
    position: absolute;
    align-items: center;
    top: 0;
    left: var(--left);
    width: ${PlaygroundCssVars.EDIT_DIALOG_LEFT_PART_OPEN_HANDLE_WIDTH};
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
        color: ${PlaygroundCssVars.EDIT_DIALOG_LEFT_PART_OPEN_HANDLE_COLOR};
        opacity: 0.7;
    }
`;
// noinspection CssUnresolvedCustomProperty
export const EditDialogLeftPartCloseHandle = styled.div.attrs<{ opened: boolean }>(
	({opened}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-left-close-handle',
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
            color: ${PlaygroundCssVars.EDIT_DIALOG_LEFT_PART_OPEN_HANDLE_COLOR};
        }
    }

    > svg {
        opacity: 0.7;
        transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
export const HelpDocContainer = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-edit-dialog-help-doc',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
    display: block;
    position: relative;
    flex-grow: 1;
    overflow: auto;
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, filter ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;