import styled from 'styled-components';
import {CssVars} from '../../constants';

export const PopupHeaderContainer = styled.div.attrs({'data-w': 'd9-calendar-popup-header'})`
    display: flex;
    align-items: center;
    border-bottom: ${CssVars.BORDER};
    height: ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: default;
`;
export const PopupHeaderDateLabel = styled.span.attrs({'data-w': 'd9-calendar-popup-date-label'})`
	font-size    : 0.8em;
	font-weight  : ${CssVars.FONT_BOLD};
	font-variant : ${CssVars.FONT_VARIANT};
	margin-right : 0.5em;
`;
export const PopupHeaderTimeLabel = styled.span.attrs({'data-w': 'd9-calendar-popup-header-time-label'})`
	font-size    : 0.8em;
	font-weight  : ${CssVars.FONT_BOLD};
	font-variant : ${CssVars.FONT_VARIANT};
`;
export const PopupHeaderPlaceholder = styled.span.attrs({'data-w': 'd9-calendar-popup-header-placeholder'})`
	flex-grow : 1;
`;
export const PopupHeaderTimeButton = styled.div.attrs({'data-w': 'd9-calendar-popup-header-time-button'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	color           : ${CssVars.FONT_COLOR};
	height          : calc(${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - 4px);
	width           : calc(${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - 4px);
	max-height      : ${CssVars.INPUT_HEIGHT};
	font-size       : 0.8em;
	font-weight     : ${CssVars.FONT_BOLD};
	font-variant : ${CssVars.FONT_VARIANT};
	border-radius   : ${CssVars.BORDER_RADIUS};
	cursor          : pointer;
	&:hover {
		background-color : ${CssVars.HOVER_COLOR};;
		color            : ${CssVars.PRIMARY_COLOR};
		> svg {
			fill : ${CssVars.PRIMARY_COLOR};
		}
	}
`;
