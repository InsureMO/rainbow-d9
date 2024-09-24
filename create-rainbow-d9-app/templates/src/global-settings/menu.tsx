import {IntlLabel} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import LanguageIcon from '../assets/language.svg?react';
import SettingsIcon from '../assets/settings.svg?react';
import SystemThemeIcon from '../assets/system-theme.svg?react';
import ThemeIcon from '../assets/theme.svg?react';
import {askAvailableLanguages} from './i18n';
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
}

/**
 * available themes, using in theme switcher
 */
export const askMenus = (): Array<AppMenuGroup | AppMenuItem> => {
	return [
		{
			code: 'preferences', type: AppMenuType.GROUP,
			icon: <SettingsIcon/>, text: <IntlLabel keys={['menus.preferences']} value="Preferences"/>,
			items: [
				{
					code: 'language', type: AppMenuType.GROUP,
					icon: <LanguageIcon/>, text: <IntlLabel keys={['menus.language']} value="Language"/>,
					items: askAvailableLanguages().map(lang => {
						return {code: lang.code, type: AppMenuType.ITEM, icon: lang.icon, text: lang.text};
					})
				},
				{
					code: 'theme', type: AppMenuType.GROUP,
					icon: <ThemeIcon/>, text: <IntlLabel keys={['menus.theme']} value="Color Theme"/>,
					items: [
						...askAvailableThemes().map<AppMenuItem>(theme => {
							return {code: theme.code, type: AppMenuType.ITEM, icon: theme.icon, text: theme.text};
						}),
						{
							code: 'system', type: AppMenuType.ITEM,
							icon: <SystemThemeIcon/>, text: <IntlLabel keys={['theme.system']} value="System"/>
						}
					]
				}
			]
		}
	];
};

export const isMenuGroup = (menu: AppMenu): menu is AppMenuGroup => menu.type === AppMenuType.GROUP;
export const isMenuItem = (menu: AppMenu): menu is AppMenuItem => menu.type === AppMenuType.ITEM;
