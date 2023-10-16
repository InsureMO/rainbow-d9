import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React from 'react';
import {Button, ButtonInk} from '../button';
import {I18NVars} from '../constants';
import {TableProps} from './types';
import {ATableBottomBar} from './widgets';

export const TableBottomBar = (props: Omit<TableProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {$wrapped, $array: {addable = false, addLabel, addElement}} = props;

	if (addable === false) {
		return null;
	} else {
		const onAddClicked = async () => await addElement();

		return <ATableBottomBar>
			<Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} text={addLabel ?? I18NVars.TABLE.CREATE_ITEM}
			        click={onAddClicked} />
		</ATableBottomBar>;
	}
};
