import {VUtils} from '@rainbow-d9/n1';
import {DelPropertyPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createCheckOrMissBadge, createPrePortExistsWithKey, createStrEditor} from '../../common';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmCommit, CommonStepDefModel, CommonStepDefs} from '../common';

export interface DelPropertyStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.DEL_PROPERTY | StandardPipelineStepRegisterKey.DELETE_PROPERTIES;
	property?: string;
}

export const DelPropertyStepDefs =
	CommonStepDefs.createStepNodeConfigurer<DelPropertyPipelineStepDef, DelPropertyStepDefModel>({
		use: StandardPipelineStepRegisterKey.DEL_PROPERTY,
		prepare: ['and', (def, model) => model.property = def.property],
		switchUse: ['keep', ['property']],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		confirm: ['and', (model, def, _file, _options): ConfigurableElementAnchor | AndConfirmCommit => {
			// TODO VALIDATE PROPERTY
			return () => def.property = (model.property ?? '').trim();
		}],
		properties: [
			CommonStepDefs.createMainContentElement({
				code: 'property', label: Labels.StepDelPropertyProperty, anchor: 'property',
				badge: createCheckOrMissBadge<DelPropertyStepDefModel>({check: model => VUtils.isNotBlank(model.property)}),
				editor: createStrEditor<DelPropertyStepDefModel>({
					getValue: model => model.property,
					setValue: (model, value) => model.property = value
				}),
				helpDoc: HelpDocs.stepDelPropertyProperty
			})
		],
		ports: [
			createPrePortExistsWithKey<DelPropertyStepDefModel>({
				key: 'property', label: Labels.StepDelPropertyProperty,
				getValue: model => model.property
			})
		],
		helpDocs: HelpDocs.delPropertyStep
	});
registerStepDef(DelPropertyStepDefs);
export const DelPropertiesStepDefs: StepNodeConfigurer<DelPropertyPipelineStepDef, DelPropertyStepDefModel> = {
	...DelPropertyStepDefs, use: StandardPipelineStepRegisterKey.DELETE_PROPERTIES
};
registerStepDef(DelPropertiesStepDefs);
