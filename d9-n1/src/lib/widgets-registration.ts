import {
	ArrayContainerWidgetProps,
	ArrayUsedDef,
	BaseModel,
	ContainerWidgetProps,
	WidgetProps,
	WidgetType
} from './types';

/**
 * Registered widget
 */
export interface RegisteredWidget<P extends WidgetProps> {
	/** react node, jsx syntax */
	JSX: (props: P) => JSX.Element;
	/** is container or not */
	container: boolean;
	/** is array container or not */
	array: boolean;
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

export interface EnhancedPropsForArray extends ArrayUsedDef {
	removeElement: (element: BaseModel, index: number) => Promise<void>;
	addElement: () => Promise<void>;
	hasElement: boolean;
	clearElement: () => Promise<void>;
}

export interface EnhancedPropsForArrayElement extends Omit<EnhancedPropsForArray, 'removeElement'> {
	elementIndex: number;
	removeElement: () => Promise<void>;
}

export type EnhancePropsForArray<T> = T & { $array: EnhancedPropsForArray };
export type EnhancePropsForArrayBody<T extends Omit<ArrayContainerWidgetProps, '$array'>> = EnhancePropsForArray<Omit<T, '$array'>>;
export type EnhancePropsForArrayNotBody<T extends Omit<ArrayContainerWidgetProps, '$array'>> = EnhancePropsForArray<Omit<T, 'children' | '$array'>>;
export type Enhance$WrappedPropsForArrayElement<T extends WidgetProps> = Omit<T, '$wrapped'> & {
	$wrapped: T['$wrapped'] & { $array: Array<BaseModel> }
}
export type EnhancePropsForArrayElement<T extends WidgetProps> = Enhance$WrappedPropsForArrayElement<T> & {
	$array: EnhancedPropsForArrayElement
};

/**
 * Array widget
 */
export interface RegisteredArrayContainerWidget<P extends Omit<ArrayContainerWidgetProps, '$array'>> extends RegisteredWidget<P> {
	/** always be true since it is a container */
	container: true;
	/** always be true since it is for array */
	array: true;
	TOP?: (props: EnhancePropsForArrayNotBody<P>) => JSX.Element;
	BODY?: (props: EnhancePropsForArrayBody<P>) => JSX.Element;
	NO_ELEMENT?: (props: EnhancePropsForArrayNotBody<P>) => JSX.Element;
	ELEMENT: (props: EnhancePropsForArrayElement<P>) => JSX.Element;
	BOTTOM?: (props: EnhancePropsForArrayNotBody<P>) => JSX.Element;
}

/**
 * Widgets registration.
 */
export type WidgetsRegistrationType = {
	[key: WidgetType]: RegisteredWidget<WidgetProps>;
}

/**
 * Registration to register real component
 */
const WidgetsRegistration = {} as WidgetsRegistrationType;

export type WidgetRegistrationOptions = RegisteredWidget<WidgetProps> & { key: WidgetType; }

/**
 * register given widget and return existing if there is
 * @param options
 */
export const registerWidget = (options: WidgetRegistrationOptions): WidgetRegistrationOptions | null => {
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

export const findWidget = (key: WidgetType): WidgetRegistrationOptions | null => {
	const widget = WidgetsRegistration[key];
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return widget == null ? null : {key, ...widget};
};
