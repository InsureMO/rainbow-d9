import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {MultiDropdown, MultiDropdownProps} from '../multi-dropdown';

/** configuration definition */
type UnwrappedMultiDropdownProps =
	Omit<MultiDropdownProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	value?: PropValue;
	onValueChange: (value: PropValue) => void;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedMultiDropdown = forwardRef((props: UnwrappedMultiDropdownProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <MultiDropdown {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                      $pp={$pp}
	                      id={rest.id ?? VUtils.generateUniqueId()}
	                      ref={ref}/>;
});

export {UnwrappedMultiDropdown, UnwrappedMultiDropdownProps};
