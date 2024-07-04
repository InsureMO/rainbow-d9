import {VUtils} from '@rainbow-d9/n1';
import {AllInPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefModel, ErrorHandleType, MergeRequestType} from './types';

export const prepare: StepNodeConfigurer<AllInPipelineStepDef, CommonStepDefModel>['prepare'] =
	(def: AllInPipelineStepDef): CommonStepDefModel => {
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
		model.errorHandles = {};
		const copyErrorHandle = (name: 'catchable' | 'uncatchable' | 'exposed' | 'any',
		                         flagName: `useErrorHandlesFor${'Catchable' | 'Uncatchable' | 'Exposed' | 'Any'}`) => {
			const handle = def.errorHandles?.[name];
			if (handle == null) {
				model.temporary[flagName] = ErrorHandleType.NONE;
			} else if (Array.isArray(handle)) {
				model.temporary[flagName] = ErrorHandleType.STEPS;
			} else {
				model.errorHandles[name] = handle;
				model.temporary[flagName] = ErrorHandleType.SNIPPET;
			}
		};
		copyErrorHandle('catchable', 'useErrorHandlesForCatchable');
		copyErrorHandle('uncatchable', 'useErrorHandlesForUncatchable');
		copyErrorHandle('exposed', 'useErrorHandlesForExposed');
		copyErrorHandle('any', 'useErrorHandlesForAny');
		return model;
	};
