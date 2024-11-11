import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';
import {SDP} from '../styled-components-styles';

// noinspection CssUnresolvedCustomProperty
export const ARibs = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-ribs',
		[DOM_ID_WIDGET]: id
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any;
})`
    display: flex;
    position: relative;
    flex-direction: column;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }

    > button {
        margin-top: 16px;
        max-height: ${CssVars.RIB_BUTTON_HEIGHT};
    }
`;
export const ARibRow = styled.div.attrs(({id}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-rib-row',
		[DOM_ID_WIDGET]: id
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any;
})`
    display: flex;
    position: relative;
    flex-direction: column;
    margin-bottom: ${CssVars.RIB_GAP_SIZE};
`;
export const ARibRowHeader = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-rib-row-header'})`
    display: grid;
    position: relative;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: ${CssVars.SECTION_BODY_PADDING};
    border-radius: ${CssVars.RIB_BORDER_RADIUS};
    background-color: ${CssVars.RIB_HEADER_BACKGROUND_COLOR};
    padding: ${CssVars.RIB_HEADER_PADDING};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    cursor: pointer;

    &[data-expanded=true] {
        cursor: default;
    }

    &[data-show-row-index=false] {
        > div[data-w=d9-rib-row-index] {
            width: 0;
            overflow: hidden;
        }

        > div[data-w=d9-rib-row-header-content] {
            margin-left: calc(-1 * ${CssVars.SECTION_BODY_PADDING});
        }
    }
`;
export const ARibRowIndex = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-rib-row-index'})`
    display: flex;
    position: relative;
    font-size: 0.8em;
    font-weight: ${CssVars.FONT_BOLD};
`;
export const ARibRowHeaderContent = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-rib-row-header-content'})`
    display: block;
    position: relative;
`;
export const ARibRowOperators = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-rib-row-operators'})`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 ${CssVars.BUTTON_INDENT};

    > button[data-w=d9-rib-row-operator] {
        display: flex;
        position: relative;
        align-items: center;
        height: ${CssVars.RIB_BUTTON_HEIGHT};
        width: ${CssVars.RIB_BUTTON_HEIGHT};
        padding: 0;

        &:not(:first-child) {
            margin-left: 4px;
        }
    }
`;
export const ARibRowBody = styled.div.attrs<{ expanded: boolean }>(({expanded}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-rib-row-body',
		style: {
			padding: expanded ? (void 0) : 0,
			height: expanded ? (void 0) : 0,
			overflow: expanded ? (void 0) : 'hidden'
		}
	};
})<{ expanded: boolean }>`
    display: grid;
    position: relative;
    grid-column: 1 / span 2;
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};
    padding: ${CssVars.SECTION_BODY_PADDING} 0;
`;
export const ARibNoDataRow = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-rib-no-data-row'})`
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
export const ARibBottomBar = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-rib-bottom-bar'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    height: ${CssVars.RIB_FOOTER_HEIGHT};
    margin-top: 0;
    z-index: 4;
`;
