import {useRef} from 'react';
import {asT} from '../../../utils';
import {D9Page, PreloadedPageProps} from '../../standard-widgets';
import {createExternalDefsCreator} from './external-defs';
import {AssistantData, RootModel} from './types';

export default (props: PreloadedPageProps<AssistantData>) => {
	const markdown = props.ui!;
	const initRootModel: RootModel = asT(props.initRootModel);
	const askAssistantData = props.assistantData!;
	const manufactureParsedUI = props.manufactureParsedUI;

	// build a ref to keep the root model
	const rootModelRef = useRef<RootModel>(initRootModel);
	const externalDefs = createExternalDefsCreator(rootModelRef, askAssistantData);

	return <D9Page ui={markdown}
	               manufactureParsedUI={manufactureParsedUI}
	               initRootModel={asT(rootModelRef.current)} initRootModelAsIs={false}
	               externalDefs={externalDefs}/>;
};
