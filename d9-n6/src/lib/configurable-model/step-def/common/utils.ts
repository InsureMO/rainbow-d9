import {LinkModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {DEFAULTS} from '../../../constants';
import {FileDef, PipelineStepDef} from '../../../definition';
import {HandledNodeModel, NodeHandlers, OutgoingPortModel, StepNodeEntityType, StepNodeModel} from '../../../diagram';
import {askStepNodePosition, DiagramNodePosition} from '../../../editor';
import {CreateSubNodesOptions} from '../../types';
import {FirstSubStepPortModel} from './port-widgets';

export const setNodePosition = (node: HandledNodeModel, position: () => DiagramNodePosition) => {
	const {x, y, appointed} = position();
	node.setPosition(x, y);
	node.setPositionAppointed(appointed);
};

export interface StepNodeCreationOptions {
	type: StepNodeEntityType;
	subOf?: PipelineStepDef;
	handlers: NodeHandlers;
	previousNode: HandledNodeModel;
	linkPrevious: (node: StepNodeModel) => LinkModel;
	appendNode: (...nodes: Array<StepNodeModel>) => void;
	appendLink: (...links: Array<LinkModel>) => void;
}

export const createStepNode = (step: PipelineStepDef, file: FileDef, options: StepNodeCreationOptions): Undefinable<HandledNodeModel> => {
	const {
		type, subOf, handlers,
		linkPrevious, appendNode, appendLink
	} = options;
	const node = new StepNodeModel(step, file, {type, subOf, handlers});
	setNodePosition(node, () => askStepNodePosition(step));
	appendNode(node);
	const link = linkPrevious(node);
	appendLink(link);
	const endOfSub = DEFAULTS.createSubStepNodes(node, {appendNode, appendLink, handlers});
	return endOfSub == null ? node : endOfSub;
};

export const createLinkFromParent = (model: StepNodeModel) => {
	return (node: StepNodeModel, findPortFromModel: () => OutgoingPortModel, createPortFromModel: () => OutgoingPortModel) => {
		let sourcePort = findPortFromModel();
		if (sourcePort == null) {
			sourcePort = createPortFromModel();
			model.addPort(sourcePort);
		}
		const link = sourcePort.createOutgoingLinkModel();
		let targetPort = node.getPort(FirstSubStepPortModel.NAME);
		if (targetPort == null) {
			targetPort = new FirstSubStepPortModel();
			node.addPort(targetPort);
		}
		link.setTargetPort(targetPort);
		node.asFirstSubStep(true);
		return link;
	};
};

export interface CreateSubNodesOfSingleRouteOptions {
	model: StepNodeModel;
	askSteps: () => Undefinable<Array<PipelineStepDef>>;
	options: CreateSubNodesOptions;
	findPortFromModel: () => OutgoingPortModel;
	createPortFromModel: () => OutgoingPortModel;
}

/**
 * create sub nodes of single route, one step could have multiple routes
 */
export const createSubNodesOfSingleRoute = (options: CreateSubNodesOfSingleRouteOptions): Undefinable<HandledNodeModel> => {
	const {
		model, askSteps,
		options: {appendNode, appendLink, handlers}, findPortFromModel, createPortFromModel
	} = options;
	const steps = askSteps();
	if (steps == null || steps.length === 0) {
		return (void 0);
	}

	const createLinkFromModel = createLinkFromParent(model);
	const previousNode: HandledNodeModel = model;
	return (steps as Array<PipelineStepDef>).reduce((previousNode, step) => {
		const linkPrevious = previousNode === model
			? (node: StepNodeModel) => createLinkFromModel(node, findPortFromModel, createPortFromModel)
			: (node: StepNodeModel) => previousNode.next(node);
		return createStepNode(step, model.file, {
			type: StepNodeEntityType.NORMAL, handlers, subOf: step,
			previousNode, linkPrevious,
			appendNode, appendLink
		});
	}, previousNode);
};