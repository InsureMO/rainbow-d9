import {useEffect, useState} from 'react';
import {useWizardEventBus} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';

export interface StepActiveState {
	active: boolean;
	done: boolean;
	reachedIndex: number;
}

export const useWizardStepActive = (stepIndex: number, marker: string) => {
	const {on, off} = useWizardEventBus();
	const [state, setState] = useState<StepActiveState>({active: false, done: false, reachedIndex: -1});
	useEffect(() => {
		const onActiveTab = (givenTabIndex: number, givenMarker: string, reachedIndex: number) => {
			if (stepIndex === givenTabIndex || marker === givenMarker) {
				setState({active: true, done: false, reachedIndex});
			} else {
				setState({active: false, done: stepIndex < givenTabIndex, reachedIndex});
			}
		};
		on(WizardEventTypes.ACTIVE_STEP, onActiveTab);
		return () => {
			off(WizardEventTypes.ACTIVE_STEP, onActiveTab);
		};
	}, [on, off, stepIndex, marker]);

	return state;
};