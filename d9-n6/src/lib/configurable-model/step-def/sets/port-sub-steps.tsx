import React from 'react';
import {PostPort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps, SubStepsPortModel, SubStepsPortWidget} from '../common';
import {SetsStepDefModel} from './types';

export const SetsSubStepsPortName = 'sets-sub-steps';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PortSubSteps = (props: StepPortProps<SetsStepDefModel>) => {
	const {node, engine} = props;

	return <PostPort label={Labels.StepSubSteps} required={false} defined={true} data-role="sub-steps">
		<SubStepsPortWidget port={node.getPort(SetsSubStepsPortName) as SubStepsPortModel}
		                    engine={engine}/>
	</PostPort>;
};
