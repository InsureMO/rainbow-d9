import {useEffect, useState} from 'react';
import {ModelHolder, NodeAttributeValues, NodeDef} from '../types';
import {DefaultNodeAttributesState} from './types';
import {buildDefaultAttributeValues} from './utils';

export interface DefaultAttributeValuesState extends NodeAttributeValues {
	initialized: boolean;
}

export interface DefaultAttributeValuesHookOutcome extends Partial<DefaultNodeAttributesState> {
	initialized: boolean;
}

export const useDefaultAttributeValues = (props: NodeDef & ModelHolder): DefaultAttributeValuesHookOutcome => {
	const [state, setState] = useState<DefaultAttributeValuesState>({initialized: false});
	useEffect(() => {
		if (state.initialized) {
			return;
		}
		(async () => {
			// build default attribute values
			const $defaultAttributes = await buildDefaultAttributeValues(props);
			setState({...$defaultAttributes, initialized: true});
		})();
	}, [state.initialized, props]);

	if (!state.initialized) {
		return {initialized: false};
	}

	const {initialized, ...$defaultAttributes} = state;
	const $defaultAttributesSet = (values: NodeAttributeValues | ((values: NodeAttributeValues) => NodeAttributeValues)) => {
		if (typeof values == 'function') {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			setState(({initialized, ...attributes}) => {
				return {...(values(attributes) ?? {}), initialized: true};
			});
		} else {
			setState({...(values ?? {}), initialized: true});
		}
	};
	return {initialized, $defaultAttributes, $defaultAttributesSet};
};
