import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {StepPortProps} from '../types';

export const PortMergeRequest = (props: StepPortProps) => {
	const {step: def} = props;

	const {mergeRequest} = def;

	if (mergeRequest == null) {
		return null;
	} else if (mergeRequest === false) {
		return null;
	} else if (mergeRequest === true) {
		return <PostPort label={Labels.StepMergeRequest} required={false}
		                 defined={true} all={true} allAsBoolean={true}/>;
	} else if (VUtils.isBlank(mergeRequest)) {
		return null;
	} else {
		return <PostPort label={Labels.StepToResponse} required={false}
		                 defined={true} all={true} allAsBoolean={false} allAsGiven={mergeRequest.trim()}/>;
	}
};
