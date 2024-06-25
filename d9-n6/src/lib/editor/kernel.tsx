import {CanvasWidget} from '@projectstorm/react-canvas-core';
import createEngine, {NodeModel} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {useForceUpdate, useThrottler, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useRef} from 'react';
import {FileDef, FileDefDeserializer, FileDefSerializer} from '../definition';
import {initEngine, NextStepPortModel, StartNodeModel} from '../diagram';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps, MarkdownContent} from '../types';
import {cloneDiagramNodes, createDiagramNodes, createLockedDiagramModel, DiagramHandlers} from './diagram-utils';
import {ErrorBoundary} from './error-boundary';
import {EditorWrapper, ParseError} from './widgets';

export enum EditorKernelDiagramStatus {
	IGNORED = 'ignored', FIRST_PAINT = 'first-paint', IN_SERVICE = 'in-service'
}

export interface EditorKernelRefState {
	engine: DiagramEngine;
	content?: string;
	serializer: FileDefSerializer;
	deserializer: FileDefDeserializer;
	def?: FileDef;
	message?: string;
	diagramStatus: EditorKernelDiagramStatus;
}

const createDiagramEngine = () => {
	const engine = createEngine();
	initEngine(engine);
	return engine;
};

const parseContent = (parser: FileDefDeserializer, content?: MarkdownContent): FileDef => {
	const def = parser.parse(content ?? '');
	// guard
	if (VUtils.isBlank(def.type)) {
		def.type = 'pipeline';
	}
	return def;
};

