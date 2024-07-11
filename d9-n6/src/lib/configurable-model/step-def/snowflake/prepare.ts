import {SnowflakePipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SnowflakeStepDefModel} from './types';

export const prepare: StepNodeConfigurer<SnowflakePipelineStepDef, SnowflakeStepDefModel>['prepare'] =
	(def: SnowflakePipelineStepDef): SnowflakeStepDefModel => {
		return CommonStepDefs.prepare(def) as SnowflakeStepDefModel;
	};
