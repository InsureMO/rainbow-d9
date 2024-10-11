import {BaseModel, ObjectPropValue, PropValue, RootEventTypes, VUtils} from '@rainbow-d9/n1';
import {ButtonClickOptions, GlobalHandlers, PaginationData} from '@rainbow-d9/n2';
import {useRef} from 'react';
import {Page} from '../../../services';
import {createDropdownOptionsProvider, D9Page, DC} from '../../standard-widgets';
import {onEnterPressed} from '../../utils';
import InitRootModel from './init-root.json';
import {markdown} from './ui-config.d9';

interface Criteria {
	keywords?: string;
	policyNo?: string;
	insuredName?: string;
	idType?: string;
	idNo?: string;
	gender?: string;
}

interface ResultItem {
	customerId: string;
	insuredName: string;
	gender: string;
	idType: string;
	idNo: string;
	dob: string;
	relatedPolicyNos?: Array<string>;
	ongoingClaimNos?: Array<string>;
}

interface RootModel {
	control: {
		advancedSearchEnabled: boolean
	};
	criteria: Criteria;
	results: Array<ResultItem>;
	page: Omit<Page<any>, 'data'>;
	/** prepare for pagination */
	resultsCriteria?: Criteria;
	resultsUseKeywords?: boolean;
}

const baseItem = InitRootModel.results[0];
InitRootModel.results.length = 0;
const askMockData = async (pageNumber: number = 1, pageSize: number = 10) => {
	return new Promise<Page<ResultItem>>(resolve => {
		setTimeout(() => {
			resolve({
				pageNumber, pageSize, pageCount: 10, itemCount: 95,
				data: new Array(10).fill(1).map(() => ({...baseItem}))
			});
		}, 300);
	});
};
/**
 * this is a mock function
 */
const askInsuredListByKeywords = async (_keywords: string, pageNumber: number = 1, pageSize: number = 10): Promise<Page<ResultItem>> => {
	return await askMockData(pageNumber, pageSize);
};
const askInsuredList = async (_criteria: Omit<Criteria, 'keywords'>, pageNumber: number = 1, pageSize: number = 10): Promise<Page<ResultItem>> => {
	return await askMockData(pageNumber, pageSize);
};

export default () => {
	// build a ref to keep the root model
	const rootModelRef = useRef<RootModel>(JSON.parse(JSON.stringify(InitRootModel)));
	const externalDefs = async (globalHandlers: GlobalHandlers) => {
		return {
			codes: createDropdownOptionsProvider(globalHandlers),
			keywords: {
				keyup: onEnterPressed(async (value?: string) => {
					if (VUtils.isBlank(value) || value!.trim().length < 3) {
						return;
					}
					const root = rootModelRef.current;
					const {keywords} = root.criteria;
					const {
						data, ...page
					} = await (DC.with(globalHandlers).use(async () => await askInsuredListByKeywords(keywords ?? '')).ask());
					root.results = data;
					root.page = page;
					root.resultsCriteria = {keywords};
					root.resultsUseKeywords = true;
					// notify
					globalHandlers.root!.fire(RootEventTypes.VALUE_CHANGED, '/results', root.results as unknown as PropValue, root.results as unknown as PropValue);
				})
			},
			advancedSearch: {
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					const root = options.root as unknown as RootModel;
					const enabled = root.control.advancedSearchEnabled;
					root.control.advancedSearchEnabled = !enabled;
					// notify
					options.global.root!.fire(RootEventTypes.VALUE_CHANGED, '/control.advancedSearchEnabled', enabled, !enabled);
				}
			},
			search: {
				click: async (options: ButtonClickOptions<BaseModel, PropValue>) => {
					// do search
					const root = options.root as unknown as RootModel;
					const {keywords, ...criteria} = root.criteria;
					const {
						data, ...page
					} = await (DC.with(globalHandlers).use(async () => await askInsuredList(criteria)).ask());
					root.results = data;
					root.page = page;
					root.resultsCriteria = criteria;
					root.resultsUseKeywords = false;
					// notify
					options.global.root!.fire(RootEventTypes.VALUE_CHANGED, '/results', root.results as unknown as PropValue, root.results as unknown as PropValue);
				}
			},
			reset: {
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
				click: async (_options: ButtonClickOptions<BaseModel, PropValue>) => {
					// do register
				}
			},
			onPageChanged: async (options: { newValue: PaginationData }) => {
				// table data will be refreshed after this function executed, no need to notify manually
				const {newValue: {pageNumber, pageSize}} = options;
				const root = rootModelRef.current;
				// use the criteria which used to search for current round, not the current values from ui
				const {keywords, ...criteria} = root.resultsCriteria ?? root.criteria;
				let result: Page<ResultItem>;
				if (root.resultsUseKeywords) {
					result = await (DC.with(globalHandlers).use(async () => await askInsuredListByKeywords(keywords ?? '', pageNumber, pageSize)).ask());
				} else {
					result = await (DC.with(globalHandlers).use(async () => await askInsuredList(criteria, pageNumber, pageSize)).ask());
				}
				const {data, ...page} = result;
				root.results = data;
				root.page = page;
			}
		};
	};

	return <D9Page ui={markdown}
	               initRootModel={rootModelRef.current as unknown as ObjectPropValue} initRootModelAsIs={true}
	               externalDefs={externalDefs}/>;
};
