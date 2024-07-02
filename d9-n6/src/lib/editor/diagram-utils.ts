import {DiagramModel, LinkModel, NodeModel} from '@projectstorm/react-diagrams';
import {createStepNode, findStepDef, setNodePosition} from '../configurable-model';
import {DEFAULTS} from '../constants';
import {
	FileDef,
	FileDefSerializer,
	FileDiagramDef,
	isPipelineDef,
	PipelineStepDef,
	PipelineStepDiagramDef
} from '../definition';
import {
	EndNodeModel,
	HandledNodeModel,
	JoinEndNodeModel,
	NextStepPortModel,
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

export class CustomDiagramModel extends DiagramModel {
	public addLink(link: LinkModel): LinkModel {
		if (this.isLocked()) {
			link.setLocked(true);
		}
		return super.addLink(link);
	}

	public addNode(node: NodeModel): NodeModel {
		if (this.isLocked()) {
			node.setLocked(true);
		}
		return super.addNode(node);
	}
}

export const createLockedDiagramModel = (): DiagramModel => {
	const model = new CustomDiagramModel();
	model.setLocked(true);
	return model;
};

export const createDiagramNodes = (file: FileDef, handlers: DiagramHandlers): DiagramModel => {
	const allNodes: Array<NodeModel> = [];
	const allLinks: Array<LinkModel> = [];

	const nodeHandlers: NodeHandlers = {
		// pending serialize
		onChange: () => handlers.onContentChange(() => handlers.serialize(file))
	};

	const startNode = new StartNodeModel(file, nodeHandlers);
	setNodePosition(startNode, () => askStartNodePosition(file));
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
				type: StepNodeEntityType.NORMAL, handlers: nodeHandlers,
				previousNode, linkPrevious: (node) => previousNode.next(node),
				appendNode: (...nodes) => allNodes.push(...nodes),
				appendLink: (...links) => allLinks.push(...links)
			});
		}, previousNode);
	} else {
		// step-sets or step
		// create a virtual node to represent, treat file def as step def
		const step = file as unknown as PipelineStepDef;
		previousNode = createStepNode(step, file, {
			type: StepNodeEntityType.START, handlers: nodeHandlers,
			previousNode, linkPrevious: (node) => previousNode.next(node),
			appendNode: (...nodes) => allNodes.push(...nodes),
			appendLink: (...links) => allLinks.push(...links)
		});
	}

	const endNode = new EndNodeModel(file, nodeHandlers);
	setNodePosition(endNode, () => askEndNodePosition(file));
	allNodes.push(endNode);
	const link = previousNode.next(endNode);
	allLinks.push(link);

	const model = createLockedDiagramModel();
	model.setLocked(true);
	model.addAll(...allNodes, ...allLinks);

	return model;
};

export const cloneDiagramNodes = (old: DiagramModel): DiagramModel => {
	const model = createLockedDiagramModel();
	model.setLocked(true);
	model.addAll(...old.getModels());
	return model;
};

export interface GridCell {
	node?: NodeModel;
	x: number;
	y: number;
	maxWidth: number;
	maxHeight: number;
	top: number;
	left: number;
}

/**
 * [x, y] is axis of given node, return last used y
 */
