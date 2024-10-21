import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {Claim} from '../types';

interface RootModel {
	data: { underwritingByClaimList: Claim.UnderwritingByClaimList };
}

export const createUnderwritingByClaimTableSectionActions = (_options: {
	globalHandlers: GlobalHandlers;
	rootModelRef: MutableRefObject<RootModel>;
}) => {
	// const {globalHandlers, rootModelRef} = options;

	return {
		// key of element for rendering, use static key based on index to avoid flickering
		getElementKey: (_element: Claim.UnderwritingByClaim, index: number) => `item-${index}`,
		view: {
			click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				alert('Underwriting by claim view button clicked.');
			}
		}
	};
};