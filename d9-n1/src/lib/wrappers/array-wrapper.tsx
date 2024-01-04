import React from 'react';
import {useSetValue} from '../hooks';
import {
	ArrayContainerDef,
	ArrayContainerWidgetProps,
	ModelHolder,
	WrappedAttributes,
	WrappedNodeAttributes
} from '../types';
import {N1Logger, NUtils} from '../utils';
import {findWidget, RegisteredArrayContainerWidget} from '../widgets-registration';
import {ArrayElement} from './array-element';
import {useArrayFunctions} from './use-array-functions';

export const ArrayWrapper = (props: ArrayContainerDef & ModelHolder & WrappedNodeAttributes) => {
	const {$root, $p2r, $model, $wt, $avs, $vfs, $array, ...rest} = props;

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

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <C $wrapped={$wrapped} {...rest} style={NUtils.computeStyle(rest)}>
		{Top != null ? <Top $wrapped={$wrapped} $array={enhancedForArray} {...rest} /> : null}
		{Body == null
			? body()
			: <Body $wrapped={$wrapped} $array={enhancedForArray} {...rest}>
				{body()}
			</Body>}
		{Bottom != null ? <Bottom $wrapped={$wrapped} $array={enhancedForArray} {...rest} /> : null}
	</C>;
};