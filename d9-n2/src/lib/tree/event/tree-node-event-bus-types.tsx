export enum TreeNodeEventTypes {
	SWITCH_EXPAND = 'switch-expand',
}

export interface TreeNodeEventBus {
	fire(type: TreeNodeEventTypes.SWITCH_EXPAND, pathToTreeRoot: string, expanded: boolean): this;

	on(type: TreeNodeEventTypes.SWITCH_EXPAND, listener: (pathToTreeRoot: string, expanded: boolean) => void): this;

	off(type: TreeNodeEventTypes.SWITCH_EXPAND, listener: (pathToTreeRoot: string, expanded: boolean) => void): this;
}
