import {lazy} from 'react';
import {PageRegistrar} from '../registrar';
import {LazyPageWrapper} from '../standard-widgets';
import {AppPage} from '../types';
import './intl-labels';

const Tasks1Index = LazyPageWrapper(lazy(() => import('./page')));

export const Tasks1Page: AppPage = {
	code: 'tasks-1',
	route: '/tasks-1',
	menuItemCode: 'tasks-1',
	renderer: Tasks1Index
};

// register
PageRegistrar.register(Tasks1Page);
