import {useCreateEventBus, WidgetType} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';
import {PlaygroundWidgetGroupKey} from './types';

export enum PlaygroundEventTypes {
	SWITCH_EDITOR_BADGE = 'switch-editor-badge',
	MAXIMIZE = 'maximize',
	QUIT_MAXIMIZE = 'quit-maximize',
	ZEN = 'zen',
	QUIT_ZEN = 'quit-zen',
	WIDGET_GROUP_CHANGE = 'widget-group-change',
	RESIZE_EDITOR = 'resize-editor',

	CONTENT_CHANGED = 'content-changed',

	INSERT_WIDGET_TEMPLATE = 'insert-widget-template',
	SHOW_WIDGET_TEMPLATE_DIALOG = 'show-widget-template-dialog'
}

/** should be -1 if there is no cursor */
export interface EditorCursor {
	start: number;
	end: number;
	row: number;
	column: number;
}

export interface PlaygroundEventBus {
	fire(type: PlaygroundEventTypes.SWITCH_EDITOR_BADGE, visible: boolean): this;

	on(type: PlaygroundEventTypes.SWITCH_EDITOR_BADGE, listener: (visible: boolean) => void): this;

	off(type: PlaygroundEventTypes.SWITCH_EDITOR_BADGE, listener: (visible: boolean) => void): this;

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

	fire(type: PlaygroundEventTypes.WIDGET_GROUP_CHANGE, group: PlaygroundWidgetGroupKey | string): this;

	on(type: PlaygroundEventTypes.WIDGET_GROUP_CHANGE, listener: (group: PlaygroundWidgetGroupKey | string) => void): this;

	off(type: PlaygroundEventTypes.WIDGET_GROUP_CHANGE, listener: (group: PlaygroundWidgetGroupKey | string) => void): this;

	fire(type: PlaygroundEventTypes.RESIZE_EDITOR, width: number): this;

	on(type: PlaygroundEventTypes.RESIZE_EDITOR, listener: (width: number) => void): this;

	off(type: PlaygroundEventTypes.RESIZE_EDITOR, listener: (width: number) => void): this;

	fire(type: PlaygroundEventTypes.CONTENT_CHANGED, content?: string): this;

	on(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;

	off(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;

	fire(type: PlaygroundEventTypes.INSERT_WIDGET_TEMPLATE, keyOrWidgetType: WidgetType | string): this;

	on(type: PlaygroundEventTypes.INSERT_WIDGET_TEMPLATE, listener: (keyOrWidgetType: WidgetType | string) => void): this;

	off(type: PlaygroundEventTypes.INSERT_WIDGET_TEMPLATE, listener: (keyOrWidgetType: WidgetType | string) => void): this;

	fire(type: PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType: WidgetType | string, prefix: string, reason: ReactNode): this;

	on(type: PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, listener: (keyOrWidgetType: WidgetType | string, prefix: string, reason: ReactNode) => void): this;

	off(type: PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, listener: (keyOrWidgetType: WidgetType | string, prefix: string, reason: ReactNode) => void): this;
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
