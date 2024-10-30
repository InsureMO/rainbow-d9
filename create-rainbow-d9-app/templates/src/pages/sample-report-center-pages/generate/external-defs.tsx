import {BaseModel, PropValue, RootEventTypes} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {DropdownTreeOption} from '@rainbow-d9/n2/src';
import {MutableRefObject} from 'react';
import {asT} from '../../../utils';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreator,
	D9PageExternalDefsCreatorOptions
} from '../../standard-widgets';
import {AssistantData, RootModel} from './types';

export const createExternalDefsCreator = (
	rootModelRef: MutableRefObject<RootModel>, askAssistantData: (globalHandlers: GlobalHandlers) => Promise<AssistantData>): D9PageExternalDefsCreator => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		const assistantData = await askAssistantData(globalHandlers);

		return {
			codes: createDropdownOptionsProvider(globalHandlers, {
				report: assistantData.reportOptions,
				generateFileType: assistantData.generateFileTypeOptions
			}),
			'node-could-select': (option: DropdownTreeOption): boolean => {
				return asT<string>(option.value).endsWith('\nreport');
			},
			'load-settings': async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				// load data
				const root = rootModelRef.current;
				root.control.generating = true;
				const {generating} = root.control;
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.generating', generating, generating);
			},
			generate: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
			},
			cancel: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
			}
		};
	};
};
