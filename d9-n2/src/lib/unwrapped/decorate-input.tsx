import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {DecorateInput, DecorateInputProps, DecorateNumberInput, DecorateNumberInputProps} from '../decorate-input';

type UnwrappedDecorateInputProps =
	Omit<DecorateInputProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: PropValue) => void;
	value?: PropValue;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedDecorateInput = (props: UnwrappedDecorateInputProps) => {
	const {value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {value};

	return <DecorateInput {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                      $pp="value"
	                      id={rest.id ?? VUtils.generateUniqueId()}/>;
};

type UnwrappedDecorateNumberInputProps =
	Omit<DecorateNumberInputProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: PropValue) => void;
	value?: PropValue;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedDecorateNumberInput = (props: UnwrappedDecorateNumberInputProps) => {
	const {value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {value};

	return <DecorateNumberInput {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                            $pp="value"
	                            id={rest.id ?? VUtils.generateUniqueId()}/>;
};

export {
	UnwrappedDecorateInput, UnwrappedDecorateInputProps,
	UnwrappedDecorateNumberInput, UnwrappedDecorateNumberInputProps
};
