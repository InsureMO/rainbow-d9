import {MUtils, PPUtils, PROPERTY_PATH_ME, PropertyPath, registerWidget, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {TreeEventBusProvider} from './event/tree-event-bus';
import {TreeNode} from './node';
import {TreeNodeDef, TreeNodeDetect, TreeProps} from './types';
import {ATree} from './widgets';

const buildDetective = (detective: TreeNodeDetect) => {
	return detective ?? ((parentNode) => {
		if (parentNode == null || parentNode.value == null) {
			return [];
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let nodes: Array<any>;
		let parent$ip2r: PropertyPath;
		if (Array.isArray(parentNode.value)) {
			nodes = parentNode.value;
			parent$ip2r = parentNode.$ip2r;
		} else {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			nodes = (parentNode.value as any).children ?? [];
			parent$ip2r = `${parentNode.$ip2r}.children`;
		}
		return nodes.map((item, index, items) => {
			if (item == null) {
				return null;
			} else {
				const $ip2p = `[${index}]`;
				const $ip2r = PPUtils.concat(parent$ip2r, $ip2p);
				return {
					// concat parent path to root node as my path to root node
					value: item, $ip2r, $ip2p,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					label: VUtils.isPrimitive(item) ? `${item ?? ''}` : ((item as any).label ?? ''),
					checkable: false, addable: false, removable: false,
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
	// model of whole tree
	const rootNodeValue = MUtils.getValue($wrapped.$model, $pp);
	// root node never show, only for create top level nodes
	const rootNodeDef: TreeNodeDef = {
		// root node use model of whole tree as it value, so path to root and path are both stay itself
		value: rootNodeValue, $ip2r: PROPERTY_PATH_ME, $ip2p: PROPERTY_PATH_ME,
		label: '', checkable: false, addable: false, removable: false, leaf: false
	};
	const children = detect(rootNodeDef) ?? [];
	const childrenCount = children.length;
	// path to root of model of whole tree
	const node$p2r = PPUtils.absolute($p2r, $pp);

	return <ATree {...rest} data-disabled={$disabled} data-visible={$visible} height={height}
	              id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	              ref={ref}>
		{children.map((child, index) => {
			const canHasChild = VUtils.isPrimitive(child.value);
			const canAdd = canHasChild && (child.addable ?? false);
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
	</ATree>;
});

export const Tree = forwardRef((props: TreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <TreeEventBusProvider>
		<InternalTree {...props} ref={ref}/>
	</TreeEventBusProvider>;
});

registerWidget({key: 'Tree', JSX: Tree, container: false, array: false});

export * from './types';