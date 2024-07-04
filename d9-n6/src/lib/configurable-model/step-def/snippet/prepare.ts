import {SnippetPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SnippetStepDefModel} from './types';

export const prepare: StepNodeConfigurer<SnippetPipelineStepDef, SnippetStepDefModel>['prepare'] =
	(def: SnippetPipelineStepDef): SnippetStepDefModel => {
		const model: SnippetStepDefModel = CommonStepDefs.prepare(def) as SnippetStepDefModel;
		model.snippet = def.snippet;
		return model;
	};
