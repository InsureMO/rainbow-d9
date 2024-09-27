import {GlobalEventTypes, IntlLabel, useGlobalEventBus} from '@rainbow-d9/n2';
import LogoutIcon from '../assets/logout.svg?react';
import {AppEventTypes, useAppEventBus} from '../bootstrap';
import {isAuthenticated} from '../services';
import {clearAuthentication, isAuthenticationEnabled} from '../utils';
import {BannerButton, BannerButtonBase} from './banner-button-base';

export const LogoutButton = () => {
	const app = useAppEventBus();
	const {fire} = useGlobalEventBus();

	const enabled = isAuthenticationEnabled();
	if (!enabled || !isAuthenticated()) {
		return null;
	}

	const onLogoutClick = () => {
		fire(GlobalEventTypes.SHOW_YES_NO_DIALOG,
			<IntlLabel keys={['actions.logout.confirm']} value="Are you sure to log out?"/>,
			() => {
				clearAuthentication();
				app.fire(AppEventTypes.AUTHENTICATED_CHANGED);
				fire(GlobalEventTypes.HIDE_DIALOG);
			},
			() => {
				fire(GlobalEventTypes.HIDE_DIALOG);
			});
	};

	return <BannerButtonBase widget="app-banner-logout-button">
		<BannerButton onClick={onLogoutClick}>
			<LogoutIcon/>
		</BannerButton>
	</BannerButtonBase>;
};