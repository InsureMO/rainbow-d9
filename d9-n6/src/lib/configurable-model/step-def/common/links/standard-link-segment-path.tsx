import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled, {keyframes} from 'styled-components';

export const StandardLinkSelectionKeyFrames = keyframes`
    from {
        stroke-dashoffset: 24;
    }
    to {
        stroke-dashoffset: 0;
    }
`;

// noinspection CssUnresolvedCustomProperty
export const StandardLinkSegmentPath = styled.path.attrs<{ selected: boolean }>(
	({selected}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-link-segment-path',
			style: {
				'--selected-stroke-dasharray': selected ? '10, 2' : (void 0),
				'--selected-animation': selected ? 'running' : 'paused'
			}
		};
	})<{ selected: boolean }>`
    fill: none;
    pointer-events: auto;
    stroke-dasharray: var(--selected-stroke-dasharray);
    animation: ${StandardLinkSelectionKeyFrames} 1s linear infinite;
    animation-play-state: var(--selected-animation);
`;
