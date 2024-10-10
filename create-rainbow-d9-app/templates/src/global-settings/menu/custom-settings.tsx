import {AppMenuGroup, AppMenuItem} from './types';

export const buildPreferencesMenuGroup = (preferences: AppMenuGroup, ...items: Array<AppMenuItem | AppMenuGroup>): AppMenuGroup => {
	preferences.items = items ?? [];
	// add your own preferences menus here
	return preferences;
};

class MenuRegistrar {
	private static menus: Array<[AppMenuItem | AppMenuGroup, number]> = [];

	private constructor() {
	}

	public static register(menu: AppMenuItem | AppMenuGroup, index: number) {
		const foundIndex = MenuRegistrar.menus.findIndex(([exists]) => exists.code === menu.code);
		if (foundIndex !== -1) {
			MenuRegistrar.menus.splice(foundIndex, 1, [menu, index]);
		} else {
			MenuRegistrar.menus.push([menu, index]);
		}
	}

	public static getMenus(): Array<AppMenuItem | AppMenuGroup> {
		return MenuRegistrar.menus
			.sort(([, index1], [, index2]) => index1 - index2)
			.map(([menu]) => menu);
	}
}

export const Menus = {register: MenuRegistrar.register};

export const buildMenus = (options: {
	preferences: AppMenuGroup
}): Array<AppMenuItem | AppMenuGroup> => {
	return [
		...MenuRegistrar.getMenus(),
		options.preferences
	];
};
