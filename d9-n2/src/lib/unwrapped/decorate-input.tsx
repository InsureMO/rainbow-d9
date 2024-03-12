import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {
	DecorateInput,
	DecorateInputProps,
	DecorateNumberInput,
	DecorateNumberInputProps,
	DecoratePasswordInput,
	DecoratePasswordInputProps
} from '../decorate-input';

type UnwrappedDecorateInputProps =
	Omit<DecorateInputProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: PropValue) => void;
	value?: PropValue;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedDecorateInput = (props: UnwrappedDecorateInputProps) => {
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <DecorateInput {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                      $pp={$pp}
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
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <DecorateNumberInput {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                            $pp={$pp}
	                            id={rest.id ?? VUtils.generateUniqueId()}/>;
};

type UnwrappedDecoratePasswordInputProps =
	Omit<DecoratePasswordInputProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: PropValue) => void;
	value?: PropValue;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedDecoratePasswordInput = (props: UnwrappedDecoratePasswordInputProps) => {
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <DecoratePasswordInput {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                              $pp={$pp}
	                              id={rest.id ?? VUtils.generateUniqueId()}/>;
};

export {
	UnwrappedDecorateInput, UnwrappedDecorateInputProps,
	UnwrappedDecorateNumberInput, UnwrappedDecorateNumberInputProps,
	UnwrappedDecoratePasswordInput, UnwrappedDecoratePasswordInputProps
};
