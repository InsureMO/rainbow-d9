import {AppMenuGroup, AppMenuItem} from './types';

export const buildPreferencesMenuGroup = (preferences: AppMenuGroup, ...items: Array<AppMenuItem | AppMenuGroup>): AppMenuGroup => {
	preferences.items = items ?? [];
	return preferences;
};

export const buildMenus = (options: {
	preferences: AppMenuGroup
}): Array<AppMenuItem | AppMenuGroup> => {
	return [
		options.preferences
	];
};
