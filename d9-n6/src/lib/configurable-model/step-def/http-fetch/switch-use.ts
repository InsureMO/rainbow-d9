import {
	HttpFetchPipelineStepDef,
	HttpGetPipelineStepDef,
	HttpPipelineStepDef,
	HttpPostPipelineStepDef,
	PipelineStepDef,
	StandardPipelineStepRegisterKey
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

		switch (model.use) {
			case StandardPipelineStepRegisterKey.HTTP_GET:
				model.method = 'get';
				break;
			case StandardPipelineStepRegisterKey.HTTP_POST:
				model.method = 'post';
				break;
		}
		return model;
	};
};
export const switchUseHttpFetch: StepNodeConfigurer<HttpFetchPipelineStepDef, HttpFetchStepDefModel>['switchUse'] = createSwitchUse();
export const switchUseHttpGet: StepNodeConfigurer<HttpGetPipelineStepDef, HttpGetStepDefModel>['switchUse'] = createSwitchUse();
export const switchUseHttpPost: StepNodeConfigurer<HttpPostPipelineStepDef, HttpPostStepDefModel>['switchUse'] = createSwitchUse();
