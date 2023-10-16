import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React from 'react';
import {I18NVars} from '../constants';
import {RibsProps} from './types';
import {ARibNoDataRow} from './widgets';

export const RibNoData = (props: Omit<RibsProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {$array: {hasElement, noElementReminder}} = props;

	if (hasElement) {
		return null;
	} else {
		return <ARibNoDataRow>{noElementReminder ?? I18NVars.RIBS.NO_ELEMENT}</ARibNoDataRow>;
	}
};
