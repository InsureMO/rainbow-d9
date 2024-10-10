import {FC, lazy} from 'react';
import HomeIcon from '../../assets/home.svg?react';
import {AppPage, buildMenuItemForRoute, Menus, PageRegistrar, registerPageIntlLabels} from '../../global-settings';
import {getHomeRoute} from '../../utils';
import {LazyPageWrapper} from '../standard-widgets';

const HomeIndex: FC = LazyPageWrapper(lazy(() => import('./page')));

export const HomePage: AppPage = {
	code: 'home',
	route: getHomeRoute(),
	menuItemCode: 'home',
	breadcrumb: {
		title: 'home.title',
		locations: []
	},
	renderer: HomeIndex
};
registerPageIntlLabels('home')
	.lang('en-US')
	.labels({title: 'Home'})
	.lang('zh-CN')
	.labels({title: '首页'});

// register
PageRegistrar.register(HomePage);
Menus.register(buildMenuItemForRoute({code: 'home', icon: <HomeIcon/>, text: 'home.title'}), 100);
