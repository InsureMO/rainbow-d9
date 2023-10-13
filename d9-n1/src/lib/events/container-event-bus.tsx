import React, {createContext, ReactNode, useContext} from 'react';
// noinspection ES6PreferShortImport
import {useCreateEventBus} from '../hooks/use-create-event-bus';
import {NodeUniqueKey, Validated, ValidatedSet} from '../types';

export enum ContainerEventTypes {
	VALIDATE = 'validate',
	REGISTER_VALIDATABLE = 'register-validatable',
	UNREGISTER_VALIDATABLE = 'unregister-validatable'
}

export interface ContainerEventBus {
	fire(type: ContainerEventTypes.VALIDATE, onValidate: (validated: ValidatedSet) => void): this;
	on(type: ContainerEventTypes.VALIDATE, listener: (onValidate: (validated: ValidatedSet) => void) => void): this;
	off(type: ContainerEventTypes.VALIDATE, listener: (onValidate: (validated: ValidatedSet) => void) => void): this;

	fire(type: ContainerEventTypes.REGISTER_VALIDATABLE, uniqueId: NodeUniqueKey, validate: () => Promise<Validated>): this;
	on(type: ContainerEventTypes.REGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey, validate: () => Promise<Validated>) => void): this;
	off(type: ContainerEventTypes.REGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey, validate: () => Promise<Validated>) => void): this;

	fire(type: ContainerEventTypes.UNREGISTER_VALIDATABLE, uniqueId: NodeUniqueKey): this;
	on(type: ContainerEventTypes.UNREGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey) => void): this;
	off(type: ContainerEventTypes.UNREGISTER_VALIDATABLE, listener: (uniqueId: NodeUniqueKey) => void): this;
}

const Context = createContext<ContainerEventBus>({} as ContainerEventBus);
Context.displayName = 'EventBus';

export const ContainerEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<ContainerEventBus>('d9-container');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useContainerEventBus = () => useContext(Context);
