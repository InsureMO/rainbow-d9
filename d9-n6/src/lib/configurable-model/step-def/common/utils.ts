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
	StepNodeModel,
	StepNodeModelOptions
} from '../../../diagram';
import {askStepNodePosition, DiagramNodePosition} from '../../../editor';
import {PlaygroundDecorator, PlaygroundModuleAssistant} from '../../../types';
import {CreateSubNodesOptions, NodeOperators} from '../../types';
import {FirstSubStepPortModel} from './port-widgets';

export const setNodePosition = (node: HandledNodeModel, position: () => DiagramNodePosition) => {
	const {x, y, appointed} = position();
	node.setPosition(x, y);
	node.setPositionAppointed(appointed);
};

export interface StepNodeCreationOptions {
	type: StepNodeModelOptions['type'];
	subOf: StepNodeModelOptions['subOf'];
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
	decorator?: PlaygroundDecorator;
	previousNode: HandledNodeModel;
	linkPrevious: (node: StepNodeModel) => LinkModel;
	appendNode: (...nodes: Array<StepNodeModel>) => void;
	appendLink: (...links: Array<LinkModel>) => void;
}

export const createStepNode = (step: PipelineStepDef, file: FileDef, options: StepNodeCreationOptions): Undefinable<HandledNodeModel> => {
	const {
		type, subOf, handlers, assistant, decorator,
		linkPrevious, appendNode, appendLink
	} = options;
	const node = new StepNodeModel(step, file, {type, subOf, handlers, assistant, decorator});
	setNodePosition(node, () => askStepNodePosition(step));
	appendNode(node);
	const link = linkPrevious(node);
	appendLink(link);
	const endOfSub = DEFAULTS.createSubStepNodes(node, {appendNode, appendLink, handlers, assistant, decorator});
	return endOfSub == null ? node : endOfSub;
};

export type FindPortFromModel = (model: StepNodeModel) => OutgoingPortModel;
export type CreatePortFromModel = (model: StepNodeModel) => OutgoingPortModel;
export type AskFirstLinkExtras = () => Undefinable<LinkExtras>;

export interface CreateLinkFromParentOptions {
	node: StepNodeModel;
	findPortFromModel: FindPortFromModel;
	createPortFromModel: CreatePortFromModel;
	askLinkExtras?: AskFirstLinkExtras;
}

export type CreateLinkFromParent = (options: CreateLinkFromParentOptions) => LinkModel;
export type CreateLink = (sourcePort: OutgoingPortModel, askLinkExtras?: CreateLinkFromParentOptions['askLinkExtras']) => LinkModel;

export const askFirstLinkCreate = (model: StepNodeModel, createLink: CreateLink): CreateLinkFromParent => {
	return (options: CreateLinkFromParentOptions) => {
		const {node, findPortFromModel, createPortFromModel, askLinkExtras} = options;
		let sourcePort = findPortFromModel(model);
		if (sourcePort == null) {
			sourcePort = createPortFromModel(model);
			model.addPort(sourcePort);
		}
		const link = createLink(sourcePort, askLinkExtras);
		let targetPort = node.getPort(FirstSubStepPortModel.NAME);
		if (targetPort == null) {
			targetPort = new FirstSubStepPortModel();
			node.addPort(targetPort);
		}
		link.setTargetPort(targetPort);
		node.asFirstSubStep();
		return link;
	};
};
export const askFirstLinkFromParentCreate = (model: StepNodeModel): CreateLinkFromParent => {
	return askFirstLinkCreate(model, (sourcePort: OutgoingPortModel, askLinkExtras?: CreateLinkFromParentOptions['askLinkExtras']): LinkModel => {
		return sourcePort.createOutgoingLinkModel(askLinkExtras == null ? (void 0) : askLinkExtras());
	});
};

export interface CreateSubNodesOfSingleRouteOptions {
	model: StepNodeModel;
	askSteps: () => Undefinable<Array<PipelineStepDef>>;
	options: CreateSubNodesOptions;
	findPortFromModel: FindPortFromModel;
	createPortFromModel: CreatePortFromModel;
	askFirstLinkExtras?: AskFirstLinkExtras;
}

/**
 * create sub nodes of single route, one step could have multiple routes
 */
export const createSubNodesOfSingleRoute = (options: CreateSubNodesOfSingleRouteOptions): Undefinable<HandledNodeModel> => {
	const {
		model, askSteps,
		options: {appendNode, appendLink, handlers, assistant, decorator},
		findPortFromModel, createPortFromModel, askFirstLinkExtras
	} = options;
	const steps = askSteps();
	if (steps == null || steps.length === 0) {
		return (void 0);
	}

	const createLinkFromModel = askFirstLinkFromParentCreate(model);
	const previousNode: HandledNodeModel = model;
	return (steps as Array<PipelineStepDef>).reduce((previousNode, step) => {
		const linkPrevious = previousNode === model
			? (node: StepNodeModel) => createLinkFromModel({
				node, findPortFromModel, createPortFromModel, askLinkExtras: askFirstLinkExtras
			})
			: (node: StepNodeModel) => previousNode.next(node);
		return createStepNode(step, model.file, {
			type: StepNodeEntityType.NORMAL, handlers, assistant, decorator, subOf: model.step,
			previousNode, linkPrevious,
			appendNode, appendLink
		});
	}, previousNode);
};

export const createNodeOperatorsForStep =
	<F extends PipelineStepDef>(steps: Array<PipelineStepDef>, removeAnyway: boolean, operators?: NodeOperators<F>): Pick<NodeOperators<F>, 'prependStep' | 'appendStep' | 'remove'> => {
		operators = operators ?? {};
		operators.prependStep = (node: StepNodeModel, def: F) => {
			const index = steps.indexOf(def);
			if (index === 0) {
				steps.unshift(node.assistant.createDefaultStep());
			} else {
				steps.splice(index, 0, node.assistant.createDefaultStep());
			}
			node.handlers.onChange();
		};
		operators.appendStep = (node: StepNodeModel, def: F) => {
			const index = steps.indexOf(def);
			if (index === steps.length - 1) {
				steps.push(node.assistant.createDefaultStep());
			} else {
				steps.splice(index + 1, 0, node.assistant.createDefaultStep());
			}
			node.handlers.onChange();
		};
		if (removeAnyway || steps.length > 1) {
			operators.remove = (node: StepNodeModel, def: F) => {
				steps.splice(steps.indexOf(def), 1);
				node.handlers.onChange();
			};
		}

		return operators;
	};