import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from '../../constants';

export const DialogContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		[DOM_KEY_WIDGET]: 'dialog',
		style: {
			opacity: visible ? 1 : (void 0),
			pointerEvents: visible ? 'auto' : (void 0)
		}
	};
})<{ visible: boolean }>`
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

export const DialogWrapper = styled.div.attrs({[DOM_KEY_WIDGET]: 'dialog-wrapper'})`
    margin-top: ${CssVars.DIALOG_MARGIN_TOP};
    margin-left: ${CssVars.DIALOG_MARGIN_LEFT};
    width: ${CssVars.DIALOG_WIDTH};
    padding: ${CssVars.DIALOG_PADDING};
    display: flex;
    flex-direction: column;
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    box-shadow: ${CssVars.DIALOG_SHADOW};
`;

export const DialogHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'dialog-header'})`
    display: flex;
    position: relative;
    padding: 0 ${CssVars.DIALOG_HEADER_PADDING};
    min-height: ${CssVars.DIALOG_HEADER_MIN_HEIGHT};
    margin: ${CssVars.DIALOG_HEADER_MARGIN};
    align-items: center;
`;

export const DialogTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'dialog-title'})`
    font-family: ${CssVars.DIALOG_HEADER_FONT_FAMILY};
    font-size: ${CssVars.DIALOG_HEADER_FONT_SIZE};
    text-transform: uppercase;
`;

export const DialogBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'dialog-body'})`
    flex-grow: 1;
    min-height: ${CssVars.DIALOG_BODY_MIN_HEIGHT};
`;

export const DialogFooter = styled.div.attrs({[DOM_KEY_WIDGET]: 'dialog-footer'})`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > button {
        :not(:last-child) {
            margin-right: ${CssVars.DIALOG_FOOTER_BUTTON_GAP_SIZE};
        }
    }
`;
export const DialogLabel = styled.span.attrs({[DOM_KEY_WIDGET]: 'dialog-label'})`
    font-variant: ${CssVars.FONT_VARIANT};
    line-height: ${CssVars.LINE_HEIGHT};
    min-height: ${CssVars.LINE_HEIGHT};
`;