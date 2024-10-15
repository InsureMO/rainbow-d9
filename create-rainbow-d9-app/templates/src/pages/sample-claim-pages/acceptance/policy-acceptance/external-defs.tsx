import {ArrayPropValue, BaseModel, PropValue, RootEventTypes} from '@rainbow-d9/n1';
import {ValueChangedOptions} from '@rainbow-d9/n1/src';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {getAuthentication} from '../../../../utils';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreatorOptions,
	validatePageWithCallback
} from '../../../standard-widgets';
import {Claim} from '../../shared';
import {createClaimIssue} from '../add-claim-issue';
import {createEscalation} from '../add-escalation';
import {createInvestigation} from '../add-investigation';
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
						await createClaimIssue(globalHandlers, async (issue: Claim.ClaimIssue) => {
							const root = rootModelRef.current as unknown as RootModel;
							const claimIssues = root.data.claimIssues ?? [];
							root.data.claimIssues = claimIssues;
							claimIssues.push(issue);
							// the tricky thing is that preloaded user options might not include myself.
							// which means when the created claim issue has been pushed into list
							// but the table cannot display the generatedBy name correctly.
							// so the solution is to check and re-fetch the user options and update the user options
							if (assistantData.userOptions.every(({value}) => value !== issue.generatedBy)) {
								// lucky, name can be retrieved from current account
								assistantData.userOptions.push({
									value: issue.generatedBy!, label: getAuthentication()?.username ?? ''
								});
							}
							// notify
							globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.claimIssues', claimIssues as unknown as ArrayPropValue, claimIssues as unknown as ArrayPropValue);
						});
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
				add: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						const escalatedToOptions = await assistantData.escalateToOptions();
						await createEscalation(globalHandlers, escalatedToOptions, async (escalation: Claim.Escalation) => {
							const root = rootModelRef.current as unknown as RootModel;
							const escalations = root.data.escalations ?? [];
							root.data.escalations = escalations;
							escalations.push(escalation);
							// the tricky thing is that preloaded user options might not include myself.
							// which means when the created claim issue has been pushed into list
							// but the table cannot display the generatedBy name correctly.
							// so the solution is to check and re-fetch the user options and update the user options
							if (assistantData.userOptions.every(({value}) => value !== escalation.escalatedTo)) {
								// lucky, name can be retrieved from escalatedToOptions
								assistantData.userOptions.push(escalatedToOptions.find(({value}) => value === escalation.escalatedTo)!);
							}
							if (assistantData.userOptions.every(({value}) => value !== escalation.escalatedBy)) {
								// lucky, name can be retrieved from current account
								assistantData.userOptions.push({
									value: escalation.escalatedBy!, label: getAuthentication()?.username ?? ''
								});
							}
							// notify
							globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.escalations', escalations as unknown as ArrayPropValue, escalations as unknown as ArrayPropValue);
						});
					}
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
				add: {
					click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
						const investigatorOptions = await assistantData.investigatorOptions();
						await createInvestigation(globalHandlers, investigatorOptions, async (investigation: Claim.Investigation) => {
							const root = rootModelRef.current as unknown as RootModel;
							const investigations = root.data.investigations ?? [];
							root.data.investigations = investigations;
							investigations.push(investigation);
							// the tricky thing is that preloaded user options might not include myself.
							// which means when the created claim issue has been pushed into list
							// but the table cannot display the generatedBy name correctly.
							// so the solution is to check and re-fetch the user options and update the user options
							if (assistantData.userOptions.every(({value}) => value !== investigation.submittedTo)) {
								// lucky, name can be retrieved from investigatorOptions
								assistantData.userOptions.push(investigatorOptions.find(({value}) => value === investigation.submittedTo)!);
							}
							if (assistantData.userOptions.every(({value}) => value !== investigation.submittedBy)) {
								// lucky, name can be retrieved from current account
								assistantData.userOptions.push({
									value: investigation.submittedBy!, label: getAuthentication()?.username ?? ''
								});
							}
							// notify
							globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.investigations', investigations as unknown as ArrayPropValue, investigations as unknown as ArrayPropValue);
						});
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
						const {data} = options.root as unknown as RootModel;
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
