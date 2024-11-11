import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {LazyPageWrapper} from '../../../../page-widgets';

const ClaimAcceptanceFindIndex = LazyPageWrapper(lazy(() => import('./page')));

const ClaimAcceptanceFindPage: AppPage = {
	code: 'claim-acceptance-find',
	route: '/claim/acceptance/find',
	menuItemCode: 'claim-acceptance',
	breadcrumb: {
		title: 'claim.acceptance..find.title',
		locations: ['home.title', 'claim.title', 'claim.acceptance.title']
	},
	renderer: ClaimAcceptanceFindIndex
};

// register
PageRegistrar.register(ClaimAcceptanceFindPage);
