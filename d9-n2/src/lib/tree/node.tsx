import {PPUtils, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {MouseEvent, useRef} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus} from '../global';
import {AngleRight} from '../icons';
import {LabelLike} from '../label-like';
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
	expandParent?: () => void;
}

export const TreeNode = (props: TreeNodeProps) => {
	const {
		halfChecked, initExpandLevel, showIndex, detective, $wrapped,
		node, lastOfParent, level,
		displayIndex, expandParent
	} = props;
	const global = useGlobalEventBus();
	const expanded = useRef(level <= initExpandLevel);
	const forceUpdate = useForceUpdate();

	const onEntityClicked = (event: MouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const clipped = (node.marker ?? '').trim() || PPUtils.concat($wrapped.$p2r, node.$ip2r);
		const key = `${GlobalEventPrefix.TREE_NODE_CLICKED}:${clipped}`;
		// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
		// @ts-ignore
		global.fire(GlobalEventTypes.CUSTOM_EVENT, key, GlobalEventPrefix.TREE_NODE_CLICKED, clipped, {
			root: $wrapped.$root, model: $wrapped.$model, value: node.value
		});
	};
	const onToggleClicked = (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		expanded.current = !expanded.current;
		forceUpdate();
	};
	const expandMe = () => {
		expandParent && expandParent();
		if (!expanded.current) {
			expanded.current = true;
			forceUpdate();
		}
	};

	const canHasChild = !VUtils.isPrimitive(node.value);
	const children = canHasChild ? detective(node) : [];
	const childrenCount = children.length;
	const hasChild = canHasChild && childrenCount !== 0;
	// const canCheck = canHasChild && (node.checkable ?? false);
	const canAdd = canHasChild && (node.addable ?? false);
	// const canRemove = canHasChild && (node.removable ?? false);
	const hasToggle = hasChild || canAdd;
	const $p2r = PPUtils.concat($wrapped.$p2r, node.$ip2r);

	return <TreeNodeWrapper data-last-of-parent={lastOfParent} level={level}>
		<TreeNodeContainer data-expanded={expanded.current} data-last-of-parent={lastOfParent} level={level}
		                   onClick={onEntityClicked}>
			<TreeNodeContent>
				{hasToggle
					? <TreeNodeToggle data-expanded={expanded.current} onClick={onToggleClicked}>
						<AngleRight/>
					</TreeNodeToggle>
					: null}
				{(showIndex && VUtils.isNotBlank(displayIndex))
					? <TreeNodeLabel>
						<LabelLike $wrapped={{...$wrapped, $model: node.value, $p2r}} label={node.label}/>
					</TreeNodeLabel>
					: <>
						<TreeNodeIndex># {displayIndex}.</TreeNodeIndex>
						<TreeNodeLabel>
							<LabelLike $wrapped={{...$wrapped, $model: node.value, $p2r}} label={node.label}/>
						</TreeNodeLabel>
					</>}
			</TreeNodeContent>
		</TreeNodeContainer>
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
				                 expandParent={expandMe}
				                 key={child.$ip2p}/>;
			}).filter(x => x != null)
			: null}
	</TreeNodeWrapper>;
};