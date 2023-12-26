import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';
import {WizardEventBus} from './wizard-event-bus-types';

const Context = createContext<WizardEventBus>({} as WizardEventBus);
Context.displayName = 'WizardEventBus';

export const WizardEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<WizardEventBus>('wizard');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useWizardEventBus = () => useContext(Context);
