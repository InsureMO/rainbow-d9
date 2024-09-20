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

export interface SwitchSideMenuMessage extends ExternalMessage {
	type: ExternalMessageType.SWITCH_SIDE_MENU;
	enabled: boolean;
}

export interface SwitchBannerMessage extends ExternalMessage {
	type: ExternalMessageType.SWITCH_BANNER;
	enabled: boolean;
}