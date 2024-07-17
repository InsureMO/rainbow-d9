import {AsyncSetsPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {AsyncSetsStepDefModel} from './types';

export const prepare: StepNodeConfigurer<AsyncSetsPipelineStepDef, AsyncSetsStepDefModel>['prepare'] = (def: AsyncSetsPipelineStepDef): AsyncSetsStepDefModel => {
	// noinspection UnnecessaryLocalVariableJS
	const model: AsyncSetsStepDefModel = CommonStepDefs.prepare(def) as AsyncSetsStepDefModel;
	return model;
};
