import {useForceUpdate, VUtils} from '@rainbow-d9/n1';
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
	detect?: TreeDef['detective'];
	$wrapped: TreeProps['$wrapped'];
	node: TreeNodeDef;
	displayIndex: string;
	/** starts from 0 */
	level: number;
	/**
	 * display given child nodes, or use children of given node
	 */
	displayChildren?: Array<TreeNodeDef>;
}

export const ChildTreeNodes = (props: ChildTreeNodesProps) => {
	const {
		node, displayChildren,
		initExpandLevel, level, showIndex, displayIndex,
		detect, $wrapped
	} = props;

	const {fire: fireTree} = useTreeEventBus();
	const {on, off, fire} = useTreeNodeEventBus();
	const globalHandlers = useGlobalHandlers();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const recomputeDisplayChildren = () => {
			if (node.$displayChildren == null) {
				return;
			}
			if (node.$children == null || node.$children.length === 0) {
				node.$displayChildren = [];
				return;
			}
			const map: Map<TreeNodeDef, number> = new Map();
			node.$children.forEach((child, index) => map.set(child, index));
			node.$displayChildren = node.$displayChildren.filter(child => map.has(child));
			const displayMap: Map<TreeNodeDef, number> = new Map();
			node.$displayChildren.forEach((child, index) => displayMap.set(child, index));
			node.$children.forEach(child => {
				if (!displayMap.has(child)) {
					node.$displayChildren.push(child);
				}
			});
			node.$displayChildren.sort((c1, c2) => map.get(c1) - map.get(c2));
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onRefreshChildNodes = (_marker: string, redetect?: boolean) => {
			if (redetect === true) {
				node.$children = detect(node, {global: globalHandlers}) ?? [];
			}
			recomputeDisplayChildren();
			forceUpdate();
		};
		const refreshNodeContent = () => {
			const children = node.$children ?? [];
			if (children.length === 0) {
				if (fire != null) {
					fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, false);
				}
			}
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onRefreshChildNodesOnRemoved = (_marker: string, _removedNode: TreeNodeDef) => {
			recomputeDisplayChildren();
			forceUpdate();
			refreshNodeContent();
		};
		const fillMarkerAndBuildHierarchy = () => {
			fireTree(TreeEventTypes.ASK_MARKER_ADDER, (add: (node: TreeNodeDef) => void) => {
				(node.$children).forEach(child => {
					add(child);
					if (child.$parent == null) {
						child.$parent = node;
					}
				});
			});
		};
		const scrollToAdded = (childNode?: TreeNodeDef) => {
			if (fire != null) {
				fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, true, childNode?.marker);
			}
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onChildAdded = (_marker: string, addedNode?: TreeNodeDef, _placeholder?: boolean) => {
			recomputeDisplayChildren();
			fillMarkerAndBuildHierarchy();
			forceUpdate();
			scrollToAdded(addedNode);
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onChildPlaceholderReplaced = (_marker: string, addedNode?: TreeNodeDef) => {
			recomputeDisplayChildren();
			fillMarkerAndBuildHierarchy();
			forceUpdate();
			scrollToAdded(addedNode);
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onChildPlaceholderRemoved = (_marker: string, _placeholderNode: TreeNodeDef) => {
			recomputeDisplayChildren();
			forceUpdate();
			refreshNodeContent();
		};
		if (on != null) {
			on(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshChildNodes);
			on(TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, onRefreshChildNodesOnRemoved);
			on(TreeNodeEventTypes.CHILD_ADDED, onChildAdded);
			on(TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, onChildPlaceholderReplaced);
			on(TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, onChildPlaceholderRemoved);
		}
		return () => {
			if (off != null) {
				off(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshChildNodes);
				off(TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, onRefreshChildNodesOnRemoved);
				off(TreeNodeEventTypes.CHILD_ADDED, onChildAdded);
				off(TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, onChildPlaceholderReplaced);
				off(TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, onChildPlaceholderRemoved);
			}
		};
	}, [on, off, fire, fireTree, forceUpdate, node, detect, globalHandlers]);
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

	const children = displayChildren ?? node.$displayChildren ?? node.$children ?? [];
	const childrenCount = children.length;
	const hasChild = childrenCount !== 0;

	if (!hasChild) {
		return null;
	}
	return <>
		{children.map((child, index) => {
			const last = index === childrenCount - 1;
			const myDisplayIndex = VUtils.isBlank(displayIndex) ? `${index + 1}` : `${displayIndex}.${index + 1}`;
			return <TreeNode initExpandLevel={initExpandLevel} showIndex={showIndex}
			                 detect={detect} $wrapped={$wrapped}
			                 node={child}
			                 displayIndex={myDisplayIndex} lastOfParent={last} level={level + 1}
			                 key={child.$ip2p}/>;
		}).filter(x => x != null)}
	</>;
};