import {DropdownOptions, DropdownTreeOptions} from '@rainbow-d9/n2';

export interface Criteria {
	category1?: string;
	category2?: string;
	category3?: string;
	reportCode?: string;
	selected?: string;
}

export interface ReportCategory {
	code?: string;
	name?: string;
	category1?: string;
	category2?: string;
	description?: string;
}

export interface ReportCriteria {
	fieldName?: string;
	displayName?: string;
	dataType?: 'date' | 'number' | 'string' | 'codes' | 'boolean';
	codesName?: string;
	required?: boolean;
}

export interface ReportColumn {
	selected?: boolean;
	dataType?: 'date' | 'number' | 'string' | 'boolean';
	sourceFieldName?: string;
	targetFieldName?: string;
	displayName?: string;
	// could be date format, numeric format, depends on type
	format?: string;
	order?: number;
}

export interface Report {
	code?: string;
	name?: string;
	type?: 'data' | 'template' | 'external';
	/** could be triggered manually, in report generate, or somewhere else */
	allowManuallyTrigger?: boolean;
	/** could be triggered by cron expression */
	triggerCronExpression?: string;
	category1?: string;
	category2?: string;
	category3?: string;
	status?: 'draft' | 'submitted' | 'enabled' | 'disabled';
	dataSourceCode?: string;
	criteria?: Array<ReportCriteria>;
	result?: Array<ReportColumn>;
	templateId?: string;
	templateName?: string;
	/** role or user, joined by comma */
	grantTo?: string;
	description?: string;
}

export interface RootModel {
	control: {
		allowToEdit: boolean;
		allowToCreateSubFolder: boolean;
		allowToCreateReport: boolean;
		editing?: boolean;
		editType?: 'new-folder' | 'edit-folder' | 'new-report' | 'edit-report'
	};
	criteria: Criteria;
	data?: ReportCategory | Report;
}

export interface AssistantData {
	reportOptions: DropdownTreeOptions;
	reportTypeOptions: DropdownOptions;
	reportStatusOptions: DropdownOptions;
	datasourceOptions: DropdownOptions;
	criteriaDataTypeOptions: DropdownOptions;
	resultDataTypeOptions: DropdownOptions;
}