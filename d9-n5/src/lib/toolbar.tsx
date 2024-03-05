import {CssVars} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from './widgets';

// noinspection CssUnresolvedCustomProperty
export const D9ToolbarWrapper = styled.div.attrs(() => {
	return {
		'data-w': 'd9-playground-toolbar',
		style: {
			'--width': '80px'
		}
	};
})`
    display: flex;
    position: relative;
    grid-row: span 2;
    width: var(--width);
    background-color: ${PlaygroundCssVars.TOOLBAR_BACKGROUND_COLOR};
    border-right: ${CssVars.BORDER};
`;

export const D9Toolbar = () => {
	return <D9ToolbarWrapper>

	</D9ToolbarWrapper>;
};
