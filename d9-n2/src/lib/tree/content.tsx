import {Nullable, PPUtils, VUtils} from '@rainbow-d9/n1';
import React, {Fragment, MouseEvent, ReactNode, useEffect, useState} from 'react';
import {internationalize, IntlLabel, toIntlLabel} from '../intl-label';
import {ChildTreeNodes} from './child-nodes';
import {useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';
import {TreeNodeEventBusProvider} from './event/tree-node-event-bus';
import {TreeNode} from './node';
import {TreeNodeEventBridge} from './node-event-bridge';
import {TreeNodeDef, TreeNodeDetect, TreeProps} from './types';
import {TreeContentContainer} from './widgets';

export const NO_MATCHED_TREE_NODE = '__no_matched__';

export interface TreeContentMouseState {
	x: number;
	y: number;
	inside: boolean;
}

export const TreeContentMouseStateHolder = () => {
	const {on, off} = useTreeEventBus();
	const [mouse, setMouse] = useState<TreeContentMouseState>({x: 0, y: 0, inside: false});
	useEffect(() => {
		const onContentMouseMove = (x, y) => setMouse({x, y, inside: true});
		const onContentMouseLeave = () => setMouse({x: 0, y: 0, inside: false});
		const onAskMousePosition = (callback: (x: number, y: number) => void) => {
			if (mouse.inside) {
				callback(mouse.x, mouse.y);
			}
		};
		on(TreeEventTypes.CONTENT_MOUSE_MOVE, onContentMouseMove);
		on(TreeEventTypes.CONTENT_MOUSE_LEAVE, onContentMouseLeave);
		on(TreeEventTypes.ASK_MOUSE_POSITION, onAskMousePosition);
		return () => {
			off(TreeEventTypes.CONTENT_MOUSE_MOVE, onContentMouseMove);
			off(TreeEventTypes.CONTENT_MOUSE_LEAVE, onContentMouseLeave);
			off(TreeEventTypes.ASK_MOUSE_POSITION, onAskMousePosition);
		};
	}, [on, off, mouse]);
	return <Fragment/>;
};

export interface TreeContentProps {
	root: TreeNodeDef;
	initExpandLevel: number;
	showIndex: boolean;
	detect: TreeNodeDetect;
	noMatched?: ReactNode;
	$pp: string;
	$wrapped: TreeProps['$wrapped'];
	refresh: () => void;
}

export const TreeContent = (props: TreeContentProps) => {
	const {
		root, $pp, initExpandLevel, showIndex,
		noMatched = <IntlLabel keys={['tree', 'node', 'noMatched']} value="No matched node."/>,
		detect, $wrapped, refresh
	} = props;
	const {$p2r} = $wrapped;

	const [filter, setFilter] = useState('');
	const {on, off, fire} = useTreeEventBus();
	useEffect(() => {
		const onDiscardFilter = () => setFilter('');
		const onFilterChanged = (filter: string) => setFilter(`${filter ?? ''}`.trim());
		on(TreeEventTypes.DISCARD_FILTER, onDiscardFilter);
		on(TreeEventTypes.FILTER_CHANGED, onFilterChanged);
		return () => {
			off(TreeEventTypes.DISCARD_FILTER, onDiscardFilter);
			off(TreeEventTypes.FILTER_CHANGED, onFilterChanged);
		};
	}, [on, off]);

	// path to root of model of whole tree
	const node$p2r = PPUtils.absolute($p2r, $pp);

	const children = () => {
		if (VUtils.isBlank(filter)) {
			return root.$children ?? [];
		}
		const matches = filter.trim().toLowerCase();
		const onlyChecked = matches === ':checked';
		const onlyUnchecked = matches === ':unchecked';
		const filtered = (node: TreeNodeDef): Nullable<TreeNodeDef> => {
			const children = (node.$children ?? [])
				.map(child => filtered(child))
				.filter(x => x != null);
			if (children.length !== 0) {
				return {...node, $children: children};
			} else if (onlyChecked) {
				if (node.checkable && node.checked(node)) {
					return {...node, $children: []};
				}
			} else if (onlyUnchecked) {
				if (node.checkable && (node.checked(node) === false)) {
					return {...node, $children: []};
				}
			} else if (node.stringify != null) {
				if ((node.stringify(node) ?? '').toLowerCase().includes(matches)) {
					return {...node, $children: []};
				}
			} else if (typeof node.label === 'string') {
				const label = internationalize(node.label, [node.label]);
				if (label.toLowerCase().includes(matches)) {
					return {...node, $children: []};
				}
			}
			// cannot perform compare, always not match
			return null;
		};
		return (root.$children ?? [])
			.map(child => filtered(child))
			.filter(x => x != null);
	};
	const childNodesFiltered = children();
	if (childNodesFiltered.length === 0) {
		const def: TreeNodeDef = {
			value: NO_MATCHED_TREE_NODE, label: toIntlLabel(noMatched),
			checkable: false, removable: false, addable: false,
			$ip2r: PPUtils.absolute($p2r, $pp), $ip2p: $pp
		};
		return <TreeContentContainer>
			<TreeNode initExpandLevel={0} showIndex={false}
			          detect={detect} $wrapped={{...$wrapped, $p2r: node$p2r}}
			          node={def}
			          displayIndex="0" lastOfParent={true} level={0}/>
		</TreeContentContainer>;
	} else {
		// bridge event to me
		// if it is top level node, then will not be wrapped by tree node event bus provider
		// then fire is undefined
		// and in this case, there is no need to notify parent this event, simply ignore
		const expandParent = VUtils.noop;
		const nodeCheckedChanged = VUtils.noop;
		const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
			fire(TreeEventTypes.CONTENT_MOUSE_MOVE, event.clientX, event.clientY);
		};
		const onMouseLeave = () => {
			fire(TreeEventTypes.CONTENT_MOUSE_LEAVE);
		};
		const onScroll = () => {
			fire(TreeEventTypes.ASK_MOUSE_POSITION, (x, y) => {
				const element = document.elementFromPoint(x, y);
				const node = element.closest('div[data-w=d9-tree-node-container]');
				if (node == null) {
					return;
				}
				const {top: treeTop} = node.closest('div[data-w=d9-tree]').getBoundingClientRect();
				const {top, height} = node.getBoundingClientRect();
				fire(TreeEventTypes.SHOW_HOVER_BOX, top - treeTop, height);
			});
		};
		return <TreeContentContainer onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onScroll={onScroll}>
			<TreeContentMouseStateHolder/>
			<TreeNodeEventBusProvider>
				<TreeNodeEventBridge node={root}
				                     expandParent={expandParent} nodeCheckedChanged={nodeCheckedChanged}
				                     nodeRemoved={refresh}/>
				<ChildTreeNodes node={root} displayChildren={childNodesFiltered} detect={detect}
				                initExpandLevel={initExpandLevel} level={-1}
				                showIndex={showIndex} displayIndex=""
				                $wrapped={{...$wrapped, $p2r: node$p2r}}/>
			</TreeNodeEventBusProvider>
		</TreeContentContainer>;
	}
};