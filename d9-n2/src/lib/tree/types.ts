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
	click?: (node: TreeNodeDef, handlers: GlobalEventHandlers) => Promise<void>;
	dblClick?: (node: TreeNodeDef, handlers: GlobalEventHandlers) => Promise<void>;
	/** get checked, mandatory when checkable */
	checked?: (node: TreeNodeDef) => boolean;
	/** changed checked, mandatory when checkable */
	check?: (node: TreeNodeDef, checked: boolean, from: TreeNodeCheckedChangeFrom, handlers: GlobalEventHandlers) => Promise<void>;
	/**
	 * add child node, mandatory when addable.
	 * 1. returns void, means child node added, refresh children of given node
	 * 2. returns child node def, means child node added, refresh children of given node, and scroll new node into view
	 * 3. return an array, means child node def is a placeholder,
	 * 3.1 refresh children of given node first, scroll placeholder node into view
	 * 3.2 when promise resolved, refresh children of given node again
	 * 3.3 when promise rejected, refresh children of given node again
	 * it's important that memory structure between parent and added node, must be maintained in add function.
	 * existing child nodes can be reached from node.$children.
	 * never change given parent node, only change its children.
	 */
	add?: (parent: TreeNodeDef, handlers: GlobalEventHandlers) => Promise<void | TreeNodeDef | [TreeNodeDef, Promise<void | TreeNodeDef>]>;
	/**
	 * remove node from parent, mandatory when removable.
	 * 1. when promise resolved, refresh parent's children of given node
	 * 2. when promise rejected, do nothing
	 * it's important that memory structure between parent and added node, must be maintained in add function.
	 * parent can be reached from node.$parent.
	 * never change parent node, only remove given node from its parent.
	 */
	remove?: (node: TreeNodeDef, handlers: GlobalEventHandlers) => Promise<void>;
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
	/**
	 * children nodes, will be detected automatically,
	 * 1. do not set anything to this attribute outside,
	 * 2. change this attribute when tree is rendered, and want to change children of this node.
	 */
	$children?: Array<TreeNodeDef>;
	/**
	 * children nodes of this node, will be detected automatically,
	 * never do anything to this attribute outside.
	 */
	$displayChildren?: Array<TreeNodeDef>;
	/**
	 * parent node, will be detected automatically, do not set anything to this attribute outside.
	 */
	$parent?: TreeNodeDef;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TreeNodeDetect = (parentNode: Undefinable<TreeNodeDef>, options: GlobalEventHandlers) => Array<TreeNodeDef>;

/** Tree configuration definition */
export type TreeDef = NodeDef & OmitHTMLProps2<HTMLDivElement, 'title' | 'height'> & {
	/** initial expanded level, default 0. -1 means all collapsed */
	initExpandLevel?: number;
	/** show node index, default false */
	showIndex?: boolean;
	detective?: TreeNodeDetect;
	height?: number | string;
	marker?: string;
	noMatched?: ReactNode;
	/** disable the search box, default false */
	disableSearchBox?: boolean;
};
/** Tree widget definition, with html attributes */
export type TreeProps = OmitNodeDef<TreeDef> & WidgetProps & {
	/** for programmatic usage */
	children?: ReactNode;
};
