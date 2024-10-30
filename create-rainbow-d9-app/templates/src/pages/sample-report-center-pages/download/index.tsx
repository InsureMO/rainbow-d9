import {DropdownOptions, DropdownTreeOptions, GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import {asT} from '../../../utils';
import {PreloadedLazyPageWrapper, PreloadedPageProps, PreloaderFuncOptions} from '../../standard-widgets';
import {createReportTreeOptions} from '../shared';
import InitRootModel from './init-root.json';
import {AssistantData, RootModel} from './types';
import {markdown} from './ui-config.d9';

const ReportDownloadIndex = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
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
			const statusOptions: DropdownOptions = [
				{value: 'submitted', label: 'Submitted'},
				{value: 'progress', label: 'In Progress'},
				{value: 'completed', label: 'Completed'},
				{value: 'failed', label: 'Failed'}
			];
			const reportOptions: DropdownTreeOptions = createReportTreeOptions([
				{
					value: 'nb', label: 'New Business', children: []
				},
				{value: 'uw', label: 'Underwriting', children: []},
				{value: 'cs', label: 'Customer Service', children: []},
				{value: 'claim', label: 'Claim', children: []},
				{
					value: 'fn', label: 'Finance', children: [
						{value: 'tbr', label: 'Trail Balance Report'},
						{value: 'glr', label: 'General Ledger Report'}
					]
				},
				{
					value: 'ri', label: 'Reinsurance', children: [
						{value: 'rpb', label: 'RI Premium Bordereaux'},
						{value: 'rcb', label: 'RI Claim Bordereaux'}
					]
				},
				{value: 'sc', label: 'Sales Channel', children: []}
			]);

			return {statusOptions, reportOptions};
		};
	}
});

const ReportDownloadPage: AppPage = {
	code: 'report-download',
	route: '/report/download',
	menuItemCode: 'report-download',
	breadcrumb: {
		title: 'Download',
		locations: ['home.title', 'Report']
	},
	renderer: ReportDownloadIndex
};

// register
PageRegistrar.register(ReportDownloadPage);
