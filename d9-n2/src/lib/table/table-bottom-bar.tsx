import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React from 'react';
import {Button, ButtonInk} from '../button';
import {I18NVars} from '../constants';
import {Pagination} from '../pagination';
import {TableProps} from './types';
import {ATableBottomBar, ATableBottomBarSeparator} from './widgets';

export const TableBottomBar = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		$wrapped, pageable,
		$array: {addable = false, addLabel, addElement}
	} = props;

	if (addable === false && pageable == null) {
		return null;
	} else {
		const onAddClicked = async () => await addElement();

		return <ATableBottomBar>
			{pageable != null
				? <Pagination $wrapped={$wrapped} {...pageable}/>
				: null}
			{(pageable != null && addable !== false) ? <ATableBottomBarSeparator/> : null}
			{addable !== false
				? <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} text={addLabel ?? I18NVars.TABLE.CREATE_ITEM}
				          click={onAddClicked}/>
				: null}
		</ATableBottomBar>;
	}
};
