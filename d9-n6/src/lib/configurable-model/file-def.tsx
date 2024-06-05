import {VUtils} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {
	FileDef,
	isPipelineDef,
	PipelineFileDef,
	PipelineStepFileDef,
	PipelineStepSetsFileDef,
	PipelineStepUseDef
} from '../definition';
import {
	ConfigurableElement,
	ConfigurableElementBadgeBanned,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeMissed,
	ConfigurableModel
} from '../edit-dialog';

export interface FileDefModel extends ConfigurableModel, FileDef {
}

export interface PipelineFileDefModel extends FileDefModel, PipelineFileDef {
	type: PipelineFileDef['type'];
	api: boolean;
}

export interface StepOrSetsFileDefModel extends FileDefModel, PipelineStepUseDef {
	type: PipelineStepFileDef['type'] | PipelineStepSetsFileDef['type'];
}

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
		} else {
			pipelineModel.api = false;
		}
	} else {
		const step = def as unknown as PipelineStepUseDef;
		(model as StepOrSetsFileDefModel).use = step.use;
	}
	return model;
};

export const visibleOnPipeline = (model: FileDefModel) => model.type === 'pipeline';
export const visibleOnApi = (model: PipelineFileDefModel) => visibleOnPipeline(model) && model.api === true;
export const elementCode: ConfigurableElement = {
	code: 'code', label: 'Code', anchor: 'code',
	badge: (model: FileDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.code)) {
			return model.code.trim();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	}
};
export const elementEnabled: ConfigurableElement = {
	code: 'enabled', label: 'Enabled', anchor: 'enabled',
	badge: model => model.enabled !== false
		? <ConfigurableElementBadgeChecked/>
		: <ConfigurableElementBadgeBanned/>
};
export const elementRoute: ConfigurableElement = {
	code: 'route', label: 'Route', anchor: 'route',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.route)) {
			return model.route.trim();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	visible: visibleOnApi
};
export const elementMethod: ConfigurableElement = {
	code: 'method', label: 'Method', anchor: 'method',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.method)) {
			return model.method.trim().toUpperCase();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	}
};
export const elementHeaders: ConfigurableElement = {code: 'headers', label: 'Headers', anchor: 'headers'};
export const elementPathParams: ConfigurableElement = {
	code: 'pathParams', label: 'Path Parameters', anchor: 'path-params'
};
export const elementQueryParams: ConfigurableElement = {
	code: 'queryParams', label: 'Query Parameters', anchor: 'query-params'
};
export const elementBody: ConfigurableElement = {code: 'body', label: 'Body', anchor: 'body'};
export const elementFiles: ConfigurableElement = {code: 'files', label: 'Files', anchor: 'files'};
export const elementRequest: ConfigurableElement = {
	code: 'request', label: 'Request', anchor: 'request',
	children: [
		elementMethod, elementHeaders, elementPathParams, elementQueryParams,
		elementBody, elementFiles
	],
	visible: visibleOnApi
};
export const elementExposeHeaders: ConfigurableElement = {
	code: 'exposeHeaders', label: 'Expose Headers', anchor: 'expose-headers'
};
export const elementExposeFile: ConfigurableElement = {
	code: 'exposeFile', label: 'Expose File', anchor: 'expose-file'
};
export const elementResponse: ConfigurableElement = {
	code: 'response', label: 'Response', anchor: 'response',
	children: [elementExposeHeaders, elementExposeFile],
	visible: visibleOnApi
};
export const elementType: ConfigurableElement = {
	code: 'type', label: 'Type', anchor: 'type',
	badge: (model: FileDefModel): ReactNode => {
		switch (true) {
			case (model as PipelineFileDefModel).api === true:
				return 'REST API';
			case  model.type === 'pipeline':
				return 'Pipeline';
			case model.type === 'step-sets':
				return 'Step Sets';
			case model.type === 'step':
				return 'Step';
			default:
				return <ConfigurableElementBadgeMissed/>;
		}
	},
	children: [elementRoute, elementRequest, elementResponse]
};
export const elements = [elementCode, elementEnabled, elementType];
