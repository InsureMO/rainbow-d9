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

	return <PostPort label={Labels.StepHandleExposedError} required={false} defined={true} data-role="exposed-error">
		<ExposedErrorHandlePortWidget
			port={node.getPort(ExposedErrorHandlePortModel.NAME) as ExposedErrorHandlePortModel}
			engine={engine}/>
	</PostPort>;
};
