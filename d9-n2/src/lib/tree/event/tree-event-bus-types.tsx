export enum TreeEventTypes {
	EXPAND_NODE = 'expand-node',
	COLLAPSE_NODE = 'collapse-node'
}

export interface TreeEventBus {
	fire(type: TreeEventTypes.EXPAND_NODE, marker: string): this;

	on(type: TreeEventTypes.EXPAND_NODE, listener: (marker: string) => void): this;

	off(type: TreeEventTypes.EXPAND_NODE, listener: (marker: string) => void): this;

	fire(type: TreeEventTypes.COLLAPSE_NODE, marker: string): this;

	on(type: TreeEventTypes.COLLAPSE_NODE, listener: (marker: string) => void): this;

	off(type: TreeEventTypes.COLLAPSE_NODE, listener: (marker: string) => void): this;
}
