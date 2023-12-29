import {EnhancedPropsForArray, Wrapper} from '@rainbow-d9/n1';
import React from 'react';
import {Button, ButtonInk} from '../button';
import {I18NVars} from '../constants';
import {useTableEventBus} from './event/table-event-bus';
import {TableEventTypes} from './event/table-event-bus-types';
import {TableProps} from './types';
import {ATableBottomBar, ATableBottomBarSeparator} from './widgets';

export const TableBottomBar = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		$wrapped, pageable,
		$array: {addable = false, addLabel, addElement}
	} = props;

	const {fire} = useTableEventBus();
	if (addable === false && pageable == null) {
		return null;
	} else {
		const onAddClicked = async () => await addElement();
		// it will refresh the pagination first
		const onPaginationChanged = async ({newValue}) => {
			fire(TableEventTypes.PAGE_CHANGED, newValue);
		};

		return <ATableBottomBar>
			{pageable != null
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				? <Wrapper {...pageable} valueChanged={onPaginationChanged}
				           $root={$wrapped.$root} $model={$wrapped.$model} $p2r={$wrapped.$p2r}
				/>
				: null}
			{(pageable != null && addable !== false) ? <ATableBottomBarSeparator/> : null}
			{addable !== false
				? <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} text={addLabel ?? I18NVars.TABLE.CREATE_ITEM}
				          click={onAddClicked}/>
				: null}
		</ATableBottomBar>;
	}
};
