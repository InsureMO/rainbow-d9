import {DOM_KEY_WIDGET, GlobalEventBusProvider} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {I18NAndD9N2Bridge} from '../global';
import {SideMenuHeader} from './header';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-side-menu'})`
    display: flex;
    position: relative;
    flex-direction: column;
    min-height: 100vh;
    width: var(--app-side-menu-width);
    background: var(--app-side-menu-background);
    box-shadow: var(--app-side-menu-shadow);
    z-index: var(--app-side-menu-z-index);
    transition: width 0.3s ease-in-out;
    overflow: hidden;
`;

export const SideMenu = () => {
	// wrapped by global event bus provider, which supports i18n
	return <GlobalEventBusProvider>
		<I18NAndD9N2Bridge/>
		<Container>
			<SideMenuHeader/>
		</Container>
	</GlobalEventBusProvider>;
};
