import {CssVars, Utils} from '@rainbow-d9/n2';
import {CSSProperties} from 'react';
import styled from 'styled-components';

export const CheckAndValueEditor = styled.div.attrs<{ inputWidth: string | number }>(
	({inputWidth}) => {
		return {
			style: {
				'--input-width': Utils.toCssSize(inputWidth)
			} as CSSProperties
		};
	})<{ inputWidth: string | number }>`
    > div[data-w=d9-deco-input] {
        > span[data-w=d9-deco-lead]:first-child {
            padding-right: 0;

            > div[data-w=d9-checkboxes] {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;

                > span[data-w=d9-checkboxes-option]:first-child {
                    padding-right: calc(${CssVars.INPUT_INDENT} + 4px);
                    margin-right: 0;

                    > div[data-w=d9-checkbox] {
                        transform: scale(0.8);
                    }
                }
            }
        }

        > input {
            flex-grow: unset;
            /* noinspection CssUnresolvedCustomProperty */
            min-width: var(--input-width);
        }
    }
`;
