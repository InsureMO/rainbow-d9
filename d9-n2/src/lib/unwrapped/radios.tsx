import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {Radios, RadiosProps} from '../radios';

/** Dropdown configuration definition */
type UnwrappedRadiosProps =
	Omit<RadiosProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	value?: PropValue;
	onValueChange: (value: PropValue) => void;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedRadios = (props: UnwrappedRadiosProps) => {
	const {value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {value};

	return <Radios {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	               $pp="value"
	               id={rest.id ?? VUtils.generateUniqueId()}/>;
};

export {UnwrappedRadios, UnwrappedRadiosProps};
