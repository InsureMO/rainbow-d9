import React from 'react';
import {useSetValue} from '../hooks';
import {ModelHolder, NodeDef, OnValueChange, WidgetProps, WrappedAttributes, WrappedNodeAttributes} from '../types';
import {NUtils} from '../utils';
import {findWidget, RegisteredWidget} from '../widgets-registration';

export const LeafWrapper = (props: NodeDef & ModelHolder & WrappedNodeAttributes & { useComputedStyle: boolean }) => {
	const {$root, $p2r, $model, $wt, $avs, $vfs, useComputedStyle, ...rest} = props;

	const $onValueChange: OnValueChange = useSetValue(props).onValueChange;
	const $wrapped: WrappedAttributes = {$root, $p2r, $model, $onValueChange, $avs, $vfs};
	const widget: RegisteredWidget<WidgetProps> = findWidget($wt);
	const C = widget.JSX;

	const style = useComputedStyle ? NUtils.computeStyle(rest as NodeDef) : (void 0);
	// render container itself
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <C $wrapped={$wrapped} {...rest} style={style}/>;
};