import {DropdownTreeOptions} from '@rainbow-d9/n2';

export interface ReportCriteria {
	fieldName?: string;
	displayName?: string;
	dataType?: 'date' | 'number' | 'string' | 'codes' | 'boolean';
	codesName?: string;
	required?: boolean;
}

export interface Criteria {
	reportCode?: string;
	defs?: Array<ReportCriteria>;
}

export interface Condition {
	reportCode?: string;
	fileType?: string;
	[key: string]: string | number | boolean | undefined;
}

export interface RootModel {
	control: {
		generating?: boolean;
	};
	criteria: Criteria;
	condition: Condition;
}

export interface AssistantData {
	reportOptions: DropdownTreeOptions;
	generateFileTypeOptions: DropdownTreeOptions;
}