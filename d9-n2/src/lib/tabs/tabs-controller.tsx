import {VUtils} from '@rainbow-d9/n1';
import React, {Fragment, useEffect, useState} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useCustomGlobalEvent, useGlobalEventBus} from '../global';
import {useTabsEventBus} from './event/tabs-event-bus';
import {TabsEventTypes} from './event/tabs-event-bus-types';
import {TabDef, TabsProps} from './types';
import {findActiveOne, findInitActiveOne} from './utils';

interface TabsControllerProps {
	$wrapped: TabsProps['$wrapped'];
	initActive?: TabsProps['initActive'];
	contents?: TabsProps['contents'];
}

export const TabsController = (props: TabsControllerProps) => {
	const {$wrapped, initActive, contents} = props;

	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	const {on, off, fire} = useTabsEventBus();
	const [activeIndex, setActiveIndex] = useState(() => {
		const [, initActiveIndex] = findInitActiveOne(contents, initActive);
		return initActiveIndex;
	});
	const fireCustomEvent = useCustomGlobalEvent();
	useEffect(() => {
		const activeTab = (tabIndex: number, def?: TabDef) => {
			setActiveIndex(tabIndex);
			fire(TabsEventTypes.ACTIVE_TAB, tabIndex, def?.marker);
			const key = `${GlobalEventPrefix.TAB_CHANGED}:${def?.marker ?? ''}`;
			// noinspection JSIgnoredPromiseFromCall
			fireCustomEvent(key, GlobalEventPrefix.TAB_CHANGED, def?.marker ?? '', {
				root: $wrapped.$root, model: $wrapped.$model
			});
		};
		// deal with active tab event from inside
		// and fire tab changed event when tab changed
		const createOnTabActive = (first: boolean) => (index: number, marker: string) => {
			const activeOne = findActiveOne(contents, index, marker);
			if (activeOne == null) {
				// do nothing
				return;
			}
			const [found, foundIndex] = activeOne;
			if (foundIndex === activeIndex) {
				if (first) {
					// use force since state active index is same as given tab index
					activeTab(foundIndex, found);
				}
			} else {
				activeTab(foundIndex, found);
			}
		};
		const onFirstTabActive = createOnTabActive(true);
		const onTabActive = createOnTabActive(false);
		on(TabsEventTypes.TRY_ACTIVE_FIRST_TAB, onFirstTabActive);
		on(TabsEventTypes.TRY_ACTIVE_TAB, onTabActive);
		return () => {
			off(TabsEventTypes.TRY_ACTIVE_FIRST_TAB, onFirstTabActive);
			off(TabsEventTypes.TRY_ACTIVE_TAB, onTabActive);
		};
	}, [on, off, fire, fireCustomEvent, activeIndex, contents, $wrapped.$root, $wrapped.$model]);
	useEffect(() => {
		// deal with active tab event from outside
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (prefix !== GlobalEventPrefix.TAB) {
				return;
			}
			const check = VUtils.isInteger(clipped);
			if (check.test) {
				// only one tabs exists, otherwise leads confusion, since every tabs will respond to this event
				fire(TabsEventTypes.TRY_ACTIVE_TAB, check.value, '');
			} else {
				// make sure marker is global unique
				fire(TabsEventTypes.TRY_ACTIVE_TAB, -1, (clipped ?? '').trim());
			}
		};
		onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [onGlobal, offGlobal, fire]);
	useEffect(() => {
		// fire only once to active tab
		fire(TabsEventTypes.TRY_ACTIVE_FIRST_TAB, activeIndex, '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Fragment/>;
};