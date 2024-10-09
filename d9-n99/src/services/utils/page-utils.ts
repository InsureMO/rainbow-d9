import {getDefaultPageSize} from '../../utils';

export interface PageRequest {
	pageSize?: number;
	pageNumber?: number;
}

export interface Page<B> {
	data: Array<B>;
	pageSize: number;
	pageNumber: number;
	pageCount: number;
	itemCount: number;
}

export const askDefaultPageSize = () => {
	return getDefaultPageSize();
};

export const guardPagRequest = (pageable?: PageRequest): PageRequest => {
	if (pageable == null) {
		return {pageNumber: 1, pageSize: askDefaultPageSize()};
	} else {
		return {
			pageNumber: pageable.pageNumber ?? 1,
			pageSize: pageable.pageSize ?? askDefaultPageSize()
		};
	}
};

export const buildPage = <R>(data: Array<R>, pageable?: {
	pageNumber: number; pageSize: number; pageCount: number; itemCount: number
}): Page<R> => {
	return {
		pageNumber: pageable?.pageNumber ?? 1,
		pageSize: pageable?.pageSize ?? askDefaultPageSize(),
		pageCount: pageable?.pageCount ?? 1,
		itemCount: pageable?.itemCount ?? 0,
		data
	};
};
