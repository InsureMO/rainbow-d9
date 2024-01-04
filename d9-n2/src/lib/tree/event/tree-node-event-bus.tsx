import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';
import {TreeNodeEventBus} from './tree-node-event-bus-types';

const Context = createContext<TreeNodeEventBus>({} as TreeNodeEventBus);
Context.displayName = 'TreeNodeEventBus';

export const TreeNodeEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<TreeNodeEventBus>('tree-node');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTreeNodeEventBus = () => useContext(Context);
