import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {StepsPortModel, StepsPortWidget} from '../port-widgets';
import {StepPortProps} from '../types';

export const StepsPortName = 'steps';

export const PortSteps = (props: StepPortProps) => {
	const {node, engine} = props;

	// when in repaint, port maybe ready in backend engine, but not available in engine
	// therefore check the port is available or not first
	// typically error handle switched from snippet to sub steps, or vice versa
	const port = node.getPort(StepsPortName) as StepsPortModel;
	if (port == null) {
		return null;
	}

	return <PostPort label={Labels.StepSteps} required={false} defined={true} data-role="steps">
		<StepsPortWidget port={port} engine={engine}/>
	</PostPort>;
};
