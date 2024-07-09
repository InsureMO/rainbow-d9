import {GetPropertyPipelineStepDef, PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {GetPropertyStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<GetPropertyPipelineStepDef, GetPropertyStepDefModel>['switchUse'] =
	(model: GetPropertyStepDefModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, ['property'], originalUse);
		return model;
	};
