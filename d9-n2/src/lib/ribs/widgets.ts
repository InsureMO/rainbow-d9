import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';

export const ARibs = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-ribs',
		[DOM_ID_WIDGET]: id
	};
})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	&[data-visible=false] {
		display : none;
	}
	> button {
		margin-top : 16px;
		max-height : ${CssVars.RIB_BUTTON_HEIGHT};
	}
`;
export const ARibRow = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-rib-row'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	margin-bottom  : ${CssVars.RIB_GAP_SIZE};
`;
export const ARibRowHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-rib-row-header'})`
	display               : grid;
	position              : relative;
	align-items           : center;
	grid-template-columns : auto 1fr auto;
	grid-column-gap       : ${CssVars.SECTION_BODY_PADDING};
	border-radius         : ${CssVars.RIB_BORDER_RADIUS};
	background-color      : ${CssVars.RIB_HEADER_BACKGROUND_COLOR};
	padding               : ${CssVars.SECTION_BODY_PADDING} 0 ${CssVars.SECTION_BODY_PADDING} calc(${CssVars.SECTION_BODY_PADDING} * 2);
`;
export const ARibRowIndex = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-rib-row-index'})`
	display     : flex;
	position    : relative;
	font-size   : 0.8em;
	font-weight : ${CssVars.FONT_BOLD};
`;
export const ARibRowHeaderContent = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-rib-row-header-content'})`
	display  : block;
	position : relative;
`;
export const ARibRowOperators = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-rib-row-operators'})`
	display     : flex;
	position    : relative;
	align-items : center;
	> span {
		display     : flex;
		position    : relative;
		align-items : center;
		padding     : 0 ${CssVars.BUTTON_INDENT};
	}
`;
export const ARibRowOperator = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-rib-row-operator'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	width           : ${CssVars.RIB_BUTTON_HEIGHT};
	min-height      : ${CssVars.RIB_BUTTON_HEIGHT};
	border-radius   : ${CssVars.BORDER_RADIUS};
	border          : ${CssVars.BORDER};
	border-color    : ${CssVars.PRIMARY_COLOR};
	cursor          : pointer;
	overflow        : hidden;
	transition      : all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
	&:not(:first-child) {
		margin-left : 8px;
	}
	&:hover {
		box-shadow       : ${CssVars.PRIMARY_SHADOW};
		background-color : ${CssVars.PRIMARY_COLOR};
		> svg {
			fill : ${CssVars.INVERT_COLOR};
		}
	}
	> svg {
		fill       : ${CssVars.PRIMARY_COLOR};
		height     : ${CssVars.FONT_SIZE};
		transition : background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
	}
`;
export const ARibRowBody = styled.div.attrs<{ expanded: boolean }>(({expanded}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-rib-row-body',
		style: {
			padding: expanded ? (void 0) : 0,
			height: expanded ? (void 0) : 0
		}
	};
})<{ expanded: boolean }>`
	display               : grid;
	position              : relative;
	grid-column           : 1 / span 2;
	grid-template-columns : repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
	grid-column-gap       : ${CssVars.GRID_COLUMN_GAP};
	grid-row-gap          : ${CssVars.GRID_ROW_GAP};
	padding               : ${CssVars.SECTION_BODY_PADDING};
	overflow              : hidden;
`;
export const ARibNoDataRow = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-rib-no-data-row'})`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    min-width: 100%;
    height: ${CssVars.INPUT_HEIGHT};

    > span {
        display: flex;
        position: relative;
        align-items: center;
        min-height: ${CssVars.TABLE_CELL_HEIGHT};
        padding: 0 ${CssVars.TABLE_CELL_PADDING};
    }
`;
export const ARibBottomBar = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-rib-bottom-bar'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : flex-end;
	height          : ${CssVars.RIB_FOOTER_HEIGHT};
	margin-top      : 0;
	z-index         : 4;
	> button {
		max-height : ${CssVars.RIB_BUTTON_HEIGHT};
	}
`;
