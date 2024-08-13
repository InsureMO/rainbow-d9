import {VUtils} from '@rainbow-d9/n1';
import {DropdownOptions} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {PrePort} from '../../../diagram';
import {PlaygroundModuleAssistant} from '../../../types';
import {CommonStepDefModel, StepPortProps} from '../../step-def';
import {trim} from '../utils';
import {WithKey} from './types';

export interface CreatePrePortOnAssistantOptions<M extends CommonStepDefModel, V> {
	label: ReactNode;
	getValue: (model: M) => V;
	askOptions: (assistant: Required<PlaygroundModuleAssistant>) => DropdownOptions;
}

export const createPrePortOnAssistant = <M extends CommonStepDefModel, V>(options: CreatePrePortOnAssistantOptions<M, V>) => {
	const {label, getValue, askOptions} = options;

	return (props: StepPortProps<M>) => {
		const {step: model, node: {assistant}} = props;

		const value = trim(getValue(model));
		const options: DropdownOptions = askOptions(assistant);
		const foundOption = value != null ? (void 0) : options.find(({value: v}) => v == value);
		const found = foundOption?.label;
		const exists = found != null;

		return <PrePort label={VUtils.blankThen(found, label)} required={true} defined={exists}/>;
	};
};

export const createPrePortOnAssistantWithKey = <M extends CommonStepDefModel, V>(options: WithKey<CreatePrePortOnAssistantOptions<M, V>>) => {
	const {key, ...rest} = options;
	return {key, port: createPrePortOnAssistant(rest)};
};
