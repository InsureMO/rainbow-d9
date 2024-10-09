import {D9Page, PreloadedPageProps} from '../standard-widgets';
import {AssistantData} from './types';

export default (props: PreloadedPageProps<AssistantData>) => {
	const {ui: markdown, initRootModel, assistantData} = props;
	const externalDefs = assistantData?.externalDefs;

	return <D9Page ui={markdown!}
	               initRootModel={initRootModel} initRootModelAsIs={true}
	               externalDefs={externalDefs}/>;
};
