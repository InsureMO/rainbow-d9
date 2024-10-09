import {IntlLabel} from '@rainbow-d9/n2';
import HomeIcon from '../../assets/home.svg?react';
import TasksIcon from '../../assets/tasks.svg?react';
import {AppMenuGroup, AppMenuItem, AppMenuType} from './types';
import {buildMenuItemForRoute} from './utils';

export const buildPreferencesMenuGroup = (preferences: AppMenuGroup, ...items: Array<AppMenuItem | AppMenuGroup>): AppMenuGroup => {
	preferences.items = items ?? [];
	// add your own preferences menus here
	return preferences;
};

const buildSampleMenus = () => {
	return [
		buildMenuItemForRoute({
			code: 'home', icon: <HomeIcon/>, text: <IntlLabel keys={['menus.home']} value={'Home'}/>
		}),
		{
			code: 'tasks', type: AppMenuType.GROUP,
			icon: <TasksIcon/>, text: <IntlLabel keys={['menus.tasks']} value="Tasks"/>,
			items: [
				buildMenuItemForRoute({
					code: 'tasks-1',
					icon: <TasksIcon/>, text: <IntlLabel keys={['menus.tasks-1']} value={'Tasks - Self-governed'}/>
				}),
				buildMenuItemForRoute({
					code: 'tasks-2',
					icon: <TasksIcon/>, text: <IntlLabel keys={['menus.tasks-2']} value={'Tasks - Preload'}/>
				})
			]
		} as AppMenuGroup
	];
};

export const buildMenus = (options: {
	preferences: AppMenuGroup
}): Array<AppMenuItem | AppMenuGroup> => {
	return [
		...buildSampleMenus(),
		options.preferences
	];
};
