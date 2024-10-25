import {useEffect, useRef, useState} from 'react';
import {useWizardEventBus} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';

interface ActiveIndicator {
	should: boolean;
	callback?: (where: 'title' | 'body' | 'share') => Promise<void>;
}

export interface StepActiveState {
	active: boolean;
	done: boolean;
	reachedIndex: number;
}

export const useWizardStepActive = (stepIndex: number, marker: string, where: 'title' | 'body' | 'share') => {
	const {on, off} = useWizardEventBus();
	const activeCallbackIndicator = useRef<ActiveIndicator>({should: false});
	const [state, setState] = useState<StepActiveState>({active: false, done: false, reachedIndex: -1});
	useEffect(() => {
		if (activeCallbackIndicator.current.should) {
			activeCallbackIndicator.current.should = false;
			// noinspection JSIgnoredPromiseFromCall
			activeCallbackIndicator.current.callback?.(where);
			delete activeCallbackIndicator.current.callback;
		}
	}, [activeCallbackIndicator.current.should, where]);
	useEffect(() => {
		const onActiveStep = (givenTabIndex: number, givenMarker: string, reachedIndex: number, onActivated?: (where: 'title' | 'body' | 'share') => Promise<void>) => {
			if (stepIndex === givenTabIndex || marker === givenMarker) {
				if (state.active) {
					// noinspection JSIgnoredPromiseFromCall
					onActivated?.(where);
				} else {
					activeCallbackIndicator.current = {should: true, callback: onActivated};
					setState({active: true, done: false, reachedIndex});
				}
			} else {
				setState({active: false, done: stepIndex < givenTabIndex, reachedIndex});
			}
		};
		on(WizardEventTypes.ACTIVE_STEP, onActiveStep);
		return () => {
			off(WizardEventTypes.ACTIVE_STEP, onActiveStep);
		};
	}, [on, off, state.active, stepIndex, marker, where]);

	return state;
};