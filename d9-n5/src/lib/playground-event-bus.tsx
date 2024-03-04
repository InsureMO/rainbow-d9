import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';

export enum PlaygroundEventTypes {
	CONTENT_INITIALIZED = 'content-initialized',
	CONTENT_CHANGED = 'content-changed',
}

export interface PlaygroundEventBus {
	fire(type: PlaygroundEventTypes.CONTENT_INITIALIZED, content?: string): this;

	on(type: PlaygroundEventTypes.CONTENT_INITIALIZED, listener: (content?: string) => void): this;

	off(type: PlaygroundEventTypes.CONTENT_INITIALIZED, listener: (content?: string) => void): this;

	fire(type: PlaygroundEventTypes.CONTENT_CHANGED, content?: string): this;

	on(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;

	off(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;
}

const Context = createContext<PlaygroundEventBus>({} as PlaygroundEventBus);
Context.displayName = 'EventBus';

export const PlaygroundEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PlaygroundEventBus>('d9-playground');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const usePlaygroundEventBus = () => useContext(Context);
