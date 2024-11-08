import {PipelineStepDef, PipelineStepRegisterKey} from './pipeline-def-types';

export type FileType = 'pipeline' | 'step-sets' | 'step';
export type FileDefCode = string;

export interface FileDef {
	code: FileDefCode;
	type: FileType;
	/** default is true */
	enabled?: boolean;
}

export interface FileDiagramDetails {
	$startX?: number;
	$startY?: number;
	$endX?: number;
	$endY?: number;
}

export interface FileDiagramDef extends FileDef {
	$diagram?: FileDiagramDetails;
}

export interface PipelineStepUseDef {
	use: PipelineStepRegisterKey;
}

export interface PipelineStepFileDef extends FileDef, PipelineStepUseDef {
	type: 'step';
}

export interface PipelineStepSetsFileDef extends FileDef, PipelineStepUseDef {
	type: 'step-sets';
}

export interface PipelineFileDef extends FileDef, ApiPipelineFileDef, SchedulePipelineFileDef {
	type: 'pipeline';
	initOnly?: boolean;
	steps: Array<PipelineStepDef>;
}

export interface ApiFileValidator {
	maxSize?: string | number;
	mimeType?: string;
}

export interface ApiNonameOrNamedFiles extends ApiFileValidator {
	/** no name means any file */
	name?: string;
	/** multiple is ignored when no name declared */
	multiple?: boolean;
}

export type ApiNamedFile = string | { name: string; maxCount?: number; };

export interface ApiMultipleNamedFiles extends ApiFileValidator {
	names: Array<ApiNamedFile>;
}

export interface ApiPipelineFileDef {
	authorizations?: string | Array<string>;
	route: string;
	method: 'get' | 'post' | 'patch' | 'delete' | 'put';
	headers?: Array<string> | true;
	pathParams?: Array<string> | true;
	queryParams?: Array<string> | true;
	body?: boolean;
	files?: boolean     // any files
		// single or multiple files with single name
		| string
		// with single name, explicitly declared it is single or multiple. default multiple is false
		| ApiNonameOrNamedFiles
		// multiple files with multiple names
		| Array<ApiNamedFile>
		| ApiMultipleNamedFiles;
	exposeHeaders?: Record<string, string>;
	exposeFile?: boolean;
}

export interface SchedulePipelineFileDef {
	schedule?: string;
}

export const KeysOfApiPipeline = ['authorizations', 'route', 'method', 'headers', 'pathParams', 'queryParams', 'body', 'files', 'exposeHeaders', 'exposeFile'];
export const KeysOfSchedulePipeline = ['schedule'];
export const KeysOfNonApiPipeline = ['initOnly', 'schedule'];
export const KeysOfPipeline = ['code', 'type', 'enabled', ...KeysOfApiPipeline, ...KeysOfNonApiPipeline, 'steps', '$diagram'];
