import {PropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, OptionItemSort, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {StandardPipelineStepRegisterKey} from '../../../definition';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {NotAvailableDropdownOption} from '../../not-available-dropdown-option';
import {CommonElementEditorStyles} from '../../styles';
import {HttpStepDefModel} from './types';

const MethodEditor = (props: ConfigurableElementEditorProps<HttpStepDefModel>) => {
	const {model, onValueChanged} = props;

	const options: DropdownOptions = [
		{value: 'get', label: 'GET'},
		{value: 'head', label: 'HEAD'},
		{value: 'post', label: 'POST'},
		{value: 'put', label: 'PUT'},
		{value: 'delete', label: 'DELETE'},
		{value: 'connect', label: 'CONNECT'},
		{value: 'options', label: 'OPTIONS'},
		{value: 'trace', label: 'TRACE'},
		{value: 'patch', label: 'PATCH'}
	];
	const onValueChange = (value: PropValue) => {
		model.method = value as string;
		onValueChanged();
	};
	const method = VUtils.isBlank(model.method) ? 'post' : model.method.trim();
	if (options.every(({value}) => value !== method)) {
		// add an illegal option to present the original value
		// once legal option is selected, this option will be removed
		options.unshift({value: method, label: <NotAvailableDropdownOption label={method}/>});
	}
	const disabled = [
		StandardPipelineStepRegisterKey.HTTP_GET, StandardPipelineStepRegisterKey.HTTP_POST
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	].includes(model.use as any);

	return <UnwrappedDropdown value={method} onValueChange={onValueChange} options={options}
	                          optionSort={OptionItemSort.ASC}
	                          disabled={disabled}
	                          clearable={false} style={CommonElementEditorStyles.dropdown}/>;
};
export const elementMethod: ConfigurableElement = {
	code: 'method', label: Labels.StepHttpMethod, anchor: 'method',
	badge: (model: HttpStepDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.method)) {
			return model.method.trim();
		} else {
			return 'POST';
		}
	},
	changeBy: ['use'],
	editor: MethodEditor,
	helpDoc: HelpDocs.stepHttpMethod
};