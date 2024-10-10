import {DropdownOptionsProvider} from '../../standard-widgets';

export type CodesNames = 'taskCategories' | 'taskPriorities';
export type AssistantData = {
	externalDefs: {
		codes: DropdownOptionsProvider<CodesNames>;
	};
}
