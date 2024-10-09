import {IntlLabel} from '@rainbow-d9/n2';
import HomeIcon from '../../assets/home.svg?react';
import MyTasksIcon from '../../assets/my-tasks.svg?react';
import {AppMenuGroup, AppMenuItem} from './types';
import {buildMenuItemForRoute} from './utils';

export const buildPreferencesMenuGroup = (preferences: AppMenuGroup, ...items: Array<AppMenuItem | AppMenuGroup>): AppMenuGroup => {
	preferences.items = items ?? [];
	return preferences;
};

export const buildMenus = (options: {
	preferences: AppMenuGroup
}): Array<AppMenuItem | AppMenuGroup> => {
	return [
		buildMenuItemForRoute({
			code: 'home', icon: <HomeIcon/>, text: <IntlLabel keys={['menus.home']} value={'Home'}/>
		}),
		// sample menus
		buildMenuItemForRoute({
			code: 'my-tasks',
			icon: <MyTasksIcon/>, text: <IntlLabel keys={['menus.my-tasks']} value={'My Tasks'}/>
		}),
		options.preferences
	];
};
