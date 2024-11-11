import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreatorOptions,
	validatePage,
	validatePageWithCallback
} from '../../../../page-widgets';
import {createActionsAndSupportingActions, createReporterBaseSectionActions} from '../../shared';
import {createChangeInsuredAction} from '../find-insured/page-as-dialog';
import {AssistantData} from './types';

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
