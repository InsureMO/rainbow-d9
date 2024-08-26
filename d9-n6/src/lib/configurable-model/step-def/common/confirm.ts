import {VUtils} from '@rainbow-d9/n1';
import {AllInPipelineStepDef, FileDef, PipelineStepDiagramDef} from '../../../definition';
import {ConfigChangesConfirmed, ConfirmNodeOptions} from '../../types';
import {findStepDef} from '../all-step-defs';
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
		model: M, def: F, file: FileDef, options: ConfirmNodeOptions, and?: AndConfirm<F, M>): ConfigChangesConfirmed => {
		const {assistant} = options;

		// TODO VALIDATE ALL COMMON PROPERTIES OF STEPS
		// and
		let resultOfAnd: true | ReturnType<AndConfirm<F, M>>;
		if (and == null) {
			resultOfAnd = true;
		} else {
			resultOfAnd = and(model, def, file, options);
		}

		let commitOfAnd: AndConfirmCommit;
		if (Array.isArray(resultOfAnd)) {
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
				// steps,
				if (def.errorHandles[name] == null) {
					// original handle is not declared, create a default step
					def.errorHandles[name] = [assistant.createDefaultStep()];
				} else if (Array.isArray(def.errorHandles[name])) {
					// original handle is declared as sub steps, check length
					if (def.errorHandles[name].length === 0) {
						// empty, create a default step
						def.errorHandles[name] = [assistant.createDefaultStep()];
					} else {
						// do nothing
					}
				} else {
					// original by snippet, replace it with a default step
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
		if (Object.keys(def.errorHandles ?? {}).length === 0) {
			delete def.errorHandles;
		}

		commitOfAnd();
		const defs = findStepDef(def.use);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const survival = (holder: any, fullQualifiedProperty: string, property: string) => {
			const data = holder[property];
			if (data == null) {
				delete holder[property];
			} else if (typeof data === 'string' && VUtils.isBlank(data)) {
				delete holder[property];
			} else if (!defs.survivalAfterConfirm(def, fullQualifiedProperty)) {
				delete holder[property];
			} else if (VUtils.isPrimitive(data)) {
				// survival, do nothing
			} else if (defs.survivalAfterConfirm(def, `${fullQualifiedProperty}.*`)) {
				// all children of this object/array are survival, do nothing
			} else if (Array.isArray(data)) {
				// never occurs, survival, do nothing
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const each = (data: Array<any>) => {
					data.forEach(item => {
						if (item == null || VUtils.isPrimitive(item)) {
							// do nothing
						} else if (Array.isArray(item)) {
							each(item);
						} else {
							Object.keys(item).forEach(key => survival(item, `${fullQualifiedProperty}.${key}`, key));
						}
					});
				};
				each(data);
			} else {
				Object.keys(data).forEach(key => survival(data, `${fullQualifiedProperty}.${key}`, key));
			}
		};
		Object.keys(def).forEach(key => survival(def, key, key));
		const diagramDef = def as PipelineStepDiagramDef;
		if (Object.keys(diagramDef.$diagram ?? {}).length === 0) {
			delete diagramDef.$diagram;
		}
		// trigger change
		options.handlers.onChange();

		return true;
	};
