import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PrePort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from '../common';
import {GetPropertyStepDefModel} from './types';

export const PortProperty = (props: StepPortProps<GetPropertyStepDefModel>) => {
	const {step: def} = props;

	const {property} = def;
	const exists = VUtils.isNotBlank(property);

	return <PrePort label={Labels.StepGetPropertyProperty} required={true}
	                defined={exists} all={true} allAsBoolean={true}/>;
};
