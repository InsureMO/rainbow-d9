import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET, Utils} from '@rainbow-d9/n2';
import color from 'color';
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
	ELEMENT_PADDING: `var(--d9-plan-selection-element-padding, 4px 12px)`,
	ELEMENT_VALUE_GAP: `var(--d9-plan-selection-element-value-gap, 4px)`,
	ELEMENT_VALUE_LABEL_COLOR: `var(--d9-plan-selection-element-value-label-color, #888)`,
	ELEMENT_VALUE_COLOR: `var(--d9-plan-selection-element-value-color, rgb(118, 187, 175))`,
	ELEMENT_VALUE_UNIT_GAP: `var(--d9-plan-selection-element-value-unit-gap, 12px)`,
	ELEMENT_OPTIONS_VALUE_MIN_WIDTH: `var(--d9-plan-selection-element-options-value-min-width, 60px)`,
	ELEMENT_UNIT_FONT_FAMILY: `var(--d9-plan-selection-element-unit-font-family, ${CssVars.FONT_FAMILY})`,
	ELEMENT_UNIT_FONT_SIZE: `var(--d9-plan-selection-element-unit-font-size, ${CssVars.FONT_SIZE})`,
	ELEMENT_UNIT_LABEL_COLOR: `var(--d9-plan-selection-element-unit-label-color, #888)`,
	FOOTER_OPERATOR_PADDING: 'var(--d9-plan-selection-footer-operator-padding, 16px 0)',
	FOOTER_OPERATOR_FONT_SIZE: 'var(--d9-plan-selection-footer-operator-font-size, 16px)',
	FOOTER_OPERATOR_FONT_WEIGHT: `var(--d9-plan-selection-footer-operator-font-weight, ${CssVars.FONT_BOLD})`,
	FOOTER_OPERATOR_COLOR: `var(--d9-plan-selection-footer-operator-color, ${CssVars.INVERT_COLOR})`,
	FOOTER_OPERATOR_BACKGROUND_COLOR: `var(--d9-plan-selection-footer-operator-background-color, rgb(241,156,56))`,
	FOOTER_OPERATOR_SHADOW: `var(--d9-plan-selection-footer-operator-background-shadow, 0 0 0 3px ${color('rgb(241,156,56)').alpha(0.4)})`,
	FOOTER_OPERATOR_HOVER_SHADOW: `var(--d9-plan-selection-footer-operator-background-hover-shadow, 0 0 0 3px ${color('rgb(241,156,56)').alpha(0.2)})`
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
    display: flex;
    position: sticky;
    flex-direction: column;
    top: 0;
    left: 0;
    justify-content: flex-end;
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 3;
`;
export const PlanSelectionPagination = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-pagination'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-end;

    > span {
        display: flex;
        position: relative;
        column-gap: 0.5em;
        font-family: ${CssVars.FONT_FAMILY};
        font-size: ${CssVars.FONT_SIZE};
        color: ${CssVars.FONT_COLOR};

        &:last-child {
            margin-right: 12px;
        }
    }
`;
export const APlanHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-header'})`
    display: flex;
    position: sticky;
    flex-direction: column;
    top: 0;
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 2;

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
    position: sticky;
    left: 0;
    align-items: center;
    min-height: ${PlanSelectionCssVars.ELEMENT_MIN_HEIGHT};
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 1;

    &[data-ancestor-collapsed=true] {
        display: none;
    }

    &[data-collapsed=true] {
        > div[data-w=d9-plan-selection-element-header-title] > span[data-w=d9-caption] > span[data-w=d9-deco-lead] > svg[data-icon=angle-right] {
            transform: unset;
        }
    }

    > div[data-w=d9-plan-selection-element-header-title] > span[data-w=d9-caption] > span[data-w=d9-deco-lead] {
        margin-left: -8px;

        > svg[data-icon=angle-right] {
            transform: rotate(90deg);
            transition: transform ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
            height: ${CssVars.FONT_SIZE};
        }
    }
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
export const PlanElementCellContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-element-cell'})`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: ${PlanSelectionCssVars.ELEMENT_VALUE_GAP};
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.EVEN_BACKGROUND_COLOR};
    padding: ${PlanSelectionCssVars.ELEMENT_PADDING};

    &[data-odd=true] {
        background-color: ${PlanSelectionCssVars.ODD_BACKGROUND_COLOR};
    }

    &[data-ancestor-collapsed=true] {
        display: none;
    }

    &[data-element-lack=true] { /** element no available for this plan */
        justify-content: center;

        > svg[data-icon=times] {
            height: calc(${CssVars.INPUT_HEIGHT} / 5 * 2);
            width: calc(${CssVars.INPUT_HEIGHT} / 5 * 2);
            fill: ${CssVars.DANGER_COLOR};
        }
    }

    &[data-element-category=true] { /** category element */
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

        > span[data-r=d9-fc-caption] { /** value label */
            grid-row: 1;
            grid-column: 1;
            font-size: ${CssVars.FONT_SIZE};
            font-weight: unset;
            color: ${PlanSelectionCssVars.ELEMENT_VALUE_LABEL_COLOR};
            white-space: normal;
            overflow: unset;
        }

        > div[data-w=d9-box] { /** value editor or renderer */
            grid-row: 1;
            grid-column: 2;

            > div[data-w=d9-dropdown][data-plan-element-options-value=true],
            > div[data-w=d9-dropdown][data-plan-element-number-value=true],
            > input[data-w=d9-input][data-plan-element-number-value=true] {
                width: unset;
                min-width: ${PlanSelectionCssVars.ELEMENT_OPTIONS_VALUE_MIN_WIDTH};
            }

            > div[data-w=d9-dropdown][data-plan-element-options-value=true] > span[data-w=d9-dropdown-label],
            > div[data-w=d9-dropdown][data-plan-element-number-value=true] > span[data-w=d9-dropdown-label],
            > input[data-w=d9-input][data-plan-element-number-value=true],
            > span[data-w=d9-caption][data-plan-element-fix-value=true] {
                color: ${PlanSelectionCssVars.ELEMENT_VALUE_COLOR};
            }
        }

        > div[data-w=d9-form-cell-invalid-msg] { /** invalid message */
            grid-column: 2;

            &:empty {
                display: none;
            }
        }
    }
