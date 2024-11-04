import {BaseModel, PropValue, RootEventTypes, ValueChangedOptions} from '@rainbow-d9/n1';
import {ButtonClickOptions, CaptionClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {asT} from '../../../utils';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreatorOptions,
	ExternalDefsWithGlobalCustomEventListeners,
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
import {AssistantData, RootModel} from './types';

export const createExternalDefsCreator = (rootModelRef: MutableRefObject<RootModel>, askAssistantData: (globalHandlers: GlobalHandlers) => Promise<AssistantData>) => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions): Promise<ExternalDefsWithGlobalCustomEventListeners> => {
		const assistantData = await askAssistantData(globalHandlers);

		return {
			$GlobalCustomEventListeners: {
				onTabChanged: ({marker}) => {
					// @ts-ignore
					rootModelRef.current.control.activeTab = marker;
					globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.activeTab', marker, marker);
				}
			},
			codes: createDropdownOptionsProvider(globalHandlers, {
				channelsForClaimRegistration: assistantData.submissionChannelOptions,
				users: assistantData.userOptions, userDepartments: assistantData.userDepartmentOptions,
				assessmentTabLocations: assistantData.assessmentTabLocationOptions
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
					}
				},
				'liability-evaluation': {
					compute: {
						click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
							alert('Liability evaluation compute button clicked.');
						}
					},
					'auto-select': {
						click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
							alert('Liability evaluation auto select button clicked.');
						}
					}
				},
				'page-navigator': {
					'value-changed': async (options: ValueChangedOptions<string>): Promise<void> => {
						const {newValue} = options;
						const option = (await assistantData.assessmentTabLocationOptions()).find(option => option.value === newValue);
						if (option != null) {
							await (option as any).locate();
						}
					}
				}
			},
			'disbursement-plan': {
				'remove-payee': {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Remove payee button clicked.');
					}
				},
				'remove-disbursement': {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Remove disbursement button clicked.');
					}
				},
				'add-lump-sum': {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Add lump-sum button clicked.');
					}
				},
				'add-installment': {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Add installment button clicked.');
					}
				},
				'add-payee': {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Add payee button clicked.');
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
							}
						}
					});
				}
			}
		};
	};
};
