import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';

export enum DialogSpecificElementEventTypes {
	EXPAND = 'expand', COLLAPSE = 'collapse',

	ASK_EXPAND = 'ask-expand'
}

export interface DialogSpecificElementEventBus {
	fire(type: DialogSpecificElementEventTypes.EXPAND): this;

	on(type: DialogSpecificElementEventTypes.EXPAND, listener: () => void): this;

	off(type: DialogSpecificElementEventTypes.EXPAND, listener: () => void): this;

	fire(type: DialogSpecificElementEventTypes.COLLAPSE): this;

	on(type: DialogSpecificElementEventTypes.COLLAPSE, listener: () => void): this;

	off(type: DialogSpecificElementEventTypes.COLLAPSE, listener: () => void): this;

	fire(type: DialogSpecificElementEventTypes.ASK_EXPAND): this;

	on(type: DialogSpecificElementEventTypes.ASK_EXPAND, listener: () => void): this;

	off(type: DialogSpecificElementEventTypes.ASK_EXPAND, listener: () => void): this;
}

const Context = createContext<DialogSpecificElementEventBus>({} as DialogSpecificElementEventBus);
Context.displayName = 'DialogSpecificElementEventBus';

export const DialogSpecificElementEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<DialogSpecificElementEventBus>('dialog-specific-element');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useDialogSpecificElementEventBus = () => useContext(Context);
