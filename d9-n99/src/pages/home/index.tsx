import {FC, lazy} from 'react';
import {getHomeRoute} from '../../utils';
import {PageRegistrar} from '../registrar';
import {LazyPageWrapper} from '../standard-widgets/lazy-page-wrapper.tsx';
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
