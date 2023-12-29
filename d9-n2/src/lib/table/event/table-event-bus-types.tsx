import {PaginationData} from '../../pagination';

export enum TableEventTypes {
	EXPAND_ROW = 'expand-row',
	ROW_EXPANDED = 'row-expanded',
	COLLAPSE_ROW = 'collapse-row',
	ROW_COLLAPSED = 'row-collapsed',
	REMOVE_ROW = 'remove-row',

	PAGE_CHANGED = 'page-changed'
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

	fire(type: TableEventTypes.PAGE_CHANGED, pageable: PaginationData): this;

	on(type: TableEventTypes.PAGE_CHANGED, listener: (pageable: PaginationData) => void): this;

	off(type: TableEventTypes.PAGE_CHANGED, listener: (pageable: PaginationData) => void): this;
}