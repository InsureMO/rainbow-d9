import {EnhancedPropsForArrayElement, ObjectPropValue} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus} from '../global';
import {LabelLike} from '../label-like';
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

	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	const [expanded, setExpanded] = useState(() => {
		if (initExpanded) {
			return initExpanded($wrapped.$model as ObjectPropValue, elementIndex);
		}
		return false;
	});
	const rowMarker = getElementKey != null ? getElementKey($wrapped.$model as ObjectPropValue) : (void 0);
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (clipped !== `${marker}-${rowMarker ?? elementIndex}`) {
				return;
			}
			switch (prefix) {
				case GlobalEventPrefix.EXPAND_RIBS_ELEMENT:
					setExpanded(true);
					break;
				case GlobalEventPrefix.COLLAPSE_RIBS_ELEMENT:
					setExpanded(false);
					break;
			}
		};
		onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [onGlobal, offGlobal, marker, rowMarker, elementIndex]);

	const expand = () => setExpanded(true);
	const collapse = () => setExpanded(false);
	const onRowClicked = () => {
		if (!expanded) {
			setExpanded(true);
		}
	};

	return <ARibRow>
		<ARibRowHeader data-expanded={expanded} data-show-row-index={showRowIndex} onClick={onRowClicked}>
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
