import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {LazyPageWrapper} from '../../../standard-widgets';

const ClaimRegistrationIndex = LazyPageWrapper(lazy(() => import('./page')));

export const ClaimRegistrationPage: AppPage = {
	code: 'claim-registration',
	route: '/claim/registration/find-insured',
	menuItemCode: 'claim-registration',
	breadcrumb: {
		title: 'claim-registration.find-insured.title',
		locations: ['home.title', 'claim.title', 'claim-registration.title']
	},
	renderer: ClaimRegistrationIndex
};

// register
PageRegistrar.register(ClaimRegistrationPage);
