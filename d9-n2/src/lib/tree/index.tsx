import {MUtils, PPUtils, PROPERTY_PATH_ME, registerWidget, useForceUpdate} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, useEffect} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus, useGlobalHandlers} from '../global';
import {TreeEventBusProvider} from './event/tree-event-bus';
import {TreeNode} from './node';
import {TreeNodeDef, TreeProps} from './types';
import {buildTreeNodesDetective} from './utils';
import {ATree} from './widgets';

export const InternalTree = forwardRef((props: TreeProps, ref: ForwardedRef<HTMLDivElement>) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {
		$pp,
		halfChecked = true, checkable = false, addable = false, removable = false,
		initExpandLevel = -1, showIndex = false, detective,
		height = 300, marker,
		$wrapped, ...rest
	} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {on, off} = useGlobalEventBus();
	const globalHandlers = useGlobalHandlers();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (prefix !== GlobalEventPrefix.REFRESH_TREE || clipped !== marker) {
				return;
			}
			forceUpdate();
		};
		on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [on, off, forceUpdate, marker]);
	const detect = buildTreeNodesDetective(detective, {checkable, addable, removable});
	// model of whole tree
	const rootNodeValue = MUtils.getValue($wrapped.$model, $pp);
	// root node never show, only for create top level nodes
	const rootNodeDef: TreeNodeDef = {
		// root node use model of whole tree as it value, so path to root and path are both stay itself
		value: rootNodeValue, $ip2r: PROPERTY_PATH_ME, $ip2p: PROPERTY_PATH_ME,
		label: '', checkable: false, addable, removable: false
	};
	rootNodeDef.$children = detect(rootNodeDef, {global: globalHandlers}) ?? [];
	const childrenCount = rootNodeDef.$children.length;
	// path to root of model of whole tree
	const node$p2r = PPUtils.absolute($p2r, $pp);
	const canAdd = rootNodeDef.addable ?? false;

	return <ATree {...rest} data-disabled={$disabled} data-visible={$visible} height={height}
	              id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	              ref={ref}>
		{rootNodeDef.$children.map((child, index) => {
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
