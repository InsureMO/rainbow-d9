import {MUtils, PPUtils, registerWidget, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useCustomGlobalEvent, useGlobalEventBus} from '../global';
import {TabsEventBusProvider, useTabsEventBus} from './event/tabs-event-bus';
import {TabsEventTypes} from './event/tabs-event-bus-types';
import {TabBody} from './tab-body';
import {TabTitle} from './tab-title';
import {TabDef, TabsProps} from './types';
import {ATabs, TabsBody, TabsHeader} from './widgets';

const redressTabMarker = (content: TabDef) => {
	if (VUtils.isNotBlank(content.marker)) {
		return content.marker;
	}
	if (typeof content.title === 'string') {
		content.marker = content.title;
		return content.marker;
	}
	content.marker = VUtils.generateUniqueId();
	return content.marker;
};

const InternalTabs = (props: TabsProps) => {
	const {$pp, $wrapped, contents, ...rest} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	const {on, off, fire} = useTabsEventBus();
	const [activeIndex, setActiveIndex] = useState(0);
	const fireCustomEvent = useCustomGlobalEvent();
	useEffect(() => {
		const onTabActive = (index: number, marker: string) => {
			let found = (contents ?? []).find(content => content.marker === marker);
			if (found == null) {
				found = (contents ?? []).find((_, i) => i === index);
			}
			if (found == null) {
				return;
			}
			const foundIndex = (contents ?? []).indexOf(found);
			if (foundIndex === activeIndex) {
				return;
			} else {
				setActiveIndex(foundIndex);
				const key = `${GlobalEventPrefix.TAB_CHANGED}:${found.marker ?? ''}`;
				// noinspection JSIgnoredPromiseFromCall
				fireCustomEvent(key, GlobalEventPrefix.TAB_CHANGED, found.marker ?? '', {
					root: $wrapped.$root, model: $wrapped.$model
				});
			}
		};
		on(TabsEventTypes.ACTIVE_TAB, onTabActive);
		return () => {
			off(TabsEventTypes.ACTIVE_TAB, onTabActive);
		};
	}, [
		on, off, fireCustomEvent, activeIndex,
		contents, $wrapped.$root, $wrapped.$model
	]);
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (prefix !== GlobalEventPrefix.TAB) {
				return;
			}
			const check = VUtils.isInteger(clipped);
			if (check.test) {
				// only one wizard exists, otherwise leads confusion, since every wizard will repsond to this event
				fire(TabsEventTypes.ACTIVE_TAB, check.value, '');
			} else {
				// make sure marker is global unique
				fire(TabsEventTypes.ACTIVE_TAB, -1, (clipped ?? '').trim());
			}
		};
		onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [onGlobal, offGlobal, fire]);

	return <ATabs {...rest} data-disabled={$disabled} data-visible={$visible}
	              id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
		<TabsHeader>
			{(contents ?? []).map((content, index) => {
				redressTabMarker(content);
				const $model = MUtils.getValue($wrapped.$model, $pp);
				return <TabTitle key={content.marker}
				                 $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                 {...content}
				                 active={index === activeIndex} tabIndex={index} marker={content.marker}/>;
			})}
		</TabsHeader>
		<TabsBody>
			{(contents ?? []).map((content, index) => {
				const $model = MUtils.getValue($wrapped.$model, $pp);
				// marker already redressed in headers rendering
				return <TabBody key={content.marker} def={content.body} $pp={content.$pp}
				                $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                active={index === activeIndex}/>;
			})}
		</TabsBody>
	</ATabs>;
};

export const Tabs = (props: TabsProps) => {
	return <TabsEventBusProvider>
		<InternalTabs {...props}/>
	</TabsEventBusProvider>;
};

registerWidget({key: 'Tabs', JSX: Tabs, container: false, array: false});

export * from './types';
