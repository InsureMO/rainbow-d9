import {VUtils} from '@rainbow-d9/n1';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';
import {toCssSize} from '../utils';

export const ATable = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-table',
		[DOM_ID_WIDGET]: id,
		'data-v-scroll': ''
	};
})`
    display: block;
    position: relative;
    overflow: hidden;

    &[data-visible=false] {
        display: none;
    }
`;
export const ATableNoDataRow = styled.div.attrs<{ columnsCount: number; scrollLeft: number }>(
	({columnsCount, scrollLeft}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-no-data-row',
			style: {
				gridColumn: `1 / span ${columnsCount}`,
				paddingLeft: scrollLeft
			}
		};
	})<{ columnsCount: number; scrollLeft: number }>`
    display: flex;
    position: relative;
    align-items: center;
    min-width: 100%;
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.TABLE_HEADER_FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    font-weight: ${CssVars.TABLE_HEADER_FONT_WEIGHT};
    border-bottom: ${CssVars.TABLE_CELL_BORDER};
    border-bottom-color: transparent;

    > span {
        display: flex;
        position: relative;
        align-items: center;
        min-height: ${CssVars.TABLE_CELL_HEIGHT};
        padding: 0 ${CssVars.TABLE_CELL_PADDING};
    }
`;

export interface ATableContentOptions {
	headerHeight?: number | string;
	maxBodyHeight?: number | string;
	columnsWidth: Array<number | string>;
}

export const ATableContent = styled.div.attrs<ATableContentOptions>(
	({headerHeight, maxBodyHeight, columnsWidth}) => {
		let maxHeight = (void 0);
		if (!VUtils.isBlank(maxBodyHeight)) {
			const computedHeaderHeight = VUtils.isBlank(headerHeight)
				? `${CssVars.TABLE_HEADER_HEIGHT} - ${CssVars.TABLE_HEADER_BORDER_SIZE}`
				: toCssSize(headerHeight);
			maxHeight = `calc(${computedHeaderHeight} + ${toCssSize(maxBodyHeight)})`;
		}
		return {
			[DOM_KEY_WIDGET]: 'd9-table-content',
			'data-h-scroll': '',
			'data-v-scroll': '',
			style: {maxHeight, gridTemplateColumns: columnsWidth.join(' ')}
		};
	})<ATableContentOptions>`
    display: grid;
    position: relative;
    border-bottom: ${CssVars.TABLE_CELL_BORDER};
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    overflow-x: auto;
    overflow-y: auto;
`;
export const ATableHeaderCell = styled.div.attrs<{ headerHeight?: string | number; isGrabber?: true }>(
	({headerHeight, isGrabber}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-header-cell',
			style: {
				height: toCssSize(headerHeight),
				padding: isGrabber ? 0 : (void 0)
			}
		};
	})<{ headerHeight?: string | number; isGrabber?: true }>`
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    min-height: ${CssVars.TABLE_HEADER_HEIGHT};
    padding: 0 ${CssVars.TABLE_CELL_PADDING};
    border-bottom: ${CssVars.TABLE_HEADER_BORDER};
    background-color: ${CssVars.TABLE_HEADER_BACKGROUND_COLOR};
    font-family: ${CssVars.TABLE_HEADER_FONT_FAMILY};
    font-size: ${CssVars.TABLE_HEADER_FONT_SIZE};
    font-weight: ${CssVars.TABLE_HEADER_FONT_WEIGHT};
    overflow: hidden;
    white-space: nowrap;
`;
export const ATableBodyRowIndexCell = styled.div.attrs<{ rowIndex: number; rowSpan: number }>(
	({rowIndex, rowSpan}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-index-cell',
			style: {
				backgroundColor: rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : (void 0),
				gridRow: rowSpan === 2 ? 'span 2' : (void 0)
			}
		};
	})<{ rowIndex: number; rowSpan: number }>`
    display: flex;
    position: relative;
    align-self: stretch;
    align-items: start;
    min-height: ${CssVars.TABLE_CELL_HEIGHT};
    padding: 0 ${CssVars.TABLE_CELL_PADDING};
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: 0.8em;
    overflow: hidden;
    white-space: nowrap;
    z-index: 2;

    > span {
        display: flex;
        position: relative;
        align-items: center;
        min-height: ${CssVars.TABLE_CELL_HEIGHT};
        font-weight: ${CssVars.FONT_BOLD};
        opacity: ${CssVars.TABLE_ROW_INDEX_OPACITY};
    }
`;
export const ATableBodyCell = styled.div.attrs<{ isGrabber?: true; rowIndex: number }>(
	({isGrabber, rowIndex}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-cell',
			style: {
				padding: isGrabber ? 0 : (void 0),
				backgroundColor: rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : (void 0)
			}
		};
	})<{ isGrabber?: true; rowIndex: number }>`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${CssVars.TABLE_CELL_HEIGHT};
    padding: 0 calc(${CssVars.TABLE_CELL_PADDING} + 4px);
    overflow: hidden;
    white-space: nowrap;

    > input[data-w=d9-input],
    > div[data-w=d9-dropdown],
    > div[data-w=d9-calendar] {
        flex-grow: 1;
        height: calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
        margin: 0 calc(${CssVars.TABLE_CELL_PADDING} * -1);
        border-color: transparent;

        &:hover, &:focus, &:focus-within {
            border-color: ${CssVars.BORDER_COLOR};
        }
    }
`;
export const ATableRowOperators = styled.div.attrs<{ rowIndex: number; rowSpan: number }>(
	({rowIndex, rowSpan}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-operators',
			style: {
				backgroundColor: rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : (void 0),
				gridRow: rowSpan === 2 ? 'span 2' : (void 0)
			}
		};
	}) <{ rowIndex: number; rowSpan: number }>`
    display: flex;
    position: relative;
    align-items: start;
    z-index: 3;

    > span {
        display: flex;
        position: relative;
        align-items: center;
        min-height: ${CssVars.TABLE_CELL_HEIGHT};
        padding: 0 ${CssVars.BUTTON_INDENT};
    }
`;
export const ATableRowOperator = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-table-row-operator'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
    min-height: calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
    border-radius: ${CssVars.BORDER_RADIUS};
    border: ${CssVars.BORDER};
    border-color: ${CssVars.PRIMARY_COLOR};
    cursor: pointer;
    overflow: hidden;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:not(:first-child) {
        margin-left: 8px;
    }

    &:hover {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
        background-color: ${CssVars.PRIMARY_COLOR};

        > svg {
            fill: ${CssVars.INVERT_COLOR};
        }
    }

    > svg {
        fill: ${CssVars.PRIMARY_COLOR};
        height: ${CssVars.FONT_SIZE};
        transition: background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
export const ATableBodyCellExpandArea = styled.div.attrs<{ columnsCount: number; expanded: boolean }>(
	({columnsCount, expanded}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-expand-area',
			style: {
				gridColumn: `2 / span ${columnsCount}`,
				height: expanded ? (void 0) : 0
			}
		};
	}) <{ columnsCount: number; expanded: boolean }>`
    display: grid;
    position: relative;
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};
    overflow: hidden;
`;
export const ATableBottomBar = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-table-bottom-bar'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    height: ${CssVars.TABLE_FOOTER_HEIGHT};
    z-index: 4;

    > button {
        max-height: ${CssVars.TABLE_BUTTON_HEIGHT};
    }
`;
