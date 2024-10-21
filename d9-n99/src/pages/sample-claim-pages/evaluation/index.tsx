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
import {SharedServices} from '../shared';
import {loadEvaluationData} from './services';
import {RootModel} from './types';
import {createMarkdown} from './ui-config';

const ClaimEvaluationIndex = PreloadedLazyPageWrapper(lazy(() => import('./page')), {
	usePathParams: true,
	ui: async (_options: PreloaderFuncOptions): Promise<string> => createMarkdown(),
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
		const {keyOrEvaluationId = ''} = options.pathParams ?? {};
		const data = await loadEvaluationData(keyOrEvaluationId);
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
				underwritingByClaimList: data.underwritingByClaimList ?? [],
				assessment: {
					...data.assessment,
					policies: data.assessment?.policies ?? []
				},
				disbursementPlan: {
					...data.disbursementPlan,
					policies: data.disbursementPlan?.policies ?? []
				},
				internalExternalQueries: data.internalExternalQueries ?? [],
				commentHistory: data.commentHistory ?? []
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
					...rootModel.data.investigations.map(investigation => investigation.lastUpdatedBy),
					...rootModel.data.underwritingByClaimList.map(underwriting => underwriting.submittedBy),
					...rootModel.data.underwritingByClaimList.map(underwriting => underwriting.repliedBy),
					...rootModel.data.internalExternalQueries.map(query => query.generatedBy),
					...rootModel.data.internalExternalQueries.map(query => query.repliedBy),
					...rootModel.data.commentHistory.map(comment => comment.commentedBy)
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
	route: '/claim/evaluation/:keyOrEvaluationId',
	menuItemCode: 'claim-evaluation',
	breadcrumb: {
		title: 'claim.evaluation.title',
		locations: ['home.title', 'claim.title', 'claim.evaluation.title']
	},
	renderer: ClaimEvaluationIndex
};

// register
PageRegistrar.register(ClaimEvaluationPage);
