import {ObjectPropValue} from '@rainbow-d9/n1';
import {GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {PreloadedLazyPageWrapper, PreloadedPageProps, PreloaderFuncOptions} from '../../../standard-widgets';
import {SharedMarkdown, SharedServices} from '../../shared';
import InitRootModel from './init-root.json';
import {loadRegistrationData} from './mock-services';
import {AssistantData, RootModel} from './types';
import {markdown} from './ui-config.d9';

const ClaimAcceptanceClaimEntryIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
	usePathParams: true,
	ui: async (_options: PreloaderFuncOptions): Promise<string> => {
		return markdown.replace('- Box::$$registration-base-section', SharedMarkdown.registrationBaseSection);
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
			const [
				submissionChannelOptions,
				{users: userOptions, departments: userDepartmentOptions}
			] = await Promise.all([
				await SharedServices.askSubmissionChannelOptions(globalHandlers, rootModel.data),
				await SharedServices.askUserAndDepartmentOptions(globalHandlers, [...new Set([
					...rootModel.data.claimIssues.map(issue => issue.generatedBy),
					...rootModel.data.claimIssues.map(issue => issue.lastUpdatedBy),
					...rootModel.data.queryLetters.map(letter => letter.generatedBy),
					...rootModel.data.queryLetters.map(letter => letter.lastUpdatedBy),
					...rootModel.data.internalQueries.map(query => query.assignee),
					...rootModel.data.internalQueries.map(query => query.generatedBy),
					...rootModel.data.internalQueries.map(query => query.lastUpdatedBy),
					...rootModel.data.escalations.map(escalation => escalation.escalatedTo),
					...rootModel.data.escalations.map(escalation => escalation.escalatedBy),
					...rootModel.data.escalations.map(escalation => escalation.lastUpdatedBy),
					...rootModel.data.investigations.map(investigation => investigation.submittedTo),
					...rootModel.data.investigations.map(investigation => investigation.submittedBy),
					...rootModel.data.investigations.map(investigation => investigation.lastUpdatedBy)
					// @ts-ignore
				].filter<string>(x => x != null))])
			]);
			return {submissionChannelOptions, userOptions, userDepartmentOptions};
		};
	},
	orderBy: [['ui', 'initRootModel'], ['assistantData']]
});

const ClaimAcceptanceClaimEntryPage: AppPage = {
	code: 'claim-acceptance-policy-acceptance',
	route: '/claim/acceptance/policy-acceptance/:keyOrRegistrationId',
	breadcrumb: {
		title: 'claim.acceptance.policy-acceptance.title',
		locations: ['home.title', 'claim.title', 'claim.acceptance.title']
	},
	renderer: ClaimAcceptanceClaimEntryIndex
};

// register
PageRegistrar.register(ClaimAcceptanceClaimEntryPage);
