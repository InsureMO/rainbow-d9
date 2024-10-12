import {Page} from '../../../../services';

export interface Criteria {
	keywords?: string;
	policyNo?: string;
	insuredName?: string;
	idType?: string;
	idNo?: string;
	gender?: string;
}

export interface ResultItem {
	customerId: string;
	insuredName: string;
	gender: string;
	idType: string;
	idNo: string;
	dob: string;
	relatedPolicyNos?: Array<string>;
	ongoingClaimNos?: Array<string>;
}

export interface RootModel {
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