export enum TreeNodeEventTypes {
	SWITCH_MY_EXPAND = 'switch-my-expand',
	SWITCH_MY_EXPAND_FROM_CHILD = 'switch-my-expand-from-child',
	SWITCH_PARENT_EXPAND = 'switch-parent-expand',
	SWITCH_MY_CHECKED = 'switch-my-checked',
	SWITCH_MY_CHECKED_FROM_CHILD = 'switch-my-checked-from-child',
	SWITCH_CHILDREN_CHECKED = 'switch-children-checked',
	SWITCH_PARENT_CHECKED = 'switch-parent-checked',
	REFRESH_CHILD_NODES = 'refresh-child-nodes'
}

export interface TreeNodeEventBus {
	fire(type: TreeNodeEventTypes.SWITCH_MY_EXPAND, pathToTreeRoot: string, expanded: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_MY_EXPAND, listener: (pathToTreeRoot: string, expanded: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_MY_EXPAND, listener: (pathToTreeRoot: string, expanded: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, pathToTreeRoot: string, expanded: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, listener: (pathToTreeRoot: string, expanded: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, listener: (pathToTreeRoot: string, expanded: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_PARENT_EXPAND, pathToTreeRoot: string, expanded: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_PARENT_EXPAND, listener: (pathToTreeRoot: string, expanded: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_PARENT_EXPAND, listener: (pathToTreeRoot: string, expanded: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_MY_CHECKED, pathToTreeRoot: string, checked: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_MY_CHECKED, listener: (pathToTreeRoot: string, checked: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_MY_CHECKED, listener: (pathToTreeRoot: string, checked: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, pathToTreeRoot: string, checked: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, listener: (pathToTreeRoot: string, checked: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, listener: (pathToTreeRoot: string, checked: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, pathToTreeRoot: string, checked: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, listener: (pathToTreeRoot: string, checked: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, listener: (pathToTreeRoot: string, checked: boolean) => void): this;

	fire(type: TreeNodeEventTypes.SWITCH_PARENT_CHECKED, pathToTreeRoot: string, checked: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_PARENT_CHECKED, listener: (pathToTreeRoot: string, checked: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_PARENT_CHECKED, listener: (pathToTreeRoot: string, checked: boolean) => void): this;

	fire(type: TreeNodeEventTypes.REFRESH_CHILD_NODES, pathToTreeRoot: string): this;

	on(type: TreeNodeEventTypes.REFRESH_CHILD_NODES, listener: (pathToTreeRoot: string) => void): this;

	off(type: TreeNodeEventTypes.REFRESH_CHILD_NODES, listener: (pathToTreeRoot: string) => void): this;
}
