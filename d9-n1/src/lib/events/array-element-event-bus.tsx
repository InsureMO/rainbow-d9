import React, {createContext, ReactNode, useContext} from 'react';
// noinspection ES6PreferShortImport
import {useCreateEventBus} from '../hooks/use-create-event-bus';
import {NodeUniqueKey, Validated, ValidatedSet} from '../types';

export enum ArrayElementEventTypes {
	VALIDATE = 'validate',
	REGISTER_VALIDATABLE = 'register-validatable',
	UNREGISTER_VALIDATABLE = 'unregister-validatable'
}

export interface ArrayElementEventBus {
	fire(type: ArrayElementEventTypes.VALIDATE, onValidate: (validated: ValidatedSet) => void): this;
	on(type: ArrayElementEventTypes.VALIDATE, listener: (onValidate: (validated: ValidatedSet) => void) => void): this;
	off(type: ArrayElementEventTypes.VALIDATE, listener: (onValidate: (validated: ValidatedSet) => void) => void): this;

	fire(type: ArrayElementEventTypes.REGISTER_VALIDATABLE, uniqueId: NodeUniqueKey, validate: () => Promise<Validated>): this;
	on(type: ArrayElementEventTypes.REGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey, validate: () => Promise<Validated>) => void): this;
	off(type: ArrayElementEventTypes.REGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey, validate: () => Promise<Validated>) => void): this;

	fire(type: ArrayElementEventTypes.UNREGISTER_VALIDATABLE, uniqueId: NodeUniqueKey): this;
	on(type: ArrayElementEventTypes.UNREGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey) => void): this;
	off(type: ArrayElementEventTypes.UNREGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey) => void): this;
}

const Context = createContext<ArrayElementEventBus>({} as ArrayElementEventBus);
Context.displayName = 'ArrayElementEventBus';

export const ArrayElementEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ArrayElementEventBus>('d9-array-element');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useArrayElementEventBus = () => useContext(Context);
