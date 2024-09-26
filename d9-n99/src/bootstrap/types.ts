import {LangCode, ThemeCode} from '../global-settings';

export enum ExternalMessageType {
	// incoming
	SWITCH_SIDE_MENU = 'switch-side-menu',
	SWITCH_BANNER = 'switch-banner',
	SWITCH_THEME_SWITCHER = 'switch-theme-switcher',
	SWITCH_I18N_SWITCHER = 'switch-i18n-switcher',
	AUTHENTICATE = 'authenticate',
	// outgoing
	PAGE_READY = 'page-ready',
}

export interface ExternalMessage {
	type: ExternalMessageType;
}

export interface SwitchFeatureMessage extends ExternalMessage {
	enabled: boolean;
}

export interface SwitchSideMenuMessage extends SwitchFeatureMessage {
	type: ExternalMessageType.SWITCH_SIDE_MENU;
}

export interface SwitchBannerMessage extends SwitchFeatureMessage {
	type: ExternalMessageType.SWITCH_BANNER;
}

export interface SwitchThemeSwitchMessage extends SwitchFeatureMessage {
	type: ExternalMessageType.SWITCH_THEME_SWITCHER;
}

export interface SwitchI18NSwitchMessage extends SwitchFeatureMessage {
	type: ExternalMessageType.SWITCH_I18N_SWITCHER;
}

export interface AuthenticateMessage extends ExternalMessage {
	type: ExternalMessageType.AUTHENTICATE;
	username?: string;
	displayName: string;
	token: string;
	themeCode?: ThemeCode;
	langCode?: LangCode;
	sideMenuEnabled?: boolean;
	sideMenuFold?: boolean;
	bannerEnabled?: boolean;
	themeSwitcherEnabled?: boolean;
	i18nSwitcherEnabled?: boolean;
	/** url of first page */
	location?: string;
}

