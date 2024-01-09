import {useEffect, useState} from 'react';
import {useTabsEventBus} from './event/tabs-event-bus';
import {TabsEventTypes} from './event/tabs-event-bus-types';

export const useTabActive = (tabIndex: number, marker: string) => {
	const {on, off} = useTabsEventBus();
	const [active, setActive] = useState(false);
	useEffect(() => {
		const onActiveTab = (givenTabIndex: number, givenMarker: string) => {
			if (tabIndex === givenTabIndex || marker === givenMarker) {
				setActive(true);
			} else {
				setActive(false);
			}
		};
		on(TabsEventTypes.ACTIVE_TAB, onActiveTab);
		return () => {
			off(TabsEventTypes.ACTIVE_TAB, onActiveTab);
		};
	}, [on, off, tabIndex, marker]);

	return active;
};