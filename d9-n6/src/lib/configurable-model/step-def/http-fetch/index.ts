import {
	HttpFetchPipelineStepDef,
	HttpGetPipelineStepDef,
	HttpPipelineStepDef,
	HttpPostPipelineStepDef,
	StandardPipelineStepRegisterKey
} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs} from '../common';
import {confirmHttpFetch, confirmHttpGet, confirmHttpPost} from './confirm';
import {PortEndpoint} from './port-endpoint';
import {PortSystem} from './port-system';
import {prepareHttpFetch, prepareHttpGet, prepareHttpPost} from './prepare';
import {switchUseHttpFetch, switchUseHttpGet, switchUseHttpPost} from './switch-use';
import {HttpFetchStepDefModel, HttpGetStepDefModel, HttpPostStepDefModel, HttpStepDefModel} from './types';

export * from './types';

interface CreateHttpStepDefsOptions<D extends HttpPipelineStepDef, M extends HttpStepDefModel> {
	use: string;
	prepare: StepNodeConfigurer<D, M>['prepare'];
	switchUse: StepNodeConfigurer<D, M>['switchUse'];
	confirm: StepNodeConfigurer<D, M>['confirm'];
	docs: string;
}

const createHttpStepDefs = <D extends HttpPipelineStepDef, M extends HttpStepDefModel>(options: CreateHttpStepDefsOptions<D, M>): StepNodeConfigurer<D, M> => {
	const {docs, ...rest} = options;
	const defs = {
		...rest,
		discard: CommonStepDefs.discard,
		properties: [
			...CommonStepDefs.properties.leadingGroup,
			...CommonStepDefs.properties.tailingGroup
		],
		ports: [
			...CommonStepDefs.prebuiltPorts.input,
			{key: 'system', port: PortSystem},
			{key: 'endpoint', port: PortEndpoint},
			...CommonStepDefs.prebuiltPorts.errorHandles,
			...CommonStepDefs.prebuiltPorts.output
		],
		createSubNodes: CommonStepDefs.createSubNodesAndEndNode,
		findSubPorts: CommonStepDefs.findSubPorts,
		helpDocs: docs
	};
	registerStepDef(defs);
	return defs;
};
export const HttpFetchStepDefs: StepNodeConfigurer<HttpFetchPipelineStepDef, HttpFetchStepDefModel> = createHttpStepDefs({
	use: StandardPipelineStepRegisterKey.HTTP_FETCH,
	prepare: prepareHttpFetch, switchUse: switchUseHttpFetch, confirm: confirmHttpFetch,
	docs: HelpDocs.httpFetchStep
});
export const HttpGetStepDefs: StepNodeConfigurer<HttpGetPipelineStepDef, HttpGetStepDefModel> = createHttpStepDefs({
	use: StandardPipelineStepRegisterKey.HTTP_GET,
	prepare: prepareHttpGet, switchUse: switchUseHttpGet, confirm: confirmHttpGet,
	docs: HelpDocs.httpGetStep
});
export const HttpPostStepDefs: StepNodeConfigurer<HttpPostPipelineStepDef, HttpPostStepDefModel> = createHttpStepDefs({
	use: StandardPipelineStepRegisterKey.HTTP_POST,
	prepare: prepareHttpPost, switchUse: switchUseHttpPost, confirm: confirmHttpPost,
	docs: HelpDocs.httpPostStep
});
