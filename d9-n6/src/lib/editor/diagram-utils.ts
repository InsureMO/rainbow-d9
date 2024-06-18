import {DiagramModel, LinkModel, NodeModel} from '@projectstorm/react-diagrams';
import {FileDef, isPipelineDef, PipelineStepDef, StandardPipelineStepRegisterKey} from '../definition';
import {EndNodeModel, StartNodeModel, StepNodeEntity, StepNodeEntityType, StepNodeModel} from '../diagram';

export const createDiagramEntities = (def: FileDef): DiagramModel => {
	const START_X = 100;
	const START_Y = 100;
	const DEFAULT_Y_OFFSET = 400;

	const allNodes: Array<NodeModel> = [];
	const allLinks: Array<LinkModel> = [];

	const startNode = new StartNodeModel(def);
	startNode.setPosition(START_X, START_Y);
	allNodes.push(startNode);

	let previousNode: StartNodeModel | StepNodeModel = startNode, currentX = START_X, currentY = START_Y;
	if (isPipelineDef(def)) {
		const steps = def.steps ?? [];
		if (steps.length === 0) {
			// create a default snippet step
			const step: PipelineStepDef = {name: '', use: StandardPipelineStepRegisterKey.SNIPPET};
			steps.push(step);
		}
		steps.forEach(step => {
			currentY += DEFAULT_Y_OFFSET;
			const node = new StepNodeModel(new StepNodeEntity(step, StepNodeEntityType.NORMAL, def));
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
	const endNode = new EndNodeModel();
	endNode.setPosition(currentX, currentY);
	allNodes.push(endNode);
	const link = previousNode.next(endNode);
	allLinks.push(link);

	const model = new DiagramModel();
	model.addAll(...allNodes, ...allLinks);

	return model;
};
