import {AppEventTypes} from '../../bootstrap';
import {PageRegistrar} from '../../pages';
import {AppMenu, AppMenuGroup, AppMenuItem, AppMenuType} from './types';

export const isMenuGroup = (menu: AppMenu): menu is AppMenuGroup => menu.type === AppMenuType.GROUP;
export const isMenuItem = (menu: AppMenu): menu is AppMenuItem => menu.type === AppMenuType.ITEM;

export const buildMenuItemForRoute = (item: Omit<AppMenuItem, 'type' | 'click'>): AppMenuItem => {
	const page = PageRegistrar.findPageByMenuCode(item.code);
	if (page == null) {
		console.error(`Page not found by menu code[${item.code}].`);
	}

	return {
		...item, type: AppMenuType.ITEM, click: async (fire) => {
			if (page == null) {
				console.error(`Page not found by menu code[${item.code}].`);
			} else {
				fire(AppEventTypes.NAVIGATE_TO, page.route);
			}
		}
	};
};
