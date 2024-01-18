import React from 'react';
import {ArrayElementEventBusProvider} from '../events';
import {ArrayElementValidationEventHolder} from '../hooks';
import {
	ArrayContainerDef,
	ArrayContainerWidgetProps,
	BaseModel,
	ModelHolder,
	Nullable,
	PropertyPath,
	WrappedAttributes,
	WrappedNodeAttributes
} from '../types';
import {PPUtils} from '../utils';
import {EnhancedPropsForArray, RegisteredArrayContainerWidget} from '../widgets-registration';

import {renderContainerChildren} from './render-container-children';
import {useContainerChildren} from './use-container-children';

export const ArrayElement = (props: {
	elements: Nullable<Array<BaseModel>>, elementModel: BaseModel; index: number;
	$wrapped: WrappedAttributes; $arrayP2r: PropertyPath;
	$array: EnhancedPropsForArray;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createRemoveElementFunc: (elementModel: BaseModel, index: number) => ((...args: Array<any>) => Promise<void>);
	widget: RegisteredArrayContainerWidget<ArrayContainerWidgetProps>;
	originalProps: ArrayContainerDef & ModelHolder & WrappedNodeAttributes;
}) => {
	const {
		elements, elementModel, index,
		$wrapped, $arrayP2r, $array,
		createRemoveElementFunc, widget, originalProps, ...rest
	} = props;

	// cache keys for children of element
	const {keys, defs: childrenDefs} = useContainerChildren({def: originalProps});

	const $p2r = PPUtils.concat($arrayP2r, `[${index}]`);
	const enhancedForElement = {
		...$array, elementIndex: index, removeElement: createRemoveElementFunc(elementModel, index)
	};
	const ElementContainer = widget.ELEMENT;

	return <ArrayElementEventBusProvider>
		<ArrayElementValidationEventHolder/>
		<ElementContainer
			$wrapped={{
				...$wrapped, $arrayHolder: $wrapped.$model as BaseModel, $array: elements, $p2r, $model: elementModel
			}}
			$array={enhancedForElement} {...rest}>
			{renderContainerChildren({
				def: originalProps, childrenDefs, keys,
				$wrapped: {
					// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
					// @ts-ignore
					...$wrapped, $arrayHolder: $wrapped.$model as BaseModel, $array: elements,
					$p2r, $model: elementModel
				}
			})}
		</ElementContainer>
	</ArrayElementEventBusProvider>;
};