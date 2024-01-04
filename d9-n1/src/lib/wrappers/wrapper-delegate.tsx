import React from 'react';
import {ModelHolder, NodeDef} from '../types';
import {useDefaultAttributeValues} from './use-default-attribute-values';
import {WrapperDelegateWorker} from './wrapper-delegate-worker';

export const WrapperDelegate = (props: NodeDef & ModelHolder) => {
	const {initialized, $defaultAttributes, $defaultAttributesSet} = useDefaultAttributeValues(props);
	if (!initialized) {
		return null;
	}

	return <WrapperDelegateWorker {...props}
	                              $defaultAttributes={$defaultAttributes}
	                              $defaultAttributesSet={$defaultAttributesSet}/>;
};
