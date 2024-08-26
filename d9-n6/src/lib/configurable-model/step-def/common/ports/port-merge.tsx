import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PostPort} from '../../../../diagram';
import {Labels} from '../../../../labels';
import {StepPortProps} from '../types';

export const PortMerge = (props: StepPortProps) => {
	const {step: def} = props;

	const {merge} = def;

	if (merge == null) {
		return <PostPort label={Labels.StepMergeReplace} required={false} defined={true}/>;
	} else if (merge === false) {
		return <PostPort label={Labels.StepMergeReplace} required={false} defined={true}/>;
	} else if (merge === true) {
		return <PostPort label={Labels.StepMergeUnbox} required={false} defined={true}/>;
	} else if (VUtils.isBlank(merge)) {
		return <PostPort label={Labels.StepMergeReplace} required={false} defined={true}/>;
	} else {
		return <PostPort label={Labels.StepMergeAsProperty} required={false}
		                 defined={true} all={true} allAsGiven={merge.trim()}/>;
	}
};
