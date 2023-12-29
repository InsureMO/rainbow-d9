import {PPUtils} from '@rainbow-d9/n1';
import React from 'react';
import {TableProps} from './types';
import {ATable} from './widgets';

export const Table = (props: TableProps) => {
	const {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		$wrapped, headers, pageable,
		children, ...rest
	} = props;
	const {$avs: {$disabled, $visible}} = $wrapped;

	// render container itself
	return <ATable {...rest} data-disabled={$disabled} data-visible={$visible}
	               id={PPUtils.asId(PPUtils.absolute($wrapped.$p2r, props.$pp), props.id)}>
		{children}
	</ATable>;
};
