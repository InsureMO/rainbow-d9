import {VUtils} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {PrePort} from '../../../diagram';
import {StepPortProps} from '../common';
import {RefOnCodeStepDefModel} from './types';

export interface CreateRefOnCodeCodePortOptions {
	label: ReactNode;
}

export const createRefOnCodePortCode = (options: CreateRefOnCodeCodePortOptions) => {
	const {label} = options;

	return (props: StepPortProps<RefOnCodeStepDefModel>) => {
		const {step: def} = props;

		const {code} = def;
		const exists = VUtils.isNotBlank(code);

		return <PrePort label={label} required={true}
		                defined={exists} all={true} allAsBoolean={true}/>;
	};
};
