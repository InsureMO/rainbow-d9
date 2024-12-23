import {useState} from 'react';
import {useForceUpdate} from '../hooks';
import {ArrayContainerDef, ArrayPropValue, BaseModel, ModelHolder, ObjectPropValue, OnValueChanged} from '../types';
import {MUtils, N1Logger, PPUtils} from '../utils';
import {getArrayElementKey} from './utils';

export const useArrayFunctions = (options: {
	props: ArrayContainerDef & ModelHolder;
	onValueChanged: OnValueChanged
}) => {
	const {props, onValueChanged} = options;
	const {
		$root, $p2r, $model,
		$array: {couldAddElement, createElement, elementAdded, couldRemoveElement, elementRemoved, getElementKey} = {},
		...rest
	} = props;

	const [keys] = useState<Array<[BaseModel, string]>>([]);
	const forceUpdate = useForceUpdate();

	const {$array, absolutePathOfArray} = PPUtils.isLevelStayed(rest.$pp)
		? {$array: $model, absolutePathOfArray: $p2r}
		: {$array: MUtils.getValue($model, rest.$pp), absolutePathOfArray: PPUtils.absolute($p2r, rest.$pp)};

	let elements: Array<BaseModel>;
	if ($array != null && !Array.isArray($array)) {
		N1Logger.error('Data model must be an array or null.', 'ArrayFunctionsHook');
		elements = [] as Array<BaseModel>;
		// clear keys
		keys.length = 0;
	} else {
		elements = ($array || []) as Array<BaseModel>;
		// clear keys if cached element is not in elements anymore
		for (let index = keys.length - 1; index >= 0; index--) {
			if (!elements.includes(keys[index][0])) {
				keys.splice(index, 1);
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const shouldRemoveElement = async (elementModel: BaseModel, index: number, ...args: Array<any>) => {
		if (couldRemoveElement == null) {
			return Promise.resolve(true);
		}
		return await couldRemoveElement({
			root: $root, model: $array as ArrayPropValue, element: elementModel, index
		}, ...args);
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const removeElement = async (elementModel: BaseModel, index: number, ...args: Array<any>) => {
		const shouldRemove = await shouldRemoveElement(elementModel, index, ...args);
		if (!shouldRemove) {
			return;
		}
		// copy to old elements
		const oldElements = $array == null ? null : [...($array as Array<BaseModel>)];
		// remove from elements
		elements.splice(index, 1);
		// remove from keys
		const foundIndex = keys.findIndex(([data]) => data === elementModel);
		if (foundIndex !== -1) {
			keys.splice(foundIndex, 1);
		}
		// call removed function if there is
		if (elementRemoved != null) {
			await elementRemoved({
				root: $root, model: $array as ArrayPropValue, element: elementModel, index
			}, ...args);
		}
		// force update myself
		forceUpdate();
		// notify value changed
		await onValueChanged({absolutePath: absolutePathOfArray, oldValue: oldElements, newValue: elements}, ...args);
	};
	const createRemoveElementFunc = (elementModel: BaseModel, index: number) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return async (...args: Array<any>) => await removeElement(elementModel, index, ...args);
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const clearElement = async (...args: Array<any>) => {
		// copy to old elements
		const oldElements = $array == null ? null : [...($array as Array<BaseModel>)];
		// remove all from elements
		elements.length = 0;
		// remove all from keys
		keys.length = 0;
		// call removed function if there is
		if (elementRemoved != null) {
			await Promise.all((oldElements || []).map(async elementModel => {
				return await elementRemoved({
					root: $root, model: $array as ArrayPropValue, element: elementModel, index: elements.length
				}, ...args);
			}));
		}
		// force update myself
		forceUpdate();
		// notify value changed
		await onValueChanged({absolutePath: absolutePathOfArray, oldValue: oldElements, newValue: elements}, ...args);
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const shouldAddElement = async (...args: Array<any>) => {
		if (couldAddElement == null) {
			return Promise.resolve(true);
		}
		return await couldAddElement({root: $root, model: $array as ArrayPropValue}, ...args);
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const addElement = async (...args: Array<any>) => {
		const shouldAdd = await shouldAddElement(...args);
		if (!shouldAdd) {
			return;
		}
		// copy to old elements
		const oldElements = $array == null ? null : [...($array as Array<BaseModel>)];
		// create new element
		let newElement: ObjectPropValue;
		try {
			newElement = createElement != null
				? await createElement({root: $root, model: $array as ArrayPropValue, index: elements.length}, ...args)
				: {};
		} catch {
			return;
		}
		// push into elements
		elements.push(newElement);
		// call added function if there is
		if (elementAdded != null) {
			await elementAdded({
				root: $root, model: $array as ArrayPropValue, element: newElement, index: elements.length - 1
			}, ...args);
		}
		// if new element is the only one in elements, then elements might be created in rendering
		// set into model anyway
		if (elements.length === 1) {
			MUtils.setValue($model, rest.$pp, elements);
		}
		// force update myself
		forceUpdate();
		// notify value changed
		await onValueChanged({absolutePath: absolutePathOfArray, oldValue: oldElements, newValue: elements}, ...args);
	};

	const getRowElementKey = getArrayElementKey(keys, getElementKey);

	return {
		elements, $arrayP2r: absolutePathOfArray,
		addElement, removeElement, createRemoveElementFunc, clearElement, getElementKey: getRowElementKey
	};
};
