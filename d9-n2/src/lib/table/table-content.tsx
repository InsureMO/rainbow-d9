import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React from 'react';
import {TableHeader} from './table-header';
import {TableProps} from './types';
import {computeColumnsWidth} from './utils';
import {ATableContent} from './widgets';

export const TableContent = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		headerHeight, maxBodyHeight,
		children
	} = props;

	const {columnsWidth, tailGrabberAppended, stickyOffsets} = computeColumnsWidth(props);

	return <ATableContent headerHeight={headerHeight} maxBodyHeight={maxBodyHeight} columnsWidth={columnsWidth}>
		<TableHeader headerHeight={headerHeight} headers={props.headers}
		             stickyOffsets={stickyOffsets}
		             tailGrabberAppended={tailGrabberAppended}/>
		{children}
	</ATableContent>;
};
