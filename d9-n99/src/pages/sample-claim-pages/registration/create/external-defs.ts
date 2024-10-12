import {MutableRefObject} from 'react';
import {createDropdownOptionsProvider, D9PageExternalDefsCreatorOptions} from '../../../standard-widgets';

export const createExternalDefsCreator = (_rootModelRef: MutableRefObject<any>) => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		return {
			codes: createDropdownOptionsProvider(globalHandlers)
		};
	};
};
