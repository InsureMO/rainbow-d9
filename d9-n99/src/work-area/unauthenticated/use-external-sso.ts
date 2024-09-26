import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppEventTypes, useAppEventBus} from '../../bootstrap';
import {AuthenticateMessage, ExternalMessage, ExternalMessageType} from '../../bootstrap/types';
import {getHomeRoute, isNotBlank, setAuthentication} from '../../utils';

export const useExternalSSO = () => {
	const navigate = useNavigate();
	const {fire} = useAppEventBus();
	useEffect(() => {
		const onMessage = (event: MessageEvent<ExternalMessage>) => {
			const {data} = event;
			switch (data.type) {
				case ExternalMessageType.AUTHENTICATE: {
					// window.postMessage({type: 'authenticate', ...rest})
					const {
						username, displayName, token,
						themeCode, langCode,
						sideMenuEnabled, sideMenuFold, bannerEnabled, themeSwitcherEnabled, i18nSwitcherEnabled,
						location
					} = data as AuthenticateMessage;
					setAuthentication({username, displayName, token});
					if (isNotBlank(themeCode)) {
						if (themeCode === 'system') {
							fire(AppEventTypes.CHANGE_THEME_BY_SYSTEM);
						} else {
							fire(AppEventTypes.CHANGE_THEME, themeCode!);
						}
					}
					isNotBlank(langCode) && fire(AppEventTypes.CHANGE_LANG, langCode!);
					// on unauthenticated, the side menu/banner/theme switcher/i18n switcher enablement, side menu fold are all unknown
					// if send event to enable switcher or side menu fold,
					// maybe there is no listener on the other side since side menu or banner is not rendered at all.
					// so the state of enablement and fold need to be sent to central first.
					// after the center persist these states, then use callback function to navigate and fire authenticated changed event.
					fire(AppEventTypes.SWITCH_SIDE_MENU_AND_BANNER_ENABLED, {
						sideMenuEnabled, bannerEnabled, sideMenuFold, themeSwitcherEnabled, i18nSwitcherEnabled
					}, () => {
						navigate(location || getHomeRoute(), {replace: true});
						fire(AppEventTypes.AUTHENTICATED_CHANGED);
					});
					break;
				}
				default:
					break;
			}
		};
		window.addEventListener('message', onMessage);
		// broadcast that app is ready for receiving messages
		window.postMessage({type: ExternalMessageType.PAGE_READY}, '*');
		return () => {
			window.removeEventListener('message', onMessage);
		};
	}, []);
};