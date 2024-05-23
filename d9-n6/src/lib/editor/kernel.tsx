import {CanvasWidget} from '@projectstorm/react-canvas-core';
import createEngine, {DiagramModel} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {VUtils} from '@rainbow-d9/n1';
import {IntlLabel} from '@rainbow-d9/n2';
import React, {useEffect, useRef, useState} from 'react';
import {FileDef, FileDefLoader} from '../definition';
import {EndNodeModel, initEngine, StartNodeModel} from '../diagram';
import {EditorProps} from '../types';
import {ErrorBoundary} from './error-boundary';
import {EditorWrapper, ParseError} from './widgets';

export interface EditorKernelState {
	engine: DiagramEngine;
	content?: string;
	parser: FileDefLoader;
	def?: FileDef;
	message?: string;
}

const createDiagramEngine = () => {
	const engine = createEngine();
	initEngine(engine);
	return engine;
};

export const EditorKernel = (props: EditorProps) => {
	const {content, parser} = props;

	const vwRef = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<EditorKernelState>(() => {
		const engine = createDiagramEngine();
		try {
			const def = parser.parse(content ?? '');
			return {engine, content, parser, def};
		} catch (e) {
			console.error(e);
			return {engine, content, parser, message: e.message};
		}
	});
	useEffect(() => {
		if (parser === state.parser && content === state.content) {
			return;
		}
		try {
			const def = parser.parse(content ?? '');
			setState(state => ({engine: state.engine, content, parser, def}));
		} catch (e) {
			console.error(e);
			setState(state => ({engine: state.engine, content, parser, message: e.message}));
		}
	}, [parser, content, state.content, state.parser]);

	if (VUtils.isNotBlank(state.message)) {
		return <EditorWrapper>
			<ParseError>{state.message}</ParseError>
		</EditorWrapper>;
	} else if (VUtils.isBlank(state.content)) {
		return <EditorWrapper>
			<ParseError><IntlLabel keys={['o23', 'error', 'no-content']} value="No content given."/></ParseError>
		</EditorWrapper>;
	} else if (state.def == null) {
		return <EditorWrapper>
			<ParseError><IntlLabel keys={['o23', 'error', 'no-def']} value="No definition parsed."/></ParseError>
		</EditorWrapper>;
	}

	try {
		const startNode = new StartNodeModel(state.def);
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
			<ParseError>{(error as Error).message ||
				<IntlLabel keys={['o23', 'error', 'parse']} value="Parse error occurred."/>}</ParseError>
		</EditorWrapper>;
	}
};