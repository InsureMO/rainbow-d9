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
	ConfigurableElementBadgeAll,
	ConfigurableElementBadgeBanned,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeCount,
	ConfigurableElementBadgeIgnored,
	ConfigurableElementBadgeMissed,
	ConfigurableElementBadgeNotAvailable,
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

export const allOrArray = (value?: null | true | Array<string>) => {
	if (value === true) {
		return <ConfigurableElementBadgeAll/>;
	} else if (Array.isArray(value)) {
		const length = value.filter(header => VUtils.isNotBlank(header)).length;
		return <ConfigurableElementBadgeCount count={length}/>;
	} else {
		return <ConfigurableElementBadgeIgnored/>;
	}
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
export const elementHeaders: ConfigurableElement = {
	code: 'headers', label: 'Headers', anchor: 'headers',
	badge: (model: PipelineFileDefModel): ReactNode => {
		return allOrArray(model.headers);
	}
};
export const elementPathParams: ConfigurableElement = {
	code: 'pathParams', label: 'Path Parameters', anchor: 'path-params',
	badge: (model: PipelineFileDefModel): ReactNode => {
		return allOrArray(model.pathParams);
	}
};
export const elementQueryParams: ConfigurableElement = {
	code: 'queryParams', label: 'Query Parameters', anchor: 'query-params',
	badge: (model: PipelineFileDefModel): ReactNode => {
		return allOrArray(model.queryParams);
	}
};
export const elementBody: ConfigurableElement = {
	code: 'body', label: 'Body', anchor: 'body',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (model.body === true) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeIgnored/>;
		}
	}
};
export const elementFiles: ConfigurableElement = {
	code: 'files', label: 'Files', anchor: 'files',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (model.files != null && model.files !== false) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeIgnored/>;
		}
	}
};
export const elementRequest: ConfigurableElement = {
	code: 'request', label: 'Request', anchor: 'request',
	children: [
		elementMethod, elementHeaders, elementPathParams, elementQueryParams,
		elementBody, elementFiles
	],
	visible: visibleOnApi
};
export const elementExposeHeaders: ConfigurableElement = {
	code: 'exposeHeaders', label: 'Expose Headers', anchor: 'expose-headers',
	badge: (model: PipelineFileDefModel): ReactNode => {
		const count = Object.keys(model.exposeHeaders ?? {}).length;
		if (count !== 0) {
			return <ConfigurableElementBadgeCount count={count}/>;
		} else {
			return <ConfigurableElementBadgeNotAvailable/>;
		}
	}
};
export const elementExposeFile: ConfigurableElement = {
	code: 'exposeFile', label: 'Expose File', anchor: 'expose-file',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (model.exposeFile === true) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeNotAvailable/>;
		}
	}
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
