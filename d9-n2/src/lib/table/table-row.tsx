import {
	Enhance$WrappedPropsForArrayElement,
	EnhancedPropsForArrayElement,
	NUtils,
	ObjectPropValue
} from '@rainbow-d9/n1';
import React, {Children, useEffect, useRef, useState} from 'react';
import {GlobalEventPrefix, GlobalEventTypes, useGlobalEventBus, useGlobalHandlers} from '../global';
import {guardPaginationData} from '../pagination';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableRowOperators} from './table-row-operators';
import {TableProps} from './types';
import {computeColumnsWidth} from './utils';
import {ATableBodyCell, ATableBodyCellExpandArea, ATableBodyRowIndexCell} from './widgets';

export type TableRowProps = Enhance$WrappedPropsForArrayElement<Omit<TableProps, '$array'>> & {
	$array: EnhancedPropsForArrayElement
}

export const TableRow = (props: TableRowProps) => {
	const {
		marker,
		headers, expandable = false, hideClassicCellsOnExpandable = false, clickToExpand = false,
		rowIndexStartsFrom = 1, omitDefaultRowOperators, rowOperators,
		initExpanded,
		$wrapped,
		$array: {removable, elementIndex, removeElement, getElementKey}, pageable,
		children
	} = props;

	const expandAreaRef = useRef<HTMLDivElement>(null);
	const globalHandlers = useGlobalHandlers();
	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	const {on, off, fire} = useTableEventBus();
	const [expanded, setExpanded] = useState(() => {
		if (initExpanded) {
			return initExpanded($wrapped.$model as ObjectPropValue, elementIndex);
		}
		return false;
	});
	const rowMarker = getElementKey != null ? getElementKey($wrapped.$model as ObjectPropValue) : (void 0);
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string) => {
			if (clipped !== `${marker}-${rowMarker ?? elementIndex}`) {
				return;
			}
			switch (prefix) {
				case GlobalEventPrefix.EXPAND_TABLE_ROW:
					fire(TableEventTypes.EXPAND_ROW, elementIndex);
					break;
				case GlobalEventPrefix.COLLAPSE_TABLE_ROW:
					fire(TableEventTypes.COLLAPSE_ROW, elementIndex);
					break;
			}
		};
		onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [onGlobal, offGlobal, fire, marker, rowMarker, elementIndex]);
	useEffect(() => {
		const handleEvent = (func: () => void) => (rowIndex: number) => {
			if (rowIndex !== elementIndex) {
				return;
			}
			func();
		};
		const onExpandRow = handleEvent(() => {
			setExpanded(true);
			fire(TableEventTypes.ROW_EXPANDED, elementIndex);
		});
		const onCollapseRow = handleEvent(() => {
			setExpanded(false);
			fire(TableEventTypes.ROW_COLLAPSED, elementIndex);
		});
		const onRemoveRow = handleEvent(async () => await removeElement({global: globalHandlers}));
		on(TableEventTypes.EXPAND_ROW, onExpandRow);
		on(TableEventTypes.COLLAPSE_ROW, onCollapseRow);
		on(TableEventTypes.REMOVE_ROW, onRemoveRow);
		return () => {
			off(TableEventTypes.EXPAND_ROW, onExpandRow);
			off(TableEventTypes.COLLAPSE_ROW, onCollapseRow);
			off(TableEventTypes.REMOVE_ROW, onRemoveRow);
		};
	}, [globalHandlers, on, off, fire, elementIndex, removeElement]);
	useEffect(() => {
		if (expanded && expandAreaRef.current != null) {
			const contentDiv: HTMLDivElement = expandAreaRef.current.closest('div[data-w=d9-table-content]');
			const {top, height} = contentDiv.getBoundingClientRect();
			const {height: headerHeight} = contentDiv.querySelector('div[data-w=d9-table-header-cell]:first-child').getBoundingClientRect();
			const {top: expandAreaTop, height: expandedAreaHeight} = expandAreaRef.current.getBoundingClientRect();
			if (top + height >= expandAreaTop + expandedAreaHeight) {
				// no need to scroll
				return;
			}
			const previousDiv = expandAreaRef.current.previousSibling as HTMLDivElement;
			const {top: previousTop} = previousDiv.getBoundingClientRect();
			const offset = expandAreaTop - previousTop;
			// don't know why header height must count in, maybe impacted by headers are sticky position
			if (expandedAreaHeight + offset > height - headerHeight) {
				// cannot show whole expanded area, try to align this row to top
				contentDiv.scrollTo({top: previousDiv.offsetTop - headerHeight});
			} else {
				// can show whole expanded area, try to align the expanded area to bottom
				contentDiv.scrollTo({top: previousDiv.offsetTop + expandedAreaHeight + offset - contentDiv.clientHeight + 1});
			}
		}
	}, [expanded]);

	const onRowClicked = () => {
		if (expandable && clickToExpand && !expanded) {
			fire(TableEventTypes.EXPAND_ROW, elementIndex);
		}
	};
	const {tailGrabberAppended, stickyOffsets} = computeColumnsWidth(props);
	const classicCellIndexes = headers.map(({index}) => index);
	const childrenAsArray = Children.toArray(children);
	const classicCells = childrenAsArray.map((cell, index) => {
		if (!classicCellIndexes.includes(index)) {
			return null;
		}
		const header = headers[index];
		NUtils.getDefKey(header);
		return <ATableBodyCell onClick={onRowClicked} rowIndex={elementIndex}
		                       stickyOffset={stickyOffsets[index + 1]}
		                       data-expanded={expanded} data-click-to-expand={clickToExpand}
		                       key={header.$key}>
			{cell}
		</ATableBodyCell>;
	}).filter(x => x != null);
	if (tailGrabberAppended) {
		classicCells.push(<ATableBodyCell isGrabber={true} rowIndex={elementIndex} onClick={onRowClicked}
		                                  stickyOffset={stickyOffsets[stickyOffsets.length - 2]}
		                                  data-expanded={expanded} data-click-to-expand={clickToExpand}
		                                  data-table-row-grabber={true} key="grabber-cell"/>);
	}
	const expandCells = childrenAsArray.map((cell, index) => {
		if (classicCellIndexes.includes(index)) {
			return null;
		} else {
			return cell;
		}
	});

	const expandedAreaColumnCount = classicCells.length;
	const [classic, expands, indexRowSpan, operatorsRowSpan] = (() => {
		switch (true) {
			case !expandable:
				// no expand area
				return [<>{classicCells}</>, null, 1, 1];
			case !expanded:
				// put after operators, grab all columns except the index column
				return [
					<>{classicCells}</>,
					<ATableBodyCellExpandArea columnsCount={expandedAreaColumnCount + 1} expanded={expanded}
					                          ref={expandAreaRef}>
						{expandCells}
					</ATableBodyCellExpandArea>, 1, 1];
			case hideClassicCellsOnExpandable:
				// replace classic cells, grab all columns, except the index column and operators column
				return [
					<ATableBodyCellExpandArea columnsCount={expandedAreaColumnCount} expanded={expanded}
					                          ref={expandAreaRef}>
						{expandCells}
					</ATableBodyCellExpandArea>,
					null, 1, 1];
			case !hideClassicCellsOnExpandable:
				return [
					<>{classicCells}</>,
					<ATableBodyCellExpandArea columnsCount={expandedAreaColumnCount + 1} expanded={expanded}
					                          ref={expandAreaRef}>
						{expandCells}
					</ATableBodyCellExpandArea>, 2, 1];
			default:
				return [null, null, 1, 1];
		}
	})();

	const computeRowIndexOffset = () => {
		if (pageable?.valueChanged == null) {
			// no pagination, or in-memory pagination
			return rowIndexStartsFrom;
		} else {
			const data = guardPaginationData($wrapped.$arrayHolder, pageable.$pp);
			return (data.pageNumber - 1) * data.pageSize + 1;
		}
	};

	return <>
		<ATableBodyRowIndexCell rowIndex={elementIndex} rowSpan={indexRowSpan}>
			<span>{elementIndex + computeRowIndexOffset()}</span>
		</ATableBodyRowIndexCell>
		{classic}
		<TableRowOperators expandable={expandable} removable={removable} rowIndex={elementIndex}
		                   rowSpan={operatorsRowSpan}
		                   $wrapped={$wrapped}
		                   omitDefaultRowOperators={omitDefaultRowOperators} rowOperators={rowOperators}
		                   initExpanded={initExpanded}/>
		{expands}
	</>;
};
