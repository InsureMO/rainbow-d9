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
					fire(AppEventTypes.SWITCH_SIDE_MENU_AND_BANNER_ENABLED, {
						sideMenuEnabled, bannerEnabled, sideMenuFold, themeSwitcherEnabled, i18nSwitcherEnabled
					});
					navigate(location || getHomeRoute(), {replace: true});
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