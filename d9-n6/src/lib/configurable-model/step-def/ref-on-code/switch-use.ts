import {PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {RefOnCodeStepDefModel} from './types';

export const switchUse: StepNodeConfigurer['switchUse'] =
	<M extends RefOnCodeStepDefModel>(model: M, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, ['code'], originalUse);
		return model;
	};
