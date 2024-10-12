import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {LazyPageWrapper} from '../../../standard-widgets';

const ClaimRegistrationFindInsuredIndex = LazyPageWrapper(lazy(() => import('./page')));

const ClaimRegistrationFindInsuredPage: AppPage = {
	code: 'claim-registration-find-insured',
	route: '/claim/registration/find-insured',
	menuItemCode: 'claim-registration',
	breadcrumb: {
		title: 'claim-registration.find-insured.title',
		locations: ['home.title', 'claim.title', 'claim-registration.title']
	},
	renderer: ClaimRegistrationFindInsuredIndex
};

// register
PageRegistrar.register(ClaimRegistrationFindInsuredPage);
