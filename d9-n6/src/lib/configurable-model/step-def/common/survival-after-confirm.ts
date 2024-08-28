import {VUtils} from '@rainbow-d9/n1';
import {AllInPipelineStepDef, isFileDef, PipelineStepDiagramDef} from '../../../definition';
import {CommonStepDefsType} from './types';

const survivalOfPipeline = {
	// from file def
	code: true,
	type: true,
	enabled: true,
	$diagram: true,
	// from file diagram def
	'$diagram.$startX': true,
	'$diagram.$startY': true,
	'$diagram.$endX': true,
	'$diagram.$endY': true
};
const survivalOfStep = {
	name: true,
	use: true,
	fromInput: <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => VUtils.isNotBlank(def.fromInput),
	toOutput: <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => VUtils.isNotBlank(def.toOutput),
	merge: <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => VUtils.isNotBlank(def.merge),
	errorHandles: true,
	'errorHandles.catchable': <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => VUtils.isNotBlank(def.errorHandles?.catchable),
	'errorHandles.uncatchable': <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => VUtils.isNotBlank(def.errorHandles?.uncatchable),
	'errorHandles.exposed': <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => VUtils.isNotBlank(def.errorHandles?.exposed),
	'errorHandles.any': <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => VUtils.isNotBlank(def.errorHandles?.any),
	$diagram: true,
	// from step diagram def
	'$diagram.$x': true,
	'$diagram.$y': true,
	'$diagram.$foldCatchable': <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => Array.isArray(def.errorHandles?.catchable) && def.$diagram?.$foldCatchable === true,
	'$diagram.$foldUncatchable': <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => Array.isArray(def.errorHandles?.uncatchable) && def.$diagram?.$foldUncatchable === true,
	'$diagram.$foldExposed': <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => Array.isArray(def.errorHandles?.exposed) && def.$diagram?.$foldExposed === true,
	'$diagram.$foldAny': <F extends AllInPipelineStepDef & PipelineStepDiagramDef>(def: F) => Array.isArray(def.errorHandles?.any) && def.$diagram?.$foldAny === true
};
export const survivalAfterConfirm: CommonStepDefsType['survivalAfterConfirm'] = <F extends AllInPipelineStepDef>(def: F, property: string): boolean => {
	if (isFileDef(def)) {
		return survivalOfPipeline[property] === true || survivalOfPipeline[property]?.(def) === true
			|| survivalOfStep[property] === true || survivalOfStep[property]?.(def) === true;
	} else {
		return survivalOfStep[property] === true || survivalOfStep[property]?.(def) === true;
	}
};
