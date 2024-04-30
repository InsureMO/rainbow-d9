import {Nullable, PPUtils, VUtils} from '@rainbow-d9/n1';
import React, {ReactNode, useEffect, useState} from 'react';
import {internationalize, IntlLabel, toIntlLabel} from '../intl-label';
import {useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';
import {TreeNode} from './node';
import {TreeNodeDef, TreeNodeDetect, TreeProps} from './types';
import {TreeContentContainer} from './widgets';

export const NO_MATCHED_TREE_NODE = '__no_matched__';

export interface TreeContentProps {
	root: TreeNodeDef;
	initExpandLevel: number;
	showIndex: boolean;
	detect: TreeNodeDetect;
	noMatched?: ReactNode;
	$pp: string;
	$wrapped: TreeProps['$wrapped'];
}

export const TreeContent = (props: TreeContentProps) => {
	const {
		root, $pp, initExpandLevel, showIndex,
		noMatched = <IntlLabel keys={['tree', 'node', 'noMatched']} value="No matched node."/>,
		detect, $wrapped
	} = props;
	const {$p2r} = $wrapped;

	const [filter, setFilter] = useState('');
	const {on, off} = useTreeEventBus();
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

	const childrenCount = root.$children.length;
	// path to root of model of whole tree
	const node$p2r = PPUtils.absolute($p2r, $pp);
	const canAdd = root.addable ?? false;

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
			          detective={detect} $wrapped={{...$wrapped, $p2r: node$p2r}}
			          node={def}
			          displayIndex="0" lastOfParent={true} level={0}/>
		</TreeContentContainer>;
	} else {
		return <TreeContentContainer>
			{childNodesFiltered.map((child, index) => {
				const last = !canAdd && index === childrenCount - 1;
				const myDisplayIndex = `${index + 1}`;
				return <TreeNode initExpandLevel={initExpandLevel} showIndex={showIndex}
					// change path to root as path to root of model of whole tree
					// and keep this path to root for all tree nodes
					             detective={detect} $wrapped={{...$wrapped, $p2r: node$p2r}}
					             node={child}
					             displayIndex={myDisplayIndex} lastOfParent={last} level={0}
					             key={child.$ip2p}/>;
			})}
		</TreeContentContainer>;
	}
};