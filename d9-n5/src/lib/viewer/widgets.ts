import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty
export const ViewerWrapper = styled.div.attrs(() => {
	return {
		[DOM_KEY_WIDGET]: 'd9-playground-viewer',
		style: {}
	};
})`
    display: block;
    position: relative;
    align-self: stretch;
    grid-column: 3;
    grid-row: 1 / span 2;
    overflow: auto;

    > div[data-w=d9-page] {
        margin: 16px;
    }
`;

export const ParseError = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-playground-viewer-error'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
`;