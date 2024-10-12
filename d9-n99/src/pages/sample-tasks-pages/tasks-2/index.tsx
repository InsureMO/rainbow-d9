import {GlobalHandlers} from '@rainbow-d9/n2';
import {lazy} from 'react';
import {AppPage, PageRegistrar} from '../../../global-settings';
import './intl-labels';
import {registerMockCodeTables} from '../../../mock-services';
import {createDropdownOptionsProvider, PreloadedLazyPageWrapper} from '../../standard-widgets';
import InitRootModel from './init-root.json';
import {AssistantData, CodesNames} from './types';
import {markdown} from './ui-config.d9';

// register mock code tables, it is shared by whole application
registerMockCodeTables({
	taskCategories: [
		{label: 'Policy', value: 'policy'},
		{label: 'Claim', value: 'claim'}
	],
	taskPriorities: [
		{label: 'High', value: 'high'},
		{label: 'Medium', value: 'medium'},
		{label: 'Low', value: 'low'}
	]
});

const Tasks2Index = PreloadedLazyPageWrapper<AssistantData>(lazy(() => import('./page')), {
	useLocation: true,
	usePathParams: false,
	useSearchParams: false,
	// use local importing, but wrapped by an async function
	ui: async () => markdown,
	initRootModel: async () => JSON.parse(JSON.stringify(InitRootModel)),
	assistantData: async () => {
		return async (globalHandlers: GlobalHandlers) => {
			return {
				// no static provider, use mock code tables
				externalDefs: {codes: createDropdownOptionsProvider<CodesNames>(globalHandlers)}
			};
		};
	}
	// orderBy: [['ui', 'initRootModel', 'assistantData']]
});

const Tasks2Page: AppPage = {
	code: 'tasks-2',
	route: '/tasks-2',
	menuItemCode: 'tasks-2',
	breadcrumb: {
		title: 'tasks-2.title',
		locations: ['home.title', 'tasks.title']
	},
	renderer: Tasks2Index
};

// register
PageRegistrar.register(Tasks2Page);
