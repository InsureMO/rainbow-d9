import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PrePort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from '../common';
import {HttpStepDefModel} from './types';

export const PortEndpoint = (props: StepPortProps<HttpStepDefModel>) => {
	const {step: def} = props;

	const {endpoint} = def;
	const exists = VUtils.isNotBlank(endpoint);

	return <PrePort label={Labels.StepHttpEndpoint} required={true}
	                defined={exists} all={true} allAsGiven={(endpoint ?? '').trim()}/>;
};
