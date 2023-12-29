import React, {createContext, ReactNode, useContext} from 'react';
// noinspection ES6PreferShortImport
import {useCreateEventBus} from '../hooks/use-create-event-bus';
import {PropValue} from '../types';

export enum WrapperEventTypes {
	REPAINT = 'repaint',
	VALIDATE = 'validate',
	UNHANDLED_REACTION_OCCURRED = 'unhandled-reaction-occurred'
}

export interface WrapperEventBus {
	fire(type: WrapperEventTypes.REPAINT): this;

	on(type: WrapperEventTypes.REPAINT, listener: () => void): this;

	off(type: WrapperEventTypes.REPAINT, listener: () => void): this;

	fire(type: WrapperEventTypes.VALIDATE, from: PropValue, to: PropValue): this;

	on(type: WrapperEventTypes.VALIDATE, listener: (from: PropValue, to: PropValue) => void): this;

	off(type: WrapperEventTypes.VALIDATE, listener: (from: PropValue, to: PropValue) => void): this;

	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	fire(type: WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, reactionCommand: any): this;

	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	on(type: WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, listener: (reactionCommand: any) => void): this;

	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	off(type: WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, listener: (reactionCommand: any) => void): this;
}

const Context = createContext<WrapperEventBus>({} as WrapperEventBus);
Context.displayName = 'EventBus';

export const WrapperEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<WrapperEventBus>('d9-wrapper');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useWrapperEventBus = () => useContext(Context);
