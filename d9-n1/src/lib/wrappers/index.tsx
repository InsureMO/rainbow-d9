import React, {useState} from 'react';
import {ArrayElementEventBusProvider, ContainerEventBusProvider, WrapperEventBusProvider} from '../events';
import {ArrayElementValidationEventHolder, ContainerValidationEventHolder, useSetValue} from '../hooks';
import {
	ArrayContainerDef,
	ArrayContainerWidgetProps,
	BaseModel,
	ContainerDef,
	ContainerWidgetProps,
	ModelHolder,
	NodeAttributeValues,
	NodeDef,
	OnValueChange,
	PropertyPath,
	WidgetProps,
	WrappedAttributes,
	WrappedNodeAttributes
} from '../types';
import {MUtils, N1Logger, NUtils, PPUtils, VUtils} from '../utils';
import {
	EnhancedPropsForArray,
	findWidget,
	RegisteredArrayContainerWidget,
	RegisteredContainerWidget,
	RegisteredWidget
} from '../widgets-registration';
import {useArrayFunctions} from './use-array-functions';
import {useAttributesWatch} from './use-attributes-watch';
import {useValidate, useValidationFunctions, useValidationRegistration} from './use-validate';
import {buildDefaultAttributeValues} from './utils';

export const findContainerChildKey = (keys: Array<[NodeDef, string]>, find: NodeDef): string => {
	const cached = keys.find(([def]) => {
		// def === find && console.log(def, find);
		return def === find;
	});
	if (cached == null) {
		const key = NUtils.generateReactKey();
		keys.push([find, key]);
		return key;
	} else {
		return cached[1];
	}
};

/**
 * assign a unique key for every child, and cache it.
 */
export const useContainerChildren = (options: {
	def: ContainerDef;
	/** which property carries child node defs, use $nodes when ignored. */
	nodesFrom?: string;
}): { keys: Array<[NodeDef, string]>, defs: Array<NodeDef> } => {
	const {def, nodesFrom} = options;

	const childrenDefs = NUtils.getChildNodes(def, nodesFrom) || [];
	const [keys] = useState<Array<[NodeDef, string]>>(() => {
		return childrenDefs.map(child => [child, NUtils.generateReactKey()]);
	});
	Promise.resolve().then(() => {
		if (childrenDefs.length === 0) {
			keys.length = 0;
		} else {
			// starts from tail
			for (let index = keys.length - 1; index >= 0; index--) {
				const [def] = keys[index];
				if (!childrenDefs.includes(def)) {
					keys.splice(index, 1);
				}
			}
		}
	});
	return {keys, defs: childrenDefs};
};

export const renderContainerChildren = (options: {
	def: ContainerDef;
	childrenDefs: Array<NodeDef>;
	keys: Array<[NodeDef, string]>;
	$wrapped: WrappedAttributes;
}) => {
	const {def, childrenDefs, keys, $wrapped: {$root, $p2r, $model}} = options;

	return (childrenDefs).map(childProps => {
		// remove $key, and re-assign one to make sure it is unique
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {$key: keyOfChild, ...restOfChild} = childProps;
		const key = findContainerChildKey(keys, childProps);
		N1Logger.debug(`Container element[key=${key}, path=${PPUtils.concat($p2r, restOfChild.$pp)}].`, childProps, 'RenderContainerChildren');
		NUtils.inheritValidationScopes(def, restOfChild);
		// share root and model between container parent and children
		return <Wrapper $root={$root} $p2r={$p2r} $model={$model} $key={key} {...restOfChild}
		                key={key} />;
	});
};

