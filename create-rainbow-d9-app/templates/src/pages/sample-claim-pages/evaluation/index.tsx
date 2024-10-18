import {MonitorNodeAttributes, NodeDef} from '@rainbow-d9/n1';
import {DropdownOptions, GlobalHandlers, SectionDef} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {asT} from '../../../utils';
import {
	PreloadedLazyPageWrapper,
	PreloadedPageProps,
	PreloaderFuncOptions,
	visitParsedUI
} from '../../standard-widgets';
import {SharedMarkdown, SharedServices} from '../shared';
import {loadRegistrationData} from './services';
import {RootModel} from './types';
import {markdown} from './ui-config.d9';

const ClaimEvaluationIndex = PreloadedLazyPageWrapper(lazy(() => import('./page')), {
	usePathParams: true,
	ui: async (_options: PreloaderFuncOptions): Promise<string> => {
		return markdown
			.replace('- Box::$$registration-base-section', SharedMarkdown.registrationBaseSection)
			.replace('- Box::$$claim-base-section', SharedMarkdown.claimBaseSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$additional-base-section', SharedMarkdown.additionalBaseSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$claim-issue-table-section', SharedMarkdown.claimIssueTableSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$query-letter-table-section', SharedMarkdown.queryLetterTableSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$internal-query-table-section', SharedMarkdown.internalQueryTableSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$escalation-table-section', SharedMarkdown.escalationTableSection.replace('## Section::', '#### Section::'))
			.replace('- Box::$$investigation-table-section', SharedMarkdown.investigationTableSection.replace('## Section::', '#### Section::'));
	},
	manufactureParsedUI: async (_options: PreloaderFuncOptions) => {
		return (parsed: NodeDef) => {
			visitParsedUI(parsed, (node, ancestors) => {
				// make claim base section collapsible
				if (asT<SectionDef>(node).title === 'claim.claim.title' && node.$pp === 'data.claim') {
					// let claim base section collapsible
					asT<SectionDef>(node).collapsible = true;
				} else if (ancestors != null && ancestors.length !== 0) {
					const parent = ancestors[0];
					if (asT<SectionDef>(parent).title === 'claim.claim.title' && parent.$pp === 'data.claim') {
						// let widgets under claim base section disabled
						node[MonitorNodeAttributes.DISABLED] = true;
					} else if (asT<SectionDef>(parent).title === 'claim.additional.title' && parent.$pp === 'data.additional') {
						// let widgets under additional base section disabled
						node[MonitorNodeAttributes.DISABLED] = true;
					}
				}
			});
			return parsed;
		};
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
				investigations: data.investigations ?? []
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
	orderBy: [['ui', 'initRootModel'], ['assistantData', 'manufactureParsedUI']]
});

const ClaimEvaluationPage: AppPage = {
	code: 'claim-evaluation',
	route: '/claim/evaluation/:keyOrRegistrationId',
	menuItemCode: 'claim-evaluation',
	breadcrumb: {
		title: 'claim.evaluation.title',
		locations: ['home.title', 'claim.title', 'claim.evaluation.title']
	},
	renderer: ClaimEvaluationIndex
};

// register
PageRegistrar.register(ClaimEvaluationPage);
