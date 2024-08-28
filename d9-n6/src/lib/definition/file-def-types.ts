import {ApiPipelineFileDef} from './api-types';
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

export interface PipelineFileDef extends FileDef, ApiPipelineFileDef {
	type: 'pipeline';
	initOnly?: boolean;
	steps: Array<PipelineStepDef>;
}
