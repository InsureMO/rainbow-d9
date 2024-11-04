import {NUtils, Undefinable, useWrapperEventBus, VUtils, WrappedAttributes, WrapperEventTypes} from '@rainbow-d9/n1';
import React, {useState} from 'react';
import {useGlobalHandlers} from '../global';
import {SortAsc, SortDesc, SortNone} from '../icons';
import {IntlLabel} from '../intl-label';
import {LabelLike} from '../label-like';
import {SortedTableColumn, TableColumnSortType, TableProps} from './types';
import {isNoneSortFromCycleOmitted} from './utils';
import {ATableHeaderCell} from './widgets';

export interface TableHeaderProps {
	$pp: string;
	headers: TableProps['headers'];
	headerHeight: TableProps['headerHeight'];
	sort?: TableProps['sort'];
	stickyOffsets: Array<[boolean, Undefinable<string>, Undefinable<string>]>;
	tailGrabberAppended: boolean;
	$wrapped: WrappedAttributes;
}

export const TableHeader = (props: TableHeaderProps) => {
	const {
		headers, headerHeight, sort,
		stickyOffsets, tailGrabberAppended,
		$wrapped: wrapped
	} = props;

	const globalHandlers = useGlobalHandlers();
	const {fire: fireWrapper} = useWrapperEventBus();
	const [sortBy, setSortBy] = useState<Array<SortedTableColumn>>([]);
	const $wrapped = {...wrapped, $onValueChange: VUtils.noop, $pp: (void 0)};
	const sortable = sort != null;

	const sortColumn = (key: string, type: TableColumnSortType) => async () => {
		if (!sortable) {
			return;
		}
		const by = [{key, type}];
		setSortBy(by);
		await sort(by, {root: $wrapped.$root, model: $wrapped.$model, global: globalHandlers});
		// assume data changed by sort function, repaint myself
		fireWrapper && fireWrapper(WrapperEventTypes.REPAINT);
	};

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
			const canSort = sortable && VUtils.isNotBlank(header.sortKey);
			const sortType = canSort ? (sortBy.find(s => s.key === header.sortKey)?.type ?? TableColumnSortType.NONE) : (void 0);
			return <ATableHeaderCell headerHeight={headerHeight} stickyOffset={stickyOffsets[index + 1]} key={key}>
				<LabelLike $wrapped={$wrapped} label={header.label}/>
				{(canSort && sortType === TableColumnSortType.ASC)
					? <span data-role="sort" onClick={sortColumn(header.sortKey, TableColumnSortType.DESC)}>
						<SortAsc/>
					</span>
					: null}
				{(canSort && sortType === TableColumnSortType.DESC)
					? <span data-role="sort"
					        onClick={sortColumn(header.sortKey, isNoneSortFromCycleOmitted() ? TableColumnSortType.ASC : TableColumnSortType.NONE)}>
						<SortDesc/>
					</span>
					: null}
				{(canSort && sortType === TableColumnSortType.NONE)
					? <span data-role="sort" onClick={sortColumn(header.sortKey, TableColumnSortType.ASC)}>
						<SortNone/>
					</span>
					: null}
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
