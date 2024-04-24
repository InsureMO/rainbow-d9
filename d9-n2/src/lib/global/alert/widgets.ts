import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from '../../constants';

export const AlertContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		[DOM_KEY_WIDGET]: 'alert',
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
    z-index: ${CssVars.ALERT_Z_INDEX};
`;
export const AlertDialog = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		[DOM_KEY_WIDGET]: 'alert-dialog',
		style: {
			transform: visible ? 'none' : (void 0)
		}
	};
})<{ visible: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${CssVars.ALERT_WIDTH};
    margin-top: ${CssVars.ALERT_MARGIN_TOP};
    margin-left: ${CssVars.ALERT_MARGIN_LEFT};
    padding: ${CssVars.ALERT_PADDING};
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    box-shadow: ${CssVars.DIALOG_SHADOW};
    transform: scale(0.75);
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
export const AlertBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'alert-body', 'data-v-scroll': ''})`
    flex-grow: 1;
    min-height: ${CssVars.ALERT_MIN_HEIGHT};
    max-height: ${CssVars.ALERT_MAX_HEIGHT};
    margin-bottom: ${CssVars.ALERT_MARGIN_BOTTOM};
    overflow: auto;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.CAPTION_FONT_COLOR};
`;
export const AlertFooter = styled.div.attrs({[DOM_KEY_WIDGET]: 'alert-footer'})`
    display: flex;
    justify-content: flex-end;
`;
export const AlertLabel = styled.span.attrs({[DOM_KEY_WIDGET]: 'alert-label'})`
    font-variant: ${CssVars.FONT_VARIANT};
    min-height: ${CssVars.INPUT_HEIGHT};
`;
