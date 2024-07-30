import {CanvasWidget} from '@projectstorm/react-canvas-core';
import createEngine from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {ThrottlerFunctions, Undefinable, useForceUpdate, useThrottler, VUtils} from '@rainbow-d9/n1';
import React, {MutableRefObject, useEffect, useRef} from 'react';
import {DEFAULTS} from '../constants';
import {FileDef, FileDefDeserializer, FileDefSerializer} from '../definition';
import {initEngine, StartNodeModel} from '../diagram';
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
import {Toolbar} from './toolbar';
import {EditorWrapper, ParseError} from './widgets';

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

const repaint = (options: {
	serializer: () => FileDefSerializer;
	deserializer: () => FileDefDeserializer;
	content: () => Undefinable<string>;
	stateRef: MutableRefObject<EditorKernelRefState>;
	replace: ThrottlerFunctions['replace'];
	onStateContentChanged: () => Promise<void>;
	onContentChanged: (content?: string) => void;
}) => {
	const {stateRef, replace, onStateContentChanged, onContentChanged} = options;

	const content = options.content();
	const serializer = options.serializer();
	const deserializer = options.deserializer();

	try {
		const def = parseContent(deserializer, content ?? '');
		stateRef.current.content = content;
		stateRef.current.serializer = serializer;
		stateRef.current.deserializer = deserializer;
		stateRef.current.def = def;
		const handlers = createDiagramHandlers({
			serializer, replace, syncContentToStateRef: (content: string) => {
				stateRef.current.content = content;
				(async () => await onStateContentChanged())();
				return content;
			}, notifyContentChanged: onContentChanged
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
};

export const EditorKernel = (props: EditorProps) => {
	const {
		content, assistant,
		serializer, deserializer,
		allowUploadFile, allowDownloadFile, allowDownloadImage
	} = props;

	const wrapperRef = useRef<HTMLDivElement>(null);
	const {on, off, fire} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	const stateRef = useRef<EditorKernelRefState>((() => {
		const engine = createDiagramEngine();
		try {
			// first round
			const def = parseContent(deserializer, content ?? '');
			const handlers = createDiagramHandlers({
				serializer, assistant, replace, syncContentToStateRef: (content: string) => {
					stateRef.current.content = content;
					(async () => {
						fire(PlaygroundEventTypes.REPAINT);
					})();
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
		// in case of serializer/deserializer/content changed from outside
		if (serializer === stateRef.current.serializer
			&& deserializer === stateRef.current.deserializer
			&& content === stateRef.current.content) {
			return;
		}
		repaint({
			serializer: () => serializer, deserializer: () => deserializer, content: () => content,
			stateRef, replace,
			onStateContentChanged: async () => {
				fire(PlaygroundEventTypes.REPAINT);
			},
			onContentChanged: (content?: string) => {
				fire(PlaygroundEventTypes.CONTENT_CHANGED, content);
			}
		});
		forceUpdate();
	}, [fire, replace, forceUpdate, serializer, deserializer, content]);
	useEffect(() => {
		// compute the node positions, run when status is PAINT, and set status to IN_SERVICE when finished
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
	useEffect(() => {
		// repaint on somewhere call REPAINT
		const onRepaint = () => {
			repaint({
				serializer: () => stateRef.current.serializer, deserializer: () => stateRef.current.deserializer,
				content: () => stateRef.current.content,
				stateRef, replace,
				onStateContentChanged: async () => {
					fire(PlaygroundEventTypes.REPAINT);
				},
				onContentChanged: (content?: string) => {
					fire(PlaygroundEventTypes.CONTENT_CHANGED, content);
				}
			});
			forceUpdate();
		};
		on(PlaygroundEventTypes.REPAINT, onRepaint);
		return () => {
			off(PlaygroundEventTypes.REPAINT, onRepaint);
		};
	}, [on, off, fire, replace, forceUpdate]);

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
				<Toolbar engine={stateRef.current.engine} def={stateRef.current.def} serializer={serializer}
				         allowUploadFile={allowUploadFile} allowDownloadFile={allowDownloadFile}
				         allowDownloadImage={allowDownloadImage}/>
			</ErrorBoundary>
		</EditorWrapper>;
	} catch (error) {
		return <EditorWrapper data-diagram-status={EditorKernelDiagramStatus.IGNORED} ref={wrapperRef}>
			<ParseError>{(error as Error).message || Labels.ParseError}</ParseError>
		</EditorWrapper>;
	}
};
