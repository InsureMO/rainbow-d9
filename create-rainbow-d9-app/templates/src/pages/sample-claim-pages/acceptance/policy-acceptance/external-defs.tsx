import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {asT} from '../../../../utils';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreatorOptions,
	validatePageWithCallback
} from '../../../standard-widgets';
import {
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
						globalHandlers, passed: async () => {
							alert('Pass the validation.');
						}
					});
				}
			}
		};
	};
};
