import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {LazyPageWrapper} from '../../standard-widgets';
import './intl-labels';

const ClaimRegistrationIndex = LazyPageWrapper(lazy(() => import('./page')));

export const ClaimRegistrationPage: AppPage = {
	code: 'claim-registration',
	route: '/claim/registration',
	menuItemCode: 'claim-registration',
	breadcrumb: {
		title: 'claim-registration.title',
		locations: ['home.title', 'claim.title']
	},
	renderer: ClaimRegistrationIndex
};

// register
PageRegistrar.register(ClaimRegistrationPage);
