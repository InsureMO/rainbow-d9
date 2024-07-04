import {PipelineStepDef, SnippetPipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {SetsStepDefModel} from './types';

export const switchUse: StepNodeConfigurer<SnippetPipelineStepDef, SetsStepDefModel>['switchUse'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(model: SetsStepDefModel, _originalUse: PipelineStepDef['use']): ConfigurableModel => model;