export const ArrayElement = (props: {
	elementModel: BaseModel; index: number;
	$wrapped: WrappedAttributes; $arrayP2r: PropertyPath;
	$array: EnhancedPropsForArray;
	createRemoveElementFunc: (elementModel: BaseModel, index: number) => (() => Promise<void>);
	widget: RegisteredArrayContainerWidget<ArrayContainerWidgetProps>;
	originalProps: ArrayContainerDef & ModelHolder & WrappedNodeAttributes;
}) => {
	const {
		elementModel, index,
		$wrapped, $arrayP2r, $array,
		createRemoveElementFunc, widget, originalProps, ...rest
	} = props;

	// cache keys for children of element
	const {keys, defs: childrenDefs} = useContainerChildren({def: originalProps});

	const $p2r = `${$arrayP2r}[${index}]`;
	const enhancedForElement = {
		...$array, elementIndex: index, removeElement: createRemoveElementFunc(elementModel, index)
	};
	const ElementContainer = widget.ELEMENT;

	return <ArrayElementEventBusProvider>
		<ArrayElementValidationEventHolder />
		<ElementContainer $wrapped={{...$wrapped, $p2r, $model: elementModel}}
		                  $array={enhancedForElement} {...rest}>
			{renderContainerChildren({
				def: originalProps, childrenDefs, keys, $wrapped: {...$wrapped, $p2r, $model: elementModel}
			})}
		</ElementContainer>
	</ArrayElementEventBusProvider>;
};

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
			NoData != null ?
				<NoData $wrapped={$wrapped} $array={enhancedForArray} {...rest} key="$$no-data$$" /> : null,
			...elements.map((elementModel, index) => {
				const key = getElementKey(elementModel);
				N1Logger.debug(`Array element[key=${key}, path=${$p2r}].`, elementModel, 'ArrayWrapper');
				return <ArrayElement elementModel={elementModel} index={index}
				                     $wrapped={$wrapped} $arrayP2r={$arrayP2r} $array={enhancedForArray}
				                     createRemoveElementFunc={createRemoveElementFunc}
				                     widget={widget} originalProps={props} {...rest}
				                     key={key} />;
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

export const ContainerWrapper = (props: ContainerDef & ModelHolder & WrappedNodeAttributes) => {
	const {$root, $p2r, $model, $wt, $avs, $vfs, ...rest} = props;

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

	// render container itself
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <C $wrapped={$wrapped} {...rest} style={NUtils.computeStyle(rest)}>
		{renderContainerChildren({
			def: props, childrenDefs, keys, $wrapped: {...$wrapped, $p2r: $subP2r, $model: $subModel}
		})}
	</C>;
};

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
	return <C $wrapped={$wrapped} {...rest} style={style} />;
};

export const WrapperDelegate = (props: NodeDef & ModelHolder) => {
	const {$wt} = props;

	const [attributeValues, setAttributeValues] = useState<NodeAttributeValues>(buildDefaultAttributeValues(props));
	const validators = useValidationFunctions(props);
	useAttributesWatch({props, attributeValues, setAttributeValues});
	useValidate({props, attributeValues, setAttributeValues});
	useValidationRegistration({props, attributeValues, setAttributeValues});

	if (VUtils.isBlank($wt)) {
		throw new Error(`Type must be declared, current is [${$wt}].`);
	}

	if ($wt.includes('.')) {
		// declared with cover widget, format is "InternalWidgetType.CoverWidgetType"
		const coverType = $wt.substring($wt.indexOf('.') + 1);
		if (VUtils.isBlank(coverType)) {
			throw new Error(`Cover type must be declared, current is [${$wt}].`);
		}
		const internalType = $wt.substring(0, $wt.indexOf('.'));
		if (VUtils.isBlank(internalType)) {
			throw new Error(`Internal type must be declared, current is [${$wt}].`);
		}

		const internalWidget: RegisteredWidget<WidgetProps> = findWidget(internalType);
		if (internalWidget == null) {
			throw new Error(`Widget definition of [${internalType}] not found.`);
		}
		const coverWidget: RegisteredWidget<WidgetProps> = findWidget(coverType);
		if (coverWidget == null) {
			throw new Error(`Widget definition of [${coverType}] not found.`);
		}

		const child = (() => {
			if (internalWidget.container && internalWidget.array) {
				return <ContainerEventBusProvider>
					<ContainerValidationEventHolder />
					<ArrayWrapper {...(props as unknown as (ArrayContainerDef & ModelHolder))}
					              $wt={internalType}
					              $avs={attributeValues} $vfs={validators} />
				</ContainerEventBusProvider>;
			} else if (internalWidget.container) {
				return <ContainerEventBusProvider>
					<ContainerValidationEventHolder />
					<ContainerWrapper {...(props as unknown as (ContainerDef & ModelHolder))}
					                  $wt={internalType}
					                  $avs={attributeValues} $vfs={validators} />
				</ContainerEventBusProvider>;
			} else {
				// ignore compute style when it is declared with a wrapper
				return <LeafWrapper {...props} $wt={internalType} $avs={attributeValues} $vfs={validators}
				                    useComputedStyle={false} />;
			}
		})();

		// internal widget is the only child of cover widget, therefore, use leaf wrapper here, which means
		// cover widget CANNOT be container widget, and attribute "nodes" is ignored even through it has been declared.
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return <LeafWrapper {...props} $wt={coverType} $avs={attributeValues} $vfs={validators}
		                    useComputedStyle={true}>
			{child}
		</LeafWrapper>;
	} else {
		// no cover widget
		const widget: RegisteredWidget<WidgetProps> = findWidget($wt);
		if (widget == null) {
			throw new Error(`Widget definition of [${$wt}] not found.`);
		}

		if (widget.container && widget.array) {
			return <ContainerEventBusProvider>
				<ContainerValidationEventHolder />
				<ArrayWrapper {...(props as unknown as (ArrayContainerDef & ModelHolder))}
				              $avs={attributeValues} $vfs={validators} />
			</ContainerEventBusProvider>;
		} else if (widget.container) {
			return <ContainerEventBusProvider>
				<ContainerValidationEventHolder />
				<ContainerWrapper {...(props as unknown as (ContainerDef & ModelHolder))}
				                  $avs={attributeValues} $vfs={validators} />
			</ContainerEventBusProvider>;
		} else {
			return <LeafWrapper {...props} $avs={attributeValues} $vfs={validators} useComputedStyle={true} />;
		}
	}
};

export const Wrapper = (props: NodeDef & ModelHolder) => {
	return <WrapperEventBusProvider>
		<WrapperDelegate {...props} />
	</WrapperEventBusProvider>;
};

export * from './types';
export * from './utils';
export * from './use-validate';
export * from './use-attributes-watch';
