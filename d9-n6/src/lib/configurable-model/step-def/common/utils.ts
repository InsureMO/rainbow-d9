import {LinkModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {DEFAULTS} from '../../../constants';
import {FileDef, PipelineStepDef} from '../../../definition';
import {
	HandledNodeModel,
	LinkExtras,
	NodeHandlers,
	OutgoingPortModel,
	StepNodeEntityType,
	StepNodeModel
} from '../../../diagram';
import {askStepNodePosition, DiagramNodePosition} from '../../../editor';
import {PlaygroundModuleAssistant} from '../../../types';
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
	assistant: Required<PlaygroundModuleAssistant>;
	previousNode: HandledNodeModel;
	linkPrevious: (node: StepNodeModel) => LinkModel;
	appendNode: (...nodes: Array<StepNodeModel>) => void;
	appendLink: (...links: Array<LinkModel>) => void;
}

export const createStepNode = (step: PipelineStepDef, file: FileDef, options: StepNodeCreationOptions): Undefinable<HandledNodeModel> => {
	const {
		type, subOf, handlers, assistant,
		linkPrevious, appendNode, appendLink
	} = options;
	const node = new StepNodeModel(step, file, {type, subOf, handlers, assistant});
	setNodePosition(node, () => askStepNodePosition(step));
	appendNode(node);
	const link = linkPrevious(node);
	appendLink(link);
	const endOfSub = DEFAULTS.createSubStepNodes(node, {appendNode, appendLink, handlers, assistant});
	return endOfSub == null ? node : endOfSub;
};

export const createLinkFromParent = (model: StepNodeModel) => {
	return (node: StepNodeModel,
	        findPortFromModel: () => OutgoingPortModel, createPortFromModel: () => OutgoingPortModel,
	        askLinkExtras?: () => Undefinable<LinkExtras>
	) => {
		let sourcePort = findPortFromModel();
		if (sourcePort == null) {
			sourcePort = createPortFromModel();
			model.addPort(sourcePort);
		}
		const link = sourcePort.createOutgoingLinkModel(askLinkExtras == null ? (void 0) : askLinkExtras());
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
	askFirstLinkExtras?: () => Undefinable<LinkExtras>;
}

/**
 * create sub nodes of single route, one step could have multiple routes
 */
export const createSubNodesOfSingleRoute = (options: CreateSubNodesOfSingleRouteOptions): Undefinable<HandledNodeModel> => {
	const {
		model, askSteps,
		options: {appendNode, appendLink, handlers, assistant},
		findPortFromModel, createPortFromModel, askFirstLinkExtras
	} = options;
	const steps = askSteps();
	if (steps == null || steps.length === 0) {
		return (void 0);
	}

	const createLinkFromModel = createLinkFromParent(model);
	const previousNode: HandledNodeModel = model;
	return (steps as Array<PipelineStepDef>).reduce((previousNode, step) => {
		const linkPrevious = previousNode === model
			? (node: StepNodeModel) => createLinkFromModel(node, findPortFromModel, createPortFromModel, askFirstLinkExtras)
			: (node: StepNodeModel) => previousNode.next(node);
		return createStepNode(step, model.file, {
			type: StepNodeEntityType.NORMAL, handlers, assistant, subOf: step,
			previousNode, linkPrevious,
			appendNode, appendLink
		});
	}, previousNode);
};
