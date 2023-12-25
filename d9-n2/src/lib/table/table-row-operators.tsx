import React, {useEffect, useState} from 'react';
import {Collapse, Expand, Remove} from '../icons';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {ATableRowOperator, ATableRowOperators} from './widgets';

const ExpandButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ATableRowOperator onClick={onClick}>
		<Expand/>
	</ATableRowOperator>;
};
const CollapseButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ATableRowOperator onClick={onClick}>
		<Collapse/>
	</ATableRowOperator>;
};
const RemoveButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ATableRowOperator onClick={onClick}>
		<Remove/>
	</ATableRowOperator>;
};

export const TableRowOperators = (props: {
	expandable?: boolean; removable?: boolean;
	rowIndex: number; rowSpan: number;
}) => {
	const {expandable = false, removable = false, rowIndex, rowSpan} = props;

	const {on, off, fire} = useTableEventBus();
	const [expanded, setExpanded] = useState(false);

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

	if (rowIndex === -1 || (!removable && !expandable)) {
		return <ATableRowOperators data-expanded={false} rowIndex={0} rowSpan={rowSpan}/>;
	}

	const onRemoveElementClicked = () => fire(TableEventTypes.REMOVE_ROW, rowIndex);
	const onExpandClicked = () => {
		fire(TableEventTypes.EXPAND_ROW, rowIndex);
	};
	const onCollapseClicked = () => {
		fire(TableEventTypes.COLLAPSE_ROW, rowIndex);
	};

	return <ATableRowOperators data-expanded={expanded}
	                           rowIndex={rowIndex} rowSpan={rowSpan}>
		<span>
			{removable !== false ? <RemoveButton onClick={onRemoveElementClicked}/> : null}
			{(expandable && !expanded) ? <ExpandButton onClick={onExpandClicked}/> : null}
			{(expandable && expanded) ? <CollapseButton onClick={onCollapseClicked}/> : null}
		</span>
	</ATableRowOperators>;
};
