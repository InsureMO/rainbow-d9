import React from 'react';
import {beautifyDataAttributes, useSetValue} from '../hooks';
import {
	ArrayContainerDef,
	ArrayContainerWidgetProps,
	DeviceTags,
	ModelHolder,
	WrappedAttributes,
	WrappedNodeAttributes
} from '../types';
import {N1Logger, NUtils, StyledNodeDef} from '../utils';
import {findWidget, RegisteredArrayContainerWidget} from '../widgets-registration';
import {ArrayElement} from './array-element';
import {useArrayFunctions} from './use-array-functions';

export interface ArrayWrapperProps extends ArrayContainerDef, ModelHolder, WrappedNodeAttributes, Partial<DeviceTags> {
	useComputedStyle: boolean;
}

export const ArrayWrapper = (props: ArrayWrapperProps) => {
	const {
		$root, $p2r, $model, $wt,
		$avs, $vfs, $array, useComputedStyle,
		...rest
	} = props;

	const {onValueChange: $onValueChange, onValueChanged} = useSetValue(props);
	const $wrapped: WrappedAttributes = {$root, $p2r, $model, $onValueChange, $avs, $vfs};

	const {
		elements, $arrayP2r,
		addElement, removeElement, createRemoveElementFunc, clearElement, getElementKey
	} = useArrayFunctions({props, onValueChanged});
	const hasElement = elements.length !== 0;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const widget: RegisteredArrayContainerWidget<ArrayContainerWidgetProps> = findWidget($wt);
	const C = widget.JSX;
	const Top = widget.TOP;
	const Body = widget.BODY;
	const NoData = widget.NO_ELEMENT;
	const Bottom = widget.BOTTOM;

	const enhancedForArray = {...$array, removeElement, addElement, hasElement, clearElement};

	const body = () => {
		return [
			NoData != null && (elements == null || elements.length === 0) ?
				<NoData $wrapped={$wrapped} $array={enhancedForArray} {...rest} key="$$no-data$$"/> : null,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			...elements.map((elementModel: any, index: number) => {
				const key = getElementKey(elementModel);
				N1Logger.debug(`Array element[key=${key}, path=${$p2r}].`, elementModel, 'ArrayWrapper');
				return <ArrayElement elements={elements} elementModel={elementModel} index={index}
				                     $wrapped={$wrapped} $arrayP2r={$arrayP2r} $array={enhancedForArray}
				                     createRemoveElementFunc={createRemoveElementFunc}
				                     widget={widget} originalProps={props} {...rest}
				                     key={key}/>;
			})];
	};

	beautifyDataAttributes(rest, {root: $root, model: $model});
	const style = useComputedStyle ? NUtils.computeStyle(rest as unknown as StyledNodeDef) : (void 0);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <C $wrapped={$wrapped} {...rest} $wt={$wt} style={style}
	          data-valid={$avs?.$valid?.valid ?? true}>
		{Top != null ? <Top $wrapped={$wrapped} $array={enhancedForArray} {...rest} /> : null}
		{Body == null
			? body()
			: <Body $wrapped={$wrapped} $array={enhancedForArray} {...rest}>
				{body()}
			</Body>}
		{Bottom != null ? <Bottom $wrapped={$wrapped} $array={enhancedForArray} {...rest} /> : null}
	</C>;
};