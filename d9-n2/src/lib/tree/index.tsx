import {MUtils, PPUtils, PROPERTY_PATH_ME, registerWidget, useForceUpdate} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, KeyboardEvent, useEffect} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus, useGlobalHandlers} from '../global';
import {TreeContent} from './content';
import {TreeEventBusProvider, useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';
import {TreeHoverBox} from './hover-box';
import {TreeSearchBox} from './search-box';
import {TreeNodeDef, TreeProps} from './types';
import {useMarker} from './use-marker';
import {buildTreeNodesDetective} from './utils';
import {ATree} from './widgets';

export const InternalTree = forwardRef((props: TreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {
		$pp,
		initExpandLevel = -1, showIndex = false, detective,
		height = 300, marker,
		noMatched, disableSearchBox = false, children,
		$wrapped, ...rest
	} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {on, off} = useGlobalEventBus();
	const globalHandlers = useGlobalHandlers();
	const {fire} = useTreeEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (prefix !== GlobalEventPrefix.REFRESH_TREE || clipped !== marker) {
				return;
			}
			forceUpdate();
		};
		if (on != null) {
			on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		}
		return () => {
			if (off != null) {
				off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
			}
		};
	}, [on, off, forceUpdate, marker]);
	const markers = useMarker();

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (disableSearchBox) {
			return;
		}
		// Check for Ctrl key on Windows/Linux or Command key on Mac
		const isCtrlKey = event.ctrlKey || event.metaKey;
		// Check if 'F' key is pressed
		const isFKey = event.key === 'f';

		// If Ctrl/Command + F is pressed
		if (isCtrlKey && isFKey) {
			event.preventDefault(); // Prevent default browser behavior
			fire(TreeEventTypes.OPEN_SEARCH_BOX);
		} else if (event.key === 'Escape') {
			fire(TreeEventTypes.HIDE_SEARCH_BOX);
		}
	};

	const detect = buildTreeNodesDetective(detective, markers);
	// model of whole tree
	const rootNodeValue = MUtils.getValue($wrapped.$model, $pp);
	// root node never show, only for create top level nodes
	const rootNodeDef: TreeNodeDef = {
		// root node use model of whole tree as it value, so path to root and path are both stay itself
		value: rootNodeValue, $ip2r: PROPERTY_PATH_ME, $ip2p: PROPERTY_PATH_ME,
		label: '', checkable: false, addable: false, removable: false,
		// use tree marker as root node marker
		marker
	};
	rootNodeDef.$children = detect(rootNodeDef, {global: globalHandlers}) ?? [];

	return <ATree {...rest} data-disabled={$disabled} data-visible={$visible} height={height}
	              id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	              onKeyDown={onKeyDown} tabIndex={disableSearchBox ? (void 0) : 0}
	              ref={ref}>
		<TreeHoverBox/>
		<TreeSearchBox disabled={disableSearchBox}/>
		{children}
		<TreeContent root={rootNodeDef} initExpandLevel={initExpandLevel}
		             showIndex={showIndex} noMatched={noMatched} detect={detect} $pp={$pp} $wrapped={$wrapped}
		             refresh={() => forceUpdate()}/>
	</ATree>;
});

export const Tree = forwardRef((props: TreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <TreeEventBusProvider>
		<InternalTree {...props} ref={ref}/>
	</TreeEventBusProvider>;
});

registerWidget({key: 'Tree', JSX: Tree, container: false, array: false});

export * from './types';
export * from './event/tree-event-bus';
export * from './event/tree-event-bus-types';
export * from './event/tree-node-event-bus';
export * from './event/tree-node-event-bus-types';
