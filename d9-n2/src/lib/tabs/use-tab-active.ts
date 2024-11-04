import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect, useRef, useState} from 'react';
import {useTabsEventBus} from './event/tabs-event-bus';
import {TabsEventTypes} from './event/tabs-event-bus-types';

interface ActiveIndicator {
	should: boolean;
	callback?: (where: 'title' | 'body') => Promise<void>;
}

export const useTabActive = (tabIndex: number, marker: string, where: 'title' | 'body') => {
	const {on, off} = useTabsEventBus();
	const activeCallbackIndicator = useRef<ActiveIndicator>({should: false});
	const [active, setActive] = useState(false);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (activeCallbackIndicator.current.should) {
			activeCallbackIndicator.current.should = false;
			// noinspection JSIgnoredPromiseFromCall
			activeCallbackIndicator.current.callback?.(where);
			delete activeCallbackIndicator.current.callback;
			// to update this side effect, since should in dependency is true, and value in ref is false now
			// but react doesn't know it!
			forceUpdate();
		}
	}, [activeCallbackIndicator.current.should, where, forceUpdate]);
	useEffect(() => {
		const onActiveTab = (givenTabIndex: number, givenMarker: string, onActivated?: (where: 'title' | 'body') => Promise<void>) => {
			if (tabIndex === givenTabIndex || marker === givenMarker) {
				if (active === true) {
					// noinspection JSIgnoredPromiseFromCall
					onActivated?.(where);
				} else {
					activeCallbackIndicator.current = {should: true, callback: onActivated};
					setActive(true);
				}
			} else {
				setActive(false);
			}
		};
		on(TabsEventTypes.ACTIVE_TAB, onActiveTab);
		return () => {
			off(TabsEventTypes.ACTIVE_TAB, onActiveTab);
		};
	}, [on, off, active, tabIndex, marker, where]);

	return active;
};