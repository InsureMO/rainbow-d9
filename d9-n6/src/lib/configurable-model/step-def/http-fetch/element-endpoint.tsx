import {PropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, OptionItemSort, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeMissed,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {NotAvailableDropdownOption} from '../../not-available-dropdown-option';
import {CommonElementEditorStyles} from '../../styles';
import {HttpStepDefModel} from './types';

export const elementEndpoint: ConfigurableElement = {
	code: 'endpoint', label: Labels.StepHttpEndpoint, anchor: 'endpoint',
	badge: (model: HttpStepDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.endpoint)) {
			return model.endpoint.trim();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	changeBy: ['system'],
	editor: (props: ConfigurableElementEditorProps<HttpStepDefModel>) => {
		const {model, onValueChanged, assistant} = props;

		const systems = assistant.askSystemsForHttp();
		const system = VUtils.isBlank(model.system) ? (void 0) : model.system.trim();
		const selectedSystem = systems.find(({code}) => code === system);
		const endpoints = selectedSystem?.endpoints ?? [];
		const endpoint = VUtils.isBlank(model.endpoint) ? (void 0) : model.endpoint.trim();
		const options: DropdownOptions = endpoints.map(endpoint => {
			return {value: endpoint.code, label: endpoint.name};
		});
		const onValueChange = (value: PropValue) => {
			model.endpoint = value as string;
			onValueChanged();
		};
		if (endpoint != null && options.every(({value}) => value !== endpoint)) {
			// add an illegal option to present the original value
			// once legal option is selected, this option will be removed
			options.unshift({value: endpoint, label: <NotAvailableDropdownOption label={endpoint}/>});
		}

		return <UnwrappedDropdown value={endpoint} onValueChange={onValueChange} options={options}
		                          optionSort={OptionItemSort.ASC}
		                          clearable={false} style={CommonElementEditorStyles.dropdown}/>;
	},
	helpDoc: HelpDocs.stepHttpEndpoint
};