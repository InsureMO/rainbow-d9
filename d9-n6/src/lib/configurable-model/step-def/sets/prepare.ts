import {SetsPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SetsStepDefModel} from './types';

export const prepare: StepNodeConfigurer<SetsPipelineStepDef, SetsStepDefModel>['prepare'] = (def: SetsPipelineStepDef): SetsStepDefModel => {
	// noinspection UnnecessaryLocalVariableJS
	const model: SetsStepDefModel = CommonStepDefs.prepare(def) as SetsStepDefModel;
	return model;
};
