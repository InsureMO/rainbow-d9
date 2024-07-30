import {CanvasWidget} from '@projectstorm/react-canvas-core';
import {useForceUpdate, useThrottler, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useRef} from 'react';
import {DEFAULTS} from '../constants';
import {StartNodeModel} from '../diagram';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps} from '../types';
import {buildGrid, cloneDiagramNodes, computeGrid, createLockedDiagramModel, GridCell} from './diagram-utils';
import {ErrorBoundary} from './error-boundary';
import {EditorKernelDiagramStatus, EditorKernelRefState, firstPaint, paint, repaint} from './painter';
import {Toolbar} from './toolbar';
import {EditorWrapper, ParseError} from './widgets';

export const EditorKernel = (props: EditorProps) => {
	const {
		content, assistant,
		serializer, deserializer,
		allowUploadFile, allowDownloadFile, allowDownloadImage
	} = props;

	const wrapperRef = useRef<HTMLDivElement>(null);
	const {on, off, fire} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	const stateRef = useRef<EditorKernelRefState>(firstPaint({
		content, serializer, deserializer, assistant, replace,
		writeContentToState: (content?: string) => {
			stateRef.current.content = content;
			(async () => {
				fire(PlaygroundEventTypes.REPAINT);
			})();
		},
		onContentChanged: (content?: string) => {
			fire(PlaygroundEventTypes.CONTENT_CHANGED, content);
		}
	}));
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		// in case of serializer/deserializer/content changed from outside
		if (serializer === stateRef.current.serializer
			&& deserializer === stateRef.current.deserializer
			&& content === stateRef.current.content) {
			return;
		}
		paint({
			serializer: () => serializer, deserializer: () => deserializer, assistant: () => assistant,
			content: () => content,
			stateRef, replace,
			onStateContentChanged: async () => {
				fire(PlaygroundEventTypes.REPAINT);
			},
			onContentChanged: (content?: string) => {
				fire(PlaygroundEventTypes.CONTENT_CHANGED, content);
			}
		});
		forceUpdate();
	}, [fire, replace, forceUpdate, serializer, deserializer, assistant, content]);
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
		if (EditorKernelDiagramStatus.PAINT_ON_POSITION === stateRef.current.diagramStatus) {
			const model = stateRef.current.engine.getModel();
			const offsetX = model.getOffsetX();
			const offsetY = model.getOffsetY();
			const zoom = model.getZoomLevel();
			newModel.setOffset(offsetX, offsetY);
			newModel.setZoomLevel(zoom);
		}
		stateRef.current.engine.setModel(newModel);
		// clear backend model to save dom performance
		stateRef.current.engineBackend.setModel(createLockedDiagramModel());
		stateRef.current.diagramStatus = EditorKernelDiagramStatus.IN_SERVICE;
		forceUpdate();
	}, [forceUpdate, stateRef.current.diagramStatus]);
	useEffect(() => {
		// repaint on somewhere call REPAINT
		const onRepaint = () => {
			repaint({
				assistant: () => assistant, stateRef, replace,
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
	}, [on, off, fire, replace, forceUpdate, assistant]);

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
				<CanvasWidget engine={stateRef.current.engineBackend}
				              className="o23-playground-editor-content-backend"/>
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
