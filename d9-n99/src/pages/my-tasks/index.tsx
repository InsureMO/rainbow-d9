import {FC, lazy} from 'react';
import {LazyPageWrapper} from '../lazy-page-wrapper';
import {PageRegistrar} from '../registrar';
import {AppPage} from '../types';

const MyTasksIndex: FC = LazyPageWrapper(lazy(() => import('./page')));

export const MyTasksPage: AppPage = {
	code: 'my-tasks',
	route: '/my-tasks',
	menuItemCode: 'my-tasks',
	renderer: MyTasksIndex
};

// register
PageRegistrar.register(MyTasksPage);
