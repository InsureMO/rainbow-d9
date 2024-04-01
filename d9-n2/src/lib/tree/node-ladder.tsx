import React, {Fragment, useEffect} from 'react';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNodeDef} from './types';

/**
 * handle expanded event from node itself, and notify parent node.
 * in case the node is expanded programmatically
 */
export const NodeEventLadder = (props: { node: TreeNodeDef; expandParent: (expanded: boolean) => void }) => {
	const {node, expandParent} = props;

	const {on, off} = useTreeNodeEventBus();
	useEffect(() => {
		const onExpandParent = ($ip2r: string, expanded: boolean) => {
			if (node.$ip2r !== $ip2r) {
				// ignore expanded event from child nodes, only receive expanded event from myself
				return;
			}
			expandParent(expanded);
		};
		on && on(TreeNodeEventTypes.SWITCH_EXPAND, onExpandParent);
		return () => {
			off && off(TreeNodeEventTypes.SWITCH_EXPAND, onExpandParent);
		};
	}, [on, off, node, expandParent]);

	return <Fragment/>;
};
