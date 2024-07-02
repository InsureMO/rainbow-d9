import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled, {keyframes} from 'styled-components';
import {PlaygroundCssVars} from '../../../../widgets';

export const StandardLinkSelectionKeyFrames = keyframes`
    from {
        stroke-dashoffset: ${PlaygroundCssVars.LINK_SELECTED_STROKE_DASHOFFSET};
    }
    to {
        stroke-dashoffset: 0;
    }
`;

export interface StandardLinkSegmentPathProps {
	selected: boolean;
	dasharray?: string;
	selectedDasharray?: string;
}

// noinspection CssUnresolvedCustomProperty
export const StandardLinkSegmentPath = styled.path.attrs<StandardLinkSegmentPathProps>(
	({selected, dasharray, selectedDasharray}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-link-segment-path',
			style: {
				'--selected-stroke-dasharray': selected ? (selectedDasharray || PlaygroundCssVars.LINK_DEFAULT_SELECTED_STROKE_DASHARRAY) : (dasharray || (void 0)),
				'--selected-animation': selected ? 'running' : 'paused',
				'--selected-z-index': selected ? 1 : (void 0)
			}
		};
	})<StandardLinkSegmentPathProps>`
    fill: none;
    pointer-events: auto;
    stroke-dasharray: var(--selected-stroke-dasharray);
    stroke-linecap: ${PlaygroundCssVars.LINK_STROKE_LINECAP};
    animation: ${StandardLinkSelectionKeyFrames} 1s linear infinite;
    animation-play-state: var(--selected-animation);
    z-index: var(--selected-z-index);
`;
