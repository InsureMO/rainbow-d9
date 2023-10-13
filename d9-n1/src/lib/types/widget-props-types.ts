import {ReactNode} from 'react';
import {ArrayUsedDef, NodeAttributeValues, NodeValidationScope, ValidationResult} from './def-props-types';
import {ModelHolder, PropertyPath, PropValue} from './model-types';

export interface Validated extends ValidationResult {
	path: PropertyPath;
	// label?: string;
}

export interface ValidatedSet {
	failed: Array<Validated>;
	passed: Array<Validated>;
}

export type ValidateGiven = (scopes?: Array<NodeValidationScope>) => Promise<ValidatedSet>;
export type ValidateMine = () => Promise<ValidatedSet>;
export type ValidateAll = () => Promise<ValidatedSet>;

export interface ValidationFunctions {
	/** validate given scopes */
	$given: ValidateGiven;
	/**
	 * try to use my declared scopes to do validation,
	 * or try to validate array element if existing when scope not declared,
	 * or try to validate the closest container if not in array,
	 * or validate all.
	 */
	$mine: ValidateMine;
	/** validate all with same array element, it is only available when current widget is based on an array element */
	$arrayElement?: ValidateAll;
	/** validate all in the closest container, it is only available when current widget in a container */
	$closestContainer?: ValidateAll;
	/** validate all */
	$all: ValidateAll;
}

export interface WrappedNodeAttributes {
	$avs: NodeAttributeValues;
	$vfs?: ValidationFunctions;
}

export type OnValueChanged = <NV extends PropValue>(options: {
	absolutePath: PropertyPath; oldValue: NV; newValue: NV;
}) => void | Promise<void>;
export type OnValueChange = <NV extends PropValue>(newValue: NV, doForceUpdate?: boolean) => void | Promise<void>;

export interface WrappedAttributes extends ModelHolder, WrappedNodeAttributes {
	/**
	 * handle value change of widget, do the following:
	 * 1. retrieve old value from model,
	 * 2. set new value to model,
	 * 3. fire {@link RootEventTypes.VALUE_CHANGED} event
	 * @param newValue new value
	 */
	$onValueChange: OnValueChange;
}

/**
 * Props which is passed to the real component
 */
export interface WidgetProps {
	/** wrapper is internal use, never set anything in it */
	$wrapped: WrappedAttributes;
}

export interface ContainerWidgetProps extends WidgetProps {
	/** same as react children property, pass rendered children widgets to container */
	children: ReactNode;
}

export interface ArrayContainerWidgetProps extends ContainerWidgetProps {
	$array: ArrayUsedDef;
}