import React from 'react';
import {useSetValue} from '../hooks';
import {
	ContainerDef,
	ContainerWidgetProps,
	DeviceTags,
	ModelHolder,
	OnValueChange,
	WrappedAttributes,
	WrappedNodeAttributes
} from '../types';
import {MUtils, NUtils, PPUtils, StyledNodeDef} from '../utils';
import {findWidget, RegisteredContainerWidget} from '../widgets-registration';
import {renderContainerChildren} from './render-container-children';
import {useContainerChildren} from './use-container-children';

export interface ContainerWrapperProps extends ContainerDef, ModelHolder, WrappedNodeAttributes, Partial<DeviceTags> {
	useComputedStyle: boolean;
}

export const ContainerWrapper = (props: ContainerWrapperProps) => {
	const {
		$root, $p2r, $model, $wt,
		$avs, $vfs, useComputedStyle,
		...rest
	} = props;

	// cache keys for children of element
	const {keys, defs: childrenDefs} = useContainerChildren({def: props});

	const {$subModel, $subP2r} = (() => {
		if (PPUtils.isLevelStayed(rest.$pp)) {
			return {$subModel: $model, $subP2r: $p2r};
		} else {
			return {$subModel: MUtils.getValue($model, rest.$pp), $subP2r: PPUtils.absolute($p2r, rest.$pp)};
		}
	})();

	const $onValueChange: OnValueChange = useSetValue(props).onValueChange;
	const $wrapped: WrappedAttributes = {$root, $p2r, $model, $onValueChange, $avs, $vfs};

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const widget: RegisteredContainerWidget<ContainerWidgetProps> = findWidget($wt);
	const C = widget.JSX;

	const style = useComputedStyle ? NUtils.computeStyle(rest as unknown as StyledNodeDef) : (void 0);
	// render container itself
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <C $wrapped={$wrapped} {...rest} $wt={$wt} style={style}
	          data-valid={$avs?.$valid?.valid ?? true}>
		{renderContainerChildren({
			def: props, childrenDefs, keys, $wrapped: {...$wrapped, $p2r: $subP2r, $model: $subModel}
		})}
	</C>;
};