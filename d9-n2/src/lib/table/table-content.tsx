import {BaseModel, EnhancedPropsForArray, MUtils, PPUtils, PropValue, useForceUpdate} from '@rainbow-d9/n1';
import {Nullable} from '@rainbow-d9/n3';
import React, {Children, useEffect} from 'react';
import {guardPaginationData, PaginationData} from '../pagination';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableHeader} from './table-header';
import {TableProps} from './types';
import {computeColumnsWidth} from './utils';
import {ATableContent} from './widgets';

export const TableContent = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		pageable, $wrapped: {$model, $p2r},
		headerHeight, maxBodyHeight,
		children
	} = props;

	const {on, off, fire} = useTableEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (pageable == null) {
			return;
		}

		const shouldCallExternal = pageable.valueChanged != null;
		const callExternal = async (from: Nullable<PaginationData>, to: PaginationData) => {
			if (shouldCallExternal) {
				await pageable.valueChanged({
					absolutePath: PPUtils.absolute($p2r, pageable.$pp),
					oldValue: from as unknown as PropValue, newValue: to as unknown as PropValue
				});
			}
		};
		// TODO IF THERE IS FILTER, PAGEABLE AND IN-MEMORY, HOW TO KEEP THE ORIGINAL PAGEABLE DATA?
		const onPageChanged = async (from: Nullable<PaginationData>, to: PaginationData) => {
			await callExternal(from, to);
			forceUpdate();
		};
		const onFilterChanged = async () => {
			//TODO
			// 1. CALL EXTERNAL FUNCTION TO UPDATE DATA, AND FORCE UPDATE
			// 2. OR FIND THE RENDERING ELEMENT INDEXES IF IT IS IN-MEMORY, IT MIGHT CHANGE THE PAGINATION DATA
			const data = MUtils.getValue($model, pageable.$pp) as unknown as PaginationData;
			await callExternal(data, data);
			fire(TableEventTypes.PAGE_CHANGED_BY_FILTER, data);
		};
		on(TableEventTypes.PAGE_CHANGED, onPageChanged);
		on(TableEventTypes.FILTER_CHANGED, onFilterChanged);
		return () => {
			off(TableEventTypes.PAGE_CHANGED, onPageChanged);
			off(TableEventTypes.FILTER_CHANGED, onFilterChanged);
		};
	}, [on, off, fire, pageable, $model, $p2r, forceUpdate]);

	const {columnsWidth, tailGrabberAppended, stickyOffsets} = computeColumnsWidth(props);

	const hasPagination = pageable != null;
	const isCallExternal = pageable?.valueChanged != null;
	const shouldFilter = false;
	const rows = (() => {
		if (!hasPagination || isCallExternal) {
			// no pagination or all data from external, only one page exists
			return children;
		}
		const data = guardPaginationData($model as BaseModel, pageable.$pp);
		const startIndex = (data.pageNumber - 1) * data.pageSize;
		const endIndex = startIndex + data.pageSize - 1;
		if (!shouldFilter) {
			// no filter applied, use pagination data to find elements in current page
			return Children.toArray(children).map((child, index) => {
				if (index >= startIndex && index <= endIndex) {
					return child;
				} else {
					return null;
				}
			}).filter(child => child != null);
		} else {
			// TODO filter
			return children;
		}
	})();

	return <ATableContent headerHeight={headerHeight} maxBodyHeight={maxBodyHeight} columnsWidth={columnsWidth}>
		<TableHeader headerHeight={headerHeight} headers={props.headers}
		             stickyOffsets={stickyOffsets}
		             tailGrabberAppended={tailGrabberAppended}/>
		{rows}
	</ATableContent>;
};
