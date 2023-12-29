import {EnhancedPropsForArray, useForceUpdate, Wrapper} from '@rainbow-d9/n1';
import React, {useEffect} from 'react';
import {Button, ButtonInk} from '../button';
import {I18NVars} from '../constants';
import {PaginationData} from '../pagination';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableProps} from './types';
import {ATableBottomBar, ATableBottomBarSeparator} from './widgets';

export const TableBottomBar = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		$wrapped, pageable,
		$array: {addable = false, addLabel, addElement}
	} = props;

	const {on, off, fire} = useTableEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (pageable == null) {
			return;
		}
		const onPageChanged = () => {
			forceUpdate();
		};
		on(TableEventTypes.PAGE_CHANGED_BY_FILTER, onPageChanged);
		return () => {
			off(TableEventTypes.PAGE_CHANGED_BY_FILTER, onPageChanged);
		};
	}, [on, off, pageable, forceUpdate]);

	if (addable === false && pageable == null) {
		return null;
	} else {
		const onAddClicked = async () => await addElement();
		// it will refresh the pagination first, model updated
		const onPaginationChanged = async (options: {
			oldValue?: PaginationData | null; newValue: PaginationData;
		}) => {
			fire(TableEventTypes.PAGE_CHANGED, options.oldValue, options.newValue);
		};

		// valueChanged is used in table content, as external function call
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {valueChanged, ...pageableDef} = pageable;

		return <ATableBottomBar>
			{pageable != null
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				? <Wrapper {...pageableDef} valueChanged={onPaginationChanged}
				           $root={$wrapped.$root} $model={$wrapped.$model} $p2r={$wrapped.$p2r}/>
				: null}
			{(pageable != null && addable !== false) ? <ATableBottomBarSeparator/> : null}
			{addable !== false
				? <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} text={addLabel ?? I18NVars.TABLE.CREATE_ITEM}
				          click={onAddClicked}/>
				: null}
		</ATableBottomBar>;
	}
};
