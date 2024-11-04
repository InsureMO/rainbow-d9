import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect, useRef} from 'react';
import {useWizardEventBus} from './event/wizard-event-bus';
import {WizardEventTypes} from './event/wizard-event-bus-types';

interface RefreshIndicator {
	should: boolean;
	callback?: (where: 'title' | 'body') => Promise<void>;
}

export const useWizardStepContentRefresh = (tabIndex: number, marker: string, where: 'title' | 'body') => {
	const {on, off} = useWizardEventBus();
	const refreshIndicator = useRef<RefreshIndicator>({should: false});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (refreshIndicator.current.should) {
			refreshIndicator.current.should = false;
			// noinspection JSIgnoredPromiseFromCall
			refreshIndicator.current.callback?.(where);
			delete refreshIndicator.current.callback;
			// to update this side effect, since should in dependency is true, and value in ref is false now
			// but react doesn't know it!
			forceUpdate();
		}
	}, [refreshIndicator.current.should, where, forceUpdate]);
	useEffect(() => {
		const onActiveStep = (givenTabIndex: number, givenMarker: string, onRefreshed?: (where: 'title' | 'body') => Promise<void>) => {
			if (tabIndex === givenTabIndex || marker === givenMarker) {
				refreshIndicator.current = {should: true, callback: onRefreshed};
				forceUpdate();
			}
		};
		on(WizardEventTypes.REFRESH_STEP_CONTENT, onActiveStep);
		return () => {
			off(WizardEventTypes.REFRESH_STEP_CONTENT, onActiveStep);
		};
	}, [on, off, forceUpdate, tabIndex, marker]);
};