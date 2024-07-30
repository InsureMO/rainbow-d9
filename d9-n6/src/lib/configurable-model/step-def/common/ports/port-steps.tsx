import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {StepsPortModel, StepsPortWidget} from '../port-widgets';
import {StepPortProps} from '../types';

export const StepsPortName = 'steps';

export const PortSteps = (props: StepPortProps) => {
	const {node, engine} = props;

	return <PostPort label={Labels.StepSteps} required={false} defined={true} data-role="steps">
		<StepsPortWidget port={node.getPort(StepsPortName) as StepsPortModel}
		                 engine={engine}/>
	</PostPort>;
};
