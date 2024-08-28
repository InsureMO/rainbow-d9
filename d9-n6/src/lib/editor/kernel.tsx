import {useForceUpdate, useThrottler, VUtils} from '@rainbow-d9/n1';
import React, {useRef, useState} from 'react';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps} from '../types';
import {BackendCanvas} from './backend-canvas';
import {ErrorBoundary} from './error-boundary';
import {FrontendCanvas} from './frontend-canvas';
import {useCanvasInService} from './hooks/use-canvas-in-service';
import {useForceRepaint} from './hooks/use-force-repaint';
import {EditorKernelDiagramStatus, EditorKernelRefState, firstPaint, PostRepaintAction} from './painter';
import {Toolbar} from './toolbar';
import {EditorWrapper, ParseError} from './widgets';

export const EditorKernel = (props: EditorProps) => {
	const {
		content, assistant,
		serializer, deserializer,
		allowUploadFile, allowDownloadFile, allowDownloadImage
	} = props;

	const wrapperRef = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	const postPaintActions = useRef<Array<PostRepaintAction>>([]);
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
	useForceRepaint({content, serializer, deserializer, stateRef, assistant});
	// before repaint kernel, since it depends diagram status
	useCanvasInService({stateRef, postPaintActions});
	const forceUpdate = useForceUpdate();
	const [afterPositionComputed] = useState<() => void>(() => () => {
		stateRef.current.diagramStatus = EditorKernelDiagramStatus.IN_SERVICE;
		forceUpdate();
	});

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
		return <>
			<EditorWrapper data-diagram-locked={stateRef.current.engine.getModel().isLocked()}
			               ref={wrapperRef}>
				{/**
				 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
				 @ts-ignore */}
				<ErrorBoundary content={content}>
					<BackendCanvas stateRef={stateRef} postPaintActions={postPaintActions} assistant={assistant}
					               afterPositionComputed={afterPositionComputed}/>
					<FrontendCanvas stateRef={stateRef}/>
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
