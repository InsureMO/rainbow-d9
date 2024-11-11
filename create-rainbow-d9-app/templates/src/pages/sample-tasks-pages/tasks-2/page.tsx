import {GlobalHandlers} from '@rainbow-d9/n2';
import {D9Page, PreloadedPageProps} from '../../../page-widgets';
import {AssistantData} from './types';

export default (props: PreloadedPageProps<AssistantData>) => {
	const {ui: markdown, initRootModel, assistantData: askAssistantData} = props;

	// build an external defs creator function
	const externalDefs = askAssistantData == null
		? (void 0)
		: async (globalHandlers: GlobalHandlers) => (await askAssistantData(globalHandlers)).externalDefs;

	return <D9Page ui={markdown!}
	               initRootModel={initRootModel} initRootModelAsIs={true}
	               externalDefs={externalDefs}/>;
};
