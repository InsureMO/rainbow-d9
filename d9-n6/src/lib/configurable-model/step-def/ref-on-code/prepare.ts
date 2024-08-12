import {RefOnCodePipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {RefOnCodeStepDefModel} from './types';

export const prepare: StepNodeConfigurer['prepare'] =
	<F extends RefOnCodePipelineStepDef, M extends RefOnCodeStepDefModel>(def: F): M => {
		const model: M = CommonStepDefs.prepare(def) as M;
		model.code = def.code;
		return model;
	};
