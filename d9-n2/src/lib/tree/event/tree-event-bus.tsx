import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';
import {TreeEventBus} from './tree-event-bus-types';

const Context = createContext<TreeEventBus>({} as TreeEventBus);
Context.displayName = 'TreeEventBus';

export const TreeEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<TreeEventBus>('tree');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTreeEventBus = () => useContext(Context);