const createDiagramHandlers = (options: {
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

interface GridCell {
	node?: NodeModel;
	x: number;
	y: number;
	maxWidth: number;
	maxHeight: number;
	top: number;
	left: number;
}

const buildGrid = (previous: NodeModel, grid: Array<Array<GridCell>>, x: number, y: number) => {
	// TODO compute sub step nodes
	// compute next step node
	const port = previous.getPort(NextStepPortModel.NAME);
	if (port != null) {
		const links = port.getLinks();
		const link = Object.values(links)[0];
		const next = link.getTargetPort().getNode();
		grid[x] = grid[x] ?? [];
		grid[x][y] = {
			node: next, x: next.getPosition().x, y: next.getPosition().y,
			maxWidth: -1, maxHeight: -1, top: -1, left: -1
		};
		buildGrid(next, grid, x, y + 1);
	}
};

const computeGrid = (grid: Array<Array<GridCell>>, top: number, left: number, rowGap: number, columnGap: number) => {
	let offsetX = left;
	let offsetY = top;
	const maxX = grid.length - 1;
	const maxY = grid.reduce((max, column) => Math.max(max, column.length - 1), 0);
	for (let x = 0; x <= maxX; x++) {
		const column = grid[x];
		new Array(maxY + 1).fill(1).forEach(y => {
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
		offsetY = offsetY + (y === 0 ? 0 : (grid[0][y - 1].maxHeight + columnGap));
		row.forEach(cell => {
			cell.maxHeight = maxHeight;
			cell.top = cell.node == null ? (offsetY + maxHeight / 2) : (offsetY + (maxHeight - cell.node.height) / 2);
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

export const EditorKernel = (props: EditorProps) => {
	const {content, serializer, deserializer} = props;

	const wrapperRef = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	const stateRef = useRef<EditorKernelRefState>((() => {
		const engine = createDiagramEngine();
		try {
			const def = parseContent(deserializer, content ?? '');
			const handlers = createDiagramHandlers({
				serializer, replace, syncContentToStateRef: (content: string) => {
					stateRef.current.content = content;
					return content;
				}, notifyContentChanged: (content: string) => {
					fire(PlaygroundEventTypes.CONTENT_CHANGED, content);
				}
			});
			const model = createDiagramNodes(def, handlers);
			engine.setModel(model);
			return {
				engine, content, serializer, deserializer, def,
				diagramStatus: EditorKernelDiagramStatus.FIRST_PAINT
			};
		} catch (e) {
			console.error(e);
			engine.setModel(createLockedDiagramModel());
			return {
				engine, content, serializer, deserializer,
				message: e.message,
				diagramStatus: EditorKernelDiagramStatus.IGNORED
			};
		}
	})());
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (serializer === stateRef.current.serializer
			&& deserializer === stateRef.current.deserializer
			&& content === stateRef.current.content) {
			return;
		}
		try {
			const def = parseContent(deserializer, content ?? '');
			stateRef.current.content = content;
			stateRef.current.serializer = serializer;
			stateRef.current.deserializer = deserializer;
			stateRef.current.def = def;
			const handlers = createDiagramHandlers({
				serializer, replace, syncContentToStateRef: (content: string) => {
					stateRef.current.content = content;
					return content;
				}, notifyContentChanged: (content: string) => {
					fire(PlaygroundEventTypes.CONTENT_CHANGED, content);
				}
			});
			const model = createDiagramNodes(def, handlers);
			stateRef.current.engine.setModel(model);
			delete stateRef.current.message;
			stateRef.current.diagramStatus = EditorKernelDiagramStatus.FIRST_PAINT;
		} catch (e) {
			console.error(e);
			stateRef.current.content = content;
			stateRef.current.serializer = serializer;
			stateRef.current.deserializer = deserializer;
			delete stateRef.current.def;
			// replace with empty diagram model
			stateRef.current.engine.setModel(createLockedDiagramModel());
			stateRef.current.message = e.message;
			stateRef.current.diagramStatus = EditorKernelDiagramStatus.IGNORED;
		}
		forceUpdate();
	}, [fire, replace, forceUpdate, serializer, deserializer, content]);
	useEffect(() => {
		if (EditorKernelDiagramStatus.FIRST_PAINT !== stateRef.current.diagramStatus) {
			return;
		}

		// re-calculate node positions
		const grid: Array<Array<GridCell>> = [];
		const nodes = stateRef.current.engine.getModel().getNodes();
		const startNode = nodes.find(node => node instanceof StartNodeModel);
		grid[0] = grid[0] ?? [];
		grid[0][0] = {
			node: startNode, x: startNode.getPosition().x, y: startNode.getPosition().y,
			maxWidth: -1, maxHeight: -1, top: -1, left: -1
		};
		buildGrid(startNode, grid, 0, 1);
		computeGrid(grid, 64, 64, 64, 64);
		// must reset model, otherwise links might not be repositioned, don't know why.
		stateRef.current.engine.setModel(cloneDiagramNodes(stateRef.current.engine.getModel()));
		stateRef.current.diagramStatus = EditorKernelDiagramStatus.IN_SERVICE;
		forceUpdate();
	}, [forceUpdate, stateRef.current.diagramStatus]);

	if (VUtils.isNotBlank(stateRef.current.message)) {
		return <EditorWrapper data-diagram-status={EditorKernelDiagramStatus.IGNORED}>
			<ParseError>{stateRef.current.message}</ParseError>
		</EditorWrapper>;
	} else if (VUtils.isBlank(stateRef.current.content)) {
		return <EditorWrapper data-diagram-status={EditorKernelDiagramStatus.IGNORED}>
			<ParseError>{Labels.NoContent}</ParseError>
		</EditorWrapper>;
	} else if (stateRef.current.def == null) {
		return <EditorWrapper data-diagram-status={EditorKernelDiagramStatus.IGNORED}>
			<ParseError>{Labels.NoDefParsed}</ParseError>
		</EditorWrapper>;
	}

	try {
		return <EditorWrapper data-diagram-status={stateRef.current.diagramStatus}
		                      data-diagram-locked={stateRef.current.engine.getModel().isLocked()}
		                      ref={wrapperRef}>
			{/**
			 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			 @ts-ignore */}
			<ErrorBoundary content={content}>
				<CanvasWidget engine={stateRef.current.engine} className="o23-playground-editor-content"/>
			</ErrorBoundary>
		</EditorWrapper>;
	} catch (error) {
		return <EditorWrapper data-diagram-status={EditorKernelDiagramStatus.IGNORED} ref={wrapperRef}>
			<ParseError>{(error as Error).message || Labels.ParseError}</ParseError>
		</EditorWrapper>;
	}
};