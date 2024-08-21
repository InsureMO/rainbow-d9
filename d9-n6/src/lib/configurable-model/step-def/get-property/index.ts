import {VUtils} from '@rainbow-d9/n1';
import {GetPropertyPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createCheckOrMissBadge, createPrePortExistsWithKey, createStrEditor} from '../../common';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmReturned, CommonStepDefModel, CommonStepDefs} from '../common';

export interface GetPropertyStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.GET_PROPERTY;
	property?: string;
}

export const GetPropertyStepDefs =
	CommonStepDefs.createStepNodeConfigurer<GetPropertyPipelineStepDef, GetPropertyStepDefModel>({
		use: StandardPipelineStepRegisterKey.GET_PROPERTY,
		prepare: ['and', (def, model) => model.property = def.property],
		switchUse: ['keep', ['property']],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		confirm: ['and', (model, def, _file, _options): AndConfirmReturned => {
			// TODO VALIDATE PROPERTY OF GET PROPERTY STEP
			return () => def.property = (model.property ?? '').trim();
		}],
		properties: [
			CommonStepDefs.createMainContentElement({
				code: 'property', label: Labels.StepGetPropertyProperty, anchor: 'property',
				badge: createCheckOrMissBadge<GetPropertyStepDefModel>({check: model => VUtils.isNotBlank(model.property)}),
				editor: createStrEditor<GetPropertyStepDefModel>({
					getValue: model => model.property,
					setValue: (model, value) => model.property = value
				}),
				helpDoc: HelpDocs.stepGetPropertyProperty
			})
		],
		ports: [
			createPrePortExistsWithKey<GetPropertyStepDefModel>({
				key: 'property', label: Labels.StepGetPropertyProperty,
				getValue: model => model.property
			})
		],
		helpDocs: HelpDocs.delPropertyStep
	});
registerStepDef(GetPropertyStepDefs);
