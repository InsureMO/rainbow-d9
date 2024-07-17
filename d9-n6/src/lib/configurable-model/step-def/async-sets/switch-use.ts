import {AsyncSetsPipelineStepDef, PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {AsyncSetsStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<AsyncSetsPipelineStepDef, AsyncSetsStepDefModel>['switchUse'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(model: AsyncSetsStepDefModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, ['steps'], originalUse);
		return model;
	};
