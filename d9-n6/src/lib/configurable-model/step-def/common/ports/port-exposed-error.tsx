import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {ExposedErrorHandlePortModel, ExposedErrorHandlePortWidget} from '../port-widgets';
import {StepPortProps} from '../types';

export const PortExposedError = (props: StepPortProps) => {
	const {node, engine, step: def} = props;

	const {errorHandles: {exposed} = {}} = def;
	const exists = exposed != null && Array.isArray(exposed);

	if (!exists) {
		return null;
	}

	// when in repaint, port maybe ready in backend engine, but not available in engine
	// therefore check the port is available or not first
	// typically error handle switched from snippet to sub steps, or vice versa
	const port = node.getPort(ExposedErrorHandlePortModel.NAME) as ExposedErrorHandlePortModel;
	if (port == null) {
		return null;
	}

	return <PostPort label={Labels.StepHandleExposedError} required={false} defined={true} data-role="exposed-error">
		<ExposedErrorHandlePortWidget port={port} engine={engine}/>
	</PostPort>;
};
