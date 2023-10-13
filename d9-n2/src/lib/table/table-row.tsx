import {EnhancedPropsForArrayElement} from '@d9/n1';
import React, {Children, useEffect, useRef, useState} from 'react';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableProps} from './types';
import {computeWidthOfFixedColumns} from './utils';
import {ATableBodyCell, ATableBodyCellExpandArea, ATableBodyRow, ATableBodyRowTailGrabber} from './widgets';

export const TableRow = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArrayElement }) => {
	const {
		headers, expandable, hideClassicCellsOnExpandable = false, clickToExpand = false,
		$array: {elementIndex, removeElement}, children
	} = props;

	const ref = useRef<HTMLDivElement>(null);
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
	useEffect(() => {
		if (ref.current == null) {
			return;
		}
		const {height} = ref.current.getBoundingClientRect();
		fire(TableEventTypes.ROW_HEIGHT_CHANGED, elementIndex, height);
	}, [fire, expanded, elementIndex]);

	const onRowClicked = () => {
		if (expandable && clickToExpand && !expanded) {
			fire(TableEventTypes.EXPAND_ROW, elementIndex);
		}
	};

	const classicCellIndexes = headers.map(({index}) => index);
	const childrenAsArray = Children.toArray(children);
	const classicCells = childrenAsArray.map((cell, index) => {
		if (!classicCellIndexes.includes(index)) {
			return null;
		}
		const header = headers[index];
		return <ATableBodyCell $options={{width: header.width}} key={header.$key}>
			{cell}
		</ATableBodyCell>;
	});
	const expandCells = childrenAsArray.map((cell, index) => {
		if (classicCellIndexes.includes(index)) {
			return null;
		} else {
			return cell;
		}
	});

	const {rowIndexColumnWidth, rowOperatorsColumnWidth} = computeWidthOfFixedColumns(props);

	return <ATableBodyRow $options={{headers, rowIndexColumnWidth, rowOperatorsColumnWidth}}
	                      data-click-to-expand={expandable && clickToExpand} data-expanded={expanded}
	                      onClick={onRowClicked}
	                      ref={ref}>
		{(hideClassicCellsOnExpandable && expanded) ? null : classicCells}
		{(hideClassicCellsOnExpandable && expanded) ? null : <ATableBodyRowTailGrabber />}
		{expandable
			? <ATableBodyCellExpandArea $options={{columnCount: headers.length, expanded}}>
				{expandCells}
			</ATableBodyCellExpandArea>
			: null}
	</ATableBodyRow>;
};
