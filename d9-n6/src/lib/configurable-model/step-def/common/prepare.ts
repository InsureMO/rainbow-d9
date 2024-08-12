import {VUtils} from '@rainbow-d9/n1';
import {AllInPipelineStepDef} from '../../../definition';
import {CommonStepDefModel, CommonStepDefsType, ErrorHandleType, MergeType} from './types';

export const prepare: CommonStepDefsType['prepare'] =
	<F extends AllInPipelineStepDef, M extends CommonStepDefModel>(def: F, and?: (def: F, model: M) => void): M => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const model: M = {
			name: def.name, use: def.use,
			fromInput: def.fromInput, toOutput: def.toOutput,
			temporary: {}
		};
		model.temporary.fromInputAsIs = VUtils.isBlank(def.fromInput);
		model.temporary.toOutputAsIs = VUtils.isBlank(def.toOutput);
		model.temporary.mergeType = (VUtils.isBlank(def.merge) || def.merge === false)
			? MergeType.REPLACE
			: (def.merge === true) ? MergeType.UNBOX : MergeType.MERGE_AS_PROPERTY;
		if (model.temporary.mergeType === MergeType.MERGE_AS_PROPERTY) {
			model.merge = def.merge as string;
		}
		model.errorHandles = model.errorHandles ?? {};
		const copyErrorHandle = (name: 'catchable' | 'uncatchable' | 'exposed' | 'any',
		                         flagName: `useErrorHandlesFor${'Catchable' | 'Uncatchable' | 'Exposed' | 'Any'}`) => {
			const handle = def.errorHandles?.[name];
			if (handle == null) {
				model.temporary[flagName] = ErrorHandleType.NONE;
			} else if (Array.isArray(handle)) {
				model.temporary[flagName] = ErrorHandleType.STEPS;
			} else {
				model.temporary[flagName] = ErrorHandleType.SNIPPET;
			}
		};
		copyErrorHandle('catchable', 'useErrorHandlesForCatchable');
		copyErrorHandle('uncatchable', 'useErrorHandlesForUncatchable');
		copyErrorHandle('exposed', 'useErrorHandlesForExposed');
		copyErrorHandle('any', 'useErrorHandlesForAny');
		if (and != null) {
			and(def, model);
		}
		return model;
	};
