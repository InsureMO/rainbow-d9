import {useForceUpdate} from '@rainbow-d9/n1';
import React, {useEffect} from 'react';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNode} from './node';
import {TreeDef, TreeNodeDef, TreeProps} from './types';

export interface ChildTreeNodesProps {
	halfChecked?: TreeDef['halfChecked'];
	initExpandLevel: TreeDef['initExpandLevel'];
	showIndex?: TreeDef['showIndex'];
	detective?: TreeDef['detective'];
	$wrapped: TreeProps['$wrapped'];
	node: TreeNodeDef;
	displayIndex: string;
	/** starts from 0 */
	level: number;
}

export const ChildTreeNodes = (props: ChildTreeNodesProps) => {
	const {
		node,
		halfChecked, initExpandLevel, level, showIndex, displayIndex,
		detective, $wrapped
	} = props;

	const {on, off} = useTreeNodeEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onNodeCheckedChanged = (_$ip2r: string, _checked: boolean) => {
			forceUpdate();
		};
		on(TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, onNodeCheckedChanged);
		return () => {
			off(TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, onNodeCheckedChanged);
		};
	}, [on, off, forceUpdate, node]);

	const children = node.$children ?? [];
	const childrenCount = children.length;
	const hasChild = childrenCount !== 0;

	if (!hasChild) {
		return null;
	}
	return <>
		{children.map((child, index) => {
			const last = index === childrenCount - 1;
			const myDisplayIndex = `${displayIndex}.${index + 1}`;
			return <TreeNode halfChecked={halfChecked} initExpandLevel={initExpandLevel} showIndex={showIndex}
			                 detective={detective} $wrapped={$wrapped}
			                 node={child}
			                 displayIndex={myDisplayIndex} lastOfParent={last} level={level + 1}
			                 key={child.$ip2p}/>;
		}).filter(x => x != null)}
	</>;
};