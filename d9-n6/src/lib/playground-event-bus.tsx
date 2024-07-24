import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';

export enum PlaygroundEventTypes {
	CONTENT_CHANGED = 'content-changed',
	RESET_CONTENT = 'reset-content',
	INIT_HELP_DOC_WIDTH = 'init-help-doc-width',
	SHOW_EDIT_DIALOG = 'show-edit-dialog',
	HIDE_EDIT_DIALOG = 'hide-edit-dialog'
}

export interface PlaygroundEventBus {
	fire(type: PlaygroundEventTypes.CONTENT_CHANGED, content?: string): this;

	on(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;

	off(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;

	fire(type: PlaygroundEventTypes.RESET_CONTENT, content: string): this;

	on(type: PlaygroundEventTypes.RESET_CONTENT, listener: (content: string) => void): this;

	off(type: PlaygroundEventTypes.RESET_CONTENT, listener: (content: string) => void): this;

	fire(type: PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, width: number): this;

	on(type: PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, listener: (width: number) => void): this;

	off(type: PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, listener: (width: number) => void): this;

	fire(type: PlaygroundEventTypes.SHOW_EDIT_DIALOG, content: ReactNode): this;

	on(type: PlaygroundEventTypes.SHOW_EDIT_DIALOG, listener: (content: ReactNode) => void): this;

	off(type: PlaygroundEventTypes.SHOW_EDIT_DIALOG, listener: (content: ReactNode) => void): this;

	fire(type: PlaygroundEventTypes.HIDE_EDIT_DIALOG): this;

	on(type: PlaygroundEventTypes.HIDE_EDIT_DIALOG, listener: () => void): this;

	off(type: PlaygroundEventTypes.HIDE_EDIT_DIALOG, listener: () => void): this;
}

const Context = createContext<PlaygroundEventBus>({} as PlaygroundEventBus);
Context.displayName = 'PlaygroundEventBus';

export const PlaygroundEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PlaygroundEventBus>('playground');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const usePlaygroundEventBus = () => useContext(Context);
