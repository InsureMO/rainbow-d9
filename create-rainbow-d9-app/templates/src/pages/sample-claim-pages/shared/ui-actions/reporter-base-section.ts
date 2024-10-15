import {BaseModel, PropValue, RootEventTypes, ValueChangedOptions} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {asT} from '../../../../utils';
import {Claim} from '../types';

interface RootModel {
	data: { insured: Claim.Insured; reporter: Claim.Reporter };
}

export const createReporterBaseSectionActions = (options: {
	globalHandlers: GlobalHandlers;
}) => {
	const {globalHandlers} = options;

	return {
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
				const {insured, reporter} = asT<RootModel>(root).data;
				reporter.idType = insured?.idType;
				reporter.idNo = insured?.idNo;
				reporter.name = insured?.name;
				// notify
				globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/data.reporter', asT(reporter), asT(reporter));
			}
		}
	};
};