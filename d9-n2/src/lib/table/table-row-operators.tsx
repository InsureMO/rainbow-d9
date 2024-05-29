import {
	BaseModel,
	Enhance$WrappedPropsForArrayElement,
	NUtils,
	ObjectPropValue,
	PropValue,
	VUtils,
	WrappedAttributes,
	Wrapper
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
	               click={onClick} data-role="d9-table-row-operator"/>;
};
const CollapseButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.collapse']}
	               click={onClick} data-role="d9-table-row-operator"/>;
};
const RemoveButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.remove']}
	               click={onClick} data-role="d9-table-row-operator"/>;
};
const CustomButton = (props: {
	def: TableRowButtonDef;
	$wrapped: Enhance$WrappedPropsForArrayElement<Omit<TableProps, '$array'>>['$wrapped'];
	expandable: boolean; expanded: boolean;
	prebuilt: { remove: () => void; expand: () => void; collapse: () => void }
}) => {
	const {
		def,
		$wrapped: {$root, $array, $model, $p2r},
		expandable, expanded, prebuilt: {remove, expand, collapse}
	} = props;
	const {prebuilt, click, ...rest} = def;

	if (!expandable && (prebuilt === 'expand' || prebuilt === 'collapse')) {
		return null;
	}
	if (expandable && expanded && prebuilt === 'expand') {
		return null;
	}
	if (expandable && !expanded && prebuilt === 'collapse') {
		return null;
	}

	const onClick = async (options: ButtonClickOptions<BaseModel, PropValue>, event: MouseEvent<HTMLButtonElement>) => {
		switch (prebuilt) {
			case 'remove':
				remove();
				break;
			case 'expand':
				expand();
				break;
			case 'collapse':
				collapse();
				break;
			default:
				click && await click({...options, array: $array}, event);
				break;
		}
	};
	const operatorDef = {...rest, $wt: rest.$wt || 'Button', 'data-role': 'd9-table-row-operator', click: onClick};
	return <Wrapper $root={$root} $model={$model} $p2r={$p2r} {...operatorDef}/>;
};

export const TableRowOperators = (props: {
	expandable?: boolean; removable?: boolean;
	rowIndex: number; rowSpan: number;
	$wrapped: Enhance$WrappedPropsForArrayElement<Omit<TableProps, '$array'>>['$wrapped'];
	omitDefaultRowOperators?: TableDef['omitDefaultRowOperators']; rowOperators: TableDef['rowOperators'];
	initExpanded?: TableDef['initExpanded']
}) => {
	const {
		expandable = false, removable = false, rowIndex, rowSpan,
		$wrapped,
		omitDefaultRowOperators = false, rowOperators,
		initExpanded
	} = props;

	const {on, off, fire} = useTableEventBus();
	const [expanded, setExpanded] = useState(() => {
		if (initExpanded) {
			return initExpanded($wrapped.$model as ObjectPropValue, rowIndex);
		}
		return false;
	});

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

	if (rowIndex === -1 || (!removable && !expandable && (rowOperators == null || rowOperators.length === 0))) {
		return <ATableRowOperators data-expanded={false} rowIndex={0} rowSpan={rowSpan}/>;
	}

	const onRemoveElementClicked = () => fire(TableEventTypes.REMOVE_ROW, rowIndex);
	const onExpandClicked = () => {
		fire(TableEventTypes.EXPAND_ROW, rowIndex);
	};
	const onCollapseClicked = () => {
		fire(TableEventTypes.COLLAPSE_ROW, rowIndex);
	};

	const omitFold = omitDefaultRowOperators === true || omitDefaultRowOperators === 'fold';
	const omitRemove = omitDefaultRowOperators === true || omitDefaultRowOperators === 'remove';

	return <ATableRowOperators data-expanded={expanded}
	                           rowIndex={rowIndex} rowSpan={rowSpan}>
		{(rowOperators == null || rowOperators.length === 0)
			? null
			: <>
				{rowOperators.map(def => {
					const key = NUtils.getDefKey(def);
					return <CustomButton def={def} $wrapped={$wrapped}
					                     expandable={expandable} expanded={expanded}
					                     prebuilt={{
						                     remove: onRemoveElementClicked,
						                     expand: onExpandClicked,
						                     collapse: onCollapseClicked
					                     }}
					                     key={key}/>;
				})}
			</>}
		{(!omitRemove && removable !== false) ? <RemoveButton onClick={onRemoveElementClicked}/> : null}
		{(!omitFold && expandable && !expanded) ? <ExpandButton onClick={onExpandClicked}/> : null}
		{(!omitFold && expandable && expanded) ? <CollapseButton onClick={onCollapseClicked}/> : null}
	</ATableRowOperators>;
};
