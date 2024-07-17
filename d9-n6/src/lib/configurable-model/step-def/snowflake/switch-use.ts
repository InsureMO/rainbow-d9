import {PipelineStepDef, SnowflakePipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {SnowflakeStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<SnowflakePipelineStepDef, SnowflakeStepDefModel>['switchUse'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(model: SnowflakeStepDefModel, _originalUse: PipelineStepDef['use']): ConfigurableModel => model;
