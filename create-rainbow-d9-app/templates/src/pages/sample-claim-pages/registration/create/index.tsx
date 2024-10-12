import {ObjectPropValue} from '@rainbow-d9/n1';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {loadFromSessionAndBurn} from '../../../../utils';
import {PreloadedLazyPageWrapper} from '../../../standard-widgets';
import InitRootModel from './init-root.json';
import {Insured, RootModel} from './types';

const ClaimRegistrationCreateIndex = PreloadedLazyPageWrapper(lazy(() => import('./page')), {
	usePathParams: true,
	initRootModel: async (options) => {
		const {key = ''} = options.pathParams ?? {};
		const insured: Insured | undefined = loadFromSessionAndBurn(key);
		const rootModel: RootModel = JSON.parse(JSON.stringify(InitRootModel));
		rootModel.data = {insured};
		return rootModel as unknown as ObjectPropValue;
	}
});

const ClaimRegistrationCreatePage: AppPage = {
	code: 'claim-registration-create',
	route: '/claim/registration/create/:key',
	breadcrumb: {
		title: 'claim-registration.create.title',
		locations: ['home.title', 'claim.title', 'claim-registration.title']
	},
	renderer: ClaimRegistrationCreateIndex
};

// register
PageRegistrar.register(ClaimRegistrationCreatePage);
