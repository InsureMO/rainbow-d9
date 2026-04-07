import React from 'react';
import {WrapperEventBusProvider} from '../events';
import {useDeviceTags} from '../hooks';
import {DeviceType, ModelHolder, NodeDef} from '../types';
import {VUtils} from '../utils';
import {WrapperDelegate} from './wrapper-delegate';

/**
 * Parse and compute the device tags that the widget should render on
 * @param renderOn - String of comma/separated tags or function that returns tags array
 * @returns Array of device tags to render on
 */
const computeRenderOnTags = (renderOn?: NodeDef['$renderOn']): Array<keyof DeviceType> => {
	if (renderOn == null) {
		return [];
	}

	if (typeof renderOn === 'string') {
		if (VUtils.isNotBlank(renderOn)) {
			// Split string by comma or semicolon, trim each tag and filter out empty
			return renderOn.split(/[,;]/).map(tag => tag.trim()).filter(tag => tag.length !== 0) as Array<keyof DeviceType>;
		}
	} else if (typeof renderOn === 'function') {
		// Execute function to get tags array
		return renderOn();
	}
	return [];
};

/**
 * Root wrapper component for all d9 widgets
 * Handles device-based rendering and provides wrapper-scoped event bus
 * @param props - Widget definition and model holder properties
 * @returns Wrapped widget component or null if not rendering on current device
 */
export const Wrapper = (props: NodeDef & ModelHolder) => {
	// Get current device tags (mobile, desktop, etc.)
	const deviceTags = useDeviceTags();
	// Get tags that this widget should render on
	const renderOnTags = computeRenderOnTags(props.$renderOn);
	// Determine if widget should render on current device
	// If no renderOn tags specified, render everywhere
	const render = renderOnTags.length === 0 || renderOnTags.some(tag => deviceTags[`data-${tag}`]);
	if (!render) {
		// Skip rendering for current device
		return null;
	}

	// Provide wrapper-scoped event bus and delegate to actual wrapper implementation
	return <WrapperEventBusProvider>
		<WrapperDelegate {...props} {...deviceTags}/>
	</WrapperEventBusProvider>;
};
