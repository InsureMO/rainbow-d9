import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';

// noinspection CssUnresolvedCustomProperty
export const StandardPageWrapper = styled.div.attrs({[DOM_KEY_WIDGET]: 'page-standard-wrapper'})`
    display: block;
    position: relative;
    min-width: 100%;
    min-height: 100%;
    padding: var(--app-page-padding);
`;
