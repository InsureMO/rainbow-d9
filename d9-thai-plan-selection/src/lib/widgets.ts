import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const PlanSelectionCssVars = {
	HEADER_TITLE_PADDING: 'var(--d9-plan-selection-header-title-padding, 16px 0)',
	HEADER_TITLE_FONT_SIZE: 'var(--d9-plan-selection-header-title-font-size, 2em)',
	HEADER_TITLE_FONT_WEIGHT: `var(--d9-plan-selection-header-title-font-weight, ${CssVars.FONT_BOLD})`,
	HEADER_TITLE_COLOR: `var(--d9-plan-selection-header-title-color, ${CssVars.INVERT_COLOR})`,
	HEADER_ODD_BACKGROUND_COLOR: `var(--d9-plan-selection-header-odd-background-color, rgb(56,74,90))`,
	HEADER_EVEN_BACKGROUND_COLOR: `var(--d9-plan-selection-header-even-background-color, rgb(96,126,154))`,
	HEADER_SUB_TITLE_PADDING: 'var(--d9-plan-selection-header-sub-title-padding, 12px 0)',
	PREMIUM_FONT_SIZE: 'var(--d9-plan-selection-premium-font-size, 18px)',
	PREMIUM_FONT_WEIGHT: `var(--d9-plan-selection-premium-font-weight, ${CssVars.FONT_BOLD})`,
	PREMIUM_COLOR: 'var(--d9-plan-selection-premium-color, rgb(202,92,84))',
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
    border-bottom: ${CssVars.BORDER};
`;
// noinspection CssUnresolvedCustomProperty
export const PlanHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-header'})`
    display: flex;
    position: relative;
    flex-direction: column;
    border-bottom: ${CssVars.BORDER};

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
        font-size: ${PlanSelectionCssVars.HEADER_TITLE_FONT_SIZE};
        font-weight: ${PlanSelectionCssVars.HEADER_TITLE_FONT_WEIGHT};
        color: ${PlanSelectionCssVars.HEADER_TITLE_COLOR};
        height: unset;
        min-height: ${CssVars.INPUT_HEIGHT};
    }
`;
export const PlanHeaderSubTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-header-sub-title'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: ${PlanSelectionCssVars.HEADER_SUB_TITLE_PADDING};

    > span[data-w=d9-caption] {
        font-size: ${PlanSelectionCssVars.PREMIUM_FONT_SIZE};
        font-weight: ${PlanSelectionCssVars.PREMIUM_FONT_WEIGHT};
        height: unset;
        min-height: ${CssVars.INPUT_HEIGHT};

        &[data-plan-premium=true] {
            color: ${PlanSelectionCssVars.PREMIUM_COLOR};

            > span[data-w=d9-deco-lead], > span[data-w=d9-deco-tail] {
                font-size: ${PlanSelectionCssVars.PREMIUM_FONT_SIZE};
                color: ${PlanSelectionCssVars.PREMIUM_COLOR};
            }
        }
    }
`;
