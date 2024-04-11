import {EnhancedPropsForArray} from '@rainbow-d9/n1';
import React from 'react';
import {IntlLabel, toIntlLabel} from '../intl-label';
import {RibsProps} from './types';
import {ARibNoDataRow} from './widgets';

export const RibNoData = (props: Omit<RibsProps, '$array'> & { $array: EnhancedPropsForArray }) => {
	const {
		$array: {
			hasElement,
			noElementReminder = <IntlLabel keys={['ribs', 'noElement']} value="No data found."/>
		}
	} = props;

	if (hasElement) {
		return null;
	} else {
		return <ARibNoDataRow>
			{toIntlLabel(noElementReminder)}
		</ARibNoDataRow>;
	}
};
