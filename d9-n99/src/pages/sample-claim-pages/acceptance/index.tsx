import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {LazyPageWrapper} from '../../standard-widgets';
import './intl-labels';

const ClaimAcceptanceIndex = LazyPageWrapper(lazy(() => import('./page')));

export const ClaimAcceptancePage: AppPage = {
	code: 'claim-acceptance',
	route: '/claim/acceptance',
	menuItemCode: 'claim-acceptance',
	breadcrumb: {
		title: 'claim-acceptance.title',
		locations: ['home.title', 'claim.title']
	},
	renderer: ClaimAcceptanceIndex
};

// register
PageRegistrar.register(ClaimAcceptancePage);
