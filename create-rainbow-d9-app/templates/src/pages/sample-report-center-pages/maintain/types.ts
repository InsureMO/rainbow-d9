import {DropdownOptions, DropdownTreeOptions} from '@rainbow-d9/n2';

export interface Criteria {
	category1?: string;
	category2?: string;
	category3?: string;
	reportCode?: string;
}

export interface ReportCategory {
	code?: string;
	name?: string;
	category1?: string;
	category2?: string;
	description?: string;
}

export interface ReportCriteria {
	name?: string;
	type?: 'date' | 'number' | 'string' | 'codes' | 'boolean';
	codesName?: string;
	required?: boolean;
}

export interface ReportColumn {
	type?: 'date' | 'number' | 'string' | 'boolean';
	sourceFieldName?: string;
	targetFieldName?: string;
	// could be date format, numeric format, depends on type
	format?: string;
}

export interface Report {
	code?: string;
	name?: string;
	type?: 'data' | 'template' | 'external';
	/** could be triggered manually, in report generate, or somewhere else */
	allowManuallyTrigger?: boolean;
	category1?: string;
	category2?: string;
	category3?: string;
	status?: 'draft' | 'enabled' | 'disabled';
	sourceType?: 'dataset' | 'topic' | 'external';
	sourceKey?: string;
	criteria?: Array<ReportCriteria>;
	columns?: Array<ReportColumn>;
	templateId?: string;
	/** role or user, joined by comma */
	grantTo?: string;
	description?: string;
}

export interface RootModel {
	control: {
		allowToEdit: boolean;
		allowToCreateSubFolder: boolean;
		allowToCreateReport: boolean;
	};
	criteria: Criteria;
	data?: ReportCategory | Report;
}

export interface AssistantData {
	reportOptions: DropdownTreeOptions;
	statusOptions: DropdownOptions;
}