import {MonitorNodeDef, NodeAttributeValues, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {Tree, TreeProps} from '../tree';

/** Tree configuration definition */
type UnwrappedTreeProps =
	Omit<TreeProps, 'disabled' | '$wrapped' | keyof MonitorNodeDef>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	& { data: any; visible?: boolean; };

const UnwrappedTree = forwardRef((props: UnwrappedTreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		$pp = 'value', data, visible, ...rest
	} = props;

	const $onValueChange = VUtils.noop;
	const $avs = {$disabled: false, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: data};

	return <Tree {...rest}
	             $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	             $pp={$pp}
	             id={rest.id ?? VUtils.generateUniqueId()}
	             ref={ref}/>;
});

export {UnwrappedTree, UnwrappedTreeProps};
