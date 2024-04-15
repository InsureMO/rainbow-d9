import {MUtils, PPUtils, PROPERTY_PATH_ME, registerWidget, useForceUpdate} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, KeyboardEvent, MouseEvent, useEffect} from 'react';
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
		on && on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			off && off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [on, off, forceUpdate, marker]);
	const markers = useMarker();

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		// Check for Ctrl key on Windows/Linux or Command key on Mac
		const isCtrlKey = event.ctrlKey || event.metaKey;
		// Check if 'F' key is pressed
		const isFKey = event.key === 'f';

		// If Ctrl/Command + F is pressed
		if (isCtrlKey && isFKey) {
			event.preventDefault(); // Prevent default browser behavior
			fire(TreeEventTypes.SWITCH_SEARCH_BOX);
		}
	};
	const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		const {top} = target.closest('div[data-w=d9-tree-content-container]').getBoundingClientRect();
		const element = document.elementFromPoint(event.clientX, event.clientY);
		const nodeContainer = element.closest('div[data-w=d9-tree-node-container]');
		if (nodeContainer == null) {
			fire(TreeEventTypes.HIDE_HOVER_BOX);
		} else {
			const {top: nodeTop, height} = nodeContainer.getBoundingClientRect();
			fire(TreeEventTypes.SHOW_HOVER_BOX, nodeTop - top, height);
		}
	};
	const onMouseLeave = () => {
		fire(TreeEventTypes.HIDE_HOVER_BOX);
	};

	const detect = buildTreeNodesDetective(detective, markers);
	// model of whole tree
	const rootNodeValue = MUtils.getValue($wrapped.$model, $pp);
	// root node never show, only for create top level nodes
	const rootNodeDef: TreeNodeDef = {
		// root node use model of whole tree as it value, so path to root and path are both stay itself
		value: rootNodeValue, $ip2r: PROPERTY_PATH_ME, $ip2p: PROPERTY_PATH_ME,
		label: '', checkable: false, addable: false, removable: false
	};
	rootNodeDef.$children = detect(rootNodeDef, {global: globalHandlers}) ?? [];

	return <ATree {...rest} data-disabled={$disabled} data-visible={$visible} height={height}
	              id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	              onKeyDown={onKeyDown} tabIndex={0}
	              onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
	              ref={ref}>
		<TreeHoverBox/>
		<TreeSearchBox/>
		<TreeContent root={rootNodeDef} initExpandLevel={initExpandLevel}
		             showIndex={showIndex} detect={detect} $pp={$pp} $wrapped={$wrapped}/>
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
