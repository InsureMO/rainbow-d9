import {EachPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {EachStepDefModel} from './types';

export const prepare: StepNodeConfigurer<EachPipelineStepDef, EachStepDefModel>['prepare'] = (def: EachPipelineStepDef): EachStepDefModel => {
	// noinspection UnnecessaryLocalVariableJS
	const model: EachStepDefModel = CommonStepDefs.prepare(def) as EachStepDefModel;
	model.originalContentName = def.originalContentName;
	model.itemName = def.itemName;
	return model;
};
