import React, {createContext, ReactNode, useContext} from 'react';
// noinspection ES6PreferShortImport
import {useCreateEventBus} from '../hooks/use-create-event-bus';
import {
	BaseModel,
	DeviceTags,
	NodeUniqueKey,
	NodeValidationScope,
	PropertyPath,
	PropValue,
	Validated,
	ValidatedSet,
	ValidationResult
} from '../types';

/**
 * Event types available on the root event bus (global scope)
 */
export enum RootEventTypes {
	/** Fired when any data value in the root model changes */
	VALUE_CHANGED = 'value-changed',
	/** Fired to trigger validation across all registered validatable widgets */
	VALIDATE = 'validate',
	/** Fired when a widget validation completes */
	VALIDATED = 'validated',
	/** Fired when a validatable widget mounts to register its validation function */
	REGISTER_VALIDATABLE = 'register-validatable',
	/** Fired when a validatable widget unmounts to unregister its validation function */
	UNREGISTER_VALIDATABLE = 'unregister-validatable',
	/** Fired when the detected device type changes (desktop/mobile) */
	DEVICE_CHANGED = 'device-changed',
	/** Fired when the application theme changes */
	THEME_CHANGED = 'theme-changed'
}

/**
 * Options passed with the VALIDATED event
 * Contains full context about the validation result
 */
export interface ValidatedOptions<R extends BaseModel, M extends PropValue, V extends PropValue> extends ValidationResult {
	/** Root data model */
	root: R;
	/** Model containing the validated field */
	model: M;
	/** Path from root to the current model */
	pathToRoot: PropertyPath;
	/** Path from current model to the validated property */
	propertyPath: PropertyPath;
	/** Absolute path from root to the validated property */
	absolutePath: PropertyPath;
	/** Value that was validated */
	value?: V;
}

/**
 * Root event bus interface (global scope)
 * Provides type-safe methods for firing and listening to global events
 */
export interface RootEventBus {
	/** Fire value changed event */
	fire(type: RootEventTypes.VALUE_CHANGED, absolutePath: PropertyPath, from: PropValue, to: PropValue): this;
	/** Listen to value changed events */
	on(type: RootEventTypes.VALUE_CHANGED, listener: (absolutePath: PropertyPath, from: PropValue, to: PropValue) => void): this;
	/** Stop listening to value changed events */
	off(type: RootEventTypes.VALUE_CHANGED, listener: (absolutePath: PropertyPath, from: PropValue, to: PropValue) => void): this;
	/** Fire global validation trigger event */
	fire(type: RootEventTypes.VALIDATE, scopes: Array<NodeValidationScope>, onValidated: (validated: ValidatedSet) => void): this;
	/** Listen to global validation trigger events */
	on(type: RootEventTypes.VALIDATE, listener: (scopes: Array<NodeValidationScope>, onValidated: (validated: ValidatedSet) => void) => void): this;
	/** Stop listening to global validation trigger events */
	off(type: RootEventTypes.VALIDATE, listener: (scopes: Array<NodeValidationScope>, onValidated: (validated: ValidatedSet) => void) => void): this;
	/** Fire validation completed event */
	fire<R extends BaseModel, M extends PropValue, V extends PropValue>(type: RootEventTypes.VALIDATED, options: ValidatedOptions<R, M, V>): this;
	/** Listen to validation completed events */
	on<R extends BaseModel, M extends PropValue, V extends PropValue>(type: RootEventTypes.VALIDATED, listener: (options: ValidatedOptions<R, M, V>) => void): this;
	/** Stop listening to validation completed events */
	off<R extends BaseModel, M extends PropValue, V extends PropValue>(type: RootEventTypes.VALIDATED, listener: (options: ValidatedOptions<R, M, V>) => void): this;
	/** Fire register validatable widget event */
	fire(type: RootEventTypes.REGISTER_VALIDATABLE, uniqueId: NodeUniqueKey, scopes: Array<NodeValidationScope>, validate: () => Promise<Validated>): this;
	/** Listen to register validatable widget events */
	on(type: RootEventTypes.REGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey, scopes: Array<NodeValidationScope>, validate: () => Promise<Validated>) => void): this;
	/** Stop listening to register validatable widget events */
	off(type: RootEventTypes.REGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey, scopes: Array<NodeValidationScope>, validate: () => Promise<Validated>) => void): this;
	/** Fire unregister validatable widget event */
	fire(type: RootEventTypes.UNREGISTER_VALIDATABLE, uniqueId: NodeUniqueKey): this;
	/** Listen to unregister validatable widget events */
	on(type: RootEventTypes.UNREGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey) => void): this;
	/** Stop listening to unregister validatable widget events */
	off(type: RootEventTypes.UNREGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey) => void): this;
	/** Fire device type changed event */
	fire(type: RootEventTypes.DEVICE_CHANGED, tags: DeviceTags): this;
	/** Listen to device type changed events */
	on(type: RootEventTypes.DEVICE_CHANGED, listener: (tags: DeviceTags) => void): this;
	/** Stop listening to device type changed events */
	off(type: RootEventTypes.DEVICE_CHANGED, listener: (tags: DeviceTags) => void): this;
	/** Fire theme changed event */
	fire(type: RootEventTypes.THEME_CHANGED, theme: string): this;
	/** Listen to theme changed events */
	on(type: RootEventTypes.THEME_CHANGED, listener: (theme: string) => void): this;
	/** Stop listening to theme changed events */
	off(type: RootEventTypes.THEME_CHANGED, listener: (theme: string) => void): this;
}

/** React context for root event bus */
const Context = createContext<RootEventBus>({} as RootEventBus);
Context.displayName = 'EventBus';

/**
 * Root event bus provider component
 * Creates and provides a global event bus instance to all child components
 * @param props - React children
 * @returns Provider component with root event bus context
 */
export const RootEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	// Create root-scoped event bus
	const bus = useCreateEventBus<RootEventBus>('d9-root');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

/**
 * Hook to access the root event bus
 * @returns Root event bus instance from context
 */
export const useRootEventBus = () => useContext(Context);
