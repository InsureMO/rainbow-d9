import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {Claim} from '../types';

interface RootModel {
	data: { queryLetters: Claim.QueryLetters };
}

export const createQueryLetterTableSectionActions = (_options: {
	globalHandlers: GlobalHandlers;
	rootModelRef: MutableRefObject<RootModel>;
}) => {
	return {
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
	};
};