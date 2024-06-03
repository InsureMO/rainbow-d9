import {PipelineStepDef, PipelineStepRegisterKey} from './pipeline-def-types';
import {RestApiPipelineFileDef} from './rest-api-types';

export type FileType = 'pipeline' | 'step-sets' | 'step';
export type FileDefCode = string;

export interface FileDef {
	code: FileDefCode;
	type: FileType;
	/** default is true */
	enabled?: boolean;
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

export interface PipelineFileDef extends FileDef, RestApiPipelineFileDef {
	type: 'pipeline';
	initOnly?: boolean;
	steps: Array<PipelineStepDef>;
}
