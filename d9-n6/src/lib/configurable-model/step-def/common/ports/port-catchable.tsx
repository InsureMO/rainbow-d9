import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {CatchablePortModel, CatchablePortWidget, StepsPortModel} from '../port-widgets';
import {StepPortProps} from '../types';

export const PortCatchable = (props: StepPortProps) => {
	const {node, engine, step: def} = props;

	const {errorHandles: {catchable} = {}} = def;
	const exists = catchable != null && Array.isArray(catchable);

	if (!exists) {
		return null;
	}

	return <PostPort label={Labels.StepCatchable} required={false} defined={true} data-role="catchable-error">
		<CatchablePortWidget port={node.getPort(CatchablePortModel.NAME) as StepsPortModel}
		                     engine={engine}/>
	</PostPort>;
};
