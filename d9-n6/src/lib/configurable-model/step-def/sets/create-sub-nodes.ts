import {Undefinable} from '@rainbow-d9/n1';
import {DEFAULTS} from '../../../constants';
import {PipelineStepDef, SetsPipelineStepDef} from '../../../definition';
import {HandledNodeModel, JoinEndNodeModel, StepNodeEntityType, StepNodeModel} from '../../../diagram';
import {CreateSubNodesOptions, StepNodeConfigurer} from '../../types';
import {createStepNode} from '../common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createSubNodes: StepNodeConfigurer['createSubNodes'] = (model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
	const {appendNode, appendLink, handlers} = options;

	const step = model.step as SetsPipelineStepDef;
	const steps = step.steps ?? [];
	if (steps.length === 0) {
		// create a default snippet step
		const defaultFirstStep: PipelineStepDef = DEFAULTS.createDefaultStep();
		steps.push(defaultFirstStep);
		// steps might be created, assign to anyway
		step.steps = steps;
	}

	let previousNode: HandledNodeModel = model;
	previousNode = steps.reduce((previousNode, step) => {
		return createStepNode(step, model.file, {
			type: StepNodeEntityType.NORMAL, handlers, subOf: step, previousNode, appendNode, appendLink
		});
	}, previousNode);

	// now create an end node for end sub nodes
	const endNode = new JoinEndNodeModel(step, model.file, {type: StepNodeEntityType.JOIN_END, subOf: step, handlers});
	appendNode(endNode);
	const link = previousNode.next(endNode);
	appendLink(link);
	const directLink = model.next(endNode);
	appendLink(directLink);

	return endNode;
};
