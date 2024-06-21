import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PrePort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from './types';

export const PortFromRequest = (props: StepPortProps) => {
	const {step: def} = props;

	const {fromRequest} = def;
	const exits = VUtils.isNotBlank(fromRequest);

	if (!exits) {
		return null;
	}

	return <PrePort label={Labels.StepFromRequest} required={false}
	                defined={true} all={true} allAsBoolean={true}/>;
};
