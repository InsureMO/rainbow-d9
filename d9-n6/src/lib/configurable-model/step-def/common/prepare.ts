import {VUtils} from '@rainbow-d9/n1';
import {AllInPipelineStepDef, PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefModel, ErrorHandleType, MergeRequestType} from './types';

export const prepare: StepNodeConfigurer<CommonStepDefModel>['prepare'] = (def: AllInPipelineStepDef): ConfigurableModel => {
	const model: CommonStepDefModel = {
		name: def.name, use: def.use,
		fromRequest: def.fromRequest, toResponse: def.toResponse,
		temporary: {}
	};
	model.temporary.fromRequestAsIs = VUtils.isBlank(def.fromRequest);
	model.temporary.toResponseAsIs = VUtils.isBlank(def.toResponse);
	model.temporary.mergeRequestType = (VUtils.isBlank(def.mergeRequest) || def.mergeRequest === false)
		? MergeRequestType.REPLACE
		: (def.mergeRequest === true) ? MergeRequestType.UNBOX : MergeRequestType.MERGE_AS_PROPERTY;
	if (model.temporary.mergeRequestType === MergeRequestType.MERGE_AS_PROPERTY) {
		model.mergeRequest = def.mergeRequest as string;
	}
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
			model.temporary[flagName] = ErrorHandleType.NONE;
		} else if (Array.isArray(def)) {
			model.temporary[flagName] = ErrorHandleType.STEPS;
			model.temporary[name] = def;
		} else {
			model.errorHandles[name] = def;
			model.temporary[flagName] = ErrorHandleType.SNIPPET;
		}
	};
	copyErrorHandle(catchable, 'catchable', 'useErrorHandlesForCatchable');
	copyErrorHandle(uncatchable, 'uncatchable', 'useErrorHandlesForUncatchable');
	copyErrorHandle(exposed, 'exposed', 'useErrorHandlesForExposed');
	copyErrorHandle(anyError, 'any', 'useErrorHandlesForAny');
	return model;
};
