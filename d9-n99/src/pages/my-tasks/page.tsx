import {StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalRoot} from '@rainbow-d9/n2';
import {parseDoc} from '@rainbow-d9/n3';
import {useState} from 'react';
import {I18NAndD9N2Bridge} from '../../bootstrap';
import {createDropdownOptionsProvider, StandardPageWrapper} from '../standard-widgets';
import {D9PageState} from '../types';
import InitRootModel from './init-root.json';
import {markdown} from './ui-config.d9';

type CodesNames = 'taskCategories' | 'taskPriorities';

export default () => {
	const [state] = useState<D9PageState>(() => {
		return {
			$config: parseDoc(markdown),
			// clone it
			$root: JSON.parse(JSON.stringify(InitRootModel))
		};
	});
	const {success, error} = state.$config;

	if (!success) {
		if (error instanceof Error) {
			return <div>{error.message}</div>;
		} else {
			return <div>{error}</div>;
		}
	}

	const externalDefs = {
		codes: createDropdownOptionsProvider<CodesNames>({
			taskCategories: [
				{label: 'Policy', value: 'policy'},
				{label: 'Claim', value: 'claim'}
			],
			taskPriorities: [
				{label: 'High', value: 'high'},
				{label: 'Medium', value: 'medium'},
				{label: 'Low', value: 'low'}
			]
		})
	};

	return <GlobalRoot>
		<I18NAndD9N2Bridge/>
		<StandardPageWrapper>
			<StandaloneRoot {...state.$config.node} $root={state.$root} externalDefs={externalDefs}/>
		</StandardPageWrapper>
	</GlobalRoot>;
};
