import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {createDropdownOptionsProvider, D9PageExternalDefsCreatorOptions, validatePage} from '../../../../page-widgets';
import {asT} from '../../../../utils';
import {createChangeInsuredAction} from '../../registration/find-insured/page-as-dialog';
import {createActionsAndSupportingActions, createReporterBaseSectionActions} from '../../shared';
import {saveRegistrationData} from './services';
import {AssistantData, RootModel} from './types';

export const createExternalDefsCreator = (rootModelRef: MutableRefObject<any>, askAssistantData: (globalHandlers: GlobalHandlers) => Promise<AssistantData>) => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		const assistantData = await askAssistantData(globalHandlers);

		return {
			codes: createDropdownOptionsProvider(globalHandlers, {
				channelsForClaimRegistration: assistantData.submissionChannelOptions
			}),
			ans: createActionsAndSupportingActions({globalHandlers, rootModelRef}),
			'change-insured': createChangeInsuredAction({globalHandlers}),
			reporter: createReporterBaseSectionActions({globalHandlers}),
			comment: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					alert('Comment button clicked.');
				}
			},
			save: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// try catch
					try {
						await validatePage({globalHandlers});
						alert('Pass the validation.');
					} catch {
						// ignore
					}
				}
			},
			next: {
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					// callback, never reject, therefore no need to catch
					// await validatePage(globalHandlers, async () => {
					const key = await saveRegistrationData(asT<RootModel>(options.root).data);
					globalHandlers.navigate.to(`/claim/acceptance/policy-acceptance/${key}`);
					// });
				}
			}
		};
	};
};
