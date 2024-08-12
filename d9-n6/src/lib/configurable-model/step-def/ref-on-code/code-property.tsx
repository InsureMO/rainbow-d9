import {PropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, OptionItemSort, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeMissed,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {Labels} from '../../../labels';
import {PlaygroundModuleAssistant} from '../../../types';
import {NotAvailableDropdownOption} from '../../not-available-dropdown-option';
import {RefOnCodeStepDefModel} from './types';

export interface CreateRefOnCodeCodePropertyOptions {
	helpDoc: string;
	askOptions: (assistant: Required<PlaygroundModuleAssistant>) => DropdownOptions;
}

export const createRefOnCodeCodeProperty = (options: CreateRefOnCodeCodePropertyOptions): ConfigurableElement => {
	const {helpDoc, askOptions} = options;

	return {
		code: 'code', label: Labels.StepRefPipelineCode, anchor: 'code',
		badge: (model: RefOnCodeStepDefModel): ReactNode => {
			if (VUtils.isNotBlank(model.property)) {
				return <ConfigurableElementBadgeChecked/>;
			} else {
				return <ConfigurableElementBadgeMissed/>;
			}
		},
		editor: (props: ConfigurableElementEditorProps<RefOnCodeStepDefModel>) => {
			const {model, onValueChanged, assistant} = props;
			const onValueChange = (value: PropValue) => {
				model.code = value as string;
				onValueChanged();
			};
			const options: DropdownOptions = askOptions(assistant);
			const code = VUtils.isBlank(model.code) ? (void 0) : model.code.trim();
			if (code != null && options.every(({value}) => value !== code)) {
				// add an illegal option to present the original value
				// once legal option is selected, this option will be removed
				options.unshift({value: code, label: <NotAvailableDropdownOption label={code}/>});
			}

			return <UnwrappedDropdown onValueChange={onValueChange} value={model.code ?? ''}
			                          optionSort={OptionItemSort.ASC}
			                          clearable={false} options={options}/>;
		},
		helpDoc
	};
};
