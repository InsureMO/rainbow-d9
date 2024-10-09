import {createDropdownOptionsProvider, D9Page} from '../standard-widgets';
import InitRootModel from './init-root.json';
import {markdown} from './ui-config.d9';

type CodesNames = 'taskCategories' | 'taskPriorities';

export default () => {
	const externalDefs = {
		codes: createDropdownOptionsProvider<CodesNames>({
			taskCategories: [
				{label: 'Policy', value: 'policy'},
				{label: 'Claim', value: 'claim'}
			],
			taskPriorities: [
				{label: 'High', value: 'high'},
				{label: 'Medium', value: 'medium'},
				{label: 'Low', value: 'low'}
			]
		})
	};

	return <D9Page ui={markdown}
	               initRootModel={InitRootModel} initRootModelAsIs={false}
	               externalDefs={externalDefs}/>;
};
