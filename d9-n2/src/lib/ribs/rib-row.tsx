import {EnhancedPropsForArrayElement, ObjectPropValue, PPUtils, PROPERTY_PATH_ME} from '@rainbow-d9/n1';
import React, {useEffect, useRef, useState} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useCustomGlobalEvent, useGlobalEventBus} from '../global';
import {notInMe} from '../hooks';
import {LabelLike} from '../label-like';
import {ModelCarrier} from '../types';
import {RibRowOperators} from './rib-row-operators';
import {RibsProps} from './types';
import {isShowRowIndex, isUseSectionStyleIcons} from './utils';
import {ARibRow, ARibRowBody, ARibRowHeader, ARibRowHeaderContent, ARibRowIndex} from './widgets';

export const RibRow = (props: Omit<RibsProps, '$array'> & { $array: EnhancedPropsForArrayElement }) => {
	const {
		marker = '',
		caption, useSectionStyleIcons = isUseSectionStyleIcons(), showRowIndex = isShowRowIndex(),
		initExpanded,
		$wrapped,
		$array: {elementIndex, removable, removeElement, getElementKey},
		children
	} = props;

	const headerRef = useRef<HTMLDivElement>(null);
	const customEventCallbackRef = useRef<{ has: boolean; callback?: () => Promise<void> }>({has: false});
	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	const fireCustomEvent = useCustomGlobalEvent();
	const [expanded, setExpanded] = useState(() => {
		if (initExpanded) {
			return initExpanded($wrapped.$model as ObjectPropValue, elementIndex);
		}
		return false;
	});
	const rowMarker = getElementKey != null ? getElementKey($wrapped.$model as ObjectPropValue, elementIndex) : (void 0);
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string, _models?: ModelCarrier, callback?: () => Promise<void>) => {
			if (clipped !== `${marker ?? ''}-${rowMarker ?? elementIndex}`
				&& clipped !== PPUtils.asId(PPUtils.absolute($wrapped.$p2r, PROPERTY_PATH_ME), (void 0))) {
				return;
			}
			switch (prefix) {
				case GlobalEventPrefix.EXPAND_RIBS_ELEMENT:
					if (!expanded) {
						customEventCallbackRef.current.has = true;
						customEventCallbackRef.current.callback = callback;
						setExpanded(true);
					} else {
						// noinspection JSIgnoredPromiseFromCall
						callback?.();
					}
					break;
				case GlobalEventPrefix.COLLAPSE_RIBS_ELEMENT:
					if (expanded) {
						customEventCallbackRef.current.has = true;
						customEventCallbackRef.current.callback = callback;
						setExpanded(false);
					} else {
						// noinspection JSIgnoredPromiseFromCall
						callback?.();
					}
					break;
			}
		};
		onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [onGlobal, offGlobal, expanded, marker, rowMarker, elementIndex, $wrapped.$p2r]);
	useEffect(() => {
		if (customEventCallbackRef.current.has) {
			customEventCallbackRef.current.has = false;
			// noinspection JSIgnoredPromiseFromCall
			customEventCallbackRef.current.callback?.();
			delete customEventCallbackRef.current.callback;
		}
		const prefix = expanded ? GlobalEventPrefix.RIBS_ELEMENT_EXPANDED : GlobalEventPrefix.RIBS_ELEMENT_COLLAPSED;
		const key = `${prefix}:${marker ?? ''}-${rowMarker ?? elementIndex}`;
		// noinspection JSIgnoredPromiseFromCall
		fireCustomEvent(key, prefix, marker ?? '', {root: $wrapped.$root, model: $wrapped.$model});
	}, [onGlobal, offGlobal, fireCustomEvent, expanded, marker, rowMarker, elementIndex, $wrapped.$root, $wrapped.$model]);

	const expand = () => setExpanded(true);
	const collapse = () => setExpanded(false);
	const onRowClicked = () => {
		if (!expanded && headerRef.current != null) {
			const focused = document.activeElement;
			if (focused == null || notInMe(headerRef.current, focused)) {
				setExpanded(true);
			}
		}
	};

	// element id use $p2r directly
	return <ARibRow id={PPUtils.asId(PPUtils.absolute($wrapped.$p2r, PROPERTY_PATH_ME), (void 0))}>
		<ARibRowHeader data-expanded={expanded} data-show-row-index={showRowIndex} onClick={onRowClicked}
		               ref={headerRef}>
			<ARibRowIndex># {elementIndex + 1}</ARibRowIndex>
			<ARibRowHeaderContent>
				<LabelLike label={caption} $wrapped={$wrapped} $validationScopes={props}/>
			</ARibRowHeaderContent>
			<RibRowOperators expanded={expanded} expand={expand} collapse={collapse}
			                 useSectionStyleIcons={useSectionStyleIcons}
			                 removable={removable} removeElement={removeElement}/>
		</ARibRowHeader>
		<ARibRowBody expanded={expanded}>
			{children}
		</ARibRowBody>
	</ARibRow>;
};
