import {useEffect} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus} from '../global';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNodeDef, TreeProps} from './types';
import {computeTreeNodeMarker} from './utils';

export const useRefreshTreeNode = (node: TreeNodeDef, $wrapped: TreeProps['$wrapped']) => {
	const {fire} = useTreeNodeEventBus();
	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (clipped !== computeTreeNodeMarker(node, $wrapped)) {
				return;
			}
			switch (prefix) {
				case GlobalEventPrefix.REFRESH_TREE_CHILD_NODES:
					fire(TreeNodeEventTypes.REFRESH_CHILD_NODES, node.$ip2r);
					break;
				case GlobalEventPrefix.EXPAND_TREE_NODE:
					fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.$ip2r, true);
					break;
				case GlobalEventPrefix.COLLAPSE_TREE_NODE:
					fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.$ip2r, false);
					break;
			}
		};
		onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [onGlobal, offGlobal, fire, node, $wrapped]);
};
