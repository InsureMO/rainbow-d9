import {MUtils, PPUtils, PROPERTY_PATH_ME, registerWidget, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {TreeEventBusProvider} from './event/tree-event-bus';
import {TreeNode} from './node';
import {TreeNodeDef, TreeNodeDetect, TreeProps} from './types';
import {ATree} from './widgets';

const buildDetective = (detective: TreeNodeDetect) => {
	return detective ?? ((node) => {
		if (node == null || node.value == null) {
			return [];
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let nodes: Array<any>;
		let parentMarker = node.marker;
		if (Array.isArray(node.value)) {
			nodes = node.value;
		} else {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			nodes = (node.value as any).children ?? [];
			parentMarker = `${node.marker ?? ''}.children`;
		}
		return nodes.map((item, index, items) => {
			if (item == null) {
				return null;
			} else {
				const path = `[${index}]`;
				return {
					value: item, $ip2r: PPUtils.concat(node.$ip2r, path), $ipp: path,
					marker: VUtils.isBlank(node.marker) ? path : `${parentMarker}${path}`,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					label: VUtils.isPrimitive(item) ? `${item ?? ''}` : ((item as any).label ?? ''),
					checkable: false,
					addable: false,
					removable: false,
					leaf: index === items.length - 1
				} as TreeNodeDef;
			}
		}).filter(item => item != null);
	});
};

export const InternalTree = forwardRef((props: TreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {
		$pp,
		halfChecked, initExpandLevel = -1, showIndex, detective,
		height = 300,
		$wrapped, ...rest
	} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const detect = buildDetective(detective);
	const node$p2r = PPUtils.absolute($p2r, $pp);
	const rootNodeValue = MUtils.getValue($wrapped.$model, $pp);
	// root node never show, only for create top level nodes
	const rootNodeDef: TreeNodeDef = {
		value: rootNodeValue, $ip2r: PROPERTY_PATH_ME, $ipp: PROPERTY_PATH_ME,
		label: '', checkable: false, addable: false, removable: false, leaf: false
	};
	const children = detect(rootNodeDef) ?? [];
	const childrenCount = children.length;

	return <ATree {...rest} data-disabled={$disabled} data-visible={$visible} height={height}
	              id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	              ref={ref}>
		{children.map((child, index) => {
			const canHasChild = VUtils.isPrimitive(child.value);
			const canAdd = canHasChild && (child.addable ?? false);
			const last = !canAdd && index === childrenCount - 1;
			const myDisplayIndex = `${index + 1}`;
			return <TreeNode halfChecked={halfChecked} initExpandLevel={initExpandLevel} showIndex={showIndex}
			                 detective={detect} $wrapped={{...$wrapped, $p2r: node$p2r}}
			                 node={child}
			                 displayIndex={myDisplayIndex} lastOfParent={last} level={0}
			                 key={child.$ipp}/>;
		})}
	</ATree>;
});

export const Tree = forwardRef((props: TreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <TreeEventBusProvider>
		<InternalTree {...props} ref={ref}/>
	</TreeEventBusProvider>;
});

registerWidget({key: 'Tree', JSX: Tree, container: false, array: false});

export * from './types';