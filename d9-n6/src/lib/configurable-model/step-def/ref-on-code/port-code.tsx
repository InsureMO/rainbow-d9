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
		const {step: def, node: {assistant}} = props;

		const {code} = def;
		const exists = VUtils.isNotBlank(code);
		const display = (code ?? '').trim();

		return <PrePort label={VUtils.blankThen(display, label)} required={true} defined={exists}/>;
	};
};
