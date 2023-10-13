import {VUtils} from '@d9/n1';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';
import {toCssSize} from '../utils';
import {BodyCellExpandAreaOptions, CellOptions, ContentOptions, RowOptions} from './types';
import {computeRowWidth} from './utils';

export const ATable = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-table',
		[DOM_ID_WIDGET]: id,
		'data-v-scroll': ''
	};
})`
	display  : block;
	position : relative;
	overflow : hidden;
	&[data-visible=false] {
		display : none;
	}
`;
export const ATableRowIndexColumn = styled.div.attrs<{
	columnWidth: string;
	columnHeight?: string;
	headerHeight: string
}>(
	({columnWidth, columnHeight, headerHeight}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-index-column',
			style: {width: columnWidth, height: columnHeight, top: headerHeight}
		};
	})<{ columnWidth: string; columnHeight: string; headerHeight: string }>`
	display       : block;
	position      : absolute;
	left          : 0;
	border-top    : ${CssVars.TABLE_HEADER_BORDER};
	border-bottom : ${CssVars.TABLE_CELL_BORDER};
	overflow      : hidden;
	z-index       : 1;
`;
export const ATableBodyRowIndexCell = styled.div.attrs<{ cellHeight: string }>(({cellHeight}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-table-row-index-cell',
		style: {height: cellHeight}
	};
})<{ cellHeight: string }>`
	display          : flex;
	position         : relative;
	align-self       : stretch;
	align-items      : start;
	min-height       : ${CssVars.TABLE_CELL_HEIGHT};
	padding          : 0 ${CssVars.TABLE_CELL_PADDING};
	border-right     : ${CssVars.TABLE_CELL_BORDER};
	border-bottom    : ${CssVars.TABLE_CELL_BORDER};
	overflow         : hidden;
	white-space      : nowrap;
	background-color : ${CssVars.TABLE_ROW_INDEX_BACKGROUND_COLOR};
	z-index          : 2;
	&:nth-child(2n) {
		background-color : ${CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR};
	}
	&:last-child {
		border-bottom-color : transparent;
	}
	> span {
		display     : flex;
		position    : relative;
		align-items : center;
		min-height  : ${CssVars.TABLE_CELL_HEIGHT};
		font-size   : 0.8em;
		font-weight : ${CssVars.FONT_BOLD};
		opacity     : ${CssVars.TABLE_ROW_INDEX_OPACITY};
	}
`;
export const ATableRowOperatorsColumn = styled.div.attrs<{
	columnWidth: string;
	columnHeight?: string;
	headerHeight: string
}>(
	({columnWidth, columnHeight, headerHeight}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-operators-column',
			style: {width: columnWidth, height: columnHeight, top: headerHeight}
		};
	})<{ columnWidth: string; columnHeight?: string; headerHeight: string }>`
	display        : block;
	position       : absolute;
	flex-direction : column;
	right          : 0;
	border-top     : ${CssVars.TABLE_HEADER_BORDER};
	border-bottom  : ${CssVars.TABLE_CELL_BORDER};
	overflow       : hidden;
	z-index        : 1;
	&[data-vertical-scrolled=true] {
		right : ${CssVars.VERTICAL_SCROLLER_WIDTH}px;
	}
`;
export const ATableRowOperators = styled.div.attrs<{ cellHeight: string }>(
	({cellHeight}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-operators',
			style: {height: cellHeight}
		};
	})<{ cellHeight: string }>`
	display          : flex;
	position         : relative;
	align-items      : start;
	border-left      : ${CssVars.TABLE_CELL_BORDER};
	border-bottom    : ${CssVars.TABLE_CELL_BORDER};
	background-color : ${CssVars.TABLE_ROW_INDEX_BACKGROUND_COLOR};
	z-index          : 3;
	&[data-expanded=true] {
		> span {
			padding                   : ${CssVars.BUTTON_INDENT};
			border-bottom-left-radius : calc(${CssVars.BORDER_RADIUS} * 2);
		}
	}
	:nth-child(2n) {
		background-color : ${CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR};
	}
	&:last-child {
		border-bottom-color : transparent;
	}
	> span {
		display     : flex;
		position    : relative;
		align-items : center;
		min-height  : ${CssVars.TABLE_CELL_HEIGHT};
		padding     : 0 ${CssVars.BUTTON_INDENT};
	}
`;
export const ATableRowOperator = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-table-row-operator'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	width           : calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
	min-height      : calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
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
export const ATableContent = styled.div.attrs<ContentOptions>(
	({headerHeight, maxBodyHeight, rowIndexColumnWidth, rowOperatorsColumnWidth}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-content',
			'data-h-scroll': '',
			'data-v-scroll': '',
			style: {
				paddingLeft: rowIndexColumnWidth, paddingRight: rowOperatorsColumnWidth,
				maxHeight: VUtils.isBlank(maxBodyHeight)
					? (void 0)
					: `calc(${VUtils.isNotBlank(headerHeight) ? toCssSize(headerHeight) : `calc(${CssVars.TABLE_HEADER_HEIGHT} + ${CssVars.TABLE_HEADER_BORDER_SIZE})`} + ${toCssSize(maxBodyHeight)})`
			}
		};
	})<ContentOptions>`
	display        : flex;
	position       : relative;
	flex-direction : column;
	border-bottom  : ${CssVars.TABLE_CELL_BORDER};
	overflow-x     : auto;
	overflow-y     : auto;
`;
export const ATableHeader = styled.div.attrs<RowOptions>(
	({$options: {headers, headerHeight, rowIndexColumnWidth, rowOperatorsColumnWidth}}) => {
		const width = computeRowWidth(headers, rowIndexColumnWidth, rowOperatorsColumnWidth);
		return {
			[DOM_KEY_WIDGET]: 'd9-table-header',
			style: {width, minHeight: headerHeight}
		};
	})<RowOptions>`
	display          : grid;
	position         : sticky;
	top              : 0;
	min-width        : 100%;
	justify-content  : start;
	border-bottom    : ${CssVars.TABLE_HEADER_BORDER};
	background-color : ${CssVars.TABLE_HEADER_BACKGROUND_COLOR};
	z-index          : 1;
`;
export const ATableHeaderCell = styled.div.attrs<CellOptions>(
	({$options: {width}}) => {
		const cssWith = toCssSize(width);
		return {
			[DOM_KEY_WIDGET]: 'd9-table-header-cell',
			style: {width: cssWith}
		};
	})<CellOptions>`
	display     : flex;
	position    : relative;
	grid-row    : 1;
	align-items : center;
	min-height  : ${CssVars.TABLE_HEADER_HEIGHT};
	padding     : 0 ${CssVars.TABLE_CELL_PADDING};
	font-family : ${CssVars.TABLE_HEADER_FONT_FAMILY};
	font-size   : ${CssVars.TABLE_HEADER_FONT_SIZE};
	font-weight : ${CssVars.TABLE_HEADER_FONT_WEIGHT};
	overflow    : hidden;
	white-space : nowrap;
`;
export const ATableNoDataRow = styled.div.attrs<RowOptions>(
	({$options: {headers, rowIndexColumnWidth, rowOperatorsColumnWidth}}) => {
		const width = computeRowWidth(headers, rowIndexColumnWidth, rowOperatorsColumnWidth);
		return {
			[DOM_KEY_WIDGET]: 'd9-table-no-data-row',
			style: {width}
		};
	})<RowOptions>`
	display             : flex;
	position            : relative;
	align-items         : center;
	min-width           : 100%;
	border-bottom       : ${CssVars.TABLE_CELL_BORDER};
	border-bottom-color : transparent;
	> span {
		display     : flex;
		position    : relative;
		align-items : center;
		min-height  : ${CssVars.TABLE_CELL_HEIGHT};
		padding     : 0 ${CssVars.TABLE_CELL_PADDING};
	}
`;
export const ATableBodyRow = styled.div.attrs<RowOptions>(
	({$options: {headers, rowIndexColumnWidth, rowOperatorsColumnWidth}}) => {
		const width = computeRowWidth(headers, rowIndexColumnWidth, rowOperatorsColumnWidth);
		return {
			[DOM_KEY_WIDGET]: 'd9-table-body-row',
			style: {width, gridTemplateColumns: `repeat(${headers.length}, auto) 1fr`}
		};
	})<RowOptions>`
	display         : grid;
	position        : relative;
	justify-content : start;
	min-width       : 100%;
	border-bottom   : ${CssVars.TABLE_CELL_BORDER};
	&:nth-child(2n + 1) {
		background-color : ${CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR};
	}
	&:last-child {
		border-bottom-color : transparent;
	}
	&[data-expanded=true] {
		> div[data-w=d9-table-row-cell] {
			&:first-child {
				margin-left : calc(${CssVars.SECTION_BODY_PADDING} / 2);
			}
			> input[data-w=d9-input],
			> div[data-w=d9-dropdown],
			> div[data-w=d9-calendar] {
				border-color : ${CssVars.BORDER_COLOR};
			}
		}
		> div[data-w=d9-table-row-tail-grabber] {
			margin-right : calc(${CssVars.SECTION_BODY_PADDING} / -2);
		}
	}
	&[data-click-to-expand=true][data-expanded=false] {
		cursor : pointer;
	}
`;
export const ATableBodyCell = styled.div.attrs<CellOptions>(
	({$options: {width}}) => {
		const cssWith = toCssSize(width);
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-cell',
			style: {width: cssWith}
		};
	})<CellOptions>`
	display     : flex;
	position    : relative;
	grid-row    : 1;
	align-items : center;
	min-height  : ${CssVars.TABLE_CELL_HEIGHT};
	padding     : 0 calc(${CssVars.TABLE_CELL_PADDING} + 4px);
	overflow    : hidden;
	white-space : nowrap;
	&:nth-child(2) {
		margin : 0 -4px;
	}
	&:nth-child(3) {
		margin-left : 4px;
	}
	> input[data-w=d9-input],
	> div[data-w=d9-dropdown],
	> div[data-w=d9-calendar] {
		flex-grow    : 1;
		height       : calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
		margin       : 0 calc(${CssVars.TABLE_CELL_PADDING} * -1);
		border-color : transparent;
		&:hover, &:focus, &:focus-within {
			border-color : ${CssVars.BORDER_COLOR};
		}
	}
`;
export const ATableBodyRowTailGrabber = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-table-row-tail-grabber'})`
	display  : block;
	position : relative;
	grid-row : 1;
`;
export const ATableBodyCellExpandArea = styled.div.attrs<BodyCellExpandAreaOptions>(
	({$options: {columnCount, expanded}}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-expand-area',
			style: {
				gridColumn: `1 / span ${columnCount + 1}`,
				height: expanded ? (void 0) : 0,
				padding: expanded ? (void 0) : 0
			}
		};
	})<BodyCellExpandAreaOptions>`
	display               : grid;
	position              : relative;
	grid-column           : 2;
	grid-template-columns : repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
	grid-column-gap       : ${CssVars.GRID_COLUMN_GAP};
	grid-row-gap          : ${CssVars.GRID_ROW_GAP};
	padding               : ${CssVars.SECTION_BODY_PADDING};
	overflow              : hidden;
`;
export const ATableBottomBar = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-table-bottom-bar'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : flex-end;
	height          : ${CssVars.TABLE_FOOTER_HEIGHT};
	z-index         : 4;
	> button {
		max-height : ${CssVars.TABLE_BUTTON_HEIGHT};
	}
`;
