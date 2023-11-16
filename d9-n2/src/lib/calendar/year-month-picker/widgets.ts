import styled from 'styled-components';
import {CssVars} from '../../constants';

export const YearMonthPickerContainer = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 33% 1fr;
	grid-template-rows    : calc(${CssVars.INPUT_HEIGHT} * 1.5) 1fr;
	grid-column-gap       : ${CssVars.CALENDAR_GUTTER_SIZE};
	padding               : 0 ${CssVars.CALENDAR_GUTTER_SIZE} ${CssVars.CALENDAR_GUTTER_SIZE};
	cursor                : default;
`;
export const YearMonthPickerLabel = styled.div`
	display      : flex;
	align-items  : center;
	font-variant : ${CssVars.FONT_PETITE_CAPS};
	font-weight  : ${CssVars.FONT_BOLD};
	&:nth-child(3) {
		margin-left : calc(${CssVars.CALENDAR_GUTTER_SIZE} * 2);
	}
`;
export const YearSelector = styled.div.attrs({'data-v-scroll': ''})`
	display        : flex;
	flex-direction : column;
	border-radius  : ${CssVars.BORDER_RADIUS};
	border         : ${CssVars.BORDER};
	height         : calc(${CssVars.CALENDAR_POPUP_HEIGHT_VALUE}px - ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - ${CssVars.INPUT_HEIGHT} * 1.5 - ${CssVars.CALENDAR_GUTTER_SIZE});
	overflow-y     : scroll;
`;
export const YearSelectorOption = styled.span`
	display     : flex;
	align-items : center;
	min-height  : ${CssVars.INPUT_HEIGHT};
	padding     : 0 ${CssVars.CALENDAR_GUTTER_SIZE};
	cursor      : pointer;
	&:hover {
		background-color : ${CssVars.HOVER_COLOR};
	}
`;
export const MonthSelector = styled.div`
	display               : grid;
	grid-template-columns : 1fr 1fr 1fr;
	grid-column-gap       : ${CssVars.CALENDAR_GUTTER_SIZE};
	grid-row-gap          : ${CssVars.CALENDAR_GUTTER_SIZE};
`;
export const MonthSelectorOption = styled.span`
	display         : flex;
	align-items     : center;
	justify-content : center;
	border-radius   : ${CssVars.BORDER_RADIUS};
	cursor          : pointer;
	&:hover {
		background-color : ${CssVars.HOVER_COLOR};
	}
`;
