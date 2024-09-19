import {DOM_KEY_WIDGET, GlobalEventBusProvider} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {I18NAndD9N2Bridge} from '../global';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-banner'})`
    display: grid;
    position: fixed;
    min-width: 100%;
    height: var(--app-banner-height);
    background: var(--app-banner-background);
    box-shadow: var(--app-banner-shadow);
    z-index: var(--app-banner-z-index);
`;

export const Banner = () => {
	return <GlobalEventBusProvider>
		<I18NAndD9N2Bridge/>
		<Container>

		</Container>
	</GlobalEventBusProvider>;
};
