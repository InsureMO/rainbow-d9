import {PPUtils} from '@d9/n1';
import React from 'react';
import {TableProps} from './types';
import {ATable} from './widgets';

export const Table = (props: TableProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {$wrapped, headers, children, ...rest} = props;
	const {$avs: {$disabled, $visible}} = $wrapped;

	// render container itself
	return <ATable {...rest} data-disabled={$disabled} data-visible={$visible}
	               id={PPUtils.asId(PPUtils.absolute($wrapped.$p2r, props.$pp), props.id)}>
		{children}
	</ATable>;
};
