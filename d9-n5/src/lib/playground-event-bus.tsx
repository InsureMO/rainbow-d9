import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';

export enum WidgetGroup {
	CONTAINERS = 'container-group',
	INPUTS = 'input-group',
	OPTIONS = 'options-group',
	DISPLAY = 'display-group'
}

export enum PlaygroundEventTypes {
	MAXIMIZE = 'maximize',
	QUIT_MAXIMIZE = 'quit-maximize',
	ZEN = 'zen',
	QUIT_ZEN = 'quit-zen',
	WIDGET_GROUP_CHANGE = 'widget-group-change',

	CONTENT_INITIALIZED = 'content-initialized',
	CONTENT_CHANGED = 'content-changed',
}

export interface PlaygroundEventBus {
	fire(type: PlaygroundEventTypes.MAXIMIZE): this;

	on(type: PlaygroundEventTypes.MAXIMIZE, listener: () => void): this;

	off(type: PlaygroundEventTypes.MAXIMIZE, listener: () => void): this;

	fire(type: PlaygroundEventTypes.QUIT_MAXIMIZE): this;

	on(type: PlaygroundEventTypes.QUIT_MAXIMIZE, listener: () => void): this;

	off(type: PlaygroundEventTypes.QUIT_MAXIMIZE, listener: () => void): this;

	fire(type: PlaygroundEventTypes.ZEN): this;

	on(type: PlaygroundEventTypes.ZEN, listener: () => void): this;

	off(type: PlaygroundEventTypes.ZEN, listener: () => void): this;

	fire(type: PlaygroundEventTypes.QUIT_ZEN): this;

	on(type: PlaygroundEventTypes.QUIT_ZEN, listener: () => void): this;

	off(type: PlaygroundEventTypes.QUIT_ZEN, listener: () => void): this;

	fire(type: PlaygroundEventTypes.WIDGET_GROUP_CHANGE, group: WidgetGroup): this;

	on(type: PlaygroundEventTypes.WIDGET_GROUP_CHANGE, listener: (group: WidgetGroup) => void): this;

	off(type: PlaygroundEventTypes.WIDGET_GROUP_CHANGE, listener: (group: WidgetGroup) => void): this;

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
