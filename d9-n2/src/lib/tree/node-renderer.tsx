import {Nullable, NUtils, PPUtils, PropValue, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import React, {MouseEvent, MutableRefObject, useEffect, useRef, useState} from 'react';
import {ButtonFill, ButtonInk} from '../button';
import {DOM_KEY_WIDGET} from '../constants';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus, useGlobalHandlers} from '../global';
import {AngleRight} from '../icons';
import {LabelLike} from '../label-like';
import {UnwrappedButton} from '../unwrapped/button';
import {UnwrappedCheckbox, UnwrappedCheckboxProps} from '../unwrapped/checkbox';
import {useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';
import {useTreeNodeEventBus} from './event/tree-node-event-bus';
import {TreeNodeEventTypes} from './event/tree-node-event-bus-types';
import {TreeDef, TreeNodeCheckedChangeFrom, TreeNodeDef, TreeProps} from './types';
import {
	TreeNodeContainer,
	TreeNodeContent,
	TreeNodeIndex,
	TreeNodeLabel,
	TreeNodeOperators,
	TreeNodeToggle
} from './widgets';

export interface TreeNodeRendererProps {
	initExpandLevel: TreeDef['initExpandLevel'];
	showIndex?: TreeDef['showIndex'];
	$wrapped: TreeProps['$wrapped'];
	node: TreeNodeDef;
	displayIndex: string;
	lastOfParent: boolean;
	level: number;
}

const useTreeNodeExpand = (ref: MutableRefObject<HTMLDivElement>, state: MutableRefObject<boolean>) => {
	const {fire: fireTree} = useTreeEventBus();
	const {on, off, fire} = useTreeNodeEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSwitchExpand = (fromMyself: boolean) => (marker: string, expanded: boolean, locateToMarker?: string) => {
			if (expanded != state.current) {
				// trigger by myself
				state.current = expanded;
				forceUpdate();
				// notify parent in case of the expanding is fired programmatically
				fire && fire(TreeNodeEventTypes.SWITCH_PARENT_EXPAND, marker, state.current);
				// if from myself, try to scroll this node and descendants into view
				if (fromMyself && expanded && ref.current != null) {
					// the problem is, expand is async, so we need to wait for expanding of all ascendants to finish
					const allExpanded = (element: HTMLDivElement): boolean => {
						if (element.getAttribute('data-expanded') !== 'true') {
							return false;
						} else {
							const wrapper = element.parentElement;
							if (wrapper.parentElement.getAttribute(DOM_KEY_WIDGET) === 'd9-tree-content-container') {
								// reach the root
								return true;
							} else {
								return allExpanded(wrapper.parentElement.firstElementChild as HTMLDivElement);
							}
						}
					};
					const tryToScroll = () => {
						setTimeout(() => {
							if (!allExpanded(ref.current.closest('div[data-w=d9-tree-node-container]'))) {
								tryToScroll();
							} else {
								const wrapper = ref.current.closest('div[data-w=d9-tree-node-wrapper]');
								const {top, height} = wrapper.getBoundingClientRect();
								const treeContainer = wrapper.closest('div[data-w=d9-tree-content-container]');
								const {top: treeTop, height: treeHeight} = treeContainer.getBoundingClientRect();
								if (top + height < treeTop + treeHeight) {
									// already in view, do nothing
								} else if (height > treeHeight) {
									treeContainer.scrollTo({
										top: treeContainer.scrollTop + top - treeTop,
										behavior: 'smooth'
									});
								} else {
									treeContainer.scrollTo({
										top: treeContainer.scrollTop + top + height - treeTop - treeHeight,
										behavior: 'smooth'
									});
								}
								if (VUtils.isNotBlank(locateToMarker)) {
									fireTree(TreeEventTypes.SCROLL_NODE_INTO_VIEW, locateToMarker);
								}
							}
						}, 100);
					};
					tryToScroll();
				}
			}
		};
		const onSwitchMyExpand = onSwitchExpand(true);
		const onSwitchMyExpandFromChild = onSwitchExpand(false);
		on && on(TreeNodeEventTypes.SWITCH_MY_EXPAND, onSwitchMyExpand);
		on && on(TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, onSwitchMyExpandFromChild);
		return () => {
			off && off(TreeNodeEventTypes.SWITCH_MY_EXPAND, onSwitchMyExpand);
			off && off(TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, onSwitchMyExpandFromChild);
		};
	}, [on, off, fire, fireTree, forceUpdate, ref, state]);
};

