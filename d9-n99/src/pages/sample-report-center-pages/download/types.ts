import {DropdownOptions, DropdownTreeOptions} from '@rainbow-d9/n2';
import {Page} from '../../../services';

export interface Criteria {
	category1?: string;
	category2?: string;
	category3?: string;
	reportCode?: string;
	submittedBy?: string;
}

export interface ResultItem {
	generateId?: string;
	submittedBy?: string;
	submittedAt?: string;
	status?: string;
	generatedAt?: string;
	criteria?: Record<string, string | number | boolean>;
}

export interface RootModel {
	control: {};
	criteria: Criteria;
	results: Array<ResultItem>;
	page: Omit<Page<any>, 'data'>;
}

export interface AssistantData {
	reportOptions: DropdownTreeOptions;
	statusOptions: DropdownOptions;
}