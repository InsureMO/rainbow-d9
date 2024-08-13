import {VUtils} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {PrePort} from '../../../diagram';
import {CommonStepDefModel, StepPortProps} from '../../step-def';
import {WithKey} from './types';

export interface CreatePrePortExistsOptions<M extends CommonStepDefModel> {
	label: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getValue: (model: M) => any;
}

export const createPrePortExists = <M extends CommonStepDefModel>(options: CreatePrePortExistsOptions<M>) => {
	const {label, getValue} = options;

	return (props: StepPortProps<M>) => {
		const {step: def} = props;

		const exists = VUtils.isNotBlank(getValue(def));

		return <PrePort label={label} required={true} defined={exists} all={true} allAsBoolean={true}/>;
	};
};

export const createPrePortExistsWithKey = <M extends CommonStepDefModel>(options: WithKey<CreatePrePortExistsOptions<M>>) => {
	const {key, ...rest} = options;
	return {key, port: createPrePortExists(rest)};
};
