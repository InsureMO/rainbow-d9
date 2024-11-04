import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect, useRef} from 'react';
import {useTabsEventBus} from './event/tabs-event-bus';
import {TabsEventTypes} from './event/tabs-event-bus-types';

interface RefreshIndicator {
	should: boolean;
	callback?: (where: 'title' | 'body') => Promise<void>;
}

export const useTabContentRefresh = (tabIndex: number, marker: string, where: 'title' | 'body') => {
	const {on, off} = useTabsEventBus();
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
		const onActiveTab = (givenTabIndex: number, givenMarker: string, onRefreshed?: (where: 'title' | 'body') => Promise<void>) => {
			if (tabIndex === givenTabIndex || marker === givenMarker) {
				refreshIndicator.current = {should: true, callback: onRefreshed};
				forceUpdate();
			}
		};
		on(TabsEventTypes.REFRESH_TAB_CONTENT, onActiveTab);
		return () => {
			off(TabsEventTypes.REFRESH_TAB_CONTENT, onActiveTab);
		};
	}, [on, off, forceUpdate, tabIndex, marker]);
};