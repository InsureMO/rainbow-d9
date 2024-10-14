import {ObjectPropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {DC, PreloadedLazyPageWrapper, PreloadedPageProps, PreloaderFuncOptions} from '../../../standard-widgets';
import InitRootModel from '../../registration/create/init-root.json';
import {SharedMarkdown, SharedServices} from '../../shared';
import {loadRegistrationData} from './mock-services';
import {AssistantData, RootModel} from './types';
import {markdown} from './ui-config.d9';

const ClaimAcceptanceClaimEntryIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
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
		const {registrationId = ''} = options.pathParams ?? {};
		const data = await loadRegistrationData(registrationId);
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
			const submissionChannelOptions: DropdownOptions = [];
			const {manualSubmit = false, submissionChannelId} = rootModel.data ?? {};
			if (!manualSubmit && VUtils.isNotBlank(submissionChannelId)) {
				try {
					const {
						channelId, name
					} = await DC.with(globalHandlers).use(async () => await SharedServices.askSubmissionChannel(submissionChannelId!)).ask();
					submissionChannelOptions.push({label: name, value: channelId});
				} catch (e) {
					console.groupCollapsed(`Failed to get submission channel by id[${submissionChannelId}].`);
					console.error(e);
				}
			}
			return {submissionChannelOptions};
		};
	},
	orderBy: [['ui', 'initRootModel'], ['assistantData']]
});

const ClaimAcceptanceClaimEntryPage: AppPage = {
	code: 'claim-acceptance',
	route: '/claim/acceptance/claim-entry/:registrationId',
	breadcrumb: {
		title: 'claim.acceptance.claim-entry.title',
		locations: ['home.title', 'claim.title', 'claim.acceptance.title']
	},
	renderer: ClaimAcceptanceClaimEntryIndex
};

// register
PageRegistrar.register(ClaimAcceptanceClaimEntryPage);
