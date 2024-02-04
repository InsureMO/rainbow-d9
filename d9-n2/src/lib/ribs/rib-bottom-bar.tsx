import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React from 'react';
import {useArrayCouldAddElement} from '../array-container-assist';
import {Button, ButtonInk} from '../button';
import {useGlobalHandlers} from '../global';
import {IntlLabel} from '../intl-label';
import {RibsProps} from './types';
import {ARibBottomBar} from './widgets';

export const RibBottomBarButton = (props: Omit<RibsProps, 'children'> & { $array: EnhancedPropsForArray }) => {
	const {$wrapped, $array: {addLabel, addElement}} = props;

	const globalHandlers = useGlobalHandlers();
	const [disabled] = useArrayCouldAddElement(props);
	const onAddClicked = async () => await addElement({global: globalHandlers});

	const button$wrapped = {
		...$wrapped,
		$avs: {...$wrapped.$avs ?? {}, $disabled: disabled === true ? disabled : $wrapped.$avs?.$disabled}
	};

	return <Button $wrapped={button$wrapped} ink={ButtonInk.PRIMARY}
	               text={addLabel ?? <IntlLabel keys={['ribs', 'createItem']} value="Create New Element"/>}
	               click={onAddClicked}/>;
};

export const RibBottomBar = (props: Omit<RibsProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {$array: {addable = false}} = props;

	if (addable === false) {
		return null;
	} else {
		return <ARibBottomBar>
			<RibBottomBarButton {...props}/>
		</ARibBottomBar>;
	}
};
