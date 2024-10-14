import {BaseModel, PropValue, RootEventTypes, VUtils} from '@rainbow-d9/n1';
import {ButtonClickOptions, PaginationData} from '@rainbow-d9/n2';
import {MutableRefObject} from 'react';
import {Page} from '../../../../services';
import {
	createDropdownOptionsProvider,
	D9PageExternalDefsCreator,
	D9PageExternalDefsCreatorOptions,
	DC
} from '../../../standard-widgets';
import {onEnterPressed} from '../../../utils';
import {wrapResults} from './results-wrapper';
import {askInsuredList, askInsuredListByKeywords, saveRegistrationData} from './services';
import {ResultItem, RootModel} from './types';

export type RegisterAction = (data: Omit<ResultItem, 'relatedPolicyNos' | 'ongoingClaimNos'>, globalHandlers: D9PageExternalDefsCreatorOptions) => Promise<void>;

export const createExternalDefsCreator = (rootModelRef: MutableRefObject<any>, register?: RegisterAction): D9PageExternalDefsCreator => {
	return async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		return {
			codes: createDropdownOptionsProvider(globalHandlers),
			keywords: {
				// keywords enter to trigger search
				keyup: onEnterPressed(async (value?: string) => {
					if (VUtils.isBlank(value) || value!.trim().length < 3) {
						return;
					}
					const root = rootModelRef.current;
					const {keywords} = root.criteria;
					const {
						data, ...page
					} = await DC.with(globalHandlers).use(async () => await askInsuredListByKeywords(keywords ?? '')).ask();
					root.results = wrapResults(data);
					root.page = page;
					root.resultsCriteria = {keywords};
					root.resultsUseKeywords = true;
					// notify
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/results', root.results as unknown as PropValue, root.results as unknown as PropValue);
				})
			},
			advancedSearch: {
				// advance search link click, to show/hide the advanced search section
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					const root = options.root as unknown as RootModel;
					const enabled = root.control.advancedSearchEnabled;
					root.control.advancedSearchEnabled = !enabled;
					// notify
					options.global.root!.fire(RootEventTypes.VALUE_CHANGED, '/control.advancedSearchEnabled', enabled, !enabled);
				}
			},
			search: {
				// click the search button of advanced search section
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					const root = options.root as unknown as RootModel;
					const {keywords, ...criteria} = root.criteria;
					const {
						data, ...page
					} = await DC.with(globalHandlers).use(async () => await askInsuredList(criteria)).ask();
					root.results = wrapResults(data);
					root.page = page;
					root.resultsCriteria = criteria;
					root.resultsUseKeywords = false;
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
					delete model.insuredName;
					delete model.idType;
					delete model.idNo;
					delete model.gender;
					// notify
					options.global.root!.fire(RootEventTypes.VALUE_CHANGED, '/criteria', old, model as PropValue);
				}
			},
			register: {
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					// capture the data, save to session storage
					const item = options.model as unknown as ResultItem;
					const {relatedPolicyNos, ongoingClaimNos, ...data} = item;
					if (register != null) {
						// use given one
						await register(data, globalHandlers);
					} else {
						const key = await saveRegistrationData(data);
						globalHandlers.navigate.to(`/claim/registration/create/${key}`);
					}
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
				let result: Page<ResultItem>;
				if (root.resultsUseKeywords) {
					result = await DC.with(globalHandlers).use(async () => await askInsuredListByKeywords(keywords ?? '', pageNumber, pageSize)).ask();
				} else {
					result = await DC.with(globalHandlers).use(async () => await askInsuredList(criteria, pageNumber, pageSize)).ask();
				}
				const {data, ...page} = result;
				root.results = wrapResults(data);
				root.page = page;
			}
		};
	};
};
