import React from 'react';
import styled from 'styled-components';
import {CssVars} from '../constants';

export const PopupContainer = styled.div.attrs({'data-w': 'd9-calendar-popup-wrapper'})`
	display          : flex;
	position         : relative;
	flex-direction   : column;
	background-color : ${CssVars.BACKGROUND_COLOR};
`;
export const CalendarSVGIcon = styled.svg`
	height : ${CssVars.FONT_SIZE};
	width  : calc(${CssVars.FONT_SIZE} + 2px);
	fill   : ${CssVars.FONT_COLOR};
`;
export const LeftCaret = () => {
	return <CalendarSVGIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
		<path
			d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
	</CalendarSVGIcon>;
};
export const RightCaret = () => {
	return <CalendarSVGIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
		<path
			d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
	</CalendarSVGIcon>;
};
