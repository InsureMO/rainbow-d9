export enum ExternalMessageType {
	SWITCH_SIDE_MENU = 'switch-side-menu',
	SWITCH_BANNER = 'switch-banner',
	SWITCH_THEME_SWITCHER = 'switch-theme-switcher',
	SWITCH_I18N_SWITCHER = 'switch-i18n-switcher'
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
