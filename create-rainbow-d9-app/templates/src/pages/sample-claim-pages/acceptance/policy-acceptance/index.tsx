import {DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../../global-settings';
import {PreloadedLazyPageWrapper, PreloadedPageProps, PreloaderFuncOptions} from '../../../../page-widgets';
import {asT} from '../../../../utils';
import {SharedMarkdown, SharedServices} from '../../shared';
import {loadRegistrationData} from './services';
import {AssistantData, RootModel} from './types';
import {markdown} from './ui-config.d9';

const ClaimAcceptanceClaimEntryIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
	usePathParams: true,
	ui: async (_options: PreloaderFuncOptions): Promise<string> => {
		return markdown.replace('- Box::$$registration-base-section', SharedMarkdown.registrationBaseSection)
			.replace('- Box::$$claim-issue-table-section', SharedMarkdown.claimIssueTableSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$query-letter-table-section', SharedMarkdown.queryLetterTableSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$internal-query-table-section', SharedMarkdown.internalQueryTableSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$escalation-table-section', SharedMarkdown.escalationTableSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$investigation-table-section', SharedMarkdown.investigationTableSection.replace('## Section::', '#### Section::'));
	},
	/** initialize root model */
	initRootModel: async (options: PreloaderFuncOptions) => {
		const {keyOrRegistrationId = ''} = options.pathParams ?? {};
		const data = await loadRegistrationData(keyOrRegistrationId);
		// clone
		const rootModel: RootModel = {
			control: {claimIssuesAllSelected: false},
			data: {
				...data,
				claimIssues: data.claimIssues ?? [],
				queryLetters: data.queryLetters ?? [],
				internalQueries: data.internalQueries ?? [],
				escalations: data.escalations ?? [],
				investigations: data.investigations ?? [],
				decision: {
					...data.decision,
					policies: data.decision?.policies ?? []
				}
			}
		};
		return asT(rootModel);
	},
	/** run after root model initialized, to load submission channel */
	assistantData: async (options: PreloaderFuncOptions & Pick<PreloadedPageProps, 'initRootModel'>) => {
		const rootModel: RootModel = asT(options.initRootModel);
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
			let escalateToOptions: DropdownOptions;
			let investigatorOptions: DropdownOptions;
			return {
				submissionChannelOptions, userOptions, userDepartmentOptions,
				escalateToOptions: async () => {
					// load once
					if (escalateToOptions == null) {
						escalateToOptions = await SharedServices.askEscalateToOptions(globalHandlers);
					}
					return escalateToOptions;
				},
				investigatorOptions: async () => {
					// load once
					if (investigatorOptions == null) {
						investigatorOptions = await SharedServices.askInvestigatorOptions(globalHandlers);
					}
					return investigatorOptions;
				}
			};
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
