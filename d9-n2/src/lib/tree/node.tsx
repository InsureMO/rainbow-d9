import React from 'react';
import {TreeNodeEventBusProvider, useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {NodeEventLadder} from './node-ladder';
import {TreeNodeRenderer} from './node-renderer';
import {TreeDef, TreeNodeDef, TreeProps} from './types';
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

	const {fire} = useTreeNodeEventBus();

	// if it is top level node, then will not be wrapped by tree node event bus provider
	// then fire is undefined
	// and in this case, there is no need to notify parent this event, simply ignore
	const expandParent = (expanded: boolean) => fire && fire(TreeNodeEventTypes.SWITCH_EXPAND, node.$ip2r, expanded);

	const children = node.children ?? [];
	const childrenCount = children.length;
	const hasChild = childrenCount !== 0;
	const canCheck = node.checkable ?? false;
	const canAdd = node.addable ?? false;
	const canRemove = node.removable ?? false;

	return <TreeNodeEventBusProvider>
		<NodeEventLadder node={node} expandParent={expandParent}/>
		<TreeNodeWrapper data-last-of-parent={lastOfParent} level={level}>
			<TreeNodeRenderer initExpandLevel={initExpandLevel} showIndex={showIndex} $wrapped={$wrapped}
			                  node={node} displayIndex={displayIndex} lastOfParent={lastOfParent} level={level}
			                  canCheck={canCheck} canAdd={canAdd} canRemove={canRemove}/>
			{hasChild
				? children.map((child, index) => {
					const last = index === childrenCount - 1;
					const myDisplayIndex = `${displayIndex}.${index + 1}`;
					return <TreeNode halfChecked={halfChecked} initExpandLevel={initExpandLevel} showIndex={showIndex}
					                 detective={detective} $wrapped={$wrapped}
					                 node={child}
					                 displayIndex={myDisplayIndex} lastOfParent={last} level={level + 1}
					                 key={child.$ip2p}/>;
				}).filter(x => x != null)
				: null}
		</TreeNodeWrapper>
	</TreeNodeEventBusProvider>;
};
