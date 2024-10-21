import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {ButtonClickOptions, CaptionClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {asT} from '../../../utils';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreatorOptions,
	validatePageWithCallback
} from '../../standard-widgets';
import {
	Claim,
	createActionsAndSupportingActions,
	createClaimIssueTableSectionActions,
	createEscalationTableSectionActions,
	createInternalQueryTableSectionActions,
	createInvestigationTableSectionActions,
	createQueryLetterTableSectionActions,
	createUnderwritingByClaimTableSectionActions
} from '../shared';
import {AssistantData} from './types';

export const createExternalDefsCreator = (rootModelRef: MutableRefObject<any>, askAssistantData: (globalHandlers: GlobalHandlers) => Promise<AssistantData>) => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		const assistantData = await askAssistantData(globalHandlers);

		return {
			codes: createDropdownOptionsProvider(globalHandlers, {
				channelsForClaimRegistration: assistantData.submissionChannelOptions,
				users: assistantData.userOptions, userDepartments: assistantData.userDepartmentOptions
			}),
			ans: createActionsAndSupportingActions({globalHandlers, rootModelRef}),
			'claim-issue': createClaimIssueTableSectionActions({globalHandlers, rootModelRef, assistantData}),
			'query-letter': createQueryLetterTableSectionActions({globalHandlers, rootModelRef}),
			'internal-query': createInternalQueryTableSectionActions({globalHandlers, rootModelRef}),
			escalation: createEscalationTableSectionActions({globalHandlers, rootModelRef, assistantData}),
			investigation: createInvestigationTableSectionActions({globalHandlers, rootModelRef, assistantData}),
			'underwriting-by-claim': createUnderwritingByClaimTableSectionActions({globalHandlers, rootModelRef}),
			policies: {
				policy: {
					view: {
						click: async (options: CaptionClickOptions<BaseModel, PropValue>) => {
							alert(`Policy[${asT<Claim.LifeAssuredPolicy>(options.model).policyNo}] link clicked.`);
						}
					},
					product: {
						getElementKey: (_element: Claim.LifeAssuredPolicyProduct, index: number) => `item-${index}`
					}
				}
			},
			assessment: {
				policy: {
					view: {
						click: async (options: CaptionClickOptions<BaseModel, PropValue>) => {
							alert(`Policy[${asT<Claim.AssessmentPolicy>(options.model).policyNo}] link clicked.`);
						}
					},
					product: {
						getElementKey: (_element: Claim.AssessmentPolicyProduct, index: number) => `item-${index}`
					}
				}
			},
			comment: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					alert('Comment button clicked.');
				}
			},
			'reload-policy': {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					alert('Reload policy button clicked.');
				}
			},
			submit: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// callback, never reject, therefore no need to catch
					await validatePageWithCallback({
						globalHandlers,
						passed: async () => {
							alert('Pass the validation.');
						},
						failed: async (_, failed) => {
							if (failed.length > 0) {
								// switch tab
								if (failed[0].id.startsWith('data-decision')) {
									await globalHandlers.sc('tab', 'decision-tab');
								} else {
									await globalHandlers.sc('tab', 'issue-tab');
								}
								// focus again, make sure the element scrolls to viewport
								failed[0].element?.focus();
							}
						}
					});
				}
			}
		};
	};
};
