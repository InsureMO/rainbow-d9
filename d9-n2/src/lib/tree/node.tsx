import React from 'react';
import {ChildTreeNodes} from './child-nodes';
import {TreeNodeEventBusProvider, useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNodeEventBridge} from './node-event-bridge';
import {TreeNodeRenderer} from './node-renderer';
import {TreeDef, TreeNodeDef, TreeProps} from './types';
import {useRefreshTreeNode} from './use-refresh-node';
import {TreeNodeWrapper} from './widgets';

export interface TreeNodeProps {
	initExpandLevel: TreeDef['initExpandLevel'];
	showIndex?: TreeDef['showIndex'];
	detective?: TreeDef['detective'];
	$wrapped: TreeProps['$wrapped'];
	node: TreeNodeDef;
	displayIndex: string;
	lastOfParent: boolean;
	/** starts from 0 */
	level: number;
}

export const TreeNode = (props: TreeNodeProps) => {
	const {initExpandLevel, showIndex, $wrapped, node, displayIndex, lastOfParent, level} = props;

	useRefreshTreeNode(node, $wrapped);
	const {fire} = useTreeNodeEventBus();

	// bridge event to me
	// if it is top level node, then will not be wrapped by tree node event bus provider
	// then fire is undefined
	// and in this case, there is no need to notify parent this event, simply ignore
	const expandParent = (expanded: boolean) => fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, node.marker, expanded);
	const nodeCheckedChanged = (checked: boolean) => fire && fire(TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, node.marker, checked);
	const nodeRemoved = (removedNode: TreeNodeDef) => fire && fire(TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, node.marker, removedNode);

	return <TreeNodeEventBusProvider>
		<TreeNodeEventBridge node={node}
		                     expandParent={expandParent} nodeCheckedChanged={nodeCheckedChanged}
		                     nodeRemoved={nodeRemoved}/>
		<TreeNodeWrapper data-last-of-parent={lastOfParent} level={level}>
			<TreeNodeRenderer initExpandLevel={initExpandLevel} showIndex={showIndex} $wrapped={$wrapped}
			                  node={node} displayIndex={displayIndex} lastOfParent={lastOfParent} level={level}/>
			<ChildTreeNodes node={node}
			                initExpandLevel={initExpandLevel} level={level}
			                showIndex={showIndex} displayIndex={displayIndex}
			                $wrapped={$wrapped}/>
		</TreeNodeWrapper>
	</TreeNodeEventBusProvider>;
};
