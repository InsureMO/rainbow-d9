import {SelectingState, SelectionBoxLayerFactory} from '@projectstorm/react-canvas-core';
import {DiagramModel, State} from '@projectstorm/react-diagrams';
import {DiagramEngine, LinkLayerFactory, NodeLayerFactory} from '@projectstorm/react-diagrams-core';
import {
	DefaultLabelFactory,
	DefaultLinkFactory,
	DefaultNodeFactory,
	DefaultPortFactory
} from '@projectstorm/react-diagrams-defaults';
import {PathFindingLinkFactory} from '@projectstorm/react-diagrams-routing';
import {ThrottlerFunctions, Undefinable, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import {MutableRefObject, useEffect} from 'react';
import {DEFAULTS} from '../constants';
import {FileDef, FileDefDeserializer, FileDefSerializer} from '../definition';
import {EndNodeModel, initEngine, StartNodeModel} from '../diagram';
import {MarkdownContent, PlaygroundModuleAssistant} from '../types';
import {
	buildGrid,
	cloneDiagramNodes,
	computeGrid,
	createDiagramHandlers,
	createDiagramNodes,
	createLockedDiagramModel,
	GridCell
} from './diagram-utils';

export enum EditorKernelDiagramStatus {
	IGNORED = 'ignored',
	// paint, always like initializing
	PAINT = 'paint',
	// paint, keep palette offset and scale
	PAINT_ON_POSITION = 'paint-on-position',
	IN_SERVICE = 'in-service'
}

export interface EditorKernelRefState {
	engine: DiagramEngine;
	/**
	 * double buffer. to paint diagram needs to render all nodes first, to gather their size first,
	 * therefore, use diagram status to control the rendering order:
	 * 1. render nodes to gather their sizes,
	 * 2. compute positions and render again.
	 */
	engineBackend: DiagramEngine;
	content?: string;
	serializer: FileDefSerializer;
	deserializer: FileDefDeserializer;
	def?: FileDef;
	message?: string;
	diagramStatus: EditorKernelDiagramStatus;
	canvasHeight?: number;
	canvasWidth?: number;
	canvasZoom?: number;
}

export const parseContent = (parser: FileDefDeserializer, content?: MarkdownContent): FileDef => {
	const def = parser.parse(content ?? '');
	// guard
	if (VUtils.isBlank(def.type)) {
		def.type = 'pipeline';
	}
	return def;
};

export const createDiagramModel = (options: {
	def: FileDef;
	serializer: FileDefSerializer;
	assistant?: PlaygroundModuleAssistant;
	replace: ThrottlerFunctions['replace'];
	writeContentToState: (content: string) => void;
	onContentChanged: (content: string) => void;
}) => {
	const {
		def,
		serializer, assistant, replace,
		writeContentToState, onContentChanged
	} = options;
	const handlers = createDiagramHandlers({
		serializer, assistant, replace,
		syncContentToStateRef: (content: string) => {
			writeContentToState(content);
			return content;
		},
		notifyContentChanged: onContentChanged
	});
	return createDiagramNodes(def, handlers);
};

/** copy from DefaultDiagramState */
export class DiagramState extends State {
	public constructor() {
		super({name: 'default-diagrams'});
		this.childStates = [new SelectingState()];
		// ignore all dragging related actions
	}
}

export const createDiagramEngine = () => {
	// copy from createEngine
	const engine = new DiagramEngine({
		registerDefaultPanAndZoomCanvasAction: false,
		registerDefaultZoomCanvasAction: false
	});
	// register model factories
	engine.getLayerFactories().registerFactory(new NodeLayerFactory());
	engine.getLayerFactories().registerFactory(new LinkLayerFactory());
	engine.getLayerFactories().registerFactory(new SelectionBoxLayerFactory());
	engine.getLabelFactories().registerFactory(new DefaultLabelFactory());
	engine.getNodeFactories().registerFactory(new DefaultNodeFactory());
	engine.getLinkFactories().registerFactory(new DefaultLinkFactory());
	engine.getLinkFactories().registerFactory(new PathFindingLinkFactory());
	engine.getPortFactories().registerFactory(new DefaultPortFactory());
	// register the default interaction behaviours
	engine.getStateMachine().pushState(new DiagramState());
	initEngine(engine);
	const model = createLockedDiagramModel();
	model.setLocked(true);
	engine.setModel(model);
	return engine;
};

export interface FirstPaintOptions {
	content?: string;
	serializer: FileDefSerializer;
	deserializer: FileDefDeserializer;
	assistant?: PlaygroundModuleAssistant;
	replace: ThrottlerFunctions['replace'];
	writeContentToState: (content: string) => void;
	onContentChanged: (content?: string) => void;
}

export const firstPaint = (options: FirstPaintOptions): EditorKernelRefState => {
	const {
		content,
		serializer, deserializer, assistant,
		replace, writeContentToState, onContentChanged
	} = options;

	const engine = createDiagramEngine();
	const engineBackend = createDiagramEngine();
	try {
		// first round
		const def = parseContent(deserializer, content ?? '');
		const model = createDiagramModel({
			def, serializer, assistant, replace, writeContentToState, onContentChanged
		});
		engineBackend.setModel(model);
		return {
			engine, engineBackend,
			content, def, serializer, deserializer,
			diagramStatus: EditorKernelDiagramStatus.PAINT
		};
	} catch (e) {
		console.error(e);
		engine.setModel(createLockedDiagramModel());
		return {
			engine, engineBackend, content, serializer, deserializer,
			message: e.message, diagramStatus: EditorKernelDiagramStatus.IGNORED
		};
	}
};

export interface PaintOptions {
	content: () => Undefinable<string>;
	serializer: () => FileDefSerializer;
	deserializer: () => FileDefDeserializer;
	assistant: () => Undefinable<PlaygroundModuleAssistant>;
	stateRef: MutableRefObject<EditorKernelRefState>;
	replace: ThrottlerFunctions['replace'];
	onStateContentChanged: () => Promise<void>;
	onContentChanged: (content?: string) => void;
}

export const paintErrorDiagram = (options: {
	error: Error;
	stateRef: MutableRefObject<EditorKernelRefState>;
	content: string;
	serializer: FileDefSerializer;
	deserializer: FileDefDeserializer;
}) => {
	const {error, stateRef, content, serializer, deserializer} = options;

	console.error(error);
	stateRef.current.content = content;
	stateRef.current.serializer = serializer;
	stateRef.current.deserializer = deserializer;
	delete stateRef.current.def;
	// replace with empty diagram model
	stateRef.current.engine.setModel(createLockedDiagramModel());
	stateRef.current.engineBackend.setModel(createLockedDiagramModel());
	stateRef.current.message = error.message;
	stateRef.current.diagramStatus = EditorKernelDiagramStatus.IGNORED;
	stateRef.current.canvasZoom = 1;
	delete stateRef.current.canvasWidth;
	delete stateRef.current.canvasHeight;
};

export const computeCanvasSize = (model: DiagramModel): { width?: number; height?: number } => {
	return (model.getNodes() ?? []).reduce((size, node) => {
		if (node instanceof EndNodeModel) {
			size.height = node.getY() + node.height + DEFAULTS.diagram.startTop;
		}
		const right = node.getX() + node.width + DEFAULTS.diagram.startLeft;
		if (size.width == null || right > size.width) {
			size.width = right;
		}
		return size;
	}, {} as { width?: number; height?: number });
};

/**
 * prepare model, set as ready for paint
 */
export const paint = (options: PaintOptions) => {
	const {stateRef, replace, onStateContentChanged, onContentChanged} = options;

	const content = options.content();
	const serializer = options.serializer();
	const deserializer = options.deserializer();
	const assistant = options.assistant();

	try {
		const def = parseContent(deserializer, content ?? '');
		const model = createDiagramModel({
			def,
			serializer, assistant, replace,
			writeContentToState: (content: string) => {
				stateRef.current.content = content;
				(async () => await onStateContentChanged())();
			},
			onContentChanged
		});
		stateRef.current.content = content;
		stateRef.current.serializer = serializer;
		stateRef.current.deserializer = deserializer;
		stateRef.current.def = def;
		// reset zoom to 1
		stateRef.current.canvasZoom = 1;
		const {width, height} = computeCanvasSize(model);
		stateRef.current.canvasWidth = width;
		stateRef.current.canvasHeight = height;
		stateRef.current.engineBackend.setModel(model);
		delete stateRef.current.message;
		stateRef.current.diagramStatus = EditorKernelDiagramStatus.PAINT;
	} catch (e) {
		paintErrorDiagram({error: e, stateRef, content, serializer, deserializer});
	}
};

export interface RepaintOptions {
	assistant: () => Undefinable<PlaygroundModuleAssistant>;
	stateRef: MutableRefObject<EditorKernelRefState>;
	replace: ThrottlerFunctions['replace'];
	onStateContentChanged: () => Promise<void>;
	onContentChanged: (content?: string) => void;
}

export const repaint = (options: RepaintOptions) => {
	const {stateRef, replace, onStateContentChanged, onContentChanged} = options;

	const def = stateRef.current.def;
	const serializer = stateRef.current.serializer;
	const assistant = options.assistant();

	try {
		const model = createDiagramModel({
			def,
			serializer, assistant, replace,
			writeContentToState: (content: string) => {
				stateRef.current.content = content;
				(async () => await onStateContentChanged())();
			},
			onContentChanged
		});
		// don't reset size, just reset model in backend and change status
		// size will be computed in next paint
		stateRef.current.engineBackend.setModel(model);
		stateRef.current.diagramStatus = EditorKernelDiagramStatus.PAINT_ON_POSITION;
	} catch (e) {
		paintErrorDiagram({
			error: e, stateRef,
			content: stateRef.current.content,
			serializer: stateRef.current.serializer, deserializer: stateRef.current.deserializer
		});
	}
};

export const usePaint = (stateRef: MutableRefObject<EditorKernelRefState>) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		// compute the node positions, run when status is PAINT, and set status to IN_SERVICE when finished
		if (![
			EditorKernelDiagramStatus.PAINT, EditorKernelDiagramStatus.PAINT_ON_POSITION
		].includes(stateRef.current.diagramStatus)) {
			return;
		}

		const backendModel = stateRef.current.engineBackend.getModel();
		// re-calculate node positions
		const grid: Array<Array<GridCell>> = [];
		const nodes = backendModel.getNodes();
		const startNode = nodes.find(node => node instanceof StartNodeModel);
		grid[0] = grid[0] ?? [];
		grid[0][0] = {
			node: startNode, x: startNode.getPosition().x, y: startNode.getPosition().y,
			maxWidth: -1, maxHeight: -1, top: -1, left: -1
		};
		// [0, 0] is hold by start node
		buildGrid(startNode, grid, 0, 0);
		const {startTop, startLeft, rowGap, columnGap} = DEFAULTS.diagram;
		computeGrid(grid, startTop, startLeft, rowGap, columnGap);
		// must reset model, otherwise links might not be repositioned, don't know why.
		const newModel = cloneDiagramNodes(backendModel);
		// leave canvas zoom as it is, but need to copy it to the new model
		newModel.setZoomLevel((stateRef.current.canvasZoom ?? 1) * 100);
		// reset size only
		const {width, height} = computeCanvasSize(newModel);
		stateRef.current.canvasWidth = width;
		stateRef.current.canvasHeight = height;
		stateRef.current.engine.setModel(newModel);
		// clear backend model to save dom performance
		stateRef.current.engineBackend.setModel(createLockedDiagramModel());
		stateRef.current.diagramStatus = EditorKernelDiagramStatus.IN_SERVICE;
		forceUpdate();
	}, [forceUpdate, stateRef, stateRef.current.diagramStatus]);
};
