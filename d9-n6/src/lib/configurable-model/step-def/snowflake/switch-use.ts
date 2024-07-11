import {PipelineStepDef, SnowflakePipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SnowflakeStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<SnowflakePipelineStepDef, SnowflakeStepDefModel>['switchUse'] =
	(model: SnowflakeStepDefModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, [], originalUse);
		return model;
	};
