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
import {MockData} from '../shared';
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
				const selectedReportCode = (root.criteria.reportCode ?? '').replace('\nreport', '');
				root.condition = {
					reportCode: selectedReportCode,
					fileType: 'csv'
				};
				root.criteria.defs = asT(MockData.askReportCriteria(selectedReportCode));
				const {generating} = root.control;
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.generating', generating, generating);
			},
			generate: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				await globalHandlers.alert.show('Generate button clicked');
			},
			cancel: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				try {
					await globalHandlers.yesNoDialog.show('Are you sure to cancel the generating?');
					const root = rootModelRef.current;
					root.control.generating = false;
					root.condition = {};
					delete root.criteria.defs;
					const {generating} = root.control;
					globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.generating', generating, generating);
				} finally {
					globalHandlers.yesNoDialog.hide();
				}
			}
		};
	};
};
