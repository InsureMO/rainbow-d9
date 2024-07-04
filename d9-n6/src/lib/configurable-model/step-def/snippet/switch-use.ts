import {PipelineStepDef, SnippetPipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SnippetStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<SnippetPipelineStepDef, SnippetStepDefModel>['switchUse'] =
	(model: SnippetStepDefModel, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, ['snippet'], originalUse);
		return model;
	};
