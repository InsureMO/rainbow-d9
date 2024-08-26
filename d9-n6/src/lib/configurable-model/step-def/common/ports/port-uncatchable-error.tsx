import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {UncatchableErrorHandlePortModel, UncatchableErrorHandlePortWidget} from '../port-widgets';
import {StepPortProps} from '../types';

export const PortUncatchableError = (props: StepPortProps) => {
	const {node, engine, step: def} = props;

	const {errorHandles: {uncatchable} = {}} = def;
	const exists = uncatchable != null && Array.isArray(uncatchable);

	if (!exists) {
		return null;
	}
	// when in repaint, port maybe ready in backend engine, but not available in engine
	// therefore check the port is available or not first
	// typically error handle switched from snippet to sub steps, or vice versa
	const port = node.getPort(UncatchableErrorHandlePortModel.NAME) as UncatchableErrorHandlePortModel;
	if (port == null) {
		return null;
	}

	return <PostPort label={Labels.StepHandleUncatchableError} required={false} defined={true}
	                 data-role="uncatchable-error">
		<UncatchableErrorHandlePortWidget port={port} engine={engine}/>
	</PostPort>;
};
