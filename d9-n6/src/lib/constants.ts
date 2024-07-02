import {Undefinable} from '@rainbow-d9/n1';
import {CreateSubNodesOptions, findStepDef} from './configurable-model';
import {PipelineStepDef, SnippetPipelineStepDef, StandardPipelineStepRegisterKey} from './definition';
import {HandledNodeModel, StepNodeModel} from './diagram';

const DEFAULT_CREATE_SUB_STEP_NODES = (node: StepNodeModel, options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
	return findStepDef(node.step.use)?.createSubNodes(node, options);
};

export const DEFAULTS = {
	createDefaultStep: (): PipelineStepDef => {
		return {
			name: '',
			use: StandardPipelineStepRegisterKey.SNIPPET,
			fromRequest: '$factor',
			toResponse: '$result',
			mergeRequest: true
		} as SnippetPipelineStepDef;
	},
	createSubStepNodes: DEFAULT_CREATE_SUB_STEP_NODES
};

export const setDefaults = (defaults: {
	createDefaultStep?: () => PipelineStepDef;
	/**
	 * Use the second boolean return value to specify whether to use the default create function.
	 * In practice, always return false, indicating that none of the default create functions will be effective.
	 *
	 * 1. returns null, means use default
	 * 2. return object, means abandon default
	 * 3. array, only on first is null or empty array and second is true, means use default (same as returns null)
	 * 4. array, otherwise, return first
	 */
	createSubStepNodes?: (node: StepNodeModel) => Undefinable<StepNodeModel> | [Undefinable<StepNodeModel>, boolean];
}) => {
	DEFAULTS.createDefaultStep = defaults.createDefaultStep ?? DEFAULTS.createDefaultStep;
	DEFAULTS.createSubStepNodes = defaults.createSubStepNodes != null
		? (node: StepNodeModel, options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
			const ret = defaults.createSubStepNodes(node);
			if (ret == null) {
				return DEFAULT_CREATE_SUB_STEP_NODES(node, options);
			} else if (Array.isArray(ret)) {
				if (ret[0] == null && ret[1] === true) {
					return DEFAULT_CREATE_SUB_STEP_NODES(node, options);
				} else {
					return ret[0];
				}
			} else {
				return ret;
			}
		}
		: DEFAULT_CREATE_SUB_STEP_NODES;
};
