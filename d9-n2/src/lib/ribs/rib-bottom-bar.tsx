import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React from 'react';
import {Button, ButtonInk} from '../button';
import {IntlLabel} from '../intl-label';
import {RibsProps} from './types';
import {ARibBottomBar} from './widgets';

export const RibBottomBar = (props: Omit<RibsProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {$wrapped, $array: {addable = false, addLabel, addElement}} = props;

	if (addable === false) {
		return null;
	} else {
		const onAddClicked = async () => await addElement();

		return <ARibBottomBar>
			<Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY}
			        text={addLabel ?? <IntlLabel keys={['ribs', 'createItem']} value="Create New Element"/>}
			        click={onAddClicked}/>
		</ARibBottomBar>;
	}
};
