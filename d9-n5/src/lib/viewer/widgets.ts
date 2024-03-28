import {DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../widgets';

// noinspection CssUnresolvedCustomProperty
export const ViewerWrapper = styled.div.attrs<{ minViewerWidth?: number }>(
	({minViewerWidth}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-playground-viewer',
			'data-v-scroll': '',
			'data-h-scroll': '',
			style: {
				'--min-viewer-width': minViewerWidth == null ? '600px' : Utils.toCssSize(minViewerWidth)
			}
		};
	})<{ minViewerWidth?: number }>`
    display: block;
    position: relative;
    align-self: stretch;
    grid-column: 3;
    grid-row: 1 / span 2;
    overflow: auto;

    > div[data-w=d9-page] {
        margin: 16px;
        min-width: var(--min-viewer-width);
    }
`;

export const ParseError = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-viewer-error'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
    color: ${PlaygroundCssVars.VIEWER_ERROR_COLOR};
    font-size: 1.5em;
    font-style: italic;
    font-weight: 500;
`;
export const WidgetWrapper = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-widget-wrapper'})`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    user-select: none;
    pointer-events: none;
    border-radius: ${PlaygroundCssVars.WIDGET_WRAPPER_BORDER_RADIUS};
    box-shadow: ${PlaygroundCssVars.WIDGET_WRAPPER_SHADOW};
    transition: top 0.2s, left 0.2s, width 0.2s, height 0.2s;
    z-index: ${PlaygroundCssVars.WIDGET_WRAPPER_Z_INDEX};
`;
