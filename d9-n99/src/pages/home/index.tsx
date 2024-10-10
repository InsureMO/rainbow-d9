import {FC, lazy} from 'react';
import {getHomeRoute} from '../../utils';
import {PageRegistrar} from '../registrar';
import {LazyPageWrapper} from '../standard-widgets';
import {AppPage} from '../types';

const HomeIndex: FC = LazyPageWrapper(lazy(() => import('./page')));

export const HomePage: AppPage = {
	code: 'home',
	route: getHomeRoute(),
	menuItemCode: 'home',
	breadcrumb: {
		title: 'Home',
		locations: []
	},
	renderer: HomeIndex
};

// register
PageRegistrar.register(HomePage);
