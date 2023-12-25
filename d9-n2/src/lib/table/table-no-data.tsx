import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {I18NVars} from '../constants';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableProps} from './types';
import {computeColumnsWidth} from './utils';
import {ATableNoDataRow} from './widgets';

export const TableNoData = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		headers,
		$array: {hasElement, noElementReminder = I18NVars.TABLE.NO_ELEMENT}
	} = props;

	const {on, off} = useTableEventBus();
	const [scrollLeft, setScrollLeft] = useState(0);
	useEffect(() => {
		const onScroll = (scrollTop: number, scrollLeft: number) => {
			setScrollLeft(scrollLeft);
		};
		on(TableEventTypes.CONTENT_SCROLLED, onScroll);
		return () => {
			off(TableEventTypes.CONTENT_SCROLLED, onScroll);
		};
	}, [on, off]);

	if (hasElement) {
		return null;
	} else {
		const {tailGrabberAppended} = computeColumnsWidth(props);
		const columnsCount = headers.length + 2 + (tailGrabberAppended ? 1 : 0);

		return <ATableNoDataRow columnsCount={columnsCount} scrollLeft={scrollLeft}>
			<span>{noElementReminder}</span>
		</ATableNoDataRow>;
	}
};
