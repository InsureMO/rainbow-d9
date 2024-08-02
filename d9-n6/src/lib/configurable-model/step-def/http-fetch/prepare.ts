import {VUtils} from '@rainbow-d9/n1';
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
		model.temporary.decorateUrlAsIs = VUtils.isBlank(def.fromInput);
		model.method = def.method;
		model.timeout = def.timeout;
		model.generateHeaders = def.generateHeaders;
		model.temporary.generateHeadersAsIs = VUtils.isBlank(def.generateHeaders);
		model.bodyUsed = def.bodyUsed;
		model.generateBody = def.generateBody;
		model.temporary.generateBodyAsIs = VUtils.isBlank(def.generateBody);
		model.readResponse = def.readResponse;
		model.temporary.readResponseAsIs = VUtils.isBlank(def.readResponse);
		model.responseErrorHandles = Object.keys(def.responseErrorHandles ?? {}).map(code => {
			return {code, snippet: def.responseErrorHandles?.[code]};
		});

		return model;
	};
};
export const prepareHttpFetch: StepNodeConfigurer<HttpFetchPipelineStepDef, HttpFetchStepDefModel>['prepare'] = createPrepare();
export const prepareHttpGet: StepNodeConfigurer<HttpGetPipelineStepDef, HttpGetStepDefModel>['prepare'] = createPrepare();
export const prepareHttpPost: StepNodeConfigurer<HttpPostPipelineStepDef, HttpPostStepDefModel>['prepare'] = createPrepare();
