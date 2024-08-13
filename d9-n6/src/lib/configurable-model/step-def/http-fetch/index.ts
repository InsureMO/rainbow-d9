import {VUtils} from '@rainbow-d9/n1';
import {
	HttpFetchPipelineStepDef,
	HttpGetPipelineStepDef,
	HttpPipelineStepDef,
	HttpPostPipelineStepDef,
	PipelineStepDef,
	StandardPipelineStepRegisterKey
} from '../../../definition';
import {ConfigurableElementAnchor, ConfigurableModel} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createPrePortValueOrLabelWithKey} from '../../common';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmCommit, CommonStepDefs} from '../common';
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

						snippet = snippet.split('\n').map((line: string) => `\t\t${line}`).join('\n');
						return `\t'${code}': async () => {\n${snippet}\n\t}`;
					});
					model.responseErrorHandles = `const handlers = {
${handlers}
};
const {$errorCode} = $options;
const handle = handlers[$errorCode];
if (handle == null) {
	$.$errors.uncatchable({
		code: 'O03-00010', 
		reason: \`Error[\${options.$errorCode}] caught when fetch data from remote[\${options.$url}].\`
	});
} else {
	return await handle();
}
`;
				}
			}
			model.temporary.responseErrorHandlesAsIs = VUtils.isBlank(model.responseErrorHandles);
		}],
		switchUse: ['replace', (model: M, originalUse: PipelineStepDef['use']): ConfigurableModel => {
			CommonStepDefs.switchUse(model, [
				'system', 'endpoint', 'decorateUrl', 'method', 'timeout',
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
		confirm: ['and', (model: M, def: F, _file, _options): ConfigurableElementAnchor | AndConfirmCommit => {
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
