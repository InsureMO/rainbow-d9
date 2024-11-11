import {DOM_KEY_WIDGET, GlobalRoot, SDP} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {AppEventTypes, I18NAndD9N2Bridge, useAppEventBus, useAuthenticatedChanged} from '../bootstrap';
import {isAuthenticated} from '../services';
import {isSideMenuBodyEnabledOnAuthOnly} from '../utils';
import {SideMenuBody} from './body';
import {SideMenuFooter} from './footer';
import {SideMenuHeader} from './header';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'app-side-menu'})`
    display: flex;
    position: fixed;
    flex-direction: column;
    top: 0;
    left: 0;
    height: 100vh;
    min-height: 100vh;
    background: var(--app-side-menu-background);
    box-shadow: var(--app-side-menu-shadow);
    z-index: var(--app-side-menu-z-index);
    transition: width .3s ease-in-out;
    overflow: hidden;
`;

const SideMenuContainer = () => {
	useAuthenticatedChanged();

	const sideMenuBodyEnableOnAuthOnly = isSideMenuBodyEnabledOnAuthOnly();
	const authenticated = isAuthenticated();
	const showUnauthenticated = sideMenuBodyEnableOnAuthOnly && !authenticated;

	// wrapped by global event bus provider, which supports i18n
	return <GlobalRoot>
		<I18NAndD9N2Bridge/>
		<Container data-unauthenticated={showUnauthenticated}>
			<SideMenuHeader/>
			{showUnauthenticated ? null : <SideMenuBody/>}
			{showUnauthenticated ? null : <SideMenuFooter/>}
		</Container>
	</GlobalRoot>;
};

export const SideMenu = () => {
	const {on, off, fire} = useAppEventBus();
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		const onSwitchSideMenuEnabled = (enabled: boolean) => setEnabled(enabled);
		on(AppEventTypes.SWITCH_SIDE_MENU_ENABLED, onSwitchSideMenuEnabled);
		return () => {
			off(AppEventTypes.SWITCH_SIDE_MENU_ENABLED, onSwitchSideMenuEnabled);
		};
	}, [on, off]);
	useEffect(() => {
		fire(AppEventTypes.ASK_SIDE_MENU_ENABLED, (enabled: boolean) => {
			setEnabled(enabled);
		});
	}, []);

	if (!enabled) {
		return null;
	}

	return <SideMenuContainer/>;
};