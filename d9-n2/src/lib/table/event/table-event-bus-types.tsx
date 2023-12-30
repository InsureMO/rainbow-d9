import {Nullable} from '@rainbow-d9/n1';
import {PaginationData} from '../../pagination';

export enum TableEventTypes {
	EXPAND_ROW = 'expand-row',
	ROW_EXPANDED = 'row-expanded',
	COLLAPSE_ROW = 'collapse-row',
	ROW_COLLAPSED = 'row-collapsed',
	REMOVE_ROW = 'remove-row',

	PAGE_CHANGED = 'page-changed',
	PAGE_CHANGED_BY_FILTER = 'page-changed-by-filter',

	FILTER_CHANGED = 'filter-changed'
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

	fire(type: TableEventTypes.PAGE_CHANGED, from: Nullable<PaginationData>, to: PaginationData): this;

	on(type: TableEventTypes.PAGE_CHANGED, listener: (from: Nullable<PaginationData>, to: PaginationData) => void): this;

	off(type: TableEventTypes.PAGE_CHANGED, listener: (from: Nullable<PaginationData>, to: PaginationData) => void): this;

	fire(type: TableEventTypes.PAGE_CHANGED_BY_FILTER, pageable: PaginationData): this;

	on(type: TableEventTypes.PAGE_CHANGED_BY_FILTER, listener: (pageable: PaginationData) => void): this;

	off(type: TableEventTypes.PAGE_CHANGED_BY_FILTER, listener: (pageable: PaginationData) => void): this;

	fire(type: TableEventTypes.FILTER_CHANGED): this;

	on(type: TableEventTypes.FILTER_CHANGED, listener: () => void): this;

	off(type: TableEventTypes.FILTER_CHANGED, listener: () => void): this;
}