export type ThemeCode = string;

export enum ThemeKind {
	LIGHT = 'light',
	DARK = 'dark',
}

/** lang code must follow javascript standard */
export type LangCode = string;

export enum ExternalMessageType {
	SWITCH_SIDE_MENU = 'switch-side-menu',
	SWITCH_BANNER = 'switch-banner'
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