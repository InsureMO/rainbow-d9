import {EnhancedPropsForArray} from '@d9/n1';
import React from 'react';
import {I18NVars} from '../constants';
import {TableProps} from './types';
import {computeWidthOfFixedColumns} from './utils';
import {ATableNoDataRow} from './widgets';

export const TableNoData = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {$array: {hasElement, noElementReminder}} = props;

	if (hasElement) {
		return null;
	} else {
		const {headers} = props;
		const {rowIndexColumnWidth, rowOperatorsColumnWidth} = computeWidthOfFixedColumns(props);

		return <ATableNoDataRow $options={{headers, rowIndexColumnWidth, rowOperatorsColumnWidth}}>
			<span>{noElementReminder ?? I18NVars.TABLE.NO_ELEMENT}</span>
		</ATableNoDataRow>;
	}
};
