import {Undefinable} from '@rainbow-d9/n1';
import {DEFAULTS} from '../../../constants';
import {AllInPipelineStepDef, PipelineStepDef} from '../../../definition';
import {HandledNodeModel, JoinEndNodeModel, StepNodeEntityType, StepNodeModel} from '../../../diagram';
import {CreateSubNodesOptions} from '../../types';
import {CommonStepDefsType, CreateSubNodesAndEndNodeOptions, createSubNodesOfSingleRoute} from './index';
import {CatchablePortModel} from './port-widgets';

export const createSubNodes: CommonStepDefsType['createSubNodes'] = (model: StepNodeModel, options: CreateSubNodesOptions): Undefinable<Array<HandledNodeModel>> => {
	const step = model.step as AllInPipelineStepDef;
	// error handles
	const errorHandles = step.errorHandles;
	if (errorHandles == null) {
		return (void 0);
	}

	return [
		{
			steps: (): Undefinable<Array<PipelineStepDef>> => {
				if (errorHandles.catchable == null || !Array.isArray(errorHandles.catchable)) {
					return (void 0);
				}
				if (errorHandles.catchable.length === 0) {
					// create a default snippet step
					const defaultFirstStep: PipelineStepDef = DEFAULTS.createDefaultStep();
					errorHandles.catchable.push(defaultFirstStep);
				}
				return errorHandles.catchable;
			},
			findPortFromModel: () => model.getPort(CatchablePortModel.NAME) as CatchablePortModel,
			createPortFromModel: () => new CatchablePortModel()
		}
	].filter(({steps, ...rest}) => {
		return {steps: steps(), ...rest};
	}).filter(({steps}) => {
		return steps != null;
	}).map(({steps, findPortFromModel, createPortFromModel}) => {
		return createSubNodesOfSingleRoute({
			model, options, askSteps: steps, findPortFromModel, createPortFromModel
		});
	});
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
		const link = endNode.endOf(node);
		appendLink(link);
	});
	const directLink = model.next(endNode);
	appendLink(directLink);

	return endNode;
};
