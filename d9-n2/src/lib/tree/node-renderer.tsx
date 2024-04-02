import {Nullable, NUtils, PPUtils, PropValue, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {MouseEvent, MutableRefObject, useEffect, useRef} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus, useGlobalHandlers} from '../global';
import {AngleRight} from '../icons';
import {LabelLike} from '../label-like';
import {UnwrappedCheckbox, UnwrappedCheckboxProps} from '../unwrapped/checkbox';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeDef, TreeNodeCheckedChangeFrom, TreeNodeDef, TreeProps} from './types';
import {computeTreeNodeMarker} from './utils';
import {TreeNodeContainer, TreeNodeContent, TreeNodeIndex, TreeNodeLabel, TreeNodeToggle} from './widgets';

export interface TreeNodeRendererProps {
	initExpandLevel: TreeDef['initExpandLevel'];
	showIndex?: TreeDef['showIndex'];
	$wrapped: TreeProps['$wrapped'];
	node: TreeNodeDef;
	displayIndex: string;
	lastOfParent: boolean;
	level: number;
}

const useTreeNodeExpand = (state: MutableRefObject<boolean>) => {
	const {on, off, fire} = useTreeNodeEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSwitchMyExpand = ($ip2r: string, expanded: boolean) => {
			if (expanded != state.current) {
				// trigger by myself
				state.current = expanded;
				forceUpdate();
				// notify parent in case of the expanding is fired programmatically
				fire && fire(TreeNodeEventTypes.SWITCH_PARENT_EXPAND, $ip2r, state.current);
			}
		};
		on && on(TreeNodeEventTypes.SWITCH_MY_EXPAND, onSwitchMyExpand);
		on && on(TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, onSwitchMyExpand);
		return () => {
			off && off(TreeNodeEventTypes.SWITCH_MY_EXPAND, onSwitchMyExpand);
			off && off(TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, onSwitchMyExpand);
		};
	}, [on, off, fire, forceUpdate, state]);
};

const useTreeNodeCheckedChanged = () => {
	const {on, off, fire} = useTreeNodeEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSwitchMyChecked = ($ip2r: string, checked: boolean) => {
			forceUpdate();
			fire && fire(TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, $ip2r, checked);
			fire && fire(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, $ip2r, checked);
		};
		const onSwitchMyCheckedFromChild = ($ip2r: string, checked: boolean) => {
			forceUpdate();
			fire && fire(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, $ip2r, checked);
		};
		on && on(TreeNodeEventTypes.SWITCH_MY_CHECKED, onSwitchMyChecked);
		on && on(TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, onSwitchMyCheckedFromChild);
		return () => {
			off && off(TreeNodeEventTypes.SWITCH_MY_CHECKED, onSwitchMyChecked);
			off && off(TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, onSwitchMyCheckedFromChild);
		};
	}, [on, off, fire, forceUpdate]);
};

export const TreeNodeRenderer = (props: TreeNodeRendererProps) => {
	const {
		initExpandLevel, showIndex, $wrapped,
		node, displayIndex, lastOfParent, level
	} = props;

	const expanded = useRef(level <= initExpandLevel);
	const {fire: fireGlobal} = useGlobalEventBus();
	const globalHandlers = useGlobalHandlers();
	const {fire} = useTreeNodeEventBus();
	useTreeNodeExpand(expanded);
	useTreeNodeCheckedChanged();

	const onToggleClicked = (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		// declare myself is switched
		fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.$ip2r, !expanded.current);
	};
	const onEntityClicked = (event: MouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const clipped = computeTreeNodeMarker(node, $wrapped);
		const key = `${GlobalEventPrefix.TREE_NODE_CLICKED}:${clipped}`;
		// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
		// @ts-ignore
		fireGlobal(GlobalEventTypes.CUSTOM_EVENT, key, GlobalEventPrefix.TREE_NODE_CLICKED, clipped, {
			root: $wrapped.$root, model: $wrapped.$model, value: node.value
		});
	};

	const $p2r = PPUtils.concat($wrapped.$p2r, node.$ip2r);
	const checkable = node.checkable;
	let checked: Nullable<boolean> = (void 0);
	let check: Nullable<TreeNodeDef['check']> = (void 0);
	let onCheckValueChanged: Nullable<UnwrappedCheckboxProps['onValueChange']> = (void 0);
	if (checkable) {
		checked = node.checked(node);
		check = node.check;
		onCheckValueChanged = async (value: PropValue) => {
			// call function to set value, should include itself, descendants and ancestors
			await check(node, value as boolean, TreeNodeCheckedChangeFrom.FROM_SELF, {global: globalHandlers});
			fire && fire(TreeNodeEventTypes.SWITCH_MY_CHECKED, node.$ip2r, value as boolean);
		};
	}

	const label = <TreeNodeLabel>
		{checkable
			? <UnwrappedCheckbox $pp={NUtils.generateReactKey()} value={checked}
			                     onValueChange={onCheckValueChanged}
			                     data-tree-node-check={true}/>
			: null}
		<LabelLike $wrapped={{...$wrapped, $model: node.value, $p2r}} label={node.label}/>
	</TreeNodeLabel>;

	return <TreeNodeContainer data-expanded={expanded.current} data-last-of-parent={lastOfParent} level={level}
	                          onClick={onEntityClicked}>
		<TreeNodeContent>
			{(node.$children ?? []).length !== 0
				? <TreeNodeToggle data-expanded={expanded.current} onClick={onToggleClicked}>
					<AngleRight/>
				</TreeNodeToggle>
				: null}
			{(showIndex && VUtils.isNotBlank(displayIndex))
				? <>
					<TreeNodeIndex># {displayIndex}.</TreeNodeIndex>
					{label}
				</>
				: label}
		</TreeNodeContent>
	</TreeNodeContainer>;
};