import {PropValue} from '@rainbow-d9/n1';
import {DropdownOptions, OptionItemSort, UnwrappedDropdown} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElementEditorProps} from '../../../edit-dialog';
import {PlaygroundModuleAssistant} from '../../../types';
import {NotAvailableDropdownOption} from '../../not-available-dropdown-option';
import {CommonStepDefModel} from '../../step-def';
import {CommonElementEditorStyles} from '../../styles';
import {trim} from '../utils';

export interface CreateDropdownOnAssistantEditorOptions<M extends CommonStepDefModel, V> {
	getValue: (model: M) => V;
	setValue: (model: M, value: V) => void;
	askOptions: (assistant: Required<PlaygroundModuleAssistant>) => DropdownOptions;
}

export const createDropdownOnAssistantEditor = <M extends CommonStepDefModel, V>(options: CreateDropdownOnAssistantEditorOptions<M, V>) => {
	const {getValue, setValue, askOptions} = options;

	return (props: ConfigurableElementEditorProps<M>) => {
		const {model, onValueChanged, assistant} = props;
		const onValueChange = (value: PropValue) => {
			setValue(model, value as V);
			onValueChanged();
		};
		const options: DropdownOptions = askOptions(assistant);
		const value = trim(getValue(model));
		if (value != null && options.every(({value: v}) => value !== v)) {
			// add an illegal option to present the original value
			// once legal option is selected, this option will be removed
			options.unshift({value, label: <NotAvailableDropdownOption label={value}/>});
		}

		return <UnwrappedDropdown onValueChange={onValueChange} value={value}
		                          optionSort={OptionItemSort.ASC}
		                          clearable={false} options={options}
		                          style={CommonElementEditorStyles.dropdown}/>;
	};
};