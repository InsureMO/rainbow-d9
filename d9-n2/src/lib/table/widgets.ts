import {Undefinable, VUtils} from '@rainbow-d9/n1';
import {CSSProperties} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';
import {DropdownDefaults} from '../dropdown-assist';
import {SDP} from '../styled-components-styles';
import {toCssSize} from '../utils';
import {isInCellInputBorderOmitted} from './utils';

// z-index of table widgets
// 1: expand area
// 2: row index cell / body cell stick in left
// 3: body cell stick in right / row operators
// 4: header cell
// 5: header cell stick in left
// 6: header cell stick in right
// 7: focus in body cell, focus in expand area

// noinspection CssUnresolvedCustomProperty
export const ATable = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-table',
		[DOM_ID_WIDGET]: id
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any;
})`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

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
    justify-self: start;
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
// noinspection CssUnresolvedCustomProperty
export const ATableHeaderCell = styled.div.attrs<{
	headerHeight?: string | number; isGrabber?: true; stickyOffset: [boolean, Undefinable<string>, Undefinable<string>]
}>(
	({headerHeight, isGrabber, stickyOffset}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-header-cell',
			style: {
				'--height': toCssSize(headerHeight),
				'--padding': isGrabber ? 0 : `0 ${CssVars.TABLE_CELL_PADDING}`,
				'--left': stickyOffset[1],
				'--right': stickyOffset[2],
				'--z-index': VUtils.isNotBlank(stickyOffset[2])
					? 6
					: (VUtils.isNotBlank(stickyOffset[1]) ? 5 : 4)
			} as CSSProperties
		};
	})<{
	headerHeight?: string | number; isGrabber?: true;
	stickyOffset: [boolean, Undefinable<string>, Undefinable<string>]
}>`
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    left: var(--left);
    right: var(--right);
    min-height: ${CssVars.TABLE_HEADER_HEIGHT};
    height: var(--height);
    padding: var(--padding);
    border-bottom: ${CssVars.TABLE_HEADER_BORDER};
    background-color: ${CssVars.TABLE_HEADER_BACKGROUND_COLOR};
    font-family: ${CssVars.TABLE_HEADER_FONT_FAMILY};
    font-size: ${CssVars.TABLE_HEADER_FONT_SIZE};
    font-weight: ${CssVars.TABLE_HEADER_FONT_WEIGHT};
    overflow: hidden;
    white-space: nowrap;
    z-index: var(--z-index);

    &:hover > span[data-role=sort] > svg,
    &:hover > span[data-role=sort] > svg[data-icon=sort-none] {
        color: ${CssVars.PRIMARY_COLOR};
        opacity: 1;
    }

    > span[data-role=sort] {
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        top: calc((var(--height) - ${CssVars.INPUT_HEIGHT}) / 2);
        right: 0;
        width: ${CssVars.INPUT_HEIGHT};
        height: ${CssVars.INPUT_HEIGHT};
        cursor: pointer;
        z-index: 1;


        > svg {
            width: calc(${CssVars.INPUT_HEIGHT} * 0.7);
            height: calc(${CssVars.INPUT_HEIGHT} * 0.7);
            opacity: 0.5;
            transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

            &[data-icon=sort-none] {
                opacity: 0;
            }
        }
    }
