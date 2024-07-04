import {AllInPipelineStepDef, FileDef} from '../../../definition';
import {NodeHandlers} from '../../../diagram';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefModel, ErrorHandleType, MergeRequestType} from './types';

export const confirm: StepNodeConfigurer<AllInPipelineStepDef, CommonStepDefModel>['confirm'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(model: CommonStepDefModel, def: AllInPipelineStepDef, _file: FileDef, handlers: NodeHandlers): ConfigurableElementAnchor | true => {
		def.name = model.name;
		def.use = model.use;
		// copy all common properties
		if (model.temporary?.fromRequestAsIs) {
			delete def.fromRequest;
		} else {
			def.fromRequest = model.fromRequest;
		}
		if (model.temporary?.toResponseAsIs) {
			delete def.toResponse;
		} else {
			def.toResponse = model.toResponse;
		}
		switch (model.temporary?.mergeRequestType) {
			case MergeRequestType.MERGE_AS_PROPERTY:
				def.mergeRequest = model.mergeRequest;
				break;
			case MergeRequestType.UNBOX:
				def.mergeRequest = true;
				break;
			case MergeRequestType.REPLACE:
			default:
				delete def.mergeRequest;
				break;
		}
		// copy all error handles
		const confirmErrorHandling = (name: 'catchable' | 'uncatchable' | 'exposed' | 'any', use?: ErrorHandleType) => {
			def.errorHandles = def.errorHandles ?? {};
			if (use === ErrorHandleType.STEPS) {
				def.errorHandles[name] = model.temporary[name];
			} else if (use === ErrorHandleType.SNIPPET) {
				def.errorHandles[name] = model.errorHandles?.[name];
			} else {
				delete def.errorHandles[name];
			}
		};
		confirmErrorHandling('catchable', model.temporary?.useErrorHandlesForCatchable);
		confirmErrorHandling('uncatchable', model.temporary?.useErrorHandlesForUncatchable);
		confirmErrorHandling('exposed', model.temporary?.useErrorHandlesForExposed);
		confirmErrorHandling('any', model.temporary?.useErrorHandlesForAny);

		handlers.onChange();
		return true;
	};
