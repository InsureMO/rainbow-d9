import {CanvasWidget} from '@projectstorm/react-canvas-core';
import {Undefinable, useForceUpdate, useThrottler, VUtils} from '@rainbow-d9/n1';
import React, {ReactNode, useEffect, useRef} from 'react';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps} from '../types';
import {switchAllNodesFolding} from './diagram-utils';
import {ErrorBoundary} from './error-boundary';
import {EditorKernelDiagramStatus, EditorKernelRefState, firstPaint, paint, repaint, usePaint} from './painter';
import {Toolbar} from './toolbar';
import {BackendCanvasWrapper, EditorCanvasWrapper, EditorWrapper, ParseError} from './widgets';

interface CanvasWrapperProps {
	width?: number;
	height?: number;
	zoom: () => Undefinable<number>;
	zoomTo: (zoom: number) => void;
	children: ReactNode;
}

const CanvasWrapper = (props: CanvasWrapperProps) => {
	const {width, height, zoom: askZoom, zoomTo, children} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = usePlaygroundEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onZoomTo = (zoom: number) => {
			zoomTo(zoom);
			forceUpdate();
		};
		const onZoomToFit = () => {
			if (ref.current == null) {
				return;
			}
			const parent = ref.current.parentElement;
			const {width: parentWidth, height: parentHeight} = parent.getBoundingClientRect();
			const zoom = Math.min(parentWidth / (width ?? parentWidth), parentHeight / (height ?? parentHeight));
			onZoomTo(zoom);
		};
		on(PlaygroundEventTypes.ZOOM_TO, onZoomTo);
		on(PlaygroundEventTypes.ZOOM_TO_FIT, onZoomToFit);
		return () => {
			off(PlaygroundEventTypes.ZOOM_TO, onZoomTo);
			off(PlaygroundEventTypes.ZOOM_TO_FIT, onZoomToFit);
		};
	}, [on, off, forceUpdate, width, height, zoomTo]);

	let zoom = askZoom();
	if (zoom === 1) {
		zoom = (void 0);
	}

	return <EditorCanvasWrapper canvasWidth={width} canvasHeight={height} canvasZoom={zoom} ref={ref}>
		{children}
	</EditorCanvasWrapper>;
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
		const switchFolding = (fold: boolean) => {
			switchAllNodesFolding(stateRef.current.def!, fold);
			onRepaint();
		};
		const onFoldAllNodes = () => switchFolding(true);
		const onUnfoldAllNodes = () => switchFolding(false);
		on(PlaygroundEventTypes.REPAINT, onRepaint);
		on(PlaygroundEventTypes.FOLD_ALL_NODES, onFoldAllNodes);
		on(PlaygroundEventTypes.UNFOLD_ALL_NODES, onUnfoldAllNodes);
		return () => {
			off(PlaygroundEventTypes.REPAINT, onRepaint);
			off(PlaygroundEventTypes.FOLD_ALL_NODES, onFoldAllNodes);
			off(PlaygroundEventTypes.UNFOLD_ALL_NODES, onUnfoldAllNodes);
		};
	}, [on, off, fire, replace, forceUpdate, assistant]);
	usePaint(stateRef);

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

	const askZoom = () => stateRef.current.canvasZoom;
	const zoomTo = (zoom: number) => {
		stateRef.current.canvasZoom = zoom;
		stateRef.current.engine.getModel().setZoomLevel(zoom * 100);
		stateRef.current.engine.repaintCanvas();
	};

	try {
		return <>
			<EditorWrapper data-diagram-status={stateRef.current.diagramStatus}
			               data-diagram-locked={stateRef.current.engine.getModel().isLocked()}
			               ref={wrapperRef}>
				{/**
				 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
				 @ts-ignore */}
				<ErrorBoundary content={content}>
					<BackendCanvasWrapper>
						<CanvasWidget engine={stateRef.current.engineBackend}
						              className="o23-playground-editor-content-backend"/>
					</BackendCanvasWrapper>
					<CanvasWrapper width={stateRef.current.canvasWidth} height={stateRef.current.canvasHeight}
					               zoom={askZoom} zoomTo={zoomTo}>
						<CanvasWidget engine={stateRef.current.engine} className="o23-playground-editor-content"/>
					</CanvasWrapper>
				</ErrorBoundary>
			</EditorWrapper>
			<Toolbar stateRef={stateRef} serializer={serializer}
			         allowUploadFile={allowUploadFile} allowDownloadFile={allowDownloadFile}
			         allowDownloadImage={allowDownloadImage}/>
		</>;
	} catch (error) {
		return <EditorWrapper data-diagram-status={EditorKernelDiagramStatus.IGNORED} ref={wrapperRef}>
			<ParseError>{(error as Error).message || Labels.ParseError}</ParseError>
		</EditorWrapper>;
	}
};
