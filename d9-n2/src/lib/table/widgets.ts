import {VUtils} from '@rainbow-d9/n1';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';
import {toCssSize} from '../utils';

export const ATable = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-table',
		[DOM_ID_WIDGET]: id
	};
})`
    display: block;
    position: relative;

    &[data-visible=false] {
        display: none;
    }
`;
export const ATableNoDataRow = styled.div.attrs<{ columnsCount: number }>(
	({columnsCount}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-no-data-row',
			style: {
				gridColumn: `1 / span ${columnsCount}`
			}
		};
	})<{ columnsCount: number }>`
    display: flex;
    position: sticky;
    left: 0;
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
export const ATableHeaderCell = styled.div.attrs<{
	headerHeight?: string | number; isGrabber?: true; stickyOffset: [boolean, string | undefined, string | undefined]
}>(
	({headerHeight, isGrabber, stickyOffset}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-header-cell',
			style: {
				height: toCssSize(headerHeight),
				padding: isGrabber ? 0 : (void 0),
				left: stickyOffset[1],
				right: stickyOffset[2],
				zIndex: VUtils.isNotBlank(stickyOffset[2])
					? 6
					: (VUtils.isNotBlank(stickyOffset[1]) ? 5 : (void 0))
			}
		};
	})<{
	headerHeight?: string | number; isGrabber?: true;
	stickyOffset: [boolean, string | undefined, string | undefined]
}>`
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
    z-index: 4;
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
    position: sticky;
    left: 0;
    align-self: stretch;
    align-items: start;
    min-height: ${CssVars.TABLE_CELL_HEIGHT};
    padding: 0 ${CssVars.TABLE_CELL_PADDING};
    color: ${CssVars.FONT_COLOR};
    background-color: ${CssVars.INVERT_COLOR};
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
export const ATableBodyCell = styled.div.attrs<{
	isGrabber?: true; rowIndex: number; stickyOffset: [boolean, string | undefined, string | undefined]
}>(
	({isGrabber, rowIndex, stickyOffset}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-cell',
			style: {
				padding: isGrabber ? 0 : (void 0),
				backgroundColor: rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : (void 0),
				position: stickyOffset[0] ? 'sticky' : (void 0),
				left: stickyOffset[1],
				right: stickyOffset[2],
				zIndex: VUtils.isNotBlank(stickyOffset[2])
					? 3
					: (VUtils.isNotBlank(stickyOffset[1]) ? 2 : (void 0))
			}
		};
	})<{ isGrabber?: true; rowIndex: number; stickyOffset: [boolean, string | undefined, string | undefined] }>`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${CssVars.TABLE_CELL_HEIGHT};
    padding: 0 calc(${CssVars.TABLE_CELL_PADDING});
    background-color: ${CssVars.INVERT_COLOR};

    &[data-click-to-expand=true] {
        cursor: pointer;

        &[data-expanded=true] {
            cursor: default;
        }
    }

    > input[data-w=d9-input],
    > div[data-w=d9-dropdown],
    > div[data-w=d9-calendar] {
        flex-grow: 1;
        height: calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
        margin: 0 calc(${CssVars.INPUT_INDENT} * -1);

        &:not(&:hover), &:not(&:focus), &:not(&:focus-within) {
            border-color: transparent;
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
    position: sticky;
    align-items: center;
    justify-content: flex-end;
    right: 0;
    background-color: ${CssVars.INVERT_COLOR};
    padding: 0 calc(${CssVars.TABLE_CELL_PADDING} / 2);
    z-index: 3;

    &:empty {
        padding: 0;
    }

    > button[data-w=d9-table-row-operator] {
        display: flex;
        position: relative;
        align-items: center;
        height: ${CssVars.TABLE_BUTTON_HEIGHT};
        width: ${CssVars.TABLE_BUTTON_HEIGHT};
        padding: 0;

        &:not(:first-child) {
            margin-left: 4px;
        }
    }
`;
export const ATableBodyCellExpandArea = styled.div.attrs<{
	columnsCount: number; expanded: boolean;
}>(
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
    position: sticky;
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};
    overflow: hidden;
    z-index: 1;
`;
export const ATableBottomBar = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-table-bottom-bar'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    height: ${CssVars.TABLE_FOOTER_HEIGHT};

    > div[data-w=d9-pagination] {
        flex-grow: 1;
    }
`;
export const ATableBottomBarSeparator = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-table-bottom-bar-separator'})`
    display: block;
    position: relative;
    margin: 0 12px;
    border: ${CssVars.BORDER};
    height: calc(${CssVars.INPUT_HEIGHT} * 0.6);
`;