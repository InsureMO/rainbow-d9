export enum TreeEventTypes {
	SWITCH_SEARCH_BOX = 'switch-search-box',
	DISCARD_FILTER = 'discard-filter',
	FILTER_CHANGED = 'filter-changed'
}

export interface TreeEventBus {
	fire(type: TreeEventTypes.SWITCH_SEARCH_BOX): this;

	on(type: TreeEventTypes.SWITCH_SEARCH_BOX, listener: () => void): this;

	off(type: TreeEventTypes.SWITCH_SEARCH_BOX, listener: () => void): this;

	fire(type: TreeEventTypes.DISCARD_FILTER): this;

	on(type: TreeEventTypes.DISCARD_FILTER, listener: () => void): this;

	off(type: TreeEventTypes.DISCARD_FILTER, listener: () => void): this;

	fire(type: TreeEventTypes.FILTER_CHANGED, filter: string): this;

	on(type: TreeEventTypes.FILTER_CHANGED, listener: (filter: string) => void): this;

	off(type: TreeEventTypes.FILTER_CHANGED, listener: (filter: string) => void): this;
}
