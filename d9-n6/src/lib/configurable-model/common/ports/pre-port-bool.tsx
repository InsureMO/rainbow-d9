import React, {ReactNode} from 'react';
import {PrePort} from '../../../diagram';
import {CommonStepDefModel, StepPortProps} from '../../step-def';
import {WithKey} from './types';

export interface CreatePrePortBoolOptions<M extends CommonStepDefModel> {
	label: ReactNode;
	getValue: (model: M) => boolean;
	/** default false */
	defaultAs?: boolean;
	/** default false */
	required?: boolean;
}

export const createPrePortBool = <M extends CommonStepDefModel>(options: CreatePrePortBoolOptions<M>) => {
	const {label, getValue, defaultAs = false, required = false} = options;

	return (props: StepPortProps<M>) => {
		const {step: model} = props;

		const value = getValue(model);
		const defined = !required || value != null;

		return <PrePort label={label} required={required} defined={defined} all={value ?? defaultAs}
		                allAsBoolean={true}/>;
	};
};

export const createPrePortBoolWithKey = <M extends CommonStepDefModel>(options: WithKey<CreatePrePortBoolOptions<M>>) => {
	const {key, ...rest} = options;
	return {key, port: createPrePortBool(rest)};
};
