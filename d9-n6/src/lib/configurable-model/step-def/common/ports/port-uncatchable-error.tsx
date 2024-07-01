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

	return <PostPort label={Labels.StepHandleUncatchableError} required={false} defined={true}
	                 data-role="uncatchable-error">
		<UncatchableErrorHandlePortWidget
			port={node.getPort(UncatchableErrorHandlePortModel.NAME) as UncatchableErrorHandlePortModel}
			engine={engine}/>
	</PostPort>;
};
