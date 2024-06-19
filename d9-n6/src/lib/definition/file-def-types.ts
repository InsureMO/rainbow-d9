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

export interface FileDiagramDef extends FileDef {
	$diagram?: {
		// for start node
		$start?: { $x?: number; $y?: number; },
		// for end node
		$end?: { $x?: number; $y?: number; },
		// for virtual step node if file is step-sets or step
		$virtualStep?: { $x?: number; $y?: number; }
	};
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
