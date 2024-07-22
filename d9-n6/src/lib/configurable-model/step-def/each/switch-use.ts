import {EachPipelineStepDef, PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {EachStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<EachPipelineStepDef, EachStepDefModel>['switchUse'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(model: EachStepDefModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, ['originalContentName', 'itemName', 'steps'], originalUse);
		return model;
	};
