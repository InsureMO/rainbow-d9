import {
	HttpFetchPipelineStepDef,
	HttpGetPipelineStepDef,
	HttpPipelineStepDef,
	HttpPostPipelineStepDef,
	PipelineStepDef
} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {HttpFetchStepDefModel, HttpGetStepDefModel, HttpPostStepDefModel, HttpStepDefModel} from './types';

const createSwitchUse = <D extends HttpPipelineStepDef, M extends HttpStepDefModel>(): StepNodeConfigurer<D, M>['switchUse'] => {
	return (model: M, originalUse: PipelineStepDef['use']): ConfigurableModel => {
		CommonStepDefs.switchUse(model, [
			'system',
			'endpoint',
			'decorateUrl',
			'method',
			'timeout',
			'generateHeaders',
			'bodyUsed',
			'generateBody',
			'readResponse',
			'responseErrorHandles'
		], originalUse);
		return model;
	};
};
export const switchUseHttpFetch: StepNodeConfigurer<HttpFetchPipelineStepDef, HttpFetchStepDefModel>['switchUse'] = createSwitchUse();
export const switchUseHttpGet: StepNodeConfigurer<HttpGetPipelineStepDef, HttpGetStepDefModel>['switchUse'] = createSwitchUse();
export const switchUseHttpPost: StepNodeConfigurer<HttpPostPipelineStepDef, HttpPostStepDefModel>['switchUse'] = createSwitchUse();
