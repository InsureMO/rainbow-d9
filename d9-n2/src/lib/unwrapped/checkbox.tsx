import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {Checkbox, CheckboxProps} from '../checkbox';

/** configuration definition */
type UnwrappedCheckboxProps =
	Omit<CheckboxProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	value?: PropValue;
	onValueChange: (value: PropValue) => void;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedCheckbox = (props: UnwrappedCheckboxProps) => {
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <Checkbox {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                 $pp={$pp}
	                 id={rest.id ?? VUtils.generateUniqueId()}/>;
};

export {UnwrappedCheckbox, UnwrappedCheckboxProps};
