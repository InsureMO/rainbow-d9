import {Undefinable} from '@rainbow-d9/n1';
import {PipelineStepDef, SetsLikePipelineStepDef} from '../../../definition';
import {HandledNodeModel, StepNodeModel} from '../../../diagram';
import {CreateSubNodesOptions, StepNodeConfigurer} from '../../types';
import {CommonStepDefs, createSubNodesOfSingleRoute, StepsPortModel, StepsPortName} from '../common';

export const createSubNodes: StepNodeConfigurer['createSubNodes'] =
	(model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
		return CommonStepDefs.createSubNodesAndEndNode(model, {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			...options,
			createSpecificSubNodes: (_node: StepNodeModel, options: CreateSubNodesOptions) => {
				const step = model.step as SetsLikePipelineStepDef;

				const createDefaultStep = options.assistant.createDefaultStep;
				const steps = step.steps ?? [];
				if (steps.length === 0) {
					// create a default snippet step
					const defaultFirstStep: PipelineStepDef = createDefaultStep();
					steps.push(defaultFirstStep);
					// steps might be created, assign to anyway
					step.steps = steps;
				}
				// noinspection DuplicatedCode
				return steps.map((step, stepIndex) => {
					return createSubNodesOfSingleRoute({
						model, options,
						askSteps: () => [step],
						findPortFromModel: () => model.getPort(StepsPortName) as StepsPortModel,
						createPortFromModel: () => new StepsPortModel(StepsPortName),
						askFirstLinkExtras: () => ({index: stepIndex})
					});
				});
			}
		});
	};
