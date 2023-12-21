import styled, {keyframes} from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from '../../constants';

const SpinnerKeyFrames = keyframes`
	0% {
		transform : rotate(0deg);
	}
	100% {
		transform : rotate(360deg);
	}
`;

export const RemoteRequestContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		[DOM_KEY_WIDGET]: 'remote-request',
		style: {
			opacity: visible ? 0.5 : 0
		}
	};
})<{ visible: boolean }>`
    display: flex;
    position: fixed;
    right: 16px;
    bottom: 16px;
    user-select: none;
    pointer-events: none;
    z-index: ${CssVars.REMOTE_REQUEST_Z_INDEX};
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    > svg {
        height: 40px;
        width: 40px;
        animation: 2s linear infinite ${SpinnerKeyFrames};
        fill: ${CssVars.REMOTE_REQUEST_COLOR};
    }
`;