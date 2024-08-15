import {VUtils} from '@rainbow-d9/n1';
import {ConfigurableElement} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundModuleAssistant} from '../../../types';
import {createCheckOrMissBadge, createDropdownOnAssistantEditor} from '../../common';
import {TypeOrmStepDefModel} from './types';

const askDatasourceOptions = (assistant: Required<PlaygroundModuleAssistant>) => (assistant.askTypeOrmDatasources() ?? []).map(datasource => {
	return {value: datasource.code, label: VUtils.blankThen(datasource.name, datasource.code)};
});
export const elementDatasource: ConfigurableElement = {
	code: 'datasource', label: Labels.StepTypeOrmDatasource, anchor: 'datasource',
	badge: createCheckOrMissBadge({check: (model: TypeOrmStepDefModel) => VUtils.isNotBlank(model.datasource)}),
	// TODO SUPPORTS USE ENV
	editor: createDropdownOnAssistantEditor<TypeOrmStepDefModel, string>({
		getValue: model => model.datasource,
		setValue: (model, value) => model.datasource = value,
		askOptions: askDatasourceOptions
	}),
	helpDoc: HelpDocs.stepTypeOrmDatasource
};
