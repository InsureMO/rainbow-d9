import {BaseModel, EnhancedPropsForArray, getArrayElementKey, MUtils} from '@d9/n1';
import React, {useEffect, useRef, useState} from 'react';
import {CssVars} from '../constants';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableProps} from './types';
import {computeFixedColumnHeaderHeight, computeFixedColumnHeight, computeWidthOfFixedColumns} from './utils';
import {
	ATableBodyRowIndexCell,
	ATableRowIndexColumn,
	ATableRowOperator,
	ATableRowOperators,
	ATableRowOperatorsColumn
} from './widgets';

const useBodyCellHeightChanged = (rowIndex: number) => {
	const {on, off} = useTableEventBus();
	const [height, setHeight] = useState(`calc(${CssVars.TABLE_CELL_HEIGHT} + 1px)`);
	useEffect(() => {
		const onRowHeightChanged = (elementIndex: number, rowHeight: number) => {
			if (elementIndex !== rowIndex) {
				return;
			}
			setHeight(`${rowHeight}px`);
		};
		on(TableEventTypes.ROW_HEIGHT_CHANGED, onRowHeightChanged);
		return () => {
			off(TableEventTypes.ROW_HEIGHT_CHANGED, onRowHeightChanged);
		};
	}, [on, off, rowIndex]);

	return height;
};

const TableBodyRowIndexCell = (props: { rowIndex: number; rowIndexStartsFrom?: number; }) => {
	const {rowIndex, rowIndexStartsFrom} = props;

	const height = useBodyCellHeightChanged(rowIndex);

	if (rowIndex === -1) {
		return <ATableBodyRowIndexCell cellHeight={height}>
			<span />
		</ATableBodyRowIndexCell>;
	}

	return <ATableBodyRowIndexCell cellHeight={height}>
		<span>{rowIndex + (rowIndexStartsFrom ?? 1)}</span>
	</ATableBodyRowIndexCell>;
};

const ExpandButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ATableRowOperator onClick={onClick}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path
				d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" />
		</svg>
	</ATableRowOperator>;
};
const CollapseButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ATableRowOperator onClick={onClick}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path
				d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z" />
		</svg>
	</ATableRowOperator>;
};
const RemoveButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ATableRowOperator onClick={onClick}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path
				d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
		</svg>
	</ATableRowOperator>;
};

const TableRowOperators = (props: { expandable?: boolean; removable?: boolean; rowIndex: number; }) => {
	const {expandable = false, removable = false, rowIndex} = props;

	const {on, off, fire} = useTableEventBus();
	const [expanded, setExpanded] = useState(false);
	const height = useBodyCellHeightChanged(rowIndex);

	useEffect(() => {
		const onRowExpanded = (expandedRowIndex: number) => {
			if (expandedRowIndex === rowIndex) {
				setExpanded(true);
			}
		};
		const onRowCollapsed = (collapsedRowIndex: number) => {
			if (collapsedRowIndex === rowIndex) {
				setExpanded(false);
			}
		};
		on(TableEventTypes.ROW_EXPANDED, onRowExpanded);
		on(TableEventTypes.ROW_COLLAPSED, onRowCollapsed);
		return () => {
			off(TableEventTypes.ROW_EXPANDED, onRowExpanded);
			off(TableEventTypes.ROW_COLLAPSED, onRowCollapsed);
		};
	}, [on, off, rowIndex]);

	if (rowIndex === -1) {
		return <ATableRowOperators cellHeight={height} data-expanded={false}>
			<span />
		</ATableRowOperators>;
	}

	if (!removable && !expandable) {
		return null;
	}

	const onRemoveElementClicked = () => fire(TableEventTypes.REMOVE_ROW, rowIndex);
	const onExpandClicked = () => {
		fire(TableEventTypes.EXPAND_ROW, rowIndex);
	};
	const onCollapseClicked = () => {
		fire(TableEventTypes.COLLAPSE_ROW, rowIndex);
	};

	return <ATableRowOperators cellHeight={height} data-expanded={expanded}>
		<span>
			{removable !== false ? <RemoveButton onClick={onRemoveElementClicked} /> : null}
			{(expandable && !expanded) ? <ExpandButton onClick={onExpandClicked} /> : null}
			{(expandable && expanded) ? <CollapseButton onClick={onCollapseClicked} /> : null}
		</span>
	</ATableRowOperators>;
};

