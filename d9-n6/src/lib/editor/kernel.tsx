import {CanvasWidget} from '@projectstorm/react-canvas-core';
import createEngine from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {VUtils} from '@rainbow-d9/n1';
import React, {useEffect, useRef, useState} from 'react';
import {FileDef, FileDefLoader} from '../definition';
import {initEngine} from '../diagram';
import {Labels} from '../labels';
import {EditorProps, MarkdownContent} from '../types';
import {createDiagramEntities} from './diagram-utils';
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

const parseContent = (parser: FileDefLoader, content?: MarkdownContent): FileDef => {
	const def = parser.parse(content ?? '');
	// guard
	if (VUtils.isBlank(def.type)) {
		def.type = 'pipeline';
	}
	return def;
};

export const EditorKernel = (props: EditorProps) => {
	const {content, parser} = props;

	const vwRef = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<EditorKernelState>(() => {
		const engine = createDiagramEngine();
		try {
			const def = parseContent(parser, content ?? '');
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
			const def = parseContent(parser, content ?? '');
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
			<ParseError>{Labels.NoContent}</ParseError>
		</EditorWrapper>;
	} else if (state.def == null) {
		return <EditorWrapper>
			<ParseError>{Labels.NoDefParsed}</ParseError>
		</EditorWrapper>;
	}

	try {
		const model = createDiagramEntities(state.def);
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
			<ParseError>{(error as Error).message || Labels.ParseError}</ParseError>
		</EditorWrapper>;
	}
};