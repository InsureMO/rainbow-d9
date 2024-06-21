import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PostPort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from './types';

export const PortToResponse = (props: StepPortProps) => {
	const {step: def} = props;

	const {toResponse} = def;
	const exists = VUtils.isNotBlank(toResponse);

	if (!exists) {
		return null;
	}

	return <PostPort label={Labels.StepToResponse} required={false}
	                 defined={true} all={true} allAsBoolean={true}/>;
};
