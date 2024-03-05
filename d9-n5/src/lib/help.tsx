import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty
export const HelpWrapper = styled.div.attrs(() => {
	return {
		[DOM_KEY_WIDGET]: 'd9-playground-help',
		style: {}
	};
})`
    display: block;
    position: relative;
    grid-column: 2;
    grid-row: 2;
    overflow: hidden;
`;

export const Help = () => {
	return <HelpWrapper/>;
};