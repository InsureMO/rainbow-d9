import {ParallelPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {ParallelStepDefModel} from './types';

export const prepare: StepNodeConfigurer<ParallelPipelineStepDef, ParallelStepDefModel>['prepare'] = (def: ParallelPipelineStepDef): ParallelStepDefModel => {
	// noinspection UnnecessaryLocalVariableJS
	const model: ParallelStepDefModel = CommonStepDefs.prepare(def) as ParallelStepDefModel;
	model.cloneData = def.cloneData;
	model.race = def.race;
	return model;
};