export const TableTopBar = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		rowIndexStartsFrom, expandable,
		$wrapped: {$model},
		$array: {removable, getElementKey},
		$pp
	} = props;

	const rowIndexColumnRef = useRef<HTMLDivElement>(null);
	const rowOperatorsColumnRef = useRef<HTMLDivElement>(null);
	const {on, off} = useTableEventBus();
	const [scrolled, setScrolled] = useState<{ verticalScrolled: boolean, horizontalScrolled: boolean }>({
		verticalScrolled: false, horizontalScrolled: false
	});
	const [keys] = useState<Array<[BaseModel, string]>>([]);
	useEffect(() => {
		const onContentResized = (verticalScrolled: boolean, horizontalScrolled: boolean) => {
			setScrolled({verticalScrolled, horizontalScrolled});
		};
		const onContentScrollTopChanged = (scrollTop: number) => {
			if (rowIndexColumnRef.current == null) {
				return;
			}
			const top = rowIndexColumnRef.current.scrollTop;
			if (top !== scrollTop) {
				rowIndexColumnRef.current.scrollTop = scrollTop;
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				rowOperatorsColumnRef.current!.scrollTop = scrollTop;
			}
		};
		on(TableEventTypes.CONTENT_RESIZED, onContentResized);
		on(TableEventTypes.CONTENT_SCROLL_TOP_CHANGED, onContentScrollTopChanged);
		return () => {
			off(TableEventTypes.CONTENT_RESIZED, onContentResized);
			off(TableEventTypes.CONTENT_SCROLL_TOP_CHANGED, onContentScrollTopChanged);
		};
	}, [on, off]);
	const {
		rowIndexColumnWidth, rowOperatorsColumnWidth, headerHeight, maxBodyHeight
	} = computeWidthOfFixedColumns(props);

	const getRowElementKey = getArrayElementKey(keys, getElementKey);
	const elements = ((MUtils.getValue($model, $pp) || []) as unknown as Array<BaseModel>);

	const computedColumnHeight = computeFixedColumnHeight({
		maxBodyHeight, horizontalScrolled: scrolled.horizontalScrolled
	});
	const computedHeaderHeight = computeFixedColumnHeaderHeight(headerHeight);

	return <>
		<ATableRowIndexColumn columnWidth={rowIndexColumnWidth} columnHeight={computedColumnHeight}
		                      headerHeight={computedHeaderHeight}
		                      ref={rowIndexColumnRef}>
			{elements.length === 0 ? <TableBodyRowIndexCell rowIndex={-1} rowIndexStartsFrom={0} /> : null}
			{elements.map((elementModel, index) => {
				return <TableBodyRowIndexCell rowIndex={index} rowIndexStartsFrom={rowIndexStartsFrom}
				                              key={getRowElementKey(elementModel)} />;
			})}
		</ATableRowIndexColumn>
		<ATableRowOperatorsColumn columnWidth={rowOperatorsColumnWidth} columnHeight={computedColumnHeight}
		                          headerHeight={computedHeaderHeight}
		                          data-vertical-scrolled={scrolled.verticalScrolled}
		                          ref={rowOperatorsColumnRef}>
			{elements.length === 0
				? <TableRowOperators expandable={false} removable={false} rowIndex={-1} /> : null}
			{elements.map((elementModel, index) => {
				return <TableRowOperators expandable={expandable} removable={removable} rowIndex={index}
				                          key={getRowElementKey(elementModel)} />;
			})}
		</ATableRowOperatorsColumn>
	</>;
};
