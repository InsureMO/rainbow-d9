import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PrePort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {StepPortProps} from '../types';

export const PortFromInput = (props: StepPortProps) => {
	const {step: def} = props;

	const {fromInput} = def;
	const exists = VUtils.isNotBlank(fromInput);

	if (!exists) {
		return null;
	}

	return <PrePort label={Labels.StepFromInput} required={false}
	                defined={true} all={true} allAsBoolean={true}/>;
};
