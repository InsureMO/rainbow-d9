export enum TableEventTypes {
	EXPAND_ROW = 'expand-row',
	ROW_EXPANDED = 'row-expanded',
	COLLAPSE_ROW = 'collapse-row',
	ROW_COLLAPSED = 'row-collapsed',
	REMOVE_ROW = 'remove-row',

	ROW_HEIGHT_CHANGED = 'row-height-changed',
	CONTENT_RESIZED = 'content-resized',
	CONTENT_SCROLL_TOP_CHANGED = 'content-scroll-top-changed'
}

export interface TableEventBus {
	fire(type: TableEventTypes.EXPAND_ROW, elementIndex: number): this;
	on(type: TableEventTypes.EXPAND_ROW, listener: (elementIndex: number) => void): this;
	off(type: TableEventTypes.EXPAND_ROW, listener: (elementIndex: number) => void): this;

	fire(type: TableEventTypes.ROW_EXPANDED, elementIndex: number): this;
	on(type: TableEventTypes.ROW_EXPANDED, listener: (elementIndex: number) => void): this;
	off(type: TableEventTypes.ROW_EXPANDED, listener: (elementIndex: number) => void): this;

	fire(type: TableEventTypes.COLLAPSE_ROW, elementIndex: number): this;
	on(type: TableEventTypes.COLLAPSE_ROW, listener: (elementIndex: number) => void): this;
	off(type: TableEventTypes.COLLAPSE_ROW, listener: (elementIndex: number) => void): this;

	fire(type: TableEventTypes.ROW_COLLAPSED, elementIndex: number): this;
	on(type: TableEventTypes.ROW_COLLAPSED, listener: (elementIndex: number) => void): this;
	off(type: TableEventTypes.ROW_COLLAPSED, listener: (elementIndex: number) => void): this;

	fire(type: TableEventTypes.REMOVE_ROW, elementIndex: number): this;
	on(type: TableEventTypes.REMOVE_ROW, listener: (elementIndex: number) => void): this;
	off(type: TableEventTypes.REMOVE_ROW, listener: (elementIndex: number) => void): this;

	fire(type: TableEventTypes.ROW_HEIGHT_CHANGED, elementIndex: number, height: number): this;
	on(type: TableEventTypes.ROW_HEIGHT_CHANGED, listener: (elementIndex: number, height: number) => void): this;
	off(type: TableEventTypes.ROW_HEIGHT_CHANGED, listener: (elementIndex: number, height: number) => void): this;

	fire(type: TableEventTypes.CONTENT_RESIZED, verticalScrolled: boolean, horizontalScrolled: boolean): this;
	on(type: TableEventTypes.CONTENT_RESIZED, listener: (verticalScrolled: boolean, horizontalScrolled: boolean) => void): this;
	off(type: TableEventTypes.CONTENT_RESIZED, listener: (verticalScrolled: boolean, horizontalScrolled: boolean) => void): this;

	fire(type: TableEventTypes.CONTENT_SCROLL_TOP_CHANGED, scrollTop: number): this;
	on(type: TableEventTypes.CONTENT_SCROLL_TOP_CHANGED, listener: (scrollTop: number) => void): this;
	off(type: TableEventTypes.CONTENT_SCROLL_TOP_CHANGED, listener: (scrollTop: number) => void): this;
}