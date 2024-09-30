import {FC, lazy} from 'react';
import {getHomeRoute} from '../../utils';
import {LazyPageWrapper} from '../lazy-page-wrapper';
import {PageRegistrar} from '../registrar';
import {AppPage} from '../types';

const HomeIndex: FC = LazyPageWrapper(lazy(() => import('./page')));

export const HomePage: AppPage = {
	code: 'home',
	route: getHomeRoute(),
	menuItemCode: 'home',
	renderer: HomeIndex
};

// register
PageRegistrar.register(HomePage);
