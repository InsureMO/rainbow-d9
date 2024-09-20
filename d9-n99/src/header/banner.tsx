import {DOM_KEY_WIDGET, GlobalEventBusProvider} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {AppEventTypes, I18NAndD9N2Bridge, useAppEventBus} from '../global';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-banner'})`
    display: grid;
    position: fixed;
    margin-left: 0;
    width: 100vw;
    min-width: 100vw;
    height: var(--app-banner-height);
    background: var(--app-banner-background);
    box-shadow: var(--app-banner-shadow);
    z-index: var(--app-banner-z-index);
    transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out, min-width 0.3s ease-in-out;
`;

export const BannerContainer = () => {
	return <GlobalEventBusProvider>
		<I18NAndD9N2Bridge/>
		<Container>

		</Container>
	</GlobalEventBusProvider>;
};

export const Banner = () => {
	const {on, off, fire} = useAppEventBus();
	const [enabled, setEnabled] = useState(false);
	useEffect(() => {
		const onSwitchBannerEnabled = (enabled: boolean) => setEnabled(enabled);
		on(AppEventTypes.SWITCH_BANNER_ENABLED, onSwitchBannerEnabled);
		return () => {
			off(AppEventTypes.SWITCH_BANNER_ENABLED, onSwitchBannerEnabled);
		};
	}, [on, off]);
	useEffect(() => {
		fire(AppEventTypes.ASK_BANNER_ENABLED, (enabled: boolean) => {
			setEnabled(enabled);
		});
	}, []);

	if (!enabled) {
		return null;
	}

	return <BannerContainer/>;
};