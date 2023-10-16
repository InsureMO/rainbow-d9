import {registerWidget, WidgetRegistrationOptions} from '@rainbow-d9/n1';
import React from 'react';
import {RibNoData} from './rib-no-data';
import {Ribs} from './ribs';
import {ImmutableRibRowProps, ImmutableRibsProps} from './types';
import {ARibRow} from './widgets';

export const ImmutableRibRow = (props: ImmutableRibRowProps) => {
	const {children} = props;

	return <ARibRow>
		{children}
	</ARibRow>;
};

export const ImmutableRibs = (props: ImmutableRibsProps) => {
	const {$array, children, ...rest} = props;

	return <Ribs $array={{...$array, addable: false, removable: false}} {...rest}>
		{children}
	</Ribs>;
};

registerWidget({
	key: 'RibsView', JSX: ImmutableRibs, NO_ELEMENT: RibNoData, ELEMENT: ImmutableRibRow, container: true, array: true
} as WidgetRegistrationOptions);