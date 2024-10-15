import {BaseModel, PropValue, RootEventTypes} from '@rainbow-d9/n1';
import {ButtonClickOptions, PaginationData} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {Page} from '../../../../services';
import {asT} from '../../../../utils';
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
					const root: RootModel = asT(options.root);
					const criteria = root.criteria;
					const {
						data, ...page
					} = await DC.with(globalHandlers).use(async () => await askRegistrationList(criteria)).ask();
					root.results = data;
					root.page = page;
					// notify
					options.global.root!.fire(RootEventTypes.VALUE_CHANGED, '/results', asT(root.results), asT(root.results));
				}
			},
			reset: {
				// click the reset button of advanced search section
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					const model: RootModel['criteria'] = asT(options.model);
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
					const item: ResultItem = asT(options.model);
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
