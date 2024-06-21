import {Undefinable} from '@rainbow-d9/n1';
import {AllStepDefs} from './configurable-model';
import {PipelineStepDef, SnippetPipelineStepDef, StandardPipelineStepRegisterKey} from './definition';
import {StepNodeModel} from './diagram';

const DEFAULT_CREATE_SUB_STEP_NODES = (node: StepNodeModel): Undefinable<StepNodeModel> => {
	return Object.values(AllStepDefs).find(def => {
		return def.use === node.step.use;
	})?.createSubNodes(node);
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
	 */
	createSubStepNodes?: (node: StepNodeModel) => (Undefinable<StepNodeModel> | [Undefinable<StepNodeModel>, boolean])
}) => {
	DEFAULTS.createDefaultStep = defaults.createDefaultStep ?? DEFAULTS.createDefaultStep;
	DEFAULTS.createSubStepNodes = defaults.createSubStepNodes != null
		? (node: StepNodeModel): Undefinable<StepNodeModel> => {
			const ret = defaults.createSubStepNodes(node);
			if (ret == null) {
				return DEFAULT_CREATE_SUB_STEP_NODES(node);
			} else if (Array.isArray(ret)) {
				if (ret[0] == null && ret[1] !== false) {
					return DEFAULT_CREATE_SUB_STEP_NODES(node);
				} else {
					return ret[0];
				}
			} else {
				return ret;
			}
		}
		: DEFAULT_CREATE_SUB_STEP_NODES;
};
