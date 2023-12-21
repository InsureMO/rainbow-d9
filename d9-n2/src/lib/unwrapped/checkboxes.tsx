import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {Checkboxes, CheckboxesProps} from '../checkboxes';

/** configuration definition */
type UnwrappedCheckboxesProps =
	Omit<CheckboxesProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	value?: PropValue;
	onValueChange: (value: PropValue) => void;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedCheckboxes = (props: UnwrappedCheckboxesProps) => {
	const {value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {value};

	return <Checkboxes {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                   $pp="value"
	                   id={rest.id ?? VUtils.generateUniqueId()}/>;
};

export {UnwrappedCheckboxes, UnwrappedCheckboxesProps};
