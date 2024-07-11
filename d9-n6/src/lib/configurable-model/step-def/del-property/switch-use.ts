import {DelPropertyPipelineStepDef, PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {DelPropertyStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<DelPropertyPipelineStepDef, DelPropertyStepDefModel>['switchUse'] =
	(model: DelPropertyStepDefModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, ['property'], originalUse);
		return model;
	};
