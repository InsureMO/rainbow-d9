import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';

interface RootModel {
}

export const createActionsAndSupportingActions = (_options: {
	globalHandlers: GlobalHandlers;
	rootModelRef: MutableRefObject<RootModel>;
}) => {
	return {
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
		'edit-case': {
			click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				alert('Edit case info button clicked.');
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
		},
		'accept-policy': {
			click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				alert('Accept policy button clicked.');
			}
		}
	};
};