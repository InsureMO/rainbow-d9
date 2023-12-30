import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React from 'react';
import {IntlLabel} from '../intl-label';
import {RibsProps} from './types';
import {ARibNoDataRow} from './widgets';

export const RibNoData = (props: Omit<RibsProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {$array: {hasElement, noElementReminder}} = props;

	if (hasElement) {
		return null;
	} else {
		return <ARibNoDataRow>
			{noElementReminder ?? <IntlLabel keys={['ribs', 'noElement']} value="No data found."/>}
		</ARibNoDataRow>;
	}
};
