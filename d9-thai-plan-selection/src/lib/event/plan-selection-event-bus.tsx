import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';
import {PlanSelectionEventBus} from './plan-selection-event-bus-types';

const Context = createContext<PlanSelectionEventBus>({} as PlanSelectionEventBus);
Context.displayName = 'PlanSelectionEventBus';

export const PlanSelectionEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PlanSelectionEventBus>('plan-selection');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const usePlanSelectionEventBus = () => useContext(Context);
