import {MUtils, PPUtils, PropertyPath, VUtils} from '@rainbow-d9/n1';
import React, {Fragment, useEffect, useState} from 'react';
import {
	GlobalEventPrefix,
	GlobalEventTypes,
	useCustomGlobalEvent,
	useGlobalEventBus,
	useGlobalHandlers
} from '../global';
import {ModelCarrier} from '../types';
import {useTabsEventBus} from './event/tabs-event-bus';
import {TabsEventTypes} from './event/tabs-event-bus-types';
import {TabDef, TabsProps} from './types';
import {findActiveOne, findInitActiveOne} from './utils';

interface TabsControllerProps {
	// tabs property path, not for tab
	$pp: PropertyPath;
	$wrapped: TabsProps['$wrapped'];
	initActive?: TabsProps['initActive'];
	contents?: TabsProps['contents'];
}

export const TabsController = (props: TabsControllerProps) => {
	const {$pp, $wrapped, initActive, contents} = props;

	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	const globalHandlers = useGlobalHandlers();
	const {on, off, fire} = useTabsEventBus();
	const [activeIndex, setActiveIndex] = useState(() => {
		const [, initActiveIndex] = findInitActiveOne(contents, initActive);
		return initActiveIndex;
	});
	const fireCustomEvent = useCustomGlobalEvent();
	useEffect(() => {
		const activeTab = async (options: {
			tabIndex: number; def?: TabDef; first: boolean
		}, callback?: () => Promise<void>) => {
			const {tabIndex, def, first} = options;

			if (def.data != null) {
				const model = MUtils.getValue($wrapped.$model, PPUtils.concat($pp, def.$pp));
				await def.data({
					root: $wrapped.$root, model,
					absolutePath: PPUtils.absolute($wrapped.$p2r, PPUtils.concat($pp, def.$pp)), propertyPath: def.$pp,
					marker: def.marker, firstActive: first,
					global: globalHandlers
				});
				await new Promise<void>(resolve => {
					fire(TabsEventTypes.REFRESH_TAB_CONTENT, tabIndex, def?.marker, async (where: 'title' | 'body') => {
						if (where === 'body') {
							resolve();
						}
					});
				});
			}
			setActiveIndex(tabIndex);
			await new Promise<void>(resolve => {
				fire(TabsEventTypes.ACTIVE_TAB, tabIndex, def?.marker, async (where: 'title' | 'body') => {
					if (where === 'body') {
						await callback?.();
						resolve();
					}
				});
			});
			const key = `${GlobalEventPrefix.TAB_CHANGED}:${def?.marker ?? ''}`;
			// noinspection JSIgnoredPromiseFromCall,ES6MissingAwait
			fireCustomEvent(key, GlobalEventPrefix.TAB_CHANGED, def?.marker ?? '', {
				root: $wrapped.$root, model: $wrapped.$model
			});
		};
		// deal with active tab event from inside
		// and fire tab changed event when tab changed
		const createOnTabActive = (first: boolean) => async (index: number, marker: string, onActivated?: () => Promise<void>) => {
			const activeOne = findActiveOne(contents, index, marker);
			if (activeOne == null) {
				// do nothing
				return;
			}
			const [found, foundIndex] = activeOne;
			if (foundIndex === activeIndex) {
				if (first) {
					// use force since state active index is same as given tab index
					await activeTab({tabIndex: foundIndex, def: found, first: true});
				} else {
					// trigger callback directly
					// noinspection ES6MissingAwait
					onActivated?.();
				}
			} else {
				await activeTab({tabIndex: foundIndex, def: found, first: false}, onActivated);
			}
		};
		const onFirstTabActive = createOnTabActive(true);
		const onTabActive = createOnTabActive(false);
		on(TabsEventTypes.FIRST_TRY_ACTIVE_TAB, onFirstTabActive);
		on(TabsEventTypes.TRY_ACTIVE_TAB, onTabActive);
		return () => {
			off(TabsEventTypes.FIRST_TRY_ACTIVE_TAB, onFirstTabActive);
			off(TabsEventTypes.TRY_ACTIVE_TAB, onTabActive);
		};
	}, [
		on, off, fire, globalHandlers, fireCustomEvent, activeIndex, contents,
		$pp, $wrapped.$root, $wrapped.$model, $wrapped.$p2r
	]);
	useEffect(() => {
		// deal with active tab event from outside
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onCustomEvent = (_: string, prefix: string, clipped: string, _models?: ModelCarrier, callback?: () => Promise<void>) => {
			if (prefix !== GlobalEventPrefix.TAB) {
				return;
			}
			const check = VUtils.isInteger(clipped);
			if (check.test) {
				// only one tabs exists, otherwise leads confusion, since every tabs will respond to this event
				fire(TabsEventTypes.TRY_ACTIVE_TAB, check.value, '', callback);
			} else {
				// make sure marker is global unique
				fire(TabsEventTypes.TRY_ACTIVE_TAB, -1, (clipped ?? '').trim(), callback);
			}
		};
		if (onGlobal != null) {
			onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		}
		return () => {
			if (offGlobal != null) {
				offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
			}
		};
	}, [onGlobal, offGlobal, fire]);
	useEffect(() => {
		// fire only once to active tab
		fire(TabsEventTypes.FIRST_TRY_ACTIVE_TAB, activeIndex, '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Fragment/>;
};