import {useRef} from 'react';
import {asT} from '../../../../utils';
import {D9Page} from '../../../standard-widgets';
import {createExternalDefsCreator} from './external-defs';
import InitRootModel from './init-root.json';
import {RootModel} from './types';
import {markdown} from './ui-config.d9';

export default () => {
	// build a ref to keep the root model
	const rootModelRef = useRef<RootModel>(JSON.parse(JSON.stringify(InitRootModel)));
	const externalDefs = createExternalDefsCreator(rootModelRef);

	return <D9Page ui={markdown}
	               initRootModel={asT(rootModelRef.current)} initRootModelAsIs={true}
	               externalDefs={externalDefs}/>;
};
