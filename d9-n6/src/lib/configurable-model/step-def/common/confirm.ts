import {AllInPipelineStepDef, FileDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefModel, ErrorHandleType, MergeType} from './types';

export const confirm: StepNodeConfigurer<AllInPipelineStepDef, CommonStepDefModel>['confirm'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(model: CommonStepDefModel, def: AllInPipelineStepDef, _file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | true => {
		const {assistant} = options;

		def.name = model.name;
		def.use = model.use;
		// copy all common properties
		if (model.temporary?.fromInputAsIs) {
			delete def.fromInput;
		} else {
			def.fromInput = model.fromInput;
		}
		if (model.temporary?.toOutputAsIs) {
			delete def.toOutput;
		} else {
			def.toOutput = model.toOutput;
		}
		switch (model.temporary?.mergeType) {
			case MergeType.MERGE_AS_PROPERTY:
				def.merge = model.merge;
				break;
			case MergeType.UNBOX:
				def.merge = true;
				break;
			case MergeType.REPLACE:
			default:
				delete def.merge;
				break;
		}
		// copy all error handles
		const confirmErrorHandling = (name: 'catchable' | 'uncatchable' | 'exposed' | 'any', use?: ErrorHandleType) => {
			def.errorHandles = def.errorHandles ?? {};
			if (use === ErrorHandleType.STEPS) {
				// steps, the original handles might be steps also, then do nothing
				// otherwise, replace the error handles with one new step
				if (def.errorHandles[name] != null && !Array.isArray(def.errorHandles[name])) {
					def.errorHandles[name] = [assistant.createDefaultStep()];
				}
			} else if (use === ErrorHandleType.SNIPPET) {
				// snippet, copy from edit model
				def.errorHandles[name] = model.errorHandles?.[name];
			} else {
				// none, delete from def
				delete def.errorHandles[name];
			}
		};
		confirmErrorHandling('catchable', model.temporary?.useErrorHandlesForCatchable);
		confirmErrorHandling('uncatchable', model.temporary?.useErrorHandlesForUncatchable);
		confirmErrorHandling('exposed', model.temporary?.useErrorHandlesForExposed);
		confirmErrorHandling('any', model.temporary?.useErrorHandlesForAny);

		return true;
	};
