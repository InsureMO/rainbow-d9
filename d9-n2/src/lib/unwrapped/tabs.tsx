import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {Tabs, TabsProps} from '../tabs';

/** Tabs configuration definition */
type UnwrappedTabsProps =
	Omit<TabsProps, 'disabled' | '$wrapped' | keyof MonitorNodeDef>
	& { visible?: boolean };

const UnwrappedTabs = (props: UnwrappedTabsProps) => {
	const {
		title, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <Tabs {...rest} title={title}
	             $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	             id={rest.id ?? VUtils.generateUniqueId()}/>;
};

export {UnwrappedTabs, UnwrappedTabsProps};
