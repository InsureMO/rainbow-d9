import {useForceUpdate} from '@rainbow-d9/n1';
import React, {useEffect} from 'react';
import {useGlobalHandlers} from '../global';
import {ChildTreeNodes} from './child-nodes';
import {TreeNodeEventBusProvider, useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNodeEventBridge} from './node-event-bridge';
import {TreeNodeRenderer} from './node-renderer';
import {TreeDef, TreeNodeDef, TreeProps} from './types';
import {useRefreshTreeNode} from './use-refresh-node';
import {TreeNodeWrapper} from './widgets';

export interface TreeNodeProps {
	halfChecked?: TreeDef['halfChecked'];
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
	const {
		halfChecked, initExpandLevel, showIndex, detective, $wrapped,
		node, displayIndex, lastOfParent, level
	} = props;

	const {on, off, fire} = useTreeNodeEventBus();
	const globalHandlers = useGlobalHandlers();
	useRefreshTreeNode(node, $wrapped);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onRefreshChildNodes = (_$ip2r: string) => {
			node.$children = detective(node, {global: globalHandlers}) ?? [];
			forceUpdate();
		};
		on && on(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshChildNodes);
		return () => {
			on && on(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshChildNodes);
		};
	}, [on, off, fire, forceUpdate, node, detective, globalHandlers]);

	// bridge event to me
	// if it is top level node, then will not be wrapped by tree node event bus provider
	// then fire is undefined
	// and in this case, there is no need to notify parent this event, simply ignore
	const expandParent = (expanded: boolean) => fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, node.$ip2r, expanded);
	const nodeCheckedChanged = (checked: boolean) => fire && fire(TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, node.$ip2r, checked);

	return <TreeNodeEventBusProvider>
		<TreeNodeEventBridge node={node}
		                     expandParent={expandParent} nodeCheckedChanged={nodeCheckedChanged}/>
		<TreeNodeWrapper data-last-of-parent={lastOfParent} level={level}>
			<TreeNodeRenderer initExpandLevel={initExpandLevel} showIndex={showIndex} $wrapped={$wrapped}
			                  node={node} displayIndex={displayIndex} lastOfParent={lastOfParent} level={level}/>
			<ChildTreeNodes node={node} halfChecked={halfChecked}
			                initExpandLevel={initExpandLevel} level={level}
			                showIndex={showIndex} displayIndex={displayIndex}
			                $wrapped={$wrapped}/>
		</TreeNodeWrapper>
	</TreeNodeEventBusProvider>;
};