`;
// noinspection CssUnresolvedCustomProperty
export const ATableBodyRowIndexCell = styled.div.attrs<{ rowIndex: number; rowSpan: number }>(
	({rowIndex, rowSpan}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-index-cell',
			style: {
				gridRow: rowSpan === 2 ? 'span 2' : (void 0),
				'--background-color': rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : CssVars.BACKGROUND_COLOR,
				'--z-index': 2
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
    background-color: var(--background-color);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: 0.8em;
    overflow: hidden;
    white-space: nowrap;
    z-index: var(--z-index);

    > span {
        display: flex;
        position: relative;
        align-items: center;
        min-height: ${CssVars.TABLE_CELL_HEIGHT};
        font-weight: ${CssVars.FONT_BOLD};
        opacity: ${CssVars.TABLE_ROW_INDEX_OPACITY};
    }
`;
// noinspection CssUnresolvedCustomProperty
export const ATableBodyCell = styled.div.attrs<{
	isGrabber?: true; rowIndex: number; stickyOffset: [boolean, Undefinable<string>, Undefinable<string>]
}>(
	({isGrabber, rowIndex, stickyOffset}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-cell',
			style: {
				padding: isGrabber ? 0 : (void 0),
				position: stickyOffset[0] ? 'sticky' : (void 0),
				left: stickyOffset[1],
				right: stickyOffset[2],
				'--background-color': rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : CssVars.BACKGROUND_COLOR,
				'--z-index': VUtils.isNotBlank(stickyOffset[2])
					? 3
					: (VUtils.isNotBlank(stickyOffset[1]) ? 2 : (void 0)),
				// if dropdown popup is rendered in portal, it should be on top of anything, therefore no need to set hover z-index
				'--hover-z-index': DropdownDefaults.DEFAULTS.findPortalCarrier == null ? 7 : (void 0)
			}
		};
	})<{ isGrabber?: true; rowIndex: number; stickyOffset: [boolean, Undefinable<string>, Undefinable<string>] }>`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${CssVars.TABLE_CELL_HEIGHT};
    padding: 0 calc(${CssVars.TABLE_CELL_PADDING});
    background-color: var(--background-color);
    z-index: var(--z-index);

    &[data-click-to-expand=true] {
        cursor: pointer;

        &[data-expanded=true] {
            cursor: default;
        }
    }

    &:focus-within {
        z-index: var(--hover-z-index);
    }

    > input[data-w=d9-input],
    > div[data-w=d9-deco-input],
    > div[data-w=d9-dropdown],
    > div[data-w=d9-calendar] {
        flex-grow: 1;
        height: calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
        margin: ${isInCellInputBorderOmitted() ? `0 calc(${CssVars.INPUT_INDENT} * -1)` : (void 0)};

        &:not(&:hover), &:not(&:focus), &:not(&:focus-within) {
            border-color: ${isInCellInputBorderOmitted() ? 'transparent' : (void 0)};
        }
    }

    > div[data-w=d9-deco-input] {
        > input[data-w=d9-input] {
            height: calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
        }

        > span[data-w=d9-deco-lead],
        > span[data-w=d9-deco-tail] {
            height: calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
            min-height: calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);

        }
    }
`;
// noinspection CssUnresolvedCustomProperty
export const ATableRowOperators = styled.div.attrs<{ rowIndex: number; rowSpan: number }>(
	({rowIndex, rowSpan}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-operators',
			style: {
				gridRow: rowSpan === 2 ? 'span 2' : (void 0),
				'--background-color': rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : CssVars.BACKGROUND_COLOR,
				'--z-index': 3
			}
		};
	}) <{ rowIndex: number; rowSpan: number }>`
    display: flex;
    position: sticky;
    align-self: stretch;
    align-items: start;
    justify-content: flex-end;
    right: 0;
    background-color: var(--background-color);
    padding: 0 calc(${CssVars.TABLE_CELL_PADDING} / 2);
    z-index: var(--z-index);

    &:empty {
        padding: 0;
    }

    > button[data-w=d9-button][data-role=d9-table-row-operator] {
        padding: 0;
        margin-top: calc((${CssVars.TABLE_CELL_HEIGHT} - ${CssVars.TABLE_BUTTON_HEIGHT}) / 2);
        height: ${CssVars.TABLE_BUTTON_HEIGHT};
        width: ${CssVars.TABLE_BUTTON_HEIGHT};

        &:not(:first-child) {
            margin-left: 4px;
        }
    }
`;
// noinspection CssUnresolvedCustomProperty
export const ATableBodyCellExpandArea = styled.div.attrs<{
	rowIndex: number; columnsCount: number; expanded: boolean;
}>(
	({rowIndex, columnsCount, expanded}) => {
		return {
			[DOM_KEY_WIDGET]: 'd9-table-row-expand-area',
			style: {
				gridColumn: `2 / span ${columnsCount}`,
				'--background-color': rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : CssVars.BACKGROUND_COLOR,
				'--height': expanded ? (void 0) : 0,
				'--padding': expanded ? CssVars.TABLE_CELL_EXPAND_AREA_PADDING : (void 0),
				'--border': expanded ? CssVars.TABLE_CELL_EXPAND_AREA_BORDER : (void 0),
				'--z-index': 1,
				// if dropdown popup is rendered in portal, it should be on top of anything, therefore no need to set hover z-index
				'--hover-z-index': DropdownDefaults.DEFAULTS.findPortalCarrier == null ? 7 : (void 0)
			}
		};
	}) <{ rowIndex: number; columnsCount: number; expanded: boolean }>`
    display: grid;
    position: sticky;
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};
    height: var(--height);
    border-top: var(--border);
    padding: var(--padding);
    background-color: var(--background-color);
    overflow: hidden;
    z-index: var(--z-index);

    &:focus-within {
        z-index: var(--hover-z-index);
    }
`;
export const ATableBottomBar = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-table-bottom-bar'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    height: ${CssVars.TABLE_FOOTER_HEIGHT};

    > div[data-w=d9-pagination] {
        flex-grow: 1;
    }
`;
export const ATableBottomBarSeparator = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-table-bottom-bar-separator'})`
    display: block;
    position: relative;
    margin: 0 12px;
    border: ${CssVars.BORDER};
    height: calc(${CssVars.INPUT_HEIGHT} * 0.6);
`;