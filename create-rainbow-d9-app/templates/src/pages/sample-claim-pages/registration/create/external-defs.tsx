import {BaseModel, PropValue, RootEventTypes, ValueChangedOptions} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreatorOptions,
	doValidatePage,
	validatePage
} from '../../../standard-widgets';
import {AssistantData, RootModel} from './types';

export const createExternalDefsCreator = (_rootModelRef: MutableRefObject<any>, askAssistantData: (globalHandlers: GlobalHandlers) => Promise<AssistantData>) => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		const assistantData = await askAssistantData(globalHandlers);

		return {
			codes: createDropdownOptionsProvider(globalHandlers, {
				channelsForClaimRegistration: assistantData.submissionChannelOptions
			}),
			'change-insured': {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// do change insured
					alert('Change insured button clicked.');
				}
			},
			'search-reporter': {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// do change insured
					alert('Search reporter button clicked.');
				}
			},
			relationshipChanged: async (options: ValueChangedOptions<string>): Promise<void> => {
				const {root, newValue, oldValue} = options;
				if (newValue === oldValue) {
					return;
				}
				if (newValue === 'self') {
					const {insured, reporter} = (root as unknown as RootModel).data;
					reporter.idType = insured?.idType;
					reporter.idNo = insured?.idNo;
					reporter.name = insured?.name;
					// notify
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.reporter', reporter as unknown as PropValue, reporter as unknown as PropValue);
				}
			},
			comment: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					alert('Comment button clicked.');
				}
			},
			save: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// try catch
					try {
						await doValidatePage(globalHandlers);
						alert('Pass the validation.');
					} catch {
						// ignore
					}
				}
			},
			submit: {
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// callback, never reject, therefore no need to catch
					await validatePage(globalHandlers, async () => {
						alert('Pass the validation.');
					});
				}
			}
		};
	};
};
