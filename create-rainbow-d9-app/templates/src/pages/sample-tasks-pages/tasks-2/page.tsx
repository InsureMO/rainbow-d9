import {GlobalHandlers} from '@rainbow-d9/n2';
import {D9Page, PreloadedPageProps} from '../../standard-widgets';
import {AssistantData} from './types';

export default (props: PreloadedPageProps<AssistantData>) => {
	const {ui: markdown, initRootModel, assistantData: askAssistantData} = props;

	// make sure the assistant data retriever is called only once
	let assistantData: AssistantData;
	const doAskAssistantData = async (globalHandlers: GlobalHandlers) => {
		if (assistantData == null || askAssistantData != null) {
			assistantData = await askAssistantData!(globalHandlers);
		}
	};
	// build an external defs creator function
	const externalDefs = askAssistantData == null
		? (void 0)
		: async (globalHandlers: GlobalHandlers) => {
			await doAskAssistantData(globalHandlers);
			const {externalDefs} = assistantData;
			return externalDefs;
		};

	return <D9Page ui={markdown!}
	               initRootModel={initRootModel} initRootModelAsIs={true}
	               externalDefs={externalDefs}/>;
};
