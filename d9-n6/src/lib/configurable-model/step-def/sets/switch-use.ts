import {PipelineStepDef, SetsPipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SetsStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<SetsPipelineStepDef, SetsStepDefModel>['switchUse'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(model: SetsStepDefModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, ['steps'], originalUse);
		return model;
	};
