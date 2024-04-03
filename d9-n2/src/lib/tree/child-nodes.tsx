import {useForceUpdate} from '@rainbow-d9/n1';
import React, {useEffect} from 'react';
import {useGlobalHandlers} from '../global';
import {useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeNode} from './node';
import {TreeDef, TreeNodeDef, TreeProps} from './types';

export interface ChildTreeNodesProps {
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
		initExpandLevel, level, showIndex, displayIndex,
		detective, $wrapped
	} = props;

	const {fire: fireTree} = useTreeEventBus();
	const {on, off, fire} = useTreeNodeEventBus();
	const globalHandlers = useGlobalHandlers();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onRefreshChildNodes = (_marker: string, detect?: boolean) => {
			if (detect === true) {
				node.$children = detective(node, {global: globalHandlers}) ?? [];
			}
			forceUpdate();
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onRefreshChildNodesOnRemoved = (_marker: string, _removedNode: TreeNodeDef) => {
			forceUpdate();
		};
		const fillMarker = () => {
			fireTree(TreeEventTypes.ASK_MARKER_ADDER, (add: (node: TreeNodeDef) => void) => {
				(node.$children).forEach(child => add(child));
			});
		};
		const scrollToAdded = (childNode?: TreeNodeDef) => {
			fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, true, childNode?.marker);
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onChildAdded = (_marker: string, addedNode?: TreeNodeDef, _placeholder?: boolean) => {
			fillMarker();
			forceUpdate();
			scrollToAdded(addedNode);
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onChildPlaceholderReplaced = (_marker: string, addedNode?: TreeNodeDef) => {
			fillMarker();
			forceUpdate();
			scrollToAdded(addedNode);
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onChildPlaceholderRemoved = (_marker: string, _placeholderNode: TreeNodeDef) => {
			forceUpdate();
		};
		on && on(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshChildNodes);
		on && on(TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, onRefreshChildNodesOnRemoved);
		on && on(TreeNodeEventTypes.CHILD_ADDED, onChildAdded);
		on && on(TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, onChildPlaceholderReplaced);
		on && on(TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, onChildPlaceholderRemoved);
		return () => {
			off && off(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshChildNodes);
			off && off(TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, onRefreshChildNodesOnRemoved);
			off && off(TreeNodeEventTypes.CHILD_ADDED, onChildAdded);
			off && off(TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, onChildPlaceholderReplaced);
			off && off(TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, onChildPlaceholderRemoved);
		};
	}, [on, off, fire, fireTree, forceUpdate, node, detective, globalHandlers]);
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onNodeCheckedChanged = (_marker: string, _checked: boolean) => {
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
			return <TreeNode initExpandLevel={initExpandLevel} showIndex={showIndex}
			                 detective={detective} $wrapped={$wrapped}
			                 node={child}
			                 displayIndex={myDisplayIndex} lastOfParent={last} level={level + 1}
			                 key={child.$ip2p}/>;
		}).filter(x => x != null)}
	</>;
};