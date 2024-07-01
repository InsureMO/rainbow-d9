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

	return <PostPort label={Labels.StepHandleCatchableError} required={false} defined={true}
	                 data-role="catchable-error">
		<CatchableErrorHandlePortWidget
			port={node.getPort(CatchableErrorHandlePortModel.NAME) as CatchableErrorHandlePortModel}
			engine={engine}/>
	</PostPort>;
};
