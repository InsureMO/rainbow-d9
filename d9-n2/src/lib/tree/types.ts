import {ContainerDef, PropertyPath, PropValue, WidgetProps} from '@rainbow-d9/n1';
import {ReactNode} from 'react';
import {CaptionDef} from '../caption';
import {OmitHTMLProps2, OmitNodeDef} from '../types';

export interface TreeNodeDef {
	/**
	 * is value is primitive value, then addable/removable/checkable will be ignored.
	 * and this node must be a leaf node
	 */
	value: PropValue;
	/**
	 * inside property path, relative to tree model.
	 * 1. $ip2r contains $ip2p.
	 * 2. concat $p2r and $ip2r, is absolute path of this node model (value above)
	 */
	$ip2r: PropertyPath;
	/** inside property path, relative to parent */
	$ip2p: PropertyPath;
	marker?: string;
	label?: string | ReactNode | CaptionDef;
	/** default false */
	checkable?: boolean;
	/** default false */
	addable?: boolean;
	/** default false */
	removable?: boolean;
	/** is leaf node or not, even it is leaf, addable still might be worked */
	leaf?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TreeNodeDetect = (parentNode?: TreeNodeDef) => Array<TreeNodeDef>;

/** Tree configuration definition */
export type TreeDef = ContainerDef & OmitHTMLProps2<HTMLDivElement, 'title' | 'height'> & {
	/** show half checked when not all sub nodes but at least one is checked, default true */
	halfChecked?: boolean;
	/** initial expanded level, default 0. -1 means all collapsed */
	initExpandLevel?: number;
	/** show node index, default false */
	showIndex?: boolean;
	detective?: TreeNodeDetect;
	height?: number | string;
};
/** Tree widget definition, with html attributes */
export type TreeProps = OmitNodeDef<TreeDef> & WidgetProps;
