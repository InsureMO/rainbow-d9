import {Undefinable} from '@rainbow-d9/n1';
import {CreateSubNodesOptions, findStepDef} from './configurable-model';
import {PipelineStepDef, SnippetPipelineStepDef, StandardPipelineStepRegisterKey} from './definition';
import {HandledNodeModel, StepNodeModel} from './diagram';

const DEFAULT_CREATE_SUB_STEP_NODES = (node: StepNodeModel, options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
	return findStepDef(node.step.use)?.createSubNodes(node, options);
};

export const DEFAULTS = {
	diagram: {
		startTop: 64, startLeft: 64,
		rowGap: 64, columnGap: 128,
		linkArcRadius: 8, linkGutterSize: 8,
		linkJoinEndSinkingOffset: 24, linkJoinEndGutterSize: 16
	},
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
	diagram?: {
		startTop?: number; startLeft?: number;
		rowGap?: number; columnGap?: number;
		linkArcRadius?: number; linkGutterSize?: number;
		linkJoinEndSinkingOffset?: number; linkJoinEndGutterSize?: number;
	};
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
	DEFAULTS.diagram = {
		startTop: defaults.diagram?.startTop ?? DEFAULTS.diagram.startTop,
		startLeft: defaults.diagram?.startLeft ?? DEFAULTS.diagram.startLeft,
		rowGap: Math.max(defaults.diagram?.rowGap ?? 0, DEFAULTS.diagram.rowGap),
		columnGap: Math.max(defaults.diagram?.columnGap ?? 0, DEFAULTS.diagram.columnGap),
		linkArcRadius: Math.max(defaults.diagram?.linkArcRadius ?? DEFAULTS.diagram.linkArcRadius, 4),
		linkGutterSize: Math.max(defaults.diagram?.linkGutterSize ?? 0, DEFAULTS.diagram.linkGutterSize),
		linkJoinEndSinkingOffset: Math.max(defaults.diagram?.linkJoinEndSinkingOffset ?? 0, DEFAULTS.diagram.linkJoinEndSinkingOffset),
		linkJoinEndGutterSize: Math.max(defaults.diagram?.linkJoinEndGutterSize ?? 0, DEFAULTS.diagram.linkJoinEndGutterSize)
	};
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
