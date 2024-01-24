import {
	BaseModel,
	EnhancedPropsForArray,
	MUtils,
	Nullable,
	PPUtils,
	PropValue,
	useForceUpdate,
	useWrapperEventBus,
	WrapperEventTypes
} from '@rainbow-d9/n1';
import React, {Children, useEffect} from 'react';
import {useGlobalHandlers} from '../global';
import {guardPaginationData, PaginationData} from '../pagination';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableHeader} from './table-header';
import {TableProps} from './types';
import {computeColumnsWidth} from './utils';
import {ATableContent} from './widgets';

export const TableContent = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		$pp, pageable, $wrapped: {$root, $model, $p2r},
		headerHeight, maxBodyHeight,
		children
	} = props;

	const globalHandlers = useGlobalHandlers();
	const {fire: fireWrapper} = useWrapperEventBus();
	const {on, off, fire} = useTableEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (pageable == null) {
			return;
		}

		const shouldCallExternal = pageable.valueChanged != null;
		/**
		 * return true represents did call external and notify wrapper to repaint.
		 * return false represents it did nothing
		 */
		const callExternal = async (from: Nullable<PaginationData>, to: PaginationData) => {
			if (shouldCallExternal) {
				await pageable.valueChanged({
					// @ts-ignore
					root: $root, model: $model, $p2r, $pp,
					absolutePath: PPUtils.absolute($p2r, pageable.$pp),
					oldValue: from as unknown as PropValue, newValue: to as unknown as PropValue
				}, {global: globalHandlers});
				// data changed, and react nodes for rows are created in wrapper.
				// which means refresh itself is helpless, therefore fire a repaint event to wrapper
				fireWrapper && fireWrapper(WrapperEventTypes.REPAINT);
				return true;
			} else {
				return false;
			}
		};
		const onPageChanged = async (from: Nullable<PaginationData>, to: PaginationData) => {
			// call external function to update data, and force update
			if (!(await callExternal(from, to))) {
				// data not changed, force update to filter out items for this page
				forceUpdate();
			}
		};
		const onFilterChanged = async () => {
			const data = MUtils.getValue($model, pageable.$pp) as unknown as PaginationData;
			// call external function to update data, and force update
			if (!(await callExternal(data, data))) {
				forceUpdate();
				fire(TableEventTypes.PAGE_CHANGED_BY_FILTER, data);
			}
		};
		on(TableEventTypes.PAGE_CHANGED, onPageChanged);
		on(TableEventTypes.FILTER_CHANGED, onFilterChanged);
		return () => {
			off(TableEventTypes.PAGE_CHANGED, onPageChanged);
			off(TableEventTypes.FILTER_CHANGED, onFilterChanged);
		};
	}, [globalHandlers, fireWrapper, on, off, fire, forceUpdate, pageable, $model, $p2r]);

	const {columnsWidth, tailGrabberAppended, stickyOffsets} = computeColumnsWidth(props);

	const hasPagination = pageable != null;
	const isCallExternal = pageable?.valueChanged != null;
	const shouldFilter = false;
	const rows = (() => {
		if (!hasPagination || isCallExternal) {
			// no pagination or all data from external, only one page exists
			if (shouldFilter) {
				// TODO FILTER DATA, WILL NOT CHANGE PAGINATION DATA
				return children;
			} else {
				return children;
			}
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
			//TODO FILTER DATA IN-MEMORY, HOW TO KEEP THE ORIGINAL PAGEABLE DATA?
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
