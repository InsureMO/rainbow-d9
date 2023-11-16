import styled from 'styled-components';
import {CssVars} from '../../constants';

export const TimePickerContainer = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr 1fr 1fr;
	grid-template-rows    : calc(${CssVars.INPUT_HEIGHT} * 1.5) 1fr;
	grid-column-gap       : ${CssVars.CALENDAR_GUTTER_SIZE};
	padding               : 0 ${CssVars.CALENDAR_GUTTER_SIZE} ${CssVars.CALENDAR_GUTTER_SIZE};
	cursor                : default;
`;
export const TimePickerLabel = styled.div`
	display      : flex;
	align-items  : center;
	font-variant : ${CssVars.FONT_PETITE_CAPS};
	font-weight  : ${CssVars.FONT_BOLD}
`;
export const TimePickerSelector = styled.div.attrs({'data-v-scroll': ''})`
	display        : flex;
	flex-direction : column;
	height         : calc(${CssVars.CALENDAR_POPUP_HEIGHT_VALUE}px - ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - ${CssVars.INPUT_HEIGHT} * 1.5 - ${CssVars.CALENDAR_GUTTER_SIZE});
	border-radius  : ${CssVars.BORDER_RADIUS};
	border         : ${CssVars.BORDER};
	overflow-y     : scroll;
`;
export const TimePickerSelectorOption = styled.span`
	display     : flex;
	align-items : center;
	min-height  : ${CssVars.INPUT_HEIGHT};
	padding     : 0 calc(var(--margin) / 2);
	cursor      : pointer;
	&:hover {
		background-color : ${CssVars.HOVER_COLOR};
	}
`;