import {BaseModel, PropValue, useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, CSSProperties, MutableRefObject, ReactNode, useContext} from 'react';
import {ModelCarrier} from '../types';
import {TipOptions} from './tip';

export enum GlobalEventTypes {
	LANGUAGE_CHANGED = 'language-changed',
	INVOKE_REMOTE_REQUEST = 'invoke-remote-request',
	SHOW_ALERT = 'show-alert',
	HIDE_ALERT = 'hide-alert',
	SHOW_DIALOG = 'show-dialog',
	HIDE_DIALOG = 'hide-dialog',
	SHOW_YES_NO_DIALOG = 'show-yes-no-dialog',
	SHOW_TIP = 'show-tip',
	HIDE_TIP = 'hide-tip',
	REPAINT_TIP = 'repaint-tip',
	CUSTOM_EVENT = 'custom-event'
}

export interface GlobalEventBus {
	fire(type: GlobalEventTypes.LANGUAGE_CHANGED, language: string): this;
	on(type: GlobalEventTypes.LANGUAGE_CHANGED, listener: (language: string) => void): this;
	off(type: GlobalEventTypes.LANGUAGE_CHANGED, listener: (language: string) => void): this;
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
	fire(type: GlobalEventTypes.SHOW_TIP, options: TipOptions): this;
	on(type: GlobalEventTypes.SHOW_TIP, listener: (options: TipOptions) => void): this;
	off(type: GlobalEventTypes.SHOW_TIP, listener: (options: TipOptions) => void): this;
	fire(type: GlobalEventTypes.HIDE_TIP, ref: MutableRefObject<HTMLElement>): this;
	on(type: GlobalEventTypes.HIDE_TIP, listener: (ref: MutableRefObject<HTMLElement>) => void): this;
	off(type: GlobalEventTypes.HIDE_TIP, listener: (ref: MutableRefObject<HTMLElement>) => void): this;
	fire(type: GlobalEventTypes.REPAINT_TIP, options: TipOptions): this;
	on(type: GlobalEventTypes.REPAINT_TIP, listener: (options: TipOptions) => void): this;
	off(type: GlobalEventTypes.REPAINT_TIP, listener: (options: TipOptions) => void): this;
	fire<R extends BaseModel, M extends PropValue>(
		type: GlobalEventTypes.CUSTOM_EVENT,
		key: string, prefix: string, clipped: string, models?: ModelCarrier<R, M>, callback?: () => Promise<void>): this;
	on<R extends BaseModel, M extends PropValue>(
		type: GlobalEventTypes.CUSTOM_EVENT,
		listener: (key: string, prefix: string, clipped: string, models?: ModelCarrier<R, M>, callback?: () => Promise<void>) => void): this;
	off<R extends BaseModel, M extends PropValue>(
		type: GlobalEventTypes.CUSTOM_EVENT,
		listener: (key: string, prefix: string, clipped: string, models?: ModelCarrier<R, M>, callback?: () => Promise<void>) => void): this;
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
