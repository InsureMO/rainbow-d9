import {SetsPipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SetsStepDefModel} from './types';

export const prepare: StepNodeConfigurer<SetsStepDefModel>['prepare'] = (def: SetsPipelineStepDef): ConfigurableModel => {
	// noinspection UnnecessaryLocalVariableJS
	const model: SetsStepDefModel = CommonStepDefs.prepare(def) as SetsStepDefModel;
	return model;
};
