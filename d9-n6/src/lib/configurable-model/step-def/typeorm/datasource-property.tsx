import {PropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, OptionItemSort, UnwrappedDropdown} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElementEditorProps} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createCheckOrMissBadge} from '../../common';
import {NotAvailableDropdownOption} from '../../not-available-dropdown-option';
import {TypeOrmStepDefModel} from './types';

export const typeOrmDatasourceProperty = {
	code: 'code', label: Labels.StepTypeOrmDatasource, anchor: 'code',
	badge: createCheckOrMissBadge({check: (model: TypeOrmStepDefModel) => VUtils.isNotBlank(model.datasource)}),
	editor: (props: ConfigurableElementEditorProps<TypeOrmStepDefModel>) => {
		const {model, onValueChanged, assistant} = props;
		const onValueChange = (value: PropValue) => {
			model.datasource = value as string;
			onValueChanged();
		};
		const options: DropdownOptions = (assistant.askTypeOrmDatasources() ?? []).map(datasource => {
			return {value: datasource.code, label: VUtils.blankThen(datasource.name, datasource.code)};
		});
		const code = VUtils.isBlank(model.datasource) ? (void 0) : model.datasource.trim();
		if (code != null && options.every(({value}) => value !== code)) {
			// add an illegal option to present the original value
			// once legal option is selected, this option will be removed
			options.unshift({value: code, label: <NotAvailableDropdownOption label={code}/>});
		}

		return <UnwrappedDropdown onValueChange={onValueChange} value={model.datasource ?? ''}
		                          optionSort={OptionItemSort.ASC}
		                          clearable={false} options={options}/>;
	},
	helpDoc: HelpDocs.stepTypeOrmDatasource
};
