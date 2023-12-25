import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React, {useEffect, useRef} from 'react';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableHeader} from './table-header';
import {TableProps} from './types';
import {computeColumnsWidth} from './utils';
import {ATableContent} from './widgets';

export const TableContent = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		headerHeight, maxBodyHeight,
		children
	} = props;

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
	const {columnsWidth, tailGrabberAppended} = computeColumnsWidth(props);

	const onScroll = () => {
		fire(TableEventTypes.CONTENT_SCROLLED, ref.current.scrollTop, ref.current.scrollLeft);
	};

	return <ATableContent headerHeight={headerHeight} maxBodyHeight={maxBodyHeight} columnsWidth={columnsWidth}
	                      onScroll={onScroll} ref={ref}>
		<TableHeader headerHeight={headerHeight} headers={props.headers}
		             tailGrabberAppended={tailGrabberAppended}/>
		{children}
	</ATableContent>;
};
