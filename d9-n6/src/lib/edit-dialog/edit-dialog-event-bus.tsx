import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';

export enum EditDialogEventTypes {
	OPEN_HELP_DESK = 'open-help-desk',
	CLOSE_HELP_DESK = 'close-help-desk',
	ASK_HELP_DESK_OPENED = 'ask-help-desk-opened',

	ELEMENT_VALUE_CHANGED = 'element-value-changed',

	LOCATE_ELEMENT = 'locate-element'
}

export interface EditDialogEventBus {
	fire(type: EditDialogEventTypes.OPEN_HELP_DESK): this;

	on(type: EditDialogEventTypes.OPEN_HELP_DESK, listener: () => void): this;

	off(type: EditDialogEventTypes.OPEN_HELP_DESK, listener: () => void): this;

	fire(type: EditDialogEventTypes.CLOSE_HELP_DESK): this;

	on(type: EditDialogEventTypes.CLOSE_HELP_DESK, listener: () => void): this;

	off(type: EditDialogEventTypes.CLOSE_HELP_DESK, listener: () => void): this;

	fire(type: EditDialogEventTypes.ASK_HELP_DESK_OPENED, callback: (opened: boolean) => void): this;

	on(type: EditDialogEventTypes.ASK_HELP_DESK_OPENED, listener: (callback: (opened: boolean) => void) => void): this;

	off(type: EditDialogEventTypes.ASK_HELP_DESK_OPENED, listener: (callback: (opened: boolean) => void) => void): this;

	fire(type: EditDialogEventTypes.ELEMENT_VALUE_CHANGED, anchor: string): this;

	on(type: EditDialogEventTypes.ELEMENT_VALUE_CHANGED, listener: (anchor: string) => void): this;

	off(type: EditDialogEventTypes.ELEMENT_VALUE_CHANGED, listener: (anchor: string) => void): this;

	fire(type: EditDialogEventTypes.LOCATE_ELEMENT, anchor: string): this;

	on(type: EditDialogEventTypes.LOCATE_ELEMENT, listener: (anchor: string) => void): this;

	off(type: EditDialogEventTypes.LOCATE_ELEMENT, listener: (anchor: string) => void): this;
}

const Context = createContext<EditDialogEventBus>({} as EditDialogEventBus);
Context.displayName = 'EditDialogEventBus';

export const EditDialogEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<EditDialogEventBus>('edit-dialog');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useEditDialogEventBus = () => useContext(Context);
