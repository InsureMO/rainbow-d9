import {SnippetPipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SnippetStepDefModel} from './types';

export const prepare: StepNodeConfigurer<SnippetStepDefModel>['prepare'] = (def: SnippetPipelineStepDef): ConfigurableModel => {
	const model: SnippetStepDefModel = CommonStepDefs.prepare(def) as SnippetStepDefModel;
	model.snippet = def.snippet;
	return model;
};
