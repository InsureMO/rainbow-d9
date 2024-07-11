import {DelPropertyPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {DelPropertyStepDefModel} from './types';

export const prepare: StepNodeConfigurer<DelPropertyPipelineStepDef, DelPropertyStepDefModel>['prepare'] =
	(def: DelPropertyPipelineStepDef): DelPropertyStepDefModel => {
		const model: DelPropertyStepDefModel = CommonStepDefs.prepare(def) as DelPropertyStepDefModel;
		model.property = def.property;
		return model;
	};
