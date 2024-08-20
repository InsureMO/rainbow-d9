import {Undefinable} from '@rainbow-d9/n1';
import {
	AllInPipelineStepDef,
	ConditionalPipelineStepDef,
	PipelineStepDef,
	PipelineStepDiagramDef,
	SetsLikePipelineStepDef
} from '../../../definition';
import {HandledNodeModel, JoinEndNodeModel, StepNodeEntityType, StepNodeModel} from '../../../diagram';
import {CreateSubNodesOptions} from '../../types';
import {
	AnyErrorHandlePortModel,
	CatchableErrorHandlePortModel,
	ErrorHandlesPortModel,
	ExposedErrorHandlePortModel,
	StepsPortModel,
	UncatchableErrorHandlePortModel
} from './port-widgets';
import {StepsPortName} from './ports';
import {CommonStepDefsType, CreateSubNodesAndEndNodeOptions} from './types';
import {CreatePortFromModel, createSubNodesOfSingleRoute, FindPortFromModel} from './utils';

export const createErrorHandlesSubNodes = (step: AllInPipelineStepDef, model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<Array<HandledNodeModel>> => {
	// error handles
	const errorHandles = step.errorHandles;
	if (errorHandles == null) {
		return (void 0);
	}

	const createDefaultStep = options.assistant.createDefaultStep;
	const createAskSteps = (
		name: 'catchable' | 'uncatchable' | 'exposed' | 'any',
		findPortFromModel: (model: StepNodeModel) => Undefinable<ErrorHandlesPortModel>,
		createPortFromModel: (model: StepNodeModel) => ErrorHandlesPortModel
	): (() => Undefinable<Array<PipelineStepDef>>) => {
		return (): Undefinable<Array<PipelineStepDef>> => {
			if (errorHandles[name] == null || !Array.isArray(errorHandles[name])) {
				return (void 0);
			}
			const diagram = (step as PipelineStepDiagramDef).$diagram;
			const hideSteps = diagram?.[`$fold${name.charAt(0).toUpperCase() + name.slice(1)}`] ?? false;
			if (hideSteps) {
				// still needs to create port model, but no link attached.
				let sourcePort = findPortFromModel(model);
				if (sourcePort == null) {
					sourcePort = createPortFromModel(model);
					model.addPort(sourcePort);
				}
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
			name: 'catchable',
			findPortFromModel: (model: StepNodeModel) => model.getPort(CatchableErrorHandlePortModel.NAME) as CatchableErrorHandlePortModel,
			createPortFromModel: () => new CatchableErrorHandlePortModel()
		},
		{
			name: 'exposed',
			findPortFromModel: (model: StepNodeModel) => model.getPort(ExposedErrorHandlePortModel.NAME) as ExposedErrorHandlePortModel,
			createPortFromModel: () => new ExposedErrorHandlePortModel()
		},
		{
			name: 'uncatchable',
			findPortFromModel: (model: StepNodeModel) => model.getPort(UncatchableErrorHandlePortModel.NAME) as UncatchableErrorHandlePortModel,
			createPortFromModel: () => new UncatchableErrorHandlePortModel()
		},
		{
			name: 'any',
			findPortFromModel: (model: StepNodeModel) => model.getPort(AnyErrorHandlePortModel.NAME) as AnyErrorHandlePortModel,
			createPortFromModel: () => new AnyErrorHandlePortModel()
		}
	].map(({name, findPortFromModel, createPortFromModel}) => {
		return {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			steps: createAskSteps(name, findPortFromModel, createPortFromModel),
			findPortFromModel, createPortFromModel
		};
	}).map(({steps, ...rest}) => {
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
	const {appendNode, appendLink, handlers, assistant, createSpecificSubNodes} = options;

	const step = model.step as AllInPipelineStepDef;
	const commonSubNodes = createSubNodes(model, options);
	const specificSubNodes = createSpecificSubNodes?.(model, options);
	const subNodes = [...(commonSubNodes ?? []), ...(specificSubNodes ?? [])];
	if (subNodes.length === 0) {
		// no sub nodes, no end node
		return (void 0);
	}

	// now create an end node for end sub nodes
	const endNode = new JoinEndNodeModel(step, model.file, {
		type: StepNodeEntityType.JOIN_END, subOf: step, handlers, assistant
	});
	appendNode(endNode);
	subNodes.forEach(node => {
		const link = endNode.endOfSub(node);
		appendLink(link);
	});
	const directLink = endNode.endOfMe(model);
	appendLink(directLink);

	return endNode;
};

const findStepsPortFromModel: FindPortFromModel = (model: StepNodeModel) => model.getPort(StepsPortName) as StepsPortModel;
const createStepsPortFromModel: CreatePortFromModel = (model: StepNodeModel) => {
	const portModel = new StepsPortModel(StepsPortName);
	model.addPort(portModel);
	return portModel;
};
const findOrCreateStepsPortFromModel: CreatePortFromModel = (model: StepNodeModel) => {
	const portModel = findStepsPortFromModel(model);
	if (portModel == null) {
		return createStepsPortFromModel(model);
	} else {
		return portModel;
	}
};

export const shouldCreateSubNodes = (model: StepNodeModel): boolean => {
	const step = model.step as SetsLikePipelineStepDef;
	const diagram = (step as PipelineStepDiagramDef).$diagram;
	const hideSteps = diagram?.$foldSubSteps ?? false;
	if (hideSteps) {
		// still needs to create port model, but no link attached.
		findOrCreateStepsPortFromModel(model);
		return false;
	}
	return true;
};

export const guardSubSteps = (property: string): ((model: StepNodeModel, options: CreateSubNodesOptions) => Array<PipelineStepDef>) => {
	return (model: StepNodeModel, options: CreateSubNodesOptions): Array<PipelineStepDef> => {
		const step = model.step as SetsLikePipelineStepDef;
		const createDefaultStep = options.assistant.createDefaultStep;
		const steps = step[property] ?? [];
		if (steps.length === 0) {
			// create a default snippet step
			const defaultFirstStep: PipelineStepDef = createDefaultStep();
			steps.push(defaultFirstStep);
			// steps might be created, assign to anyway
			step[property] = steps;
		}
		return steps;
	};
};
export const guardSetsLikeSteps = guardSubSteps('steps');

export const createSetsLikeSubNodesAndEndNode: CommonStepDefsType['createSetsLikeSubNodesAndEndNode'] =
	(model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
		return createSubNodesAndEndNode(model, {
			...options,
			createSpecificSubNodes: (model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<Array<HandledNodeModel>> => {
				const should = shouldCreateSubNodes(model);
				if (!should) {
					return (void 0);
				}
				const steps = guardSetsLikeSteps(model, options);
				return [
					createSubNodesOfSingleRoute({
						model, options,
						askSteps: () => steps,
						findPortFromModel: findStepsPortFromModel, createPortFromModel: createStepsPortFromModel
					})
				];
			}
		});
	};

export const createParallelSubNodesAndEndNode: CommonStepDefsType['createParallelSubNodesAndEndNode'] =
	(model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
		return createSubNodesAndEndNode(model, {
			...options,
			createSpecificSubNodes: (model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<Array<HandledNodeModel>> => {
				const should = shouldCreateSubNodes(model);
				if (!should) {
					return (void 0);
				}
				return guardSetsLikeSteps(model, options).map((step, stepIndex) => {
					return createSubNodesOfSingleRoute({
						model, options,
						askSteps: () => [step],
						findPortFromModel: findStepsPortFromModel, createPortFromModel: createStepsPortFromModel,
						askFirstLinkExtras: () => ({index: stepIndex})
					});
				});
			}
		});
	};

export const createConditionalSubNodesAndEndNode: CommonStepDefsType['createConditionalSubNodesAndEndNode'] =
	(model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
		return createSubNodesAndEndNode(model, {
			...options,
			createSpecificSubNodes: (model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<Array<HandledNodeModel>> => {
				const should = shouldCreateSubNodes(model);
				if (!should) {
					return (void 0);
				}
				const steps = guardSetsLikeSteps(model, options);
				const stepsNode = createSubNodesOfSingleRoute({
					model, options,
					askSteps: () => steps,
					findPortFromModel: findStepsPortFromModel, createPortFromModel: createStepsPortFromModel,
					askFirstLinkExtras: () => ({index: 0})
				});
				const step = model.step as ConditionalPipelineStepDef;
				const otherwise = step.otherwise;
				if (otherwise == null || otherwise.length === 0) {
					return [stepsNode];
				} else {
					return [
						stepsNode,
						createSubNodesOfSingleRoute({
							model, options,
							askSteps: () => step.otherwise,
							findPortFromModel: findStepsPortFromModel, createPortFromModel: createStepsPortFromModel,
							askFirstLinkExtras: () => ({index: 1})
						})
					];
				}
			}
		});
	};