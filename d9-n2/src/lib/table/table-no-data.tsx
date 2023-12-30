import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React from 'react';
import {IntlLabel} from '../intl-label';
import {TableProps} from './types';
import {computeColumnsWidth} from './utils';
import {ATableNoDataRow} from './widgets';

export const TableNoData = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		headers,
		$array: {hasElement, noElementReminder = <IntlLabel keys={['table', 'noElement']} value="No data found."/>}
	} = props;

	if (hasElement) {
		return null;
	} else {
		const {tailGrabberAppended} = computeColumnsWidth(props);
		const columnsCount = headers.length + 2 + (tailGrabberAppended ? 1 : 0);

		return <ATableNoDataRow columnsCount={columnsCount}>
			<span>{noElementReminder}</span>
		</ATableNoDataRow>;
	}
};
