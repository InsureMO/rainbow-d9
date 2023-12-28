import {
	BaseModel,
	Enhance$WrappedPropsForArrayElement,
	NUtils,
	PropValue,
	VUtils,
	WrappedAttributes
} from '@rainbow-d9/n1';
import React, {MouseEvent, useEffect, useState} from 'react';
import {Button, ButtonClickOptions, ButtonFill, ButtonInk} from '../button';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableDef, TableProps, TableRowButtonDef} from './types';
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
const CustomButton = (props: {
	def: TableRowButtonDef;
	$wrapped: Enhance$WrappedPropsForArrayElement<Omit<TableProps, '$array'>>['$wrapped']
}) => {
	const {
		def: {click, ...rest},
		$wrapped: {$root, $array, $model, $p2r}
	} = props;

	const onClick = (options: ButtonClickOptions<BaseModel, PropValue>, event: MouseEvent<HTMLButtonElement>) => {
		click && click({...options, array: $array}, event);
	};
	const $wrapped: WrappedAttributes = {
		$root, $model, $p2r, $onValueChange: VUtils.noop, $avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} click={onClick} {...rest} data-w="d9-table-row-operator"/>;
};

export const TableRowOperators = (props: {
	expandable?: boolean; removable?: boolean;
	rowIndex: number; rowSpan: number;
	$wrapped: Enhance$WrappedPropsForArrayElement<Omit<TableProps, '$array'>>['$wrapped'];
	omitDefaultRowOperators?: boolean; rowOperators: TableDef['rowOperators'];
}) => {
	const {
		expandable = false, removable = false, rowIndex, rowSpan,
		$wrapped,
		omitDefaultRowOperators = false, rowOperators
	} = props;

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
		{(rowOperators == null || rowOperators.length === 0)
			? null
			: <>
				{rowOperators.map(def => {
					const key = NUtils.getDefKey(def);
					return <CustomButton def={def} $wrapped={$wrapped} key={key}/>;
				})}
			</>}
		{(!omitDefaultRowOperators && removable !== false) ? <RemoveButton onClick={onRemoveElementClicked}/> : null}
		{(!omitDefaultRowOperators && expandable && !expanded) ? <ExpandButton onClick={onExpandClicked}/> : null}
		{(!omitDefaultRowOperators && expandable && expanded) ? <CollapseButton onClick={onCollapseClicked}/> : null}
	</ATableRowOperators>;
};
