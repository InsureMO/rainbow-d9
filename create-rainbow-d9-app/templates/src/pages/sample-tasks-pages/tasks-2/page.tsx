import {D9Page, D9PageExternalDefsCreatorGlobalEventBus, PreloadedPageProps} from '../../standard-widgets';
import {AssistantData} from './types';

export default (props: PreloadedPageProps<AssistantData>) => {
	const {ui: markdown, initRootModel, assistantData: askAssistantData} = props;

	// make sure the assistant data retriever is called only once
	let assistantData: AssistantData;
	const doAskAssistantData = async (global: D9PageExternalDefsCreatorGlobalEventBus) => {
		if (assistantData == null || askAssistantData != null) {
			assistantData = await askAssistantData!(global);
		}
	};
	// build an external defs creator function
	const externalDefs = askAssistantData == null
		? (void 0)
		: async (global: D9PageExternalDefsCreatorGlobalEventBus) => {
			await doAskAssistantData(global);
			const {externalDefs} = assistantData;
			return externalDefs;
		};

	return <D9Page ui={markdown!}
	               initRootModel={initRootModel} initRootModelAsIs={true}
	               externalDefs={externalDefs}/>;
};
