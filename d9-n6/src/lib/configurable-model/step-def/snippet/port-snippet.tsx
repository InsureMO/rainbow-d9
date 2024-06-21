import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {PrePort} from '../../../diagram';
import {Labels} from '../../../labels';
import {StepPortProps} from '../common';
import {SnippetStepDefModel} from './types';

export const PortSnippet = (props: StepPortProps<SnippetStepDefModel>) => {
	const {step: def} = props;

	const {snippet} = def;
	const exists = VUtils.isNotBlank(snippet);

	return <PrePort label={Labels.SnippetStepSnippet} required={true}
	                defined={exists} all={true} allAsBoolean={true}/>;
};
