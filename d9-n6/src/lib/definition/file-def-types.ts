import {PipelineStepDef} from './pipeline-def-types';
import {RestApiPipelineFileDef} from './rest-api-types';

export type FileType = 'pipeline' | 'step-sets' | 'step';
export type FileDefCode = string;

export interface FileDef extends RestApiPipelineFileDef {
	code: FileDefCode;
	type: FileType;
	initOnly?: boolean;
	/** default is true */
	enabled?: boolean;
}

export interface PipelineStepFileDef extends PipelineStepDef, FileDef {
	type: 'step';
}

export interface PipelineStepSetsFileDef extends PipelineStepDef, FileDef {
	type: 'step-sets';
}

export interface PipelineFileDef extends FileDef {
	type: 'pipeline';
	steps: Array<PipelineStepDef>;
}
