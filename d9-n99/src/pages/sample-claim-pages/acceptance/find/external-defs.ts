import {BaseModel, PropValue, RootEventTypes} from '@rainbow-d9/n1';
import {ButtonClickOptions, PaginationData} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {Page} from '../../../../services';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreator,
	D9PageExternalDefsCreatorOptions,
	DC
} from '../../../standard-widgets';
import {askRegistrationList, saveRegistrationData} from './services';
import {ResultItem, RootModel} from './types';

export const createExternalDefsCreator = (rootModelRef: MutableRefObject<any>): D9PageExternalDefsCreator => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		return {
			codes: createDropdownOptionsProvider(globalHandlers),
			search: {
				// click the search button of advanced search section
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					const root = options.root as unknown as RootModel;
					const criteria = root.criteria;
					const {
						data, ...page
					} = await DC.with(globalHandlers).use(async () => await askRegistrationList(criteria)).ask();
					root.results = data;
					root.page = page;
					// notify
					options.global.root!.fire(RootEventTypes.VALUE_CHANGED, '/results', root.results as unknown as PropValue, root.results as unknown as PropValue);
				}
			},
			reset: {
				// click the reset button of advanced search section
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					const model = options.model as unknown as RootModel['criteria'];
					const old = {...model} as PropValue;
					delete model.policyNo;
					delete model.caseNo;
					delete model.registrationNo;
					delete model.insuredName;
					// notify
					options.global.root!.fire(RootEventTypes.VALUE_CHANGED, '/criteria', old, model as PropValue);
				}
			},
			'work-on': {
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					// capture the data, save to session storage
					const item = options.model as unknown as ResultItem;
					const key = await saveRegistrationData(item.registrationId);
					globalHandlers.navigate.to(`/claim/acceptance/claim-entry/${key}`);
				}
			},
			// key of element for rendering, use static key based on index to avoid flickering
			getElementKey: (_element: ResultItem, index: number) => `item-${index}`,
			// handle pagination
			onPageChanged: async (options: { newValue: PaginationData }) => {
				// table data will be refreshed after this function executed, no need to notify manually
				const {newValue: {pageNumber, pageSize}} = options;
				const root = rootModelRef.current;
				// use the criteria which used to search for current round, not the current values from ui
				const {keywords, ...criteria} = root.resultsCriteria ?? root.criteria;
				let result: Page<ResultItem> = await DC.with(globalHandlers).use(async () => await askRegistrationList(criteria, pageNumber, pageSize)).ask();
				const {data, ...page} = result;
				root.results = data;
				root.page = page;
			}
		};
	};
};
