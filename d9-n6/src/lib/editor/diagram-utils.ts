import {DiagramModel, LinkModel, NodeModel} from '@projectstorm/react-diagrams';
import {FileDef, isPipelineDef, PipelineStepDef, StandardPipelineStepRegisterKey} from '../definition';
import {
	EndNodeModel,
	NodeHandlers,
	StartNodeModel,
	StepNodeEntity,
	StepNodeEntityType,
	StepNodeModel
} from '../diagram';

export interface DiagramHandlers {
	serialize: (def: FileDef) => string;
	onContentChange: (serialize: () => string) => void;
}

export const createDiagramEntities = (def: FileDef, handlers: DiagramHandlers): DiagramModel => {
	const START_X = 100;
	const START_Y = 100;
	const DEFAULT_Y_OFFSET = 400;

	const allNodes: Array<NodeModel> = [];
	const allLinks: Array<LinkModel> = [];

	const nodeHandlers: NodeHandlers = {
		// pending serialize
		onChange: () => handlers.onContentChange(() => handlers.serialize(def))
	};

	const startNode = new StartNodeModel(def, nodeHandlers);
	startNode.setPosition(START_X, START_Y);
	allNodes.push(startNode);

	let previousNode: StartNodeModel | StepNodeModel = startNode;
	const currentX = START_X;
	let currentY = START_Y;
	if (isPipelineDef(def)) {
		const steps = def.steps ?? [];
		if (steps.length === 0) {
			// create a default snippet step
			const step: PipelineStepDef = {name: '', use: StandardPipelineStepRegisterKey.SNIPPET};
			steps.push(step);
			// steps might be created, assign to anyway
			def.steps = steps;
		}
		steps.forEach(step => {
			currentY += DEFAULT_Y_OFFSET;
			const node = new StepNodeModel(new StepNodeEntity(step, StepNodeEntityType.NORMAL, def), nodeHandlers);
			node.setPosition(currentX, currentY);
			allNodes.push(node);
			const link = node.previous(previousNode);
			allLinks.push(link);
			previousNode = node;
		});
	} else {
		// step-sets or step
	}

	currentY += DEFAULT_Y_OFFSET;
	const endNode = new EndNodeModel(def, nodeHandlers);
	endNode.setPosition(currentX, currentY);
	allNodes.push(endNode);
	const link = previousNode.next(endNode);
	allLinks.push(link);

	const model = new DiagramModel();
	model.addAll(...allNodes, ...allLinks);

	return model;
};
