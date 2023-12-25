export enum TableEventTypes {
	EXPAND_ROW = 'expand-row',
	ROW_EXPANDED = 'row-expanded',
	COLLAPSE_ROW = 'collapse-row',
	ROW_COLLAPSED = 'row-collapsed',
	REMOVE_ROW = 'remove-row',

	CONTENT_RESIZED = 'content-resized',
	CONTENT_SCROLLED = 'content-scrolled'
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

	fire(type: TableEventTypes.CONTENT_RESIZED, verticalScrolled: boolean, horizontalScrolled: boolean): this;

	on(type: TableEventTypes.CONTENT_RESIZED, listener: (verticalScrolled: boolean, horizontalScrolled: boolean) => void): this;

	off(type: TableEventTypes.CONTENT_RESIZED, listener: (verticalScrolled: boolean, horizontalScrolled: boolean) => void): this;

	fire(type: TableEventTypes.CONTENT_SCROLLED, scrollTop: number, scrollLeft: number): this;

	on(type: TableEventTypes.CONTENT_SCROLLED, listener: (scrollTop: number, scrollLeft: number) => void): this;

	off(type: TableEventTypes.CONTENT_SCROLLED, listener: (scrollTop: number, scrollLeft: number) => void): this;
}