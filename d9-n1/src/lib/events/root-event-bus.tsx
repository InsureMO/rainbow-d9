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

export enum RootEventTypes {
	VALUE_CHANGED = 'value-changed',
	VALIDATE = 'validate',
	VALIDATED = 'validated',
	REGISTER_VALIDATABLE = 'register-validatable',
	UNREGISTER_VALIDATABLE = 'unregister-validatable',
	DEVICE_CHANGED = 'device-changed',
}

export interface ValidatedOptions<R extends BaseModel, M extends PropValue, V extends PropValue> extends ValidationResult {
	root: R;
	model: M;
	pathToRoot: PropertyPath;
	propertyPath: PropertyPath;
	absolutePath: PropertyPath;
	value?: V;
}

export interface RootEventBus {
	fire(type: RootEventTypes.VALUE_CHANGED, absolutePath: PropertyPath, from: PropValue, to: PropValue): this;

	on(type: RootEventTypes.VALUE_CHANGED, listener: (absolutePath: PropertyPath, from: PropValue, to: PropValue) => void): this;

	off(type: RootEventTypes.VALUE_CHANGED, listener: (absolutePath: PropertyPath, from: PropValue, to: PropValue) => void): this;

	fire(type: RootEventTypes.VALIDATE, scopes: Array<NodeValidationScope>, onValidated: (validated: ValidatedSet) => void): this;

	on(type: RootEventTypes.VALIDATE, listener: (scopes: Array<NodeValidationScope>, onValidated: (validated: ValidatedSet) => void) => void): this;

	off(type: RootEventTypes.VALIDATE, listener: (scopes: Array<NodeValidationScope>, onValidated: (validated: ValidatedSet) => void) => void): this;

	fire<R extends BaseModel, M extends PropValue, V extends PropValue>(type: RootEventTypes.VALIDATED, options: ValidatedOptions<R, M, V>): this;

	on<R extends BaseModel, M extends PropValue, V extends PropValue>(type: RootEventTypes.VALIDATED, listener: (options: ValidatedOptions<R, M, V>) => void): this;

	off<R extends BaseModel, M extends PropValue, V extends PropValue>(type: RootEventTypes.VALIDATED, listener: (options: ValidatedOptions<R, M, V>) => void): this;

	fire(type: RootEventTypes.REGISTER_VALIDATABLE, uniqueId: NodeUniqueKey, scopes: Array<NodeValidationScope>, validate: () => Promise<Validated>): this;

	on(type: RootEventTypes.REGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey, scopes: Array<NodeValidationScope>, validate: () => Promise<Validated>) => void): this;

	off(type: RootEventTypes.REGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey, scopes: Array<NodeValidationScope>, validate: () => Promise<Validated>) => void): this;

	fire(type: RootEventTypes.UNREGISTER_VALIDATABLE, uniqueId: NodeUniqueKey): this;

	on(type: RootEventTypes.UNREGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey) => void): this;

	off(type: RootEventTypes.UNREGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey) => void): this;

	fire(type: RootEventTypes.DEVICE_CHANGED, tags: DeviceTags): this;

	on(type: RootEventTypes.DEVICE_CHANGED, listener: (tags: DeviceTags) => void): this;

	off(type: RootEventTypes.DEVICE_CHANGED, listener: (tags: DeviceTags) => void): this;
}

const Context = createContext<RootEventBus>({} as RootEventBus);
Context.displayName = 'EventBus';

export const RootEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<RootEventBus>('d9-root');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useRootEventBus = () => useContext(Context);
