import TasksIcon from '../../assets/tasks.svg?react';
import {AppMenuGroup, AppMenuType, buildMenuItemForRoute, Menus, registerPageIntlLabels} from '../../global-settings';
import './tasks-1';
import './tasks-2';

// for menu group
registerPageIntlLabels('tasks')
	.lang('en-US')
	.labels({title: 'Tasks'})
	.lang('zh-CN')
	.labels({title: '任务'});

Menus.register({
	code: 'tasks', type: AppMenuType.GROUP,
	icon: <TasksIcon/>, text: 'tasks.title',
	items: [
		buildMenuItemForRoute({code: 'tasks-1', icon: <TasksIcon/>, text: 'tasks-1.title'}),
		buildMenuItemForRoute({code: 'tasks-2', icon: <TasksIcon/>, text: 'tasks-2.title'})
	]
} as AppMenuGroup, 200);
