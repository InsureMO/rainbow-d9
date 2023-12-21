import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {Dropdown, DropdownOptionValue, DropdownProps} from '../dropdown';
import {OnDropdownValueChange} from '../dropdown-options-assist';

/** configuration definition */
type UnwrappedDropdownProps =
	Omit<DropdownProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	value?: PropValue;
	onValueChange: OnDropdownValueChange<DropdownOptionValue>;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedDropdown = (props: UnwrappedDropdownProps) => {
	const {value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {value};

	return <Dropdown {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                 $pp="value"
	                 id={rest.id ?? VUtils.generateUniqueId()}/>;
};

export {UnwrappedDropdown, UnwrappedDropdownProps};
