import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const PlanSelectionCssVars = {
	HEADER_TITLE_PADDING: 'var(--d9-plan-selection-header-title-padding, 16px 0)',
	HEADER_ODD_BACKGROUND_COLOR: `var(--d9-plan-selection-header-odd-background-color, rgb(56,74,90))`,
	HEADER_EVEN_BACKGROUND_COLOR: `var(--d9-plan-selection-header-even-background-color, rgb(96,126,154))`,
	ODD_BACKGROUND_COLOR: `var(--d9-plan-selection-odd-background-color, rgb(245,245,245))`,
	EVEN_BACKGROUND_COLOR: `var(--d9-plan-selection-even-background-color, ${CssVars.INVERT_COLOR})`
};

// noinspection CssUnresolvedCustomProperty
export const APlanSelection = styled.div.attrs<{
	columnCount: number; computedColumnWidth: string | number; computedLineHeaderWidth: string | number;
	maxHeight?: string | number
}>(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({id, 'data-w': dataW, columnCount, computedColumnWidth, computedLineHeaderWidth, maxHeight}) => {
		return {
			[DOM_KEY_WIDGET]: dataW || 'd9-plan-selection',
			[DOM_ID_WIDGET]: id,
			style: {
				'--grid-template-columns': `${Utils.toCssSize(computedLineHeaderWidth)} repeat(${columnCount}, ${Utils.toCssSize(computedColumnWidth)})`,
				'--max-height': Utils.toCssSize(maxHeight)
			}
		};
	})<{
	columnCount: number; computedColumnWidth: string | number; computedLineHeaderWidth: string | number;
	maxHeight?: string | number
}>`
    display: grid;
    position: relative;
    grid-template-columns: var(--grid-template-columns);
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    max-height: var(--max-height);
    overflow: auto;

    &[data-visible=false] {
        display: none;
    }
`;
export const PlanSelectionTopLeftCorner = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-top-left-corner'})`
    display: block;
    position: relative;
`;
// noinspection CssUnresolvedCustomProperty
export const PlanHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-header'})`
    display: flex;
    position: relative;
    flex-direction: column;

    > div[data-w=d9-plan-selection-header-title] {
        background-color: ${PlanSelectionCssVars.HEADER_EVEN_BACKGROUND_COLOR};
    }

    > div[data-w=d9-plan-selection-header-sub-title] {
        background-color: ${PlanSelectionCssVars.EVEN_BACKGROUND_COLOR};
    }

    &[data-odd=true] {
        > div[data-w=d9-plan-selection-header-title] {
            background-color: ${PlanSelectionCssVars.HEADER_ODD_BACKGROUND_COLOR};
        }

        > div[data-w=d9-plan-selection-header-sub-title] {
            background-color: ${PlanSelectionCssVars.ODD_BACKGROUND_COLOR};
        }
    }
`;
export const PlanHeaderTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-header-title'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: ${PlanSelectionCssVars.HEADER_TITLE_PADDING};

    > span[data-w=d9-caption] {
        font-size: 2em;
        font-weight: ${CssVars.FONT_BOLD};
        height: unset;
        color: ${CssVars.INVERT_COLOR};
    }
`;
export const PlanHeaderSubTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-header-sub-title'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

    > span[data-w=d9-caption] {
        height: unset;
    }
`;
