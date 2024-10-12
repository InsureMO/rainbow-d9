import {ObjectPropValue} from '@rainbow-d9/n1';
import {useRef} from 'react';
import {D9Page, PreloadedPageProps} from '../../../standard-widgets';
import {createExternalDefsCreator} from './external-defs';
import {RootModel} from './types';
import {markdown} from './ui-config.d9';

export default (props: PreloadedPageProps) => {
	const initRootModel = props.initRootModel as unknown as RootModel;
	console.log(initRootModel);

	// build a ref to keep the root model
	const rootModelRef = useRef<RootModel>(initRootModel);
	const externalDefs = createExternalDefsCreator(rootModelRef);

	return <D9Page ui={markdown}
	               initRootModel={rootModelRef.current as unknown as ObjectPropValue} initRootModelAsIs={true}
	               externalDefs={externalDefs}/>;
};
