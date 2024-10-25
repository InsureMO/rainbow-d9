import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, ReactNode} from 'react';
import {Box, BoxProps} from '../box';

/** Button bar configuration definition */
type UnwrappedBoxProps =
	Omit<BoxProps, 'disabled' | '$wrapped' | '$nodes' | keyof MonitorNodeDef>
	& {
	children?: ReactNode;
	visible?: boolean;
};

const UnwrappedBox = forwardRef((props: UnwrappedBoxProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		children, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <Box {...rest}
	            $nodes={[]}
	            $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	            id={rest.id ?? VUtils.generateUniqueId()}
	            ref={ref}>
		{children}
	</Box>;
});

export {UnwrappedBox, UnwrappedBoxProps};
