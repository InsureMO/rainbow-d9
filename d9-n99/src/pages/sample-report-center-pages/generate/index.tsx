import {DropdownTreeOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {asT} from '../../../utils';
import {PreloadedLazyPageWrapper, PreloadedPageProps, PreloaderFuncOptions} from '../../standard-widgets';
import {createReportTreeOptions, MockData} from '../shared';
import InitRootModel from './init-root.json';
import {AssistantData, RootModel} from './types';
import {markdown} from './ui-config.d9';

const ReportGenerateIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
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
			const reportOptions: DropdownTreeOptions = createReportTreeOptions(MockData.reports(true));
			const generateFileTypeOptions: DropdownTreeOptions = [
				{value: 'csv', label: 'CSV'},
				{value: 'edi', label: 'EDI'},
				{value: 'plain-excel', label: 'Plain Excel'},
				{value: 'template', label: 'Follow Template File'}
			];
			return {reportOptions, generateFileTypeOptions};
		};
	}
});

const ReportGeneratePage: AppPage = {
	code: 'report-generate',
	route: '/report/generate',
	menuItemCode: 'report-generate',
	breadcrumb: {
		title: 'Generate Report',
		locations: ['home.title', 'Report']
	},
	renderer: ReportGenerateIndex
};

// register
PageRegistrar.register(ReportGeneratePage);
