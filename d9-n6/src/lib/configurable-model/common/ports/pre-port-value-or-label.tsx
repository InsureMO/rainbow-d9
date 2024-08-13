import {VUtils} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {PrePort} from '../../../diagram';
import {CommonStepDefModel, StepPortProps} from '../../step-def';
import {trim} from '../utils';
import {WithKey} from './types';

export interface CreatePrePortValueOrLabelOptions<M extends CommonStepDefModel> {
	label: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getValue: (model: M) => any;
}

export const createPrePortValueOrLabel = <M extends CommonStepDefModel>(options: CreatePrePortValueOrLabelOptions<M>) => {
	const {label, getValue} = options;

	return (props: StepPortProps<M>) => {
		const {step: model} = props;

		const value = getValue(model);
		const exists = VUtils.isNotBlank(value);
		const display = trim(value);

		return <PrePort label={VUtils.blankThen(display, label)} required={true} defined={exists}/>;
	};

};

export const createPrePortValueOrLabelWithKey = <M extends CommonStepDefModel>(options: WithKey<CreatePrePortValueOrLabelOptions<M>>) => {
	const {key, ...rest} = options;
	return {key, port: createPrePortValueOrLabel(rest)};
};