import React, {Fragment, useEffect} from 'react';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNodeDef} from './types';

export interface TreeNodeEventBridgeProps {
	node: TreeNodeDef;
	expandParent: (expanded: boolean) => void;
	nodeCheckedChanged: (checked: boolean) => void;
	nodeRemoved: (removedNode: TreeNodeDef) => void;
}

/**
 * handle expanded event from node itself, and notify parent node.
 * in case the node is expanded programmatically.
 * it is a bridge, do nothing but pass event to parent.
 */
export const TreeNodeEventBridge = (props: TreeNodeEventBridgeProps) => {
	const {node, expandParent, nodeCheckedChanged, nodeRemoved} = props;

	const {on, off} = useTreeNodeEventBus();
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onExpandParent = (_marker: string, expanded: boolean) => {
			// only switch to expand needs to propagate to parent
			if (expanded) {
				expandParent(expanded);
			}
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onNodeCheckedChanged = (_marker: string, checked: boolean) => {
			nodeCheckedChanged(checked);
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onNodeRemoved = (_marker: string, removedNode: TreeNodeDef) => {
			nodeRemoved(removedNode);
		};
		if (on != null) {
			on(TreeNodeEventTypes.SWITCH_PARENT_EXPAND, onExpandParent);
			on(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, onNodeCheckedChanged);
			on(TreeNodeEventTypes.NODE_REMOVED, onNodeRemoved);
		}
		return () => {
			if (off != null) {
				off(TreeNodeEventTypes.SWITCH_PARENT_EXPAND, onExpandParent);
				off(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, onNodeCheckedChanged);
				off(TreeNodeEventTypes.NODE_REMOVED, onNodeRemoved);
			}
		};
	}, [on, off, node, expandParent, nodeCheckedChanged, nodeRemoved]);

	return <Fragment/>;
};
