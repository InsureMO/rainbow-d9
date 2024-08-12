import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PrePort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from '../common';
import {HttpStepDefModel} from './types';

export const PortSystem = (props: StepPortProps<HttpStepDefModel>) => {
	const {step: def} = props;

	const {system} = def;
	const exists = VUtils.isNotBlank(system);
	const display = (system ?? '').trim();

	return <PrePort label={VUtils.blankThen(display, Labels.StepHttpSystem)} required={true} defined={exists}/>;
};
