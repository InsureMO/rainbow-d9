import {IntlLabel} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import LanguageIcon from '../assets/language.svg?react';
import SettingsIcon from '../assets/settings.svg?react';

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
	items: Array<AppMenu>;
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
					code: 'language', type: AppMenuType.ITEM,
					icon: <LanguageIcon/>, text: <IntlLabel keys={['menus.language']} value="Language"/>
				}
			]
		}
	];
};

export const isMenuGroup = (menu: AppMenu): menu is AppMenuGroup => menu.type === AppMenuType.GROUP;
export const isMenuItem = (menu: AppMenu): menu is AppMenuItem => menu.type === AppMenuType.ITEM;
