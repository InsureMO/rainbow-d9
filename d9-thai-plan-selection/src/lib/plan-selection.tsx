import {PPUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PlanSelectionProps} from './types';
import {useDefs} from './use-defs';
import {APlanSelection} from './widgets';

export const PlanSelection = (props: PlanSelectionProps) => {
	const {$pp, $wrapped, defs, ...rest} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const {initialized, defs: planDefs} = useDefs(defs);
	if (!initialized) {
		return null;
	}

	return <APlanSelection {...rest} data-disabled={$disabled} data-visible={$visible}
	                       id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
	</APlanSelection>;
};
