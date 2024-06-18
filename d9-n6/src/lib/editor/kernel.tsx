import {CanvasWidget} from '@projectstorm/react-canvas-core';
import createEngine, {DiagramModel} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {useForceUpdate, useThrottler, VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useRef} from 'react';
import {FileDef, FileDefDeserializer, FileDefSerializer} from '../definition';
import {initEngine} from '../diagram';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps, MarkdownContent} from '../types';
import {createDiagramEntities, DiagramHandlers} from './diagram-utils';
import {ErrorBoundary} from './error-boundary';
import {EditorWrapper, ParseError} from './widgets';

export interface EditorKernelState {
	engine: DiagramEngine;
	content?: string;
	serializer: FileDefSerializer;
	deserializer: FileDefDeserializer;
	def?: FileDef;
	message?: string;
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

export const EditorKernel = (props: EditorProps) => {
	const {content, serializer, deserializer} = props;

	const wrapperRef = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	const stateRef = useRef<EditorKernelState>((() => {
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
			const model = createDiagramEntities(def, handlers);
			engine.setModel(model);
			return {engine, content, serializer, deserializer, def};
		} catch (e) {
			console.error(e);
			engine.setModel(new DiagramModel());
			return {engine, content, serializer, deserializer, message: e.message};
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
			const model = createDiagramEntities(def, handlers);
			stateRef.current.engine.setModel(model);
			delete stateRef.current.message;
		} catch (e) {
			console.error(e);
			stateRef.current.content = content;
			stateRef.current.serializer = serializer;
			stateRef.current.deserializer = deserializer;
			delete stateRef.current.def;
			// replace with empty diagram model
			stateRef.current.engine.setModel(new DiagramModel());
			stateRef.current.message = e.message;
		}
		forceUpdate();
	}, [fire, replace, forceUpdate, serializer, deserializer, content]);

	if (VUtils.isNotBlank(stateRef.current.message)) {
		return <EditorWrapper>
			<ParseError>{stateRef.current.message}</ParseError>
		</EditorWrapper>;
	} else if (VUtils.isBlank(stateRef.current.content)) {
		return <EditorWrapper>
			<ParseError>{Labels.NoContent}</ParseError>
		</EditorWrapper>;
	} else if (stateRef.current.def == null) {
		return <EditorWrapper>
			<ParseError>{Labels.NoDefParsed}</ParseError>
		</EditorWrapper>;
	}

	try {
		return <EditorWrapper ref={wrapperRef}>
			{/**
			 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			 @ts-ignore */}
			<ErrorBoundary content={content}>
				<CanvasWidget engine={stateRef.current.engine} className="o23-playground-editor-content"/>
			</ErrorBoundary>
		</EditorWrapper>;
	} catch (error) {
		return <EditorWrapper ref={wrapperRef}>
			<ParseError>{(error as Error).message || Labels.ParseError}</ParseError>
		</EditorWrapper>;
	}
};