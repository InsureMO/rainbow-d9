import React from 'react';
import {DeviceTags, ModelHolder, NodeDef} from '../types';
import {useDefaultAttributeValues} from './use-default-attribute-values';
import {WrapperDelegateWorker} from './wrapper-delegate-worker';

export interface WrapperDelegateProps extends NodeDef, ModelHolder, Partial<DeviceTags> {
}

export const WrapperDelegate = (props: WrapperDelegateProps) => {
	const {initialized, $defaultAttributes, $defaultAttributesSet} = useDefaultAttributeValues(props);
	if (!initialized) {
		return null;
	}

	return <WrapperDelegateWorker {...props}
	                              $defaultAttributes={$defaultAttributes}
	                              $defaultAttributesSet={$defaultAttributesSet}/>;
};
