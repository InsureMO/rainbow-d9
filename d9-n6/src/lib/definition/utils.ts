import {FileDef, PipelineFileDef, PipelineStepSetsFileDef} from './file-def-types';

export const isPipelineDef = (def: FileDef): def is PipelineFileDef => def.type === 'pipeline';
export const isStepSetsDef = (def: FileDef): def is PipelineStepSetsFileDef => def.type === 'step-sets';
export const isStepDef = (def: FileDef): def is PipelineStepSetsFileDef => def.type === 'step';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFileDef = (def: any): def is FileDef => isPipelineDef(def) || isStepSetsDef(def) || isStepDef(def);
