import {DropdownTreeOptions} from '@rainbow-d9/n2';

export interface Criteria {
	reportCode?: string;
}

export interface RootModel {
	control: {
		generating?: boolean;
	};
	criteria: Criteria;
}

export interface AssistantData {
	reportOptions: DropdownTreeOptions;
	generateFileTypeOptions: DropdownTreeOptions;
}