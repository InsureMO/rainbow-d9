import {createDropdownOptionsProvider, D9Page, D9PageExternalDefsCreatorOptions} from '../../standard-widgets';
import InitRootModel from './init-root.json';
import {markdown} from './ui-config.d9';

type CodesNames = 'taskCategories' | 'taskPriorities';

export default () => {
	const externalDefs = async (globalHandlers: D9PageExternalDefsCreatorOptions) => {
		return {
			codes: createDropdownOptionsProvider<CodesNames>(globalHandlers)
		};
	};

	return <D9Page ui={markdown}
	               initRootModel={InitRootModel} initRootModelAsIs={false}
	               externalDefs={externalDefs}/>;
};
