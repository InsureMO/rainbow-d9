import {DelPropertyPipelineStepDef, FileDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {DelPropertyStepDefModel} from './types';

export const confirm: StepNodeConfigurer<DelPropertyPipelineStepDef, DelPropertyStepDefModel>['confirm'] =
	(model: DelPropertyStepDefModel, def: DelPropertyPipelineStepDef, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, options);

		def.property = (model.property ?? '').trim();

		options.handlers.onChange();
		return true;
	};
