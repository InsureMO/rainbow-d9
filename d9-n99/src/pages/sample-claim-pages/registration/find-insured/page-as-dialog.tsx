import {ObjectPropValue} from '@rainbow-d9/n1';
import {useRef} from 'react';
import {D9Dialog} from '../../../standard-widgets';
import {createExternalDefsCreator} from './external-defs';
import InitRootModel from './init-root.json';
import {RootModel} from './types';
import {markdown} from './ui-config.d9';

export const ClaimRegistrationFindInsuredDialog = () => {
	// replace the title of search section
	const revisedMarkdown = markdown.replace('page.common.title.advanced', 'page.common.title.search');
	// build a ref to keep the root model
	const rootModelRef = useRef<RootModel>(JSON.parse(JSON.stringify(InitRootModel)));
	// remove the fuzzy search, use advanced search as default
	rootModelRef.current.control.fuzzySearchEnabled = false;
	rootModelRef.current.control.advancedSearchEnabled = true;
	const externalDefs = createExternalDefsCreator(rootModelRef);

	return <D9Dialog ui={revisedMarkdown}
	                 initRootModel={rootModelRef.current as unknown as ObjectPropValue} initRootModelAsIs={true}
	                 externalDefs={externalDefs}/>;
};
