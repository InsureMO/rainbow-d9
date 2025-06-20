import {VUtils} from '@rainbow-d9/n1';
import {
	HttpFetchPipelineStepDef,
	HttpGetPipelineStepDef,
	HttpPipelineStepDef,
	HttpPostPipelineStepDef,
	PipelineStepDef,
	StandardPipelineStepRegisterKey
} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createPrePortValueOrLabelWithKey, indent, indentN} from '../../common';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmReturned, CommonStepDefs} from '../common';
import {elementRemoteApi} from './element-remote-api';
import {elementRemoteRequest} from './element-remote-request';
import {elementRemoteResponse} from './element-remote-response';
import {HttpFetchStepDefModel, HttpGetStepDefModel, HttpPostStepDefModel, HttpStepDefModel} from './types';

export * from './types';

interface CreateHttpStepDefsOptions<F extends HttpPipelineStepDef> {
	use: F['use'];
	docs: string;
}

const createHttpStepDefs = <F extends HttpPipelineStepDef, M extends HttpStepDefModel>(options: CreateHttpStepDefsOptions<F>): StepNodeConfigurer<F, M> => {
	const {use, docs} = options;
	const defs = CommonStepDefs.createStepNodeConfigurer<F, M>({
		use,
		prepare: ['and', (def: F, model: M) => {
			model.system = def.system;
			model.endpoint = def.endpoint;
			model.decorateUrl = def.decorateUrl;
			model.temporary.decorateUrlAsIs = VUtils.isBlank(def.fromInput);
			model.method = def.method;
			model.timeout = def.timeout;
			model.transparentHeaderNames = def.transparentHeaderNames;
			model.omittedTransparentHeaderNames = def.omittedTransparentHeaderNames;
			model.generateHeaders = def.generateHeaders;
			model.temporary.generateHeadersAsIs = VUtils.isBlank(def.generateHeaders);
			model.bodyUsed = def.bodyUsed;
			model.generateBody = def.generateBody;
			model.temporary.generateBodyAsIs = VUtils.isBlank(def.generateBody);
			model.readResponse = def.readResponse;
			model.temporary.readResponseAsIs = VUtils.isBlank(def.readResponse);
			if (def.responseErrorHandles != null) {
				if (typeof def.responseErrorHandles === 'string') {
					model.responseErrorHandles = def.responseErrorHandles;
				} else {
					// async ($options, $helpers, $)
					const handlers = Object.keys(def.responseErrorHandles).map(code => {
						let snippet = def.responseErrorHandles[code] ?? '';
						if (VUtils.isBlank(snippet)) {
							return '';
						}

						snippet = snippet.split('\n').map((line: string) => `${indentN(2)}${line}`).join('\n');
						return `${indent}'${code}': async () => {\n${snippet}\n${indent}}`;
					});
					model.responseErrorHandles = `const handlers = {
${handlers}
};
const {$errorCode} = $options;
const handle = handlers[$errorCode];
if (handle == null) {
${indent}$.$errors.uncatchable({
${indentN(2)}code: 'O03-00010',
${indentN(2)}reason: \`Error[\${$options.$errorCode}] caught when fetch data from remote[\${$options.$url}].\`
${indent}});
} else {
${indent}return await handle();
}
`;
				}
			}
			model.temporary.responseErrorHandlesAsIs = VUtils.isBlank(model.responseErrorHandles);
		}],
		switchUse: ['replace', (model: M, originalUse: PipelineStepDef['use']): ConfigurableModel => {
			CommonStepDefs.switchUse(model, [
				'system', 'endpoint', 'decorateUrl', 'method', 'timeout',
				'transparentHeaderNames', 'omittedTransparentHeaderNames',
				'generateHeaders', 'bodyUsed', 'generateBody',
				'readResponse', 'responseErrorHandles'
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
		}],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		confirm: ['and', (model: M, def: F, _file, _options): AndConfirmReturned => {
			return () => {
				def.system = VUtils.asUndefinedWhenBlank(model.system);
				def.endpoint = VUtils.asUndefinedWhenBlank(model.endpoint);
				if (model.temporary?.decorateUrlAsIs) {
					delete def.decorateUrl;
				} else {
					def.decorateUrl = VUtils.asUndefinedWhenBlank(model.decorateUrl);
				}
				def.method = model.method;
				def.timeout = VUtils.asUndefinedWhenBlank(model.timeout);
				def.transparentHeaderNames = VUtils.asUndefinedWhenBlank(model.transparentHeaderNames);
				def.omittedTransparentHeaderNames = VUtils.asUndefinedWhenBlank(model.omittedTransparentHeaderNames);
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
			};
		}],
		survivalAfterConfirm: ['and', (_def: HttpPipelineStepDef, property: string) => {
			return [
				'system', 'endpoint', 'decorateUrl', 'method', 'timeout',
				'transparentHeaderNames', 'omittedTransparentHeaderNames',
				'generateHeaders', 'bodyUsed', 'generateBody',
				'readResponse', 'responseErrorHandles'
			].includes(property);
		}],
		properties: [
			elementRemoteApi,
			elementRemoteRequest,
			elementRemoteResponse
		],
		ports: [
			createPrePortValueOrLabelWithKey<HttpStepDefModel>({
				key: 'system', label: Labels.StepHttpSystem, getValue: model => model.system
			}),
			createPrePortValueOrLabelWithKey<HttpStepDefModel>({
				key: 'endpoint', label: Labels.StepHttpEndpoint, getValue: model => model.endpoint
			})
		],
		helpDocs: docs
	});
	registerStepDef(defs);
	return defs;
};
export const HttpFetchStepDefs =
	createHttpStepDefs<HttpFetchPipelineStepDef, HttpFetchStepDefModel>({
		use: StandardPipelineStepRegisterKey.HTTP_FETCH, docs: HelpDocs.httpFetchStep
	});
export const HttpGetStepDefs =
	createHttpStepDefs<HttpGetPipelineStepDef, HttpGetStepDefModel>({
		use: StandardPipelineStepRegisterKey.HTTP_GET, docs: HelpDocs.httpGetStep
	});
export const HttpPostStepDefs =
	createHttpStepDefs<HttpPostPipelineStepDef, HttpPostStepDefModel>({
		use: StandardPipelineStepRegisterKey.HTTP_POST, docs: HelpDocs.httpPostStep
	});
