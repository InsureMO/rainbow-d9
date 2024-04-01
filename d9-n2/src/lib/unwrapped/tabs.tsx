import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {Tabs, TabsProps} from '../tabs';

/** Tabs configuration definition */
type UnwrappedTabsProps =
	Omit<TabsProps, 'disabled' | '$wrapped' | keyof MonitorNodeDef>
	& { visible?: boolean };

const UnwrappedTabs = (props: UnwrappedTabsProps) => {
	const {
		$pp = 'value', value,
		title, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value as PropValue};

	return <Tabs {...rest} title={title}
	             $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	             $pp={$pp}
	             id={rest.id ?? VUtils.generateUniqueId()}/>;
};

export {UnwrappedTabs, UnwrappedTabsProps};
