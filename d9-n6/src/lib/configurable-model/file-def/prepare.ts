import {VUtils} from '@rainbow-d9/n1';
import {FileDef, isPipelineDef, PipelineFileDef, PipelineStepUseDef} from '../../definition';
import {ConfigurableModel} from '../../edit-dialog';
import {FileDefModel, PipelineFileDefModel, StepOrSetsFileDefModel} from './types';

export const prepareModel = (def: FileDef): ConfigurableModel => {
	const model: FileDefModel = {
		code: def.code,
		type: def.type,
		enabled: def.enabled
	};
	if (isPipelineDef(def)) {
		const pipeline = def as PipelineFileDef;
		const pipelineModel = model as PipelineFileDefModel;
		if (VUtils.isNotBlank(pipeline.route)) {
			// api
			pipelineModel.api = true;
			pipelineModel.route = pipeline.route;
			pipelineModel.method = pipeline.method;
			pipelineModel.headers = pipeline.headers;
			pipelineModel.pathParams = pipeline.pathParams;
			pipelineModel.queryParams = pipeline.queryParams;
			pipelineModel.body = pipeline.body;
			pipelineModel.files = pipeline.files;
			pipelineModel.exposeHeaders = pipeline.exposeHeaders;
			pipelineModel.exposeFile = pipeline.exposeFile;
			pipelineModel.temporary = {
				headers: pipeline.headers === true ? (void 0) : pipeline.headers?.filter(header => VUtils.isNotBlank(header)).join(', '),
				pathParams: pipeline.pathParams === true ? (void 0) : pipeline.pathParams?.filter(param => VUtils.isNotBlank(param)).join(', '),
				queryParams: pipeline.queryParams === true ? (void 0) : pipeline.queryParams?.filter(param => VUtils.isNotBlank(param)).join(', ')
			};
		} else {
			pipelineModel.api = false;
		}
	} else {
		const step = def as unknown as PipelineStepUseDef;
		(model as StepOrSetsFileDefModel).use = step.use;
	}
	return model;
};
