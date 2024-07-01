import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {AnyErrorHandlePortModel, AnyErrorHandlePortWidget} from '../port-widgets';
import {StepPortProps} from '../types';

export const PortAnyError = (props: StepPortProps) => {
	const {node, engine, step: def} = props;

	const {errorHandles: {any} = {}} = def;
	const exists = any != null && Array.isArray(any);

	if (!exists) {
		return null;
	}

	return <PostPort label={Labels.StepHandleAnyError} required={false} defined={true} data-role="any-error">
		<AnyErrorHandlePortWidget port={node.getPort(AnyErrorHandlePortModel.NAME) as AnyErrorHandlePortModel}
		                          engine={engine}/>
	</PostPort>;
};
