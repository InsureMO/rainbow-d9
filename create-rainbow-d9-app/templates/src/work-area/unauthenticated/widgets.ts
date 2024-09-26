import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty
export const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'page-authentication'})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 7fr auto 10fr;
    width: 100%;
    height: 100%;

    > div {
        grid-column: 2;
        grid-row: 2;

        &[data-type=no-authentication] {
            font-size: var(--page-no-authentication-font-size);
        }
    }
`;
