import {CanvasWidget} from '@projectstorm/react-canvas-core';
import createEngine from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {useForceUpdate, useThrottler, VUtils} from '@rainbow-d9/n1';
import dom2image from 'dom-to-image';
import React, {useEffect, useRef} from 'react';
import {DEFAULTS} from '../constants';
import {FileDef, FileDefDeserializer, FileDefSerializer} from '../definition';
import {initEngine, StartNodeModel} from '../diagram';
import {DownloadImage, FitCanvas, OriginSize, ZoomIn, ZoomOut} from '../icons';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps, MarkdownContent} from '../types';
import {
	buildGrid,
	cloneDiagramNodes,
	computeGrid,
	createDiagramHandlers,
	createDiagramNodes,
	createLockedDiagramModel,
	GridCell
} from './diagram-utils';
import {ErrorBoundary} from './error-boundary';
import {EditorToolbar, EditorToolbarButton, EditorWrapper, ParseError} from './widgets';

export enum EditorKernelDiagramStatus {
	IGNORED = 'ignored', PAINT = 'paint', IN_SERVICE = 'in-service'
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
	const engine = createEngine({
		registerDefaultPanAndZoomCanvasAction: false,
		registerDefaultZoomCanvasAction: false
	});
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
				diagramStatus: EditorKernelDiagramStatus.PAINT
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
			stateRef.current.diagramStatus = EditorKernelDiagramStatus.PAINT;
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
		if (EditorKernelDiagramStatus.PAINT !== stateRef.current.diagramStatus) {
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
		// [0, 0] is hold by start node
		buildGrid(startNode, grid, 0, 0);
		const {startTop, startLeft, rowGap, columnGap} = DEFAULTS.diagram;
		computeGrid(grid, startTop, startLeft, rowGap, columnGap);
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

	const zoomTo = (factor: number) => {
		const engine = stateRef.current.engine;
		engine.getModel().setZoomLevel(factor);
		engine.repaintCanvas();
	};
	const onZoomInClicked = () => {
		zoomTo(stateRef.current.engine.getModel().getZoomLevel() + 5);
	};
	const onZoomOutClicked = () => {
		zoomTo(stateRef.current.engine.getModel().getZoomLevel() - 5);
	};
	const onOriginSizeClicked = () => {
		zoomTo(100);
	};
	const onFitCanvasClicked = () => {
		stateRef.current.engine.zoomToFit();
	};
	const onDownloadImageClicked = async () => {
		const node = wrapperRef.current.querySelector('div.o23-playground-editor-content') as HTMLDivElement;
		node.style.overflow = 'visible';
		// noinspection SpellCheckingInspection
		const dataUrl = await dom2image.toPng(node, {quality: 1, bgcolor: 'white'});
		node.style.overflow = '';
		const link = document.createElement('a');
		link.download = `${stateRef.current.def?.code || 'no-code'}-diagram.png`;
		link.href = dataUrl;
		link.click();
	};

	try {
		return <EditorWrapper data-diagram-status={stateRef.current.diagramStatus}
		                      data-diagram-locked={stateRef.current.engine.getModel().isLocked()}
		                      ref={wrapperRef}>
			{/**
			 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			 @ts-ignore */}
			<ErrorBoundary content={content}>
				<CanvasWidget engine={stateRef.current.engine} className="o23-playground-editor-content"/>
				<EditorToolbar>
					<EditorToolbarButton onClick={onZoomInClicked}><ZoomIn/></EditorToolbarButton>
					<EditorToolbarButton onClick={onZoomOutClicked}><ZoomOut/></EditorToolbarButton>
					<EditorToolbarButton onClick={onOriginSizeClicked}><OriginSize/></EditorToolbarButton>
					<EditorToolbarButton onClick={onFitCanvasClicked}><FitCanvas/></EditorToolbarButton>
					<EditorToolbarButton onClick={onDownloadImageClicked}><DownloadImage/></EditorToolbarButton>
				</EditorToolbar>
			</ErrorBoundary>
		</EditorWrapper>;
	} catch (error) {
		return <EditorWrapper data-diagram-status={EditorKernelDiagramStatus.IGNORED} ref={wrapperRef}>
			<ParseError>{(error as Error).message || Labels.ParseError}</ParseError>
		</EditorWrapper>;
	}
};