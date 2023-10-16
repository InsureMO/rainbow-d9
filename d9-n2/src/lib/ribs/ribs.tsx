import {PPUtils} from '@rainbow-d9/n1';
import React from 'react';
import {RibsProps} from './types';
import {ARibs} from './widgets';

export const Ribs = (props: RibsProps) => {
	const {$wrapped: {$p2r, $avs: {$disabled, $visible}}, children, ...rest} = props;

	// render container itself
	return <ARibs {...rest} data-disabled={$disabled} data-visible={$visible}
	              id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}>
		{children}
	</ARibs>;
};
