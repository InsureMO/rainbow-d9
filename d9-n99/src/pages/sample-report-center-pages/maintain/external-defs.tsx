import {BaseModel, PropValue, RootEventTypes, VUtils} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
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
				status: assistantData.statusOptions,
				report: assistantData.reportOptions
			}),
			'report-code-changed': async (options: { newValue: string }) => {
				const {newValue} = options;
				const root = rootModelRef.current;
				if (VUtils.isBlank(newValue)) {
					// no value selected
					root.control.allowToCreateReport = false;
					root.control.allowToCreateSubFolder = false;
					root.control.allowToEdit = false;
				} else if (newValue.endsWith('\nreport')) {
					// a report selected
					root.control.allowToCreateReport = false;
					root.control.allowToCreateSubFolder = false;
					root.control.allowToEdit = true;
				} else if (newValue.split('\t').length === 3) {
					// 3rd level category selected
					root.control.allowToCreateReport = true;
					root.control.allowToCreateSubFolder = false;
					root.control.allowToEdit = true;
				} else {
					// 1st or 2nd level category selected
					root.control.allowToCreateReport = true;
					root.control.allowToCreateSubFolder = true;
					root.control.allowToEdit = true;
				}
				console.log(newValue, root.control);
				const {allowToEdit, allowToCreateReport, allowToCreateSubFolder} = root.control;
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.allowToEdit', allowToEdit, allowToEdit);
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.allowToCreateReport', allowToCreateReport, allowToCreateReport);
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.allowToCreateSubFolder', allowToCreateSubFolder, allowToCreateSubFolder);
			},
			edit: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
			},
			'create-sub-folder': async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
			},
			'create-report': async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
			}
		};
	};
};
