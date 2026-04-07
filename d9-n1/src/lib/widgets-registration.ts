import {FC, JSX} from 'react';
import {
	ArrayContainerWidgetProps,
	ArrayUsedDef,
	BaseModel,
	ContainerWidgetProps,
	Nullable,
	WidgetProps,
	WidgetType
} from './types';

/**
 * Registered widget
 */
export interface RegisteredWidget<P extends WidgetProps> {
	/** react node, jsx syntax */
	JSX: FC<P> | ((props: P) => JSX.Element);
	/** is container or not */
	container: boolean;
	/** is array container or not */
	array: boolean;
	/** default true */
	consumePosition?: boolean;
}

/**
 * Container widget
 */
export interface RegisteredContainerWidget<P extends ContainerWidgetProps> extends RegisteredWidget<P> {
	/** always be true since it is a container */
	container: true;
	/** cannot handle array data */
	array: false;
}

/**
 * Enhanced properties provided to array container widgets
 * Includes array manipulation functions and state
 */
export interface EnhancedPropsForArray extends ArrayUsedDef {
	/**
	 * Remove an element from the array
	 * @param element - The element to remove
	 * @param index - Index of the element in the array
	 * @param args - Additional arguments
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	removeElement: (element: BaseModel, index: number, ...args: Array<any>) => Promise<void>;
	/**
	 * Add a new element to the array
	 * @param args - Additional arguments for element creation
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addElement: (...args: Array<any>) => Promise<void>;
	/** Whether the array has at least one element */
	hasElement: boolean;
	/**
	 * Clear all elements from the array
	 * @param args - Additional arguments
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	clearElement: (...args: Array<any>) => Promise<void>;
}

/**
 * Enhanced properties provided to individual array element widgets
 */
export interface EnhancedPropsForArrayElement extends Omit<EnhancedPropsForArray, 'removeElement'> {
	/** Index of this element within the parent array */
	elementIndex: number;
	/**
	 * Remove this specific element from the array
	 * @param args - Additional arguments
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	removeElement: (...args: Array<any>) => Promise<void>;
}

/** Type helper to add $array properties to a component props type */
export type EnhancePropsForArray<T> = T & { $array: EnhancedPropsForArray };
/** Type helper for array widget body section props */
export type EnhancePropsForArrayBody<T extends Omit<ArrayContainerWidgetProps, '$array'>> = EnhancePropsForArray<Omit<T, '$array'>>;
/** Type helper for array widget non-body sections (TOP, NO_ELEMENT, BOTTOM) props */
export type EnhancePropsForArrayNotBody<T extends Omit<ArrayContainerWidgetProps, '$array'>> = EnhancePropsForArray<Omit<T, 'children' | '$array'>>;
/** Type helper to enhance wrapped props with array holder information */
export type Enhance$WrappedPropsForArrayElement<T extends WidgetProps> = Omit<T, '$wrapped'> & {
	$wrapped: T['$wrapped'] & { $arrayHolder: BaseModel; $array: Array<BaseModel> }
}
/** Type helper for array element component props */
export type EnhancePropsForArrayElement<T extends WidgetProps> = Enhance$WrappedPropsForArrayElement<T> & {
	$array: EnhancedPropsForArrayElement
};

/**
 * Registered array container widget definition
 * Array widgets have special section components for different parts of the array UI
 */
export interface RegisteredArrayContainerWidget<P extends Omit<ArrayContainerWidgetProps, '$array'>> extends RegisteredWidget<P> {
	/** always be true since it is a container */
	container: true;
	/** always be true since it is for array */
	array: true;
	/** Section rendered above the array elements */
	TOP?: (props: EnhancePropsForArrayNotBody<P>) => JSX.Element;
	/** Section wrapping the array elements */
	BODY?: (props: EnhancePropsForArrayBody<P>) => JSX.Element;
	/** Section rendered when array has no elements */
	NO_ELEMENT?: (props: EnhancePropsForArrayNotBody<P>) => JSX.Element;
	/** Component used to render each individual array element (required) */
	ELEMENT: (props: EnhancePropsForArrayElement<P>) => JSX.Element;
	/** Section rendered below the array elements */
	BOTTOM?: (props: EnhancePropsForArrayNotBody<P>) => JSX.Element;
}

/**
 * Global widgets registry type
 * Maps widget type keys to their registered definitions
 */
export type WidgetsRegistrationType = {
	[key: WidgetType]: RegisteredWidget<WidgetProps>;
}

/**
 * Global in-memory widgets registry
 * Stores all registered widgets for lookup during rendering
 */
const WidgetsRegistration = {} as WidgetsRegistrationType;

/** Options for registering a new widget */
export type WidgetRegistrationOptions = RegisteredWidget<WidgetProps> & { key: WidgetType; }

/**
 * Register a new widget in the global registry
 * If a widget with the same key already exists, it will be replaced
 * @param options - Widget registration options including unique key
 * @returns The previously registered widget with the same key, if any
 */
export const registerWidget = (options: WidgetRegistrationOptions): Nullable<WidgetRegistrationOptions> => {
	const {key, ...widget} = options;
	const existing = WidgetsRegistration[key] ?? null;
	WidgetsRegistration[key] = widget;
	if (existing != null) {
		console.warn(`Widget[key=${key}, def=${JSON.stringify(existing)}] is replaced by [${JSON.stringify(widget)}]`);
	}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return {key, ...existing};
};

/**
 * Find a registered widget by its type key
 * @param key - Widget type key to look up
 * @returns Registered widget definition or null if not found
 */
export const findWidget = (key: WidgetType): Nullable<WidgetRegistrationOptions> => {
	const widget = WidgetsRegistration[key];
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return widget == null ? null : {key, ...widget};
};
