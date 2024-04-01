import {PPUtils, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {MouseEvent, useEffect, useRef} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus} from '../global';
import {AngleRight} from '../icons';
import {LabelLike} from '../label-like';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeDef, TreeNodeDef, TreeProps} from './types';
import {TreeNodeContainer, TreeNodeContent, TreeNodeIndex, TreeNodeLabel, TreeNodeToggle} from './widgets';

export interface TreeNodeRendererProps {
	initExpandLevel: TreeDef['initExpandLevel'];
	showIndex?: TreeDef['showIndex'];
	$wrapped: TreeProps['$wrapped'];
	node: TreeNodeDef;
	displayIndex: string;
	lastOfParent: boolean;
	level: number;
	canCheck: boolean;
	canAdd: boolean;
	canRemove: boolean;
}

const computeMarker = (node: TreeNodeDef, $wrapped: TreeProps['$wrapped']) => {
	return (node.marker ?? '').trim() || PPUtils.concat($wrapped.$p2r, node.$ip2r);
};

export const TreeNodeRenderer = (props: TreeNodeRendererProps) => {
	const {
		initExpandLevel, showIndex, $wrapped,
		node, displayIndex, lastOfParent, level
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
			{(node.children ?? []).length !== 0
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