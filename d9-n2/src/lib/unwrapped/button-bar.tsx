import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, ReactNode} from 'react';
import {ButtonBar, ButtonBarProps} from '../button-bar';

/** Button bar configuration definition */
type UnwrappedButtonBarProps =
	Omit<ButtonBarProps, 'disabled' | '$wrapped' | '$nodes' | keyof MonitorNodeDef>
	& {
	children?: ReactNode;
	visible?: boolean;
};

const UnwrappedButtonBar = forwardRef((props: UnwrappedButtonBarProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		children, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <ButtonBar {...rest}
	                  $nodes={[]}
	                  $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                  id={rest.id ?? VUtils.generateUniqueId()}
	                  ref={ref}>
		{children}
	</ButtonBar>;
});

export {UnwrappedButtonBar, UnwrappedButtonBarProps};
