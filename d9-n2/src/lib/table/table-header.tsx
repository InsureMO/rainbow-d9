import {NUtils} from '@rainbow-d9/n1';
import React from 'react';
import {TableProps} from './types';
import {ATableHeaderCell} from './widgets';

export interface TableHeaderProps {
	headers: TableProps['headers'];
	headerHeight: TableProps['headerHeight'];
	tailGrabberAppended: boolean;
}

export const TableHeader = (props: TableHeaderProps) => {
	const {headers, headerHeight, tailGrabberAppended} = props;

	return <>
		<ATableHeaderCell headerHeight={headerHeight} isGrabber={true}/>
		{headers.map(header => {
			const key = NUtils.getDefKey(header);
			return <ATableHeaderCell headerHeight={headerHeight} key={key}>
				{header.label}
			</ATableHeaderCell>;
		})}
		{tailGrabberAppended ? <ATableHeaderCell headerHeight={headerHeight} isGrabber={true}/> : null}
		<ATableHeaderCell headerHeight={headerHeight} isGrabber={true}/>
	</>;
};
