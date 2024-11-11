import {DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {PreloadedLazyPageWrapper, PreloadedPageProps, PreloaderFuncOptions} from '../../../../page-widgets';
import {asT} from '../../../../utils';
import {Claim, SharedMarkdown, SharedServices} from '../../shared';
import InitRootModel from './init-root.json';
import {createClaimRegistrationCase, loadRegistrationData} from './services';
import {AssistantData, RootModel} from './types';
import {markdown} from './ui-config.d9';

const ClaimRegistrationCreateIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
	usePathParams: true,
	ui: async (_options: PreloaderFuncOptions): Promise<string> => {
		return markdown
			.replace('- Box::$$registration-base-section', SharedMarkdown.registrationBaseSection)
			.replace('- Box::$$insured-base-section', SharedMarkdown.insuredBaseSection)
			.replace('- Box::$$claim-base-section', SharedMarkdown.claimBaseSection)
			.replace('- Box::$$reporter-base-section', SharedMarkdown.reporterBaseSection);
	},
	/** initialize root model */
	initRootModel: async (options: PreloaderFuncOptions) => {
		const {key = ''} = options.pathParams ?? {};
		const insured: Claim.Insured | undefined = loadRegistrationData(key);
		// clone
		const rootModel: RootModel = JSON.parse(JSON.stringify(InitRootModel));
		// create registration case
		rootModel.data = await createClaimRegistrationCase(insured);
		return asT(rootModel);
	},
	/** run after root model initialized, to load submission channel */
	assistantData: async (options: PreloaderFuncOptions & Pick<PreloadedPageProps, 'initRootModel'>) => {
		const rootModel: RootModel = asT(options.initRootModel);
		return async (globalHandlers: GlobalHandlers) => {
			const submissionChannelOptions: DropdownOptions = await SharedServices.askSubmissionChannelOptions(globalHandlers, rootModel.data);
			return {submissionChannelOptions};
		};
	},
	orderBy: [['ui', 'initRootModel'], ['assistantData']]
});

const ClaimRegistrationCreatePage: AppPage = {
	code: 'claim-registration-create',
	route: '/claim/registration/create/:key',
	breadcrumb: {
		title: 'claim.registration.create.title',
		locations: ['home.title', 'claim.title', 'claim.registration.title']
	},
	renderer: ClaimRegistrationCreateIndex
};

// register
PageRegistrar.register(ClaimRegistrationCreatePage);
