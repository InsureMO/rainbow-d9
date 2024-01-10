import {DOM_ID_WIDGET, DOM_KEY_WIDGET} from '@rainbow-d9/n2';

// noinspection CssUnresolvedCustomProperty
import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty
export const APlanSelection = styled.div.attrs(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({id, 'data-w': dataW}) => {
		return {
			[DOM_KEY_WIDGET]: dataW || 'd9-plan-selection',
			[DOM_ID_WIDGET]: id
		};
	})`
    display: flex;
    position: relative;
    flex-direction: column;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }
`;