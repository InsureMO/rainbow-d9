import {LinkModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {DEFAULTS} from '../../../constants';
import {FileDef, PipelineStepDef} from '../../../definition';
import {HandledNodeModel, NodeHandlers, StepNodeEntityType, StepNodeModel} from '../../../diagram';
import {askStepNodePosition, DiagramNodePosition} from '../../../editor';

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
	appendNode: (...nodes: Array<StepNodeModel>) => void;
	appendLink: (...links: Array<LinkModel>) => void;
}

export const createStepNode = (step: PipelineStepDef, file: FileDef, options: StepNodeCreationOptions): Undefinable<HandledNodeModel> => {
	const {
		type, subOf, handlers,
		previousNode, appendNode, appendLink
	} = options;
	const node = new StepNodeModel(step, file, {type, subOf, handlers});
	setNodePosition(node, () => askStepNodePosition(step));
	appendNode(node);
	const link = node.previous(previousNode);
	appendLink(link);
	const endOfSub = DEFAULTS.createSubStepNodes(node, {appendNode, appendLink, handlers});
	return endOfSub == null ? node : endOfSub;
};
