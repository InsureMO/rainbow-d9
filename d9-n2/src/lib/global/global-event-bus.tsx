import {BaseModel, PropValue, useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, CSSProperties, ReactNode, useContext} from 'react';

export enum GlobalEventTypes {
	INVOKE_REMOTE_REQUEST = 'invoke-remote-request',
	SHOW_ALERT = 'show-alert',
	HIDE_ALERT = 'hide-alert',
	SHOW_DIALOG = 'show-dialog',
	HIDE_DIALOG = 'hide-dialog',
	SHOW_YES_NO_DIALOG = 'show-yes-no-dialog',
	CUSTOM_EVENT = 'custom-event'
}

export interface GlobalEventBus {
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	fire<R>(type: GlobalEventTypes.INVOKE_REMOTE_REQUEST, request: () => Promise<R>, success?: (data: R) => void, failure?: (error?: any) => void, disableAlert?: boolean): this;

	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	on(type: GlobalEventTypes.INVOKE_REMOTE_REQUEST, listener: (request: () => Promise<any>, success?: (data: any) => void, failure?: (error?: any) => void, disableAlert?: boolean) => void): this;

	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	off(type: GlobalEventTypes.INVOKE_REMOTE_REQUEST, listener: (request: () => Promise<any>, success?: (data: any) => void, failure?: (error?: any) => void, disableAlert?: boolean) => void): this;

	fire(type: GlobalEventTypes.SHOW_ALERT, content?: ReactNode, onHide?: () => void): this;

	on(type: GlobalEventTypes.SHOW_ALERT, listener: (content?: ReactNode, onHide?: () => void) => void): this;

	off(type: GlobalEventTypes.SHOW_ALERT, listener: (content?: ReactNode, onHide?: () => void) => void): this;

	fire(type: GlobalEventTypes.HIDE_ALERT): this;

	on(type: GlobalEventTypes.HIDE_ALERT, listener: () => void): this;

	off(type: GlobalEventTypes.HIDE_ALERT, listener: () => void): this;

	fire(type: GlobalEventTypes.SHOW_DIALOG, content?: ReactNode, wrapperStyle?: CSSProperties): this;

	on(type: GlobalEventTypes.SHOW_DIALOG, listener: (content?: ReactNode, wrapperStyle?: CSSProperties) => void): this;

	off(type: GlobalEventTypes.SHOW_DIALOG, listener: (content?: ReactNode, wrapperStyle?: CSSProperties) => void): this;

	fire(type: GlobalEventTypes.HIDE_DIALOG): this;

	on(type: GlobalEventTypes.HIDE_DIALOG, listener: () => void): this;

	off(type: GlobalEventTypes.HIDE_DIALOG, listener: () => void): this;

	fire(type: GlobalEventTypes.SHOW_YES_NO_DIALOG, question: ReactNode, onYes: () => void, onNo: () => void): this;

	on(type: GlobalEventTypes.SHOW_YES_NO_DIALOG, listener: (question: ReactNode, onYes: () => void, onNo: () => void) => void): this;

	off(type: GlobalEventTypes.SHOW_YES_NO_DIALOG, listener: (question: ReactNode, onYes: () => void, onNo: () => void) => void): this;

	fire<R extends BaseModel, M extends PropValue>(
		type: GlobalEventTypes.CUSTOM_EVENT,
		key: string, prefix: string, clipped: string, models?: { root: R; model: M; }): this;

	on<R extends BaseModel, M extends PropValue>(
		type: GlobalEventTypes.CUSTOM_EVENT,
		listener: (key: string, prefix: string, clipped: string, models?: { root: R; model: M; }) => void): this;

	off<R extends BaseModel, M extends PropValue>(
		type: GlobalEventTypes.CUSTOM_EVENT,
		listener: (key: string, prefix: string, clipped: string, models?: { root: R; model: M; }) => void): this;
}

const Context = createContext<GlobalEventBus>({} as GlobalEventBus);
Context.displayName = 'GlobalEventBus';

export const GlobalEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<GlobalEventBus>('d9-global');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useGlobalEventBus = () => useContext(Context);
