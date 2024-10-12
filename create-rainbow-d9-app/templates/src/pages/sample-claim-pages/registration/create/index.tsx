import {ObjectPropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {loadFromSessionAndBurn} from '../../../../utils';
import {DC, PreloadedLazyPageWrapper, PreloadedPageProps, PreloaderFuncOptions} from '../../../standard-widgets';
import InitRootModel from './init-root.json';
import {askSubmissionChannel, createClaimRegistrationCase} from './mock-services';
import {AssistantData, Insured, RootModel} from './types';

const ClaimRegistrationCreateIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
	usePathParams: true,
	/** initialize root model */
	initRootModel: async (options: PreloaderFuncOptions) => {
		const {key = ''} = options.pathParams ?? {};
		const insured: (Omit<Insured, 'name'> & { insuredName?: string }) | undefined = loadFromSessionAndBurn(key);
		const rootModel: RootModel = JSON.parse(JSON.stringify(InitRootModel));
		// create registration case
		rootModel.data = await createClaimRegistrationCase(insured);
		return rootModel as unknown as ObjectPropValue;
	},
	/** run after root model initialized, to load submission channel */
	assistantData: async (options: PreloaderFuncOptions & Pick<PreloadedPageProps, 'initRootModel'>) => {
		const rootModel = options.initRootModel as unknown as RootModel;
		return async (globalHandlers: GlobalHandlers) => {
			const submissionChannelOptions: DropdownOptions = [];
			const {manualSubmit = false, submissionChannelId} = rootModel.data ?? {};
			if (!manualSubmit && VUtils.isNotBlank(submissionChannelId)) {
				try {
					const {
						channelId, name
					} = await DC.with(globalHandlers).use(async () => await askSubmissionChannel(submissionChannelId!)).ask();
					submissionChannelOptions.push({label: name, value: channelId});
				} catch (e) {
					console.groupCollapsed(`Failed to get submission channel by id[${submissionChannelId}].`);
					console.error(e);
				}
			}
			return {submissionChannelOptions};
		};
	},
	orderBy: [['initRootModel'], ['assistantData']]
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
