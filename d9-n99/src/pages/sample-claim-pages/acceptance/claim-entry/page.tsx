import {ObjectPropValue} from '@rainbow-d9/n1';
import {useRef} from 'react';
import {D9Page, PreloadedPageProps} from '../../../standard-widgets';
import {createExternalDefsCreator} from './external-defs';
import {AssistantData, RootModel} from './types';

export default (props: PreloadedPageProps<AssistantData>) => {
	const markdown = props.ui!;
	const initRootModel = props.initRootModel as unknown as RootModel;
	const askAssistantData = props.assistantData!;

	// build a ref to keep the root model
	const rootModelRef = useRef<RootModel>(initRootModel);
	const externalDefs = createExternalDefsCreator(rootModelRef, askAssistantData);

	return <D9Page ui={markdown}
	               initRootModel={rootModelRef.current as unknown as ObjectPropValue} initRootModelAsIs={true}
	               externalDefs={externalDefs}/>;
};
