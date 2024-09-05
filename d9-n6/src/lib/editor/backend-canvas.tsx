import {CanvasWidget} from '@projectstorm/react-canvas-core';
import React, {MutableRefObject} from 'react';
import {PlaygroundDecorator, PlaygroundModuleAssistant} from '../types';
import {useComputePositions} from './hooks/use-compute-positions';
import {useRepaintBackend} from './hooks/use-repaint-backend';
import {EditorKernelRefState, PostRepaintAction} from './painter';
import {BackendCanvasWrapper} from './widgets';

export interface BackendCanvasProps {
	stateRef: MutableRefObject<EditorKernelRefState>;
	postPaintActions: MutableRefObject<Array<PostRepaintAction>>;
	assistant?: PlaygroundModuleAssistant;
	decorator?: PlaygroundDecorator;
	afterPositionComputed: () => void;
}

export const BackendCanvas = (props: BackendCanvasProps) => {
	const {stateRef, postPaintActions, assistant, decorator, afterPositionComputed} = props;

	// keep this order, repaint backend changes diagram status,
	// and compute positions depends on diagram status,
	// so compute positions should be called first, and execute in next round which triggered by force update in repaint backend
	useComputePositions({stateRef, afterPositionComputed});
	useRepaintBackend({stateRef, postPaintActions, assistant, decorator});

	return <BackendCanvasWrapper data-diagram-status={stateRef.current.diagramStatus}>
		<CanvasWidget engine={stateRef.current.engineBackend} className="o23-playground-editor-content-backend"/>
	</BackendCanvasWrapper>;
};