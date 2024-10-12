import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {LazyPageWrapper} from '../../standard-widgets';
import './intl-labels';

const ClaimEvaluationIndex = LazyPageWrapper(lazy(() => import('./page')));

const ClaimEvaluationPage: AppPage = {
	code: 'claim-evaluation',
	route: '/claim/evaluation',
	menuItemCode: 'claim-evaluation',
	breadcrumb: {
		title: 'claim-evaluation.title',
		locations: ['home.title', 'claim.title']
	},
	renderer: ClaimEvaluationIndex
};

// register
PageRegistrar.register(ClaimEvaluationPage);
