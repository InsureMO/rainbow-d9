import {ObjectPropValue} from '@rainbow-d9/n1';
import {DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {PreloadedLazyPageWrapper, PreloadedPageProps, PreloaderFuncOptions} from '../../../standard-widgets';
import {SharedMarkdown, SharedServices} from '../../shared';
import InitRootModel from './init-root.json';
import {loadRegistrationData} from './services';
import {AssistantData, RootModel} from './types';
import {markdown} from './ui-config.d9';

const ClaimAcceptanceClaimEntryIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
	usePathParams: true,
	ui: async (_options: PreloaderFuncOptions): Promise<string> => {
		return markdown
			.replace('- Box::$$registration-base-section', SharedMarkdown.registrationBaseSection)
			.replace('- Box::$$insured-base-section', SharedMarkdown.insuredBaseSection)
			.replace('- Box::$$claim-base-section', SharedMarkdown.claimBaseSection)
			.replace('- Box::$$additional-base-section', SharedMarkdown.additionalBaseSection)
			.replace('- Box::$$reporter-base-section', SharedMarkdown.reporterBaseSection);
	},
	/** initialize root model */
	initRootModel: async (options: PreloaderFuncOptions) => {
		const {keyOrRegistrationId = ''} = options.pathParams ?? {};
		const data = await loadRegistrationData(keyOrRegistrationId);
		// clone
		const rootModel: RootModel = JSON.parse(JSON.stringify(InitRootModel));
		// create registration case
		rootModel.data = data;
		return rootModel as unknown as ObjectPropValue;
	},
	/** run after root model initialized, to load submission channel */
	assistantData: async (options: PreloaderFuncOptions & Pick<PreloadedPageProps, 'initRootModel'>) => {
		const rootModel = options.initRootModel as unknown as RootModel;
		return async (globalHandlers: GlobalHandlers) => {
			const submissionChannelOptions: DropdownOptions = await SharedServices.askSubmissionChannelOptions(globalHandlers, rootModel.data);
			return {submissionChannelOptions};
		};
	},
	orderBy: [['ui', 'initRootModel'], ['assistantData']]
});

const ClaimAcceptanceClaimEntryPage: AppPage = {
	code: 'claim-acceptance-claim-entry',
	route: '/claim/acceptance/claim-entry/:keyOrRegistrationId',
	breadcrumb: {
		title: 'claim.acceptance.claim-entry.title',
		locations: ['home.title', 'claim.title', 'claim.acceptance.title']
	},
	renderer: ClaimAcceptanceClaimEntryIndex
};

// register
PageRegistrar.register(ClaimAcceptanceClaimEntryPage);
