import {NUtils} from '@rainbow-d9/n1';
import React from 'react';
import {TableProps} from './types';
import {ATableHeaderCell} from './widgets';

export interface TableHeaderProps {
	headers: TableProps['headers'];
	headerHeight: TableProps['headerHeight'];
	stickyOffsets: Array<[boolean, string | undefined, string | undefined]>;
	tailGrabberAppended: boolean;
}

export const TableHeader = (props: TableHeaderProps) => {
	const {
		headers, headerHeight,
		stickyOffsets, tailGrabberAppended
	} = props;

	return <>
		<ATableHeaderCell headerHeight={headerHeight} isGrabber={true} stickyOffset={stickyOffsets[0]}/>
		{headers.map((header, index) => {
			const key = NUtils.getDefKey(header);
			return <ATableHeaderCell headerHeight={headerHeight} stickyOffset={stickyOffsets[index + 1]} key={key}>
				{header.label}
			</ATableHeaderCell>;
		})}
		{tailGrabberAppended
			? <ATableHeaderCell headerHeight={headerHeight} isGrabber={true}
			                    stickyOffset={stickyOffsets[stickyOffsets.length - 2]}/>
			: null}
		<ATableHeaderCell headerHeight={headerHeight} isGrabber={true}
		                  stickyOffset={stickyOffsets[stickyOffsets.length - 1]}/>
	</>;
};
