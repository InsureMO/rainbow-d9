import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect} from 'react';
import {useWizardEventBus} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';

export const useWizardStepContentRefresh = (tabIndex: number, marker: string) => {
	const {on, off} = useWizardEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onActiveStep = (givenTabIndex: number, givenMarker: string) => {
			if (tabIndex === givenTabIndex || marker === givenMarker) {
				forceUpdate();
			}
		};
		on(WizardEventTypes.REFRESH_STEP_CONTENT, onActiveStep);
		return () => {
			off(WizardEventTypes.REFRESH_STEP_CONTENT, onActiveStep);
		};
	}, [on, off, forceUpdate, tabIndex, marker]);
};