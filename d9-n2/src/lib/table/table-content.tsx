import {EnhancedPropsForArray} from '@d9/n1';
import React, {useEffect, useRef} from 'react';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableHeader} from './table-header';
import {TableProps} from './types';
import {computeWidthOfFixedColumns} from './utils';
import {ATableContent} from './widgets';

export const TableContent = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {children, ...rest} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {fire} = useTableEventBus();
	useEffect(() => {
		if (ref.current == null) {
			return;
		}
		const resizeObserver = new ResizeObserver(() => {
			if (ref.current == null) {
				return;
			}
			fire(TableEventTypes.CONTENT_RESIZED,
				ref.current.scrollHeight !== ref.current.clientHeight,
				ref.current.scrollWidth !== ref.current.clientWidth);
		});
		resizeObserver.observe(ref.current);
		return () => resizeObserver.disconnect();
	}, [fire]);
	const {
		headerHeight, maxBodyHeight, rowIndexColumnWidth, rowOperatorsColumnWidth
	} = computeWidthOfFixedColumns(props);

	const onScroll = () => {
		fire(TableEventTypes.CONTENT_SCROLL_TOP_CHANGED, ref.current.scrollTop);
	};

	return <ATableContent headerHeight={headerHeight} maxBodyHeight={maxBodyHeight}
	                      rowIndexColumnWidth={rowIndexColumnWidth} rowOperatorsColumnWidth={rowOperatorsColumnWidth}
	                      onScroll={onScroll} ref={ref}>
		<TableHeader {...rest} />
		{children}
	</ATableContent>;
};
