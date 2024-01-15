import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import styled from 'styled-components';

export const PlanSelectionCssVars = {
	BACKGROUND_COLOR: `var(--d9-plan-selection-background-color, ${CssVars.BACKGROUND_COLOR})`,
	HEADER_TITLE_PADDING: 'var(--d9-plan-selection-header-title-padding, 16px 0)',
	HEADER_TITLE_FONT_SIZE: 'var(--d9-plan-selection-header-title-font-size, 2em)',
	HEADER_TITLE_FONT_WEIGHT: `var(--d9-plan-selection-header-title-font-weight, ${CssVars.FONT_BOLD})`,
	HEADER_TITLE_COLOR: `var(--d9-plan-selection-header-title-color, ${CssVars.INVERT_COLOR})`,
	HEADER_ODD_BACKGROUND_COLOR: `var(--d9-plan-selection-header-odd-background-color, rgb(56,74,90))`,
	HEADER_EVEN_BACKGROUND_COLOR: `var(--d9-plan-selection-header-even-background-color, rgb(96,126,154))`,
	HEADER_SUB_TITLE_PADDING: 'var(--d9-plan-selection-header-sub-title-padding, 12px 0 4px)',
	PREMIUM_FONT_SIZE: 'var(--d9-plan-selection-premium-font-size, 18px)',
	PREMIUM_FONT_WEIGHT: `var(--d9-plan-selection-premium-font-weight, ${CssVars.FONT_BOLD})`,
	PREMIUM_COLOR: 'var(--d9-plan-selection-premium-color, rgb(202,92,84))',
	PREMIUM_DESCRIPTION_FONT_SIZE: 'var(--d9-plan-selection-premium-desc-font-size, 16px)',
	PREMIUM_DESCRIPTION_FONT_WEIGHT: `var(--d9-plan-selection-premium-desc-font-weight, ${CssVars.FONT_BOLD})`,
	PREMIUM_DESCRIPTION_COLOR: 'var(--d9-plan-selection-premium-desc-color, rgb(146,183,140))',
	ODD_BACKGROUND_COLOR: `var(--d9-plan-selection-odd-background-color, rgb(245,245,245))`,
	EVEN_BACKGROUND_COLOR: `var(--d9-plan-selection-even-background-color, ${CssVars.INVERT_COLOR})`,
	ELEMENT_MIN_HEIGHT: `var(--d9-plan-selection-element-min-height, 40px)`,
	ELEMENT_INDENT: `var(--d9-plan-selection-element-indent, 16px)`,
	ELEMENT_PADDING: `var(--d9-plan-selection-element-padding, 0 12px)`,
	ELEMENT_VALUE_LABEL_COLOR: `var(--d9-plan-selection-element-value-label-color, #888)`,
	ELEMENT_VALUE_COLOR: `var(--d9-plan-selection-element-value-color, rgb(118, 187, 175))`,
	ELEMENT_VALUE_UNIT_GAP: `var(--d9-plan-selection-element-value-unit-gap, 12px)`,
	ELEMENT_UNIT_LABEL_COLOR: `var(--d9-plan-selection-element-unit-label-color, #888)`
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
			'data-v-scroll': '',
			'data-h-scroll': '',
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
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    overflow: auto;

    &[data-visible=false] {
        display: none;
    }
`;
export const PlanSelectionTopLeftCorner = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-top-left-corner'})`
    display: block;
    position: sticky;
    top: 0;
    left: 0;
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 1;
`;
// noinspection CssUnresolvedCustomProperty
export const PlanHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-header'})`
    display: flex;
    position: sticky;
    top: 0;
    flex-direction: column;
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 1;

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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${PlanSelectionCssVars.HEADER_SUB_TITLE_PADDING};

    > span[data-w=d9-caption] {
        height: unset;
        min-height: ${CssVars.INPUT_HEIGHT};

        &[data-plan-premium=true] {
            font-size: ${PlanSelectionCssVars.PREMIUM_FONT_SIZE};
            font-weight: ${PlanSelectionCssVars.PREMIUM_FONT_WEIGHT};
            color: ${PlanSelectionCssVars.PREMIUM_COLOR};

            > span[data-w=d9-deco-lead], > span[data-w=d9-deco-tail] {
                font-size: ${PlanSelectionCssVars.PREMIUM_FONT_SIZE};
                color: ${PlanSelectionCssVars.PREMIUM_COLOR};
                fill: ${PlanSelectionCssVars.PREMIUM_COLOR};
            }
        }

        &[data-plan-premium-desc=true] {
            font-size: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_FONT_SIZE};
            font-weight: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_FONT_WEIGHT};
            color: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_COLOR};
            margin-top: -4px;

            > span[data-w=d9-deco-lead], > span[data-w=d9-deco-tail] {
                font-size: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_FONT_SIZE};
                color: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_COLOR};
                fill: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_COLOR};
            }
        }
    }
