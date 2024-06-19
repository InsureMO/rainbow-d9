import {DiagramModel, LinkModel, NodeModel} from '@projectstorm/react-diagrams';
import {DEFAULTS} from '../constants';
import {FileDef, FileDiagramDef, isPipelineDef, PipelineStepDef, PipelineStepDiagramDef} from '../definition';
import {
	EndNodeModel,
	HandledNodeModel,
	NodeHandlers,
	StartNodeModel,
	StepNodeEntityType,
	StepNodeModel
} from '../diagram';

export interface DiagramHandlers {
	serialize: (def: FileDef) => string;
	onContentChange: (serialize: () => string) => void;
}

const START_X = 64;
const START_Y = 64;

export interface DiagramNodePosition {
	x: number;
	y: number;
	appointed: boolean;
}

export const askStartNodePosition = (def: FileDef): DiagramNodePosition => {
	const diagramDef = def as FileDiagramDef;
	if (diagramDef.$diagram?.$start?.$x != null && diagramDef.$diagram?.$start?.$y != null) {
		return {x: diagramDef.$diagram.$start.$x, y: diagramDef.$diagram.$start.$y, appointed: true};
	} else {
		return {x: START_X, y: START_Y, appointed: false};
	}
};
export const askEndNodePosition = (def: FileDef): DiagramNodePosition => {
	const diagramDef = def as FileDiagramDef;
	if (diagramDef.$diagram?.$end?.$x != null && diagramDef.$diagram?.$end?.$y != null) {
		return {x: diagramDef.$diagram.$end.$x, y: diagramDef.$diagram.$end.$y, appointed: true};
	} else {
		return {x: START_X, y: START_Y, appointed: false};
	}
};
export const askStepNodePosition = (def: PipelineStepDef): DiagramNodePosition => {
	if (isPipelineDef(def as unknown as FileDef)) {
		// step def might be possibly disguised by file def
		const diagramDef = def as unknown as FileDiagramDef;
		if (diagramDef.$diagram?.$virtualStep?.$x != null && diagramDef.$diagram?.$virtualStep?.$y != null) {
			return {x: diagramDef.$diagram.$virtualStep.$x, y: diagramDef.$diagram.$virtualStep.$y, appointed: true};
		} else {
			return {x: START_X, y: START_Y, appointed: false};
		}
	} else {
		const diagramDef = def as PipelineStepDiagramDef;
		if (diagramDef.$x != null && diagramDef.$y != null) {
			return {x: diagramDef.$x, y: diagramDef.$y, appointed: true};
		} else {
			return {x: START_X, y: START_Y, appointed: false};
		}
	}
};

const setPosition = (node: HandledNodeModel, position: () => DiagramNodePosition) => {
	const {x, y, appointed} = position();
	node.setPosition(x, y);
	node.setPositionAppointed(appointed);
};

export interface StepNodeCreationOptions {
	type: StepNodeEntityType;
	subOf?: PipelineStepDef;
	handlers: NodeHandlers;
	previousNode: HandledNodeModel;
	allNodes: Array<NodeModel>;
	allLinks: Array<LinkModel>;
}

export const createStepNode = (step: PipelineStepDef, file: FileDef, options: StepNodeCreationOptions): StepNodeModel => {
	const {
		type, subOf, handlers,
		previousNode, allNodes, allLinks
	} = options;
	const node = new StepNodeModel(step, file, {type, subOf, handlers});
	setPosition(node, () => askStepNodePosition(step));
	allNodes.push(node);
	const link = node.previous(previousNode);
	allLinks.push(link);
	return node;
};

export const createDiagramNodes = (file: FileDef, handlers: DiagramHandlers): DiagramModel => {
	const allNodes: Array<NodeModel> = [];
	const allLinks: Array<LinkModel> = [];

	const nodeHandlers: NodeHandlers = {
		// pending serialize
		onChange: () => handlers.onContentChange(() => handlers.serialize(file))
	};

	const startNode = new StartNodeModel(file, nodeHandlers);
	setPosition(startNode, () => askStartNodePosition(file));
	allNodes.push(startNode);

	let previousNode: HandledNodeModel = startNode;
	if (isPipelineDef(file)) {
		const steps = file.steps ?? [];
		if (steps.length === 0) {
			// create a default snippet step
			const step: PipelineStepDef = DEFAULTS.createDefaultStep();
			steps.push(step);
			// steps might be created, assign to anyway
			file.steps = steps;
		}
		previousNode = steps.reduce((previousNode, step) => {
			return createStepNode(step, file, {
				type: StepNodeEntityType.NORMAL, handlers: nodeHandlers, previousNode, allNodes, allLinks
			});
		}, previousNode);
	} else {
		// step-sets or step
		// create a virtual node to represent, treat file def as step def
		const step = file as unknown as PipelineStepDef;
		previousNode = createStepNode(step, file, {
			type: StepNodeEntityType.START, handlers: nodeHandlers, previousNode, allNodes, allLinks
		});
	}

	const endNode = new EndNodeModel(file, nodeHandlers);
	setPosition(endNode, () => askEndNodePosition(file));
	allNodes.push(endNode);
	const link = previousNode.next(endNode);
	allLinks.push(link);

	const model = new DiagramModel();
	model.addAll(...allNodes, ...allLinks);

	return model;
};
