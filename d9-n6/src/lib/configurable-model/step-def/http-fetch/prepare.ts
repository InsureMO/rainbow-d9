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
					return `\t${code}: async () => {\n${snippet}\n\t}`;
				});
				model.responseErrorHandles = `const handlers = {
${handlers}
};
const {$errorCode} = $options;
const handle = handlers[$errorCode];
if (handle == null) {
\tthrow $.$errors.uncatchable({code: 'O03-00010', reason: \`Error[\${options.$errorCode}] caught when fetch data from remote[\${options.$url}].\`});
} else {
\treturn await handle();
}`;
			}
		}
		model.temporary.responseErrorHandlesAsIs = VUtils.isBlank(model.responseErrorHandles);

		return model;
	};
};
export const prepareHttpFetch: StepNodeConfigurer<HttpFetchPipelineStepDef, HttpFetchStepDefModel>['prepare'] = createPrepare();
export const prepareHttpGet: StepNodeConfigurer<HttpGetPipelineStepDef, HttpGetStepDefModel>['prepare'] = createPrepare();
export const prepareHttpPost: StepNodeConfigurer<HttpPostPipelineStepDef, HttpPostStepDefModel>['prepare'] = createPrepare();