`;

export const PlanElementColumnHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-element-header'})`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${PlanSelectionCssVars.ELEMENT_MIN_HEIGHT};
    border-bottom: ${CssVars.BORDER};
`;
export const PlanElementColumnHeaderTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-element-header-title'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;

    > span[data-w=d9-caption] {
        min-height: ${CssVars.INPUT_HEIGHT};

        &[data-plan-element-level="0"] {
            margin-left: ${PlanSelectionCssVars.ELEMENT_INDENT};
            font-weight: ${CssVars.FONT_BOLD};
        }

        &[data-plan-element-level="1"] {
            margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 2);
        }

        &[data-plan-element-level="2"] {
            margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 3);
        }

        &[data-plan-element-level="3"] {
            margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 4);
        }
    }
`;
export const PlanElementCell = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-element-cell'})`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.EVEN_BACKGROUND_COLOR};
    padding: ${PlanSelectionCssVars.ELEMENT_PADDING};

    &[data-odd=true] {
        background-color: ${PlanSelectionCssVars.ODD_BACKGROUND_COLOR};
    }

    &[data-element-lack=true] { /** element no available for this plan */
        justify-content: center;

        > svg[data-icon=times] {
            height: calc(${CssVars.INPUT_HEIGHT} / 5 * 3);
            width: calc(${CssVars.INPUT_HEIGHT} / 5 * 3);
            fill: ${CssVars.DANGER_COLOR};
        }
    }

    &[data-element-cateogry=true] { /** category element */
        justify-content: center;

        > svg[data-icon=check] {
            height: calc(${CssVars.INPUT_HEIGHT} / 5 * 3);
            width: calc(${CssVars.INPUT_HEIGHT} / 5 * 3);
            fill: ${CssVars.SUCCESS_COLOR};
        }
    }

    > div[data-w=d9-checkbox] { /** no values available for this element */
        padding: calc((${CssVars.INPUT_HEIGHT}) / 6);
        border-color: transparent;
        margin: auto;

        &[data-element-pinned=true] { /** element is pinned */
            fill: ${CssVars.SUCCESS_COLOR};

            &[disabled], &[data-disabled=true] {
                &:before {
                    display: none;
                }
            }
        }

        &[data-element-pinned=false] { /** element is not pinned */

            &[data-checked=true] { /** use success color */
                fill: ${CssVars.SUCCESS_COLOR};

                &:hover:before {
                    box-shadow: ${CssVars.SUCCESS_HOVER_SHADOW};
                }

                &:focus-within:before {
                    box-shadow: ${CssVars.SUCCESS_HOVER_SHADOW};
                }

                &:hover,
                &:focus-within {
                    fill: ${CssVars.SUCCESS_COLOR};

                    &:before {
                        border-color: ${CssVars.SUCCESS_COLOR};
                    }
                }

                &:before {
                    border-color: ${CssVars.SUCCESS_COLOR};
                }
            }

            &[data-checked=false] { /** use danger color */
                fill: ${CssVars.DANGER_COLOR};

                &:hover:before {
                    box-shadow: ${CssVars.DANGER_HOVER_SHADOW};
                }

                &:focus-within:before {
                    box-shadow: ${CssVars.DANGER_HOVER_SHADOW};
                }

                &:hover,
                &:focus-within {
                    fill: ${CssVars.DANGER_COLOR};

                    &:before {
                        border-color: ${CssVars.DANGER_COLOR};
                    }
                }

                &:before {
                    border-color: ${CssVars.DANGER_COLOR};
                }
            }
        }
    }

    > div[data-w=d9-form-cell] {
        display: grid;
        grid-template-columns: 35% 65%;
        width: 100%;

        &[data-plan-element-fix-value=true] { /** fixed value */

            > span[data-w=d9-caption]:nth-child(2) {
                > span[data-plan-element-fix-value=true] {
                    color: ${PlanSelectionCssVars.ELEMENT_VALUE_COLOR};
                }

                > span[data-plan-element-fix-value-unit=true]:not(:empty) { /** fixed value with unit */
                    margin-left: ${PlanSelectionCssVars.ELEMENT_VALUE_UNIT_GAP};
                    color: ${PlanSelectionCssVars.ELEMENT_UNIT_LABEL_COLOR};
                }
            }
        }

        > span[data-r=d9-fc-caption] { /** value label */
            grid-row: 1;
            grid-column: 1;
            font-size: ${CssVars.FONT_SIZE};
            font-weight: unset;
            color: ${PlanSelectionCssVars.ELEMENT_VALUE_LABEL_COLOR};
            white-space: normal;
            overflow: unset;
        }

        > span[data-w=d9-caption]:nth-child(2) { /** value editor or renderer */
            grid-row: 1;
            grid-column: 2;
        }

        > div[data-w=d9-form-cell-invalid-msg] { /** invalid message */
            grid-column: 2;

            &:empty {
                display: none;
            }
        }
    }
`;