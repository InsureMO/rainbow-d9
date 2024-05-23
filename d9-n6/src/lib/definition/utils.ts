import {FileDef, PipelineFileDef, PipelineStepSetsFileDef} from './file-def-types';

export const isPipelineDef = (def: FileDef): def is PipelineFileDef => def.type === 'pipeline';
export const isStepSetsDef = (def: FileDef): def is PipelineStepSetsFileDef => def.type === 'step-sets';
export const isStepDef = (def: FileDef): def is PipelineStepSetsFileDef => def.type === 'step';
