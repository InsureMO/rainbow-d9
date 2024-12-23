import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from '../constants';

// noinspection CssUnresolvedCustomProperty
export const APagination = styled.div.attrs(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({id, [DOM_KEY_WIDGET]: dataW}) => {
		return {
			[DOM_KEY_WIDGET]: dataW || 'd9-pagination',
			[DOM_ID_WIDGET]: id
		};
	})`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};

    &[data-visible=false] {
        display: none;
    }

    > div[data-page-info=true] {
        display: flex;
        position: relative;
        align-items: center;

        > span:empty {
            display: none;
        }

        > span:not(:first-child) {
            margin-left: 0.3em;
        }

        > div[data-w=d9-dropdown] {
            height: calc(${CssVars.INPUT_HEIGHT} * 0.8);
            width: unset;
            margin-left: 0.6em;
            margin-right: 0.3em;
        }

        > span:empty + div[data-w=d9-dropdown] {
            margin-left: 0;
        }
    }

    > div[data-page-buttons=true] {
        display: flex;
        position: relative;
        column-gap: 4px;

        > button {
            width: ${CssVars.INPUT_HEIGHT};
            padding: 0;
            transition: border-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, box-shadow ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
        }
    }

    > div[data-page-buttons=false] {
        display: none;
    }
`;
