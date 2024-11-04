import {BaseModel, PropValue, RootEventTypes, ValueChangedOptions} from '@rainbow-d9/n1';
import {ButtonClickOptions, DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {asT, getAuthentication} from '../../../../utils';
import {createClaimIssue} from '../add-claim-issue';
import {Claim} from '../types';

interface RootModel {
	control: { claimIssuesAllSelected: boolean };
	data: { claimIssues: Claim.ClaimIssues };
}

export const createClaimIssueTableSectionActions = (options: {
	globalHandlers: GlobalHandlers;
	rootModelRef: MutableRefObject<RootModel>;
	assistantData: { userOptions: DropdownOptions };
}) => {
	const {globalHandlers, rootModelRef, assistantData} = options;

	return {
		'all-selected-changed': async (options: ValueChangedOptions<boolean>): Promise<void> => {
			const {root, newValue, oldValue} = options;
			if (newValue === oldValue) {
				return;
			}
			const claimIssues = asT<RootModel>(root).data.claimIssues ?? [];
			claimIssues.forEach(issue => issue.selected = newValue);
			// notify
			globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.claimIssues', asT(claimIssues), asT(claimIssues));
		},
		'row-selected-changed': async (options: ValueChangedOptions<boolean>): Promise<void> => {
			const {root: $root, newValue, oldValue} = options;
			if (newValue === oldValue) {
				return;
			}
			const root: RootModel = asT($root);
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
					const root = rootModelRef.current;
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
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.claimIssues', asT(claimIssues), asT(claimIssues));
				});
			}
		}
	};
};