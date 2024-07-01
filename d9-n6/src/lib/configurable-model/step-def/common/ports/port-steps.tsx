import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {StepPortProps, StepsPortModel, StepsPortWidget} from '../index';

export const StepsPortName = 'steps';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PortSteps = (props: StepPortProps) => {
	const {node, engine} = props;

	return <PostPort label={Labels.StepSteps} required={false} defined={true} data-role="steps">
		<StepsPortWidget port={node.getPort(StepsPortName) as StepsPortModel}
		                 engine={engine}/>
	</PostPort>;
};
