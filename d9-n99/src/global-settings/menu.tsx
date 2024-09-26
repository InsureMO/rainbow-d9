import {IntlLabel} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import LanguageIcon from '../assets/language.svg?react';
import SettingsIcon from '../assets/settings.svg?react';
import SystemThemeIcon from '../assets/system-theme.svg?react';
import ThemeIcon from '../assets/theme.svg?react';
import {AppEventBus, AppEventTypes} from '../bootstrap/app-event-bus';
import {isThemeFollowSystemEnabled} from '../utils';
import {askAvailableLanguages} from './i18n';
import {LanguageLabel, ThemeLabel} from './menu-widgets';
import {askAvailableThemes} from './theme';

export enum AppMenuType {
	GROUP = 'group', ITEM = 'item'
}

interface AppMenu {
	code: string;
	type: AppMenuType;
	icon?: ReactNode;
	text: ReactNode;
}

export interface AppMenuGroup extends AppMenu {
	type: AppMenuType.GROUP;
	items: Array<AppMenuGroup | AppMenuItem>;
}

export interface AppMenuItem extends AppMenu {
	type: AppMenuType.ITEM;
	click: (fire: AppEventBus['fire']) => Promise<void>;
}

export enum PrebuiltAppMenuCode {
	PREFERENCES = 'preferences',
	LANGUAGES = 'languages',
	THEMES = 'theme',
	SYSTEM_THEME = 'system-theme'
}

/**
 * available themes, using in theme switcher
 */
export const askMenus = (): Array<AppMenuGroup | AppMenuItem> => {
	return [
		// do not change the codes of the items, the language and theme switcher will use them
		// TODO preferences menu should have more items beyonds languages and themes
		{
			code: PrebuiltAppMenuCode.PREFERENCES, type: AppMenuType.GROUP,
			icon: <SettingsIcon/>, text: <IntlLabel keys={['menus.preferences']} value="Preferences"/>,
			items: [
				{
					code: PrebuiltAppMenuCode.LANGUAGES, type: AppMenuType.GROUP,
					icon: <LanguageIcon/>, text: <IntlLabel keys={['menus.language']} value="Language"/>,
					items: askAvailableLanguages().map(lang => {
						return {
							code: lang.code, type: AppMenuType.ITEM,
							icon: lang.icon, text: <LanguageLabel {...lang}/>,
							click: async (fire) => {
								fire(AppEventTypes.CHANGE_LANG, lang.code);
							}
						};
					})
				},
				{
					code: PrebuiltAppMenuCode.THEMES, type: AppMenuType.GROUP,
					icon: <ThemeIcon/>, text: <IntlLabel keys={['menus.theme']} value="Color Theme"/>,
					items: [
						...askAvailableThemes().map<AppMenuItem>(theme => {
							return {
								code: theme.code, type: AppMenuType.ITEM,
								icon: theme.icon, text: <ThemeLabel {...theme}/>,
								click: async (fire) => {
									fire(AppEventTypes.CHANGE_THEME, theme.code);
								}
							};
						}),
						...(isThemeFollowSystemEnabled() ? [{
							code: PrebuiltAppMenuCode.SYSTEM_THEME, type: AppMenuType.ITEM,
							icon: <SystemThemeIcon/>,
							text: <ThemeLabel code={PrebuiltAppMenuCode.SYSTEM_THEME}
							                  text={<IntlLabel keys={['theme.system']} value="System"/>}/>,
							click: async (fire) => {
								fire(AppEventTypes.CHANGE_THEME_BY_SYSTEM);
							}
						} as AppMenuItem] : [] as Array<AppMenuItem>)
					]
				}
			]
		}
	];
};

export const isMenuGroup = (menu: AppMenu): menu is AppMenuGroup => menu.type === AppMenuType.GROUP;
export const isMenuItem = (menu: AppMenu): menu is AppMenuItem => menu.type === AppMenuType.ITEM;
