import styled from 'styled-components';
import {CssVars} from '../../constants';

export const PopupHeaderContainer = styled.div`
	display       : flex;
	align-items   : center;
	border-bottom : ${CssVars.BORDER};
	height        : ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT};
	padding       : 0 ${CssVars.CALENDAR_GUTTER_SIZE};
	cursor        : default;
	> svg:first-child {
		margin-right : ${CssVars.BUTTON_ICON_GAP}
	}
	> span:nth-child(5),
	> span:nth-child(6) {
		display          : flex;
		position         : relative;
		align-items      : center;
		justify-content  : center;
		padding          : 0 calc(var(--margin) / 3);
		height           : calc(${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} + 1px);
		min-width        : 50px;
		margin-top       : -1px;
		background-color : ${CssVars.PRIMARY_COLOR};
		color            : ${CssVars.INVERT_COLOR};
		cursor           : pointer;
	}
	> span:nth-child(6) {
		margin-right            : -1px;
		border-top-right-radius : ${CssVars.BORDER_RADIUS};
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 25%;
			left             : 0;
			width            : 1px;
			height           : 50%;
			background-color : ${CssVars.INVERT_COLOR};
		}
	}
`;
export const PopupHeaderDateLabel = styled.span`
	font-size    : 0.8em;
	font-weight  : ${CssVars.FONT_BOLD};
	font-variant : ${CssVars.FONT_PETITE_CAPS};
	margin-right : 0.5em;
`;
export const PopupHeaderTimeLabel = styled.span`
	font-size    : 0.8em;
	font-weight  : ${CssVars.FONT_BOLD};
	font-variant : ${CssVars.FONT_PETITE_CAPS};
`;
export const PopupHeaderPlaceholder = styled.span`
	flex-grow : 1;
`;
export const PopupHeaderTimeButton = styled.div`
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
	font-variant : ${CssVars.FONT_PETITE_CAPS};
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
