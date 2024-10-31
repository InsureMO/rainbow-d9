import {DropdownOptions, DropdownTreeOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {asT} from '../../../utils';
import {PreloadedLazyPageWrapper, PreloadedPageProps, PreloaderFuncOptions} from '../../standard-widgets';
import {createReportTreeOptions, MockData} from '../shared';
import InitRootModel from './init-root.json';
import {AssistantData, RootModel} from './types';
import {markdown} from './ui-config.d9';

const ReportMaintainIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
	ui: async (_options: PreloaderFuncOptions): Promise<string> => {
		return markdown;
	},
	/** initialize root model */
	initRootModel: async (_options: PreloaderFuncOptions) => {
		// clone
		const rootModel: RootModel = JSON.parse(JSON.stringify(InitRootModel));
		return asT(rootModel);
	},
	/** run after root model initialized, to load submission channel */
	assistantData: async (_options: PreloaderFuncOptions & Pick<PreloadedPageProps, 'initRootModel'>) => {
		return async (_globalHandlers: GlobalHandlers) => {
			const reportTypeOptions: DropdownOptions = [
				{value: 'data', label: 'Report on Dataset'},
				{value: 'template', label: 'Report on Template'},
				{value: 'external', label: 'External Report'}
			];
			const reportStatusOptions: DropdownOptions = [
				{value: 'draft', label: 'Draft'},
				{value: 'submitted', label: 'Submitted'},
				{value: 'enabled', label: 'Enabled'},
				{value: 'disabled', label: 'Disabled'}
			];
			const reportOptions: DropdownTreeOptions = createReportTreeOptions(MockData.reports(), true);
			const externalAdapterOptions: DropdownOptions = [
				{value: 'jasper', label: 'Jasper'},
				{value: 'crystal', label: 'Crystal Report'}
			];
			const datasourceOptions: DropdownOptions = [
				{value: 'dm_agent_policy_detail', label: 'Agent Policy Detail'}
			];
			const criteriaDataTypeOptions: DropdownOptions = [
				{value: 'string', label: 'String'},
				{value: 'number', label: 'Number'},
				{value: 'boolean', label: 'Boolean'},
				{value: 'date', label: 'Date'},
				{value: 'codes', label: 'Code Table'}
			];
			const resultDataTypeOptions: DropdownOptions = [
				{value: 'string', label: 'String'},
				{value: 'number', label: 'Number'},
				{value: 'boolean', label: 'Boolean'},
				{value: 'date', label: 'Date'}
			];

			return {
				reportOptions, reportTypeOptions, reportStatusOptions,
				externalAdapterOptions,
				datasourceOptions, criteriaDataTypeOptions, resultDataTypeOptions
			};
		};
	}
});

const ReportMaintainPage: AppPage = {
	code: 'report-maintain',
	route: '/report/maintain',
	menuItemCode: 'report-maintain',
	breadcrumb: {
		title: 'Maintain Reports',
		locations: ['home.title', 'Report']
	},
	renderer: ReportMaintainIndex
};

// register
PageRegistrar.register(ReportMaintainPage);
