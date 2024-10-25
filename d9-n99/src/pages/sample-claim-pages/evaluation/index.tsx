import {MonitorNodeAttributes, NodeDef, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, GlobalEventPrefix, GlobalHandlers, IntlLabel, SectionDef, UnwrappedBox} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {asT} from '../../../utils';
import {
	PreloadedLazyPageWrapper,
	PreloadedPageProps,
	PreloaderFuncOptions,
	visitParsedUI
} from '../../standard-widgets';
import {Claim, SharedServices} from '../shared';
import {loadEvaluationData} from './services';
import {Data, RootModel} from './types';
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
		const wrapData = (data: Data) => {
			return new Proxy(data, {
				get(target: Data, p: string, _receiver: any): any {
					// create a property for view only, since the original property will be used to identify the dom node
					if (p === 'assessmentForView') {
						return target.assessment ?? {};
					} else {
						// @ts-ignore
						return target[p];
					}
				}
			});
		};
		const createAssessmentPolicyProductAdjustmentItemsTotal = (product: Claim.AssessmentPolicyProduct) => {
			return new Proxy({
				isTotal: true,
				name: asT(<IntlLabel keys={['claim.props.total']} value="Total"/>)
			} as Claim.AssessmentPolicyProductAdjustmentItem, {
				get(target: Claim.AssessmentPolicyProductAdjustmentItem, p: string, _receiver: any): any {
					if (['evaluationAmount', 'adjustmentAmount', 'paymentAmount'].includes(p)) {
						return (product.adjustmentItems ?? []).reduce((acc, item) => {
							// @ts-ignore
							return acc + (item[p] ?? 0);
						}, 0);
					} else {
						// @ts-ignore
						return target[p];
					}
				}
			});
		};
		const createAssessmentPolicyProductAdjustmentItemsWithTotalVisitor = () => {
			return {
				accept: (prop: string) => prop === 'adjustmentItemsWithTotal',
				visit: (product: Claim.AssessmentPolicyProduct, _prop: string) => {
					const items = product.adjustmentItems ?? [];
					return [...items, createAssessmentPolicyProductAdjustmentItemsTotal(product)];
				}
			};
		};
		const createAssessmentPolicyProductLiabilityEvaluationTotal = (product: Claim.AssessmentPolicyProduct) => {
			return new Proxy({
				isTotal: true,
				name: asT(<IntlLabel keys={['claim.props.total']} value="xxx"/>)
			} as Claim.AssessmentPolicyProductLiabilityEvaluation, {
				get(target: Claim.AssessmentPolicyProductLiabilityEvaluation, p: string, _receiver: any): any {
					if (['advancePayment', 'evaluationPayment', 'claimablePayment', 'actualPayment'].includes(p)) {
						return (product.liabilityEvaluations ?? []).reduce((acc, item) => {
							// @ts-ignore
							return acc + (item[p] ?? 0);
						}, 0);
					} else {
						// @ts-ignore
						return target[p];
					}
				}
			});
		};
		const createAssessmentPolicyProductLiabilityEvaluationsWithTotalVisitor = () => {
			return {
				accept: (prop: string) => prop === 'liabilityEvaluationsWithTotal',
				visit: (product: Claim.AssessmentPolicyProduct, _prop: string) => {
					const items = product.liabilityEvaluations ?? [];
					return [...items, createAssessmentPolicyProductLiabilityEvaluationTotal(product)];
				}
			};
		};
		// must be last of visitors, will handle any property which is not handled by other visitors
		const createAssessmentPolicyProductVisitorSaver = () => {
			return {
				accept: (_prop: string) => true,
				// @ts-ignore
				visit: (product: Claim.AssessmentPolicyProduct, prop: string) => product[prop]
			};
		};
		const visitAssessmentPolicyProduct = (product: Claim.AssessmentPolicyProduct, prop: string) => {
			return [
				createAssessmentPolicyProductAdjustmentItemsWithTotalVisitor(),
				createAssessmentPolicyProductLiabilityEvaluationsWithTotalVisitor(),
				createAssessmentPolicyProductVisitorSaver()
			].find(visitor => visitor.accept(prop))?.visit(product, prop);
		};
		const wrapAssessmentPolicyProducts = (products?: Array<Claim.AssessmentPolicyProduct>) => {
			return (products ?? []).map(product => {
				return new Proxy(product, {
					get(product: Claim.AssessmentPolicyProduct, p: string, _receiver: any): any {
						return visitAssessmentPolicyProduct(product, p);
					}
				});
			});
		};
		const wrapAssessmentPolicies = (policies?: Array<Claim.AssessmentPolicy>) => {
			return (policies ?? []).map(policy => {
				policy.products = wrapAssessmentPolicyProducts(policy.products);
				return policy;
			});
		};
		// clone
		const rootModel: RootModel = {
			control: {claimIssuesAllSelected: false, activeTab: 'workbench-tab'},
			data: wrapData({
				...data,
				claimIssues: data.claimIssues ?? [],
				queryLetters: data.queryLetters ?? [],
				internalQueries: data.internalQueries ?? [],
				escalations: data.escalations ?? [],
				investigations: data.investigations ?? [],
				underwritingByClaimList: data.underwritingByClaimList ?? [],
				assessment: {
					...data.assessment,
					policies: wrapAssessmentPolicies(data.assessment?.policies)
				},
				disbursementPlan: {
					...data.disbursementPlan,
					policies: data.disbursementPlan?.policies ?? []
				},
				internalExternalQueries: data.internalExternalQueries ?? [],
				commentHistory: data.commentHistory ?? []
			})
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
				},
				assessmentTabLocationOptions: async () => {
					const {data: {assessment}} = rootModel;
					const scrollBehavior: ScrollIntoViewOptions = {behavior: 'smooth', block: 'start'};
					type PolicyLevelOption = {
						domId: string; selector: string;
						prefix: string; i18nKey: string; extLabel?: string;
						expands: Array<[GlobalEventPrefix.EXPAND_RIBS_ELEMENT | GlobalEventPrefix.EXPAND_SECTION, string]>
					}
					const createLocOption = (options: PolicyLevelOption) => {
						const {domId, selector, prefix, i18nKey, extLabel, expands} = options;
						return {
							value: `${domId}:${selector}`,
							label: <UnwrappedBox data-dense-labels>
								<span>{prefix}.</span>
								<span><IntlLabel keys={[i18nKey]}/></span>
								{VUtils.isNotBlank(extLabel) ? <span>{extLabel}</span> : (void 0)}
							</UnwrappedBox>,
							locate: async () => {
								await expands.reduce(async (prev, [type, id]) => {
									await prev;
									return globalHandlers.sc(type, id, (void 0), async () => VUtils.noop());
								}, Promise.resolve());
								document.querySelector(`div${selector}#${domId}`)?.scrollIntoView(scrollBehavior);
							}
						};
					};
					return (assessment.policies ?? []).map((policy, policyIndex) => {
						const policyDomId = `data-assessment-policies_${policyIndex}`;
						return [
							createLocOption({
								domId: policyDomId, selector: '[data-w=d9-rib-row]',
								prefix: `${policyIndex + 1}`, i18nKey: 'claim.nav.policy', extLabel: policy.policyNo,
								expands: [[GlobalEventPrefix.EXPAND_RIBS_ELEMENT, policyDomId]]
							}),
							...(policy.products ?? []).map((product, productIndex) => {
								const productDomId = `${policyDomId}-products_${productIndex}`;
								return [
									createLocOption({
										domId: productDomId, selector: '[data-w=d9-rib-row]',
										prefix: `${policyIndex + 1}.${productIndex + 1}`, i18nKey: 'claim.nav.product',
										extLabel: product.code,
										expands: [
											[GlobalEventPrefix.EXPAND_RIBS_ELEMENT, policyDomId],
											[GlobalEventPrefix.EXPAND_SECTION, `$full:policy-payment-summary+${policyDomId}`],
											[GlobalEventPrefix.EXPAND_RIBS_ELEMENT, productDomId]
										]
									}),
									...([
										['[data-product-adjustment-factors]', 'claim.nav.product-adjustment-factors'],
										['[data-product-liability-evaluations]', 'claim.nav.product-liability-evaluation'],
										['[data-product-adjustment-items]', 'claim.nav.product-adjustment'],
										['[data-product-claim-decision]', 'claim.nav.product-claim-decision'],
										['[data-product-premium-waive]', 'claim.nav.product-premium-waive'],
										['[data-product-decrease-sa]', 'claim.nav.product-decrease-sa']
									].map(([selector, i18nKey], index) => {
										return createLocOption({
											domId: productDomId, selector,
											prefix: `${policyIndex + 1}.${productIndex + 1}.${index + 1}`,
											i18nKey, expands: [
												[GlobalEventPrefix.EXPAND_RIBS_ELEMENT, policyDomId],
												[GlobalEventPrefix.EXPAND_SECTION, `$full:policy-payment-summary+${policyDomId}`],
												[GlobalEventPrefix.EXPAND_RIBS_ELEMENT, productDomId],
												[GlobalEventPrefix.EXPAND_SECTION, `$full:${selector.replace(/\[data-(.+)]/, '$1')}+${productDomId}`]
											]
										});
									}))
								];
							}).flat(),
							createLocOption({
								domId: policyDomId, selector: '[data-policy-adjustment-items]',
								prefix: `${policyIndex + 1}.${(policy.products ?? []).length + 1}`,
								i18nKey: 'claim.nav.policy-adjustment-items',
								expands: [
									[GlobalEventPrefix.EXPAND_RIBS_ELEMENT, policyDomId],
									[GlobalEventPrefix.EXPAND_SECTION, `$full:policy-payment-summary+${policyDomId}`],
									[GlobalEventPrefix.EXPAND_SECTION, `$full:policy-adjustment-items+${policyDomId}`]
								]
							})
						];
					}).flat() as DropdownOptions;
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
