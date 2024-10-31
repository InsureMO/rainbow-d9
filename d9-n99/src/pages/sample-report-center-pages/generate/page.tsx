import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {useRef} from 'react';
import styled from 'styled-components';
import {asT} from '../../../utils';
import {D9Page, PreloadedPageProps} from '../../standard-widgets';
import {createExternalDefsCreator} from './external-defs';
import {AssistantData, RootModel} from './types';

// noinspection CssUnresolvedCustomProperty
const LayoutController = styled.div.attrs({[DOM_KEY_WIDGET]: 'report-download-layout-controller'})`
    display: none;
    position: relative;

    ~ div[data-w=page-standard-wrapper] {
        span[data-role=ancestor]:not(:last-child) {
            display: inline-block;
        }
    }
`;

export default (props: PreloadedPageProps<AssistantData>) => {
	const markdown = props.ui!;
	const manufacturerParsedUI = props.manufactureParsedUI;
	const initRootModel: RootModel = asT(props.initRootModel);
	const askAssistantData = props.assistantData!;
	// build a ref to keep the root model
	const rootModelRef = useRef<RootModel>(initRootModel);
	const externalDefs = createExternalDefsCreator(rootModelRef, askAssistantData);

	return <>
		<LayoutController/>
		<D9Page ui={markdown} manufactureParsedUI={manufacturerParsedUI}
		        initRootModel={asT(rootModelRef.current)} initRootModelAsIs={true}
		        externalDefs={externalDefs}/>
	</>;
};
