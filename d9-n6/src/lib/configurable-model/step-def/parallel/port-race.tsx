import React from 'react';
import {PostPort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from '../common';
import {ParallelStepDefModel} from './types';

export const PortRace = (props: StepPortProps<ParallelStepDefModel>) => {
	const {step: def} = props;

	return <PostPort label={Labels.StepParallelRace} required={false}
	                 defined={true} all={def.race ?? false} allAsBoolean={true}/>;
};
