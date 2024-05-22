import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';

export enum PlaygroundEventTypes {
	CONTENT_CHANGED = 'content-changed',

	FORCE_UPDATE_EDITOR = 'force-update-editor',
}

export interface PlaygroundEventBus {
	fire(type: PlaygroundEventTypes.CONTENT_CHANGED, content?: string): this;

	on(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;

	off(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;

	fire(type: PlaygroundEventTypes.FORCE_UPDATE_EDITOR): this;

	on(type: PlaygroundEventTypes.FORCE_UPDATE_EDITOR, listener: () => void): this;

	off(type: PlaygroundEventTypes.FORCE_UPDATE_EDITOR, listener: () => void): this;
}

const Context = createContext<PlaygroundEventBus>({} as PlaygroundEventBus);
Context.displayName = 'EventBus';

export const PlaygroundEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PlaygroundEventBus>('o23-playground');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const usePlaygroundEventBus = () => useContext(Context);
