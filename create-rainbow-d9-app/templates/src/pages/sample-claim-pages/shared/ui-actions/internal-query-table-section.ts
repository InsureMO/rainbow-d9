import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {Claim} from '../types';

interface RootModel {
	data: { internalQueries: Claim.InternalQueries };
}

export const createInternalQueryTableSectionActions = (_options: {
	globalHandlers: GlobalHandlers;
	rootModelRef: MutableRefObject<RootModel>;
}) => {
	return {
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
	};
};