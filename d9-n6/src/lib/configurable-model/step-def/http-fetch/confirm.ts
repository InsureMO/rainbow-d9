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
		def.decorateUrl = VUtils.asUndefinedWhenBlank(model.decorateUrl);
		def.method = model.method;
		def.timeout = VUtils.asUndefinedWhenBlank(model.timeout);
		def.generateHeaders = VUtils.asUndefinedWhenBlank(model.generateHeaders);
		def.bodyUsed = model.bodyUsed;
		def.generateBody = VUtils.asUndefinedWhenBlank(model.generateBody);
		def.readResponse = VUtils.asUndefinedWhenBlank(model.readResponse);
		def.responseErrorHandles = (model.responseErrorHandles ?? []).reduce((handles, {code, snippet}) => {
			if (VUtils.isNotBlank(code)) {
				handles[code] = snippet;
			}
			return handles;
		}, {});

		options.handlers.onChange();
		return true;
	};
};
export const confirmHttpFetch: StepNodeConfigurer<HttpFetchPipelineStepDef, HttpFetchStepDefModel>['confirm'] = createConfirm();
export const confirmHttpGet: StepNodeConfigurer<HttpGetPipelineStepDef, HttpGetStepDefModel>['confirm'] = createConfirm();
export const confirmHttpPost: StepNodeConfigurer<HttpPostPipelineStepDef, HttpPostStepDefModel>['confirm'] = createConfirm();

