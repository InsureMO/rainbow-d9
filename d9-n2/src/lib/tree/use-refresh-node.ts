import {useEffect} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus} from '../global';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNodeDef, TreeProps} from './types';

export const useRefreshTreeNode = (node: TreeNodeDef, $wrapped: TreeProps['$wrapped']) => {
	const {fire} = useTreeNodeEventBus();
	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (clipped !== node.marker) {
				return;
			}
			switch (prefix) {
				case GlobalEventPrefix.REFRESH_TREE_NODE:
					if (fire != null) {
						fire(TreeNodeEventTypes.REFRESH_NODE, node.marker);
					}
					break;
				case GlobalEventPrefix.REFRESH_TREE_CHILD_NODES:
					if (fire != null) {
						fire(TreeNodeEventTypes.REFRESH_CHILD_NODES, node.marker, false);
					}
					break;
				case GlobalEventPrefix.RECALC_TREE_CHILD_NODES:
					if (fire != null) {
						fire(TreeNodeEventTypes.REFRESH_CHILD_NODES, node.marker, true);
					}
					break;
				case GlobalEventPrefix.REFRESH_TREE_NODE_AND_CHILDREN:
					if (fire != null) {
						fire(TreeNodeEventTypes.REFRESH_NODE, node.marker);
						fire(TreeNodeEventTypes.REFRESH_CHILD_NODES, node.marker, false);
					}
					break;
				case GlobalEventPrefix.RECALC_TREE_NODE_AND_CHILDREN:
					if (fire != null) {
						fire(TreeNodeEventTypes.REFRESH_NODE, node.marker);
						fire(TreeNodeEventTypes.REFRESH_CHILD_NODES, node.marker, true);
					}
					break;
				case GlobalEventPrefix.EXPAND_TREE_NODE:
					if (fire != null) {
						fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, true);
					}
					break;
				case GlobalEventPrefix.COLLAPSE_TREE_NODE:
					if (fire != null) {
						fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, false);
					}
					break;
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
	}, [onGlobal, offGlobal, fire, node, $wrapped]);
};
