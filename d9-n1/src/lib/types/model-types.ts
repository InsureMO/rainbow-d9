export type NullPropValue = null | undefined;
export type PrimitivePropValue = string | number | boolean;

export interface ObjectPropValue {
	[key: string]: PropValue;
}

export type NonArrayPropValue = NullPropValue | PrimitivePropValue | ObjectPropValue;
/** no nested array allowed */
export type ArrayPropValue = Array<NonArrayPropValue>;

export type PropValue = NonArrayPropValue | ArrayPropValue;
export type BaseModel = ObjectPropValue;
export type PropertyPath = string;

/** Widget types */
export type WidgetType = string;

export interface ModelHolder {
	/**
	 * Root data model, use current if it is not declared.
	 */
	$root?: BaseModel;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	/**
	 * Path from root to current. Value will be ignored and force set to {@link PROPERTY_PATH_ME} when {@link #$root} is not declared.
	 */
	$p2r?: PropertyPath;
	/**
	 * Current data model. In some case, model is not an object, maybe it is just a primitive value.
	 */
	$model: PropValue;
}

export type Nullable<T> = T | null | undefined;
export type Undefinable<T> = T | undefined;
