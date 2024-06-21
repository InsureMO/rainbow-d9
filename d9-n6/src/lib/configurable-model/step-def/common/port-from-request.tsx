import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {ApiVariablePortWidget} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from './types';

export const PortFromRequest = (props: StepPortProps) => {
	const {step: def, file} = props;

	const {fromRequest} = def;
	const exits = VUtils.isNotBlank(fromRequest);

	return <ApiVariablePortWidget label={Labels.StepFromRequest} required={true}
	                              defined={exits} all={exits} allAsBoolean={true}/>;
};