const useTreeNodeCheckedChanged = () => {
	const {on, off, fire} = useTreeNodeEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSwitchMyChecked = (marker: string, checked: boolean) => {
			forceUpdate();
			fire && fire(TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, marker, checked);
			fire && fire(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, marker, checked);
		};
		const onSwitchMyCheckedFromChild = (marker: string, checked: boolean) => {
			forceUpdate();
			fire && fire(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, marker, checked);
		};
		on && on(TreeNodeEventTypes.SWITCH_MY_CHECKED, onSwitchMyChecked);
		on && on(TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, onSwitchMyCheckedFromChild);
		return () => {
			off && off(TreeNodeEventTypes.SWITCH_MY_CHECKED, onSwitchMyChecked);
			off && off(TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, onSwitchMyCheckedFromChild);
		};
	}, [on, off, fire, forceUpdate]);
};

export interface TreeNodeOperatorsState {
	visible: boolean;
	top: number;
	right: number;
}

export const TreeNodeRenderer = (props: TreeNodeRendererProps) => {
	const {
		initExpandLevel, showIndex, $wrapped,
		node, displayIndex, lastOfParent, level
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const operatorsRef = useRef<HTMLDivElement>(null);
	const expanded = useRef(level <= initExpandLevel);
	const {fire: fireGlobal} = useGlobalEventBus();
	const globalHandlers = useGlobalHandlers();
	const {on: onTree, off: offTree, fire: fireTree} = useTreeEventBus();
	const {on, off, fire} = useTreeNodeEventBus();
	const [operators, setOperators] = useState<TreeNodeOperatorsState>({visible: false, top: 0, right: 0});
	useTreeNodeExpand(ref, expanded);
	useTreeNodeCheckedChanged();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const onRefreshNode = (_marker: string) => {
			forceUpdate();
		};
		on && on(TreeNodeEventTypes.REFRESH_NODE, onRefreshNode);
		return () => {
			off && off(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshNode);
		};
	}, [on, off, forceUpdate, node]);
	useEffect(() => {
		const onScrollNodeIntoView = (marker: string) => {
			if (node.marker !== marker) {
				return;
			}
			ref.current?.scrollIntoView({behavior: 'smooth'});
		};
		onTree(TreeEventTypes.SCROLL_NODE_INTO_VIEW, onScrollNodeIntoView);
		return () => {
			offTree(TreeEventTypes.SCROLL_NODE_INTO_VIEW, onScrollNodeIntoView);
		};
	}, [onTree, offTree, node, ref]);

	const onToggleClicked = (event: MouseEvent<HTMLSpanElement>) => {
		event.stopPropagation();
		event.preventDefault();
		// declare myself is switched
		fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, !expanded.current);
	};
	const onEntityClicked = (event: MouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();

		// no wait
		node.click && node.click(node, {global: globalHandlers});

		const clipped = node.marker;
		const key = `${GlobalEventPrefix.TREE_NODE_CLICKED}:${clipped}`;
		// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
		// @ts-ignore
		fireGlobal && fireGlobal(GlobalEventTypes.CUSTOM_EVENT, key, GlobalEventPrefix.TREE_NODE_CLICKED, clipped, {
			root: $wrapped.$root, model: $wrapped.$model, value: node.value
		});
	};
	const onMouseEnter = () => {
		const {
			top: treeTop, left: treeLeft, width: treeWidth
		} = ref.current.closest('div[data-w=d9-tree]').getBoundingClientRect();
		const {top, height} = ref.current.getBoundingClientRect();
		fireTree(TreeEventTypes.SHOW_HOVER_BOX, top - treeTop, height);
		if (!hasOperators || operators.visible) {
			return;
		}
		const {height: operatorsHeight} = operatorsRef.current.getBoundingClientRect();
		if (top - operatorsHeight < treeTop) {
			setOperators({visible: true, top: top + height, right: window.innerWidth - (treeLeft + treeWidth)});
		} else {
			setOperators({
				visible: true,
				top: top - operatorsHeight,
				right: window.innerWidth - (treeLeft + treeWidth)
			});
		}
	};
	const onMouseLeave = () => {
		fireTree(TreeEventTypes.HIDE_HOVER_BOX);
		if (!hasOperators) {
			return;
		}
		setOperators(state => ({...state, visible: false}));
	};
	const onAddClicked = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setOperators(state => ({...state, visible: false}));

		try {
			const added = await node.add(node, {global: globalHandlers});
			if (added == null) {
				// no return, refresh me
				fire(TreeNodeEventTypes.CHILD_ADDED, node.marker);
			} else if (Array.isArray(added)) {
				const [placeholder, promise] = added;
				// placeholder, refresh me
				fire(TreeNodeEventTypes.CHILD_ADDED, node.marker, placeholder, true);
				// wait for promise resolved, refresh me again
				try {
					const added = await promise;
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					fire(TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, node.marker, added ?? (void 0));
				} catch {
					fire(TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, node.marker, placeholder);
				}
			} else {
				fire(TreeNodeEventTypes.CHILD_ADDED, node.marker, added as TreeNodeDef, false);
			}
		} catch {
			// do nothing, add is failed or cancelled outside.
		}
	};
	const onRemoveClicked = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setOperators(state => ({...state, visible: false}));

		try {
			await node.remove(node, {global: globalHandlers});
			fire(TreeNodeEventTypes.NODE_REMOVED, node.marker, node);
		} catch {
			// do nothing, remove is failed or cancelled outside.
		}
	};

	const $p2r = PPUtils.concat($wrapped.$p2r, node.$ip2r);
	const checkable = (node.checkable ?? false) && node.checked != null && node.check != null;
	let checked: Nullable<boolean> = (void 0);
	let check: Nullable<TreeNodeDef['check']> = (void 0);
	let onCheckValueChanged: Nullable<UnwrappedCheckboxProps['onValueChange']> = (void 0);
	if (checkable) {
		checked = node.checked(node);
		check = node.check;
		onCheckValueChanged = async (value: PropValue) => {
			// call function to set value, should include itself, descendants and ancestors
			await check(node, value as boolean, TreeNodeCheckedChangeFrom.FROM_SELF, {global: globalHandlers});
			fire && fire(TreeNodeEventTypes.SWITCH_MY_CHECKED, node.marker, value as boolean);
		};
	}
	const addable = (node.addable ?? false) && node.add != null;
	const removable = (node.removable ?? false) && node.remove != null;
	const hasOperators = addable || removable;

	const label = <TreeNodeLabel>
		{checkable
			? <UnwrappedCheckbox $pp={NUtils.generateReactKey()} value={checked}
			                     onValueChange={onCheckValueChanged}
			                     data-tree-node-check={true}/>
			: null}
		<LabelLike $wrapped={{...$wrapped, $model: node.value, $p2r}} label={node.label}/>
	</TreeNodeLabel>;

	const children = node.$displayChildren ?? node.$children ?? [];

	return <TreeNodeContainer data-expanded={expanded.current} data-last-of-parent={lastOfParent} level={level}
	                          onClick={onEntityClicked}
	                          onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
	                          ref={ref}>
		{hasOperators
			? <TreeNodeOperators data-visible={operators.visible} top={operators.top} right={operators.right}
			                     ref={operatorsRef}>
				{addable
					? <UnwrappedButton onClick={onAddClicked} leads={['$icons.plus']}
					                   ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}/>
					: null}
				{removable
					? <UnwrappedButton onClick={onRemoveClicked} leads={['$icons.xmark']}
					                   ink={ButtonInk.PRIMARY} fill={ButtonFill.FILL}/>
					: null}
			</TreeNodeOperators>
			: null}
		<TreeNodeContent>
			{children.length !== 0
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