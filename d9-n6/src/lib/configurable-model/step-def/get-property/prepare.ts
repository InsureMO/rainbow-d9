import {GetPropertyPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {GetPropertyStepDefModel} from './types';

export const prepare: StepNodeConfigurer<GetPropertyPipelineStepDef, GetPropertyStepDefModel>['prepare'] =
	(def: GetPropertyPipelineStepDef): GetPropertyStepDefModel => {
		const model: GetPropertyStepDefModel = CommonStepDefs.prepare(def) as GetPropertyStepDefModel;
		model.property = def.property;
		return model;
	};
