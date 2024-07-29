import {FileDef, GetPropertyPipelineStepDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {GetPropertyStepDefModel} from './types';

export const confirm: StepNodeConfigurer<GetPropertyPipelineStepDef, GetPropertyStepDefModel>['confirm'] =
	(model: GetPropertyStepDefModel, def: GetPropertyPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, options);

		def.property = (model.property ?? '').trim();

		options.handlers.onChange();
		return true;
	};
