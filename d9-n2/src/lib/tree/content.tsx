import {Nullable, PPUtils, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';
import {TreeNode} from './node';
import {TreeNodeDef, TreeNodeDetect, TreeProps} from './types';
import {TreeContentContainer} from './widgets';

export interface TreeContentProps {
	root: TreeNodeDef;
	halfChecked: boolean;
	initExpandLevel: number;
	showIndex: boolean;
	detect: TreeNodeDetect;
	$pp: string;
	$wrapped: TreeProps['$wrapped'];
}

export const TreeContent = (props: TreeContentProps) => {
	const {
		root, $pp,
		halfChecked, initExpandLevel, showIndex,
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
				if (children.length === (node.$children ?? []).length) {
					// not filtered
					return node;
				} else {
					return {...node, $children: children};
				}
			}
			if (onlyChecked) {
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
				if (node.label.toLowerCase().includes(matches)) {
					return {...node, $children: []};
				}
			} else {
				// cannot perform compare, always not match
				return null;
			}
		};
		return (root.$children ?? []).map(child => filtered(child)).filter(x => x != null);
	};

	return <TreeContentContainer>
		{children().map((child, index) => {
			const last = !canAdd && index === childrenCount - 1;
			const myDisplayIndex = `${index + 1}`;
			return <TreeNode halfChecked={halfChecked} initExpandLevel={initExpandLevel} showIndex={showIndex}
				// change path to root as path to root of model of whole tree
				// and keep this path to root for all tree nodes
				             detective={detect} $wrapped={{...$wrapped, $p2r: node$p2r}}
				             node={child}
				             displayIndex={myDisplayIndex} lastOfParent={last} level={0}
				             key={child.$ip2p}/>;
		})}
	</TreeContentContainer>;
};