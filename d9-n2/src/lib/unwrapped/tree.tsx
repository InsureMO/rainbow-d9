import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {Tree, TreeProps} from '../tree';

/** Tree configuration definition */
type UnwrappedTreeProps =
	Omit<TreeProps, 'disabled' | '$wrapped' | keyof MonitorNodeDef>
	& { visible?: boolean; };

const UnwrappedTree = forwardRef((props: UnwrappedTreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {};

	return <Tree {...rest}
	             $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	             id={rest.id ?? VUtils.generateUniqueId()}
	             ref={ref}/>;
});

export {UnwrappedTree, UnwrappedTreeProps};
