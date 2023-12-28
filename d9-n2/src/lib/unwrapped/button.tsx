import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, MouseEvent, ReactNode} from 'react';
import {Button, ButtonFill, ButtonInk, ButtonProps} from '../button';

/** Button configuration definition */
type UnwrappedButtonProps =
	Omit<ButtonProps, 'text' | '$wrapped' | keyof MonitorNodeDef>
	& {
	children?: ReactNode;
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedButton = forwardRef((props: UnwrappedButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {
		onClick, ink = ButtonInk.PRIMARY, fill = ButtonFill.FILL,
		children, disabled, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {};
	const click = (options, event: MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick(event);
		}
	};

	return <Button {...rest} ink={ink} fill={fill}
	               $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	               text={children}
	               click={click}
	               id={rest.id ?? VUtils.generateUniqueId()}
	               ref={ref}/>;
});

export {UnwrappedButton, UnwrappedButtonProps};