`;
export const PlanElementUnitLabel = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-element-unit'})`
    display: flex;
    position: relative;
    align-items: center;
    height: ${CssVars.INPUT_HEIGHT};
    font-family: ${PlanSelectionCssVars.ELEMENT_UNIT_FONT_FAMILY};
    font-size: ${PlanSelectionCssVars.ELEMENT_UNIT_FONT_SIZE};
    color: ${PlanSelectionCssVars.ELEMENT_UNIT_LABEL_COLOR};

    &:not(:empty) { /** fixed value with unit */
        margin-left: ${PlanSelectionCssVars.ELEMENT_VALUE_UNIT_GAP};
    }
`;
export const PlanSelectionBottomLeftCorner = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-bottom-left-corner'})`
    display: block;
    position: sticky;
    bottom: 0;
    left: 0;
    border-top: ${CssVars.BORDER};
    border-bottom: ${CssVars.BORDER};
    margin-top: calc(${CssVars.BORDER_WIDTH} * -1);
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 3;
`;
export const PlanFooter = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-footer'})`
    display: flex;
    position: sticky;
    bottom: 0;
    flex-direction: column;
    border-top: ${CssVars.BORDER};
    border-bottom: ${CssVars.BORDER};
    margin-top: calc(${CssVars.BORDER_WIDTH} * -1);
    z-index: 2;

    > div[data-w=d9-plan-selection-footer-operator] {
        background-color: ${PlanSelectionCssVars.EVEN_BACKGROUND_COLOR};
    }

    &[data-odd=true] {
        > div[data-w=d9-plan-selection-footer-operator] {
            background-color: ${PlanSelectionCssVars.ODD_BACKGROUND_COLOR};
        }
    }
`;
export const PlanFooterOperator = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-plan-selection-footer-operator'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: ${PlanSelectionCssVars.FOOTER_OPERATOR_PADDING};

    > button[data-w=d9-button] {
        font-size: ${PlanSelectionCssVars.FOOTER_OPERATOR_FONT_SIZE};
        font-weight: ${PlanSelectionCssVars.FOOTER_OPERATOR_FONT_WEIGHT};
        height: unset;
        min-height: ${CssVars.INPUT_HEIGHT};

        &[data-ink=primary][data-plan-buy=true] {
            color: ${PlanSelectionCssVars.FOOTER_OPERATOR_COLOR};
            border-color: ${PlanSelectionCssVars.FOOTER_OPERATOR_BACKGROUND_COLOR};
            background-color: ${PlanSelectionCssVars.FOOTER_OPERATOR_BACKGROUND_COLOR};

            &:hover {
                box-shadow: ${PlanSelectionCssVars.FOOTER_OPERATOR_HOVER_SHADOW};
            }

            &:focus, &:active {
                box-shadow: ${PlanSelectionCssVars.FOOTER_OPERATOR_SHADOW};
            }

            > span[data-w=d9-deco-lead] {
                > svg[data-icon=cart] {
                    height: calc(${CssVars.FONT_SIZE} * 0.8);
                    margin-top: 2px;
                }
            }
        }
    }
`;
