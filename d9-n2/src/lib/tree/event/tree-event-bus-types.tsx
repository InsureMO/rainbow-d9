import {TreeNodeDef} from '../types';

export enum TreeEventTypes {
	OPEN_SEARCH_BOX = 'switch-search-box',
	HIDE_SEARCH_BOX = 'hide-search-box',
	DISCARD_FILTER = 'discard-filter',
	FILTER_CHANGED = 'filter-changed',
	ASK_MARKER_ADDER = 'ask-marker-adder',
	SCROLL_NODE_INTO_VIEW = 'scroll-node-into-view',
	SHOW_HOVER_BOX = 'show-hover-box',
	HIDE_HOVER_BOX = 'hide-hover-box'
}

export interface TreeEventBus {
	fire(type: TreeEventTypes.OPEN_SEARCH_BOX): this;

	on(type: TreeEventTypes.OPEN_SEARCH_BOX, listener: () => void): this;

	off(type: TreeEventTypes.OPEN_SEARCH_BOX, listener: () => void): this;

	fire(type: TreeEventTypes.HIDE_SEARCH_BOX): this;

	on(type: TreeEventTypes.HIDE_SEARCH_BOX, listener: () => void): this;

	off(type: TreeEventTypes.HIDE_SEARCH_BOX, listener: () => void): this;

	fire(type: TreeEventTypes.DISCARD_FILTER): this;

	on(type: TreeEventTypes.DISCARD_FILTER, listener: () => void): this;

	off(type: TreeEventTypes.DISCARD_FILTER, listener: () => void): this;

	fire(type: TreeEventTypes.FILTER_CHANGED, filter: string): this;

	on(type: TreeEventTypes.FILTER_CHANGED, listener: (filter: string) => void): this;

	off(type: TreeEventTypes.FILTER_CHANGED, listener: (filter: string) => void): this;

	fire(type: TreeEventTypes.ASK_MARKER_ADDER, callback: (add: (node: TreeNodeDef) => void) => void): this;

	on(type: TreeEventTypes.ASK_MARKER_ADDER, listener: (callback: (add: (node: TreeNodeDef) => void) => void) => void): this;

	off(type: TreeEventTypes.ASK_MARKER_ADDER, listener: (callback: (add: (node: TreeNodeDef) => void) => void) => void): this;

	fire(type: TreeEventTypes.SCROLL_NODE_INTO_VIEW, marker: string): this;

	on(type: TreeEventTypes.SCROLL_NODE_INTO_VIEW, listener: (marker: string) => void): this;

	off(type: TreeEventTypes.SCROLL_NODE_INTO_VIEW, listener: (marker: string) => void): this;

	fire(type: TreeEventTypes.SHOW_HOVER_BOX, top: number, height: number): this;

	on(type: TreeEventTypes.SHOW_HOVER_BOX, listener: (top: number, height: number) => void): this;

	off(type: TreeEventTypes.SHOW_HOVER_BOX, listener: (top: number, height: number) => void): this;

	fire(type: TreeEventTypes.HIDE_HOVER_BOX): this;

	on(type: TreeEventTypes.HIDE_HOVER_BOX, listener: () => void): this;

	off(type: TreeEventTypes.HIDE_HOVER_BOX, listener: () => void): this;
}
