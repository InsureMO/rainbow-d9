import {Undefinable} from '@rainbow-d9/n1';
import {AllInPipelineStepDef, PipelineStepDef, SetsLikePipelineStepDef} from '../../../definition';
import {HandledNodeModel, JoinEndNodeModel, StepNodeEntityType, StepNodeModel} from '../../../diagram';
import {CreateSubNodesOptions} from '../../types';
import {
	AnyErrorHandlePortModel,
	CatchableErrorHandlePortModel,
	ExposedErrorHandlePortModel,
	StepsPortModel,
	UncatchableErrorHandlePortModel
} from './port-widgets';
import {StepsPortName} from './ports';
import {CommonStepDefsType, CreateSubNodesAndEndNodeOptions} from './types';
import {createSubNodesOfSingleRoute} from './utils';

export const createErrorHandlesSubNodes = (step: AllInPipelineStepDef, model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<Array<HandledNodeModel>> => {
	// error handles
	const errorHandles = step.errorHandles;
	if (errorHandles == null) {
		return (void 0);
	}

	const createDefaultStep = options.assistant.createDefaultStep;
	const createAskSteps = (name: 'catchable' | 'uncatchable' | 'exposed' | 'any'): (() => Undefinable<Array<PipelineStepDef>>) => {
		return (): Undefinable<Array<PipelineStepDef>> => {
			if (errorHandles[name] == null || !Array.isArray(errorHandles[name])) {
				return (void 0);
			}
			if (errorHandles[name].length === 0) {
				const defaultFirstStep: PipelineStepDef = createDefaultStep();
				(errorHandles[name] as Array<PipelineStepDef>).push(defaultFirstStep);
			}
			return errorHandles[name] as Array<PipelineStepDef>;
		};
	};
	return [
		{
			steps: createAskSteps('catchable'),
			findPortFromModel: () => model.getPort(CatchableErrorHandlePortModel.NAME) as CatchableErrorHandlePortModel,
			createPortFromModel: () => new CatchableErrorHandlePortModel()
		},
		{
			steps: createAskSteps('exposed'),
			findPortFromModel: () => model.getPort(ExposedErrorHandlePortModel.NAME) as ExposedErrorHandlePortModel,
			createPortFromModel: () => new ExposedErrorHandlePortModel()
		},
		{
			steps: createAskSteps('uncatchable'),
			findPortFromModel: () => model.getPort(UncatchableErrorHandlePortModel.NAME) as UncatchableErrorHandlePortModel,
			createPortFromModel: () => new UncatchableErrorHandlePortModel()
		},
		{
			steps: createAskSteps('any'),
			findPortFromModel: () => model.getPort(AnyErrorHandlePortModel.NAME) as AnyErrorHandlePortModel,
			createPortFromModel: () => new AnyErrorHandlePortModel()
		}
	].map(({steps, ...rest}) => {
		return {steps: steps(), ...rest};
	}).filter(({steps}) => {
		return steps != null && steps.length !== 0;
	}).map(({steps, findPortFromModel, createPortFromModel}) => {
		return createSubNodesOfSingleRoute({
			model, options, askSteps: () => steps, findPortFromModel, createPortFromModel
		});
	});
};

export const createSubNodes: CommonStepDefsType['createSubNodes'] = (model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<Array<HandledNodeModel>> => {
	const step = model.step as AllInPipelineStepDef;
	return createErrorHandlesSubNodes(step, model, options);
};

/**
 * include both common sub nodes and specific sub nodes
 */
export const createSubNodesAndEndNode: CommonStepDefsType['createSubNodesAndEndNode'] = (
	model: StepNodeModel, options: CreateSubNodesAndEndNodeOptions): Undefinable<HandledNodeModel> => {
	const {appendNode, appendLink, handlers, createSpecificSubNodes} = options;

	const step = model.step as AllInPipelineStepDef;
	const commonSubNodes = createSubNodes(model, options);
	const specificSubNodes = createSpecificSubNodes?.(model, options);
	const subNodes = [...(commonSubNodes ?? []), ...(specificSubNodes ?? [])];
	if (subNodes.length === 0) {
		// no sub nodes, no end node
		return (void 0);
	}

	// now create an end node for end sub nodes
	const endNode = new JoinEndNodeModel(step, model.file, {type: StepNodeEntityType.JOIN_END, subOf: step, handlers});
	appendNode(endNode);
	subNodes.forEach(node => {
		const link = endNode.endOfSub(node);
		appendLink(link);
	});
	const directLink = endNode.endOfMe(model);
	appendLink(directLink);

	return endNode;
};

export const createSetsLikeSubNodesAndEndNode: CommonStepDefsType['createSetsLikeSubNodesAndEndNode'] = (
	model: StepNodeModel, options: CreateSubNodesAndEndNodeOptions): Undefinable<HandledNodeModel> => {
	return createSubNodesAndEndNode(model, {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		...options,
		createSpecificSubNodes: (_node: StepNodeModel, options: CreateSubNodesOptions) => {
			const step = model.step as SetsLikePipelineStepDef;

			const createDefaultStep = options.assistant.createDefaultStep;
			// noinspection DuplicatedCode
			const lastNodeOfSteps = createSubNodesOfSingleRoute({
				model, options,
				askSteps: () => {
					const steps = step.steps ?? [];
					if (steps.length === 0) {
						// create a default snippet step
						const defaultFirstStep: PipelineStepDef = createDefaultStep();
						steps.push(defaultFirstStep);
						// steps might be created, assign to anyway
						step.steps = steps;
					}
					return steps;
				},
				findPortFromModel: () => model.getPort(StepsPortName) as StepsPortModel,
				createPortFromModel: () => new StepsPortModel(StepsPortName)
			});
			return [lastNodeOfSteps];
		}
	});
};