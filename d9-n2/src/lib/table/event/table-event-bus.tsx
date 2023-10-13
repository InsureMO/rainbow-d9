import {useCreateEventBus} from '@d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';
import {TableEventBus} from './table-event-bus-types';

const Context = createContext<TableEventBus>({} as TableEventBus);
Context.displayName = 'TableEventBus';

export const TableEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<TableEventBus>('table');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTableEventBus = () => useContext(Context);
