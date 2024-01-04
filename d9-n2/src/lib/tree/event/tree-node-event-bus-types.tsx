export enum TreeNodeEventTypes {
	EXPANDED = 'expanded',
}

export interface TreeNodeEventBus {
	fire(type: TreeNodeEventTypes.EXPANDED, pathToTreeRoot: string): this;

	on(type: TreeNodeEventTypes.EXPANDED, listener: (pathToTreeRoot: string) => void): this;

	off(type: TreeNodeEventTypes.EXPANDED, listener: (pathToTreeRoot: string) => void): this;
}
