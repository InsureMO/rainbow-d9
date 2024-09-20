import {useCreateEventBus} from '@rainbow-d9/n1';
import {createContext, ReactNode, useContext} from 'react';
import {LangCode, ThemeCode, ThemeKind} from './types';

export enum AppEventTypes {
	CHANGE_THEME = 'change-theme', THEME_CHANGED = 'theme-changed',
	CHANGE_LANG = 'change-lang', LANG_CHANGED = 'lang-changed',
	SWITCH_SIDE_MENU_ENABLED = 'switch-side-menu-enabled',
	ASK_SIDE_MENU_ENABLED = 'ask-side-menu-enabled',
	SWITCH_SIDE_MENU_FOLD = 'switch-side-menu-fold',
	SWITCH_BANNER_ENABLED = 'switch-banner-enabled',
	ASK_BANNER_ENABLED = 'ask-banner-enabled'
}

export interface AppEventBus {
	fire(type: AppEventTypes.CHANGE_THEME, themeCode: ThemeCode): this;
	on(type: AppEventTypes.CHANGE_THEME, listener: (themeCode: ThemeCode) => void): this;
	off(type: AppEventTypes.CHANGE_THEME, listener: (themeCode: ThemeCode) => void): this;
	fire(type: AppEventTypes.THEME_CHANGED, themeCode: ThemeCode, themeKind: ThemeKind): this;
	on(type: AppEventTypes.THEME_CHANGED, listener: (themeCode: ThemeCode, themeKind: ThemeKind) => void): this;
	off(type: AppEventTypes.THEME_CHANGED, listener: (themeCode: ThemeCode, themeKind: ThemeKind) => void): this;
	fire(type: AppEventTypes.CHANGE_LANG, langCode: LangCode): this;
	on(type: AppEventTypes.CHANGE_LANG, listener: (langCode: LangCode) => void): this;
	off(type: AppEventTypes.CHANGE_LANG, listener: (langCode: LangCode) => void): this;
	fire(type: AppEventTypes.LANG_CHANGED, langCode: LangCode): this;
	on(type: AppEventTypes.LANG_CHANGED, listener: (langCode: LangCode) => void): this;
	off(type: AppEventTypes.LANG_CHANGED, listener: (langCode: LangCode) => void): this;
	fire(type: AppEventTypes.SWITCH_SIDE_MENU_ENABLED, enabled: boolean): this;
	on(type: AppEventTypes.SWITCH_SIDE_MENU_ENABLED, listener: (enabled: boolean) => void): this;
	off(type: AppEventTypes.SWITCH_SIDE_MENU_ENABLED, listener: (enabled: boolean) => void): this;
	fire(type: AppEventTypes.ASK_SIDE_MENU_ENABLED, onReply: (enabled: boolean) => void): this;
	on(type: AppEventTypes.ASK_SIDE_MENU_ENABLED, listener: (onReply: (enabled: boolean) => void) => void): this;
	off(type: AppEventTypes.ASK_SIDE_MENU_ENABLED, listener: (onReply: (enabled: boolean) => void) => void): this;
	fire(type: AppEventTypes.SWITCH_SIDE_MENU_FOLD, fold: boolean): this;
	on(type: AppEventTypes.SWITCH_SIDE_MENU_FOLD, listener: (fold: boolean) => void): this;
	off(type: AppEventTypes.SWITCH_SIDE_MENU_FOLD, listener: (fold: boolean) => void): this;
	fire(type: AppEventTypes.SWITCH_BANNER_ENABLED, enabled: boolean): this;
	on(type: AppEventTypes.SWITCH_BANNER_ENABLED, listener: (enabled: boolean) => void): this;
	off(type: AppEventTypes.SWITCH_BANNER_ENABLED, listener: (enabled: boolean) => void): this;
	fire(type: AppEventTypes.ASK_BANNER_ENABLED, onReply: (enabled: boolean) => void): this;
	on(type: AppEventTypes.ASK_BANNER_ENABLED, listener: (onReply: (enabled: boolean) => void) => void): this;
	off(type: AppEventTypes.ASK_BANNER_ENABLED, listener: (onReply: (enabled: boolean) => void) => void): this;
}

const Context = createContext<AppEventBus>({} as AppEventBus);
Context.displayName = 'AppEventBus';

export const AppEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<AppEventBus>('n99-app');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useAppEventBus = () => useContext(Context);
