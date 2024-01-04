import {PPUtils, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {Fragment, MouseEvent, useEffect, useRef} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus} from '../global';
import {AngleRight} from '../icons';
import {LabelLike} from '../label-like';
import {TreeNodeEventBusProvider, useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeDef, TreeNodeDef, TreeProps} from './types';
import {
	TreeNodeContainer,
	TreeNodeContent,
	TreeNodeIndex,
	TreeNodeLabel,
	TreeNodeToggle,
	TreeNodeWrapper
} from './widgets';

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

export interface TreeNodeRendererProps {
	initExpandLevel: TreeDef['initExpandLevel'];
	showIndex?: TreeDef['showIndex'];
	$wrapped: TreeProps['$wrapped'];
	node: TreeNodeDef;
	displayIndex: string;
	lastOfParent: boolean;
	level: number;
	canCheck: boolean;
	canRemove: boolean;
	hasToggle: boolean;
}

const computeMarker = (node: TreeNodeDef, $wrapped: TreeProps['$wrapped']) => {
	return (node.marker ?? '').trim() || PPUtils.concat($wrapped.$p2r, node.$ip2r);
};

export const TreeNodeRenderer = (props: TreeNodeRendererProps) => {
	const {
		initExpandLevel, showIndex, $wrapped,
		node, displayIndex, lastOfParent, level,
		hasToggle
	} = props;

	const expanded = useRef(level <= initExpandLevel);
	const {fire: fireGlobal} = useGlobalEventBus();
	const {on, off, fire} = useTreeNodeEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onExpandParent = ($ip2r: string) => {
			if (node.$ip2r === $ip2r) {
				// ignore myself expanded, only receive expanded event from direct child nodes.
				return;
			}
			if (!expanded.current) {
				expanded.current = true;
				forceUpdate();
			}
			fire(TreeNodeEventTypes.EXPANDED, node.$ip2r);
		};
		on && on(TreeNodeEventTypes.EXPANDED, onExpandParent);
		return () => {
			off && off(TreeNodeEventTypes.EXPANDED, onExpandParent);
		};
	}, [on, off, fire, forceUpdate, node]);

	const onToggleClicked = (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		expanded.current = !expanded.current;
		forceUpdate();
		// declare me is expanded
		fire && fire(TreeNodeEventTypes.EXPANDED, node.$ip2r);
	};
	const onEntityClicked = (event: MouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const clipped = computeMarker(node, $wrapped);
		const key = `${GlobalEventPrefix.TREE_NODE_CLICKED}:${clipped}`;
		// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
		// @ts-ignore
		fireGlobal(GlobalEventTypes.CUSTOM_EVENT, key, GlobalEventPrefix.TREE_NODE_CLICKED, clipped, {
			root: $wrapped.$root, model: $wrapped.$model, value: node.value
		});
	};

	const $p2r = PPUtils.concat($wrapped.$p2r, node.$ip2r);

	return <TreeNodeContainer data-expanded={expanded.current} data-last-of-parent={lastOfParent} level={level}
	                          onClick={onEntityClicked}>
		<TreeNodeContent>
			{hasToggle
				? <TreeNodeToggle data-expanded={expanded.current} onClick={onToggleClicked}>
					<AngleRight/>
				</TreeNodeToggle>
				: null}
			{(showIndex && VUtils.isNotBlank(displayIndex))
				? <>
					<TreeNodeIndex># {displayIndex}.</TreeNodeIndex>
					<TreeNodeLabel>
						<LabelLike $wrapped={{...$wrapped, $model: node.value, $p2r}} label={node.label}/>
					</TreeNodeLabel>
				</>
				: <TreeNodeLabel>
					<LabelLike $wrapped={{...$wrapped, $model: node.value, $p2r}} label={node.label}/>
				</TreeNodeLabel>}
		</TreeNodeContent>
	</TreeNodeContainer>;
};

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

export const TreeNode = (props: TreeNodeProps) => {
	const {
		halfChecked, initExpandLevel, showIndex, detective, $wrapped,
		node, displayIndex, lastOfParent, level
	} = props;

	const {fire} = useTreeNodeEventBus();

	// if it is top level node, then will not be wrapped by tree node event bus provider
	// then fire is undefined
	// and in this case, there is no need to notify parent this event, simply ignore
	const expandParent = () => fire && fire(TreeNodeEventTypes.EXPANDED, node.$ip2r);

	const canHasChild = !VUtils.isPrimitive(node.value);
	const children = canHasChild ? detective(node) : [];
	const childrenCount = children.length;
	const hasChild = canHasChild && childrenCount !== 0;
	const canCheck = canHasChild && (node.checkable ?? false);
	const canAdd = canHasChild && (node.addable ?? false);
	const canRemove = canHasChild && (node.removable ?? false);
	const hasToggle = hasChild || canAdd;

	return <TreeNodeEventBusProvider>
		<NodeEventLadder node={node} expandParent={expandParent}/>
		<TreeNodeWrapper data-last-of-parent={lastOfParent} level={level}>
			<TreeNodeRenderer initExpandLevel={initExpandLevel} showIndex={showIndex} $wrapped={$wrapped}
			                  node={node} displayIndex={displayIndex} lastOfParent={lastOfParent} level={level}
			                  canCheck={canCheck} canRemove={canRemove} hasToggle={hasToggle}/>
			{hasChild
				? children.map((child, index) => {
					// when can add sub node, then the add operation always be the last one
					// which means all children is not last of parent
					const last = !canAdd && index === childrenCount - 1;
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
