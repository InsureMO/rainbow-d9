import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {CatchableErrorHandlePortModel, CatchableErrorHandlePortWidget} from '../port-widgets';
import {StepPortProps} from '../types';

export const PortCatchableError = (props: StepPortProps) => {
	const {node, engine, step: def} = props;

	const {errorHandles: {catchable} = {}} = def;
	const exists = catchable != null && Array.isArray(catchable);

	if (!exists) {
		return null;
	}
	// when in repaint, port maybe ready in backend engine, but not available in engine
	// therefore check the port is available or not first
	// typically error handle switched from snippet to sub steps, or vice versa
	const port = node.getPort(CatchableErrorHandlePortModel.NAME) as CatchableErrorHandlePortModel;
	if (port == null) {
		return null;
	}

	return <PostPort label={Labels.StepHandleCatchableError} required={false} defined={true}
	                 data-role="catchable-error">
		<CatchableErrorHandlePortWidget port={port} engine={engine}/>
	</PostPort>;
};
