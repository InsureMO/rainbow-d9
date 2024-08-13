import {VUtils} from '@rainbow-d9/n1';
import {AllInPipelineStepDef, FileDef} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {ConfirmNodeOptions} from '../../types';
import {
	AndConfirm,
	AndConfirmCommit,
	CommonStepDefModel,
	CommonStepDefsType,
	ErrorHandleType,
	MergeType
} from './types';

export const confirm: CommonStepDefsType['confirm'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	<F extends AllInPipelineStepDef, M extends CommonStepDefModel>(
		model: M, def: F, file: FileDef, options: ConfirmNodeOptions, and?: AndConfirm<F, M>): ConfigurableElementAnchor | true => {
		const {assistant} = options;

		// TODO VALIDATE ALL COMMON PROPERTIES
		// and
		let resultOfAnd: true | ReturnType<AndConfirm<F, M>>;
		if (and == null) {
			resultOfAnd = true;
		} else {
			resultOfAnd = and(model, def, file, options);
		}

		let commitOfAnd: AndConfirmCommit;
		if (typeof resultOfAnd === 'string') {
			// something incorrect, return anchor
			return resultOfAnd;
		} else if (resultOfAnd === true) {
			// do nothing
			commitOfAnd = VUtils.noop;
		} else {
			commitOfAnd = resultOfAnd;
		}

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

		commitOfAnd();
		// trigger change
		options.handlers.onChange();

		return true;
	};
