import React, {Fragment, useEffect} from 'react';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNodeDef} from './types';

export interface TreeNodeEventBridgeProps {
	node: TreeNodeDef;
	expandParent: (expanded: boolean) => void;
	nodeCheckedChanged: (checked: boolean) => void;
}

/**
 * handle expanded event from node itself, and notify parent node.
 * in case the node is expanded programmatically.
 * it is a bridge, do nothing but pass event to parent.
 */
export const TreeNodeEventBridge = (props: TreeNodeEventBridgeProps) => {
	const {node, expandParent, nodeCheckedChanged} = props;

	const {on, off} = useTreeNodeEventBus();
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onExpandParent = (_$ip2r: string, expanded: boolean) => {
			// only switch to expand needs to propagate to parent
			if (expanded) {
				expandParent(expanded);
			}
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onNodeCheckedChanged = (_$ip2r: string, checked: boolean) => {
			nodeCheckedChanged(checked);
		};
		on && on(TreeNodeEventTypes.SWITCH_PARENT_EXPAND, onExpandParent);
		on && on(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, onNodeCheckedChanged);
		return () => {
			off && off(TreeNodeEventTypes.SWITCH_PARENT_EXPAND, onExpandParent);
			off && off(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, onNodeCheckedChanged);
		};
	}, [on, off, node, expandParent, nodeCheckedChanged]);

	return <Fragment/>;
};