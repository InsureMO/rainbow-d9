import {AllInPipelineStepDef, PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefModel, CommonStepErrorHandleType} from './types';

export const prepare: StepNodeConfigurer<CommonStepDefModel>['prepare'] = (def: AllInPipelineStepDef): ConfigurableModel => {
	const model: CommonStepDefModel = {
		name: def.name,
		use: def.use,
		fromRequest: def.fromRequest,
		toResponse: def.toResponse,
		mergeRequest: def.mergeRequest,
		temporary: {}
	};
	const {
		errorHandles: {
			catchable, uncatchable,
			exposed, any: anyError
		} = {}
	} = def;
	model.errorHandles = {};
	const copyErrorHandle = (def: string | Array<PipelineStepDef>,
	                         name: 'catchable' | 'uncatchable' | 'exposed' | 'any',
	                         flagName: `useErrorHandlesFor${'Catchable' | 'Uncatchable' | 'Exposed' | 'Any'}`) => {
		if (def == null) {
			model.temporary[flagName] = CommonStepErrorHandleType.NONE;
		} else if (Array.isArray(def)) {
			model.temporary[flagName] = CommonStepErrorHandleType.STEPS;
		} else {
			model.errorHandles[name] = def;
			model.temporary[flagName] = CommonStepErrorHandleType.SNIPPET;
		}
	};
	copyErrorHandle(catchable, 'catchable', 'useErrorHandlesForCatchable');
	copyErrorHandle(uncatchable, 'uncatchable', 'useErrorHandlesForUncatchable');
	copyErrorHandle(exposed, 'exposed', 'useErrorHandlesForExposed');
	copyErrorHandle(anyError, 'any', 'useErrorHandlesForAny');
	return model;
};
