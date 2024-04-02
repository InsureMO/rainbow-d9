import {NodeDef, PropertyPath, PropValue, Undefinable, WidgetProps} from '@rainbow-d9/n1';
import {ReactNode} from 'react';
import {GlobalEventHandlers, OmitHTMLProps2, OmitNodeDef} from '../types';

export interface TreeNodeOperation {
	/** checkable, default false */
	checkable?: boolean;
	/** addable, default false */
	addable?: boolean;
	/** removable, default false */
	removable?: boolean;
}

export enum TreeNodeCheckedChangeFrom {
	FROM_CHILD = -1, FROM_SELF = 0, FROM_PARENT = 1
}

export interface TreeNodeOperation2 extends TreeNodeOperation {
	/** get checked, mandatory when checkable */
	checked?: (node: TreeNodeDef) => boolean;
	/** changed checked, mandatory when checkable */
	check?: (node: TreeNodeDef, checked: boolean, from: TreeNodeCheckedChangeFrom, handlers: GlobalEventHandlers) => Promise<void>;
}

export interface TreeNodeDef extends TreeNodeOperation2 {
	/**
	 * is value is primitive value, then addable/removable/checkable will be ignored.
	 * and this node must be a leaf node
	 */
	value: PropValue;
	/**
	 * inside property path to tree model root.
	 * 1. $ip2r contains $ip2p.
	 * 2. concat $p2r and $ip2r, is absolute path of this node model (value above)
	 */
	$ip2r: PropertyPath;
	/** inside property path to parent. */
	$ip2p: PropertyPath;
	marker?: string;
	label?: string | ReactNode | NodeDef;
	stringify?: (node: TreeNodeDef) => string;
	$children?: Array<TreeNodeDef>;
	$parent?: TreeNodeDef;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TreeNodeDetect = (parentNode: Undefinable<TreeNodeDef>, options: GlobalEventHandlers) => Array<TreeNodeDef>;

/** Tree configuration definition */
export type TreeDef = NodeDef & OmitHTMLProps2<HTMLDivElement, 'title' | 'height'> & {
	/** show half checked when not all sub nodes but at least one is checked, default true */
	halfChecked?: boolean;
	/** initial expanded level, default 0. -1 means all collapsed */
	initExpandLevel?: number;
	/** show node index, default false */
	showIndex?: boolean;
	detective?: TreeNodeDetect;
	height?: number | string;
	marker?: string;
} & TreeNodeOperation;
/** Tree widget definition, with html attributes */
export type TreeProps = OmitNodeDef<TreeDef> & WidgetProps;
