import {lazy} from 'react';
import {PageRegistrar} from '../registrar';
import {LazyPageWrapper} from '../standard-widgets';
import {AppPage} from '../types';
import './intl-labels';

const MyTasksIndex = LazyPageWrapper(lazy(() => import('./page')));

export const MyTasksPage: AppPage = {
	code: 'my-tasks',
	route: '/my-tasks',
	menuItemCode: 'my-tasks',
	renderer: MyTasksIndex
};

// register
PageRegistrar.register(MyTasksPage);
