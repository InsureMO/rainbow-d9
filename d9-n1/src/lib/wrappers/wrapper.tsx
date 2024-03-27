import React from 'react';
import {WrapperEventBusProvider} from '../events';
import {useDeviceTags} from '../hooks';
import {DeviceType, ModelHolder, NodeDef} from '../types';
import {VUtils} from '../utils';
import {WrapperDelegate} from './wrapper-delegate';

const computeRenderOnTags = (renderOn?: NodeDef['$renderOn']): Array<keyof DeviceType> => {
	if (renderOn == null) {
		return [];
	}

	if (typeof renderOn === 'string') {
		if (VUtils.isNotBlank(renderOn)) {
			return renderOn.split(/[,;]/).map(tag => tag.trim()).filter(tag => tag.length !== 0) as Array<keyof DeviceType>;
		}
	} else if (typeof renderOn === 'function') {
		return renderOn();
	}
	return [];
};

export const Wrapper = (props: NodeDef & ModelHolder) => {
	const deviceTags = useDeviceTags();
	const renderOnTags = computeRenderOnTags(props.$renderOn);
	const render = renderOnTags.length === 0 || renderOnTags.some(tag => deviceTags[`data-${tag}`]);
	if (!render) {
		// ignore rendering
		return null;
	}

	return <WrapperEventBusProvider>
		<WrapperDelegate {...props} />
	</WrapperEventBusProvider>;
};
