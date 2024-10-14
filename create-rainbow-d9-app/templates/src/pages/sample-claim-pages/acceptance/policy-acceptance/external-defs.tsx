import {BaseModel, PropValue, RootEventTypes} from '@rainbow-d9/n1';
import {ValueChangedOptions} from '@rainbow-d9/n1/src';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {createDropdownOptionsProvider, D9PageExternalDefsCreatorOptions, validatePage} from '../../../standard-widgets';
import {Claim} from '../../shared';
import {saveRegistrationData} from './mock-services';
import {AssistantData, RootModel} from './types';

export const createExternalDefsCreator = (_rootModelRef: MutableRefObject<any>, askAssistantData: (globalHandlers: GlobalHandlers) => Promise<AssistantData>) => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		const assistantData = await askAssistantData(globalHandlers);

		return {
			codes: createDropdownOptionsProvider(globalHandlers, {
				channelsForClaimRegistration: assistantData.submissionChannelOptions,
				users: assistantData.userOptions, userDepartments: assistantData.userDepartmentOptions
			}),
			ans: {
				images: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Image button clicked.');
					}
				},
				'doc-checklist': {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Document checklist button clicked.');
					}
				},
				'medical-bill': {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Medical bill button clicked.');
					}
				},
				history: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('History button clicked.');
					}
				}
			},
			'claim-issue': {
				'all-selected-changed': async (options: ValueChangedOptions<boolean>): Promise<void> => {
					const {root, newValue, oldValue} = options;
					if (newValue === oldValue) {
						return;
					}
					const claimIssues = (root as unknown as RootModel).data.claimIssues ?? [];
					claimIssues.forEach(issue => issue.selected = newValue);
					// notify
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.claimIssues', claimIssues as unknown as PropValue, claimIssues as unknown as PropValue);
				},
				'row-selected-changed': async (options: ValueChangedOptions<boolean>): Promise<void> => {
					const {root: $root, newValue, oldValue} = options;
					if (newValue === oldValue) {
						return;
					}
					const root = $root as unknown as RootModel;
					const claimIssues = root.data.claimIssues ?? [];
					const allSelected = claimIssues.every(issue => issue.selected);
					root.control.claimIssuesAllSelected = allSelected;
					// notify
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/control.claimIssuesAllSelected', allSelected, allSelected);
				},
				// key of element for rendering, use static key based on index to avoid flickering
				getElementKey: (_element: Claim.ClaimIssue, index: number) => `item-${index}`,
				close: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Claim issue close button clicked.');
					}
				},
				delete: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Claim issue delete button clicked.');
					}
				},
				'generate-internal-query': {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Claim issue generate internal query button clicked.');
					}
				},
				'generate-query-letter': {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Claim issue generate query letter button clicked.');
					}
				},
				add: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Add claim issue button clicked.');
					}
				}
			},
			'query-letter': {
				// key of element for rendering, use static key based on index to avoid flickering
				getElementKey: (_element: Claim.QueryLetter, index: number) => `item-${index}`,
				reply: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Query letter reply button clicked.');
					}
				},
				edit: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Query letter edit button clicked.');
					}
				},
				reminder: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Query letter reminder button clicked.');
					}
				}
			},
			'internal-query': {
				// key of element for rendering, use static key based on index to avoid flickering
				getElementKey: (_element: Claim.InternalQuery, index: number) => `item-${index}`,
				view: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Internal query view button clicked.');
					}
				},
				withdraw: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Internal query withdraw button clicked.');
					}
				}
			},
			escalation: {
				// key of element for rendering, use static key based on index to avoid flickering
				getElementKey: (_element: Claim.Escalation, index: number) => `item-${index}`,
				view: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Escalation view button clicked.');
					}
				},
				withdraw: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Escalation withdraw button clicked.');
					}
				},
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					alert('Escalation button clicked.');
				}
			},
			investigation: {
				// key of element for rendering, use static key based on index to avoid flickering
				getElementKey: (_element: Claim.Investigation, index: number) => `item-${index}`,
				view: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Investigation view button clicked.');
					}
				},
				withdraw: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						alert('Investigation withdraw button clicked.');
					}
				},
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					alert('Investigation button clicked.');
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
						const {data} = options.root as unknown as RootModel;
						const key = await saveRegistrationData(data);
						globalHandlers.navigate.to(`/claim/acceptance/claim-entry/${key}`);
					} catch {
						// ignore
					}
				}
			},
			'reload-policy': {},
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
