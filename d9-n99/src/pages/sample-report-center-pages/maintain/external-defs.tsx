import {BaseModel, PropValue, RootEventTypes, VUtils} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {asT} from '../../../utils';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreator,
	D9PageExternalDefsCreatorOptions,
	validatePage
} from '../../standard-widgets';
import {MockData} from '../shared';
import {AssistantData, Report, ReportColumn, RootModel} from './types';

export const createExternalDefsCreator = (
	rootModelRef: MutableRefObject<RootModel>, askAssistantData: (globalHandlers: GlobalHandlers) => Promise<AssistantData>): D9PageExternalDefsCreator => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		const assistantData = await askAssistantData(globalHandlers);

		return {
			codes: createDropdownOptionsProvider(globalHandlers, {
				report: assistantData.reportOptions,
				reportType: assistantData.reportTypeOptions,
				reportStatus: assistantData.reportStatusOptions,
				externalAdapter: assistantData.externalAdapterOptions,
				datasource: assistantData.datasourceOptions,
				criteriaDataType: assistantData.criteriaDataTypeOptions,
				resultDataType: assistantData.resultDataTypeOptions
			}),
			'report-code-changed': async (options: { newValue: string }) => {
				const {newValue} = options;
				const root = rootModelRef.current;
				switch (true) {
					// no value selected
					case VUtils.isBlank(newValue): {
						// no value selected
						root.control.allowToCreateReport = false;
						root.control.allowToCreateSubFolder = false;
						root.control.allowToEdit = false;
						delete root.criteria.category1;
						delete root.criteria.category2;
						delete root.criteria.category3;
						delete root.criteria.reportCode;
						break;
					}
					// a report selected
					case newValue.endsWith('\nreport'): {
						// a report selected
						root.control.allowToCreateReport = false;
						root.control.allowToCreateSubFolder = false;
						root.control.allowToEdit = true;
						const codes = newValue.replace('\nreport', '').split('\t');
						root.criteria.category1 = codes[0];
						if (codes.length > 2) {
							root.criteria.category2 = codes[1];
						}
						if (codes.length > 3) {
							root.criteria.category3 = codes[2];
						}
						root.criteria.reportCode = codes[codes.length - 1];
						break;
					}
					// 3rd level category selected
					case newValue.split('\t').length === 3: {
						root.control.allowToCreateReport = true;
						root.control.allowToCreateSubFolder = false;
						root.control.allowToEdit = true;
						const codes = newValue.split('\t');
						root.criteria.category1 = codes[0];
						if (codes.length > 1) {
							root.criteria.category2 = codes[1];
						}
						if (codes.length > 2) {
							root.criteria.category3 = codes[2];
						}
						delete root.criteria.reportCode;
						break;
					}
					// 1st or 2nd level category selected
					default: {
						root.control.allowToCreateReport = true;
						root.control.allowToCreateSubFolder = true;
						root.control.allowToEdit = true;
						const codes = newValue.split('\t');
						root.criteria.category1 = codes[0];
						if (codes.length > 1) {
							root.criteria.category2 = codes[1];
						}
						delete root.criteria.category3;
						delete root.criteria.reportCode;
					}
				}
				const {allowToEdit, allowToCreateReport, allowToCreateSubFolder} = root.control;
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.allowToEdit', allowToEdit, allowToEdit);
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.allowToCreateReport', allowToCreateReport, allowToCreateReport);
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.allowToCreateSubFolder', allowToCreateSubFolder, allowToCreateSubFolder);
			},
			edit: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				// TODO ask selected data
				const root = rootModelRef.current;
				root.control.editing = true;
				if (VUtils.isNotBlank(root.criteria.reportCode)) {
					root.control.editType = 'edit-report';
					root.data = {
						code: root.criteria.reportCode,
						type: 'data',
						status: MockData.statusOfReport(root.criteria.reportCode!),
						templateName: 'some-template.xlsx',
						allowManuallyTrigger: false
					};
				} else {
					root.control.editType = 'edit-folder';
					root.data = {code: root.criteria.category3 ?? root.criteria.category2 ?? root.criteria.category1};
				}
				const {editing, editType} = root.control;
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.editType', editType, editType);
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.editing', editing, editing);
			},
			'create-sub-folder': async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				const root = rootModelRef.current;
				root.data = {};
				root.control.editing = true;
				root.control.editType = 'new-folder';
				const {editing, editType} = root.control;
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.editType', editType, editType);
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.editing', editing, editing);
			},
			'create-report': async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				const root = rootModelRef.current;
				root.data = {type: 'data', status: 'draft'};
				root.control.editing = true;
				root.control.editType = 'new-report';
				const {editing, editType} = root.control;
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.editType', editType, editType);
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.editing', editing, editing);
			},
			'upload-template': async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				await globalHandlers.alert.show('Upload template file button clicked.');
			},
			'load-data-source': async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				const root = rootModelRef.current;
				const data = asT<Report>(root.data);
				data.result = asT(MockData.askMockReportColumns());
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/data.result', asT(data.result), asT(data.result));
			},
			'copy-to-criteria': async (options: ButtonClickOptions<BaseModel, PropValue>) => {
				const root = rootModelRef.current;
				const data = asT<Report>(root.data);
				const model = asT<ReportColumn>(options.model);
				data.criteria = [...(data.criteria ?? []), {
					fieldName: model.sourceFieldName,
					displayName: model.displayName,
					dataType: model.dataType
				}];
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/data.criteria', asT(data.criteria), asT(data.criteria));
			},
			'remove-from-criteria': async (options: ButtonClickOptions<BaseModel, PropValue>) => {
				const root = rootModelRef.current;
				const data = asT<Report>(root.data);
				const model = asT<ReportColumn>(options.model);
				const index = data.criteria!.indexOf(model);
				data.criteria!.splice(index, 1);
				globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/data.criteria', asT(data.criteria), asT(data.criteria));
			},
			cancel: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				try {
					await globalHandlers.yesNoDialog.show('Are you sure you want to confirm the abandonment of the modification? All data will be lost.');
					const root = rootModelRef.current;
					root.data = {};
					root.control.editing = false;
					delete root.control.editType;
					globalHandlers.root.fire(RootEventTypes.VALUE_CHANGED, '/control.editing', false, false);
				} finally {
					globalHandlers.yesNoDialog.hide();
				}
			},
			save: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				// try catch
				try {
					await validatePage({globalHandlers});
					alert('Pass the validation.');
				} catch {
					// ignore
				}
			},
			submit: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				await globalHandlers.alert.show('Submit button clicked.');
			},
			publish: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				await globalHandlers.alert.show('Publish button clicked.');
			},
			unpublish: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
				await globalHandlers.alert.show('Unpublish button clicked.');
			}
		};
	};
};
