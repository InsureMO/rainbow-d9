import {EnhancedPropsForArray, NUtils} from '@d9/n1';
import React from 'react';
import {toCssSize} from '../utils';
import {TableProps} from './types';
import {computeWidthOfFixedColumns} from './utils';
import {ATableHeader, ATableHeaderCell} from './widgets';

export const TableHeader = (props: Omit<TableProps, 'children' | '$array'> & { $array: EnhancedPropsForArray }) => {
	const {headers, headerHeight} = props;

	const {rowIndexColumnWidth, rowOperatorsColumnWidth} = computeWidthOfFixedColumns(props);
	const options = {headers, headerHeight: toCssSize(headerHeight), rowIndexColumnWidth, rowOperatorsColumnWidth};

	return <ATableHeader $options={options}>
		{headers.map(header => {
			const key = NUtils.getDefKey(header);
			return <ATableHeaderCell $options={{width: header.width}} key={key}>
				{header.label}
			</ATableHeaderCell>;
		})}
	</ATableHeader>;
};
