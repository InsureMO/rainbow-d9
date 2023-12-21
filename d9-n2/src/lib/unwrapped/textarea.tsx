import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {Textarea, TextareaProps} from '../textarea';

/** Input configuration definition */
type UnwrappedTextareaProps =
	Omit<TextareaProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	onValueChange: (value: PropValue) => void;
	value?: PropValue;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedTextarea = forwardRef((props: UnwrappedTextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
	const {value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {value};

	return <Textarea {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                 $pp="value"
	                 id={rest.id ?? VUtils.generateUniqueId()}
	                 ref={ref}/>;
});

export {UnwrappedTextarea, UnwrappedTextareaProps};
