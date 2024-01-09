import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect} from 'react';
import {useTabsEventBus} from './event/tabs-event-bus';
import {TabsEventTypes} from './event/tabs-event-bus-types';

export const useTabContentRefresh = (tabIndex: number, marker: string) => {
	const {on, off} = useTabsEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onActiveTab = (givenTabIndex: number, givenMarker: string) => {
			if (tabIndex === givenTabIndex || marker === givenMarker) {
				forceUpdate();
			}
		};
		on(TabsEventTypes.REFRESH_TAB_CONTENT, onActiveTab);
		return () => {
			off(TabsEventTypes.REFRESH_TAB_CONTENT, onActiveTab);
		};
	}, [on, off, forceUpdate, tabIndex, marker]);
};