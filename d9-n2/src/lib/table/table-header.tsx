import {NUtils, Undefinable, VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import React from 'react';
import {IntlLabel} from '../intl-label';
import {LabelLike} from '../label-like';
import {TableProps} from './types';
import {ATableHeaderCell} from './widgets';

export interface TableHeaderProps {
	headers: TableProps['headers'];
	headerHeight: TableProps['headerHeight'];
	stickyOffsets: Array<[boolean, Undefinable<string>, Undefinable<string>]>;
	tailGrabberAppended: boolean;
	$wrapped: WrappedAttributes;
}

export const TableHeader = (props: TableHeaderProps) => {
	const {
		headers, headerHeight,
		stickyOffsets, tailGrabberAppended,
		$wrapped: wrapped
	} = props;

	const $wrapped = {...wrapped, $onValueChange: VUtils.noop};
	// index column
	// configured columns (headers)
	// tail grabbing column
	// operators column
	return <>
		<ATableHeaderCell headerHeight={headerHeight} isGrabber={true} stickyOffset={stickyOffsets[0]}>
			<IntlLabel keys={['table', 'headers', 'index']} value={(void 0)}/>
		</ATableHeaderCell>
		{headers.map((header, index) => {
			const key = NUtils.getDefKey(header);
			return <ATableHeaderCell headerHeight={headerHeight} stickyOffset={stickyOffsets[index + 1]} key={key}>
				<LabelLike $wrapped={$wrapped} label={header.label}/>
			</ATableHeaderCell>;
		})}
		{tailGrabberAppended
			? <ATableHeaderCell headerHeight={headerHeight} isGrabber={true}
			                    stickyOffset={stickyOffsets[stickyOffsets.length - 2]}/>
			: null}
		<ATableHeaderCell headerHeight={headerHeight} isGrabber={true}
		                  stickyOffset={stickyOffsets[stickyOffsets.length - 1]}>
			<IntlLabel keys={['table', 'headers', 'operators']} value={(void 0)}/>
		</ATableHeaderCell>
	</>;
};
