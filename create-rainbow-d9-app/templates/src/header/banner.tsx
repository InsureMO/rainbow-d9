import {DOM_KEY_WIDGET, GlobalRoot} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {AppEventTypes, I18NAndD9N2Bridge, useAppEventBus, useAuthenticatedChanged} from '../bootstrap';
import {isAuthenticated} from '../services';
import {isBannerSpaceGrabberEnabled} from '../utils';
import {I18NSwitcher} from './i18n-switcher';
import {LogoutButton} from './logout-button';
import {ThemeSwitcher} from './theme-switcher';
import {UserProfile} from './user-profile';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-banner'})`
    display: flex;
    position: fixed;
    top: 0;
    margin-left: 0;
    width: 100vw;
    min-width: 100vw;
    height: var(--app-banner-height);
    padding: var(--app-banner-padding);
    background: var(--app-banner-background);
    border-bottom: var(--app-banner-bottom-border);
    z-index: var(--app-banner-z-index);
    transition: margin-left .3s ease-in-out, width .3s ease-in-out, min-width .3s ease-in-out;

    > span[data-type=space-grabber] {
        flex-grow: 1;

        &[data-visible=false] {
            display: none;
        }
    }
`;

export const BannerContainer = () => {
	useAuthenticatedChanged();

	return <GlobalRoot>
		<I18NAndD9N2Bridge/>
		<Container>
			<span data-type="space-grabber" data-visible={isBannerSpaceGrabberEnabled() || !isAuthenticated()}/>
			<I18NSwitcher/>
			<ThemeSwitcher/>
			<UserProfile/>
			<LogoutButton/>
		</Container>
	</GlobalRoot>;
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