import {Page} from '../../../../services';

export interface Criteria {
	policyNo?: string;
	caseNo?: string;
	registrationNo?: string;
	insuredName?: string;
}

export interface ResultItem {
	registrationId: string;
	caseNo: string;
	registrationNo: string;
	policyNo: string;
	insuredName: string;
	status: string;
}

export interface RootModel {
	control: {
		advancedSearchEnabled: boolean;
	};
	criteria: Criteria;
	results: Array<ResultItem>;
	page: Omit<Page<any>, 'data'>;
}