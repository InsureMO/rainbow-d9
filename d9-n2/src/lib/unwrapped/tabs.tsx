import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {Tabs, TabsProps} from '../tabs';

/** Tabs configuration definition */
type UnwrappedTabsProps =
	Omit<TabsProps, 'disabled' | 'value' | '$wrapped' | keyof MonitorNodeDef>
	& { value?: PropValue; visible?: boolean };

const UnwrappedTabs = forwardRef((props: UnwrappedTabsProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		$pp = 'value', value,
		title, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <Tabs {...rest} title={title}
	             $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	             $pp={$pp}
	             id={rest.id ?? VUtils.generateUniqueId()}
	             ref={ref}/>;
});

export {UnwrappedTabs, UnwrappedTabsProps};