export const buildGrid = (node: NodeModel, grid: Array<Array<GridCell>>, x: number, y: number): number => {
	// compute sub step nodes
	let hasSubSteps = false;
	if (node instanceof StepNodeModel) {
		const {use} = node.step;
		const ports = findStepDef(use)?.findSubPorts(node) ?? [];
		ports.forEach((port, portIndex) => {
			// one port, one link
			const link = Object.values(port.getLinks())[0];
			// only the first one use the same row with parent
			// otherwise use next row
			y = y + (portIndex === 0 ? 0 : 1);
			hasSubSteps = true;
			const subNode = link.getTargetPort().getNode();
			// first sub step node is in the same row and next column with parent node
			grid[x + 1] = grid[x + 1] ?? [];
			grid[x + 1][y] = {
				node: subNode, x: subNode.getPosition().x, y: subNode.getPosition().y,
				maxWidth: -1, maxHeight: -1, top: -1, left: -1
			};
			y = buildGrid(subNode, grid, x + 1, y);
		});
	}
	// compute next step node
	const port = node.getPort(NextStepPortModel.NAME);
	if (port != null) {
		const links = port.getLinks();
		// one port, one link
		const link = Object.values(links)[0];
		const next = link.getTargetPort().getNode();
		grid[x] = grid[x] ?? [];
		if (hasSubSteps) {
			// next must be a join end node
			// place at same column (x), and use the last row with sub step nodes
			grid[x][y + 1] = {
				node: next, x: next.getPosition().x, y: next.getPosition().y,
				maxWidth: -1, maxHeight: -1, top: -1, left: -1
			};
			return buildGrid(next, grid, x, y + 1);
		} else if (next instanceof JoinEndNodeModel) {
			// no sub steps, but next is join end, means this is the last sub step, or some join end node
			// simply ignore, leave building work to its parent
			return y;
		} else {
			// standard process
			grid[x][y + 1] = {
				node: next, x: next.getPosition().x, y: next.getPosition().y,
				maxWidth: -1, maxHeight: -1, top: -1, left: -1
			};
			return buildGrid(next, grid, x, y + 1);
		}
	} else {
		// no next port
		return y;
	}
};

export const computeGrid = (grid: Array<Array<GridCell>>, top: number, left: number, rowGap: number, columnGap: number) => {
	let offsetX = left;
	let offsetY = top;
	const maxX = grid.length - 1;
	const maxY = grid.reduce((max, column) => Math.max(max, column.length - 1), 0);
	for (let x = 0; x <= maxX; x++) {
		const column = grid[x];
		new Array(maxY + 1).fill(1).forEach((v, y) => {
			if (column[y] == null) {
				column[y] = {x, y, maxWidth: -1, maxHeight: -1, top: -1, left: -1};
			}
		});
		const maxWidth = column.reduce((max, cell) => Math.max(max, cell.node?.width ?? 0), 0);
		offsetX = offsetX + (x === 0 ? 0 : (grid[x - 1][0].maxWidth + columnGap));
		column.forEach(cell => {
			cell.maxWidth = maxWidth;
			cell.left = cell.node == null ? (offsetX + maxWidth / 2) : (offsetX + (maxWidth - cell.node.width) / 2);
		});
	}
	for (let y = 0; y <= maxY; y++) {
		const row = grid.map(column => column[y]);
		const maxHeight = row.reduce((max, cell) => Math.max(max, cell.node?.height ?? 0), 0);
		offsetY = offsetY + (y === 0 ? 0 : (grid[0][y - 1].maxHeight + rowGap));
		row.forEach(cell => {
			cell.maxHeight = maxHeight;
			cell.top = cell.node == null ? (offsetY + maxHeight / 2) : (offsetY);
		});
	}
	grid.forEach(column => {
		column.forEach(cell => {
			if (cell.node != null) {
				cell.node.setPosition(cell.left, cell.top);
			}
		});
	});
};

export const createDiagramHandlers = (options: {
	serializer: FileDefSerializer;
	replace: (func: () => void, timeout: number) => void;
	syncContentToStateRef: (content: string) => string;
	notifyContentChanged: (content: string) => void;
}): DiagramHandlers => {
	const {serializer, replace, syncContentToStateRef, notifyContentChanged} = options;

	return {
		serialize: (def: FileDef) => serializer.stringify(def),
		onContentChange: (serialize: () => string) => {
			replace(() => {
				// sync to state ref first, in case somewhere outside force update widget
				// will compare the content with state ref
				const content = syncContentToStateRef(serialize());
				// and notify content changed
				notifyContentChanged(content);
			}, 100);
		}
	};
};