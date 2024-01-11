import React, {createContext, ReactNode, useContext} from 'react';
import {useCreateEventBus} from '../hooks';

export type BridgeEventTypes = string;
export type BridgeEventListener<T> = (arg: T) => void;
export type BridgeEventNoArgListener = () => void;

export interface BridgeEventBus {
	fire<T>(type: BridgeEventTypes, arg: T): this;

	fireNoArg(type: BridgeEventTypes): this;

	on<T>(type: BridgeEventTypes, listener: (arg: T) => void): this;

	off<T>(type: BridgeEventTypes, listener: (arg: T) => void): this;
}

const Context = createContext<BridgeEventBus>({} as BridgeEventBus);
Context.displayName = 'BridgeEventBus';

/**
 * bridge event bus provider should be out of everything, so that it can receive events from everywhere
 */
export const BridgeEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<BridgeEventBus>('bridge-event-bus');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useBridgeEventBus = () => useContext(Context);
