import {PPUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {RibsProps} from './types';
import {ARibs} from './widgets';

export const Ribs = forwardRef((props: RibsProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {$wrapped: {$p2r, $avs: {$disabled, $visible}}, children, ...rest} = props;

	// render container itself
	return <ARibs {...rest} data-disabled={$disabled} data-visible={$visible}
	              id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	              ref={ref}>
		{children}
	</ARibs>;
});
