import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';
import {TabsEventBus} from './tabs-event-bus-types';

const Context = createContext<TabsEventBus>({} as TabsEventBus);
Context.displayName = 'TabsEventBus';

export const TabsEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<TabsEventBus>('tabs');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTabsEventBus = () => useContext(Context);
