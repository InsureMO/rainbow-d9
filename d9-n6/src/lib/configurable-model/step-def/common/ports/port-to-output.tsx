import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {StepPortProps} from '../types';

export const PortToOutput = (props: StepPortProps) => {
	const {step: def} = props;

	const {toOutput} = def;
	const exists = VUtils.isNotBlank(toOutput);

	if (!exists) {
		return null;
	}

	return <PostPort label={Labels.StepToOutput} required={false}
	                 defined={true} all={true} allAsBoolean={true}/>;
};
