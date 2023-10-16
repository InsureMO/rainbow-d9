import {registerWidget, WidgetRegistrationOptions} from '@rainbow-d9/n1';
import React from 'react';
import {RibBottomBar} from './rib-bottom-bar';
import {RibNoData} from './rib-no-data';
import {RibRow} from './rib-row';
import {Ribs as R} from './ribs';
import {ImmutableRibsProps, RibsArrayDef, RibsDef, RibsProps} from './types';

export const Ribs = (props: RibsProps) => {
	const {children, ...rest} = props;
	return <R {...rest}>
		{children}
	</R>;
};

registerWidget({
	key: 'Ribs', JSX: Ribs, NO_ELEMENT: RibNoData, ELEMENT: RibRow, BOTTOM: RibBottomBar, container: true, array: true
} as WidgetRegistrationOptions);

export {RibsProps, RibsDef, ImmutableRibsProps, RibsArrayDef};
export * from './immutable';