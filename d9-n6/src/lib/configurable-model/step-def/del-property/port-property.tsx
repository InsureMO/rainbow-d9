import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PrePort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from '../common';
import {DelPropertyStepDefModel} from './types';

export const PortProperty = (props: StepPortProps<DelPropertyStepDefModel>) => {
	const {step: def} = props;

	const {property} = def;
	const exists = VUtils.isNotBlank(property);

	return <PrePort label={Labels.StepDelPropertyProperty} required={true}
	                defined={exists} all={true} allAsBoolean={true}/>;
};
