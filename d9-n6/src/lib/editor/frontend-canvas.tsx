import {CanvasWidget} from '@projectstorm/react-canvas-core';
import {useForceUpdate} from '@rainbow-d9/n1';
import React, {MutableRefObject, useEffect, useRef} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {NodeLocator} from './node-locator';
import {EditorKernelDiagramStatus, EditorKernelRefState, PostRepaintAction} from './painter';
import {FrontendCanvasWrapper} from './widgets';

export interface FrontendCanvasProps {
	stateRef: MutableRefObject<EditorKernelRefState>;
	postPaintActions: MutableRefObject<Array<PostRepaintAction>>;
}

export const FrontendCanvas = (props: FrontendCanvasProps) => {
	const {stateRef, postPaintActions} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = usePlaygroundEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const zoomTo = (zoom: number) => {
			stateRef.current.canvasZoom = zoom;
			stateRef.current.engine.getModel().setZoomLevel(zoom * 100);
			stateRef.current.engine.repaintCanvas();
		};
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
			const zoom = Math.min(
				parentWidth / (stateRef.current.canvasWidth ?? parentWidth),
				parentHeight / (stateRef.current.canvasHeight ?? parentHeight));
			onZoomTo(zoom);
		};
		on(PlaygroundEventTypes.ZOOM_TO, onZoomTo);
		on(PlaygroundEventTypes.ZOOM_TO_FIT, onZoomToFit);
		return () => {
			off(PlaygroundEventTypes.ZOOM_TO, onZoomTo);
			off(PlaygroundEventTypes.ZOOM_TO_FIT, onZoomToFit);
		};
	}, [on, off, forceUpdate, stateRef]);

	const askZoom = () => stateRef.current.canvasZoom;
	let zoom = askZoom();
	if (zoom === 1) {
		zoom = (void 0);
	}
	// register rendered listener each time, and deregister after listened
	// since the node widget life-cycle is not
	const handle = stateRef.current.engine.registerListener({
		rendered: () => {
			// all canvas in service, execute post paint actions
			if (stateRef.current.diagramStatus === EditorKernelDiagramStatus.IN_SERVICE) {
				setTimeout(() => {
					const actions = [...postPaintActions.current];
					postPaintActions.current = [];
					actions.forEach(action => action());
				}, 100);
			}
			handle.deregister();
		}
	});

	return <FrontendCanvasWrapper canvasWidth={stateRef.current.canvasWidth}
	                              canvasHeight={stateRef.current.canvasHeight}
	                              canvasZoom={zoom} ref={ref}>
		<NodeLocator stateRef={stateRef}/>
		<CanvasWidget engine={stateRef.current.engine} className="o23-playground-editor-content"/>
	</FrontendCanvasWrapper>;
};