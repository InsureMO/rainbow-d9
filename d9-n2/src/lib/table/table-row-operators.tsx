import {VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import React, {useEffect, useState} from 'react';
import {Button, ButtonFill, ButtonInk} from '../button';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {ATableRowOperators} from './widgets';

const ExpandButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.expand']}
	               click={onClick}
	               data-w="d9-table-row-operator"/>;
};
const CollapseButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.collapse']}
	               click={onClick}
	               data-w="d9-table-row-operator"/>;
};
const RemoveButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.remove']}
	               click={onClick}
	               data-w="d9-table-row-operator"/>;
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
		{removable !== false ? <RemoveButton onClick={onRemoveElementClicked}/> : null}
		{(expandable && !expanded) ? <ExpandButton onClick={onExpandClicked}/> : null}
		{(expandable && expanded) ? <CollapseButton onClick={onCollapseClicked}/> : null}
	</ATableRowOperators>;
};
