import {BaseModel, PropValue, RootEventTypes} from '@rainbow-d9/n1';
import {ButtonClickOptions, DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {asT, getAuthentication} from '../../../../utils';
import {createInvestigation} from '../add-investigation';
import {Claim} from '../types';

interface RootModel {
	data: { investigations: Claim.Investigations };
}

export const createInvestigationTableSectionActions = (options: {
	globalHandlers: GlobalHandlers;
	rootModelRef: MutableRefObject<RootModel>;
	assistantData: { userOptions: DropdownOptions; investigatorOptions: () => Promise<DropdownOptions> };
}) => {
	const {globalHandlers, rootModelRef, assistantData} = options;

	return {
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
					const root: RootModel = asT(rootModelRef.current);
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
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.investigations', asT(investigations), asT(investigations));
				});
			}
		}
	};
};