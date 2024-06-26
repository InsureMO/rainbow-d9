import React from 'react';
import {PostPort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from '../common';
import {SetsStepDefModel} from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PortSubSteps = (_props: StepPortProps<SetsStepDefModel>) => {
	return <PostPort label={Labels.StepSubSteps} required={false} defined={true} data-role="sub-steps"/>;
};
