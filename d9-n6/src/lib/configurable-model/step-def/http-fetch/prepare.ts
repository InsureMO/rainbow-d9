import {
	HttpFetchPipelineStepDef,
	HttpGetPipelineStepDef,
	HttpPipelineStepDef,
	HttpPostPipelineStepDef
} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {HttpFetchStepDefModel, HttpGetStepDefModel, HttpPostStepDefModel, HttpStepDefModel} from './types';

const createPrepare = <D extends HttpPipelineStepDef, M extends HttpStepDefModel>(): StepNodeConfigurer<D, M>['prepare'] => {
	return (def: D): M => {
		const model: M = CommonStepDefs.prepare(def) as M;

		model.system = def.system;
		model.endpoint = def.endpoint;
		model.decorateUrl = def.decorateUrl;
		model.method = def.method;
		model.timeout = def.timeout;
		model.generateHeaders = def.generateHeaders;
		model.bodyUsed = def.bodyUsed;
		model.generateBody = def.generateBody;
		model.readResponse = def.readResponse;
		model.responseErrorHandles = Object.keys(def.responseErrorHandles ?? {}).map(code => {
			return {code, snippet: def.responseErrorHandles?.[code]};
		});

		return model;
	};
};
export const prepareHttpFetch: StepNodeConfigurer<HttpFetchPipelineStepDef, HttpFetchStepDefModel>['prepare'] = createPrepare();
export const prepareHttpGet: StepNodeConfigurer<HttpGetPipelineStepDef, HttpGetStepDefModel>['prepare'] = createPrepare();
export const prepareHttpPost: StepNodeConfigurer<HttpPostPipelineStepDef, HttpPostStepDefModel>['prepare'] = createPrepare();
