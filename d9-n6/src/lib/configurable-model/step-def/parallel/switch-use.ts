import {ParallelPipelineStepDef, PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {ParallelStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<ParallelPipelineStepDef, ParallelStepDefModel>['switchUse'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(model: ParallelStepDefModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, ['cloneData', 'race', 'steps'], originalUse);
		return model;
	};
