import {VUtils} from '@rainbow-d9/n1';
import {ApiMultipleNamedFiles, ApiNonameOrNamedFiles, FileDef, isPipelineDef, PipelineFileDef} from '../../definition';
import {ConfigurableModel} from '../../edit-dialog';
import {FileNodeConfigurer} from '../types';
import {FileDefModel, PipelineFileDefModel} from './types';

export const prepare: FileNodeConfigurer['prepare'] = (def: FileDef): ConfigurableModel => {
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
			pipelineModel.authorizations = pipeline.authorizations;
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
				queryParams: pipeline.queryParams === true ? (void 0) : pipeline.queryParams?.filter(param => VUtils.isNotBlank(param)).join(', '),
				files: (() => {
					if (pipeline.files === true) {
						return {parse: true, list: false};
					} else if (pipeline.files === false || pipeline.files == null) {
						return {parse: false, list: false};
					} else if (typeof pipeline.files === 'string') {
						return {parse: true, list: true, files: `${pipeline.files.trim()}\n`};
					} else if (Array.isArray(pipeline.files)) {
						return {
							parse: true, list: true, files: pipeline.files.map(file => {
								if (typeof file === 'string') {
									return file.trim();
								} else if (file.maxCount == null) {
									return file.name.trim();
								} else {
									return `${file.name.trim()}: ${file.maxCount ?? 1}`;
								}
							}).join('\n') + '\n'
						};
					} else if ((pipeline.files as ApiMultipleNamedFiles).names == null) {
						const files = pipeline.files as ApiNonameOrNamedFiles;
						return {
							parse: true,
							list: true,
							files: (files.multiple === true ? `${files.name.trim()}: -1` : files.name.trim()) + '\n',
							maxSize: files.maxSize == null ? (void 0) : `${files.maxSize}`.trim(),
							mimeType: files.mimeType
						};
					} else {
						const files = pipeline.files as ApiMultipleNamedFiles;
						return {
							parse: true,
							list: true,
							files: (files.names ?? []).map(file => {
								if (typeof file === 'string') {
									return file.trim();
								} else if (file.maxCount == null) {
									return file.name.trim();
								} else {
									return `${file.name.trim()}: ${file.maxCount ?? 1}`;
								}
							}).join('\n') + '\n',
							maxSize: files.maxSize == null ? (void 0) : `${files.maxSize}`.trim(),
							mimeType: files.mimeType
						};
					}
				})(),
				exposeHeaders: pipeline.exposeHeaders == null ? (void 0) : Object.keys(pipeline.exposeHeaders)
					.map(key => key.trim())
					.filter(key => VUtils.isNotEmpty(key))
					.sort((a, b) => a.localeCompare(b, (void 0), {sensitivity: 'base'}))
					.map(key => `${key}: ${pipeline.exposeHeaders![key] ?? ''}`)
					.join('\n') + '\n'
			};
		} else {
			pipelineModel.api = false;
			pipelineModel.initOnly = pipeline.initOnly;
			if (pipelineModel.initOnly !== true) {
				pipelineModel.schedule = pipeline.schedule;
			}
		}
	}
	return model;
};
