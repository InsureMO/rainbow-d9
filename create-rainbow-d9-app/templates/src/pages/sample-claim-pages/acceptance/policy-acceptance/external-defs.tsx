import {BaseModel, PropValue, VUtils} from '@rainbow-d9/n1';
import {ButtonClickOptions, CaptionClickOptions, GlobalEventPrefix, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {asT} from '../../../../utils';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreatorOptions,
	validatePageWithCallback
} from '../../../standard-widgets';
import {
	Claim,
	createActionsAndSupportingActions,
	createClaimIssueTableSectionActions,
	createEscalationTableSectionActions,
	createInternalQueryTableSectionActions,
	createInvestigationTableSectionActions,
	createQueryLetterTableSectionActions
} from '../../shared';
import {saveRegistrationData} from './services';
import {AssistantData, RootModel} from './types';

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
			decision: {
				policy: {
					view: {
						click: async (options: CaptionClickOptions<BaseModel, PropValue>) => {
							alert(`Policy[${asT<Claim.AcceptanceOnPolicy>(options.model).policyNo}] link clicked.`);
						}
					},
					product: {
						getElementKey: (_element: Claim.AcceptanceOnPolicyProduct, index: number) => `item-${index}`
					}
				}
			},
			comment: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					alert('Comment button clicked.');
				}
			},
			previous: {
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					// try catch
					try {
						// await doValidatePage(globalHandlers);
						const {data} = asT<RootModel>(options.root);
						const key = await saveRegistrationData(data);
						globalHandlers.navigate.to(`/claim/acceptance/claim-entry/${key}`);
					} catch {
						// ignore
					}
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
									await globalHandlers.sc(GlobalEventPrefix.TAB, 'decision-tab', (void 0), async () => VUtils.noop());
								} else {
									await globalHandlers.sc(GlobalEventPrefix.TAB, 'issue-tab', (void 0), async () => VUtils.noop());
								}
								alert('done');
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
