import {TreeNodeDef} from '../types';

export enum TreeNodeEventTypes {
	SWITCH_MY_EXPAND = 'switch-my-expand',
	SWITCH_MY_EXPAND_FROM_CHILD = 'switch-my-expand-from-child',
	SWITCH_PARENT_EXPAND = 'switch-parent-expand',
	SWITCH_MY_CHECKED = 'switch-my-checked',
	SWITCH_MY_CHECKED_FROM_CHILD = 'switch-my-checked-from-child',
	SWITCH_CHILDREN_CHECKED = 'switch-children-checked',
	SWITCH_PARENT_CHECKED = 'switch-parent-checked',

	REFRESH_NODE = 'refresh-node',
	/** detect children first, and refresh anyway */
	REFRESH_CHILD_NODES = 'refresh-child-nodes',
	REFRESH_CHILD_NODES_ON_REMOVED = 'refresh-child-nodes-on-removed',

	CHILD_ADDED = 'child-added',
	CHILD_PLACEHOLDER_REPLACED = 'child-placeholder-replaced',
	CHILD_PLACEHOLDER_REMOVED = 'child-placeholder-removed',
	NODE_REMOVED = 'node-removed',
}

export interface TreeNodeEventBus {
	fire(type: TreeNodeEventTypes.SWITCH_MY_EXPAND, marker: string, expanded: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_MY_EXPAND, listener: (marker: string, expanded: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_MY_EXPAND, listener: (marker: string, expanded: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, marker: string, expanded: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, listener: (marker: string, expanded: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, listener: (marker: string, expanded: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_PARENT_EXPAND, marker: string, expanded: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_PARENT_EXPAND, listener: (marker: string, expanded: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_PARENT_EXPAND, listener: (marker: string, expanded: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_MY_CHECKED, marker: string, checked: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_MY_CHECKED, listener: (marker: string, checked: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_MY_CHECKED, listener: (marker: string, checked: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, marker: string, checked: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, listener: (marker: string, checked: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, listener: (marker: string, checked: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, marker: string, checked: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, listener: (marker: string, checked: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, listener: (marker: string, checked: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_PARENT_CHECKED, marker: string, checked: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_PARENT_CHECKED, listener: (marker: string, checked: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_PARENT_CHECKED, listener: (marker: string, checked: boolean) => void): this;

	fire(type: TreeNodeEventTypes.REFRESH_NODE, marker: string): this;

	on(type: TreeNodeEventTypes.REFRESH_NODE, listener: (marker: string) => void): this;

	off(type: TreeNodeEventTypes.REFRESH_NODE, listener: (marker: string) => void): this;

	fire(type: TreeNodeEventTypes.REFRESH_CHILD_NODES, marker: string, detect?: boolean): this;

	on(type: TreeNodeEventTypes.REFRESH_CHILD_NODES, listener: (marker: string, detect?: boolean) => void): this;

	off(type: TreeNodeEventTypes.REFRESH_CHILD_NODES, listener: (marker: string, detect?: boolean) => void): this;

	fire(type: TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, marker: string, removedNode: TreeNodeDef): this;

	on(type: TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, listener: (marker: string, removedNode: TreeNodeDef) => void): this;

	off(type: TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, listener: (marker: string, removedNode: TreeNodeDef) => void): this;

	fire(type: TreeNodeEventTypes.CHILD_ADDED, marker: string, addedNode?: TreeNodeDef, placeholder?: boolean): this;

	on(type: TreeNodeEventTypes.CHILD_ADDED, listener: (marker: string, addedNode?: TreeNodeDef, placeholder?: boolean) => void): this;

	off(type: TreeNodeEventTypes.CHILD_ADDED, listener: (marker: string, addedNode?: TreeNodeDef, placeholder?: boolean) => void): this;

	fire(type: TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, marker: string, addedNode?: TreeNodeDef): this;

	on(type: TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, listener: (marker: string, addedNode?: TreeNodeDef) => void): this;

	off(type: TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, listener: (marker: string, addedNode?: TreeNodeDef) => void): this;

	fire(type: TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, marker: string, placeholderNode: TreeNodeDef): this;

	on(type: TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, listener: (marker: string, placeholderNode: TreeNodeDef) => void): this;

	off(type: TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, listener: (marker: string, placeholderNode: TreeNodeDef) => void): this;

	fire(type: TreeNodeEventTypes.NODE_REMOVED, marker: string, removedNode: TreeNodeDef): this;

	on(type: TreeNodeEventTypes.NODE_REMOVED, listener: (marker: string, removedNode: TreeNodeDef) => void): this;

	off(type: TreeNodeEventTypes.NODE_REMOVED, listener: (marker: string, removedNode: TreeNodeDef) => void): this;
}
