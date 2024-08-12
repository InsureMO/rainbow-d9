import {PropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, OptionItemSort, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeMissed,
	ConfigurableElementEditorProps,
	EditDialogEventTypes,
	useEditDialogEventBus
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {NotAvailableDropdownOption} from '../../not-available-dropdown-option';
import {CommonElementEditorStyles} from '../../styles';
import {HttpStepDefModel} from './types';

const SystemEditor = (props: ConfigurableElementEditorProps<HttpStepDefModel>) => {
	const {model, onValueChanged, assistant} = props;

	const {fire} = useEditDialogEventBus();

	const systems = assistant.askSystemsForHttp();
	const options: DropdownOptions = systems.map(system => {
		return {value: system.code, label: VUtils.blankThen(system.name, system.code)};
	});
	const onValueChange = (value: PropValue) => {
		model.system = value as string;
		const endpoint = VUtils.isBlank(model.endpoint) ? (void 0) : model.endpoint.trim();
		const selectedSystem = systems.find(({code}) => code === value);
		const availableEndpoints = selectedSystem!.endpoints || [];
		if (availableEndpoints.every(({code}) => code !== endpoint)) {
			// clear endpoint if it's not available
			delete model.endpoint;
		}
		onValueChanged();
		fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, 'endpoint');
	};
	const system = VUtils.isBlank(model.system) ? (void 0) : model.system.trim();
	if (system != null && options.every(({value}) => value !== system)) {
		// add an illegal option to present the original value
		// once legal option is selected, this option will be removed
		options.unshift({value: system, label: <NotAvailableDropdownOption label={system}/>});
	}

	return <UnwrappedDropdown value={system} onValueChange={onValueChange} options={options}
	                          optionSort={OptionItemSort.ASC}
	                          clearable={false} style={CommonElementEditorStyles.dropdown}/>;
};
export const elementSystem: ConfigurableElement = {
	code: 'system', label: Labels.StepHttpSystem, anchor: 'system',
	badge: (model: HttpStepDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.system)) {
			return model.system.trim();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	editor: SystemEditor,
	helpDoc: HelpDocs.stepHttpSystem
};