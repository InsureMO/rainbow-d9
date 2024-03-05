import React from 'react';
import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty
export const D9HelpWrapper = styled.div.attrs(() => {
	return {
		'data-w': 'd9-playground-help',
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
	return <D9HelpWrapper/>;
};