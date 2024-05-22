import {CanvasWidget} from '@projectstorm/react-canvas-core';
import createEngine, {DiagramModel} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {useForceUpdate} from '@rainbow-d9/n1';
import React, {useEffect, useRef, useState} from 'react';
import {EndNodeModel, initStartNode, StartNodeModel} from '../diagram';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps} from '../types';
import {ErrorBoundary} from './error-boundary';
import {EditorWrapper, ParseError} from './widgets';

export interface EditorKernelState {
	engine: DiagramEngine;
}

const createDiagramEngine = () => {
	const engine = createEngine();
	initStartNode(engine);
	return engine;
};

export const EditorKernel = (props: EditorProps) => {
	const {content} = props;

	const vwRef = useRef<HTMLDivElement>(null);
	const {on, off} = usePlaygroundEventBus();
	const [state] = useState<EditorKernelState>({engine: createDiagramEngine()});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onForceUpdateViewer = () => {
			forceUpdate();
		};
		on(PlaygroundEventTypes.FORCE_UPDATE_EDITOR, onForceUpdateViewer);
		return () => {
			off(PlaygroundEventTypes.FORCE_UPDATE_EDITOR, onForceUpdateViewer);
		};
	}, [on, off, forceUpdate]);

	try {
		const startNode = new StartNodeModel();
		startNode.setPosition(100, 100);
		const endNode = new EndNodeModel();
		endNode.setPosition(500, 100);
		const link = startNode.routeTo(endNode);

		const model = new DiagramModel();
		model.addAll(startNode, endNode, link);
		state.engine.setModel(model);

		return <EditorWrapper ref={vwRef}>
			{/**
			 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
			 @ts-ignore */}
			<ErrorBoundary content={content}>
				<CanvasWidget engine={state.engine} className="o23-playground-editor-content"/>
			</ErrorBoundary>
		</EditorWrapper>;
	} catch (error) {
		return <EditorWrapper>
			<ParseError>{(error as Error).message || 'Parse error occurred.'}</ParseError>
		</EditorWrapper>;
	}
};