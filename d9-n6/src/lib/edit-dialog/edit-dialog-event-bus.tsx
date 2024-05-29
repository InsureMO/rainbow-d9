import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';

export enum EditDialogEventTypes {
	OPEN_HELP_DESK = 'open-help-desk',
	CLOSE_HELP_DESK = 'close-help-desk',
	ASK_HELP_DESK_OPENED = 'ask-help-desk-opened'
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
