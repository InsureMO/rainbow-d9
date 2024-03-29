import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {Input, InputProps, NumberInput, NumberInputProps, PasswordInput, PasswordInputProps} from '../input';

/** Input configuration definition */
type UnwrappedInputProps =
	Omit<InputProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: PropValue) => void;
	value?: PropValue;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedInput = forwardRef((props: UnwrappedInputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <Input {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	              $pp={$pp}
	              id={rest.id ?? VUtils.generateUniqueId()}
	              ref={ref}/>;
});

type UnwrappedNumberInputProps =
	Omit<NumberInputProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: PropValue) => void;
	value?: PropValue;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedNumberInput = forwardRef((props: UnwrappedNumberInputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <NumberInput {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                    $pp={$pp}
	                    id={rest.id ?? VUtils.generateUniqueId()}
	                    ref={ref}/>;
});

type UnwrappedPasswordInputProps =
	Omit<PasswordInputProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: PropValue) => void;
	value?: PropValue;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedPasswordInput = forwardRef((props: UnwrappedPasswordInputProps, ref: ForwardedRef<HTMLInputElement>) => {
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <PasswordInput {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                      $pp={$pp}
	                      id={rest.id ?? VUtils.generateUniqueId()}
	                      ref={ref}/>;
});

export {
	UnwrappedInput, UnwrappedInputProps,
	UnwrappedNumberInput, UnwrappedNumberInputProps,
	UnwrappedPasswordInput, UnwrappedPasswordInputProps
};
