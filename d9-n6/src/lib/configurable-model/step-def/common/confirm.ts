import {VUtils} from '@rainbow-d9/n1';
import {
	AllInPipelineStepDef,
	ConditionalPipelineStepDef,
	FileDef,
	PipelineStepDiagramDef,
	RoutesPipelineStepDef,
	SetsLikePipelineStepDef
} from '../../../definition';
import {PlaygroundModuleAssistant} from '../../../types';
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

export const survivalAfterConfirm = (def: AllInPipelineStepDef) => {
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
	return survival;
};
const createConfirmErrorHandling = <F extends AllInPipelineStepDef, M extends CommonStepDefModel>(model: M, def: F, assistant: Required<PlaygroundModuleAssistant>) => {
	return (name: 'catchable' | 'uncatchable' | 'exposed' | 'any', use?: ErrorHandleType) => {
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
};

export const confirm: CommonStepDefsType['confirm'] =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	<F extends AllInPipelineStepDef, M extends CommonStepDefModel>(
		model: M, def: F, file: FileDef, options: ConfirmNodeOptions, and?: AndConfirm<F, M>): ConfigChangesConfirmed => {
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
		const confirmErrorHandling = createConfirmErrorHandling(model, def, options.assistant);
		confirmErrorHandling('catchable', model.temporary?.useErrorHandlesForCatchable);
		confirmErrorHandling('uncatchable', model.temporary?.useErrorHandlesForUncatchable);
		confirmErrorHandling('exposed', model.temporary?.useErrorHandlesForExposed);
		confirmErrorHandling('any', model.temporary?.useErrorHandlesForAny);
		if (Object.keys(def.errorHandles ?? {}).length === 0) {
			delete def.errorHandles;
		}

		commitOfAnd();

		const survival = survivalAfterConfirm(def);
		Object.keys(def).forEach(key => survival(def, key, key));
		const diagramDef = def as PipelineStepDiagramDef;
		if (Object.keys(diagramDef.$diagram ?? {}).length === 0) {
			delete diagramDef.$diagram;
		}
		// trigger change
		options.handlers.onChange();

		return true;
	};

export const confirmSetsLikePipelineStep = (def: SetsLikePipelineStepDef, options: ConfirmNodeOptions) => {
	if (def.steps != null) {
		return;
	}
	const mightBeRoutes = def as RoutesPipelineStepDef;
	if (mightBeRoutes.routes != null) {
		def.steps = mightBeRoutes.routes[0]?.steps ?? [options.assistant.createDefaultStep()];
	} else {
		def.steps = [options.assistant.createDefaultStep()];
	}
};

export const confirmConditionalPipelineStep = (def: ConditionalPipelineStepDef, options: ConfirmNodeOptions) => {
	confirmSetsLikePipelineStep(def, options);
	const mightBeRoutes = def as unknown as RoutesPipelineStepDef;
	if (mightBeRoutes.routes != null) {
		def.check = mightBeRoutes.routes[0]?.check;
	}
};

export const confirmRoutesPipelineStep = (def: RoutesPipelineStepDef, options: ConfirmNodeOptions) => {
	if (def.routes != null) {
		return;
	}
	// if there is no routes defined
	const mightBeSetsLike = def as SetsLikePipelineStepDef;
	if (mightBeSetsLike.steps != null) {
		def.routes = [{steps: mightBeSetsLike.steps ?? [options.assistant.createDefaultStep()]}];
	} else {
		def.routes = [{steps: [options.assistant.createDefaultStep()]}];
	}
	const mightBeConditional = def as unknown as ConditionalPipelineStepDef;
	def.routes[0].check = mightBeConditional.check;
};