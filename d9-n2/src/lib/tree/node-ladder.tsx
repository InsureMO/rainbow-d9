import React, {Fragment, useEffect} from 'react';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNodeDef} from './types';

/**
 * handle expanded event from node, and notify parent node.
 * in case the node is expanded programmatically
 */
export const NodeEventLadder = (props: { node: TreeNodeDef; expandParent: () => void }) => {
	const {node, expandParent} = props;

	const {on, off} = useTreeNodeEventBus();
	useEffect(() => {
		const onExpandParent = ($ip2r: string) => {
			if (node.$ip2r !== $ip2r) {
				// ignore expanded event from child nodes, only receive expanded event from myself
				return;
			}
			expandParent();
		};
		on && on(TreeNodeEventTypes.EXPANDED, onExpandParent);
		return () => {
			off && off(TreeNodeEventTypes.EXPANDED, onExpandParent);
		};
	}, [on, off, node, expandParent]);

	return <Fragment/>;
};
