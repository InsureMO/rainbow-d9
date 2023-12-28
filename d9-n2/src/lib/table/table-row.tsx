import {EnhancedPropsForArrayElement, NUtils} from '@rainbow-d9/n1';
import React, {Children, useEffect, useState} from 'react';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableRowOperators} from './table-row-operators';
import {TableProps} from './types';
import {computeColumnsWidth} from './utils';
import {ATableBodyCell, ATableBodyCellExpandArea, ATableBodyRowIndexCell} from './widgets';

export const TableRow = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArrayElement }) => {
	const {
		headers, expandable = false, hideClassicCellsOnExpandable = false, clickToExpand = false,
		rowIndexStartsFrom = 1,
		$array: {removable, elementIndex, removeElement}, children
	} = props;

	const {on, off, fire} = useTableEventBus();
	const [expanded, setExpanded] = useState(false);
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
		const onRemoveRow = handleEvent(async () => await removeElement());
		on(TableEventTypes.EXPAND_ROW, onExpandRow);
		on(TableEventTypes.COLLAPSE_ROW, onCollapseRow);
		on(TableEventTypes.REMOVE_ROW, onRemoveRow);
		return () => {
			off(TableEventTypes.EXPAND_ROW, onExpandRow);
			off(TableEventTypes.COLLAPSE_ROW, onCollapseRow);
			off(TableEventTypes.REMOVE_ROW, onRemoveRow);
		};
	}, [on, off, fire, elementIndex, removeElement]);

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
					<ATableBodyCellExpandArea columnsCount={expandedAreaColumnCount + 1} expanded={expanded}>
						{expandCells}
					</ATableBodyCellExpandArea>, 1, 1];
			case hideClassicCellsOnExpandable:
				// replace classic cells, grab all columns, except the index column and operators column
				return [
					<ATableBodyCellExpandArea columnsCount={expandedAreaColumnCount} expanded={expanded}>
						{expandCells}
					</ATableBodyCellExpandArea>,
					null, 1, 1];
			case !hideClassicCellsOnExpandable:
				return [
					<>{classicCells}</>,
					<ATableBodyCellExpandArea columnsCount={expandedAreaColumnCount + 1} expanded={expanded}>
						{expandCells}
					</ATableBodyCellExpandArea>, 2, 1];
			default:
				return [null, null, 1, 1];
		}
	})();

	return <>
		<ATableBodyRowIndexCell rowIndex={elementIndex} rowSpan={indexRowSpan}>
			<span>{elementIndex + rowIndexStartsFrom}</span>
		</ATableBodyRowIndexCell>
		{classic}
		<TableRowOperators expandable={expandable} removable={removable} rowIndex={elementIndex}
		                   rowSpan={operatorsRowSpan}/>
		{expands}
	</>;
};
