import {VUtils} from '@rainbow-d9/n1';
import {
	FileDef,
	HttpFetchPipelineStepDef,
	HttpGetPipelineStepDef,
	HttpPipelineStepDef,
	HttpPostPipelineStepDef
} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {HttpFetchStepDefModel, HttpGetStepDefModel, HttpPostStepDefModel, HttpStepDefModel} from './types';

const createConfirm = <D extends HttpPipelineStepDef, M extends HttpStepDefModel>(): StepNodeConfigurer<D, M>['confirm'] => {
	return (model: M, def: D, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		CommonStepDefs.confirm(model, def, file, options);

		def.system = VUtils.asUndefinedWhenBlank(model.system);
		def.endpoint = VUtils.asUndefinedWhenBlank(model.endpoint);
		if (model.temporary?.decorateUrlAsIs) {
			delete def.decorateUrl;
		} else {
			def.decorateUrl = VUtils.asUndefinedWhenBlank(model.decorateUrl);
		}
		def.method = model.method;
		def.timeout = VUtils.asUndefinedWhenBlank(model.timeout);
		if (model.temporary?.generateHeadersAsIs) {
			delete def.generateHeaders;
		} else {
			def.generateHeaders = VUtils.asUndefinedWhenBlank(model.generateHeaders);
		}
		def.bodyUsed = model.bodyUsed;
		if (model.temporary?.generateBodyAsIs) {
			delete def.generateBody;
		} else {
			def.generateBody = VUtils.asUndefinedWhenBlank(model.generateBody);
		}
		if (model.temporary?.readResponseAsIs) {
			delete def.readResponse;
		} else {
			def.readResponse = VUtils.asUndefinedWhenBlank(model.readResponse);
		}
		def.responseErrorHandles = model.responseErrorHandles;
		if (Object.keys(def.responseErrorHandles).length === 0) {
			delete def.responseErrorHandles;
		}

		options.handlers.onChange();
		return true;
	};
};
export const confirmHttpFetch: StepNodeConfigurer<HttpFetchPipelineStepDef, HttpFetchStepDefModel>['confirm'] = createConfirm();
export const confirmHttpGet: StepNodeConfigurer<HttpGetPipelineStepDef, HttpGetStepDefModel>['confirm'] = createConfirm();
export const confirmHttpPost: StepNodeConfigurer<HttpPostPipelineStepDef, HttpPostStepDefModel>['confirm'] = createConfirm();

