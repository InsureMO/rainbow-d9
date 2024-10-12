import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {LazyPageWrapper} from '../../standard-widgets';
import './intl-labels';

const Tasks1Index = LazyPageWrapper(lazy(() => import('./page')));

const Tasks1Page: AppPage = {
	code: 'tasks-1',
	route: '/tasks-1',
	menuItemCode: 'tasks-1',
	breadcrumb: {
		title: 'tasks-1.title',
		locations: ['home.title', 'tasks.title']
	},
	renderer: Tasks1Index
};

// register
PageRegistrar.register(Tasks1Page);
