import {BaseModel, PropValue, RootEventTypes} from '@rainbow-d9/n1';
import {ButtonClickOptions, DropdownOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {asT, getAuthentication} from '../../../../utils';
import {createEscalation} from '../add-escalation';
import {Claim} from '../types';

interface RootModel {
	data: { escalations: Claim.Escalations };
}

export const createEscalationTableSectionActions = (options: {
	globalHandlers: GlobalHandlers;
	rootModelRef: MutableRefObject<RootModel>;
	assistantData: { userOptions: DropdownOptions; escalateToOptions: () => Promise<DropdownOptions> };
}) => {
	const {globalHandlers, rootModelRef, assistantData} = options;
	return {
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
					const root: RootModel = asT(rootModelRef.current);
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
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.escalations', asT(escalations), asT(escalations));
				});
			}
		}
	};
};