import {ReactNode} from 'react';
import {DeviceType} from './device-type';
import {ArrayPropValue, BaseModel, PropertyPath, PropValue, Undefinable, WidgetType} from './model-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NodeAttributeValue = any;

export type NodeAttributeValueHandleOptions<
	R extends BaseModel, M extends PropValue, V extends PropValue,
	FV extends PropValue, TV extends PropValue
> = {
	root: R; model: M;
	pathToRoot: PropertyPath; propertyPath: PropertyPath; absolutePath: PropertyPath; value?: V,
	changedOn: PropertyPath; from?: FV; to?: TV;
}
export type NodeAttributeValueHandle =
	<R extends BaseModel, M extends PropValue, V extends PropValue, FV extends PropValue, TV extends PropValue>
	(options: NodeAttributeValueHandleOptions<R, M, V, FV, TV>) => NodeAttributeValue | Promise<NodeAttributeValue>;

export type NodeAttributeValueInitializerOptions<R extends BaseModel, M extends PropValue, V extends PropValue> = {
	root: R; model: M; value?: V
}
export type NodeAttributeDefaultValueInitializer =
	<R extends BaseModel, M extends PropValue, V extends PropValue>
	(options: NodeAttributeValueInitializerOptions<R, M, V>) => NodeAttributeValue | Promise<NodeAttributeValue>;

export interface MonitorOthers<NAV extends NodeAttributeValue> {
	$watch: Array<PropertyPath>;
	$handle: NodeAttributeValueHandle;
	$default?: NAV | NodeAttributeDefaultValueInitializer;
}

export interface DisablementMonitor extends MonitorOthers<boolean> {
}

export interface VisibilityMonitor extends MonitorOthers<boolean> {
}

export type ValidationFailReason = string;

export interface ValidationResult {
	valid: boolean;
	failReason?: ValidationFailReason;
}

/**
 * 1. no {@code $watch} means watch myself only,
 * 2. no {@code $default},
 * 3. for {@code $handle}, when this is triggerred by {@link RootEventTypes#VALIDATE}, from value will be undefined.
 */
export interface ValidationMonitor
	extends Partial<Pick<MonitorOthers<ValidationResult>, '$watch'>>, Omit<MonitorOthers<ValidationResult>, '$watch' | '$default'> {
}

export enum Reaction {
	REPAINT = 'repaint',
	CLEAR_VALUE = 'clear-value',
	VALUE_CHANGED = 'value-changed'
}

export interface ReactionMonitor extends Omit<MonitorOthers<Undefinable<Array<Reaction> | Reaction>>, '$default'> {
}

export enum MonitorNodeAttributes {
	DISABLED = '$disabled',
	VISIBLE = '$visible',
	VALID = '$valid',
	REACTION = '$reaction'
}

export type NodeAttributeValues = {
	[MonitorNodeAttributes.DISABLED]?: boolean;
	[MonitorNodeAttributes.VISIBLE]?: boolean;
	[MonitorNodeAttributes.VALID]?: ValidationResult;
};

export interface MonitorNodeDef {
	[MonitorNodeAttributes.DISABLED]?: boolean | DisablementMonitor;
	[MonitorNodeAttributes.VISIBLE]?: boolean | VisibilityMonitor;
	[MonitorNodeAttributes.VALID]?: ValidationMonitor;
	[MonitorNodeAttributes.REACTION]?: ReactionMonitor;
}

export interface NodePosition {
	$col?: number,
	$row?: number,
	$cols?: number,
	$rows?: number
}

export type NodeUniqueKey = string;
export type NodeValidationScope = string;

/** props which declared the component */
export interface NodeDef extends MonitorNodeDef {
	/**
	 * Key of node.
	 * Typically, there should be a unique key for rendering react node as element of array.
	 * Anyway, key can be ignored here, it will be auto-generated in runtime.
	 */
	$key?: NodeUniqueKey;
	/** widget type, follow the widgets registration keys */
	$wt: WidgetType;
	// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
	// @ts-ignore
	/** property path, inherit from parent if not declared or declared as {@link PROPERTY_PATH_ME} */
	$pp?: PropertyPath;
	/** use grid system */
	$pos?: NodePosition;
	/** mobile position, also use grid system */
	$mpos?: NodePosition;
	/** validation scopes, only response to self-change and validation-all when value missed */
	$validationScopes?: Array<NodeValidationScope>;
	/** only render on given device types, multiple tags could use string with , or ; joined */
	$renderOn?: string | (() => Array<keyof DeviceType>);
}

export interface ValueChangedOptions<NV extends PropValue> {
	absolutePath: PropertyPath;
	oldValue: NV;
	newValue: NV;
}

export interface ValueChangeableNodeDef extends NodeDef {
	/** value changed, before any event fired */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	valueChanged?: <NV extends PropValue>(options: ValueChangedOptions<NV>, ...args: Array<any>) => void | Promise<void>;
}

export interface ContainerDef extends NodeDef {
	$nodes: Array<NodeDef>;
}

/**
 * the tailing args depends on widgets passed in.
 */
export interface ArrayUsedDef {
	noElementReminder?: ReactNode;
	/** default is false */
	addable?: boolean;
	addLabel?: ReactNode;
	couldAddElement?: <R extends BaseModel, M extends ArrayPropValue>(options: {
		root: R, model: M
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}, ...args: Array<any>) => Promise<boolean>;
	/** when on addable and cannot add, to disable the add button or not. default is true */
	disableOnCannotAdd?: boolean;
	/** create element before it is added into array. index is position of new one */
	createElement?: <R extends BaseModel, M extends ArrayPropValue, E extends BaseModel>(options: {
		root: R, model: M, index: number
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}, ...args: Array<any>) => E | Promise<E>;
	/** element added, before any event fired. index is position of added one in array */
	elementAdded?: <R extends BaseModel, M extends ArrayPropValue, E extends BaseModel>(options: {
		root: R, model: M, element: E, index: number
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}, ...args: Array<any>) => void | Promise<void>;
	/** default is false */
	removable?: boolean;
	removeLabel?: ReactNode;
	/** a chance to check the element could be removed or not */
	couldRemoveElement?: <R extends BaseModel, M extends ArrayPropValue, E extends BaseModel>(options: {
		root: R, model: M, element: E, index: number
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}, ...args: Array<any>) => Promise<boolean>;
	/** element removed, before any event fired. index is original position of removed one in array */
	elementRemoved?: <R extends BaseModel, M extends ArrayPropValue, E extends BaseModel>(options: {
		root: R, model: M, element: E, index: number
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}, ...args: Array<any>) => void | Promise<void>;
	/**
	 * return key of element, make sure it is stable and not impacted by element data.
	 * change leads unpredicted ui behavior.
	 * if there is no stable element key, leave this property ignored (do not pass).
	 * then array container will generate a unique key and bind with element, keep them in state.
	 */
	getElementKey?: <R extends BaseModel>(row: R) => string;
}

export interface ArrayContainerDef extends ContainerDef {
	$array?: ArrayUsedDef;
}
